import searchPic from "../../Pictures/searchPic.png"
import {useForm} from "react-hook-form"
import {TextareaInput} from "../components/Forms";
import { Flex } from "@chakra-ui/layout";


const LandingPage = () => {
  const { control } = useForm();
  return (
    <div className="h-full justify-left items-center flex" style={{position: "relative", width: "94%"}}>
      <div>
        <div style={{position: "absolute", top: "0px", right: "0px", height: "100%", width: "49%", border: "solid black 2px"}}>
          <div style={{position: "relative", left: "10%"}}>
            <Flex as="button" borderRadius="lg" style={{float: "left", border: "black solid 2px", position: "relative", top: "15px", right: "50px", padding: "5px"}}>
              Make Post
            </Flex>
            <div style={{float: "left", position: "relative", top: "10px", left: "", width: "50%"}}>
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
            <button><img src={searchPic} style={{float: "right", position: "relative", top: "10px", left: "5px", height: "100%", width: "50px", backgroundColor: "brand.primaryLightBackground"}}/></button>
          </div>
          <div style={{position: "relative", float: "left", top: "10%"}}>
            User Feed
          </div>
        </div>
        <div style={{position: "absolute", top: "0px", height: "100%", width: "49%", border: "solid black 2px"}}>
          Special Events
          <div style={{position: "relative", border: "black 2px solid"}}>
            Test
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
