
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form'
import Blog from './components/Blog';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/blog/:id' element={<Blog/>}/>
          <Route path="/add" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
