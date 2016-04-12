var INSERT = true;
var APIKEY = "";

// Leaflet map setup
var map = L.map('map', {
  center: [40.75583970971843, -73.795166015625],
  zoom: 11
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);



/* There are two ways to interact with your tables' SQL directly: */

// 1. AJAX (which is perhaps more error prone)
/*
$.ajax("https://npzimmerman.cartodb.com/api/v2/sql?q=SELECT * FROM pizza_ratings&api_key=API_KEY").done(function(data) {
  console.log(data);
});
*/

// 2. The cartodb.js client (which provides SQL templating and a simpler argument interface
// First, we create the client (notice that we tell it we want geojson)
var sqlClient = new cartodb.SQL({
  user: 'npzimmerman',
  format: 'geojson'
});

// Then we specify the SQL we want to execute (the second argument is where params are provided)
// e.g.: sqlClient.execute("SELECT * FROM pizza_ratings WHERE ratings > {{rating}}", {rating: 4})
sqlClient.execute("SELECT * FROM pizza_ratings")
  .done(function(data) {
    L.geoJson(data, {
      onEachFeature: function(feature, layer) {
        layer.on('click', function() { fillForm(feature.properties.name, feature.properties.rating); });
      }
    }).addTo(map);
  })
  .error(function(errors) {
  });

// Leaflet draw setup
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);


// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  },
  draw: {
    rectangle: false,
    polyline: false,
    polygon: false,
    circle: false
  }
});

// Automatically fill form from geojson
var fillForm = function(name, rating) {
  INSERT = false;
  $('#name').val(name);
  $('#rating').val(rating);
};

// Function called when review is complete
var reviewComplete = function(lat, lng, name, rating) {
  var sql = "INSERT INTO pizza_ratings (the_geom, name, rating)" +
        "VALUES (ST_GeomFromText('POINT(" + lng + ' ' + lat +
        ")', 4326),'" + name + "', " + rating +
        ")&api_key=" + APIKEY;
  $.ajax('https://npzimmerman.cartodb.com/api/v2/sql?q=' + sql).done(function() {
    $('#name').prop('disabled', false);
    $('#rating').prop('disabled', false);
    $('#submit').prop('disabled', false);
  });
};

// Event fired on submission
$('#submit').click(function() {
  reviewComplete(
    $('#lat').val(),
    $('#lng').val(),
    $('#name').val(),
    $('#rating').val()
  );
  $('#name').val("").prop('disabled', true);
  $('#rating').val("").prop('disabled', true);
  $('#submit').prop('disabled', true);
});

// Handling the creation of Leaflet.Draw layers
// Note the use of drawnLayerID - this is the way you should approach remembering and removing layers
var drawnLayerID;
map.addControl(drawControl);
map.on('draw:created', function (e) {
  var type = e.layerType;
  var layer = e.layer;
  //console.log('draw created:', e);

  if (type === 'marker') {
    // Change the 5 here to alter the number of closest records returned!
    $('#name').prop('disabled', false);
    $('#rating').prop('disabled', false);
    $('#submit').prop('disabled', false);
    $('#lat').val(layer._latlng.lat);
    $('#lng').val(layer._latlng.lng);
  }

  if (drawnLayerID) { map.removeLayer(map._layers[drawnLayerID]); }
  map.addLayer(layer);
  drawnLayerID = layer._leaflet_id;
});


