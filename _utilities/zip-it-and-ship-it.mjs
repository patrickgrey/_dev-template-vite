import * as fs from 'fs';
import * as path from 'path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const dirTree = require("directory-tree");
const archiver = require("archiver");

const source = "website-publish";
const maxMBFileSize = 2;
const allowFiles = ['.mp3', '.html', '.js', '.css', '.pdf', '.gif'];

const filteredTree = dirTree(source, {
  extensions: /\.html/,
  exclude: /_data/,
  attributes: ['extension']
});

const traverse = function (o, fn, scope = []) {
  for (let i in o) {
    fn.apply(this, [i, o[i], scope]);
    if (o[i] !== null && typeof o[i] === "object") {
      traverse(o[i], fn, scope.concat(i));
    }
  }
};

const deleteLargeFiles = function (dirPath) {
  const files = fs.readdirSync(dirPath)

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      deleteLargeFiles(dirPath + "/" + file)
    } else {
      const bytes = fs.statSync(dirPath + "/" + file).size;
      const mb = (bytes / (1024 * 1024)).toFixed(2);
      if (mb > maxMBFileSize && !allowFiles.includes(path.extname(file))) {
        console.log("file: ", file);
        try {
          console.log("Removed due to being bigger than max file size limit: ", dirPath + "/" + file);
          fs.unlinkSync(dirPath + "/" + file)
        } catch (err) {
          console.error(err)
        }
      }
    }
  })
}

deleteLargeFiles("./" + source);

let pathArray = [];
let previousPath = "";

traverse(filteredTree, (key, value, scope) => {
  if (key === "path") {
    previousPath = value;
  }
  if (key === "extension" && value === ".html") {
    pathArray.push(previousPath);
  }
});

pathArray.splice(pathArray.indexOf(`${source}\\_web-page-template`), 1);
pathArray.splice(pathArray.indexOf(`${source}\\index.html`), 1);

function zipIt(folder, zipName) {
  const output = fs.createWriteStream(folder + "/" + zipName);
  const archive = archiver('zip');
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      console.log('ENOENT');
    } else {
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);
  archive.glob('**/*', { cwd: folder, ignore: zipName });
  archive.finalize();
}

// console.log("pathArray: ", pathArray);

let pathTracker = [];

const zipArray = pathArray.map(async (item) => {
  const splitPath = item.split("\\");
  // Remove index page
  splitPath.pop();

  const folderPath = "./" + splitPath.join("/");
  const zipName = `${splitPath[splitPath.length - 1]}.zip`;
  if (!pathTracker.includes(folderPath)) {
    zipIt(folderPath, zipName);
    pathTracker.push(folderPath);
  }

  return folderPath;
});
