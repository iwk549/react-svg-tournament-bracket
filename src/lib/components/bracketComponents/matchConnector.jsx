import React from "react";
import { getLineX } from "../../utils/bracketUtils";
import { defaultTextColor, defaultBackgroundColor } from "../../utils/formats";

const MatchConnector = ({
  position,
  width,
  matchHeight,
  bracketEnd,
  textAnchor,
  isSemiFinal,
  isFinal,
  isOnlyMatch,
  backgroundColor,
  lineColor,
  isDummy,
  roundCount,
  index,
}) => {
  if (isFinal || isSemiFinal || isOnlyMatch) return null;

  const height = position.Y.blockEnd - position.Y.matchEnd;
  const yStart =
    bracketEnd === "top"
      ? position.Y.matchEnd
      : bracketEnd === "bottom"
      ? position.Y.blockStart
      : position.Y.matchEnd;
  const renderLines = (verticalPosition) => {
    if (
      (roundCount > 2 &&
        ((index % 2 === 0 &&
          verticalPosition === "bottom" &&
          bracketEnd !== "top") ||
          (index % 2 === 1 &&
            verticalPosition === "top" &&
            bracketEnd !== "bottom"))) ||
      isDummy
    )
      return null;

    const X = getLineX(textAnchor, width);
    return textAnchor !== "middle" ? (
      <g>
        <line
          x1={width - X}
          x2={width - X}
          y1={0}
          y2={height}
          style={{
            stroke: isDummy
              ? backgroundColor || defaultBackgroundColor
              : lineColor || defaultTextColor,
          }}
        />
      </g>
    ) : null;
  };

  return (
    <>
      <g transform={`translate(${position.X}, ${yStart})`}>
        <rect
          width={Math.abs(width)}
          height={Math.abs(height)}
          style={{ fill: backgroundColor || defaultBackgroundColor }}
        />
        {renderLines("top")}
      </g>
      {bracketEnd === "middle" && !isFinal && (
        <g transform={`translate(${position.X}, ${position.Y.blockStart})`}>
          <rect
            width={Math.abs(width)}
            height={Math.abs(height)}
            style={{ fill: backgroundColor || defaultBackgroundColor }}
          />
          {renderLines("bottom")}
        </g>
      )}
    </>
  );
};

export default MatchConnector;
