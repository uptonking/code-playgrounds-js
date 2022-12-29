import { Level } from 'level';

(async () => {
  // Specify types of keys and values (any, in the case of json).
  // The generic type parameters default to Level<string, string>.
  const db = new Level<string, any>('testdata/lv', { valueEncoding: 'json' });

  // Add an entry with key 'a' and value 1
  await db.put('a', 11);

  // Add multiple entries
  await db.batch([{ type: 'put', key: 'b', value: 22 }]);

  // Get value of key 'a': 1
  const value = await db.get('a');

  // Iterate entries with keys that are greater than 'a'
  for await (const [key, value] of db.iterator({ gt: 'a' })) {
    console.log(';; for-bd ', key, value); // 2
  }
})();
