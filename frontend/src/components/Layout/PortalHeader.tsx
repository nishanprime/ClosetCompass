import { Flex, Link } from "@chakra-ui/react";

import { NavLink, useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";

import UserMenu from "./UserMenu";
import { LucideIcon, Package2, PackagePlus, Shirt, User } from "lucide-react";

const Links: {
  ICON: LucideIcon;
  link: string;
  name: string;
}[] = [
  {
    ICON: User,
    link: "/profile",
    name: "Profile",
  },
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
        </Flex>
          <Flex align="right">
            <button onClick={loginRoute}>Login/Register</button>
          </Flex>
      </Flex>
    );
  }
  else {
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
        bg="brand.primaryBackground"
        shadow="base"
        color="black"
        paddingRight="5%"
        paddingLeft="5%"
      >
        <Flex as="button" w="fit-content"align="left" border="2px black solid" bg="brand.primaryLightBackground" padding="5px" borderRadius="lg">
          <Link as={ReactRouterLink} to="/">
            Home
          </Link>
        </Flex>
        <Spacer />
        <Flex as="button" border="2px black solid" bg="brand.primaryLightBackground" padding="5px" borderRadius="lg">
          <Link as={ReactRouterLink} to="/">
            Profile
          </Link>
        </Flex>
        <Spacer />
        <Flex as="button" border="2px black solid" bg="brand.primaryLightBackground" padding="5px" borderRadius="lg">
          <Link as={ReactRouterLink} to="/">
            Outfits
          </Link>
        </Flex>
        <Spacer />
        <Flex as="button" border="2px black solid" bg="brand.primaryLightBackground" padding="5px" borderRadius="lg">
          <Link as={ReactRouterLink} to="/">
            Wardrobe
          </Link>
        </Flex>
        <Spacer />
        <UserMenu/>
      </Flex>
    );
  }
        );
      })}
      <UserMenu />
    </Flex>
  );
};

export default PortalHeader;
