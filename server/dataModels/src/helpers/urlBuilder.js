const UrlBuilder = function(urlDetails) {
  //baseURL is held in an array to allow for joining with parameter array to make complete URL
  this.baseUrl        = [urlDetails.baseUrl];
  this.parameterArray = urlDetails.parameterArray;
  this.completeArray  = null;
  this.finalUrl       = null;

  this.prepareArray();
  this.build();
}

UrlBuilder.prototype.prepareArray = function () {
  this.completeArray = this.baseUrl.concat(this.parameterArray)
}

UrlBuilder.prototype.build = function() {
  //joining between each element to create final URL to send request to API
  this.finalUrl = this.completeArray.join('&')
}

module.exports = UrlBuilder;
