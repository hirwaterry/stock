const express = require('express');
const router = express.Router();
const StockIn = require('../models/StockIn');
const StockOut = require('../models/StockOut');
const Item = require('../models/items');

// STOCK IN
router.post('/in', async (req, res) => {
  try {
    const item = await Item.findById(req.body.product);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const stockIn = new StockIn(req.body);
    await Item.findByIdAndUpdate(req.body.product, { $inc: { quantity: req.body.quantity } });
    const saved = await stockIn.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// STOCK OUT
router.post('/out', async (req, res) => {
  try {
    const item = await Item.findById(req.body.product);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const stockOut = new StockOut(req.body);
    await Item.findByIdAndUpdate(req.body.product, { $inc: { quantity: -req.body.quantity } });
    const saved = await stockOut.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// VIEW STOCK-IN HISTORY
router.get('/in', async (req, res) => {
  try {
    const records = await StockIn.find()
      .populate('product', 'name') // Populate product name
      .select('product quantity date'); // Explicitly select the fields you need, including `date`
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VIEW STOCK-OUT HISTORY
router.get('/out', async (req, res) => {
  try {
    const records = await StockOut.find()
      .populate('product', 'name')
      .select('product quantity date'); // Explicitly select the fields you need, including `date`
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
