import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  // aqui se guardara lo q el usuario escribira en los inputs:
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState(""); //estado para manejar el msj de error

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //verifica si los campos estan vacios:
    if (!task.title.trim() || !task.description.trim()) {
      setError("Debes escribir en ambos campos");
      return;
    }
    if (params.id) {
      dispatch(editTask(task));
    } else {
      //si todos los campos tienen algo agrega la tarea:
      dispatch(
        addTask({
          ...task,
          id: Date.now(), //genera un nuevo ID unico para la tarea
        })
      );
    }
    navigate("/");

    setTask({
      title: "",
      description: "",
    });

    setError(""); // resetea el msj de error:
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
          value={task.title}
        />
        <textarea
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={task.description}
        ></textarea>
        <button>Save</button>
      </form>
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default TaskForm;
