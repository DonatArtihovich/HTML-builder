const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'project-dist', 'bundle.css');
const dirPath = path.join(__dirname, 'styles');

fs.readdir(dirPath, {withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    if(file.isDirectory()) return
    const curPath = path.join(__dirname, 'styles', file.name);
    if(path.extname(curPath) !== '.css') return
    const readableStream = fs.createReadStream(curPath);
    readableStream.on('data', (data) => {
        fs.appendFile(stylePath, data, err => {
          if (err) console.log(err)
        })
    })
  })
  
});