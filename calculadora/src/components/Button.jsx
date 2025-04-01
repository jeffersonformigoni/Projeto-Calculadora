import React from "react";
import "./Button.css";

const Button = (props) => (
  <button
    label="1"
    onClick={(e) => props.click && props.click(props.label)} // Verifica se props.click está definido
    className={`
        button 
        ${props.operation ? "operation" : ""}
        ${props.double ? "double" : ""}
        ${props.triple ? "triple" : ""}
    `}
  >
    {props.label}
  </button>
);

export default Button;