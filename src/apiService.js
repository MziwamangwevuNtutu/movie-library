import axios from 'axios';

// Ensure this matches your Spring Boot server.servlet.context-path
const API_BASE_URL = "http://localhost:8080/movies/api/movies";

export const getMovies = () => axios.get(API_BASE_URL);
export const addMovie = (movie) => axios.post(API_BASE_URL, movie);
export const deleteMovie = (id) => axios.delete(`${API_BASE_URL}/${id}`);
export const updateMovie = (id, updatedMovie) => axios.put(`${API_BASE_URL}/${id}`, updatedMovie);