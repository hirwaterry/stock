const mongoose = require('mongoose');

const StockOutSchema = new mongoose.Schema({
  product: 
  { type: mongoose.Schema.Types.ObjectId, ref: 'items', 
    required: true 
    },
  quantity: 
  { type: Number, 
    required: true 
    },
  date: 
  { 
    type: Date, default: Date.now 
  }
});

module.exports = mongoose.model('StockOut', StockOutSchema);
