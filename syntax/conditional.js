// �ֿܼ����� �Է°�

var args = process.argv;
console.log(args);

// ����� (node syntax/conditional.js m2nja2)
/*
[
  'C:\\Program Files\\nodejs\\node.exe', => node js runtime �� ���
  'C:\\Users\\m2nja\\OneDrive\\����\\study\\webStudy\\nodejs\\syntax\\conditional.js',=> �ش� ������ ���
  'm2nja2' => ���� ģ ����
]
*/

// console.log(args[2]); ġ�� m2nja2 ����

if (args[2] === '1'){
    console.log('C1');
} else{
    console.log('C2');
}