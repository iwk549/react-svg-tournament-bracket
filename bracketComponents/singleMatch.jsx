import React from "react";

import SingleTeam from "./singleTeam";
import MatchLink from "./matchLink";
import { defaultBackgroundColor } from "../utils/formats";

const SingleMatch = ({
  match,
  textAnchor,
  width,
  placement,
  bracketEnd,
  isSemiFinal,
  isFinal,
  matchHeight,
  spectate,
  onSelectMatch,
  showFullTeamNames,
  onSelectTeam,
  teamOrder,
  backgroundColor,
  textColor,
  popColor,
  lineColor,
  dateTimeFormatter,
}) => {
  const handleSelectMatch = () => {
    onSelectMatch(match);
  };

  const mappableTeamOrder = teamOrder || ["home", "away"];

  return (
    <g transform={`translate(${placement.X}, ${placement.Y})`}>
      <rect
        width={Math.abs(width)}
        height={Math.abs(matchHeight)}
        style={{
          fill: backgroundColor || defaultBackgroundColor,
        }}
      />
      {mappableTeamOrder.map((t, i) => {
        return (
          <React.Fragment key={t}>
            <SingleTeam
              match={match}
              team={t}
              verticalPosition={i}
              textAnchor={textAnchor}
              width={width}
              height={matchHeight}
              bracketEnd={bracketEnd}
              isSemiFinal={isSemiFinal}
              isFinal={isFinal}
              spectate={spectate}
              showFullTeamNames={showFullTeamNames}
              onSelectTeam={onSelectTeam}
              textColor={textColor}
              popColor={popColor}
              lineColor={lineColor}
            />
            {i === 0 && (
              <MatchLink
                match={match}
                textAnchor={textAnchor}
                width={width}
                height={matchHeight}
                onSelectMatch={onSelectMatch ? handleSelectMatch : null}
                dateTimeFormatter={dateTimeFormatter}
              />
            )}
          </React.Fragment>
        );
      })}
    </g>
  );
};

export default SingleMatch;