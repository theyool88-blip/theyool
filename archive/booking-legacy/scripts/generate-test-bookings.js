/**
 * Generate 50 realistic test bookings for simulation
 * Simulates real-world booking patterns and edge cases
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Realistic Korean names
const names = [
  '김민수', '이수진', '박지현', '최영희', '정민호',
  '강서연', '윤지우', '임하은', '한승우', '오나연',
  '송준호', '배수지', '신동욱', '류미경', '홍성민',
  '권예린', '장태양', '조은비', '문재현', '안소희',
  '유정훈', '백서진', '노지훈', '서민지', '황유진',
  '구민서', '태지훈', '남수아', '진예은', '방수빈',
  '변지호', '도하늘', '석민준', '탁서우', '표지안',
  '함예준', '여서현', '양하린', '복민서', '빈지우',
  '전유빈', '염준서', '선다은', '설서준', '공은우',
  '피지아', '라민아', '길서윤', '차하준', '추민재'
];

// Categories with realistic distribution
const categories = [
  { name: '위자료 청구', weight: 30 },
  { name: '재산분할', weight: 25 },
  { name: '양육권', weight: 20 },
  { name: '양육비', weight: 15 },
  { name: '불륜/상간', weight: 5 },
  { name: '협의이혼', weight: 3 },
  { name: '기타', weight: 2 }
];

// Realistic messages
const messages = [
  '이혼 절차에 대해 상담받고 싶습니다.',
  '배우자의 불륜이 의심됩니다. 증거 확보 방법을 알고 싶습니다.',
  '재산분할 비율이 궁금합니다.',
  '양육권을 꼭 가져오고 싶습니다.',
  '위자료를 얼마나 받을 수 있을까요?',
  '협의이혼 진행 중인데 조언이 필요합니다.',
  '배우자가 양육비를 주지 않습니다.',
  '빠른 시일 내에 상담 가능할까요?',
  '수임료가 궁금합니다.',
  '처음 이혼을 고민 중입니다. 어떻게 시작해야 할까요?',
  '법원 조정 중인데 변호사 선임이 필요합니다.',
  '급하게 상담이 필요합니다. 연락 부탁드립니다.',
  '자세한 상담을 받고 싶습니다.',
  '배우자의 재산을 숨긴 것 같습니다.',
  '아이들을 위해 최선의 방법을 찾고 싶습니다.'
];

// Lawyer preferences with realistic distribution
const lawyerPreferences = [
  { name: '육심원', weight: 40 },
  { name: '임은지', weight: 50 },
  { name: null, weight: 10 } // No preference
];

// Generate phone numbers
function generatePhone() {
  const prefixes = ['010', '011', '016', '017', '018', '019'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const middle = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  const last = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `${prefix}-${middle}-${last}`;
}

// Generate email
function generateEmail(name) {
  const domains = ['gmail.com', 'naver.com', 'daum.net', 'kakao.com', 'hanmail.net'];
  const random = Math.floor(Math.random() * 10000);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name.replace(/\s/g, '').toLowerCase()}${random}@${domain}`;
}

// Weighted random selection
function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of items) {
    if (random < item.weight) {
      return item.name;
    }
    random -= item.weight;
  }

  return items[items.length - 1].name;
}

// Generate dates (next 2 weeks, weekdays only)
function generateBookingDate() {
  const today = new Date();
  const daysAhead = Math.floor(Math.random() * 14) + 1; // 1-14 days ahead
  const date = new Date(today);
  date.setDate(date.getDate() + daysAhead);

  // Skip weekends
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }

  return date.toISOString().split('T')[0];
}

// Generate time slots (09:00-17:30, 30min intervals)
function generateTimeSlot() {
  const hours = [9, 10, 11, 13, 14, 15, 16, 17];
  const minutes = ['00', '30'];

  // Weight towards popular times (10:00-15:00)
  const weights = [5, 15, 15, 20, 20, 15, 7, 3];
  let random = Math.random() * weights.reduce((a, b) => a + b, 0);

  let selectedHour = hours[0];
  for (let i = 0; i < hours.length; i++) {
    if (random < weights[i]) {
      selectedHour = hours[i];
      break;
    }
    random -= weights[i];
  }

  const minute = minutes[Math.floor(Math.random() * minutes.length)];
  return `${String(selectedHour).padStart(2, '0')}:${minute}`;
}

// Generate status distribution
function generateStatus() {
  const statuses = [
    { name: 'pending', weight: 60 },
    { name: 'confirmed', weight: 30 },
    { name: 'cancelled', weight: 5 },
    { name: 'completed', weight: 5 }
  ];
  return weightedRandom(statuses);
}

// Generate bookings
async function generateBookings() {
  console.log('🎲 Generating 50 realistic test bookings...\n');

  const bookings = [];
  const usedSlots = new Map(); // Track used date-time-office combinations

  for (let i = 0; i < 50; i++) {
    const name = names[i];
    const type = Math.random() > 0.3 ? 'visit' : 'video'; // 70% visit, 30% video
    const office = type === 'visit'
      ? (Math.random() > 0.6 ? '천안' : '평택') // 60% 평택, 40% 천안
      : null;

    let date, time, slotKey;
    let attempts = 0;

    // Find available slot (prevent duplicates)
    do {
      date = generateBookingDate();
      time = generateTimeSlot();
      slotKey = `${date}-${time}-${office || 'video'}`;
      attempts++;

      if (attempts > 100) {
        // If can't find unique slot, allow overlap (realistic scenario)
        break;
      }
    } while (usedSlots.has(slotKey));

    usedSlots.set(slotKey, true);

    const booking = {
      type,
      name,
      phone: generatePhone(),
      email: Math.random() > 0.2 ? generateEmail(name) : null, // 80% provide email
      category: weightedRandom(categories),
      message: Math.random() > 0.3 ? messages[Math.floor(Math.random() * messages.length)] : null,
      preferred_date: date,
      preferred_time: time,
      office_location: office,
      // preferred_lawyer: weightedRandom(lawyerPreferences), // Skip for now - column not in DB yet
      status: generateStatus()
    };

    bookings.push(booking);
  }

  return bookings;
}

// Insert bookings and track performance
async function insertBookings(bookings) {
  console.log('📥 Inserting bookings into database...\n');

  const results = {
    success: 0,
    failed: 0,
    errors: [],
    timing: []
  };

  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    const startTime = Date.now();

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();

      const duration = Date.now() - startTime;
      results.timing.push(duration);

      if (error) {
        results.failed++;
        results.errors.push({ booking: i + 1, error: error.message });
        console.log(`❌ Booking ${i + 1}: ${error.message}`);
      } else {
        results.success++;
        if ((i + 1) % 10 === 0) {
          console.log(`✅ ${i + 1}/50 bookings inserted...`);
        }
      }
    } catch (err) {
      results.failed++;
      results.errors.push({ booking: i + 1, error: err.message });
      console.log(`❌ Booking ${i + 1}: ${err.message}`);
    }
  }

  return results;
}

// Analyze results
function analyzeResults(results, bookings) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 SIMULATION RESULTS');
  console.log('='.repeat(60));

  console.log(`\n✅ Success: ${results.success}/50 (${(results.success/50*100).toFixed(1)}%)`);
  console.log(`❌ Failed: ${results.failed}/50 (${(results.failed/50*100).toFixed(1)}%)`);

  if (results.timing.length > 0) {
    const avgTime = results.timing.reduce((a, b) => a + b, 0) / results.timing.length;
    const maxTime = Math.max(...results.timing);
    const minTime = Math.min(...results.timing);

    console.log(`\n⏱️  Performance:`);
    console.log(`   Average: ${avgTime.toFixed(0)}ms`);
    console.log(`   Min: ${minTime}ms`);
    console.log(`   Max: ${maxTime}ms`);
  }

  // Analyze booking distribution
  const typeCount = { visit: 0, video: 0 };
  const officeCount = { '천안': 0, '평택': 0 };
  const statusCount = { pending: 0, confirmed: 0, cancelled: 0, completed: 0 };
  const categoryCount = {};

  bookings.forEach(b => {
    typeCount[b.type]++;
    if (b.office_location) officeCount[b.office_location]++;
    statusCount[b.status]++;
    categoryCount[b.category] = (categoryCount[b.category] || 0) + 1;
  });

  console.log(`\n📈 Booking Distribution:`);
  console.log(`   Type: 방문 ${typeCount.visit}, 화상 ${typeCount.video}`);
  console.log(`   Office: 천안 ${officeCount['천안']}, 평택 ${officeCount['평택']}`);
  console.log(`   Status: Pending ${statusCount.pending}, Confirmed ${statusCount.confirmed}, Cancelled ${statusCount.cancelled}, Completed ${statusCount.completed}`);
  console.log(`   Categories:`, Object.entries(categoryCount).map(([k,v]) => `${k} (${v})`).join(', '));

  if (results.errors.length > 0) {
    console.log(`\n🔍 Errors (${results.errors.length}):`);
    results.errors.slice(0, 5).forEach(err => {
      console.log(`   Booking #${err.booking}: ${err.error}`);
    });
    if (results.errors.length > 5) {
      console.log(`   ... and ${results.errors.length - 5} more errors`);
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Booking System Simulation\n');
  console.log('Generating realistic test data for stress testing...\n');

  try {
    // Generate bookings
    const bookings = await generateBookings();

    console.log('✅ Generated 50 bookings\n');
    console.log('Sample booking:');
    console.log(JSON.stringify(bookings[0], null, 2));
    console.log('');

    // Insert into database
    const results = await insertBookings(bookings);

    // Analyze results
    analyzeResults(results, bookings);

    console.log('\n' + '='.repeat(60));
    console.log('✨ Simulation Complete!');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ Simulation failed:', error);
    process.exit(1);
  }
}

main();
