import { Outlet } from "react-router-dom";

const MainContent = () => {
  return (
    <>
      <main className="flex w-full flex-col md:p-5 p-2  sm:overflow-auto ">
        <Outlet />
      </main>
    </>
  );
};

export default MainContent;
