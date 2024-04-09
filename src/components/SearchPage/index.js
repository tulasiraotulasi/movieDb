import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import "./index.css";

const SearchPage = () => {
  const { id } = useParams();
  const [userInput, setUserInput] = useState("");
  const [userMovies, setUserMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPagesMovie, setTotalPagesMovie] = useState(0);

  useEffect(() => {
    setUserInput(id);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    getApiMovieCall();
  }, [userInput, currentPage]);

  const getApiMovieCall = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=b9eacb52c8666ad78aa34501c81fbe03&language=en-US&query=${userInput}&page=${currentPage}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.results)
    const updatedData = data.results.map((items) => ({
      id: items.id,
      name: items.title,
      poster: `https://image.tmdb.org/t/p/w500${items.poster_path}`,
      rating: items.vote_average,
    }));
    setUserMovies(updatedData);
    setTotalPages(data.total_pages);
  };

  const backPageM = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPageM = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <ul className="home-container">
        {userMovies.map((items) => (
          <MovieCard key={items.id} items={items} />
        ))}
      </ul>
      <div className="paginationDiv">
        <button type="button" className="btn" onClick={backPageM}>
          Prev
        </button>
        <p>{currentPage}</p>
        <button type="button" className="btn" onClick={nextPageM}>
          Next
        </button>
      </div>
    </>
  );
};
export default SearchPage;
