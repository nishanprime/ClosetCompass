import { Flex, Link } from "@chakra-ui/react";

import { NavLink, useLocation } from "react-router-dom";

import UserMenu from "./UserMenu";
import { LucideIcon, Package2, PackagePlus, Shirt } from "lucide-react";

const Links: {
  ICON: LucideIcon;
  link: string;
  name: string;
}[] = [
  // {
  //   ICON: User,
  //   link: "/profile",
  //   name: "Profile",
  // },
  {
    ICON: Shirt,
    link: "/clothes",
    name: "Clothes",
  },
  {
    ICON: PackagePlus,
    link: "/make-outfit",
    name: "Make Outfit",
  },
  {
    ICON: Package2,
    link: "/outfits",
    name: "Outfits",
  },
];

const PortalHeader = () => {
  const location = useLocation();
  return (
    <Flex
      w="full"
      h={["60px", "60px", "70px"]}
      p="4"
      align="center"
      justify="left"
      justifyContent="space-evenly"
      position="fixed"
      top="0"
      zIndex={100}
      bg="white"
      shadow="base"
    >
      <Link as={NavLink} to="/">
        <img src="/logo/svg/logo-no-background.svg" alt="logo" width="80px" />
      </Link>
      {Links.map((link) => {
        return (
          <Link
            color={location.pathname === link.link ? "brand.primary" : "black"}
            key={link.name}
            as={NavLink}
            className="flex flex-col items-center justify-center hover:scale-95 ease-in-out duration-150"
            to={link.link}
            p="2"
            _hover={{
              color: "brand.primary",
            }}
          >
            <link.ICON size={18} />
            <p>{link.name}</p>
          </Link>
        );
      })}
      <UserMenu />
    </Flex>
  );
};

export default PortalHeader;
