import {Box, Img, SimpleGrid} from "@chakra-ui/react";
import ICloth from "@/interfaces/ICloth.ts";
import {useEffect, useState} from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI;

export const ClothSidebar = () => {
    const [clothes, setClothes] = useState<ICloth[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${API_URL}/clothe/all`);
                setClothes(response.data.data.cloths);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <Box
            style={{margin: 0, padding: 0, width: '200px', position: "fixed", height: "100%", right: 0}}
            border="1px"
            borderColor="gray.200"
        >
            <SimpleGrid columns={2}>
                {clothes.map((cloth) => {
                    return (
                        <Img
                            key={cloth.id}
                            boxSize={'100px'}
                            objectFit={"contain"}
                            src={`${API_URL}/files/${cloth?.media_id}`}/>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
}