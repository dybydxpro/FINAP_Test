import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from './Components/Home';
import Classroom from './Components/Classroom';
import Student from "./Components/Student";
import Subject from "./Components/Subject";
import Teacher from "./Components/Teacher";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/classrooms" element={<Classroom/>}/>
          <Route path="/students" element={<Student/>}/>
          <Route path="/subjects" element={<Subject/>}/>
          <Route path="/teachers" element={<Teacher/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
