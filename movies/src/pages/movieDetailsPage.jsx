import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { useNavigate } from "react-router"; //use this to add little button to move to another page
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";//use this to add icon to let me add to playlist

const MoviePage = (props) => {
  const { id } = useParams();
  const navigate = useNavigate(); //use this to go to my new moviecredits page

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  //added button here very simple , will style it later...
  //added playlist button here to let you add a movie to it ....
  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <AddToPlaylistIcon movie={movie} />
            <button onClick={() => navigate(`/movies/${id}/credits`)}>
              View cast and credits
            </button>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
