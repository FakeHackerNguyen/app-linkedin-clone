import {NextFunction, Request, Response} from 'express';
import IUser from '../interfaces/feature/user/user.interface';

export function randomDigit(digit: number): string {
  return String(
    Math.floor(
      Math.pow(10, digit - 1) + Math.random() * 9 * Math.pow(10, digit - 1),
    ),
  );
}

export function parseData(req: Request, res: Response, next: NextFunction) {
  const {experiences, educations} = req.body;
  if (experiences) req.body.experiences = JSON.parse(experiences);
  if (educations) req.body.educations = JSON.parse(educations);

  next();
}

export function formatUser(user: IUser) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    location: user.location,
    email: user.email,
    avatar: user.avatar,
    cover: user.cover,
    about: user.about,
    headline: user.headline,
    experiences: user.experiences,
    educations: user.educations,
    isVerified: user.isVerified,
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
