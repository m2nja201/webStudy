var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]);

var roles = {
    'programmer':'egoing', 'designer' : 'k8805', 'manager': 'hoya'
}

console.log(roles.designer);

// js에서 조건문은 값이 될 수 없다.
// js에서 while문도 값이 될 수 없다.

var f = function(){
    console.log(1+1);
    console.log(1+3);
} // 값을 넣을 수 있다.
f();
console.log("-------------------");

var a = [f];
a[0](); // 원소로
console.log("-------------------");

var o = {
    func : f
} // 객체로
o.func();
console.log("-------------------");

var g = {
    v1 : 'v1', v2:'v2',
    f1:function(){
        console.log(this.v1);
    },
    f2:function(){
        console.log(this.v2);
    }
}

g.f1();
g.f2();

var part = require('./module.js');
// './'는 현재 디렉토리(같은 디렉토리)
console.log(part);
part.f();