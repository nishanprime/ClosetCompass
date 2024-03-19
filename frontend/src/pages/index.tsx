import searchPic from "../../Pictures/searchPic.png"
import {useForm} from "react-hook-form"
import {TextareaInput} from "../components/Forms";
import { Flex } from "@chakra-ui/layout";
import { ISpecialEvent } from "../interfaces/index";
import { Table, TableContainer, Tbody, Thead, Tr, Th, Td } from "@chakra-ui/react";
import PostModal from "@/components/Layout/PostModal";


const LandingPage = () => {
  const { control } = useForm();
  const firstEvent: ISpecialEvent[] = [{
    description: "First Event",
    outfit_id: 1,
    priority: 2,
    when_is_it: new Date("2024-6-19"),
    id: 0,
    created_at: new Date()
  },
  {
    description: "Second Event",
    outfit_id: 3,
    priority: 4,
    when_is_it: new Date("2024-7-20"),
    id: 1,
    created_at: new Date()
  }]
  return (
    <div className="h-full justify-left items-center flex" style={{position: "relative", width: "94%"}}>
      <div>
        <div style={{position: "absolute", top: "0px", right: "0px", height: "700px", width: "49%", border: "solid black 2px"}}>
          <div style={{position: "relative", left: "10%"}}>
            <Flex borderRadius="lg" style={{float: "left", border: "black solid 2px", position: "relative", top: "15px", right: "50px", padding: "5px"}}>
              <PostModal/>
            </Flex>
            <div style={{float: "left", position: "relative", top: "10px", width: "60%"}}>
              <TextareaInput
              name="Searchbar"
              control={control}
              required={false}
              label=""
              placeholder="Search here"
              rules={"none"}
              disabled = {false}
              readMode = {false}
              helpText=""
              />
            </div>
            <button><img src={searchPic} style={{float: "left", position: "relative", top: "10px", left: "5px", height: "100%", width: "50px", backgroundColor: "brand.primaryLightBackground"}}/></button>
          </div>
          <div style={{position: "relative", float: "left", top: "10%"}}>
            User Feed
          </div>
        </div>
        <TableContainer>
          <Table style={{tableLayout: "fixed", position: "relative", top: "0px", height: "700px", width: "49%", border: "solid black 2px"}}>
            <Thead style={{height: "10%"}}>
              <Tr>
                <Th>Special Events</Th>
              </Tr>
            </Thead>
            <Tbody style={{borderCollapse: "separate", borderSpacing: "0 1em"}}>
              {firstEvent.map((currEvent) => (
                <Tr key={currEvent.id} style={{position: "relative", border: "5px solid black", width: "10px", height: "10px"}}>
                  <Td>
                    {currEvent.description}
                  </Td>
                  <Td >
                    {currEvent.when_is_it.toDateString()}
                  </Td>
                  <Td>
                    {currEvent.created_at.toDateString()}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LandingPage;
