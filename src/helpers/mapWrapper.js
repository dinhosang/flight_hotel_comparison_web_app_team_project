const MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });

  this.activeMarker = null;
  this.activeTile   = null;
}

MapWrapper.prototype.addAirportMarker = function (coords, hotelsListTitle) {
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    icon: 'http://maps.google.com/mapfiles/kml/pal2/icon48.png'
  });

  marker.addListener('mouseover', function() {
    hotelsListTitle.scrollIntoView({
      behavior: 'instant'
    })
  })
}

MapWrapper.prototype.addMarker = function(coords, populatePackageView, hotelTile) {
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  marker.addListener('click', populatePackageView)
  marker.addListener('mouseover', function() {
    hotelTile.scrollIntoView({
      behavior: 'smooth'
    })
    this.bounceMarker(marker)

    if(this.activeTile !== null && this.activeTile !== hotelTile) {
      this.activeTile.removeAttribute('id');
      this.activeTile = hotelTile;
      this.activeTile.setAttribute('id', 'map-focused');
      console.log(this.activeTile);
    } else if (this.activeTile === null){
      this.activeTile = hotelTile;
      this.activeTile.setAttribute('id', 'map-focused');
    }
  }.bind(this))

  return marker;
}

MapWrapper.prototype.bounceMarker = function (marker) {
  if(this.activeMarker !== null && this.activeMarker !== marker){
    this.activeMarker.setAnimation(null);
    marker.setAnimation(google.maps.Animation.BOUNCE)
    this.activeMarker = marker;
  } else if (this.activeMarker === null){
    marker.setAnimation(google.maps.Animation.BOUNCE)
    this.activeMarker = marker;
  }
};

module.exports = MapWrapper;
