import "./App.css";
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/login";
import StorageProvider from "./contexts/StorageContext";
import UserProvider from "./contexts/userContext";
import MovieList from "./pages/movieList";
import UserLayout from "./layouts/UserLayout.tsx";
import CreateMovie from "./pages/createMovie/index.tsx";
import UpdateMovie from "./pages/updateMovie/index.tsx";
import Register from "./pages/register/index.tsx";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 400,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const handleLoad = () => setLoading(false);
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <AuthProvider>
          <StorageProvider>
            <UserProvider>
              <Router>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<UserLayout />}>
                    <Route index element={<MovieList />} />
                    <Route path="/movieList" element={<PrivateRoute component={MovieList} />} />
                    <Route path="/createMovie" element={<PrivateRoute component={CreateMovie} />} />
                    <Route path="/updateMovie" element={<PrivateRoute component={UpdateMovie} />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </Router>
            </UserProvider>
          </StorageProvider>
        </AuthProvider>
      )}
    </>
  );
}

export default App;
