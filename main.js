// require({name}); => {name}이라는 node js의 모듈을 사용할 것이다.
var http = require('http');
var fs = require('fs');
var url = require('url'); // url이라는 모듈을 url이라는 변수로 쓸 것이다.
const path = require('path');

var app = http.createServer(function(request, response){
    var _url = request.url;
    // request.url에 /?id=~ 가 들어감.
    var queryData = url.parse(_url, true).query; // 객체로 담겨 있다. => { id : HTML }
    // 따라서 queryData.id 는 HTML로 나오게 된다.
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;
    var des = '';

    if (pathname === '/'){
      if(title === undefined){
        title='Welcome';
        des = 'HELLO node js';
      }

      fs.readdir('./data', function(err, filelist){
        fs.readFile(`data/${title}`, 'utf8', function(err, description){
          // template에다가 1.html 넣어주기
          if (description === undefined) description='';
          var i = 0;
          var list = `<ul>`; // ul 태그 열기
          while(i<filelist.length){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
          }
          list += `</ul>`;  // ul 태그 닫기

          var h1tem = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}${des}
            </p>
          </body>
          </html>    
          `;
          response.writeHead(200); // 성공적으로 서버에 보내지면 200
          response.end(h1tem);
        });
      })
      
    } else{
      response.writeHead(404); // 실패하면 404 
      response.end('Not found'); // 뒤에 아무거나 치면 not found 뜸
    }

    

    // response.end(fs.readFileSync(__dirname + url)); // directory name + file name
    // response.end({내용}); => 읽어주는 것
});
app.listen(3000);