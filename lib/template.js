module.exports = {
    HTML: function (title, list, body, control){
      return `
        <!doctype html>
        <html>
        <head>
          <title>WEB3 - ${title}</title>
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
    },
    LIST: function (filelist){
      var samplelist = `<ul>`; // ul 태그 열기
      var i = 0;
      while(i<filelist.length){
        samplelist += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i++;
      }
      samplelist += `</ul>`;  // ul 태그 닫기
      return samplelist;
    }
  }