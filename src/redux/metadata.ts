import { axiosCaller, BuildingCRUDInstance } from "./api";

export const apiNames = {
  buildings: {
    create: "create_building",
    list: "list_building",
    detail: "detail_building",
    update: "update_building",
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
      {
        method: axiosCaller("get"),
        uri: "/:id",
        name: apiNames.buildings.detail,
      },
      {
        method: axiosCaller("patch"),
        uri: "/:id",
        name: apiNames.buildings.update,
      },
    ],
  },
];

export default metadata;
