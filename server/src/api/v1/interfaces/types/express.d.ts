import IUser from '../feature/user/user.interface';

declare global {
  namespace Express {
    interface User {
      data: IUser;
      newAccessToken?: string;
    }

    interface Request {
      fileUrl?: string;
      fileType?: string;
    }
  }
}
