var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]);

var roles = {
    'programmer':'egoing', 'designer' : 'k8805', 'manager': 'hoya'
}

console.log(roles.designer);

// js���� ���ǹ��� ���� �� �� ����.
// js���� while���� ���� �� �� ����.

var f = function(){
    console.log(1+1);
    console.log(1+3);
} // ���� ���� �� �ִ�.
f();
console.log("-------------------");

var a = [f];
a[0](); // ���ҷ�
console.log("-------------------");

var o = {
    func : f
} // ��ü��
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
// './'�� ���� ���丮(���� ���丮)
console.log(part);
part.f();