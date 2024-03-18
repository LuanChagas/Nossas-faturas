import CSS from "csstype";
import NavMobile from "./NavMobile";

const Header = () => {
  const estiloDoComponente: CSS.Properties = {
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: "110%",
    letterSpacing: "-4px",
    background: "linear-gradient(263deg, #9130F4 21.05%, #4646F9 77.63%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  return (
    <>
      <header className="bg-indigo-950 w-full h-16 flex items-center shadow-xl justify-between z-10 ">
        <h1
          style={estiloDoComponente}
          className="md:px-5 p-3 md:text-5xl text-3xl"
        >
          Nossas Faturas
        </h1>
        <div className="px-4 my-4 md:hidden">
          <NavMobile></NavMobile>
        </div>
      </header>
    </>
  );
};

export default Header;
