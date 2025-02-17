import { useEffect } from "react";
import WorkoutForm from "../components/WorkoutForm";
// components
import WorkoutDetails from "../components/WorkoutDetails";

import { UseWorkoutsContext } from "../hooks/useWorkoutsContext";

import API_BASE_URL from "../config";

const Home = () => {
  //   const [workouts, setWorkouts] = useState<TResponse[] | null>(null);
  const { workouts, dispatch } = UseWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${API_BASE_URL}/api/workouts`);
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
        {workouts && workouts.map((workout) => <WorkoutDetails workout={workout} key={workout._id} />)}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
