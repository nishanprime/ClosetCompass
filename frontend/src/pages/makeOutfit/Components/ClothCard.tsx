import ITag from "../../../interfaces/ITag.ts";
import ICloth from "../../../interfaces/ICloth.ts";
import {useState} from "react";
import axios from "axios";
import IClothAndTag from "../../../interfaces/IClothAndTag.ts";
import {Box, Card, CardBody, CardHeader, Flex, IconButton, Select, Text} from "@chakra-ui/react";
import {ArrowBackIcon, ArrowForwardIcon, DeleteIcon} from "@chakra-ui/icons";

const API_URL = import.meta.env.VITE_API_URI;

export const ClothCard = ({tags, onClothChanged, onDelete}: {
    tags: ITag[],
    onClothChanged: (cloth: ICloth) => void,
    onDelete: () => void
}) => {
    const [tagId, setTagId] = useState<number>(-1);
    const [cloth, setCloth] = useState<ICloth | undefined>(undefined);
    const [clothIds, setClothIds] = useState<number[]>([]);
    const [clothIndex, setClothIndex] = useState<number>(0);

    async function loadClothIds(tagId: number) {
        if (tagId == -1) {
            setClothIds([]);
            setClothIndex(0);
            return;
        }
        try {
            const response = await axios.get(`${API_URL}/clothAndTags/${tagId}`);
            const clothAndTags: IClothAndTag[] = response.data.data;
            setClothIds(
                clothAndTags.map((clothAndTag) => clothAndTag.cloth_id)
            );
            setClothIndex(Math.floor(response.data.data.length / 2));
        } catch (error) {
            console.log(error);
        }
    }

    async function loadCloth(clothId: number) {
        try {
            const response = await axios.get(`${API_URL}/clothe/${clothId}`);
            setCloth(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function cycleCloth(direction: 'previous' | 'forward') {
        let newIndex;
        if (direction === 'previous') {
            if (clothIndex > 0) {
                newIndex = clothIndex - 1;
            } else {
                newIndex = clothIds.length - 1;
            }
        } else {
            if (clothIndex < clothIds.length - 1) {
                newIndex = clothIndex + 1;
            } else {
                newIndex = 0;
            }
        }
        setClothIndex(newIndex);
        await loadCloth(clothIds[newIndex]);
    }

    return (
        <>
            <Flex align={'center'} width="600">
                <IconButton aria-label='Previous' icon={<ArrowBackIcon/>} onClick={() => cycleCloth('previous')}/>
                <Box width={8}/>
                <Card>
                    <CardHeader>
                        <Flex>
                            <Select size='sm' onChange={async (e) => {
                                await loadClothIds(parseInt(e.target.value));
                                setTagId(parseInt(e.target.value));
                            }}>
                                <option key={-1} value={-1}>Cloth Type</option>
                                {tags.map((tag) => {
                                    return (<option key={tag.id} value={tag.id}>{tag.tag_name}</option>);
                                })}
                            </Select>
                            <Box width={4}/>
                            <IconButton
                                aria-label='Delete item'
                                icon={<DeleteIcon boxSize={'4'}/>}
                                width={8}
                                height={8}
                                onClick={onDelete}
                            />
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Text>{clothIds.length != 0 ? cloth?.description : ''}</Text>
                    </CardBody>
                </Card>
                <Box width={8}/>
                <IconButton aria-label='Next' icon={<ArrowForwardIcon/>} onClick={() => cycleCloth('forward')}/>
            </Flex>
        </>
    );
}

export default ClothCard;