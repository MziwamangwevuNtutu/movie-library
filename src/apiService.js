import axios from 'axios';

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || `${process.env.REACT_APP_API_URL}/movies/api/movies`).replace(/\/$/, "");

export const getMovies = () => axios.get(API_BASE_URL);
export const addMovie = (movie) => axios.post(API_BASE_URL, movie);
export const deleteMovie = (id) => axios.delete(`${API_BASE_URL}/${id}`);
export const updateMovie = (id, updatedMovie) => axios.put(`${API_BASE_URL}/${id}`, updatedMovie);