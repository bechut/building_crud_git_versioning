import { reduxConfig, store } from "./index";

export interface Response {
  pager: object;
  message: string;
  status: number;
  data: any;
};

export class ReduxDispatchHelper<T> {
  private actionName = "";
  private payload: T;
  private successHandler: any = null;
  private errorHandler: any = null;

  constructor(
    actionName: string,
    payload: T,
    successHandler: any,
    errorHandler: any
  ) {
    this.payload = payload;
    this.actionName = actionName;
    this.successHandler = successHandler;
    this.errorHandler = errorHandler;
  }

  do() {
    store
      .dispatch(reduxConfig[this.actionName].action.dispatch(this.payload))
      .unwrap()
      .then((payload: Response) => {
        this.successHandler(payload);
        // payload = { pager: object, message: string, status: number, data: any[] | {} }
      })
      .catch((e: Response) => {
        const errors = JSON.parse(
          e?.message ||
            "data: { message: 'Something went wrong. Please try again' }"
        )?.data;
        // errors = { pager: object, message: string, status: number, data: any[] | {} }
        this.errorHandler(errors);
      });
  }
}