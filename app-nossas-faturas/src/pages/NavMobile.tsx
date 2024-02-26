import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ItensNavegacao from "../components/shared/global/ItensNavegacao";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const NavMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <p>
          <HamburgerMenuIcon color="white" width={25} height={25} />
        </p>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <ItensNavegacao setOpen={setOpen}></ItensNavegacao>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
