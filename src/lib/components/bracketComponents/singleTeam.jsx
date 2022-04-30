import React, { useState } from "react";

import {
  getTeamNameYPlacement,
  getTextX,
  getLineX,
  offsets,
} from "../../utils/bracketUtils";
import CLinkSvg from "./cLinkSvg";
import {
  defaultTextColor,
  defaultPopColor,
  defaultBackgroundColor,
} from "../../utils/formats";

const SingleTeam = ({
  match,
  team,
  textAnchor,
  verticalPosition,
  width,
  height,
  bracketEnd,
  isSemiFinal,
  isFinal,
  showFullTeamNames,
  onSelectTeam,
  textColor,
  popColor,
  backgroundColor,
  lineColor,
  roundCount,
  index,
}) => {
  const [showTooltip, setShowTooltip] = useState({ show: false, label: "" });
  const Y = getTeamNameYPlacement(verticalPosition, height);
  const X = getTextX(textAnchor, width);

  const noConnector =
    roundCount > 2 &&
    ((index % 2 === 0 && verticalPosition % 2 === 0) ||
      (index % 2 === 1 && verticalPosition % 2 === 1)) &&
    bracketEnd !== "top";

  const lineStyle = {
    stroke: match.dummyMatch
      ? backgroundColor || defaultBackgroundColor
      : isFinal
      ? popColor || defaultPopColor
      : lineColor || defaultTextColor,
  };

  const toggleFullTeamName = () => {
    let tooltip = { ...showTooltip };
    tooltip.show = !tooltip.show;
    tooltip.label = match[team + "TeamName"];
    setShowTooltip(tooltip);
  };

  const renderUnderline = () => {
    const lineY = verticalPosition === 0 ? Y + 5 : Y - 18;
    return (
      <line
        x1={offsets.lines}
        x2={width - offsets.lines}
        y1={lineY}
        y2={lineY}
        style={lineStyle}
      />
    );
  };

  const renderJoinLine = () => {
    const X = getLineX(textAnchor, width);
    return textAnchor === "middle" ? (
      <g>
        <line
          x1={offsets.lines}
          x2={offsets.lines}
          y1={25}
          y2={height - 28}
          style={lineStyle}
        />
        <line
          x1={width - offsets.lines}
          x2={width - offsets.lines}
          y1={25}
          y2={height - 28}
          style={lineStyle}
        />
      </g>
    ) : (
      <g>
        <line
          x1={width - X}
          x2={width - X}
          y1={25}
          y2={height - 28}
          style={lineStyle}
        />
        {!isSemiFinal && !isFinal && (
          <line
            x1={width - X}
            x2={width - X}
            y1={
              bracketEnd === "top"
                ? 25
                : noConnector
                ? 0
                : verticalPosition === 0
                ? 0
                : height - 28
            }
            y2={
              bracketEnd === "bottom"
                ? 25
                : noConnector
                ? 0
                : verticalPosition === 0
                ? 25
                : height
            }
            style={lineStyle}
          />
        )}
      </g>
    );
  };

  const otherTeam = team === "home" ? "away" : "home";
  const isWinner = match.matchAccepted
    ? match[team + "TeamScore"] > match[otherTeam + "TeamScore"] ||
      (match[team + "TeamScore"] === match[otherTeam + "TeamScore"] &&
        match[team + "TeamPKs"] > match[otherTeam + "TeamPKs"])
    : false;

  const getLineText = () => {
    const teamName = match[team + "TeamName"];
    const teamAbbreviation =
      match[team + "TeamAbbreviation"] || teamName.slice(0, 6).toUpperCase();

    let teamText =
      (showTooltip.show && showTooltip.label === teamName) || showFullTeamNames
        ? teamName
        : teamAbbreviation;

    let goals = match.matchComplete
      ? `${match[team + "TeamScore"]}${
          match[team + "TeamScore"] === match[otherTeam + "TeamScore"]
            ? ` (${match[team + "TeamPKs"]})`
            : ""
        }`
      : "";

    if (textAnchor === "end")
      teamText = `${goals ? goals + " - " : ""}${teamText}`;
    else teamText = `${teamText}${goals ? " - " + goals : ""}`;
    return teamText;
  };

  const hasLogo = match[team + "TeamLogo"];

  return (
    <g>
      <CLinkSvg
        x={
          X +
          (hasLogo
            ? textAnchor === "start"
              ? 25
              : textAnchor === "end"
              ? -25
              : 0
            : 0)
        }
        y={Y}
        style={{
          textAnchor,
          fontSize: height / 6,
          fill: textColor || defaultTextColor,
        }}
        onMouseOver={() => {
          toggleFullTeamName();
        }}
        onMouseOut={() => {
          toggleFullTeamName();
        }}
        boldText={isWinner}
        clickHandler={onSelectTeam ? () => onSelectTeam(match, team) : null}
      >
        {match.dummyMatch ? "" : getLineText()}
      </CLinkSvg>
      {renderUnderline()}
      {renderJoinLine()}
      {hasLogo ? (
        <image
          href={match[team + "TeamLogo"]}
          x={
            textAnchor === "middle"
              ? offsets.text
              : X + (hasLogo ? (textAnchor === "start" ? 0 : -20) : 0)
          }
          y={Y - 17 + verticalPosition}
          width={20}
          height={20}
        />
      ) : null}
      {hasLogo && textAnchor === "middle" && (
        <image
          href={match[team + "TeamLogo"]}
          x={width - 28}
          y={Y - 17 + verticalPosition}
          width={20}
          height={20}
        />
      )}
    </g>
  );
};

export default SingleTeam;
