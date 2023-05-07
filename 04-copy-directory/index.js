const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files');
const newDirPath = path.join(__dirname, 'files-copy');
fs.mkdir(newDirPath, {recursive: true}, (err) => {
  if (err) {
    console.log(err);
    process.exit();
  }
});

fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.log(err);
    process.exit();
  }
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const newFilePath = path.join(newDirPath, file);
    fs.copyFile(filePath, newFilePath, err => {
      if (err) {
        console.log(err);
        process.exit();
      }
    });
  });
});
