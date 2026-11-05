//followed from favorite movie page for this.
import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";
import WriteReview from "../components/cardIcons/writeReview";

const PlaylistPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  const playlistMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  const isPending = playlistMovieQueries.find((movie) => movie.isPending);

  if (isPending) {
    return <Spinner />;
  }

  const movies = playlistMovieQueries.map((query) => {
    query.data.genre_ids = query.data.genres.map((genre) => genre.id);
    return query.data;
  });
  //used new cardicon i created earlier
  return (
    <PageTemplate
      title="My Playlist"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromPlaylistIcon movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default PlaylistPage;
