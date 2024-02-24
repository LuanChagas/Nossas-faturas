import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ItensNavegacao from "../components/shared/global/ItensNavegacao";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const NavMobile = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <p>
          <HamburgerMenuIcon color="white" width={25} height={25} />
        </p>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <ItensNavegacao></ItensNavegacao>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
