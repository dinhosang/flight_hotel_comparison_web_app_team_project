const ScrollTo = function(targetId){
  this.targetId = targetId;
}

ScrollTo.prototype.scrollTo = function(){
    const top = document.getElementById(this.targetId).offsetTop;
    window.scrollTo(0, top);
}

// ScrollTo.prototype.scrollTo = function(){
//     const top = document.getElementById(this.targetId).offsetTop;
//     const left = document.getElementById(this.targetId).offsetLeft;
//     const animator = createAnimator({
//         start: [0,0],
//         end: [left, top],
//         duration: 1000
//     }, function(vals){
//     	window.scrollTo(vals[0], vals[1]);
//     });
//     animator();
// }
//
// // USES JQUERY, REFACTOR
// ScrollTo.prototype.createAnimator = function (config, callback, done) {
//     if (typeof config !== "object") throw new TypeError("Arguement config expect an Object");
//
//     const start = config.start,
//         mid = $.extend({}, start), //clone object --
//         math = $.extend({}, start), //precalculate the math
//         end = config.end,
//         duration = config.duration || 1000,
//         startTime, endTime;
//
//     //t*(b-d)/(a-c) + (a*d-b*c)/(a-c);
//     function precalculate(a, b, c, d) {
//         return [(b - d) / (a - c), (a * d - b * c) / (a - c)];
//     }
//
//     function calculate(key, t) {
//         return t * math[key][0] + math[key][1];
//     }
//
//     function step() {
//         const t = Date.now();
//         const val = end;
//         if (t < endTime) {
//             val = mid;
//             for (const key in mid) {
//                 mid[key] = calculate(key, t);
//             }
//             callback(val);
//             requestAnimationFrame(step);
//         } else {
//             callback(val);
//             done && done();
//         }
//     }
//
//     return function () {
//         startTime = Date.now();
//         endTime = startTime + duration;
//
//         for (var key in math) {
//             math[key] = precalculate(startTime, start[key], endTime, end[key]);
//         }
//
//         step();
//     }
// }

module.exports = ScrollTo;
