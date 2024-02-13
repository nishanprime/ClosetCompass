import { createStandaloneToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

const { toast } = createStandaloneToast();

export const handleError = (error: AxiosError) => {
  const { response, code } = error;
  //get error code from axios ty

  if (code === "ERR_NETWORK") {
    return toast({
      title: "Internet Connection Error",
      description:
        "Unable to connect to server, please check your internet connection.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  if (code === "ERR_CONNECTION_REFUSED") {
    return toast({
      title: "Internet Connection Error",
      description:
        "Unable to connect to server, please check your internet connection.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  if (code === "ERR_BAD_REQUEST") {
    if (response?.data) {
      return toast({
        title: "Error",
        //@ts-ignore
        description: response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return toast({
    title: "Error",
    description: "An error occurred, please try again later.",
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};

//handle success
export const handleSuccess = (message: string) => {
  return toast({
    title: "Success",
    description: message,
    status: "success",
    duration: 5000,
    isClosable: true,
  });
};

export const handleStringError = (error: string) => {
  return toast({
    title: "Error",
    description: error,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};
