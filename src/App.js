import "./App.css";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Booking } from "./pages/Booking";
import { Rooms } from "./pages/Rooms";
import { Room } from "./pages/Room";
import { Bookings } from "./pages/Bookings";
import { User } from "./pages/User";
import { Contacts } from "./pages/Contacts";
import { useReducer, useState } from "react";
import { useEffect } from "react";
import { Login } from "./components/Login";

import { RequireAuth } from "./components/Auth";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createContext } from "react";
import { authReducer, initialAuthState } from "./reducerLogin/ReducerLogin";
import { ToastContainer } from "react-toastify";

let contextValue;
export const myContext = createContext(contextValue);
function App() {
  const [open, setOpen] = useState(true);
  const [auth, dispatchAuth] = useReducer(
    authReducer,
    JSON.parse(localStorage.getItem("auth_data") || "{}") ?? initialAuthState
  );
  contextValue = { auth, dispatchAuth };

  useEffect(() => {
    if (auth.isAuth) {
      localStorage.setItem("auth_data", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth_data");
    }
  }, [auth]);

  return (
    <div className="App">
      <myContext.Provider value={contextValue}>
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route
              path="/*"
              element={
                <RequireAuth>
                  <Routes>
                    <Route
                      path="/"
                      element={<Dashboard open={open} setOpen={setOpen} />}
                    />

                    <Route
                      path="/bookings"
                      element={<Bookings open={open} setOpen={setOpen} />}
                    />
                    <Route
                      path="/bookings/:id"
                      element={<Booking open={open} setOpen={setOpen} />}
                    />
                    <Route
                      path="/rooms"
                      element={<Rooms open={open} setOpen={setOpen} />}
                    />
                    <Route
                      path="/rooms/:id"
                      element={<Room open={open} setOpen={setOpen} />}
                    />
                    <Route
                      path="/users"
                      element={<Users open={open} setOpen={setOpen} />}
                    />
                    <Route
                      path="/users/:id"
                      element={<User open={open} setOpen={setOpen} />}
                    />
                    <Route
                      path="/contacts"
                      element={<Contacts open={open} setOpen={setOpen} />}
                    />
                  </Routes>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </DndProvider>
      </myContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
export default App;
