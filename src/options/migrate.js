const { mariadb, sqlite } = require('./connections.js');

//IIFE funcion autoinvocada

(async () => {

  try {
    await mariadb.schema.dropTableIfExists('products')
    await mariadb.schema.createTable('products', table => {
      table.increments('id')
      table.string('title',60)
      table.decimal('price', 8, 2)
      table.string('thumbnail',600)
    })
    console.log('Migration to mariadb done.')

    await sqlite.schema.dropTableIfExists('messages')
    await sqlite.schema.createTable('messages', table => {
      table.increments('id');
      table.string('user',60).nullable(false);
      table.text('message',2000).nullable(false);
      table.string('timeStamp');
    })
    console.log('Migration to sqlite done.')
  }
  catch (e) {
    console.log(e)
  }
  finally {
    mariadb.destroy()
    sqlite.destroy()
  }

})()
