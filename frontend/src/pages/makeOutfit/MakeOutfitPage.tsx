import { useState } from "react";
import { Button, Center, Stack } from "@chakra-ui/react";
import axios from "axios";
import OutfitCreator from "@/pages/makeOutfit/Components/OutfitCreator.tsx";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/Forms/TextInput.tsx";

const API_URL = import.meta.env.VITE_API_URI;

const addOutfitSchema = z.object({
  name: z.string({ description: "Name is required" }).min(1),
  description: z.string({ description: "Description is required" }).min(1),
});
type outfitFormValues = z.infer<typeof addOutfitSchema>;

export interface OutfitItem {
  id: number;
  clothId?: number;
}

const MakeOutfitPage = () => {
  const [outfitItems, setOutfitItems] = useState<OutfitItem[]>([]);

  const OutfitForm = useForm<outfitFormValues>({
    resolver: zodResolver(addOutfitSchema),
    defaultValues: {},
  });

  async function createOutfit(data: { name: string; description: string }) {
    const outfit = {
      name: data.name,
      description: data.description,
      clothes: outfitItems.map((outfitItem) => outfitItem.clothId),
    };

    try {
      await axios.post(`${API_URL}/outfit/add`, outfit);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }

    OutfitForm.reset();

    // TODO: Maybe some sort of dialog that says you did a thing!
  }

  function showError(error: any) {
    console.log(error);
  }

  function isValidOutfit(outfitItems: OutfitItem[]): boolean {
    if (outfitItems.length === 0) return false;

    for (const outfitItem of outfitItems) {
      if (outfitItem.clothId === undefined) return false;
    }

    return true;
  }

  return (
    <>
      <Center>
        <FormProvider {...OutfitForm}>
          <form onSubmit={OutfitForm.handleSubmit(createOutfit, showError)}>
            <Stack spacing={4}>
              <TextInput
                required
                name={"name"}
                control={OutfitForm.control as any}
                label={"Name"}
                placeholder={"Enter outfit name..."}
              />
              <TextInput
                required
                name={"description"}
                control={OutfitForm.control as any}
                label={"Description"}
                placeholder={"Enter outfit description..."}
              />
              <OutfitCreator
                onOutfitChanged={(outfitItems) => {
                  setOutfitItems(outfitItems);
                }}
              />
              <Button type="submit" isDisabled={!isValidOutfit(outfitItems)}>
                Finish Outfit
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Center>
      {/*<ClothSidebar/>*/}
    </>
  );
};

export default MakeOutfitPage;
