var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }
}

M.f();

module.exports = M;
// M이라는 객체를 다른 곳에서도 쓸 수 있도록 하겠다.