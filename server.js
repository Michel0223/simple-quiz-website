const http = require('http');
const fs = require('fs');
const { JSDOM } = require('jsdom');
const port = 9000;
const ip = "127.0.0.1";
const pages = [
    "/", "/login", "register"
]

const renderLoginPage = (req,res) => {
    fs.readFile('./views/loginPage.html', 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Something wrong happened in reading the source file!');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          const dom = new JSDOM(data);
          const document = dom.window.document;
          res.end(dom.serialize());
        }
      });  

}

const renderHomePage = (req, res) => {
    fs.readFile('./views/homePage.html', 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Something wrong happened in reading the source file!');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const dom = new JSDOM(data);
        res.end(dom.serialize());
      }
    });
  };

const server = http.createServer((req,res) => {
    if(pages.includes(req.url))   {
        switch(req.url) {
            case "/":
                renderHomePage(req, res);
            case "/login":
                renderLoginPage(req,res);
        }
    }
    if(req.method==="POST" && req.url==="/login")   {
        fetch("loginData")
            .then(response=>response)
            .then(data=>{console.log(data)})
            .catch(error=>console.log(error));
    }
    else if(req.method==="GET") {
        console.log(req.url);
        if(!pages.includes(req.url) && req.url!=='/script.js'){
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>Page you are looking for has not been found</title>
                    </head>
                    <body>
                        <h1>Something went really wrong!</h1>
                    </body>
                </html>
            `);
        }
        if(req.url==='/script.js')  {
            fs.readFile('script.js',(err,data)=>{
                if(err)     {
                    console.log(err);
                }
                else  {
                    res.writeHead(200, { "Content-Type": 'text/javascript' });
                    res.end(data);
                }
            });
        }

    }

});

server.listen(port, ip, () => {
    const Addr = server.address();
    console.log(`this is link: http://${Addr.address}:${Addr.port}`);
});