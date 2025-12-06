import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';


function App() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi khi fetch danh sách:", error));
  }, []);
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Danh sách học sinh</h1>
      
      {/* Hiển thị danh sách bằng bảng */}
      <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Họ tên</th> 
            <th>Tuổi</th>   
            <th>Lớp</th>    
          </tr>
        </thead>
        <tbody>
          {/* Lặp qua mảng students để hiển thị từng dòng */}
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Hiển thị thông báo nếu chưa có dữ liệu */}
      {students.length === 0 && <p>Chưa có học sinh nào.</p>}
    </div>
  );
}

export default App;
