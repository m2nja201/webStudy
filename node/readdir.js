var testF = './data'; // 읽으려는 폴더
var fs = require('fs');

fs.readdir(testF, function(err, filelist){
    console.log(filelist);
})

// 결과
// [ 'CSS', 'HTML', 'JavaScript' ]