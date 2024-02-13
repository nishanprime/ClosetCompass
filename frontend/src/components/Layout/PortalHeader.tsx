import { Flex, Image, Link } from "@chakra-ui/react";

import { NavLink } from "react-router-dom";


const PortalHeader = () => {
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
    </Flex>
  );
};

export default PortalHeader;
