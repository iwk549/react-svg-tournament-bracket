# react-svg-tournament-bracket

Customizable tournament brackets for React

## What's New in 1.3.0

- The matchHeight property now works as expected to expand the area each match takes up and the size of the text. Recommended values are between 75 - 1000
- You can now highlight elements of an individual match using the highlight property of the Match Object and the highlightColor prop.

## Installation

```
npm install react-svg-tournament-bracket
```

## Usage

Here's an example of basic usage with eight teams starting at the quarter final round:

```javascript
import React from "react";
import TournamentBracket from "react-svg-tournament-bracket";

const MyBracket = () => {
  matches = [
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
      homeTeamName: "Team E",
      awayTeamName: "Team F",
      round: 1,
      matchNumber: 3,
    },
    {
      homeTeamName: "Team G",
      awayTeamName: "Team H",
      round: 1,
      matchNumber: 4,
    },
    {
      homeTeamName: "Winner Match 1",
      awayTeamName: "Winner Match 2",
      round: 2,
      matchNumber: 5,
    },
    {
      homeTeamName: "Winner Match 3",
      awayTeamName: "Winner Match 4",
      round: 2,
      matchNumber: 6,
    },
    {
      homeTeamName: "Winner Match 5",
      awayTeamName: "Winner Match 6",
      round: 3,
      matchNumber: 7,
    },
  ];

  return <TournamentBracket matches={matches} />;
};
```

![Example1](/screenshots/react-svg-tournament-bracket-1.png)

The component can now handle uneven brackets using the dummyMatch property on the Match Object. The length of your matches array should stil be an exponentiation of 2 but set the dummyMatch property to true for matches where there are no teams. These matches will take up the space where the match would go, causing the bracket to display evenly.

More examples can be seen at [Ultimate Scoreboard](https://ultimatescoreboard.com/demosoccer?division=618eea7f01f2b6002420a282&option=brackets&teamID=all&matchtype=all)

## The Match Object

**The matches prop must be an array of objects, with the following required properties:**

- **homeTeamName**: string
- **awayTeamName**: string

  the name of the each team (required unless dummyMatch is set to true)

- **round**: integer

  round should start at 1 and increment by 1. Each subsequent round should have half the number of matches as the previous round to keep the bracket even. There should only be a single match in the final round.

- **matchNumber**: integer

  matchNumber should be unique within a round. It will be used to display the matches in order. matchNumber 1 will display directly above matchNumber 2 and it should be expected that the winners of those two matches will play each other in the next round.

**There are also several optional properties which are used:**

- **dateTime**: any

  this value is used in conjuction with the dateTimeFormatter prop to display text in between the two teams of a match. It is normal to put the date and time of the match here but this can be used for anything (stadium name, matchup record, etc)

- **homeTeamAbbreviation**: string
- **awayTeamAbbreviation**: string

  max 6 character abbreviation of the team name

- **matchComplete**: boolean

  if true the scores will be displayed next to each team name

- **matchAccepted**: boolean

  if true the winner of the match (calculated from homeTeamScore vs awayTeamScore with PKs as a tiebreaker) will display in bold

- **homeTeamScore**: integer
- **awayTeamScore**: integer

  the score of the each team. Used for bolding the winning team

- **homeTeamPKs**: integer
- **awayTeamPKs**: integer

  if the match was tied and a team won on PKs the winning team will be bolded

- **homeTeamLogo**: string (url location of image)
- **awayTeamLogo**: string (url location of image)

  if provided will display a square image next to the team name on the bracket. Must be the full path to the image.

  **dummyMatch**: boolean

  if true then the match will not be displayed but the space will be filled with the background color. Use this property to create uneven brackets by creating placeholder matches.

  **highlight**: array || string

  acceptable values are "home" "away" and "match". Use this property if you wish to highlight an element in an individual match. The checking used the include method so you can pass this as an array or string. Using "home" and/or "away" will highlight the corresponding team, while using "match" will highlight the link text in between the two teams. These values can be used in any combination. Use the highlightColor prop on the TournamentBracket to pick the colors of the highlighting.

  ## Props

| PropName                   | Description                                                                                                                                                                                                                                                                                                                                                                | Default Value                                              | Example Values                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| matches                    | Array of Match Objects                                                                                                                                                                                                                                                                                                                                                     | none, prop is required                                     | see basic usage example                           |
| emptyBracketComponent      | component or text string that will display when matches is falsy or length is 0. Pass an empty string to display nothing                                                                                                                                                                                                                                                   | "There are no matches to display"                          | ""                                                |
| onSelectMatch              | callback function called when clicking the match number or dateTime. Argument passed back is the match object                                                                                                                                                                                                                                                              | undefined                                                  | (match) => console.log(match)                     |
| onSelectTeam               | callback function called when clicking an individual team. Arguments passed back are the match and a string 'home' or 'away' to represent which team was clicked                                                                                                                                                                                                           | undefined                                                  | (match, team) => console.log(match, team)         |
| orientation                | display orientation of the bracket, either landscape or portrait                                                                                                                                                                                                                                                                                                           | "landscape"                                                | "portrait"                                        |
| flipTeams                  | boolean, if true the teams will display away team on top                                                                                                                                                                                                                                                                                                                   | false                                                      | true                                              |
| backgroundColor            | hex or html color for the bracket background                                                                                                                                                                                                                                                                                                                               | "#fff"                                                     | "#831fe0"                                         |
| textColor                  | hex or html color for text                                                                                                                                                                                                                                                                                                                                                 | "#000"                                                     | "#831fe0"                                         |
| popColor                   | hex or html color for "pop" elements of the bracket, such as the box around the final match                                                                                                                                                                                                                                                                                | "831fe0"                                                   | "red"                                             |
| lineColor                  | hex or html color for the connecting lines between matches                                                                                                                                                                                                                                                                                                                 | "#000"                                                     | "blue"                                            |
| dateTimeFormatter          | function called on the value of match.dateTime to display in between the teams for each match. If undefined no date or time will display                                                                                                                                                                                                                                   | undefined                                                  | (dateTime) => new Date(dateTime).toLocaleString() |
| displayMatchNumber         | boolean, will the match number display in between the match. If neither the match number nor the dateTime are displayed the the match is no longer selectable                                                                                                                                                                                                              | true                                                       | false                                             |
| showFullTeamNames          | boolean, the bracket will display the full team name if true, if false will display the value of homeTeamAbbreviation or awayTeamAbbreviation, or the first 6 letters of the full team name, capitalized. When hovered over the full team name will display                                                                                                                | true                                                       | false                                             |
| width                      | overall width of entire bracket                                                                                                                                                                                                                                                                                                                                            | depends on orientation, for landscape: 1280, portrait: 500 | 750                                               |
| height                     | overall height of entire bracket                                                                                                                                                                                                                                                                                                                                           | 720                                                        | 500                                               |
| matchHeight                | height of each individual match in the bracket. Text size will scale up or down with this height. Although you can set this to any value it is recommended for best display to pick a size between 75 - 1000                                                                                                                                                               | 100                                                        | 75                                                |
| matchKeyCreator            | function to pull a key from each match to satisfy React mapping requirements                                                                                                                                                                                                                                                                                               | (match) => String(match.round) + String(match.matchNumber) | (match) => match.\_id                             |
| disableStrictBracketSizing | boolean, strict bracket sizing is enabled by default. This means that the number of matches in each round should be an exponentiation of 2, and each round should have half the number of matches as the previous round. It is suggested that you use dummy matches to fill in the gaps to meet this criteria, but the check can be disabled by setting this prop to true. | false                                                      | true                                              |
| hidePKs                    | boolean, if true the home and away team PKs will not be shown on a complete match which is tied. Use this prop to keep your tiebreaker hidden while still enabling the winning team to display in bold                                                                                                                                                                     | undefined                                                  | true                                              |
| highlightColor             | object: {backgroundColor: string, color: string}, used in conjunction with the highlight prop on the Match Object, to highlight elements of an individual match                                                                                                                                                                                                            | {backgroundColor: "#831fe0", color: "fff"}                 | {backgroundColor: "red", color: "white"}          |

## More Complex Examples

**Displaying bracket with score showing**

Use the matchComplete and matchAccepted properties on each Match Object to display the scores on the brackets.

matchComplete = true will cause the score to display next to each team. If the score props is not included then 0 will display.

matchAccepted = true will cause the winning team (based on homeTeamScore vs awayTeamScore, with the PK tiebreaker) to display in bold. This prop can be used without the matchComplete prop to embolden the winning team while not displaying the score.

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
      homeTeamScore: 3,
      awayTeamScore: 2,
      matchComplete: true,
      matchAccepted: true,
      // this match will display the scores with Team A in bold
    },
    {
      homeTeamName: "Team C",
      awayTeamName: "Team D",
      round: 1,
      matchNumber: 2,
      homeTeamScore: 1,
      awayTeamScore: 1,
      homeTeamPKs: 1,
      awayTeamPKs: 3,
      matchComplete: true,
      // this match will display the scores (and the PK tiebreaker) but neither team will be in bold as matchAccepted is not included
    },
    {
      homeTeamName: "Team A",
      awayTeamName: "Team D",
      round: 2,
      matchNumber: 3,
      homeTeamScore: 1,
      awayTeamScore: 2,
      // this match will not display the score at all as matchComplete is not included
    },
  ];

  return (
    <TournamentBracket
      matches={matches}
      backgroundColor="#eeccff"
      popColor="blue"
    />
  );
};
```

![Example2](/screenshots/react-svg-tournament-bracket-2.png)

**Uneven bracket using dummyMatch property**

This is how to display an uneven bracket with a lead in round. The entire quarter final round (round 1) needs to be included, but all the placeholder matches have the dummyMatch property set to true. The matchNumber property is only used to sort matches within each round, so they can be duplicated in the next round. So here we are able to number the placeholder matches for correct sorting while also keeping more logical match numbering for real matches on the bracket display.

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
      round: 1,
      matchNumber: 2,
      dummyMatch: true,
    },
    {
      round: 1,
      matchNumber: 3,
      dummyMatch: true,
    },
    {
      round: 1,
      matchNumber: 4,
      dummyMatch: true,
    },
    {
      homeTeamName: "Winner Match 1",
      awayTeamName: "Team C",
      round: 2,
      matchNumber: 2,
    },
    {
      homeTeamName: "Team D",
      awayTeamName: "Team E",
      round: 2,
      matchNumber: 3,
    },
    {
      homeTeamName: "Winner Match 2",
      awayTeamName: "Winner Match 3",
      round: 3,
      matchNumber: 4,
    },
  ];

  return (
    <TournamentBracket
      matches={matches}
      backgroundColor="#eeccff"
      popColor="blue"
    />
  );
};
```

![Example3](/screenshots/react-svg-tournament-bracket-3.png)

**Using match highlighting**

Elements within an individual match can be highlighted. This could be used to indicate the winning team without using the score and accepted properties, or highlight an individual match.

```javascript
import React from "react";
import TournamentBracket from "react-svg-tournament-bracket";

const MyBracket = () => {
  const matches = [
    {
      homeTeamName: "Winner Match 1",
      awayTeamName: "Team C",
      round: 1,
      matchNumber: 1,
      highlight: ["home", "away"], // both teams will be highlighted
    },
    {
      homeTeamName: "Team D",
      awayTeamName: "Team E",
      round: 1,
      matchNumber: 2,
      highlight: "home", // only the home team will be highlighted
    },
    {
      homeTeamName: "Winner Match 2",
      awayTeamName: "Winner Match 3",
      round: 2,
      matchNumber: 3,
      highlight: "match away", // the match link and the away team will be highlighted
    },
  ];

  return (
    <TournamentBracket
      matches={matches}
      backgroundColor="#eeccff"
      popColor="blue"
      highlightColor={{ backgroundColor: "red", color: "white" }} // the highlighted elements will display as white text on a red background
    />
  );
};
```

![Example4](/screenshots/react-svg-tournament-bracket-4.png)

## Release Notes

**1.3.0**

- The matchHeight property now works as expected to expand the area each match takes up and the size of the text. Recommended values are between 75 - 1000
- You can now highlight elements of an individual match using the highlight property of the Match Object and the highlightColor prop.

**1.2.0**

- Dummy matches on lopsided landscape brackets will no longer take up space if the entire round on that side of the bracket is dummy matches. This will however cause the final to not display in the center of the bracket.
- hidePKs props allows you to use the home/awayTeamPKs prop on the Match Object as a tiebreaker to bold the winning team but keep it hidden on the bracket display.
- Added error checking to round lengths to ensure proper display. Can be disabled with disableStrictBracketSizing prop.
- Added error checking to teamName property on match object

**1.1.1**

- Package was not built before publishing, changes did not go into effect. Rebuilt package.

**1.1.0**

- Added dummyMatch property to Match Object allowing for uneven bracket display (see Complex Examples section).
- Removed unnecessary connecting lines between matches on larger brackets making for a cleaner look.

## License

[MIT](https://choosealicense.com/licenses/mit/)
