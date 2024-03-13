import { Flex, Image, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const AuthHeader = () => {
  return (
    <Flex
      w="full"
      h={["60px", "60px", "80px"]}
      p="4"
      align="center"
      justify="center"
      position="fixed"
      top="0"
      zIndex={100}
      bg="white"
      shadow="base"
    >
      <Flex maxW="container.xl" w="full" justify="space-between" align="center">
        <Link as={NavLink} to="/">
          <img src="/logo/svg/logo-no-background.svg" alt="logo" width="80px" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default AuthHeader;
