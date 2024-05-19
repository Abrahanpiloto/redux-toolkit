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
    <div className="w-4/6">
      <header className="flex justify-between items-center py-5">
        <h1 className=" font-semibold text-2xl">Total Tasks {tasks.length}</h1>
        <Link
          to="/create-task"
          className="bg-indigo-700 px-2 py-2 rounded-md hover:bg-indigo-500 font-medium"
        >
          Create New Task
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-4 ">
        {tasks.map((task) => (
          <div key={task.id} className="bg-neutral-800 rounded-md p-4">
            <h3 className="">{task.title}</h3>
            <p>{task.description}</p>

            <Link
              to={`/edit-task/${task.id}`}
              className="bg-green-700 px-3 py-1.5 rounded-md font-medium self-center hover:bg-green-600 "
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-red-600 px-2 py-1 rounded-md font-medium self-center hover:bg-red-500 ml-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default TaskList;
