import { Flex, Icon } from "@chakra-ui/react";

import { PiWarningFill } from "react-icons/pi";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiSolidInfoCircle } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";

const Alert = ({
  status = "info",
  children,
}: {
  status?: "success" | "error" | "warning" | "info";
  children: string;
}) => {
  const icon = () => {
    switch (status) {
      case "success":
        return BsFillCheckCircleFill;
      case "error":
        return AiFillCloseCircle;
      case "warning":
        return PiWarningFill;
      case "info":
        return BiSolidInfoCircle;
      default:
        return BiSolidInfoCircle;
    }
  };

  return (
    <Flex
      w="full"
      bg={`brand.status.${status}`}
      borderColor={`brand.status.${status}-border`}
      borderWidth="1px"
      rounded="md"
      p="3"
      fontSize="sm"
      align={["flex-start", "flex-start", "center"]}
    >
      <Icon
        as={icon()}
        color={`brand.status.${status}-icon`}
        mr={["0", "0", "2"]}
        fontSize="2xl"
        display={["none", "none", "block"]}
      />
      {children}
    </Flex>
  );
};

export default Alert;
