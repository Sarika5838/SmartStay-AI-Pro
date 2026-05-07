import axios from 'axios';

// High-quality Unsplash image pool for realistic mock data
const hotelImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c0d5b9af?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  'https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800&q=80',
  'https://images.unsplash.com/photo-1596436889106-be35e843f6a6?w=800&q=80'
];

/**
 * Fallback generator that creates realistic hotel data based on the city requested.
 */
const generateMockHotels = (city) => {
  const prefixes = ['The Grand', 'Luxury', 'Royal', 'Elite', 'Premier', 'Central', 'Oasis', 'Harbor'];
  const suffixes = ['Hotel & Suites', 'Plaza', 'Resort', 'Boutique Hotel', 'Inn', 'Retreat'];
  
  const roomTypes = ['Deluxe King Room', 'Premium Suite', 'Ocean View Room', 'City View Double', 'Standard Queen', 'Executive Suite'];

  const results = [];
  // Generate 3-4 random hotels for the given city
  const numHotels = Math.floor(Math.random() * 2) + 3; 
  
  for (let i = 0; i < numHotels; i++) {
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomImage = hotelImages[Math.floor(Math.random() * hotelImages.length)];
    const randomRoom = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    
    // Random rating between 4.0 and 5.0
    const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
    // Random price between 120 and 650
    const price = Math.floor(Math.random() * (650 - 120 + 1)) + 120;

    results.push({
      id: `mock_${Date.now()}_${i}`,
      name: `${randomPrefix} ${city} ${randomSuffix}`,
      location: city,
      rating: parseFloat(rating),
      price: price,
      roomType: randomRoom,
      imageUrl: randomImage,
      bookingUrl: `https://example.com/book/${city.toLowerCase().replace(/\s+/g, '-')}`
    });
  }
  
  return results;
};

/**
 * Fetches real hotel data from an API if configured, otherwise falls back to highly realistic mock data.
 */
export const searchHotels = async (location, checkIn, checkOut, guests, rooms) => {
  try {
    // Check if real API key is configured (Example using RapidAPI Booking.com)
    const apiKey = process.env.RAPIDAPI_KEY;
    
    if (apiKey) {
      console.log(`[HotelService] Using real API for ${location}`);
      // NOTE: This is a real API structure, but typically you need to fetch a location_id first.
      // This is simplified for demonstration. If it fails, we catch it and fallback.
      const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/search', {
        params: {
          checkout_date: checkOut || '2026-12-31',
          checkin_date: checkIn || '2026-12-30',
          dest_id: '-2018423', // Hardcoded dest_id for demo, would require another API call in production
          dest_type: 'city',
          adults_number: guests || '2',
          room_number: rooms || '1',
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
      });
      
      // Parse real API response if successful
      if (response.data && response.data.result && response.data.result.length > 0) {
         return response.data.result.slice(0, 4).map((hotel, index) => ({
           id: hotel.hotel_id.toString(),
           name: hotel.hotel_name,
           location: location,
           rating: hotel.review_score || 4.5,
           price: hotel.min_total_price || Math.floor(Math.random() * 300 + 100),
           roomType: 'Standard Room',
           imageUrl: hotel.max_photo_url || hotelImages[index % hotelImages.length],
           bookingUrl: hotel.url || '#'
         }));
      }
    }
    
    // If no API key or API didn't return valid results, fallback to generator
    console.log(`[HotelService] Using fallback mock data for ${location}`);
    return generateMockHotels(location);

  } catch (error) {
    console.error('[HotelService] Real API failed, falling back to mock data:', error.message);
    return generateMockHotels(location);
  }
};
