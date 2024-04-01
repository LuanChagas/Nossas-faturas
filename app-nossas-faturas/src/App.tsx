import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Header from "./pages/Header";
import MainContent from "./components/shared/global/MainContent";
import NavBar from "./pages/SideBar";
import { Toaster } from "./components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header></Header>
        <section
          className="flex flex-grow"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <NavBar className="hidden md:flex"></NavBar>
          <MainContent></MainContent>
        </section>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
