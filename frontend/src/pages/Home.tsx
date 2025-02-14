import { useEffect, useState } from "react";
import WorkoutForm from "../components/WorkoutForm";
// components
import WorkoutDetails from "../components/WorkoutDetails";
import { TResponse } from "./types";
import { UseWorkoutsContext } from "../hooks/useWorkoutsContext";
const Home = () => {
  //   const [workouts, setWorkouts] = useState<TResponse[] | null>(null);
  const { workouts, dispatch } = UseWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
