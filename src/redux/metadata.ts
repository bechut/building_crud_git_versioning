import { axiosCaller, BuildingCRUDInstance } from "./api";

export const apiNames = {
  buildings: {
    create: "create_building",
  },
};

const metadata = [
  {
    root: "/buildings",
    instance: BuildingCRUDInstance,
    child: [
      {
        method: axiosCaller("post"),
        uri: "/",
        name: apiNames.buildings.create,
      },
    ],
  },
];

export default metadata;
