const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://kqqyipnlkmmprfgygauk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcXlpcG5sa21tcHJmZ3lnYXVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjMyNDQyOSwiZXhwIjoyMDc3OTAwNDI5fQ.nmE-asCNpDnxix4ZxyNlEyocJdG8kPEunx9MHOTnXS0'
);

async function analyzeFAQs() {
  const { data, error } = await supabase
    .from('faqs')
    .select('category, question, slug')
    .eq('published', true);

  if (error) {
    console.error('Error:', error);
    return;
  }

  const categories = {};
  data.forEach(faq => {
    if (!categories[faq.category]) {
      categories[faq.category] = [];
    }
    categories[faq.category].push({ question: faq.question, slug: faq.slug });
  });

  console.log('=== FAQ 카테고리별 분포 ===\n');

  // 서비스 페이지와 관련된 카테고리 매핑
  const serviceMapping = {
    '위자료': ['alimony', 'separation-expense'],
    '재산분할': ['property-division'],
    '양육권/양육비': ['custody', 'child-support', 'visitation', 'paternity'],
    '상간/불륜': ['adultery']
  };

  Object.entries(categories).forEach(([category, questions]) => {
    console.log(`[${category}] - ${questions.length}개`);
  });

  console.log('\n=== 서비스별 관련 FAQ 상세 ===\n');

  Object.entries(serviceMapping).forEach(([service, relatedCategories]) => {
    console.log(`\n【${service} 서비스】`);
    let totalCount = 0;

    relatedCategories.forEach(cat => {
      if (categories[cat]) {
        console.log(`  - ${cat}: ${categories[cat].length}개`);
        console.log(`    샘플 질문:`);
        categories[cat].slice(0, 3).forEach(faq => {
          console.log(`      • ${faq.question} (/${faq.slug})`);
        });
        totalCount += categories[cat].length;
      }
    });

    console.log(`  총 ${totalCount}개 FAQ\n`);
  });
}

analyzeFAQs();