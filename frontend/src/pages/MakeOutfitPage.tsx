import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardHeader,
    CardBody,
    Center,
    Flex,
    IconButton,
    Select,
    Stack,
    Text
} from '@chakra-ui/react';
import {AddIcon, ArrowBackIcon, ArrowForwardIcon, DeleteIcon} from '@chakra-ui/icons';
import axios from "axios";


interface ICloth {
    id: number;
}

interface ITag {
    id: number;
    tag_name: string;
    user_id: number;
    created_at: any;
    updated_at: any;
    deleted_at: any;
}

const API_URL = import.meta.env.VITE_API_URI;

const MakeOutfitPage = () => {
    const [items, setItems] = useState<ICloth[]>([]);
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

    function addItem(direction: 'above' | 'below') {
        if (items.length >= 5) return;

        if (direction === 'above') {
            setItems([{id: items.length}, ...items]);
        } else {
            setItems([...items, {id: items.length}]);
        }
    }

    function removeItem(id: number) {
        setItems(items.filter((item) => item.id !== id));
    }

    return (
        <>
            <Center>
                <Stack spacing={4}>
                    <IconButton
                        aria-label='Add item'
                        icon={<AddIcon/>}
                        isDisabled={items.length >= 5}
                        onClick={() => addItem('above')}
                    />
                    {items.map((item: ICloth) => {
                        return (
                            <Flex key={item.id} align={'center'} width="600">
                                <IconButton aria-label='Previous' icon={<ArrowBackIcon/>}/>
                                <Box width={8}/>
                                <Card>
                                    <CardHeader>
                                        <Flex>
                                            <Select size='sm' placeholder='Cloth Type'>
                                                {tags.map((tag) => {
                                                    return (<option value={tag.id}>{tag.tag_name}</option>);
                                                })}
                                            </Select>
                                            <Box width={4}/>
                                            <IconButton
                                                aria-label='Delete item'
                                                icon={<DeleteIcon boxSize={'4'}/>}
                                                width={8}
                                                height={8}
                                                onClick={() => removeItem(item.id)}
                                            />
                                        </Flex>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Card {item.id}</Text>
                                    </CardBody>
                                </Card>
                                <Box width={8}/>
                                <IconButton aria-label='Next' icon={<ArrowForwardIcon/>}/>
                            </Flex>
                        );
                    })}
                    <IconButton
                        aria-label='Add item'
                        icon={<AddIcon/>}
                        isDisabled={items.length >= 5}
                        onClick={() => addItem('below')}/>
                </Stack>
            </Center>
            <Button>Finish Outfit</Button>
        </>
    );
}

export default MakeOutfitPage;