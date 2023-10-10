import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { HomePage } from "./pages/HomePage/HomePage";
import { MoviesPage } from "./pages/MoviesPage";
import { SeriesPage } from "./pages/SeriesPage";
import AboutPage from "./pages/AboutPage/AboutPage";

// App component that renders the navbar and the routes to the different pages
function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/series" element={<SeriesPage />}></Route>
          <Route path="/movies/:show_id" element={<AboutPage />}></Route>
          <Route path="/series/:show_id" element={<AboutPage />}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
