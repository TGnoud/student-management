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
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/students', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStu = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedStu) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(updatedStu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: "Không tìm thấy học sinh" });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Student.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json({ message: "Đã xóa học sinh", id: deleted._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});