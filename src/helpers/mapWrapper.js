const MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

MapWrapper.prototype.addMarker = function(coords, info) {
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  marker.addListener('click', function () {
    const infoWindow = new google.maps.InfoWindow({
      content: info
    });
    infoWindow.open(this.map, marker);
  });
}

module.exports = MapWrapper;
