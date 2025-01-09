import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import useAlert from "./hooks/useAlert";
import CustomCallout from "./components/CustomCallout";

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
  const { alert } = useAlert();

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
          <CheckLocation children={<Sidebar />}></CheckLocation>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/login" Component={Login} />
            <Route path="/home" Component={Home} />
            <Route path="/detail/:id" Component={ImageDetail} />
            <Route path="/favorites" Component={Favorites} />
          </Routes>
        </Router>
        <CustomCallout alert={alert} />
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
