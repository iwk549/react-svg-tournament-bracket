import React from "react";
import { getLineX } from "../../utils/bracketUtils";
import { defaultTextColor, defaultBackgroundColor } from "../../utils/formats";

const MatchConnector = ({
  position,
  width,
  bracketEnd,
  textAnchor,
  isSemiFinal,
  isFinal,
  isOnlyMatch,
  backgroundColor,
  lineColor,
}) => {
  if (isFinal || isSemiFinal || isOnlyMatch) return null;
  const yStart =
    bracketEnd === "top"
      ? position.Y.matchEnd
      : bracketEnd === "bottom"
      ? position.Y.blockStart
      : position.Y.matchEnd;

  const height = position.Y.blockEnd - position.Y.matchEnd;

  const renderLines = () => {
    const X = getLineX(textAnchor, width);
    return textAnchor !== "middle" ? (
      <g>
        <line
          x1={width - X}
          x2={width - X}
          y1={0}
          y2={height}
          style={{ stroke: lineColor || defaultTextColor }}
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
        {renderLines()}
      </g>
      {bracketEnd === "middle" && !isFinal && (
        <g transform={`translate(${position.X}, ${position.Y.blockStart})`}>
          <rect
            width={Math.abs(width)}
            height={Math.abs(height)}
            style={{ fill: backgroundColor || defaultBackgroundColor }}
          />
          {renderLines()}
        </g>
      )}
    </>
  );
};

export default MatchConnector;
