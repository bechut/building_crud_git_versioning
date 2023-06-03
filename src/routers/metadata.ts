export type TRouterMetadata = {
  page: string;
  path: string;
  layout: string;
  auth: boolean;
};

const metadata: TRouterMetadata[] = [
  {
    page: "index",
    path: "/",
    layout: "non-auth",
    auth: false,
  },
];

export default metadata;
