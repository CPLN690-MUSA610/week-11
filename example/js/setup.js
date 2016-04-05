// Leaflet map setup
var map = L.map('map', {
  center: [20, 0],
  zoom: 2
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


// Leaflet draw setup
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);


// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  },
  draw: {
    polyline: false,
    polygon: false,
    circle: false
  }
});

// Handling the creation of Leaflet.Draw layers
// Note here, the use of drawnLayerID - this is undoubdtedly the way you should approach
//  remembering and removing layers
var drawnLayerID;
map.addControl(drawControl);
map.on('draw:created', function (e) {
  var type = e.layerType;
  var layer = e.layer;
  //console.log('draw created:', e);

  if (type === 'marker') {
    // Change the 5 here to alter the number of closest records returned!
    nClosest(layer._latlng, 5);
  } else if (type === 'rectangle') {
    pointsWithin(layer._latlngs);
  }

  if (drawnLayerID) { map.removeLayer(map._layers[drawnLayerID]); }
  map.addLayer(layer);
  drawnLayerID = layer._leaflet_id;
});


// The viz.json output by publishing on cartodb
var layerUrl = 'https://moradology.cartodb.com/api/v2/viz/b502a2bc-f9e9-11e5-90ae-0ecd1babdde5/viz.json';

// Use of CartoDB.js
cartodb.createLayer(map, layerUrl)
  .addTo(map)
  .on('done', function(layer) {
    // layer is a cartodb.js Layer object - can call getSubLayer on it!
    // console.log(layer);
    layer.on('featureClick', function(e, latlng, pos, data) {
      // nClosest(latlng[0], latlng[1], 10);
      // console.log(e, latlng, pos, data);
    });
  }).on('error', function(err) {
    // console.log(err):
  });

