import { Outlet } from "react-router-dom";

const MainContent = () => {
  return (
    <>
      <main className="flex w-full flex-col md:p-5 p-2 sm:h-screen sm:overflow-auto pt-20 sm:pt-0">
        <Outlet />
      </main>
    </>
  );
};

export default MainContent;
