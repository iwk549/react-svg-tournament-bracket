import React from "react";

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
  return (
    <text
      x={x}
      y={y}
      onClick={!clickHandler ? () => {} : clickHandler}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{
        ...style,
        fontWeight: boldText ? "bold" : "regular",
        cursor: clickHandler ? "pointer" : "",
      }}
    >
      {children}
    </text>
  );
};

export default CLinkSvg;
