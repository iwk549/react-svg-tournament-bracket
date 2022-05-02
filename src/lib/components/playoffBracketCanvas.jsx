import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";

import { separateAndSplit, isExponentOfTwo } from "../utils/bracketUtils";
import SingleMatch from "./bracketComponents/singleMatch";
import MatchConnector from "./bracketComponents/matchConnector";
import { defaultBackgroundColor } from "../utils/formats";

const PlayoffBracketCanvas = ({
  matches,
  onSelectMatch,
  onSelectTeam,
  orientation = "landscape",
  flipTeams = false,
  backgroundColor,
  textColor,
  popColor,
  lineColor,
  highlightColor,
  dateTimeFormatter,
  displayMatchNumber = true,
  width,
  height,
  matchHeight,
  matchKeyCreator = (m) => String(m.round) + String(m.matchNumber),
  selectedBracket = "main",
  emptyBracketComponent,
  showFullTeamNames = true,
  disableStrictBracketSizing,
  hidePKs,
}) => {
  const [bracketSize, setBracketSize] = useState({
    width: 1280,
    height: 720,
    matchHeight: 100,
  });

  useEffect(() => {
    setBracketSize({
      width: width || (orientation === "portrait" ? 500 : 1280),
      height: height || 720,
      matchHeight: matchHeight || (orientation === "portrait" ? 75 : 100),
    });
  }, [orientation, width, height, matchHeight]);

  if (!matches || matches.length === 0)
    return emptyBracketComponent === "" || emptyBracketComponent ? (
      <>{emptyBracketComponent}</>
    ) : (
      "There are no matches to display"
    );

  const allRounds = {
    main: [
      ...new Set(
        matches
          .filter((m) => m.round > 0 && m.round <= 10)
          .map((m) => m.round)
          .sort((a, b) => a - b)
      ),
    ],
    // secondary: [
    //   ...new Set(
    //     matches
    //       .filter(
    //         (m) =>
    //           m.round > 10 &&
    //           m.round !== 99 &&
    //           m.round !== 100 &&
    //           m.round !== 999
    //       )
    //       .map((m) => m.round)
    //       .sort((a, b) => a - b)
    //   ),
    // ],
    // prelim: [
    //   ...new Set(
    //     matches
    //       .filter((m) => m.round === 0)
    //       .map((m) => m.round)
    //       .sort((a, b) => a - b)
    //   ),
    // ],
    // secondFinal: matches.find((m) => m.round === 99),
    // thirdFinal: matches.find((m) => m.round === 100),
    // losersFinal: matches.find((m) => m.round === 999),
  };

  const getRounds = () => {
    const final = Math.max(...allRounds[selectedBracket]);
    return {
      final,
      semi: final - 1,
    };
  };

  const renderBracket = () => {
    const bracket = separateAndSplit(
      allRounds,
      selectedBracket,
      matches,
      orientation === "landscape",
      disableStrictBracketSizing
    );

    let remainingBracketSize = { ...bracketSize };
    const heightOffset =
      selectedBracket === "main"
        ? (allRounds.secondFinal ? bracketSize.matchHeight * 1.6 : 0) +
          (allRounds.thirdFinal ? bracketSize.matchHeight * 1.6 : 0)
        : selectedBracket === "secondary"
        ? bracketSize.matchHeight * 1.6
        : 0;

    remainingBracketSize.height = remainingBracketSize.height - heightOffset;

    return (
      <svg
        height={bracketSize.height}
        width={bracketSize.width}
        id="svg-bracket"
        style={{
          backgroundColor: backgroundColor || defaultBackgroundColor,
          borderRadius: 5,
        }}
      >
        {/* <BracketFinals
          allRounds={allRounds}
          bracketSize={bracketSize}
          selectedBracket={selectedBracket}
          onSelectMatch={onSelectMatch}
          showFullTeamNames={true}
        /> */}
        {bracket.map((roundMatches, i) => {
          let X = (i * remainingBracketSize.width) / bracket.length;

          return roundMatches.map((m, ii) => {
            const blockStart =
              (ii * remainingBracketSize.height) / roundMatches.length +
              heightOffset;
            const blockEnd =
              ((ii + 1) * remainingBracketSize.height) / roundMatches.length +
              heightOffset;
            let Y = {
              start: blockStart,
              end: blockEnd,
            };

            const bracketEnd =
              ii === 0
                ? "top"
                : ii === roundMatches.length - 1
                ? "bottom"
                : "middle";
            const isFinal = m.round === getRounds().final;
            const isSemiFinal =
              m.round === getRounds().semi && orientation === "landscape";
            const textAnchor =
              orientation === "portrait"
                ? "start"
                : isFinal
                ? "middle"
                : i < bracket.length / 2
                ? "start"
                : "end";
            Y =
              isFinal && orientation === "landscape"
                ? {
                    start: remainingBracketSize.height / 2,
                    end:
                      remainingBracketSize.height / 2 -
                      bracketSize.height / 2 +
                      100,
                  }
                : Y;
            const yMatchStart =
              (Y.end - Y.start) / 2 - bracketSize.matchHeight / 2 + Y.start;
            const matchWidth = remainingBracketSize.width / bracket.length;

            return (
              <g key={matchKeyCreator(m)}>
                <SingleMatch
                  match={m}
                  textAnchor={textAnchor}
                  width={matchWidth}
                  placement={{ X, Y: yMatchStart }}
                  bracketEnd={bracketEnd}
                  isSemiFinal={isSemiFinal}
                  isFinal={isFinal}
                  matchHeight={bracketSize.matchHeight}
                  onSelectMatch={onSelectMatch}
                  onSelectTeam={onSelectTeam}
                  showFullTeamNames={showFullTeamNames}
                  flipTeams={flipTeams}
                  textColor={textColor}
                  backgroundColor={backgroundColor}
                  popColor={popColor}
                  dateTimeFormatter={dateTimeFormatter}
                  lineColor={lineColor}
                  displayMatchNumber={displayMatchNumber}
                  roundCount={roundMatches.length}
                  index={ii}
                  hidePKs={hidePKs}
                  highlightColor={highlightColor}
                />
                <MatchConnector
                  position={{
                    X,
                    Y: {
                      matchStart: yMatchStart,
                      matchEnd: yMatchStart + bracketSize.matchHeight,
                      blockStart,
                      blockEnd,
                    },
                  }}
                  matchHeight={matchHeight}
                  width={matchWidth}
                  textAnchor={textAnchor}
                  isSemiFinal={isSemiFinal}
                  isFinal={isFinal}
                  orientation={orientation}
                  bracketEnd={bracketEnd}
                  isOnlyMatch={roundMatches.length === 1}
                  backgroundColor={backgroundColor}
                  textColor={textColor}
                  popColor={popColor}
                  lineColor={lineColor}
                  isDummy={m.dummyMatch}
                  roundCount={roundMatches.length}
                  index={ii}
                />
              </g>
            );
          });
        })}
      </svg>
    );
  };

  return <div>{renderBracket()}</div>;
};

PlayoffBracketCanvas.propTypes = {
  matches: PropTypes.array,
};

export default PlayoffBracketCanvas;
