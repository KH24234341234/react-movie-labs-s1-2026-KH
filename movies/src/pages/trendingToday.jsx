import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getTrendingMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TrendingTodayPage = (props) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['trending'],
    queryFn: getTrendingMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Trending Movies Today"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default TrendingTodayPage;