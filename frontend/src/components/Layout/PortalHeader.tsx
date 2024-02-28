import { Flex, Link } from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UserMenu from "./UserMenu";
import { useAppContext } from "contexts";
const PortalHeader = () => {
  const user = useAppContext();
  let navigate = useNavigate();
  const loginRoute = () => {
    let path = "/auth/login";
    navigate(path);
  }
  if (!user) {
    return (
      <Flex
        w="full"
        h={["60px", "60px", "70px"]}
        p="4"
        align="center"
        justify="center"
        position="fixed"
        top="0"
        zIndex={100}
        bg="white"
        shadow="base"
      >
        <Flex w="full" justify="space-between" align="center">
          <Link as={NavLink} to="/">
            This is the PortalHeader component
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
        bg="white"
        shadow="base"
      >
        <Flex w="fit-content"align="left" border="2px black solid">
          <Link as={NavLink} to="/">
            This is the PortalHeader component
          </Link>
        </Flex>
          <Flex border="2px black solid">
            <button>Profile</button>
          </Flex>
          <Flex border="2px black solid">
            <button>Outfits</button>
          </Flex>
          <Flex border="2px black solid">
            <button>Wardrobe</button>
          </Flex>
          <UserMenu/>
      </Flex>
    );
  }
};

export default PortalHeader;
