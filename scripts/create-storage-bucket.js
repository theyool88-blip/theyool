/**
 * Testimonial Photos Storage Bucket 생성 스크립트
 */

const { createClient } = require('@supabase/supabase-js');

async function createBucket() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log('🪣 Storage Bucket 생성 중...\n');

  // 1. 버킷 생성
  const { data: bucket, error: bucketError } = await supabase.storage.createBucket('testimonial-photos', {
    public: true,
    fileSizeLimit: 5242880, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
  });

  if (bucketError) {
    if (bucketError.message.includes('already exists')) {
      console.log('✅ Bucket이 이미 존재합니다: testimonial-photos\n');
    } else {
      console.error('❌ Bucket 생성 실패:', bucketError.message);
      console.log('\n수동 생성 방법:');
      console.log('1. https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/storage/buckets');
      console.log('2. "New bucket" 클릭');
      console.log('3. Name: testimonial-photos');
      console.log('4. Public bucket: ON');
      console.log('5. File size limit: 5MB');
      console.log('6. Allowed MIME types: image/jpeg, image/png, image/webp');
      process.exit(1);
    }
  } else {
    console.log('✅ Bucket 생성 완료: testimonial-photos');
    console.log(`   - Public: Yes`);
    console.log(`   - Size limit: 5MB`);
    console.log(`   - MIME types: image/jpeg, image/png, image/webp\n`);
  }

  // 2. 버킷 존재 확인
  const { data: buckets } = await supabase.storage.listBuckets();
  const testimonialBucket = buckets?.find(b => b.name === 'testimonial-photos');

  if (testimonialBucket) {
    console.log('📊 Bucket 정보:');
    console.log(`   - ID: ${testimonialBucket.id}`);
    console.log(`   - Name: ${testimonialBucket.name}`);
    console.log(`   - Public: ${testimonialBucket.public}`);
    console.log(`   - Created: ${testimonialBucket.created_at}\n`);
  }

  // 3. 테스트 폴더 구조 설명
  console.log('📁 파일 구조:');
  console.log('   testimonial-photos/');
  console.log('     ├── {testimonial_id}/');
  console.log('     │   └── {timestamp}_{filename}.jpg');
  console.log('     └── defaults/');
  console.log('         └── avatar-amber.svg (optional)\n');

  console.log('✨ Storage Bucket 설정 완료!');
  console.log('\n다음 단계:');
  console.log('1. Storage policies 설정 (RLS)');
  console.log('2. 파일 업로드 API 테스트');
}

createBucket();
