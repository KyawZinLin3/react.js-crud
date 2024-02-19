import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await axios.get("http://localhost:3000/employees");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployees();
  }, []);
  return (
    <>
      <h1>Happy</h1>
    </>
  );
}

export default App;
