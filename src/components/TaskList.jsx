import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { Link } from "react-router-dom";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleDelete = (id) => {
    setSelectedTaskId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmDelete = () => {
    dispatch(deleteTask(selectedTaskId));
    closeModal();
  };

  console.log(tasks);
  return (
    <div className="container-tasks">
      <header>
        <h1>Total Tasks {tasks.length}</h1>
        <Link to="/create-task">Create New Task</Link>
      </header>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
          <Link to={`/edit-task/${task.id}`}>Edit</Link>
        </div>
      ))}

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default TaskList;
