import { useRef, useState } from "react";
import { episode_URL } from "../Globals";
import { customTimer } from "../Helper/Helper";
import Style from "./Marker.module.css";

const Marker = (props) => {
  const markers = useRef(props.podcast.markers);
  const [currentMarker, setCurrentMarker] = useState(null);
  const locked = useRef(false);
  const timer = useRef(null);

  if (markers.current.length && locked.current === false) {
    let current = null;
    //find if a marker needs to be shown
    for (const [index, item] of markers.current.entries()) {
      const cond1 = item.start < props.currentTime;
      const cond2 = item.start + item.duration > props.currentTime;
      if (cond1 && cond2) {
        setCurrentMarker(item);
        //remove from useRef array to avoid repeat
        markers.current.splice(index, 1);
      }
    }

    //marker found to show
    if (currentMarker && timer.current == null) {
    
      timer.current = new customTimer((sec) => {
        if (sec === currentMarker.duration) {
         //TODO add stop player and keep ref to it.
          timer.current.clear();
          timer.current = null;
          setCurrentMarker(null);
        }
      }, 1000);
    }
  }

  const markupContent = () => {
    if (currentMarker?.type == "ad") {
      return (
        <a href={currentMarker.link}>
          <span>{currentMarker.content}</span>
        </a>
      );
    }

    if (currentMarker?.type == "text") {
      return <div>{currentMarker.content}</div>;
    }

    if (currentMarker?.type == "image") {
      return (
        <img
          className={Style.img}
          src={`${episode_URL}/${currentMarker.content}`}
        />
      );
    }

    if (currentMarker?.type == "video") {
      return (
        <video src={`${episode_URL}/${currentMarker.content}`} controls></video>
      );
    }

    return null;
  };

  return <div className={Style.marker}>{markupContent()}</div>;
};

export default Marker;
