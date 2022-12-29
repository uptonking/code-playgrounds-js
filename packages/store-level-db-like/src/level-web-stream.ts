import { EntryStream } from 'level-web-stream';
import { MemoryLevel } from 'memory-level';

(async () => {
  const db = new MemoryLevel();

  // Write sample data
  await db.put('a', '1');
  await db.put('b', '2');
  await db.put('c', '3');

  // Create a ReadableStream
  const src = new EntryStream(db, {
    gte: 'b',
  });

  // Pipe to a stream of choice
  const dst = new WritableStream({
    write([key, value]) {
      console.log('%s: %s', key, value);
    },
  });

  await src.pipeTo(dst);
})();
