import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { TResponse } from "../pages/types";

// Define State Type
type WorkoutsState = {
  workouts: TResponse[] | null;
};

// Define Action Type
type WorkoutsAction =
  | { type: "SET_WORKOUTS"; payload: TResponse[] }
  | { type: "CREATE_WORKOUT"; payload: TResponse }
  | { type: "DELETE_WORKOUT"; payload: TResponse };

// Define Context Type
type WorkoutsContextType = WorkoutsState & {
  dispatch: Dispatch<WorkoutsAction>;
};

// ✅ Correctly initialize context with a default value of `null | WorkoutsContextType`
export const WorkoutsContext = createContext<WorkoutsContextType | null>(null);

// Reducer Function
export const workoutsReducer = (
  state: WorkoutsState,
  action: WorkoutsAction
): WorkoutsState => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts
          ? state.workouts.filter((item) => item._id !== action.payload._id)
          : state.workouts,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: state.workouts
          ? [action.payload, ...state.workouts]
          : [action.payload],
      };
    default:
      return state;
  }
};

// Context Provider Component
export const WorkoutContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
