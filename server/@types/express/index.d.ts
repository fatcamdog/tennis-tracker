// extend express Request type to be able to add user property
declare namespace Express {
  export interface Request {
    user: any;
  }
}
