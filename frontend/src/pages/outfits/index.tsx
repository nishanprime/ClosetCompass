import { Card, CardBody, Grid, Text } from "@chakra-ui/react";

const mock_outfits = [
  {
    id: 1,
    name: "Outfit 1",
    description: "Outfit 1 description",
    items: [
      {
        id: 1,
        cloth_id: 1,
        type: "top",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        cloth_id: 2,
        type: "bottom",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        cloth_id: 3,
        type: "shoes",
        img: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: 2,
    name: "Outfit 2",
    description: "Outfit 2 description",
    items: [
      {
        id: 4,
        cloth_id: 4,
        type: "top",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 5,
        cloth_id: 5,
        type: "bottom",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 6,
        cloth_id: 6,
        type: "shoes",
        img: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: 3,
    name: "Outfit 3",
    description: "Outfit 3 description",
    items: [
      {
        id: 7,
        cloth_id: 7,
        type: "top",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 8,
        cloth_id: 8,
        type: "bottom",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 9,
        cloth_id: 9,
        type: "shoes",
        img: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: 3,
    name: "Outfit 3",
    description: "Outfit 3 description",
    items: [
      {
        id: 7,
        cloth_id: 7,
        type: "top",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 8,
        cloth_id: 8,
        type: "bottom",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 9,
        cloth_id: 9,
        type: "shoes",
        img: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: 3,
    name: "Outfit 3",
    description: "Outfit 3 description",
    items: [
      {
        id: 7,
        cloth_id: 7,
        type: "top",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 8,
        cloth_id: 8,
        type: "bottom",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 9,
        cloth_id: 9,
        type: "shoes",
        img: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: 3,
    name: "Outfit 3",
    description: "Outfit 3 description",
    items: [
      {
        id: 7,
        cloth_id: 7,
        type: "top",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 8,
        cloth_id: 8,
        type: "bottom",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 9,
        cloth_id: 9,
        type: "shoes",
        img: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: 3,
    name: "Outfit 3",
    description: "Outfit 3 description",
    items: [
      {
        id: 7,
        cloth_id: 7,
        type: "top",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 8,
        cloth_id: 8,
        type: "bottom",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 9,
        cloth_id: 9,
        type: "shoes",
        img: "https://via.placeholder.com/150",
      },
    ],
  },
];

const Outfits = () => {
  return (
    <div>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {mock_outfits?.map((outfit, index) => {
            return (
              <Card bgColor={"brand.primary"} className="w-full">
                <div className="flex">
                  {outfit?.items?.map((item, index) => {
                    return (
                      <div>
                        <img
                          src={item.img}
                          alt={item.type}
                          key={index}
                        />
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default Outfits;
