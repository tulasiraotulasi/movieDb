import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CastMembers from "../CastMembers";
import "./index.css";

const MoviePage = ({ match }) => {
  const [data, setData] = useState({});
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=b9eacb52c8666ad78aa34501c81fbe03&language=en-US`;
        const castResponse = await fetch(castUrl);
        const castData = await castResponse.json();
        const updatedCastData = castData.cast.map((item) => ({
          oname: item.name,
          character: item.character,
          oposter: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
        }));
        setCast(updatedCastData);

        const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=b9eacb52c8666ad78aa34501c81fbe03&language=en-US`;
        const movieResponse = await fetch(movieUrl);
        const movieData = await movieResponse.json();
        console.log(movieData);
        const space = ", ";
        const updatedMovieData = {
          name: movieData.original_title,
          rating: movieData.vote_average,
          date: movieData.release_date,
          poster: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
          duration: movieData.runtime,
          genre: movieData.genres.map((l) => l.name + space),
          overview: movieData.overview,
          tagline: movieData.tagline,
          homepage: movieData.homepage,
          backgroundImage: `https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`,
        };
        setData(updatedMovieData);
        console.log(updatedMovieData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const { date, duration, genre, name, overview } = data;
  const { poster, rating, tagline, backgroundImage } = data;
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%", // Adjust height as needed
  };
  return (
    <>
      {data && Object.keys(data).length !== 0 && cast.length !== 0 && (
        <div style={divStyle} className="mainBox">
          <div className="leftbox">
            <img className="imgPoster" src={poster} alt={name} />
            <div className="rightbox">
              <h1>
                {name}
                <span className="spantitle">({date.slice(0, 4)})</span>
              </h1>
              <p>Genre: {genre}</p>
              <p className="tagline">{tagline}</p>
              <p>Duration: {duration} mins</p>
              <p>Rating: {rating.toFixed(1)}</p>
              <p>Released Date : {date}</p>
            </div>
          </div>
          <div className="overviewMain">
            <h3>Overview</h3>
            <p className="overview">{overview}</p>
          </div>
        </div>
      )}
      <>
        <h2 className="castHead">Cast</h2>
        <ul className="castmem">
          {cast.map((items) => (
            <CastMembers items={items} key={items.oname} />
          ))}
        </ul>
      </>
    </>
  );
};

export default MoviePage;
