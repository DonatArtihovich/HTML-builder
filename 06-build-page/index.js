const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const templatesObject = {};
fs.readdir(componentsDir, (err, files) => {
  if (err) console.log(err);
  const projectPath = path.join(__dirname, 'project-dist');
  fs.mkdir(projectPath, err => {
    if (err) console.log(err);
    joinStyles();
    copyDir();
    files.forEach(f => {
      const curPath = path.join(componentsDir, f);
      const curName = f.split('.')[0];
      fs.readFile(curPath, 'utf-8', (err, data) => {
        if (err) console.log(err);
        templatesObject[curName] = data;
        if (files.indexOf(f) === files.length - 1) changeFile()
      })
    });

  })
});

function changeFile() {
  const templatePath = path.join(__dirname, 'template.html');
  const indexPath = path.join(__dirname, 'project-dist', 'index.html');
  fs.readFile(templatePath, 'utf-8', (err, data) => {
    if (err) console.log(err)
    const templatesArr = data.match(/{{.*}}/g);
    if (!templatesArr) return
    let outStr = data;
    templatesArr.forEach(str => {
      const keyStr = str.slice(2, -2);
      const subStr = templatesObject[keyStr];
      outStr = outStr.replace(str, subStr);
      fs.writeFile(indexPath, '', err => {
        if (err) console.log(err);
        fs.writeFile(indexPath, outStr, err => {
          if (err) console.log(err);
        });
      })

    })
  })
}

function joinStyles() {
  const stylePath = path.join(__dirname, 'project-dist', 'style.css');
  const dirPath = path.join(__dirname, 'styles');
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err)
    files.forEach(file => {
      if (file.isDirectory()) return
      const curPath = path.join(__dirname, 'styles', file.name);
      if (path.extname(curPath) !== '.css') return
      const readableStream = fs.createReadStream(curPath);
      readableStream.on('data', (data) => {
        fs.appendFile(stylePath, data, err => {
          if (err) console.log(err)
        })
      })
    })
  });
}

function copyDir(dirPath = path.join(__dirname, 'assets'),
  newDirPath = path.join(__dirname, 'project-dist', 'assets')) {
  fs.mkdir(newDirPath, { recursive: true }, (err) => {
    if (err) console.log('f');
  })

  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
      if (file.isDirectory()) {
        const copyDirPath = path.join(dirPath, file.name);
        const newCopyDirPath = path.join(newDirPath, file.name)
        copyDir(copyDirPath, newCopyDirPath)
      } else {
        const filePath = path.join(dirPath, file.name);
        const newFilePath = path.join(newDirPath, file.name)
        fs.copyFile(filePath, newFilePath, err => {
          if (err) console.log(err)
        })
      }
    })
  })
}

