const fs = require('fs');
const path = require('path');

const stylesArray = [];
const dirPath = path.join(__dirname, 'styles');
const filesArr = fs.readdirSync(dirPath, {withFileTypes: true})

filesArr.forEach((file) => {
    if(file.isDirectory()) return
    const curPath = path.join(__dirname, 'styles', file.name);
    if(path.extname(curPath) !== '.css') return
    stylesArray.push(fs.readFileSync(curPath, { encoding: 'utf-8' }))
});

const stylePath = path.join(__dirname, 'project-dist', 'bundle.css');
const output = fs.createWriteStream(stylePath);

stylesArray.forEach((component) => {
    output.write(component);
})