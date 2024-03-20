import { z } from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import { TextInput, NumberInput, CheckboxGroupInput } from "../Forms";
import FileUpload from "../Upload";
import ITag from "@/interfaces/ITag";
import { useQuery } from "react-query";
import { TagService } from "@/services";

const API_URL = import.meta.env.VITE_API_URI;

export const addClothSchema = z.object({
  description: z.string({
    description: "Description is required",
  }),
  no_of_wears: z.string({
    description: "Number of wears is required",
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
  tags: z.array(
    z.string({
      description: "Tags are required",
    })
  ),
});

const AddClothForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: any) => any;
  isLoading: boolean;
}) => {
  // @ts-ignore
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    (async () => await load())();
  }, []);

  async function load() {
    try {
      const response = await axios.get(`${API_URL}/tag/all`);
      setTags(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  type clothFormValues = z.infer<typeof addClothSchema>;

  const ClothForm = useForm<clothFormValues>({
    resolver: zodResolver(addClothSchema),
    defaultValues: {
      // TODO: add default to tags options here after db
    },
  });

  const { data: allTags } = useQuery("all-tags", async () => {
    const tags = await TagService.getAllTags();
    return tags;
  });
  return (
    <FormProvider {...ClothForm}>
      <form
        onSubmit={ClothForm.handleSubmit(
          (data) => {
            onSubmit({
              description: data.description,
              no_of_wears: data.no_of_wears,
              cloth_id: data.picture.id,
              tags: data.tags,
            });
            // empty the form
            ClothForm.reset();
          },
          (error) => {
            console.log("printing error", error);
          }
        )}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <TextInput
            name={`description`}
            control={ClothForm.control as any}
            required
            label="Cloth Description"
            placeholder="Enter cloth description"
          />
          <NumberInput
            name="no_of_wears"
            control={ClothForm.control as any}
            required
            label="Number of Wears"
            placeholder="Enter number of wears"
          />

          <FileUpload
            control={ClothForm.control}
            label="Add Picture"
            name={`picture`}
            required
          />
          <p className=" text-red-400 text-sm">
            {ClothForm.formState.errors?.picture?.message}
          </p>
          <CheckboxGroupInput
            name="tags"
            label="Add Tags"
            control={ClothForm.control as any}
            // @ts-ignore
            options={allTags?.map((tag) => ({
              value: tag.id.toString(),
              label: tag.tag_name,
            }))}
          />
        </div>
        <Button isLoading={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddClothForm;
