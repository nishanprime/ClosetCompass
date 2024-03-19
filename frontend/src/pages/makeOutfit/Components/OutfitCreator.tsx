import {useEffect, useState} from "react";
import ITag from "@/interfaces/ITag.ts";
import {OutfitItem} from "@/pages/makeOutfit/MakeOutfitPage.tsx";
import {IconButton, VStack} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import ClothCard from "@/pages/makeOutfit/Components/ClothCard.tsx";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI;

export const OutfitCreator = ({onOutfitChanged}: {
    onOutfitChanged: (outfitItems: OutfitItem[]) => void,
}) => {
    const [outfitItemId, setOutfitItemId] = useState<number>(0);
    const [outfitItems, setOutfitItems] = useState<OutfitItem[]>([]);
    const [tags, setTags] = useState<ITag[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${API_URL}/tag/all`);
                setTags(response.data.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    // Add an OutfitItem to the Outfit
    function addOutfitItem(direction: 'above' | 'below') {
        // Cap the number of outfit items
        if (outfitItems.length >= 5) return;

        let newOutfitItems;
        if (direction === 'above') {
            // Add to top
            newOutfitItems = [{id: outfitItemId + 1}, ...outfitItems];
        } else {
            // Add to bottom
            newOutfitItems = [...outfitItems, {id: outfitItemId + 1}];
        }

        // Increment the outfitItemId
        setOutfitItemId(outfitItemId + 1);
        // Update state
        setOutfitItems(newOutfitItems);
        // Notify callback
        onOutfitChanged(newOutfitItems);
    }

    // Remove an OutfitItem by id
    function removeItem(id: number) {
        const newOutfitItems = outfitItems.filter((outfitItem) => outfitItem.id !== id);

        // Update state
        setOutfitItems(newOutfitItems);
        // Notify callback
        onOutfitChanged(newOutfitItems);
    }

    return (
        <VStack>
            <IconButton
                aria-label='Add item'
                icon={<AddIcon/>}
                isDisabled={outfitItems.length >= 5}
                onClick={() => addOutfitItem('above')}
            />
            {
                outfitItems.map((item: OutfitItem) => {
                    return (
                        <ClothCard
                            key={item.id}
                            tags={tags}
                            onClothChanged={(clothId: number) => {
                                const index = outfitItems.findIndex((findCloth) => {
                                    return findCloth.id === item.id;
                                });

                                outfitItems[index].clothId = clothId;
                                setOutfitItems([...outfitItems]);

                                onOutfitChanged([...outfitItems]);
                            }}
                            onDelete={() => removeItem(item.id)}
                        />
                    );
                })
            }
            <IconButton
                aria-label='Add item'
                icon={<AddIcon/>}
                isDisabled={outfitItems.length >= 5}
                onClick={() => addOutfitItem('below')}/>
        </VStack>
    );
}

export default OutfitCreator;