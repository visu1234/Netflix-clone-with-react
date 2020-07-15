import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  // here title is used as props which is argument passed in Row.js

  const [movies, setMovies] = useState([]); // creates/initializes movies empty array
  const [trailerUrl, setTrailerUrl] = useState(""); // to set trailerurl when any thumbnailis clicked

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl); // concatenates baseurl def in axios.js with fetchUrl
      // console.log(request);
      setMovies(request.data.results); // sets movies to array of 20 movies via API object
      return request;
    }
    fetchData();
  }, [fetchUrl]); // if [] is empty, runs only once when row loads  if fetchUrl state changes then the code in this fun reruns

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=cq2iTHoLrt0 this is url for dark
          const urlParams = new URLSearchParams(new URL(url).search); // searchparams used to wrap and allows to do in next step gives what ever after ? mark
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  // row class denotes each row, row_posters denotes images in the row, row_poster denotes 1 image
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterlarge"}`}
            src={`${base_url}${
              isLargeRow ? movie?.poster_path : movie?.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}
// if isLargeRow prop is true, use poster_path instead of backdrop_path
export default Row;
