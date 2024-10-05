import {NextFunction, Request, Response} from 'express';

export function randomDigit(digit: number): string {
  return String(
    Math.floor(
      Math.pow(10, digit - 1) + Math.random() * 9 * Math.pow(10, digit - 1),
    ),
  );
}

export function parseData(req: Request, res: Response, next: NextFunction) {
  const {experiences} = req.body;
  if (experiences) req.body.experiences = JSON.parse(experiences);

  next();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
