import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", salary: "" });

  const getEmployees = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/employees");
      console.log("resp", resp.data);
      setEmployees(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createEmployees = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/employees", formData);
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

  const deleteEmployeeById = async (id) => {
    try {
      await axios.delete("http://localhost:3000/employees/" + id);
      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployees = async () => {
    try {
      const promises = employees.map((employee) => {
        return axios.delete("http://localhost:3000/employees/" + employee.id);
      });
      await Promise.all([...promises]);
      getEmployees();
      console.log("test", employees);
    } catch (error) {
      console.log(error);
    }
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
        {employees.length > 0 ? (
          employees.map((employee) => {
            const { id, name, salary } = employee;
            return (
              <tbody key={id}>
                <tr>
                  <td>{name}</td>
                  <td>{salary}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteEmployeeById(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <tbody>
            <tr>
              <h4>No data Here</h4>
            </tr>
          </tbody>
        )}
      </table>
      <button type="button" onClick={() => deleteEmployees()}>
        Delete All
      </button>
    </>
  );
}

export default App;
