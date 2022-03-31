// require({name}); => {name}이라는 node js의 모듈을 사용할 것이다.
var http = require('http');
var fs = require('fs');
var url = require('url'); // url이라는 모듈을 url이라는 변수로 쓸 것이다.

var app = http.createServer(function(request, response){
    var _url = request.url;
    // request.url에 /?id=~ 가 들어감.
    var queryData = url.parse(_url, true).query; // 객체로 담겨 있다. => { id : HTML }
    // 따라서 queryData.id 는 HTML로 나오게 된다.
    var title = queryData.id;

    if (_url == '/'){ // home으로 갔을 때 해당 코드로 이동
        title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
        return response.writeHead(404);
    }
    response.writeHead(200);

    fs.readFile(`data/${title}`, 'utf8', function(err, description){
      // template에다가 1.html 넣어주기
      var h1tem = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}
        </p>
      </body>
      </html>    
      `;
      response.end(h1tem);
    });

    
    // response.end(fs.readFileSync(__dirname + url)); // directory name + file name
    // response.end({내용}); => 읽어주는 것
});
app.listen(3000);