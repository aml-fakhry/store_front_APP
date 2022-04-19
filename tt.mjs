dotenv.config();

const dbService = new DbService();

async function test() {
  try {
    const result = await dbService.doQuery('SELECT * FROM test;');
    console.log(result.rows);
  } catch (error) {
    console.log(error.stack);
  }
}

test();
