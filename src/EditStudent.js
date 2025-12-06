import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [stuClass, setStuClass] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/students/${id}`)
            .then(res => {
                setName(res.data.name);
                setAge(res.data.age);
                setStuClass(res.data.class);
            })
            .catch(err => console.error("Lỗi khi fetch chi tiết:", err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/students/${id}`, {
            name, age: Number(age), class: stuClass
        })
            .then(res => {
                console.log("Đã cập nhật:", res.data);
                // Có thể điều hướng về trang chủ hoặc cập nhật state global 
                navigate("/");
            })
            .catch(err => console.error("Lỗi khi cập nhật:", err));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Chỉnh sửa thông tin</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Tên: </label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Tuổi: </label>
                    <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
                </div>
                <div>
                    <label>Lớp: </label>
                    <input type="text" value={stuClass} onChange={e => setStuClass(e.target.value)} required />
                </div>
                <button type="submit">Lưu thay đổi</button>
                <button type="button" onClick={() => navigate("/")}>Hủy</button>
            </form>
        </div>
    );
}

export default EditStudent;