import {
  Flex
} from "@chakra-ui/react";

const PortalSidebar = () => {
  return (
    <Flex
      h="100vh"
      position="fixed"
      left="0"
      top="0"
      bg="brand.footer"
      shadow="base"
      align="center"
      pt={["60px", "60px", "100px"]}
      flexDirection="column"
      gap="3"
      width="200px"
      display={["none", "none", "flex"]}
      color={"white"}
    >
      This is the PortalSidebar component
    </Flex>
  );
};

export default PortalSidebar;
