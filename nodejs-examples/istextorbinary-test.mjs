import { readFileSync, createReadStream } from 'fs';

import { isText, isBinary, getEncoding } from 'istextorbinary';

import { isBufferUtf16 } from './utils-files/file-type-encoding.mjs';

// const path = './fileseeds/utf16le-requirements.txt';
const path = './fileseeds/utf16le-empty.txt';
// isBinary(aFilename) // returns true if a binary file otherwise false, checks only filename
// const isBinaryFile = isBinary(path); // false

// 下面只检查文件名后缀，不检查文件内容
// path = './fileseeds/utf16le-requirements.png';
// const isBinaryFile = isBinary(path); // true

// path = '../assets/cde-internal-server-error.png';
// const isBinaryFile = isBinary(path); // true
// path = '/Users/yaoo/Documents/repos/com2024-showmebug/yaoo/code-playgrounds-js/assets/cde-internal-server-error.png';
// const isBinaryFile = isBinary( path ); // true

const fileBuffer = readFileSync(path);

const isTextFile = isText(null, fileBuffer);
// const isTextFile = isFileUtf16(path);
const isBinaryFile = isBinary(null, fileBuffer);
const isBinaryFile2 = isBufferUtf16(fileBuffer);
// returns 'binary' if it contained non-utf8 characters, otherwise returns 'utf8'
const encoding = getEncoding(path);
// console.log({ isBinaryFile });

let fileContent = '';
if (isBinaryFile2 === 'utf16le') {
  // fileContent = fileBuffer.slice(2).toString('utf16le');
  fileContent = fileBuffer.subarray(2).toString('utf16le');
  console.log(';; cnt-0', fileContent[0], 'c-1', fileContent[1]);
  // console.log('First character code:', fileContent.charCodeAt(0));
  // console.log('First character:', fileContent[0]);
  console.log('First 5 characters:', Array.from(fileContent.slice(0, 5)));
}

console.log({ isBinaryFile, isBinaryFile2, isTextFile, encoding });
