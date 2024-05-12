const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const port = 8898;

const server = http.createServer(async (req, res) => {
  try {
    let filePath;
    if (req.url === '/') {
      filePath = path.join(__dirname, '../public/index.html');
    } else if (req.url === '/cars') {
      filePath = path.join(__dirname, '../public/cariMobil.html');
    } else if (req.url === '/styles.css') {
      filePath = path.join(__dirname, '../public/css/styles.css');
    } else if (req.url === '/script.js') {
      filePath = path.join(__dirname, 'script.js');
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('File not found');
      return;
    }

    const fileContent = await fs.readFile(filePath);
    const contentType = getContentType(filePath);

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(fileContent);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
});

function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    default:
      return 'application/octet-stream';
  }
}


server.listen(port, 'localhost', () => {
  console.log(`Server running at http://localhost:${port}/`);
});