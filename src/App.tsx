import "./styles/globals.css";
import { Routes, Route } from "react-router";

// import { NavbarLayout } from "./widgets/navbar-layout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
