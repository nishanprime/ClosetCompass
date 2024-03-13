import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "@/configs/theme";
import "./index.css";
import { AppProvider } from "@/contexts";

const { ToastContainer } = createStandaloneToast();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} cssVarsRoot="body">
        <AppProvider>
          <App />
        </AppProvider>
        <ToastContainer />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
