import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import TodoList from './Todo/TodoList';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/todo" element={<TodoList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
