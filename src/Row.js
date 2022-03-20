import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const baseUrl = "https://image.tmdb.org/t/p/original";
const opts = {
  height: "390",
  width: "100%",
  playVars: {
    autoplay: 1,
  },
};

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [noVideo, setNoVideo] = useState(false);
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.name || movie.title || movie.original_title || "")
        .then((url) => {
          setNoVideo(false);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {
          setNoVideo(true);
        });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
          ></img>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
      {noVideo && (
        <div className="error">
          <h2>Sorry No Trailer to display</h2>
        </div>
      )}
    </div>
  );
};

export default Row;
