import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
  } from "@chakra-ui/modal";
  import { useForm } from "react-hook-form";
  import {
    Button,
    useDisclosure,
    Divider,
    Flex,
    Heading,
  } from "@chakra-ui/react";
  import { useMutation } from "react-query";
  import { AxiosError } from "axios";
  import axios from "axios";
  import Field from "../Forms/Field";
  import { handleError } from "@/utils";
  const API_URL = import.meta.env.VITE_API_URI + "/tag";
  
  const TagModal = () => {
    const {
      control,
      handleSubmit,
      formState: { isValid },
    } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { mutateAsync, isLoading } = useMutation(async (form_data: any) => {
        const { data } = await axios.post(`${API_URL}/add`, form_data);
        return data?.data;}, {
      onError: (error) => {
        handleError(error as AxiosError);
      },
    });
  
    const onSubmit = async (values: any) => {
      const { tag } = values;
  
      const response = await mutateAsync({
        tag,
      });
  
      if (response) {
        return onClose();
      }
    };
    return (
      <>
        <Button
            onClick={onOpen}
            w="full"
            mt="3"
        >Make New Tag</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Tag</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex
                  w="full"
                  maxW="container.sm"
                  bg="white"
                  p={["5", "5", "7"]}
                  borderRadius="xl"
                  shadow="base"
                  flexDirection="column"
                  gap="3"
                >
                  <Flex w="full" flexDirection="column" gap="3">
                      <Field
                        control={control}
                        name="tag"
                        label="New Tag"
                        type="text"
                        placeholder="ex. Spring"
                        required
                      />
                  </Flex>
                </Flex>
              </ModalBody>
  
              <ModalFooter>
                <Flex
                  w="full"
                  flexDirection="row"
                  gap="5"
                  fontSize={["sm", "sm", "md"]}
                >
                  <Button
                    w="full"
                    colorScheme="brand.primaryScheme"
                    type="submit"
                    isDisabled={!isValid}
                  >
                    Add Tag
                  </Button>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </>
    );
  };
  
  export default TagModal;