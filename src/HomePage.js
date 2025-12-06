import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi khi fetch danh sách:", error));
  }, []);
  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStu = { name, age: Number(age), class: stuClass };
    axios.post('http://localhost:5000/api/students', newStu)
      .then(res => {
        console.log("Đã thêm:", res.data);
        setStudents(prev => [...prev, res.data]);
        setName(""); setAge(""); setStuClass("");
        setMessage("Thêm học sinh thành công!"); 
        setTimeout(() => {
            setMessage(""); 
        }, 3000);
      })
      .catch(err => console.error("Lỗi khi thêm:", err));
  };
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa học sinh này?")) return;
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        console.log(res.data.message); 
        setStudents(prevList => prevList.filter(s => s._id !== id));
      })
      .catch(err => console.error("Lỗi khi xóa:", err)); 
  };
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return sortAsc ? -1 : 1;
    if (nameA > nameB) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Quản lý học sinh</h1>
      {/* Form thêm học sinh */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Thêm học sinh mới</h3>
        {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
        <form onSubmit={handleAddStudent}>
          <input 
            type="text" 
            placeholder="Họ tên" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            style={{ marginRight: "10px" }}
          />
          <input 
            type="number" 
            placeholder="Tuổi" 
            value={age} 
            onChange={e => setAge(e.target.value)} 
            required 
            style={{ marginRight: "10px" }}
          />
          <input 
            type="text" 
            placeholder="Lớp" 
            value={stuClass} 
            onChange={e => setStuClass(e.target.value)} 
            required 
            style={{ marginRight: "10px" }}
          />
          <button type="submit">Thêm học sinh</button>
        </form>
      </div>
      <hr />
      {/* Danh sách học sinh */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Danh sách hiện tại</h3>
        <input 
          type="text" 
          placeholder="Tìm kiếm theo tên..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "300px", height: "30px" }}
        />
        <button onClick={() => setSortAsc(prev => !prev)} style={{ cursor: "pointer" }}>
                Sắp xếp: {sortAsc ? 'A → Z' : 'Z → A'}
            </button>
      </div>
      <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.class}</td>
              <td>
                <button onClick={() => navigate(`/edit/${student._id}`)}>
                  Sửa
                </button> 
                <button 
                    onClick={() => handleDelete(student._id)} 
                    style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                >
                    Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredStudents.length === 0 && <p style={{textAlign: "center"}}>Không tìm thấy học sinh nào phù hợp.</p>}
    </div>
  );
}

export default HomePage;
