var testF = './data'; // �������� ����
var fs = require('fs');

fs.readdir(testF, function(err, filelist){
    console.log(filelist);
})

// ���
// [ 'CSS', 'HTML', 'JavaScript' ]