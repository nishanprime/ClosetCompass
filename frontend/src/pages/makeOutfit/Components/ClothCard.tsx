import ITag from "../../../interfaces/ITag.ts";
import ICloth from "../../../interfaces/ICloth.ts";
import { useState } from "react";
import axios from "axios";
import IClothAndTag from "../../../interfaces/IClothAndTag.ts";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  IconButton,
  Image,
  Select,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";

const API_URL = import.meta.env.VITE_API_URI;

export const ClothCard = ({
  tags,
  onClothChanged,
  onDelete,
}: {
  tags: ITag[];
  onClothChanged: (clothId: number) => void;
  onDelete: () => void;
}) => {
  const [isHovering, setHovering] = useState<boolean>(false);

  const [cloth, setCloth] = useState<ICloth | undefined>(undefined);
  const [clothIds, setClothIds] = useState<number[]>([]);
  const [clothIndex, setClothIndex] = useState<number>(0);
  const [tagId, setTagId] = useState<number>(-1);

  async function loadClothIds(tagId: number) {
    if (tagId == -1) {
      setCloth(undefined);
      setClothIds([]);
      setClothIndex(0);
      return;
    }
    try {
      console.log(`${API_URL}/clothAndTags/${tagId}`)
      const response = await axios.get(`${API_URL}/clothAndTags/${tagId}`);
      console.log("here is response", response.data);
      const clothAndTags: IClothAndTag[] = response.data.data;

      const clothIds = clothAndTags.map((clothAndTag) => clothAndTag.cloth_id);
      const middleIndex = Math.floor(response.data.data.length / 2);

      setClothIds(clothIds);
      setClothIndex(middleIndex);
      onClothChanged(clothIds[middleIndex]);
      await loadCloth(clothIds[middleIndex]);
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

  async function cycleCloth(direction: "previous" | "forward") {
    let newIndex;
    if (direction === "previous") {
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
    onClothChanged(clothIds[newIndex]);
    await loadCloth(clothIds[newIndex]);
  }
  console.log("All cloth ids", clothIds);
  return (
    <>
      <Flex
        align={"center"}
        width="600"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Previous Button */}
        <IconButton
          aria-label="Previous"
          icon={<ArrowBackIcon />}
          visibility={isHovering && tagId >= 0 ? "visible" : "hidden"}
          onClick={() => cycleCloth("previous")}
        />

        <Box width={4} />

        <Card>
          <CardHeader>
            <Flex>
              {/* Tag Dropdown */}
              <Select
                size="sm"
                onChange={async (e) => {
                  setTagId(parseInt(e.target.value));
                  await loadClothIds(parseInt(e.target.value));
                }}
              >
                <option key={-1} value={-1}>
                  Cloth Type
                </option>
                {tags.map((tag) => {
                  return (
                    <option key={tag.id} value={tag.id}>
                      {tag.tag_name}
                    </option>
                  );
                })}
              </Select>

              <Box width={4} />

              {/* Delete Button */}
              <IconButton
                aria-label="Delete item"
                icon={<DeleteIcon boxSize={"4"} />}
                width={8}
                height={8}
                onClick={onDelete}
              />
            </Flex>
          </CardHeader>
          <CardBody>
            {/* Cloth Image */}
            <Box visibility={cloth ? "visible" : "hidden"}>
              <Center w={200} h={200}>
                {typeof cloth === "undefined" ? (
                  <div></div>
                ) : (
                  <Image
                    boxSize={"200px"}
                    objectFit={"contain"}
                    src={`${API_URL}/files/${cloth?.media_id}`}
                  />
                )}
              </Center>
            </Box>
          </CardBody>
        </Card>

        <Box width={4} />

        {/* Next Button */}
        <IconButton
          aria-label="Next"
          icon={<ArrowForwardIcon />}
          visibility={isHovering && tagId >= 0 ? "visible" : "hidden"}
          onClick={() => cycleCloth("forward")}
        />
      </Flex>
    </>
  );
};

export default ClothCard;
