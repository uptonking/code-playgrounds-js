import { readdir } from 'node:fs/promises';
import { statSync } from 'node:fs';

try {
  // const files = await readdir('.'); // not work
  const files = await readdir('../');
  console.log(';; import.meta.dirname ', import.meta.dirname);
  // console.log(
  //   ';; statSync-filename ',
  //   statSync(import.meta.filename).isDirectory(),
  // );
  // console.log(
  //   ';; statSync-dirname ',
  //   statSync(import.meta.dirname).isDirectory(),
  // );
  for (const file of files) console.log(file);
} catch (err) {
  console.error(err);
}
