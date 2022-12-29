import { ClassicLevel } from 'classic-level';
import { EntryStream } from 'level-read-stream';
import { MemoryLevel } from 'memory-level';
import { pipeline, Writable } from 'readable-stream';

// [Pipeline isn't being exported in Typescript · nodejs/readable-stream](https://github.com/nodejs/readable-stream/issues/494)


(async () => {
  const db = new ClassicLevel<string, any>('./testdata/cls', { valueEncoding: 'json' })
  // const db = new MemoryLevel<string, any>()

  await db.put('a', '11')
  await db.put('b', '22')
  await db.put('c', '33')

  const src = new EntryStream(db, {
    gte: 'b'
  })

  const dst = new Writable({
    objectMode: true, // 🚨  When set, it becomes possible to write JavaScript values other than string, Buffer or Uint8Array if supported by the stream implementation. Default: false.
    write(entry, _, next) {
      console.log(';; w ', '%s: %s', entry.key, entry.value)
      next()
    }
  })

  pipeline(src, dst)
})();


