import React from "react";

import {
  getTextX,
  offsets,
  getTeamNameYPlacement,
} from "../../utils/bracketUtils";
import CLinkSvg from "./cLinkSvg";
import { defaultTextColor, defaultHighlight } from "../../utils/formats";

const MatchLink = ({
  match,
  textAnchor,
  width,
  height,
  onSelectMatch,
  dateTimeFormatter,
  displayMatchNumber,
  textColor,
  highlightColor,
}) => {
  const X = getTextX(textAnchor, width);

  const matchNumber = displayMatchNumber
    ? "#" + (match.metadata?.matchNumber || match.matchNumber) + ":"
    : "";

  const highlight = match.highlight?.includes("match");
  const Y = getTeamNameYPlacement(0, height);

  return (
    <>
      {highlight && (
        <rect
          width={width - offsets.text - offsets.lines}
          height={height / 4 + (height * 0.02 - 9.5)}
          rx={5}
          style={{
            fill:
              highlightColor?.backgroundColor ||
              defaultHighlight.backgroundColor,
          }}
          transform={`translate(${offsets.lines}, ${
            Y + offsets.lines + offsets.pixels
          })`}
        />
      )}
      <CLinkSvg
        x={X}
        y={height / 2 + offsets.lines}
        style={{
          textAnchor,
          fontSize: height / 7,
          fill: highlight
            ? highlightColor?.color || defaultHighlight.color
            : textColor || defaultTextColor,
        }}
        clickHandler={onSelectMatch}
        testID="match-link-text"
      >
        {match.dummyMatch ? (
          ""
        ) : (
          <>
            {matchNumber}{" "}
            {dateTimeFormatter ? dateTimeFormatter(match.dateTime) : null}
          </>
        )}
      </CLinkSvg>
    </>
  );
};

export default MatchLink;
