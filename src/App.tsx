import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";

const queryClient = new QueryClient();

function App() {
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
          <Sidebar />
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/login" Component={Login} />

            {/* <Sidebar /> */}
            <Route path="/home" Component={Home} />
          </Routes>
        </Router>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
