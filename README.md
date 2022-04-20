# react-svg-tournament-bracket

Customizable balanced tournament brackets for React

## Installation

```
npm install react-svg-tournament-bracket
```

## Usage

## Props

## The Match Object

The only required props is the matches array. This must be an array of objects, with the following required fields:

- homeTeamName: string
- awayTeamName: string
- round: integer
- matchNumber: integer

round should start at 1 and increment by 1. Each subsequent round should have half the number of matches as the previous round to keep the bracket even. There should only be a single match in the final round.

matchNumber should be unique within a round. It will be used to display the matches in order. matchNumber 1 will display directly above matchNumber 2 and it should be expected that the winners of those two matches will play each other in the next round.

| PropName | Description            | Default Value          | Example Values |
| -------- | ---------------------- | ---------------------- | -------------- |
| matches  | Array of Match Objects | none, prop is required |

[ {homeTeamName: "Team A", awayTeamName: "Team B", round: 1, matchNumber: 1}]

## License

[MIT](https://choosealicense.com/licenses/mit/)

```

```
