import { Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const gotoDashboard = () => {
    navigate("/");
  };
  return (
    <Flex
      w="full"
      h="100vh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={[2, 4, 6]}
    >
      <Heading color="brand.primary" fontSize={["md", "lg", "4xl"]}>
        Page Not Found
      </Heading>
      <Text
        color={"gray.500"}
        fontSize={["sm", "md", "lg"]}
        textAlign={["center", "center", "left"]}
      >
        The page you're looking for does not seem to exist
      </Text>
      <Button
        colorScheme="brand.primaryScheme"
        size={["xs", "sm", "md"]}
        onClick={gotoDashboard}
      >
        Go to Home
      </Button>
    </Flex>
  );
};

export default NotFound;
