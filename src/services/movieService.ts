import axios from "axios";
import type { Movie } from "../types/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const { data } = await axios.get<FetchMoviesResponse>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: { query },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  
    return data.results;
  };