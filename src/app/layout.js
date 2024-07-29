"use client"
import "./globals.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <Provider store={store}>
      <Toaster position="top-right"/>
        {children}
        </Provider>;
        </body>
    </html>
  );
}
