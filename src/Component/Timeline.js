import { useEffect } from "react";
import { useRef } from "react";
import { useContext, useState } from "react";
import { AppContext } from "../State/State";
import Style from "./Timeline.module.css";
import { calculateTime } from "../Helper/Helper";

const Timeline = (props) => {
  const [seekValue, setSeekValue] = useState(0);
  const [rangeIsChanging, setRangeIsChanging] = useState(false);
  const rangeInput = useRef();

  useEffect(() => {
    if (rangeIsChanging == false) {
      const positiveTargetRangeValue = parseInt(props.currentTime);
      const seekto = parseInt((props.currentTime / props.duration) * props.duration) || 0;
      setSeekValue(seekto); 
    }
  }, [props.currentTime]);

  const handleRangeOnChange = (e) => {
    const positiveTargetRangeValue = parseInt(e.target.value);
    const seekto = props.duration * (positiveTargetRangeValue / props.duration);
    setSeekValue(positiveTargetRangeValue); 
  };

  const onMouseUp = (e) => {
    setRangeIsChanging(false);
    props.changeCurrentTime(seekValue);
  };

  const onMouseDown = (e) => {
    setRangeIsChanging(true);
  };

  return (
    <div className={Style.timeline}>
      <span> {calculateTime(seekValue)}</span>
      <input className={Style.range}
        type="range"
        min="0"
        max={parseInt(props.duration)}
        step="1"
        value={seekValue}
        onChange={handleRangeOnChange}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        ref={rangeInput}
        //   onInput={onInput}
      />
      <span> {calculateTime(props.duration)}</span>
    </div>
  );
};

export default Timeline;
