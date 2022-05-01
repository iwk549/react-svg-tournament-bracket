export function isExponentOfTwo(n) {
  return Math.log2(n) % 1 === 0;
}

export const offsets = { text: 10, lines: 5 };

export const getTextX = (textAnchor, width) => {
  return textAnchor === "start"
    ? offsets.text
    : textAnchor === "end"
    ? width - offsets.text
    : width / 2;
};
export const getLineX = (textAnchor, width) => {
  return textAnchor === "start"
    ? offsets.lines
    : textAnchor === "end"
    ? width - offsets.lines
    : width / 2;
};

export const separateAndSplit = (allRounds, bracket, matches, split) => {
  let leftMatches = [];
  let rightMatches = [];
  let allMatches = [];
  const roundsToShow = allRounds[bracket];
  roundsToShow.forEach((r) => {
    const roundMatches = [
      ...matches
        .filter((m) => m.round === r)
        .sort((a, b) => a.matchNumber - b.matchNumber),
    ];
    allMatches.push(roundMatches);
    const splitMatches = [...roundMatches];
    leftMatches.push(splitMatches.splice(0, roundMatches.length / 2));
    rightMatches.push(splitMatches);
  });
  leftMatches = leftMatches.slice(0, leftMatches.length - 1);
  if (split) return [...leftMatches, ...rightMatches.reverse()];
  else return allMatches;
};

export const getTeamNameYPlacement = (verticalPosition, height) => {
  // verticalPosition (0 or 1, index of home/away team)
  return verticalPosition === 0 ? 20 : height - 10;
};

export const matchHeight = 100;

export const getFinalRound = (bracket) => {
  return Math.max(...bracket.map((m) => m.round));
};
