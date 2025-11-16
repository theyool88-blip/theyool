const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const BLOG_DB_ID = process.env.NOTION_BLOG_DB;

async function checkBlogPosts() {
  try {
    const response = await notion.databases.query({
      database_id: BLOG_DB_ID,
    });

    console.log('\n=== 변호사 칼럼 데이터 확인 ===\n');
    response.results.forEach((page, index) => {
      const props = page.properties;
      const num = index + 1;
      console.log(num + '. ' + (props.제목?.title?.[0]?.plain_text || 'No title'));
      console.log('   카테고리: ' + (props.카테고리?.multi_select?.map(c => c.name).join(', ') || 'None'));
      console.log('   태그: ' + (props.태그?.multi_select?.map(t => t.name).join(', ') || 'None'));
      console.log('   요약: ' + (props.요약?.rich_text?.[0]?.plain_text || 'Not set'));
      console.log('');
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkBlogPosts();
