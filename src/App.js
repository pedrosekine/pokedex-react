import "./App.css";
import { GlobalState } from "./global/GlobalState";
import { Router } from "./routes/Router";

export const App = () => {
  return (
    <GlobalState>
      <Router />
    </GlobalState>
  );
};
