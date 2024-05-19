import { createSlice } from "@reduxjs/toolkit";
//estado inicial de la app con dos tareas de ejemplo
const initialState = [
  {
    title: "Task 1",
    description: "Task one",
    completed: false,
    id: "1",
  },
  {
    title: "Task 2",
    description: "Task two",
    completed: false,
    id: "2",
  },
];

//creacion del slice de redux para gestionar las tareas
export const taskSlice = createSlice({
  name: "tasks", //nombre del slice para identificarlo en el estado global
  initialState: initialState, //estado inicial definido anteriormente
  reducers: {
    //reductor para añadir una nueva tarea al estado:
    addTask: (state, action) => {
      state.push(action.payload); //agrega la tarea recibida en el payload al final del array
    },
    //reductor que elimina una tarea del array
    deleteTask: (state, action) => {
      //busca la tarea por su ID en el state
      const taskFound = state.find((task) => task.id === action.payload);
      //si la tarea existe, la elimina del array
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
        //el metodo splice recibe dos parametros: el indice y la cantidad de elementos que deseo eliminar
        //el metodo indexOf obtiene desde el estado el indice de la tarea que acaba de encontrar
      }
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;

      const taskFound = state.find((task) => task.id === id);

      if (taskFound) {
        taskFound.title = title;
        taskFound.description = description;
      }
    },
  },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
