import { axiosCaller, BuildingCRUDInstance } from "./api";

export const apiNames = {
  buildings: {
    create: "create_building",
    list: "list_building",
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
      {
        method: axiosCaller("get"),
        uri: "/",
        name: apiNames.buildings.list,
      },
    ],
  },
];

export default metadata;
