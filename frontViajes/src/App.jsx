import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PostsPage } from "./pages/PostsPage";
//import { Test } from "./pages/Test";
import { PostFormPage } from "./pages/PostFormPage";
import { LoginPage } from "./pages/LoginPage";
//import { Homepage } from "./pages/Homepage";
//import { Test } from "./pages/Test";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:commentId" element={<PostsPage />} />
            <Route path="*" element={<h1>404</h1>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/new-post" element={<PostFormPage />} />
              <Route path="/new-post/:id" element={<PostFormPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;