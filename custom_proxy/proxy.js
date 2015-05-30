var http = require('http');
//quick hack of a proxy because existing proxy was URI encoding
//(this messed with the radreport.org queries)
http.createServer(function (req, res){
  if (req.url.indexOf("json") >= 0){
    var options = {
      host: 'www.radreport.org',
      path: req.url,
    };

    if (req.url.indexOf("template") >= 0 ){
      var id = req.url.substr(req.url.indexOf("?id=") + 4); console.log(id);
      options.path = "/html/htmldownload.php?id=" + id;
    }

    http.get(options, function(response){
      var data = "";

      response.on('data', function(chunk){
        data += chunk;
      });

      response.on('end', function(){
        res.writeHead(200, {
          'Content-Type': 'text/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
      })
    })

  }
}).listen(1337, '127.0.0.1');
