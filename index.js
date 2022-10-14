const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const server = http.createServer((request, response) => {
  let filePath = request.url;
  switch (filePath) {
    case '/':
      filePath = 'index.html';
      break;
    case '/about':   
      filePath = filePath + '.html';
      break;
    case '/contact-me':
      filePath = filePath + '.html';
      break;
    default:
      break;
  }

  const requestPath = path.join(__dirname, 'public', filePath);

  fs.readFile(requestPath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {

        const default404 = path.join(__dirname, 'public', '404.html');

        fs.readFile(default404, (err, data) => {
          response.writeHead(404, {'Content-Type' : 'text/html '});
          response.end(data)
          return;
        })

      } else {
        response.writeHead(500);
        response.end(`Error: ${err.code}`)
      }
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html'});
      response.end(data);
    }
  })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}\n`))