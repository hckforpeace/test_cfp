import { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

enum statusT {
  pending,
  done,
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: statusT;
}

interface TaskProps {
  data: Task;
  onDelete: (id: number) => void;
  changeStatus: (id: number) => void;
}

let taskt: Task = {
  id: 0,
  title: "hello",
  description: "yes",
  status: 1,
};

function Task({ data, onDelete, changeStatus }: TaskProps) {
  const status: string = data.status == 0 ? "pending" : "done";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeStatus(data.id); // <-- called properly here
  };

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.title}</td>
      <td>{data.description}</td>
      <td>
        <select defaultValue={status} onChange={ handleChange }>
          <option value="pending">pending</option>
          <option value="done">done</option>
        </select>
      </td>
      <td>
        {" "}
        <button onClick={onDelete}> delete </button>{" "}
      </td>
    </tr>
  );
}

function Form({ uploadTask }: (data: Task) => void) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const FormTask: Task = {
      id: -1,
      title: data.title,
      description: data.description,
      status: data.status == "pending" ? 0 : 1,
    };
    uploadTask(FormTask);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div style={{ marginBottom: "16px" }}>
        <label>Title</label>
        <br />
        <input {...register("title", { required: "Title is required" })} />
        {errors.title && (
          <div style={{ color: "red", fontSize: "0.85em", marginTop: "4px" }}>
            {errors.title.message}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label>Description</label>
        <br />
        <input
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <div style={{ color: "red", fontSize: "0.85em", marginTop: "4px" }}>
            {errors.description.message}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label>Status</label>
        <br />
        <select
          {...register("status", { required: "Status is required" })}
          style={{ width: "100%", padding: "8px", marginTop: "4px" }}
        >
          <option value="">Select status</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        {errors.status && (
          <div style={{ color: "red", fontSize: "0.85em", marginTop: "4px" }}>
            {errors.status.message}
          </div>
        )}
      </div>

      <input type="submit" value="Submit" />
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const changeStatus = (id: number) => {
    fetch("http://localhost:3000/task/" + id, {
      method: "PATCH",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
  };

  const submitForm = (payload: Task) => {
    fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.id);
        payload.id = data.id;
        /*const newTasks = tasks.slice(); // copy
																									newTasks.push(payload); // add
																									setTasks(newTasks); */
        setTasks((prevTasks) => [...prevTasks, payload]);
      });
  };

  const removeTask = (id: number) => {
    fetch("http://localhost:3000/task/" + id, { method: "DELETE" })
      .then((response) => response.text())
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/tasks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => (
            <Task
              key={item.id}
              data={item}
              onDelete={() => removeTask(item.id)}
              changeStatus={changeStatus}
            />
          ))}
        </tbody>
      </table>
      <Form uploadTask={submitForm} />
    </>
  );
}
//<Task data={taskt} onDelete={() => removeTask(taskt.id)} />
export default App;
