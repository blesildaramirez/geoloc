'use strict';

import mongoose from 'mongoose';

var StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  geoLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
}).index({ geoLocation: '2dsphere' });

export default mongoose.model('Store', StoreSchema);
