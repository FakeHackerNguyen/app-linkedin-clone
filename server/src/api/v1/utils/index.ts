export function randomDigit(digit: number): string {
  return String(
    Math.floor(
      Math.pow(10, digit - 1) + Math.random() * 9 * Math.pow(10, digit - 1),
    ),
  );
}
