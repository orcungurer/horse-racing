export const getLapTitle = (lap: number) =>
  lap === 1
    ? "1st Lap"
    : lap === 2
    ? "2nd Lap"
    : lap === 3
    ? "3rd Lap"
    : `${lap}th Lap`;
