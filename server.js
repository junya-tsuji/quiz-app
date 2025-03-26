const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`サーバーが起動しました: http://localhost:${port}`);
});