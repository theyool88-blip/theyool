const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const INSTAGRAM_DB_ID = process.env.NOTION_INSTAGRAM_DB;

async function checkTypes() {
  const response = await notion.databases.query({
    database_id: INSTAGRAM_DB_ID,
  });

  const types = new Set();
  response.results.forEach(page => {
    const type = page.properties.타입?.select?.name;
    if (type) types.add(type);
  });

  console.log('Notion Instagram 타입 목록:');
  types.forEach(type => console.log(`  - ${type}`));
}

checkTypes();
