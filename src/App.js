import "./App.css";
import { Grid } from "./components/Grid/Grid";

function App() {
  return (
    <div className="app page-container">
      <div className="heading">
        <h1>Game of Life</h1>
        <button className="button">Start</button>
      </div>
      <Grid></Grid>
    </div>
  );
}

export default App;
