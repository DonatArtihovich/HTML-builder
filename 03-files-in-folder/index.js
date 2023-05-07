const fs = require('fs');
const path = require('path');
const { stdout } = process;

const dirPath = path.join(__dirname, 'secret-folder');
fs.readdir(dirPath, { withFileTypes: true }, (err, data) => {
  data.forEach(d => {
    if(d.isDirectory()) return;
    const filePath = path.join(__dirname, 'secret-folder', d.name);
    const fileName = d.name.split('.')[0];
    const fileExtension = d.name.split('.')[1];
    fs.stat(filePath, (err, stats) => {
      const fileSize = stats.size/1000 + 'Кб';
      stdout.write(fileName + ' - ' + fileExtension + ' - ' + fileSize + '\n');
    });
  });
});    
        