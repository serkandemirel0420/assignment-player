import Style from "./Control.module.css";
const Control = (props) => {
  return (
    <div className={Style.control}>
      <button onClick={props.Play}>Play</button>
      <button onClick={props.Pause}>Pause</button>
      <button onClick={() => props.changeCurrentTime(props.forwardVal)}>+5</button>
      <button onClick={() => props.changeCurrentTime(props.rewindVal)}>-5</button>
    </div>
  );
};

export default Control;
