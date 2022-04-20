import React, { useState } from "react";

const CLinkSvg = ({
  x,
  y,
  onMouseOver,
  onMouseOut,
  style,
  clickHandler,
  boldText,
  children,
}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const raiseMouseOver = () => {
    if (clickHandler) setMouseIsOver(true);
    if (onMouseOver) onMouseOver();
  };
  const raiseMouseOut = () => {
    if (clickHandler) setMouseIsOver(false);
    if (onMouseOut) onMouseOut();
  };

  return (
    <text
      x={x}
      y={y}
      onClick={!clickHandler ? () => {} : clickHandler}
      onMouseOver={raiseMouseOver}
      onMouseOut={raiseMouseOut}
      style={{
        ...style,
        fontWeight: boldText ? "bold" : "regular",
        cursor: clickHandler ? "pointer" : "",
        textDecoration: mouseIsOver ? "underline" : "",
      }}
    >
      {children}
    </text>
  );
};

export default CLinkSvg;
