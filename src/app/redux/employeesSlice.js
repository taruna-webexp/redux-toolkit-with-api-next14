import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  employees: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  lastFetch: null, // Timestamp of the last successful fetch
};

// Create an async thunk for fetching employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { getState }) => {
    const { employees } = getState(); //Accesses the current state
    console.log("employees", employees);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return {
      data: response.data, // Response data is already an array
    };
  }
);
export const addEmployee = createAsyncThunk('employees/addEmployee', async (newEmployee) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/users', newEmployee);
  return response.data;
});
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (updatedEmployee) => {
  const { id, ...data } = updatedEmployee;
  const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, data);
  return response.data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  return id;
});
// Create the employees slice  Creation
const employeesSlice = createSlice({
  name: "employees", //slice name
  initialState, //employees,status,error
  reducers: {}, //synchronous actions
  extraReducers: (builder) => {
    //async thunk.
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload.data; // Directly assign the array
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        console.log("addEmployee",state,action)

        state.status = "succeeded";
        state.employees.push(action.payload);
      })
.addCase(updateEmployee.fulfilled,(state,action)=>{
    const index = state.employees.findIndex(employee => employee.id === action.payload.id);
    if (index !== -1) {
      state.employees[index] = action.payload;
    }
})

      .addCase(deleteEmployee.fulfilled,(state,action)=>{
        console.log("deleteData",state,action)
        state.status="succeeded";
        state.employees=state.employees.filter(item=>item.id !==action.payload)

      })
  },
});

export default employeesSlice.reducer;
