// Test booking creation API
const testBooking = async () => {
  const data = {
    type: "visit",
    name: "테스트 예약",
    phone: "010-1234-5678",
    email: "test@example.com",
    preferred_date: "2025-11-21",
    preferred_time: "14:00",
    office_location: "천안",
    category: "재산분할",
    message: "테스트 메시지입니다"
  };

  try {
    const response = await fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
};

testBooking();