import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [formData, setFormData] = useState({ task: "" });
  const [note, setNote] = useState(false);

  useEffect(() => {
    if (tasks.length === 0) {
      setNote(true);
    } else {
      setNote(false);
    }
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleChange(event) {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newTask = { ...formData, _id: Date.now(), isStrike: false };
    setFormData({ task: "" });
    setTasks((prev) => [...prev, newTask]);
    document.getElementById('my_modal_3').close();
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  }

  function handleUpdate(id, isStrike) {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, isStrike: !task.isStrike } : task
      )
    );
  }

  return (
    <div className="main bg-lightGrayBlue w-screen h-screen flex justify-center items-center">
      <div className="inner-div w-[70%] h-[90%] bg-white rounded-xl overflow-hidden max-md:w-[85%] max-sm:w-[95%]">
        <div className="Heading flex w-full h-12 justify-center">
          <h1 className="font-bold text-3xl mt-5 max-sm:text-2xl text-black">
            <u>TODO LIST</u>
          </h1>
        </div>
        {note ? (
          <div className="w-full animate-pulse h-[70%] flex justify-center items-center mt-4">
            <h1 className="font-bold text-2xl">Data not found</h1>
          </div>
        ) : (
          <div className="mt-10 w-full h-[73%] overflow-y-scroll">
            {tasks.length > 0 &&
              tasks.map((todo, index) => (
                <div key={index} className="w-[90%] bg-brightBlue h-auto p-4 overflow-y-auto ml-[5%] mt-5 flex justify-between rounded-lg">
                  <div className="w-[70%]">
                    <h1 className={`font-bold text-lg text-darkSlateBlue ${todo.isStrike ? 'line-through' : ''}`}>{todo.task}</h1>
                  </div>
                  <div>
                    <i
                      className="fa-solid fa-check text-darkSlateBlue text-lg cursor-pointer"
                      onClick={() => handleUpdate(todo._id, todo.isStrike)}
                    ></i>
                    <i
                      className="fa-solid fa-trash text-darkSlateBlue ml-9 max-sm:ml-4 cursor-pointer"
                      onClick={() => handleDelete(todo._id)}
                    ></i>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="model flex justify-center mt-3 max-sm:mt-2">
          <button
            className="btn btn-accent bg-turquoise text-white"
            onClick={() => {
              document.getElementById('my_modal_3').showModal();
              setNote(false);
            }}
          >
            Add Task
          </button>
          <dialog id="my_modal_3" className="modal max-sm:w-[99%]">
            <div className="modal-box bg-white text-darkSlateBlue">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg ml-2 text-center mb-4">Add your Task !</h3>
              <div className="flex flex-col ml-4 max-sm:ml-0">
                <label htmlFor="task" className="font-bold text-darkSlateBlue">Type Your Task :</label>
                <input
                  type="text"
                  name="task"
                  className="h-11 mt-3 w-full rounded-lg indent-3 mb-4 bg-lightGrayBlue"
                  placeholder="Type Your Task"
                  value={formData.task}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn mt-2 btn-accent bg-darkTurquoise ml-48 w-28 max-sm:ml-28" onClick={handleSubmit}>
                ADD
              </button>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}

export default App;
