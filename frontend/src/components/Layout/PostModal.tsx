import { z } from "zod";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  useDisclosure,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import Field from "../Forms/Field";
import FileUpload from "../Upload";
import { OutfitService, PostService } from "@/services";
import { handleError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";

export const addPostSchema = z.object({
  outfit: z.string({
    description: "Outfit id needed to make post",
  }),
  caption: z.string({
    description: "Caption optional to make post",
  }),
  picture: z.object(
    {
      name: z.string(),
      src: z.string(),
      id: z.any(),
    },
    {
      required_error: "Please upload a picture",
    }
  ),
});

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
    const { outfit_id, caption, media_id } = values;

    const response = await mutateAsync({
      outfit_id,
      caption,
      media_id,
    });

    if (response) {
      return onClose();
    }
  };
  type postFormValues = z.infer<typeof addPostSchema>;

  const PostForm = useForm<postFormValues>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {},
  });

  const {
    data: allOutfits,
    isLoading: outfitLoading,
  } = useQuery("all-outfits", async () => {
    const outfits = await OutfitService.getAllOutfits({
      search: "",
      sort_order: "DESC",
      page: 0,
      page_size: 100,
      sort_by: "",
    });
    return outfits;
  });
  console.log(allOutfits);
  return (
    <>
      <Button onClick={onOpen}>Make Post</Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <FormProvider {...PostForm}>
        <form onSubmit={PostForm.handleSubmit(
          (data) => {
            onSubmit({
              outfit_id: data.outfit,
              caption: data.caption,
              media_id: data.picture.id,
            });
            // empty the form
            PostForm.reset();
          },
          (error) => {
            console.log("printing error", error);
          }
        )}>
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
                    <Field
                      control={control}
                      name="outfit"
                      label="Outfit"
                      type="dropdown"
                      placeholder="Outfit of choice"
                      options={allOutfits?.outfits?.map((outfit: any) => outfit.name) || []}
                      required
                    />
                  <Field
                    control={control}
                    name="caption"
                    label="Caption"
                    type="textarea"
                    placeholder="Tell us about this outfit"
                  />
                  <FileUpload
                    control={PostForm.control}
                    label="Add Picture"
                    name={`picture`}
                    required
                  />
                  <p className=" text-red-400 text-sm">
                    {PostForm.formState.errors?.picture?.message}
                  </p>
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
        </FormProvider>
      </Modal>
    </>
  );
};

export default PostModal;
