import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./banner.css";

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
const Banner = () => {
  const [movies, setMovies] = useState([]);
  const link = `https://www.youtube.com/results?search_query=${
    movies?.title || movies?.name || movies?.original_name
  }`;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchRomanceMovies);
      setMovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );

      return request;
    }
    fetchData();
  }, []);
  return (
    <header
      className="banner"
      style={{
        backgroundCover: "Cover",
        backgroundImage: `url(
          https://images.tmdb.org/t/p/original/${movies?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h2 className="banner__title">
          {movies?.title || movies?.name || movies?.original_name}
        </h2>
        <div className="banner__buttons">
          <a href={link} target="_blank" rel="noreferrer">
            <button className="banner__button">Play Trailer</button>
          </a>
        </div>
        <h1 className="banner_description">
          {truncate(movies?.overview, 200)}
        </h1>
      </div>
      <div className="banner--fadebottom"></div>
    </header>
  );
};

export default Banner;
