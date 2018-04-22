const searchUrlConstant = require('./enums/searchUrlEnum.js');

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function(callback) {
  const request = new XMLHttpRequest();

  request.open('GET', this.url);
  request.addEventListener('load', function() {
    if (this.status !== 200) {
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send();
}

Request.prototype.post = function(body, callback) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function () {
    if (this.status !== 201) {
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    if(callback !== undefined) {
      callback(responseBody);
    };
  });
  request.send(JSON.stringify(body));
}

Request.prototype.put = function(body, callback) {
  const request = new XMLHttpRequest();
  request.open('PUT', this.url);
  request.setRequestHeader('Content-Type','application/json');
  request.addEventListener('load', function () {
    if (request.status !== 200) {
      return;
    }
    const responseBody = JSON.parse(request.responseText);
    if(callback !== undefined) {
      callback(responseBody);
    };
  });
  request.send(JSON.stringify(body));
}

Request.prototype.delete = function(callback) {
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function () {
    if (this.status !== 204) {
      return;
    }
    callback();
  });
  request.send();
}

module.exports = Request;
