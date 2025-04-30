const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const port = 4000;

const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};


app.use(cors(corsOptions));

app.use(express.json());

app.use(session({
  secret: 'apade-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/stock')
mongoose.connect('mongodb+srv://manzidallas22:2KGKljiEB7rZfSVp@cluster0.uer7e.mongodb.net/')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.log('MongoDB connection failed', error));

  

// Routes
const itemRoutes = require('./routes/items');
const stockRoutes = require('./routes/stock');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const remainder = require('./routes/rem')

app.get('/', (req, res) => res.send('APADE Stock Management System'));
app.use('/items', itemRoutes);
app.use('/stock', stockRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/rem', remainder);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
