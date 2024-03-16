import {useEffect, useState} from "react";
import {Box, Button, Center, IconButton, Stack} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import axios from "axios";
import ICloth from "@/interfaces/ICloth.ts";
import ITag from "@/interfaces/ITag.ts";
import ClothCard from "@/Components/ClothCard.tsx";

const API_URL = import.meta.env.VITE_API_URI;

interface OutfitItem {
    id: number;
    cloth?: ICloth;
}

const MakeOutfitPage = () => {
    const [outfitItemId, setOutfitItemId] = useState<number>(0);
    const [outfitItems, setOutfitItems] = useState<OutfitItem[]>([]);
    const [tags, setTags] = useState<ITag[]>([]);

    console.log(API_URL);

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


    function addItem(direction: 'above' | 'below') {
        if (outfitItems.length >= 5) return;

        if (direction === 'above') {
            setOutfitItems([{id: outfitItemId + 1}, ...outfitItems]);
        } else {
            setOutfitItems([...outfitItems, {id: outfitItemId + 1}]);
        }

        setOutfitItemId(outfitItemId + 1);
    }

    function removeItem(id: number) {
        setOutfitItems(outfitItems.filter((outfitItem) => outfitItem.id !== id));
    }

    return (
        <>
            <Center>
                <Stack spacing={4}>
                    <IconButton
                        aria-label='Add item'
                        icon={<AddIcon/>}
                        isDisabled={outfitItems.length >= 5}
                        onClick={() => addItem('above')}
                    />
                    {outfitItems.map((item: OutfitItem) => {
                        return (
                            <ClothCard
                                key={item.id}
                                tags={tags}
                                onClothChanged={(cloth: ICloth) => {
                                    
                                }}
                                onDelete={() => removeItem(item.id)}
                            />
                        );
                    })}
                    <IconButton
                        aria-label='Add item'
                        icon={<AddIcon/>}
                        isDisabled={outfitItems.length >= 5}
                        onClick={() => addItem('below')}/>
                </Stack>
            </Center>
            <Box height={4}/>
            <Center>
                <Button>Finish Outfit</Button>
            </Center>
        </>
    );
}

export default MakeOutfitPage;