const express = require('express');
const router = express.Router();
const StockIn = require('../models/StockIn');
const StockOut = require('../models/StockOut');
const Item = require('../models/items');
const mongoose = require('mongoose');

// Get remaining stock per item
router.get('/', async (req, res) => {
  try {
    const stockInAgg = await StockIn.aggregate([
      {
        $group: {
          _id: '$product',
          totalIn: { $sum: '$quantity' }
        }
      }
    ]);

    const stockOutAgg = await StockOut.aggregate([
      {
        $group: {
          _id: '$product',
          totalOut: { $sum: '$quantity' }
        }
      }
    ]);

    // Convert to maps for easy lookup
    const inMap = {};
    const outMap = {};
    stockInAgg.forEach(entry => inMap[entry._id.toString()] = entry.totalIn);
    stockOutAgg.forEach(entry => outMap[entry._id.toString()] = entry.totalOut);

    // Fetch all items
    const allItems = await Item.find();

    // Calculate remaining stock
    const result = allItems.map(item => {
      const itemId = item._id.toString();
      const totalIn = inMap[itemId] || 0;
      const totalOut = outMap[itemId] || 0;
      const remaining = totalIn - totalOut;

      return {
        _id: item._id,
        name: item.name,
        category: item.category,
        remaining
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
