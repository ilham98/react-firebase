import { Container } from "reactstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseAuth from "./config/firebaeAuth";
import AuthContext from "./contexts/AuthContext";
import FileUpload from "./pages/FileUpload";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      // setAuthenticatedUser(user);
      setAuthenticatedUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={authenticatedUser}>
      <BrowserRouter>
        <Navbar />
        <Container className="pt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
               <Route path="/file-upload" element={<FileUpload />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
