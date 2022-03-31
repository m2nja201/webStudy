// 콘솔에서의 입력값

var args = process.argv;
console.log(args);

// 결과값 (node syntax/conditional.js m2nja2)
/*
[
  'C:\\Program Files\\nodejs\\node.exe', => node js runtime 의 경로
  'C:\\Users\\m2nja\\OneDrive\\문서\\study\\webStudy\\nodejs\\syntax\\conditional.js',=> 해당 파일의 경로
  'm2nja2' => 내가 친 문자
]
*/

// console.log(args[2]); 치면 m2nja2 나옴

if (args[2] === '1'){
    console.log('C1');
} else{
    console.log('C2');
}