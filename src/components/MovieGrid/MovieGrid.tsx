import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
interface MovieGridProps {
    movies: Movie[];
}


function MovieGrid({movies}: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {/* Набір елементів списку з фільмами */}
            {movies.map(movie => (
              <li key={movie.id}>
              <div className={css.card}>
                <img 
                      className={css.image} 
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/placeholder.jpg"
                      } 
                      alt={movie.title} 
                      loading="lazy" 
                    />
                  <h2 className={css.title}>{movie.title}</h2>
              </div>
            </li>  
            ))}
      </ul>  
    )
}
export default MovieGrid;