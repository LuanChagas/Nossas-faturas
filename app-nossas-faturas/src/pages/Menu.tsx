import MainContent from "@/components/shared/global/MainContent";
import Header from "./Header";
import NavBar from "./SideBar";
import { Toaster } from "@/components/ui/toaster";

const Menu = () => {
  return (
    <>
      <Header></Header>
      <section
        className="flex flex-grow"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <NavBar className="hidden md:flex"></NavBar>
        <MainContent></MainContent>
      </section>
      <Toaster />
    </>
  );
};

export default Menu;
