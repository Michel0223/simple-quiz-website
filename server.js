const http = require('http');
const fs = require('fs');
const { JSDOM } = require('jsdom');
const port = 9000;
const ip = "127.0.0.1";
const pages = [
    "/", "/login", "/register"
]

const checkIfRegisterDataIsCorrect = (login, password, repeatPassword) => {
    if(login !== null && password!==null && repeatPassword!==null)   {
        if(password===repeatPassword)   {
            fs.readFile('users.json',(error, Data)=>{
                if(error)   {
                    console.log(error);
                }
                else    {
                    let userNameIsTaken=false;
                    const data = JSON.parse(Data);
                    data.users.forEach(user=>{
                        if(user.username===login)
                            userNameIsTaken=true;
                    });
                    if(userNameIsTaken)
                        console.log('The username you are trying to use is already taken please come up with another idea!');
                    else    {
                        let newUser = {username: login, password: password};
                        data.users.push(newUser);
                        console.log(data);
                        fs.writeFile('users.json',JSON.stringify(data),(error)=>{
                            if(error)
                                console.log(error);
                        });
                    }
                }
            });
        }
        else    {
            console.log("The passwords you provided aren't the same!")
        }
    }
}

const checkIfLoginAndPasswordAreCorrect = (login, password)  =>  {
    if(login !== null && password!==null)
    fs.readFile('users.json',(error, data)=>{
        if(error)
            console.log(error)
        else    {
            const usersData = JSON.parse(data);
            let loggedIn=false
            usersData.users.forEach(user=>{
                if(login===user.username && password===user.password)   {
                    loggedIn=true;
                }
            })
        }
    });
}

const renderRegisterPage = (req,res) => {
    fs.readFile('./views/registerPage.html',(err,data)=>{
        if(err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Something wrong happened in reading the source file!');
        }
        else    {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          const dom = new JSDOM(data);
          res.end(dom.serialize());
        }
    })
}

const renderLoginPage = (req,res) => {
    fs.readFile('./views/loginPage.html', 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Something wrong happened in reading the source file!');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          const dom = new JSDOM(data);
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
    if(req.method==="GET") {
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
        else if(pages.includes(req.url))   {
            switch(req.url) {
                case "/":
                    renderHomePage(req, res);
                case "/login":
                    renderLoginPage(req,res);
                case "/register":
                    renderRegisterPage(req,res);
                default:
                    renderHomePage(req, res);
                    break;
            }
        }

    }
    else if (req.method === 'POST' && req.url === '/login') {
        let body = '';
    
        req.on('data', (data) => {
          body += data;
        });
    
        req.on('end', () => {
          const loginData = JSON.parse(body);
          checkIfLoginAndPasswordAreCorrect(loginData.Username, loginData.Password)
        });
    }
    else if (req.method === 'POST' && req.url === '/register') {
        let body = '';
    
        req.on('data', (data) => {
          body += data;
        });
    
        req.on('end', () => {
          const registerData = JSON.parse(body);
          checkIfRegisterDataIsCorrect(registerData.Username, registerData.Password, registerData.repeatPassword);
        });
    }

});

server.listen(port, ip, () => {
    const Addr = server.address();
    console.log(`this is link: http://${Addr.address}:${Addr.port}`);
});