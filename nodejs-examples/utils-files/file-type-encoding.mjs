export function isBufferUtf16(bytes) {
  if (bytes.length < 2) {
    return false;
  }

  if (bytes[0] === 0xfe && bytes[1] === 0xff) {
    return { isText: true, encoding: 'UTF-16BE', error: null };
  } else if (bytes[0] === 0xff && bytes[1] === 0xfe) {
    return { isText: true, encoding: 'UTF-16LE', error: null };
  } else if (
    bytes.length >= 3 &&
    bytes[0] === 0xef &&
    bytes[1] === 0xbb &&
    bytes[2] === 0xbf
  ) {
    return { isText: true, encoding: 'UTF-8', error: null };
  }
}

