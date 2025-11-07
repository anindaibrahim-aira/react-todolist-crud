import React from 'react';
import { Button, Card } from 'react-bootstrap';

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Card className="mb-3" key={task.id || index}> {/* Menggunakan task.id jika ada, atau index sebagai fallback */}
          <Card.Body className="d-flex justify-content-between align-items-center">
            {/* Bagian Kiri: Detail Tugas */}
            <div>
              <strong>Task:</strong> {task.name} <br />
              <strong>Priority:</strong> {task.priority} <br />
              <strong>Status:</strong> {task.status}
            </div>

            {/* Bagian Kanan: Tombol Aksi */}
            <div>
              <Button 
                variant="outline-primary" 
                onClick={() => showEditForm(task)}
                className="me-2" // Tambahkan margin di sebelah kanan untuk memisahkan tombol
              >
                Edit
              </Button>
              <Button 
                variant="outline-danger" 
                onClick={() => deleteTask(task.id)} // Asumsi task memiliki task.id
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;