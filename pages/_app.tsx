import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalsProvider } from "../utils/modal/ModalProvider";
import ModalsContainer from "../utils/modal/ModalsContainer";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div id={"modal"}></div>
      <ModalsProvider>
        <Component {...pageProps} />
        <ModalsContainer />
      </ModalsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
