const ScrollTo = function(targetId){
  this.targetId = targetId;
}

ScrollTo.prototype.scrollTo = function(){
    document.getElementById(this.targetId).scrollIntoView({
      behavior: 'smooth'
    });
}

module.exports = ScrollTo;
