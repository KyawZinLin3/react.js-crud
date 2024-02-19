import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", salary: "" });

  const getEmployees = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/employees");
      console.log(resp.data);
      setEmployees(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createEmployees = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/employees",
        formData
      );
      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormDataChange = (key, value) => {
    setFormData((data) => {
      return { ...data, [key]: value };
    });
  };
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <form onSubmit={createEmployees}>
        <label>Name : </label>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleFormDataChange("name", e.target.value)}
        ></input>
        <label>Salary : </label>
        <input
          type="text"
          placeholder="Enter salary"
          value={formData.salary}
          onChange={(e) => handleFormDataChange("salary", e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
          </tr>
        </thead>
        {employees.map((employee) => {
          return (
            <tbody key={employee.id}>
              <tr>
                <td>{employee.name}</td>
                <td>{employee.salary}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}

export default App;
