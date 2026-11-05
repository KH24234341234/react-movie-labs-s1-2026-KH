import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import UpcomingPage from "./pages/upcomingPage";
import MovieDetailsPage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';

//attempt at theming 
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


// New Pages
import TopRatedPage from "./pages/topRatedPage";
import PopularMoviesPage from "./pages/popularMovies";
import TrendingTodayPage from "./pages/trendingToday";
import MovieCreditsPage from './pages/movieCreditsPage';
import PlaylistPage from "./pages/playlistPage";

//grey and green color scheme, may change later
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#66bb6a" },
    secondary: { main: "#a5d6a7" },
    background: {
      default: "#242424",
      paper: "#333333",
    },
  },
});


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});
//adding theme wrapper for my whole app here.... (theme provider, css baseline etc)
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />


              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/upcoming" element={<UpcomingPage />} />


              {/* Static List Routes */}
              <Route path="/movies/top-rated" element={<TopRatedPage />} />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/movies/trending" element={<TrendingTodayPage />} />

              {/* Parameterised Movie Routes*/}
              <Route path="/movies/:id" element={<MovieDetailsPage />} />
              <Route path="/movies/:id/credits" element={<MovieCreditsPage />} />
              <Route path="/movies/playlist" element={<PlaylistPage />} />

              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);