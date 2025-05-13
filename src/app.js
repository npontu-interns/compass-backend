const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const connectDB = require('./db/connection');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).type('text/plain').send('Something broke!');
});

// Connect to MongoDB before starting server
connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}).catch(err => {
  console.error('Failed to connect to DB:', err);
});

module.exports = app;
