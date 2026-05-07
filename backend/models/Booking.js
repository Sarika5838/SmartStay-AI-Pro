import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  roomNumbers: [{ type: Number, required: true }],
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  bookingStatus: { type: String, enum: ['Booked', 'Cancelled', 'Completed'], default: 'Booked' },
  razorpayPaymentId: { type: String },
  razorpayOrderId: { type: String },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
