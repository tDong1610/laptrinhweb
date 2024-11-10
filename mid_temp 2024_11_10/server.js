const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const scheduleRoutes = require('./routes/scheduleRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error));

// Định tuyến API
app.use('/api', scheduleRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));
