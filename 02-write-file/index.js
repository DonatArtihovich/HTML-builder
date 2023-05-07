const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);

stdout.write('Будь как дома, путник, я ни в чем не откажу. Введи текст, я запишу!\n');
stdin.on('data', data => {
  if(data.toString().trim() === 'exit') process.exit();
  writeStream.write(data);
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('И волки среди ночи завыли под окном, старик заулыбался и вдруг покинул дом'));
