import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, saveTask, taskToEdit }) => {
  // State lokal untuk form
  const [task, setTask] = useState({ name: '', priority: 'Medium', status: 'To Do' });

  // Mengisi form jika taskToEdit berubah (Mode Edit)
  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      // Reset form untuk Mode Add
      setTask({ name: '', priority: 'Medium', status: 'To Do' }); 
    }
  }, [taskToEdit]);

  // Handler perubahan input form
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handler submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.trim() === '') return;
    
    saveTask(task);  // Panggil fungsi dari App.jsx
    
    // Reset dan Tutup
    setTask({ name: '', priority: 'Medium', status: 'To Do' });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          {taskToEdit ? 'Edit Task' : 'Add Task'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Form Group untuk Nama Task */}
          <Form.Group controlId="taskName" className="mb-3">
            <Form.Label>Nama Tugas</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
              required
              placeholder="Masukkan nama tugas"
            />
          </Form.Group>

          {/* Form Group untuk Prioritas Task */}
          <Form.Group controlId="taskPriority" className="mb-3">
            <Form.Label>Prioritas</Form.Label>
            <Form.Control 
              as="select" 
              name="priority" 
              value={task.priority} 
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Control>
          </Form.Group>

          {/* Form Group untuk Status Task */}
          <Form.Group controlId="taskStatus" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control 
              as="select" 
              name="status" 
              value={task.status} 
              onChange={handleChange}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Tutup
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
        >
          {taskToEdit ? 'Update Task' : 'Add Task'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;