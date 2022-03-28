import { createContext } from "react";
 

export const AppContext = createContext();

export const Play = (podcastList, id) => {
  
  let index = id;
  let newPodcastList = podcastList.map((item) =>
    item.id === index
      ? { ...item, isPlaying: true }
      : { ...item, isPlaying: false }
  );
  return newPodcastList;
};

export const Pause = (podcastList, id) => {
  let index = id;
  let newPodcastList = podcastList.map((item) =>
    item.id === index
      ? { ...item, isPlaying: false }
      : { ...item, isPlaying: false }
  );
  return newPodcastList;
};

export const adPlay = (podcastList, id) => {
  // let index = id;
  let newPodcastList = podcastList.map((item) =>
    item.id === id
      ? { ...item, adIsPlaying: true }
      : { ...item, adIsPlaying: false }
  );

  
  return newPodcastList;
};

export const adStop = (podcastList, id) => {
  let index = id;
  let newPodcastList = podcastList.map((item) =>
    item.id === id
      ? { ...item, adIsPlaying: false }
      : { ...item, adIsPlaying: false }
  );

  return newPodcastList;
};
