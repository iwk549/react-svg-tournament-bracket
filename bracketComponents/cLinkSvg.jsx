import React from "react";

const CLinkSvg = ({
  x,
  y,
  onMouseOver,
  onMouseOut,
  style,
  disabled,
  clickHandler,
  boldText,
  children,
}) => {
  console.log(disabled);
  return (
    <text
      x={x}
      y={y}
      onClick={disabled ? () => {} : clickHandler}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{
        ...style,
        fontWeight: boldText ? "bold" : "regular",
        cursor: disabled ? "" : "pointer",
      }}
    >
      {children}
    </text>
  );
};

export default CLinkSvg;
