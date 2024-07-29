"use client"
import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './employeesSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});
