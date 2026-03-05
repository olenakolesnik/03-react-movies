
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const closeMovieModal = () => {
    setSelectedMovie(null);
  }
  const handleSubmit = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const { data } = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          query,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies}
        onSelect={handleSelectMovie} />}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
        onClose={closeMovieModal} />
      )}
    </>
  );
}

export default App;
