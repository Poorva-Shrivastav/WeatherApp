import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Home from './screens/Home/Home';

function App() {
  return (
    <div className="App">
      <Home />
      </div>
  );
}

export default App;
