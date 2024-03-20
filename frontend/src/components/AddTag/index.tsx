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
import { Button, useDisclosure, Flex } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import Field from "../Forms/Field";
import { handleError } from "@/utils";
import { TagService } from "@/services";

const TagModal = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync } = useMutation(TagService.addTag, {
    onSuccess: () => {
      return onClose();
    },
    onError: (error: AxiosError) => {
      handleError(error);
    },
  });

  const onSubmit = async (values: any) => {
    const { tag } = values;
    // const queryClient = useQueryClient();
    await mutateAsync({ tag });
    window.location.reload();
    // invalidate query called "all-tags" from react-query
    // to refetch the tags
    // queryClient.invalidateQueries("all-tags");
  };
  return (
    <>
      <Button
        onClick={onOpen}
        w="full"
        mt="3"
        colorScheme="brand.primaryScheme"
      >
        Make New Tag
      </Button>

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
