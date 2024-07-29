'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../redux/employeesSlice';
import toast from 'react-hot-toast';

const EmployeesList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees || []); // Default to an empty array
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);

  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', username: '' });
  const [updatedEmployee, setUpdatedEmployee] = useState({ id: null, name: '', email: '', username: '' });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  const handleAddEmployee = async () => {
    try {
      await dispatch(addEmployee(newEmployee));
      setNewEmployee({ name: '', email: '', username: '' }); // Reset form
      dispatch(fetchEmployees());
      toast.success('Employee added successfully!');
    } catch (error) {
      toast.error('Failed to add employee.');
    }
  };

  const handleUpdateEmployee = async (id) => {
    try {
      await dispatch(updateEmployee(updatedEmployee));
      setUpdatedEmployee({ id: null, name: '', email: '', username: '' }); // Reset form
      dispatch(fetchEmployees());
      toast.success('Employee updated successfully!');
    } catch (error) {
      toast.error('Failed to update employee.');
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await dispatch(deleteEmployee(id));
      dispatch(fetchEmployees());
      toast.success('Employee deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete employee.');
    }
  };

  let content;

  if (status === 'loading') {
    content = <p className="text-center text-blue-600">Loading...</p>;
  } else if (status === 'succeeded') {
    content = (
      <div className="grid grid-cols-1 gap-4">
        {employees.length ? (
          employees.map((employee) => (
            <div key={employee.id} className="p-4 border rounded shadow-md">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Username:</strong> {employee.username}</p>
              <div className="flex space-x-2 mt-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => setUpdatedEmployee(employee)}>Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No employees found.</p>
        )}
      </div>
    );
  } else if (status === 'failed') {
    content = <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 max-w-6xl mx-auto mt-8 p-4">
      <div className="lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
        <div className="space-y-2 mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          />
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Username"
            value={newEmployee.username}
            onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
          />
        </div>
        <button className="w-full bg-green-500 text-white p-2 rounded mb-4" onClick={handleAddEmployee}>Add Employee</button>

        {updatedEmployee.id && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
            <div className="space-y-2 mb-4">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Name"
                value={updatedEmployee.name}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, name: e.target.value })}
              />
              <input
                type="email"
                className="w-full p-2 border rounded"
                placeholder="Email"
                value={updatedEmployee.email}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, email: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Username"
                value={updatedEmployee.username}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, username: e.target.value })}
              />
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={() => handleUpdateEmployee(updatedEmployee.id)}>Update Employee</button>
          </div>
        )}
      </div>
      <div className="lg:w-2/3">
        {content}
      </div>
    </div>
  );
};

export default EmployeesList;
