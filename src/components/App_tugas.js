import React, { useState, useEffect } from 'react';
// Asumsikan Bootstrap CSS dimuat melalui CDN atau import di file index.html/CSS global
// Untuk kemudahan penggunaan di lingkungan satu file, kita akan menggunakan kelas-kelas Bootstrap (misal: 'container', 'row', 'col', 'btn', 'form-control', dll.)
// Namun, karena lingkungan ini mendukung Tailwind secara default, saya akan menggunakan kelas Tailwind
// untuk penataan layout (flex, grid) dan warna latar belakang/bayangan, dan kelas Bootstrap untuk komponen spesifik jika memungkinkan.

// Menggunakan Lucide icons yang diasumsikan tersedia
import { Plus, Trash2, Edit, CheckCircle, RotateCcw, XCircle } from 'lucide-react';

const initialTasks = [
  { id: 1, title: 'Go to gym', priority: 'High', status: 'To Do', isEditing: false },
  { id: 2, title: 'Read a book', priority: 'Low', status: 'Done', isEditing: false },
  { id: 3, title: 'Go to market', priority: 'Medium', status: 'In Progress', isEditing: false },
];

// Helper untuk menghasilkan ID baru
const generateId = () => {
  return Date.now();
};

// Komponen Utama Aplikasi
const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' atau 'edit'
  const [currentTask, setCurrentTask] = useState(null); // Task yang sedang diedit

  // --- Fungsi CRUD ---

  // CREATE: Menambahkan tugas baru
  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: generateId(),
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      status: 'To Do',
      isEditing: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskPriority('Medium');
    setShowModal(false);
  };

  // DELETE: Menghapus tugas
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // UPDATE: Mengubah status tugas (To Do <-> Done)
  const toggleStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? {
          ...task,
          status: task.status === 'Done' ? 'To Do' : 'Done',
          // Reset status lain jika di-toggle ke Done/To Do
          isEditing: false 
        }
        : task
    ));
  };

  // UPDATE: Membuka mode edit
  const startEdit = (task) => {
    setCurrentTask({ ...task });
    setModalMode('edit');
    setShowModal(true);
  };

  // UPDATE: Menyimpan perubahan tugas
  const saveEdit = (e) => {
    e.preventDefault();
    if (!currentTask || !currentTask.title.trim()) return;

    setTasks(tasks.map(task =>
      task.id === currentTask.id
        ? {
          ...currentTask,
          title: currentTask.title.trim(),
          isEditing: false
        }
        : task
    ));
    setShowModal(false);
    setCurrentTask(null);
  };

  // Menutup modal dan mereset state terkait
  const closeModal = () => {
    setShowModal(false);
    setNewTaskTitle('');
    setNewTaskPriority('Medium');
    setCurrentTask(null);
  };

  // Fungsi untuk mendapatkan warna berdasarkan status
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'bg-red-200 text-red-800';
      case 'In Progress':
        return 'bg-yellow-200 text-yellow-800';
      case 'Done':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Fungsi untuk mendapatkan warna berdasarkan prioritas
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 font-semibold';
      case 'Medium':
        return 'text-yellow-600 font-semibold';
      case 'Low':
        return 'text-green-600 font-semibold';
      default:
        return 'text-gray-600';
    }
  };

  // Komponen TaskCard
  const TaskCard = ({ task }) => (
    <div className="flex items-center justify-between p-4 mb-3 bg-white rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-xl">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-medium uppercase">Task</p>
        <h3 className={`text-lg font-medium truncate ${task.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.title}
        </h3>
        
        <div className="flex items-center mt-2 space-x-3 text-sm">
          {/* Prioritas */}
          <div>
            <span className="text-xs text-gray-500 mr-1">Priority</span>
            <span className={getPriorityColor(task.priority)}>{task.priority}</span>
          </div>
          {/* Status */}
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3 ml-4">
        {/* Tombol Toggle Status */}
        <button
          onClick={() => toggleStatus(task.id)}
          className={`p-2 rounded-full transition duration-150 ${
            task.status === 'Done'
              ? 'text-green-600 bg-green-100 hover:bg-green-200'
              : 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200'
          }`}
          title={task.status === 'Done' ? 'Set as To Do' : 'Set as Done'}
        >
          {task.status === 'Done' ? <RotateCcw size={18} /> : <CheckCircle size={18} />}
        </button>

        {/* Tombol Edit */}
        <button
          onClick={() => startEdit(task)}
          className="p-2 text-indigo-600 bg-indigo-100 hover:bg-indigo-200 rounded-full transition duration-150"
          title="Edit Task"
        >
          <Edit size={18} />
        </button>

        {/* Tombol Delete */}
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 text-red-600 bg-red-100 hover:bg-red-200 rounded-full transition duration-150"
          title="Delete Task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );

  // Komponen Modal
  const Modal = ({ title, mode, initialData }) => {
    const isAddMode = mode === 'add';

    return (
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeModal} // Tutup modal saat klik di luar
      >
        <div 
          className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg transform transition-transform duration-300 scale-100"
          onClick={(e) => e.stopPropagation()} // Cegah penutupan saat klik di dalam modal
        >
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <XCircle size={24} />
            </button>
          </div>

          <form onSubmit={isAddMode ? addTask : saveEdit}>
            <div className="mb-4">
              <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">Judul Tugas</label>
              <input
                id="task-title"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Masukkan judul tugas"
                value={isAddMode ? newTaskTitle : currentTask?.title || ''}
                onChange={(e) => isAddMode ? setNewTaskTitle(e.target.value) : setCurrentTask({ ...currentTask, title: e.target.value })}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 mb-1">Prioritas</label>
              <select
                id="task-priority"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                value={isAddMode ? newTaskPriority : currentTask?.priority || 'Medium'}
                onChange={(e) => isAddMode ? setNewTaskPriority(e.target.value) : setCurrentTask({ ...currentTask, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={closeModal} 
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center"
              >
                {isAddMode ? <><Plus size={20} className="mr-1" /> Tambah Tugas</> : <><Edit size={20} className="mr-1" /> Simpan Perubahan</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header dan Tombol Tambah Tugas */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Task List</h1>
          <button
            onClick={() => { setModalMode('add'); setShowModal(true); }}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] active:scale-95"
          >
            <Plus size={20} className="mr-1" /> Add Task
          </button>
        </header>

        {/* Daftar Tugas */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl shadow-lg border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">Tidak ada tugas! Silakan tambahkan tugas baru.</p>
            </div>
          ) : (
            tasks
              .sort((a, b) => {
                // Sortir: Done ke bawah, To Do/In Progress ke atas
                if (a.status === 'Done' && b.status !== 'Done') return 1;
                if (a.status !== 'Done' && b.status === 'Done') return -1;
                
                // Sortir prioritas (High > Medium > Low) di antara yang belum selesai
                const priorityOrder = { High: 3, Medium: 2, Low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              })
              .map(task => (
                <TaskCard key={task.id} task={task} />
              ))
          )}
        </div>
      </div>

      {/* Tampilkan Modal */}
      {showModal && (
        <Modal 
          title={modalMode === 'add' ? 'Tambah Tugas Baru' : 'Edit Tugas'}
          mode={modalMode}
          // Pass data saat mode edit (meskipun state sudah dipegang di App)
          initialData={currentTask}
        />
      )}
    </div>
  );
};

export default App;