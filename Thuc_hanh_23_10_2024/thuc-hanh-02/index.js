const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


app.get('/video', (req, res) => {
    res.send('GET request - Lấy thông tin video');
});

app.post('/video', (req, res) => {
    const video = req.body;
    res.send(`POST request - Thêm video mới: ${JSON.stringify(video)}`);
});

app.put('/video/:id', (req, res) => {
    const id = req.params.id;
    const video = req.body;
    res.send(`PUT request - Cập nhật video có ID: ${id} với thông tin: ${JSON.stringify(video)}`);
});

app.delete('/video/:id', (req, res) => {
    const id = req.params.id;
    res.send(`DELETE request - Xóa video có ID: ${id}`);
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
