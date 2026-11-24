import { BsEyeFill, BsTrashFill } from 'react-icons/bs'; 
import { useState } from 'react';
import './App.css';

// Data Dummy (Sesuai ketentuan atribut)
const initialTasks = [
  {
    id: 1,
    title: 'Mengerjakan Proyek Company Profile',
    description: 'Menyelesaikan proyek company profile dengan deadline minggu depan.',
    priority: 'high',
    deadline: '2026-10-11',
    status: 'in progress',
  },
  {
    id: 2,
    title: 'Mempelajari Dasar Zustand',
    description: 'Belajar state management Zustand untuk React.',
    priority: 'low',
    deadline: '2026-11-25',
    status: 'in progress',
  },
  {
    id: 3,
    title: 'Membuat Website Portfolio',
    description: 'Mendesain dan mendevelop website portfolio pribadi.',
    priority: 'low',
    deadline: '2026-10-20',
    status: 'in progress',
  },
  {
    id: 4,
    title: 'Mempelajari React Hooks',
    description: 'Memahami useEffect, useState, dan custom hooks.',
    priority: 'medium',
    deadline: '2026-10-11',
    status: 'to-do',
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'detail'
  const [currentTask, setCurrentTask] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'low',
    deadline: '',
    status: 'to-do',
  });

  // Buka Modal Tambah
  const handleOpenAdd = () => {
    setFormData({ title: '', description: '', priority: 'low', deadline: '', status: 'to-do' });
    setModalMode('add');
    setIsModalOpen(true);
  };

  // Buka Modal Detail
  const handleOpenDetail = (task) => {
    setCurrentTask(task);
    setModalMode('detail');
    setIsModalOpen(true);
  };

  // Buka Modal Edit
  const handleOpenEdit = (task) => {
    setCurrentTask(task);
    setFormData(task);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // Hapus Task dengan Konfirmasi
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Handle Input Change di Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit Form (Tambah atau Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newTask = {
        ...formData,
        id: Date.now(), // Generate ID unik
      };
      setTasks([...tasks, newTask]);
    } else if (modalMode === 'edit') {
      setTasks(tasks.map((task) => (task.id === currentTask.id ? { ...formData, id: currentTask.id } : task)));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Todo List</h1>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          Tambah Todo
        </button>
      </div>

      <table className="todo-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Status</th>
            <th>Prioritas</th>
            <th>Deadline</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.deadline}</td>
              <td className="actions">
                {/* Tombol Detail (Mata) */}
                <button className="btn-icon btn-detail" onClick={() => handleOpenDetail(task)}>
                  <BsEyeFill />
                </button>
                
                {/* Tombol Hapus (Sampah) */}
                <button className="btn-icon btn-delete" onClick={() => handleDelete(task.id)}>
                  <BsTrashFill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              {modalMode === 'add' ? 'Tambah Todo' : modalMode === 'edit' ? 'Update Todo' : 'Detail Todo'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Judul</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={modalMode === 'detail'}
                  required
                />
              </div>
              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={modalMode === 'detail'}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={modalMode === 'detail'}
                  >
                    <option value="to-do">to-do</option>
                    <option value="in progress">in progress</option>
                    <option value="done">done</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Prioritas</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    disabled={modalMode === 'detail'}
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  disabled={modalMode === 'detail'}
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-danger" onClick={() => setIsModalOpen(false)}>
                  {modalMode === 'detail' ? 'Tutup' : 'Batal'}
                </button>
                {modalMode !== 'detail' && (
                  <button type="submit" className="btn btn-primary">
                    {modalMode === 'add' ? 'Tambah' : 'Simpan'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}