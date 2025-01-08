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
import CheckLocation from "./helpers/checkLocation";
import ImageDetail from "./pages/ImageDetail";
import { useUserStore } from "./store/authStore";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  const restoreUser = useUserStore((state) => state.restoreUser);

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

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
          <CheckLocation children={<Sidebar />}>
          </CheckLocation>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/login" Component={Login} />
            <Route path="/home" Component={Home} />
            <Route path="/detail/:id" Component={ImageDetail} />
          </Routes>
        </Router>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
