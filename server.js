const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from the Node.js server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// In your server setup file (e.g., server.js or app.js)
app.use('/uploads', express.static('uploads'));
