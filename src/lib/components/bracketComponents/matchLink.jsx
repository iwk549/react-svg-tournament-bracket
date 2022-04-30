import React from "react";

import { getTextX } from "../../utils/bracketUtils";
import CLinkSvg from "./cLinkSvg";
import { defaultTextColor } from "../../utils/formats";

const MatchLink = ({
  match,
  textAnchor,
  width,
  height,
  onSelectMatch,
  dateTimeFormatter,
  displayMatchNumber,
  textColor,
}) => {
  const X = getTextX(textAnchor, width);

  const matchNumber = displayMatchNumber
    ? "#" + (match.metadata?.matchNumber || match.matchNumber) + ":"
    : "";

  return (
    <CLinkSvg
      x={X}
      y={height / 2 + 5}
      style={{
        textAnchor,
        fontSize: height / 7,
        fill: textColor || defaultTextColor,
      }}
      clickHandler={onSelectMatch}
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
  );
};

export default MatchLink;
