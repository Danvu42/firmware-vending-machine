import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import CSVParser from './CSVParser';
function App() {
  return (
    <div className="App">
      <h1>CSV Parser Example</h1>
      <CSVParser />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);