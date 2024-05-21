import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import SteinStore from "stein-js-client"; // Importa SteinStore

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
    // Suponiendo que ya tienes el token de acceso
    const store = new SteinStore(
      "https://api.steinhq.com/v1/storages/664a6ccf4a642363122c6915"
    ); // Reemplaza "URL_DE_LA_API" con la URL copiada de Stein

    // Envía los datos a Google Sheets
    store
      .append("tareas", [
        {
          title: task.title,
          description: task.description,
          id: Date.now(), //genera un nuevo ID unico para la tarea
        },
      ])
      .then((res) => {
        console.log(res);
        // Limpia el formulario y maneja el mensaje de éxito
        setTask({
          title: "",
          description: "",
        });
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Error al enviar los datos.");
      });
    navigate("/");
  };

  // if (params.id) {
  //   dispatch(editTask(task));
  // } else {
  //   //si todos los campos tienen algo agrega la tarea:
  //   dispatch(
  //     addTask({
  //       ...task,
  //       id: Date.now(), //genera un nuevo ID unico para la tarea
  //     })
  //   );
  // }
  //   navigate("/");

  //   setTask({
  //     title: "",
  //     description: "",
  //   });

  //   setError(""); // resetea el msj de error:
  // };

  // useEffect(() => {
  //   if (params.id) {
  //     setTask(tasks.find((task) => task.id === params.id));
  //   }
  // }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-md p-7">
        <label htmlFor="title" className="block text-xs font-bold mb-2">
          Task:
        </label>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
          value={task.title}
          className="w-full p-2 rounded-md bg-zinc-500 mb-3"
        />
        <label htmlFor="title" className="block text-xs font-bold mb-2">
          Description:
        </label>
        <textarea
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={task.description}
          className="w-full p-2 rounded-md bg-zinc-500 mb-2"
        ></textarea>
        <button className="bg-indigo-700 px-3 py-1 rounded-md font-medium hover:bg-indigo-600">
          Save
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default TaskForm;
