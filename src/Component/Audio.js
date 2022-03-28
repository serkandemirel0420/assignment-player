import { useEffect, useRef } from "react";

const Audio = (props) => {


  const audioPlayer = useRef(); 

  useEffect(() => {
    if (props.podcast.isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [props.podcast.isPlaying]);

  useEffect(() => {
    audioPlayer.current.currentTime = props.seekTime;
  } , [props.seekTime]);


  const onEnded = () => {
    props.Pause();
    props.changeCurrentTime(0);
  }

  return (
    <div className="audio">
      <audio
        src={props.audioUrl}
        ref={audioPlayer}
        onTimeUpdate={props.timeChanged}
        onLoadedMetadata={props.onLoadedMetadata}
        onEnded={onEnded}
      ></audio>
    </div>
  );
};

export default Audio;
