import { TResponse } from "../types";
import { AiOutlineDelete } from "react-icons/ai";
import { UseWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";
import API_BASE_URL from "../config";

const WorkoutDetails = ({ workout }: { workout: TResponse }) => {
  const { dispatch } = UseWorkoutsContext();

  const deleteHandler = async () => {
    const response = await fetch(`${API_BASE_URL}/api/workouts/` + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span onClick={deleteHandler}>
        <AiOutlineDelete className="icon" />
      </span>
    </div>
  );
};

export default WorkoutDetails;
