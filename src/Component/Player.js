import { useState, useEffect } from "react";

import Audio from "./Audio";
import Control from "./Control";
import Timeline from "./Timeline";
import Marker from "./Marker";
import { episode_URL } from "../Globals";
import { useContext } from "react";
// import {Play} from './State/State';
import { AppContext, Play, Pause } from "../State/State";

const Player = (props) => {
  const [podcastList, setPodcastList] = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeektime] = useState(0);

  // const [podcast, setPodcast] = useState(props.podcast);

  const handlePlay = () => {
    let newState = Play(podcastList, props.podcast.id);
    setPodcastList(newState);
  };

  const handlePause = () => {
    let newState = Pause(podcastList, props.podcast.id);
    setPodcastList(newState);
  };

  const timeChanged = (time) => {
    setCurrentTime(time.currentTarget.currentTime);
  };

  const handleMetaData = (metaData) => {
    setDuration(metaData.currentTarget.duration);
  };

  const changeCurrentTime = (newSeekValue) => {
    setSeektime(newSeekValue);
  };

  const rewindORforward = (changeValue) => {
    setSeektime(currentTime + changeValue);
  };

  return (
    <div className="player">
      <Marker
        currentTime={currentTime}
        podcast={props.podcast}
        Pause={handlePause}
        Play={handlePlay}
      />
      <Audio
        podcast={props.podcast}
        audioUrl={`${episode_URL}${props.podcast.audio}`}
        timeChanged={timeChanged}
        currentTime={currentTime}
        onLoadedMetadata={handleMetaData}
        seekTime={seekTime}
        Pause={handlePause}
        changeCurrentTime={changeCurrentTime}
      />
      <Timeline
        currentTime={currentTime}
        duration={duration}
        podcast={props.podcast}
        changeCurrentTime={changeCurrentTime}
      />
      <Control
        podcast={props.podcast}
        Play={handlePlay}
        rewindVal={-5}
        forwardVal={5}
        Pause={handlePause}
        changeCurrentTime={rewindORforward}
      />
    </div>
  );
};

export default Player;
