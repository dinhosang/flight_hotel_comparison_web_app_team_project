const MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
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
