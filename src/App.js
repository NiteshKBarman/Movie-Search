// import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react'
import axios from 'axios'

function App() {
  

  const [text,setText] = useState("Search Movies")
  const [movie,setMovie] = useState([]);

  const changeText=(event)=>{
    //console.log(event);
    setText(event.target.value);
  }
  

  const getMovie=(e)=>{
    e.preventDefault();

    axios.get(`https://www.omdbapi.com/?s=${text}&apikey=e8a6bca4`)
    .then((response)=>{
      console.log(response);
      setMovie(response.data.Search)
    })


  }

  

  return (

    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">OMDb Movies Search</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <form className="d-flex" onSubmit={getMovie}>
              <input className="form-control me-2" type="Search" placeholder="Search Movie" aria-label="Search" value={text} onChange={changeText}/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container my-3">
        <div className='row'>
          {
            movie.map((value, index) => {
              return (
                <div class="card" style={{width: "18rem"}}>
                  <img src={value.Poster} class="card-img-top" alt="..."/>
                  <div class="card-body">
                    <h3 class="card-title">{value.Title}</h3>
                    <h5 class="card-text">Year: {value.Year}</h5>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              )
            })
          }

      
        </div>
      </div>
    </>
  )
}

export default App;
