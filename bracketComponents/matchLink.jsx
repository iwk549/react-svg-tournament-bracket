import React from "react";

import { getTextX } from "../utils/bracketUtils";
import CLinkSvg from "./cLinkSvg";

const MatchLink = ({
  match,
  textAnchor,
  width,
  height,
  onSelectMatch,
  dateTimeFormatter,
}) => {
  const X = getTextX(textAnchor, width);

  return (
    <CLinkSvg
      x={X}
      y={height / 2 + 5}
      style={{ textAnchor, fontSize: height / 7 }}
      clickHandler={onSelectMatch}
    >
      #{match.metadata?.matchNumber || match.matchNumber}:{" "}
      {dateTimeFormatter ? dateTimeFormatter(match.dateTime) : null}
    </CLinkSvg>
  );
};

export default MatchLink;
