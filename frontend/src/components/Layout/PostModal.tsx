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
import Field from "../Forms/Field";
import { PostService } from "@/services";
import { handleError } from "@/utils";
const outfits = ["first"];

const PostModal = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync } = useMutation(PostService.post, {
    onError: (error) => {
      handleError(error as AxiosError);
    },
  });

  const onSubmit = async (values: any) => {
    const { outfit_id, privacy, caption, images } = values;

    const response = await mutateAsync({
      outfit_id,
      privacy,
      caption,
      images,
    });

    if (response) {
      return onClose();
    }
  };
  return (
    <>
      <Button onClick={onOpen}>Make Post</Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Post</ModalHeader>
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
                <Heading fontSize={["xl", "xl", "2xl"]}>
                  Hi there! Ready to make a post?
                </Heading>

                <Divider />
                <Flex w="full" flexDirection="column" gap="3">
                  <Flex
                    w="full"
                    flexDirection={["column", "column", "row"]}
                    gap="3"
                  >
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
                  Post
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

export default PostModal;
