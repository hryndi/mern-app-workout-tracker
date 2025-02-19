import { useState } from "react";
import { UseWorkoutsContext } from "../hooks/useWorkoutsContext";
import API_BASE_URL from "../config";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState<null | string>("");
  const { dispatch } = UseWorkoutsContext();
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch(`${API_BASE_URL}/api/workouts`, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added: ", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <form className="create" onSubmit={(e) => submitHandler(e)}>
      <h3>Add a New Workout</h3>
      <label>Exersise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={`${emptyFields.includes("title") && "error"}`}
      />
      <label> Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={`${emptyFields.includes("load") && "error"}`}
      />
      <label> Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={`${emptyFields.includes("reps") && "error"}`}
      />
      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default WorkoutForm;
