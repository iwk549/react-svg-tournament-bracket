import React from "react";

import SingleMatch from "./singleMatch";
import {
  defaultBackgroundColor,
  defaultTextColor,
  defaultPopColor,
} from "../utils/formats";

const BracketFinal = ({
  match,
  bracketSize,
  placement,
  header,
  width,
  onSelectMatch,
  webpage,
  textColor,
  backgroundColor,
  popColor,
  showFullTeamNames,
}) => {
  const style = { stroke: popColor || defaultPopColor, strokeWidth: 2 };
  return (
    <g>
      <text
        x={width / 2 + placement.X}
        y={placement.Y - 5}
        textAnchor="middle"
        fontSize={bracketSize.matchHeight / 5}
        style={{
          stroke: textColor || defaultTextColor,
          fill: textColor || defaultTextColor,
        }}
      >
        {header}
      </text>
      <SingleMatch
        match={match}
        textAnchor={"middle"}
        width={width || bracketSize.width / 2}
        placement={placement}
        bracketEnd={"middle"}
        isSemiFinal={false}
        isFinal={true}
        matchHeight={bracketSize.matchHeight}
        onSelectMatch={onSelectMatch}
        webpage={webpage}
        showFullTeamNames={showFullTeamNames}
      />
      {/* top */}
      <line
        x1={placement.X}
        x2={placement.X + width}
        y1={placement.Y}
        y2={placement.Y}
        style={style}
      />
      {/* bottom */}
      <line
        x1={placement.X}
        x2={placement.X + width}
        y1={placement.Y + bracketSize.matchHeight}
        y2={placement.Y + bracketSize.matchHeight}
        style={style}
      />
      {/* left */}
      <line
        x1={placement.X}
        x2={placement.X}
        y1={placement.Y}
        y2={placement.Y + bracketSize.matchHeight}
        style={style}
      />
      {/* right */}
      <line
        x1={placement.X + width}
        x2={placement.X + width}
        y1={placement.Y}
        y2={placement.Y + bracketSize.matchHeight}
        style={style}
      />
    </g>
  );
};

export default BracketFinal;
