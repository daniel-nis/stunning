import { NextApiRequest, NextApiResponse } from "next";

declare module "next-connect" {
  import { RequestHandler } from "next-connect";

  interface NextConnectOptions<
    Req extends NextApiRequest = NextApiRequest,
    Res extends NextApiResponse = NextApiResponse
  > {
    onError?: (err: any, req: Req, res: Res) => void;
    onNoMatch?: (req: Req, res: Res) => void;
  }

  function nextConnect<
    Req extends NextApiRequest = NextApiRequest,
    Res extends NextApiResponse = NextApiResponse
  >(
    options?: NextConnectOptions<Req, Res>
  ): {
    use(
      ...handlers: Array<RequestHandler<Req, Res>>
    ): ReturnType<typeof nextConnect<Req, Res>>;
    get(
      ...handlers: Array<RequestHandler<Req, Res>>
    ): ReturnType<typeof nextConnect<Req, Res>>;
    post(
      ...handlers: Array<RequestHandler<Req, Res>>
    ): ReturnType<typeof nextConnect<Req, Res>>;
    put(
      ...handlers: Array<RequestHandler<Req, Res>>
    ): ReturnType<typeof nextConnect<Req, Res>>;
    delete(
      ...handlers: Array<RequestHandler<Req, Res>>
    ): ReturnType<typeof nextConnect<Req, Res>>;
  };

  export = nextConnect;
}
