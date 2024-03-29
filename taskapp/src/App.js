// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importez le fichier de style CSS

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1337/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleAddTask = () => {
    axios.post('http://localhost:1337/tasks', {
      title: newTaskTitle,
      description: newTaskDescription,
      status: false 
    })
    .then(response => {
      console.log('Task added:', response.data);
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    })
    .catch(error => {
      console.error('Error adding task:', error);
    });
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:1337/tasks/${taskId}`)
      .then(response => {
        console.log('Task deleted:', taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleFinishTask = (taskId) => {
    axios.put(`http://localhost:1337/tasks/${taskId}`, { status: true })
      .then(response => {
        console.log('Task finished:', taskId);
        setTasks(tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: true };
          }
          return task;
        }));
      })
      .catch(error => {
        console.error('Error finishing task:', error);
      });
  };

  return (
    <div className="App">
      <header className="">
        <h1>Gestion des tâches</h1>
      </header>
      <div className="task-list">
        <h2>Liste des tâches :</h2>
        <h5> <i> *Les tâches  terminées n'ont plus d'Actions.   </i></h5>
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td className="actions">
                  {!task.status && (
                    <>
                      <button onClick={() => handleFinishTask(task.id)}>Terminer</button>
                      <button onClick={() => handleDeleteTask(task.id)}>Supprimer</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="task-form">
        <h2>Ajouter une tâche :</h2>
        <label>
          Titre :
          <input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
        </label>
        <label>
          Description :
          <input type="text" value={newTaskDescription} onChange={e => setNewTaskDescription(e.target.value)} />
        </label>
        <button onClick={handleAddTask}>Ajouter</button>
      </div>
    </div>
  );
}

export default App;
