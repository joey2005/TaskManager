import "./App.scss";
import ListingTask from "./components/ListingTask/ListingTask";
import TaskForm from "./components/TaskForm/TaskForm";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Daily Tasks</h1>
      </header>
      <ListingTask />
      <TaskForm />
    </div>
  );
}

export default App;
