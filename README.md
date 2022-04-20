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

| PropName          | Description                                                                                                                              | Default Value                                              | Example Values                                                                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| matches           | Array of Match Objects                                                                                                                   | none, prop is required                                     | [ {homeTeamName: "Team A", awayTeamName: "Team B", round: 1, matchNumber: 1}]                        |
| onSelectMatch     | function called when clicking the text in between two teams                                                                              | undefined                                                  | (match) => console.log(match)                                                                        |
| onSelectTeam      | function called when clicking an individual team                                                                                         | undefined                                                  | (match, team) => returns the match and a string 'home' or 'away' to represent which team was clicked |
| orientation       | display orientation of the bracket, either landscape or portrait                                                                         | "landscape"                                                | "portrait"                                                                                           |
| flipTeams         | boolean, if true the teams will display away team on top                                                                                 | false                                                      | true                                                                                                 |
| backgroundColor   | hex or html color for the bracket background                                                                                             | "#fff"                                                     | "#831fe0"                                                                                            |
| textColor         | hex or html color for text                                                                                                               | "#000"                                                     | "#831fe0"                                                                                            |
| popColor          | hex or html color for "pop" elements of the bracket, such as the box around the final match                                              | "831fe0"                                                   | "red"                                                                                                |
| lineColor         | hex or html color for the connecting lines between matches                                                                               | "#000"                                                     | "blue"                                                                                               |
| dateTimeFormatter | function called on the value of match.dateTime to display in between the teams for each match. If undefined no date or time will display | undefined                                                  | (dateTime) => new Date(dateTime).toLocaleString()                                                    |
| width             | overall width of entire bracket                                                                                                          | depends on orientation, for landscape: 1280, portrait: 500 | 750                                                                                                  |
| height            | overall height of entire bracket                                                                                                         | 720                                                        | 500                                                                                                  |
| matchHeight       | height of each individual match in the bracket. Text size will scale up or down with this height                                         | 100                                                        | 75                                                                                                   |
| matchKeyCreator   | function to pull a key from each match to satisfy React mapping requirements                                                             | (match) => match.\_id                                      | (match) => String(match.round) + String(match.matchNumber)                                           |

## License

[MIT](https://choosealicense.com/licenses/mit/)

```

```
