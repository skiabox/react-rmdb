import { useEffect, useState } from 'react';

// API
import API from '../API';
// Helpers
import { isPersistedState } from '../helpers';

//create an initial state
const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
};

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  //define fetchMovies function
  const fetchMovies = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      console.log('movies returned from api: ', movies);
      setState(prev => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial and search
  //The first time searchTerm is '' so the function brings the most popular movies
  useEffect(() => {
    //check local browser storage for persisted state
    if (!searchTerm) {
      const sessionState = isPersistedState('homeState');

      if (sessionState) {
        console.log('Grabing from sessionStorage');
        setState(sessionState);
        return;
      }
    }
    console.log('Grabbing from API');
    //wipe out old state
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load More
  // executes some code only if isLoadingMore is true
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  // Write to sessionStorage
  useEffect(() => {
    if (!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
  }, [searchTerm, state]);

  return {
    state,
    loading,
    error,
    setSearchTerm,
    searchTerm,
    setIsLoadingMore
  };
};
