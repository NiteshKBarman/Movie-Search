
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
    if ((page + 1) * 12 <= totalResults) {
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
    {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
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
        <h3 style={{ fontFamily:'sans-serif', fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '15px' , padding: '10px'}}>
          Found {totalResults} movies with title: {text}
        </h3>
      

        <div className="container my-3">
          <div className="row">
            {loading ? (
              <div className="d-flex justify-content-center my-4">
              <div className="spinner-border text-white" role="status" >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>): 
              (
              movie.map((value, index) => {
                return (
                  // returning the data in card
                  <div class="card mb-4 mx-3 card-hover" style={{ height:'24rem', width: '14rem',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }} key={index}>
                    <img src={value.Poster} class="card-img-top" alt="..." />
                    <div class="ribbon">{value.Type}</div>
                    <div class="card-body">
                      <h5 class="card-title">{value.Title}</h5>
                      <h5 class="card-text">Year: {value.Year}</h5>
                      
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="fixed-bottom " style={{background:'#242726'}}>
          <div className="container">
            <div className="row">
              <div className="col text-center">
                {page > 1 && (
                  <button className="btn btn-outline-success" style={{ color: 'white' }} onClick={handlePrevPage}>
                    Previous
                  </button>
                )}
                <span className="mx-2" style={{ color: 'white' }}>
                  Page {page} of {Math.ceil(totalResults / 12)}
                </span>
                {page * 12 < totalResults && (
                  <button className="btn btn-outline-success" style={{ color: 'white' }} onClick={handleNextPage}>
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
