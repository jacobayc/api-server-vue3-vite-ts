const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/item', (req, res) => {
  res.json({
    id: 1,
    name: 'Sample Item',
    description: 'This is a sample item.',
    price: 100
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});