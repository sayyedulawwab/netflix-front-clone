import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from '../axios';
import './Row.css';
const base_url = 'https://image.tmdb.org/t/p/original/';
const API_KEY = process.env.REACT_APP_API_KEY;

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  async function handleClick(movie) {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
      )
        .then(res => res.json())
        .then(data => {
          const videoId = data.videos.results.filter(
            video => video.type === 'Trailer'
          )[0].key;
          setTrailerUrl(() => {
            return videoId;
          });
        });
    }
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(movie => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={`${movie.name}`}
            />
          );
        })}
      </div>

      {trailerUrl && (
        <ReactPlayer
          width="100%"
          height="350px"
          playing={true}
          controls
          url={`https://www.youtube.com/watch?v=${trailerUrl}`}
        />
      )}
    </div>
  );
}

export default Row;
