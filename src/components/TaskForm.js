import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
  // 1. State untuk menyimpan data task (nama, prioritas, status)
  const [task, setTask] = useState({ name: '', priority: 'Medium', status: 'To Do' });

  // 2. useEffect untuk mengisi form jika ada taskToEdit (mode Edit)
  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  // 3. Handler untuk perubahan input form
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // 4. Handler untuk submit form
  const handleSubmit = () => {
    // Memeriksa apakah ini mode edit atau tambah baru
    if (taskToEdit) {
      editTask(task); // Panggil fungsi editTask yang diterima dari props
    } else {
      addTask(task);  // Panggil fungsi addTask yang diterima dari props
    }

    // Reset state task setelah submit
    setTask({ name: '', priority: 'Medium', status: 'To Do' });
    // Tutup modal
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {taskToEdit ? 'Edit Task' : 'Add Task'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Form Group untuk Nama Task */}
          <Form.Group controlId="taskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Form Group untuk Prioritas Task */}
          <Form.Group controlId="taskPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control 
              as="select" 
              name="priority" 
              value={task.priority} 
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Control>
          </Form.Group>

          {/* Form Group untuk Status Task */}
          <Form.Group controlId="taskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control 
              as="select" 
              name="status" 
              value={task.status} 
              onChange={handleChange}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
        >
          {/* Teks tombol submit berubah berdasarkan mode */}
          {taskToEdit ? 'Update Task' : 'Add Task'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;