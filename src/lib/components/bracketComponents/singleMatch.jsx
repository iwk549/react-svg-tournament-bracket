import React from "react";

import SingleTeam from "./singleTeam";
import MatchLink from "./matchLink";
import {
  defaultBackgroundColor,
  defaultHighlightColor,
} from "../../utils/formats";

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
  flipTeams,
  backgroundColor,
  textColor,
  popColor,
  lineColor,
  highlightColor,
  dateTimeFormatter,
  displayMatchNumber,
  roundCount,
  index,
  hidePKs,
}) => {
  const handleSelectMatch = () => {
    onSelectMatch(match);
  };
  const teamOrder = flipTeams ? ["away", "home"] : ["home", "away"];

  return (
    <g transform={`translate(${placement.X}, ${placement.Y})`}>
      <rect
        width={Math.abs(width)}
        height={Math.abs(matchHeight)}
        style={{
          fill: backgroundColor || defaultBackgroundColor,
        }}
      />
      {teamOrder.map((t, i) => {
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
              backgroundColor={backgroundColor}
              lineColor={lineColor}
              roundCount={roundCount}
              index={index}
              hidePKs={hidePKs}
              highlightColor={highlightColor}
            />
            {i === 0 && (
              <MatchLink
                match={match}
                textAnchor={textAnchor}
                width={width}
                height={matchHeight}
                onSelectMatch={onSelectMatch ? handleSelectMatch : null}
                dateTimeFormatter={dateTimeFormatter}
                displayMatchNumber={displayMatchNumber}
                textColor={textColor}
                highlightColor={highlightColor}
              />
            )}
          </React.Fragment>
        );
      })}
    </g>
  );
};

export default SingleMatch;
