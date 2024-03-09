// SlugRedirectModel.js

import mongoose from 'mongoose';

const slugRedirectSchema = new mongoose.Schema({
  oldSlug: {
    type: String,
    required: true,
    unique: true
  },
  newSlug: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const SlugRedirect = mongoose.model('SlugRedirect', slugRedirectSchema);

export default SlugRedirect;