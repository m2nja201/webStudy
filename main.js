// require({name}); => {name}이라는 node js의 모듈을 사용할 것이다.
var http = require('http');
var fs = require('fs');
var url = require('url'); // url이라는 모듈을 url이라는 변수로 쓸 것이다.
const path = require('path');
var qs = require('querystring');

function templateHTML(title, list, body, control){
  return `
    <!doctype html>
    <html>
    <head>
      <title>WEB2 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
  `;
}

function templateLIST(filelist){
  var samplelist = `<ul>`; // ul 태그 열기
  var i = 0;
  while(i<filelist.length){
    samplelist += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i++;
  }
  samplelist += `</ul>`;  // ul 태그 닫기
  return samplelist;
}

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
          
          var list = templateLIST(filelist);
          var h1tem = templateHTML(title, list, `<h2>${title}</h2>
          <p>${description}${des}</p>`,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a> <form action="/delete_process" method ="post">
            <input type="hidden" name="id" value="${title}">
            <input type="submit" value="delete">
          </form>`);
          response.writeHead(200); // 성공적으로 서버에 보내지면 200
          response.end(h1tem);
        });
      })
      
    } else if(pathname === '/create'){
      fs.readdir('./data', function(err, filelist){
        var title = 'WEB - create';
        var description = 'Hello, Node.js';
        var list = templateLIST(filelist);
        console.log(list);
        var template = templateHTML(title, list, `
        <form action="/create_process" method="post"> <!--해당 서버로 전달하고 싶다 / post를 사용하면 뒤에 데이터를 은밀하게 숨김-->
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" placeholder="description"></textarea></p>
        <p>
            <input type="submit">
        </p>
    </form>
        `,``);
        response.writeHead(200); // 성공적으로 서버에 보내지면 200
        response.end(template);
      })
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      // 더이상 들어올 정보가 없다
      request.on('end', function(){
        var post = qs.parse(body); // 정보가 들어있음(객체화)
        // 이때 post.title, post.description을 하면 정보를 각자 찾아낼 수 있음
        var title_p = post.title;
        var description_p = post.description;
        console.log(post);
        fs.writeFile(`data/${title_p}`, description_p, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title_p}`}); // 성공적으로 서버에 보내지면 302 : 다른 위치로 이동
          response.end('success');
        });
      });
    } else if (pathname==='/update'){
      fs.readdir('./data', function(err, filelist){
        fs.readFile(`data/${title}`, 'utf8', function(err, description){
          // template에다가 1.html 넣어주기
          if (description === undefined) description='';
          
          var list = templateLIST(filelist);
          var h1tem = templateHTML(title, list, `<form action="/update_process" method="post"> <!--해당 서버로 전달하고 싶다 / post를 사용하면 뒤에 데이터를 은밀하게 숨김-->
          <p><input type="hidden" name="id" value="${title}"></p>
          <p><input type="text" name="title" placeholder="title" value="${title}"</p>
          <p><textarea name="description" placeholder="description">${description}</textarea></p>
          <p>
              <input type="submit">
          </p>
      </form>`,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
          response.writeHead(200); // 성공적으로 서버에 보내지면 200
          response.end(h1tem);
        });
      })
    } else if(pathname==='/update_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      // 더이상 들어올 정보가 없다
      request.on('end', function(){
        var post = qs.parse(body); // 정보가 들어있음(객체화)
        var id_p = post.id;
        var title_p = post.title;
        var description_p = post.description;

        // 파일 이름 바꾸기
        fs.rename(`data/${id_p}`, `data/${title_p}`, function(err){
          // 내용도 바꿔주기
          fs.writeFile(`data/${title_p}`, description_p, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title_p}`}); // 성공적으로 서버에 보내지면 302 : 다른 위치로 이동
            response.end();
          });
        });
      });
    } else if(pathname==='/delete_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      // 더이상 들어올 정보가 없다
      request.on('end', function(){
        var post = qs.parse(body); // 정보가 들어있음(객체화)
        var id_p = post.id;
        fs.unlink(`data/${id_p}`, function(err){
          response.writeHead(302, {Location: `/`}); 
          response.end();
        })
      });
    }
    else{
      response.writeHead(404); // 실패하면 404 
      response.end('Not found'); // 뒤에 아무거나 치면 not found 뜸
    }
});
app.listen(3000);