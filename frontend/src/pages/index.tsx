import searchPic from "../../Pictures/searchPic.png"

const LandingPage = () => {
  return (
    <div className="h-full justify-left items-center flex" style={{position: "relative", width: "94%"}}>
      <div>
        <div style={{position: "absolute", top: "0px", right: "0px", height: "100%", width: "49%", border: "solid black 2px"}}>
          <div style={{position: "relative", left: "10%"}}>
            <button style={{border: "black solid 2px", position: "relative", top: "-15px", right: "5px", height: "49px"}}>Make Post</button>
            <textarea wrap="off" placeholder="Search" style={{position: "relative", top: "3px", height: "48px", width: "50%", resize: "none"}}></textarea>
            <button><img src={searchPic} style={{position: "relative", top: "3px", left: "5px", height: "100%", width: "50px", backgroundColor: "lightgray"}}/></button>
          </div>
          User Feed
        </div>
        <div style={{position: "absolute", top: "0px", height: "100%", width: "49%", border: "solid black 2px"}}>
          Special Events
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
