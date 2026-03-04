
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function App() {
  const [movies, setMovies] = useState([]);
  const handleSubmit = async (query: string) => {
    try {
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
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSubmit} />
      
      {movies.length > 0 && <MovieGrid movies={movies} />}
    </>
  );
}

export default App;
