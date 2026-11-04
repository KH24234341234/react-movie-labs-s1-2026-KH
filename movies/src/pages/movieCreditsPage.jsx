import { useParams } from 'react-router';
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const MovieCreditsPage = () => {
  const { id } = useParams();

  const { data: movie, isPending: moviePending, isError: movieError } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  });

  const { data: credits, isPending: creditsPending, isError: creditsError } = useQuery({
    queryKey: ['credits', { id: id }],
    queryFn: () => getMovieCredits(id),
  });

  if (moviePending || creditsPending) {
    return <Spinner />;
  }

  if (movieError || creditsError) {
    return <h1>Failed to load credits.</h1>;
  }

  return (
    <PageTemplate movie={movie}>
      <ul>
        {credits.cast.map((c) => (
          <li key={c.credit_id}>
            {c.name} as {c.character}
          </li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default MovieCreditsPage;