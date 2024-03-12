import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import { TextInput, NumberInput } from "../Forms";
import FileUpload from "../Upload";
import { error } from "console";

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
});

const AddClothForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}) => {
  type clothFormValues = z.infer<typeof addClothSchema>;

  const ClothForm = useForm<clothFormValues>({
    resolver: zodResolver(addClothSchema),
    defaultValues: {},
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
        </div>
        <Button isLoading={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddClothForm;
