import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css'; // Mengimpor CSS Bootstrap

function App() {
  // 1. State untuk menyimpan daftar tugas (tasks)
  const [tasks, setTasks] = useState([]);
  
  // 2. State untuk mengontrol tampilan modal form
  const [showForm, setShowForm] = useState(false);
  
  // 3. State untuk menyimpan data tugas yang akan diedit (null jika mode Add)
  const [taskToEdit, setTaskToEdit] = useState(null);

  // --- Fungsi untuk Mengontrol Modal ---
  
  // Menampilkan modal form (mode Add)
  const handleShowForm = () => setShowForm(true);

  // Menyembunyikan modal form dan mereset taskToEdit
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null); // Penting: Mereset taskToEdit agar form kembali ke mode 'Add'
  };

  // --- Fungsi CRUD Tasks ---

  // Menambah Tugas Baru
  const addTask = (task) => {
    // Membuat ID unik dengan timestamp saat ini (sebaiknya gunakan UUID di aplikasi nyata)
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  // Mengedit Tugas
  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  // Menghapus Tugas
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // --- Fungsi untuk Mengaktifkan Mode Edit ---

  // Dipanggil dari TaskList saat tombol 'Edit' diklik
  const showEditForm = (task) => {
    setTaskToEdit(task); // Menyimpan task yang akan diedit ke state
    handleShowForm();     // Menampilkan modal
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Task List</h1>
      
      {/* Tombol untuk menambahkan tugas baru */}
      <Button variant="primary" onClick={handleShowForm} className="mb-4">
        + Add Task
      </Button>

      {/* Komponen TaskList untuk menampilkan daftar tugas */}
      <TaskList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        showEditForm={showEditForm}
      />
      
      {/* Komponen TaskForm sebagai Modal */}
      <TaskForm 
        show={showForm}
        handleClose={handleCloseForm}
        addTask={addTask}
        editTask={editTask}
        taskToEdit={taskToEdit}
      />
    </Container>
  );
}

export default App;