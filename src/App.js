import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Top from "./components/Top";
import Popular from "./components/Popular";
import Upcoming from "./components/Upcoming";
import MoviePage from "./components/MoviePage";
import NotFound from "./components/NotFound";
import SearchPage from "./components/SearchPage";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route exact path="/" element={<Popular />} />
      <Route exact path="/top-rated" element={<Top />} />
      <Route exact path="/upcoming" element={<Upcoming />} />
      <Route exact path="/movie/:id" element=<MoviePage /> />
      <Route exact path="/searchpage/:id" element=<SearchPage /> />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
// element={({ params }) => <MoviePage movieId={params.id} />}
