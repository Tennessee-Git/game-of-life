import "./App.css";
import { Grid } from "./components/Grid/Grid";

function App() {
  return (
    <div className="app page-container">
      <div className="heading">
        <h1>Game of Life</h1>
      </div>
      <Grid />
    </div>
  );
}

export default App;
