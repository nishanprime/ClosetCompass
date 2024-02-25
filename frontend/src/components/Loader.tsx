import { CircularProgress, Flex } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex
      w="full"
      h="100vh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress
        isIndeterminate
        color="brand.primary"
        size="40px"
        thickness="4px"
      />
    </Flex>
  );
};

export default Loader;
