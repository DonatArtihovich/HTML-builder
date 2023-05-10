const fs = require('fs');
const path = require('path');
const { stdout } = process;

const dirPath = path.join(__dirname, 'secret-folder');
fs.readdir(dirPath, { withFileTypes: true }, (err, data) => {
  if (err) {
    console.log(err);
    process.exit();
  }
  data.forEach(d => {
    if(d.isDirectory()) return;
    const filePath = path.join(__dirname, 'secret-folder', d.name);
    const fileName = path.basename(d.name).split('.').slice(0, path.basename(d.name).split('.').length - 1).join('.');
    const fileExtension = path.extname(d.name)
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.log(err);
        process.exit();
      }
      const fileSize = stats.size/1000 + 'Кб';
      stdout.write(fileName + ' - ' + fileExtension + ' - ' + fileSize + '\n');
    });
  });
});    
        