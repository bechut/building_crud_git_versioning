import {
  createBrowserRouter,
  Link,
  NavigateFunction,
  Params,
  RouterProvider,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import metadata, { TRouterMetadata } from "./metadata";
import { Result, Button } from "antd";
import { memo, FC } from "react";
import { RootState } from "../redux";
import { useSelector } from "react-redux";
// import cookie from "react-cookies";
// import { TOKEN_NAME } from "../redux/api";

export type LayoutProps = {
  reduxStates: RootState;
  params: Readonly<Params<string>>;
  navigate: NavigateFunction;
  accessToken: string;
  searchParams: URLSearchParams;
  setSearchParams: Function;
  children?: React.FC
};

const TemplateComponent: FC<any> = ({ Layout, Page }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const reduxStates = useSelector((state: RootState) => state);

  return (
    <Layout
      reduxStates={reduxStates}
      params={params}
      navigate={navigate}
      setSearchParams={setSearchParams}
      searchParams={searchParams}
    >
      <Page />
    </Layout>
  );
};

const components: any = metadata
  .map((m: TRouterMetadata) => {
    let result = null;
    try {
      const Page = require(`../pages/${m.page}`).default;
      const Layout = require(`../layout/${m.layout}`).default;
      result = {
        element: (
          <TemplateComponent Layout={Layout} Page={Page} isAuth={m.auth} />
        ),
        path: m.path,
      };
    } catch (e) {}
    return result;
  })
  .filter((x: any) => x);

const router = createBrowserRouter([
  ...components,
  {
    path: "*",
    auth: false,
    element: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    ),
  },
]);

const Routers = () => {
  return <RouterProvider router={router} />;
};
export default memo(Routers);
