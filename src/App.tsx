import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme appearance="dark" accentColor="purple" grayColor="sand" radius="large" scaling="100%">
        <Router>
          <Routes>
            <Route path="/login" Component={Login} />
            {/* <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            /> */}
          </Routes>
        </Router>
        {/* <ThemePanel /> */}
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
