import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from "@chakra-ui/modal";
import { useForm } from "react-hook-form";
import { Button, useDisclosure, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import Field from "../Forms/Field";
import { PostService } from "services";
import { handleError } from "utils";
const outfits = ["first"];

const PostModal = () => {
    const {
      control,
      handleSubmit,
      formState: { isValid },
    } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { mutateAsync, isLoading } = useMutation(PostService.post, {
        onError: (error) => {
          handleError(error as AxiosError);
        },
      });
    
      const onSubmit = async (values: any) => {
        const { first_name, last_name, email, username, password } = values;
    
        const response = await mutateAsync({
          first_name,
          last_name,
          email: email.toLowerCase(),
          username,
          password,
        });
    
        if (response) {
          return onClose();
        }
      };
    return (
      <>
        <Button onClick={onOpen}>Make Post</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex
                    w="full"
                    h="full"
                    bg="brand.primaryLightBackground"
                    align="center"
                    justify="center"
                    px="4"
                    >
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
                        <Heading fontSize={["xl", "xl", "2xl"]}>
                        Hi there! Ready to make a post?
                        </Heading>
                        <Text color="brand.lightText" fontSize="sm">
                        Let's get started!
                        </Text>

                        <Divider />
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex w="full" flexDirection="column" gap="3">
                            <Flex w="full" flexDirection={["column", "column", "row"]} gap="3">
                            <Field
                                control={control}
                                name="outfit"
                                label="Outfit"
                                type="dropdown"
                                placeholder="Outfit of choice"
                                options={outfits}
                                required
                            />
                            <Field
                                control={control}
                                name="privacy"
                                label="Privacy"
                                type="dropdown"
                                placeholder="Who should see this"
                                required
                            />
                            </Flex>
                            <Field
                            control={control}
                            name="caption"
                            label="Caption"
                            type="textarea"
                            placeholder="Tell us about this outfit"
                            />
                            <Field
                            control={control}
                            name="images"
                            label="Additional Images"
                            type="multiple-file"
                            />

                            <Flex
                            w="full"
                            flexDirection="column"
                            gap="5"
                            fontSize={["sm", "sm", "md"]}
                            >
                            <Button
                                w="full"
                                colorScheme="brand.primaryScheme"
                                type="submit"
                                isDisabled={!isValid}
                            >
                                Post
                            </Button>
                            </Flex>
                        </Flex>
                        </form>
                    </Flex>
                    </Flex>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  };

  

export default PostModal;