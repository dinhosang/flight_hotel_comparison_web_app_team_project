const MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

MapWrapper.prototype.addAirportMarker = function (coords) {
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    icon: 'http://maps.google.com/mapfiles/kml/pal2/icon48.png'
  });
}

MapWrapper.prototype.addMarker = function(coords, callback) {
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  marker.addListener('click', callback)
}

module.exports = MapWrapper;
