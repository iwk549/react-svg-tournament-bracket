# react-svg-tournament-bracket

Customizable balanced tournament brackets for React

## Installation

```
npm install react-svg-tournament-bracket
```

## Usage

Here's an example of basic usage with four teams starting at the semi final round

```javascript
import React from "react";
import TournamentBracket from "react-svg-tournament-bracket";

const MyBracket = () => {
  const matches = [
    {
      homeTeamName: "Team A",
      awayTeamName: "Team B",
      round: 1,
      matchNumber: 1,
    },
    {
      homeTeamName: "Team C",
      awayTeamName: "Team D",
      round: 1,
      matchNumber: 2,
    },
    {
      homeTeamName: "Winner Match 1",
      awayTeamName: "Winner Match 2",
      round: 2,
      matchNumber: 3,
    },
  ];

  return <TournamentBracket matches={matches} />;
};
```

## The Match Object

The matches prop must be an array of objects, with the following required properties:

- **homeTeamName**: string

  the name of the home team

- **awayTeamName**: string

  the name of the away team

- **round**: integer

  round should start at 1 and increment by 1. Each subsequent round should have half the number of matches as the previous round to keep the bracket even. There should only be a single match in the final round.

- **matchNumber**: integer

  matchNumber should be unique within a round. It will be used to display the matches in order. matchNumber 1 will display directly above matchNumber 2 and it should be expected that the winners of those two matches will play each other in the next round.

There are also several optional properties which are used:

- **dateTime**: any

  this value is used in conjuction with the dateTimeFormatter prop to display text in between the two teams of a match. It is normal to put the date and time of the match here but this can be used for anything (stadium name, matchup record, etc)

- **homeTeamAbbreviation**: string
- **awayTeamAbbreviation**: string

  max 6 character abbreviation of the team name

- **matchComplete**: boolean

  if true the scores will be displayed next to each team name

- **matchAccepted**: boolean

  if true the winner of the match will display in bold

- **homeTeamScore**: integer
- **awayTeamScore**: integer

  the score of the each team. Used for bolding the winning team

- **homeTeamPKs**: integer
- **awayTeamPKs**: integer

  if the match was tied and a team won on PKs the winning team will be bolded

- **homeTeamLogo**: string (url location of image)
- **awayTeamLogo**: string (url location of image)

  if provided will display a square image next to the team name on the bracket

  ## Props

| PropName              | Description                                                                                                                                                                                                                                                 | Default Value                                              | Example Values                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| matches               | Array of Match Objects                                                                                                                                                                                                                                      | none, prop is required                                     | [ {homeTeamName: "Team A", awayTeamName: "Team B", round: 1, matchNumber: 1}] |
| emptyBracketComponent | component or text string that will display when matches is falsy or length is 0. Pass an empty string to display nothing                                                                                                                                    | "There are no matches to display"                          | ""                                                                            |
| onSelectMatch         | callback function called when clicking the match number or dateTime. Argument passed back is the match object                                                                                                                                               | undefined                                                  | (match) => console.log(match)                                                 |
| onSelectTeam          | callback function called when clicking an individual team. Arguments passed back are the match and a string 'home' or 'away' to represent which team was clicked                                                                                            | undefined                                                  | (match, team) => console.log(match, team)                                     |
| orientation           | display orientation of the bracket, either landscape or portrait                                                                                                                                                                                            | "landscape"                                                | "portrait"                                                                    |
| flipTeams             | boolean, if true the teams will display away team on top                                                                                                                                                                                                    | false                                                      | true                                                                          |
| backgroundColor       | hex or html color for the bracket background                                                                                                                                                                                                                | "#fff"                                                     | "#831fe0"                                                                     |
| textColor             | hex or html color for text                                                                                                                                                                                                                                  | "#000"                                                     | "#831fe0"                                                                     |
| popColor              | hex or html color for "pop" elements of the bracket, such as the box around the final match                                                                                                                                                                 | "831fe0"                                                   | "red"                                                                         |
| lineColor             | hex or html color for the connecting lines between matches                                                                                                                                                                                                  | "#000"                                                     | "blue"                                                                        |
| dateTimeFormatter     | function called on the value of match.dateTime to display in between the teams for each match. If undefined no date or time will display                                                                                                                    | undefined                                                  | (dateTime) => new Date(dateTime).toLocaleString()                             |
| displayMatchNumber    | boolean, will the match number display in between the match. If neither the match number nor the dateTime are displayed the the match is no longer selectable                                                                                               | true                                                       | false                                                                         |
| showFullTeamNames     | boolean, the bracket will display the full team name if true, if false will display the value of homeTeamAbbreviation or awayTeamAbbreviation, or the first 6 letters of the full team name, capitalized. When hovered over the full team name will display | true                                                       | false                                                                         |
| width                 | overall width of entire bracket                                                                                                                                                                                                                             | depends on orientation, for landscape: 1280, portrait: 500 | 750                                                                           |
| height                | overall height of entire bracket                                                                                                                                                                                                                            | 720                                                        | 500                                                                           |
| matchHeight           | height of each individual match in the bracket. Text size will scale up or down with this height                                                                                                                                                            | 100                                                        | 75                                                                            |
| matchKeyCreator       | function to pull a key from each match to satisfy React mapping requirements                                                                                                                                                                                | (match) => String(match.round) + String(match.matchNumber) | (match) => match.\_id                                                         |

## License

[MIT](https://choosealicense.com/licenses/mit/)
