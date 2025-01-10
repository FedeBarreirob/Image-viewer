import { QueryClient, QueryClientProvider } from "react-query";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import ImageDetail from "./pages/ImageDetail";
import { useUserStore } from "./store/authStore";
import { useEffect } from "react";
import useFavoritesStore from "./store/favoriteStore";
import CheckLocation from "./helpers/CheckLocation";
import Favorites from "./pages/Favorites";
import "./App.css";
import CustomCallout from "./components/CustomCallout";
import ProtectedRoute from "./helpers/ProtectedRoutes";
import PublicRoute from "./helpers/PublicRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const restoreUser = useUserStore((state) => state.restoreUser);
  const restoreFavorites = useFavoritesStore((state) => state.restoreFavorites);

  useEffect(() => {
    restoreUser();
    restoreFavorites();
  }, [restoreUser, restoreFavorites]);

  return (
    <QueryClientProvider client={queryClient}>
      <Theme
        appearance="dark"
        accentColor="purple"
        grayColor="sand"
        radius="large"
        scaling="100%"
      >
        <Router>
          <CheckLocation>
            <Sidebar />
          </CheckLocation>
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/detail/:id" element={<ProtectedRoute><ImageDetail /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          </Routes>
          <CustomCallout />
        </Router>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
