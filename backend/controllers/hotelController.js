import Hotel from '../models/Hotel.js';

import { searchHotels } from '../services/hotelService.js';

export const getHotels = async (req, res) => {
  try {
    const { city, min, max, ...others } = req.query;
    const limit = parseInt(req.query.limit) || 10;

    let query = { ...others };
    if (city) {
      query.city = { $regex: new RegExp(city, "i") }; // Case-insensitive search
    }
    if (min || max) {
      query.cheapestPrice = {};
      if (min) query.cheapestPrice.$gt = parseInt(min) | 1;
      if (max) query.cheapestPrice.$lt = parseInt(max) || 9999;
    }

    let hotels = await Hotel.find(query).limit(limit);

    // Fallback if local database is empty
    if (hotels.length === 0) {
      const searchCity = city || 'New York';
      hotels = await searchHotels(searchCity, null, null, 2, 1);
    }

    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
