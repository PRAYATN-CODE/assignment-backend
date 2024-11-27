const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = 3000;

connectDB();

app.use(bodyParser.json());


app.use('/todos', todoRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected error occurred' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
