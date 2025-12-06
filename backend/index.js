import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Student from './Student.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());          
app.use(express.json());  

mongoose.connect('mongodb://localhost:27017/student_db')
  .then(() => console.log("Đã kết nối MongoDB thành công"))
  .catch(err => console.error("Lỗi kết nối MongoDB:", err));

// Route kiểm tra server 
app.get('/', (req, res) => {
    res.send('Server backend đang chạy!');
});
app.get('/api/students', async (req, res) => {
    try {
        // Tìm tất cả học sinh trong DB
        const students = await Student.find(); 
        // Trả về danh sách dưới dạng JSON
        res.json(students); 
    } catch (err) {
        // Nếu lỗi, trả về mã 500 và thông báo lỗi
        res.status(500).json({ error: err.message }); 
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});