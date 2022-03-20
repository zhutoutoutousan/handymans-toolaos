// File system in node.js
const fs = require('fs');

// Get all files in the current folder
const files = fs.readdirSync(__dirname);
// Get all folders in the current folder
const folders = fs.readdirSync(__dirname).filter(file => fs.statSync(__dirname + '/' + file).isDirectory());

// If there is no file, exit
if (files.length === 0) {
    console.log('No file found');
    process.exit(0);
}

// If there are files, group them by their name
const filesByName = {};
files.forEach(file => {
    const name = file.split('.')[0];
    if (!filesByName[name]) {
        filesByName[name] = [];
    }
    filesByName[name].push(file);
});

// According to the  TODO


console.log(files);
console.log(folders);
console.log(filesByName);