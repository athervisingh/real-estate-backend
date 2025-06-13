import mongoose from 'mongoose';

const damac360Schema = new mongoose.Schema({
  name: String,
  links360: [String],
  image: String,
});

const Damac360 = mongoose.model('Damac360', damac360Schema, 'damac360');

export default Damac360; // ✅ export default
