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

var layerUrl = 'https://moradology.cartodb.com/api/v2/viz/b502a2bc-f9e9-11e5-90ae-0ecd1babdde5/viz.json';

cartodb.createLayer(map, layerUrl)
  .addTo(map)
  .on('done', function(layer) {
    console.log(layer); // layer is a cartodb.js Layer object - can call getSubLayer on it!
    layer.on('featureClick', function(e, latlng, pos, data) {
      console.log(e, latlng, pos, data);
    });
    //do things with returned layers
  }).on('error', function() {
    //log the error
  });

