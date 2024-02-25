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
          <h1> Replace with logo image</h1>
          {/* <Image src="/logo.svg" alt="logo" h={["40px", "40px", "60px"]} /> */}
        </Link>
      </Flex>
    </Flex>
  );
};

export default AuthHeader;
