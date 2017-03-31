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


// Include this CSS so that torque knows what to do
var CARTOCSS = [
  'Map {',
  '-torque-frame-count:256;',
  '-torque-animation-duration:30;',
  '-torque-time-attribute:"pickup_datetime";',
  '-torque-aggregation-function:"count(cartodb_id)";',
  '-torque-resolution:2;',
  '-torque-data-aggregation:linear;',
  '}',
  '#ny_taxi_dec_2015_copy{',
  'comp-op: lighter;',
  'marker-fill-opacity: 0.9;',
  'marker-line-color: #FFF;',
  'marker-line-width: 0;',
  'marker-line-opacity: 1;',
  'marker-type: ellipse;',
  'marker-width: 6;',
  'marker-fill: #0F3B82;',
  '}',
  '#ny_taxi_dec_2015_copy[frame-offset=1] {',
  'marker-width:8;',
  'marker-fill-opacity:0.45; ',
  '}',
  '#ny_taxi_dec_2015_copy[frame-offset=2] {',
  'marker-width:10;',
  'marker-fill-opacity:0.225; ',
  '}'
].join('\n');

// Create the actual layer to be used
var torqueLayer = new L.TorqueLayer({
  user: 'npzimmerman',
  cartocss: CARTOCSS
});
torqueLayer.addTo(map);

// On timechange, update the HTML which hovers over the upper right of the map
torqueLayer.on('change:time', function(d) {
  var time = $('<h3>').text('Time - ' + moment(d.time).format('HH:mm'));
  $('div#time-window div').empty();
  $('#time-window div').append(time);
});

// We'll just create some buttons for the first 7 days of cab data
_.each([1, 2, 3, 4, 5, 6, 7], function(num) {
  var button = $('<button>')
    .addClass('btn')
    .addClass('btn-default')
    .text('Play timeline for December ' + num)
    .click(function() {
      $('#time-window').empty();
      $('#time-window')
        .append($('<h1>').text('Date - 2015-12-0' + num))
        .append($('<div>'));
      torqueLayer.stop();
      torqueLayer.setSQL("SELECT * FROM ny_taxi_dec_2015_copy WHERE (pickup_datetime >= ('2015-12-0" + num + "T00:00:00-05:00') AND pickup_datetime <= ('2015-12-0" + (num + 1) + "T00:00:00-05:00'))");
      torqueLayer.play();
    });
  $('#button-container').append(button);
});

