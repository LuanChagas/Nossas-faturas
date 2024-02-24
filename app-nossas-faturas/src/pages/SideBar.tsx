import ItensNavegacao from "../components/shared/global/ItensNavegacao";

interface NavBarProps {
  className: string;
}

const SideBar = ({ className }: NavBarProps) => {
  return (
    <>
      <nav className={`bg-gray-200 w-72 h-full shadow-xl ${className}`}>
        <ItensNavegacao></ItensNavegacao>
      </nav>
    </>
  );
};

export default SideBar;
