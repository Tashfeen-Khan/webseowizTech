const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const userRoutes = require('./routes/productRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/produts', productRoutes); // hardcoded for clarity
app.use('/uploads', express.static('uploads')); // serve static files from uploads directory
// app.use('/api/users', userRoutes); // Uncomment if you have user routes
// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
