import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1); // tracking pages
  const [totalResults, setTotalResults] = useState(0); // Total number of search results
  const [loading, setLoading] = useState(false);

  const changeText = (event) => {
    setText(event.target.value);
  };

  const getMovie = (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page when a new search is made
    fetchMovies();
  };

  const fetchMovies = () => {
    setLoading(true);
    axios
      .get(`https://www.omdbapi.com/?s=${text}&apikey=e8a6bca4&page=${page}`)
      .then((response) => {
        console.log(response);
        setMovie(response.data.Search || []);
        setTotalResults(response.data.totalResults || 0);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, [page]); // Fetching the movie after the page changes

  const handleNextPage = () => {
    if ((page + 1) * 8 <= totalResults) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href={movie}>
            OMDb Movies Search
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" onSubmit={getMovie}>
              <input className="form-control me-2" type="search" placeholder="Search Movie" aria-label="Search" value={text} onChange={changeText}/>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container">
        <h3>Found {totalResults} movies with title: {text} </h3>
      </div>

      <div className="container my-3">
        <div className="row">
          {loading ? (
            <p>Loading...</p>): 
            (
            movie.map((value, index) => {
              return (
                <div class="card mb-3" style={{ width: '16rem' }} key={index}>
                  <img src={value.Poster} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h3 class="card-title">{value.Title}</h3>
                    <h5 class="card-text">Year: {value.Year}</h5>
                    <a href="#" class="btn btn-primary">
                      About
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="fixed-bottom bg-light p-2">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              {page > 1 && (
                <button className="btn btn-secondary" onClick={handlePrevPage}>
                  Previous
                </button>
              )}
              <span className="mx-2">
                Page {page} of {Math.ceil(totalResults / 8)}
              </span>
              {page * 8 < totalResults && (
                <button className="btn btn-secondary" onClick={handleNextPage}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
