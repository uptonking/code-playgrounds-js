import { readFileSync, createReadStream, writeFileSync } from 'fs';
import { Buffer } from 'buffer';

const path = './fileseeds/utf16le-test1.txt';
// const path = './fileseeds/utf16le-requirements.txt';
// const path = './fileseeds/utf16le-empty.txt';

/**
 * - https://stackoverflow.com/questions/58985876
 * @param {*} path fs.PathLike
 * @param {*} n number >=1
 * @returns : Promise<Buffer>
 */
async function readFirstNBytes(path, n) {
  const chunks = [];
  for await (const chunk of createReadStream(path, { start: 0, end: n - 1 })) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function isFileUtf16(path) {
  try {
    // 🚨 start/end 不存在，ai编造
    // const buffer = readFileSync(filePath, { flag: 'r', start: 0, end: 10 });
    const buffer = await readFirstNBytes(path, 10);
    console.log(';; buffer.length ', buffer.length);
    // Check for UTF-16LE BOM (FF FE)
    if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
      return 'utf16le';
    }

    // Check for UTF-16BE BOM (FE FF)
    if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
      return 'utf16be';
    }

    // Additional heuristic check for UTF-16LE without BOM
    // Check if every second byte is 0x00 (common in ASCII range UTF-16LE)
    if (buffer.length >= 4) {
      let isLikelyUtf16LE = true;
      for (let i = 1; i < Math.min(buffer.length, 100); i += 2) {
        if (buffer[i] !== 0x00) {
          isLikelyUtf16LE = false;
          break;
        }
      }
      if (isLikelyUtf16LE) return 'utf16le';
    }

    return false;
  } catch (error) {
    console.error('Error reading file:', error);
    return false;
  }
}

async function testreadUtf16File() {
  console.log(';; isFileUtf16 ', await isFileUtf16(path));
}

testreadUtf16File();

function writeUtf16File(path, text, encoding = 'utf16le') {
  // const bom = Buffer.from(encoding === 'utf16be' ? [0xfe, 0xff] : [0xff, 0xfe]);
  const bom = Buffer.from([0xff, 0xfe]);
  // .from 不支持 utf16be
  const textBuffer = Buffer.from(text, encoding);
  const fileBuffer = Buffer.concat([bom, textBuffer]);
  writeFileSync(path, fileBuffer);
}

async function testWriteUtf16File() {
  // Test cases
  const testPath1 = './fileseeds/utf16le-test1.txt';
  const testPath2 = './fileseeds/utf16le-test2.txt';
  const testPath3 = './fileseeds/utf16le-test3.txt';

  // Test case 1: Basic ASCII text
  writeUtf16File(testPath1, 'Hello, UTF-16!');
  console.log('Test 1 - File encoding:', await isFileUtf16(testPath1));
  console.log(
    'Test 1 - Content:',
    readFileSync(testPath1).subarray(2).toString('utf16le'),
  );

  // Test case 2: Text with non-ASCII characters
  writeUtf16File(testPath2, '你好，UTF-16！🌍');
  console.log('Test 2 - File encoding:', await isFileUtf16(testPath2));
  console.log(
    'Test 2 - Content:',
    readFileSync(testPath2).subarray(2).toString('utf16le'),
  );

  writeUtf16File(testPath3, '');
  console.log('Test 3 - File encoding:', await isFileUtf16(testPath3));
  console.log(
    'Test 3 - Empty Content:',
    readFileSync(testPath3).subarray(2).toString('utf16le'),
  );
}

// testWriteUtf16File()
