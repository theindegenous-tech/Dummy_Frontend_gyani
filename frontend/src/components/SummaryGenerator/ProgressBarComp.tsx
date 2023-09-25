import "./ProgressBar.css";
import React, {  useState } from "react";

type ProgressBarProps = {
  valuePercentage: number;
};

const ProgressBar = (props: ProgressBarProps) => {
  const { valuePercentage: value } = props;
  const fillerRelativePercentage = (100 / value) * 100;

  return (
    <div
      className="wrapper flex items-center justify-center w-full"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div className="barContainer ">
        <div className="filler" style={{ width: `${value}%` }}>
          <div
            className="fillerBackground py-3"
            style={{ width: `${fillerRelativePercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default function ProgressBarComp(props) {

  return (
    <div className={"App"}>
      <div style={{ width: "250px",height:'100px' }}>
        <ProgressBar  valuePercentage={props.value} />
      </div>
    </div>
  );
}
