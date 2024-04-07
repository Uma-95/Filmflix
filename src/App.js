
import React, { useState } from 'react';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';

// 601e5396

// API_URL: It's a constant variable that holds the base URL of the OMDB API along with an API key. This URL is used to make requests to the OMDB API.



const API_URL = 'https://www.omdbapi.com?apikey=601e5396';  // changed http -> https

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    // searchMovies: It's an asynchronous function that takes a title parameter. This function is responsible for making a request to the OMDB API to search for movies based on the provided title.


// Inside searchMovies, fetch is used to make a GET request to the OMDB API with the search query parameter (s=${title}). 

// The response from the API is then converted to JSON format using response.json().

// Finally, the search results are logged to the console.


    const searchMovies = async () => {
        if (searchTerm.trim() === '') {  
                                          // If search term is empty do not make API call
            return;
        }


        const response = await fetch(`${API_URL}&s=${searchTerm}`);
        const data = await response.json();
        if (data.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]);
              // [] as the dependency array means it only runs once, on mount

        }
    };

    return (
        <div className="app">
            <h1>Filmflix</h1>

            <div className="search">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for movies"
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={searchMovies} // Call searchMovies when search icon is clicked
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie, index) => (
                            <MovieCard key={index} movie={movie} /> // added key prop 
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
};

export default App;
