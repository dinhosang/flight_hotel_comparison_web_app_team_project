const UrlBuilder = function(urlDetails) {
  this.baseUrl    = [urlDetails.baseUrl];
  this.paramArray = urlDetails.paramArray;

  this.prepareArray();
  this.build();
}


UrlBuilder.prototype.prepareArray = function () {
  this.completeArray = this.baseUrl.concat(this.paramArray)
}

UrlBuilder.prototype.build = function() {
  this.finalUrl = this.completeArray.join('&')
}


module.exports = UrlBuilder;
