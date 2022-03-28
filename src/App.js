import { useState, useEffect, useMemo, createContext } from "react";
import Player from "./Component/Player";
import { episode_URL } from "./Globals";
import Style from "./App.module.css";
// import { AppContext } from "./State/State";
import { useContext } from "react";

import { AppContext } from "./State/State";

function App() {
  const [podcastList, setPodcastList] = useState([]);
  const [podcastLoad, setPodcastLoad] = useState(false);
  const [podcastError, setPodcastError] = useState(false);

  useEffect(async () => {
    setPodcastLoad(true);
    setPodcastError(false);

    try {
      //fetch data from api
      let episodes = await fetch(`${episode_URL}/episodes`);
      let episodeData = await episodes.json();
      episodeData = episodeData.map((item) => {
        item.isPlaying = false;
        item.adIsPlaying = false;
        return item;
      });

      //hide loading label and hide error label
      setPodcastLoad(false);
      setPodcastList(episodeData);
    } catch (e) {
      setPodcastLoad(false);
      setPodcastError(true);
    }
  }, []);

  return (
    <AppContext.Provider value={[podcastList, setPodcastList]}>
      <div className={Style.App}>
        <h1>App</h1>
        {podcastLoad ? <h2> Loading... </h2> : null}
        {podcastError ? <h2> Error </h2> : null}
        {podcastList.length &&
          podcastList.map((podcast, index) => (
            <div key={index} className={Style.border}>
              <Player key={podcast.id} podcast={podcast}></Player>
            </div>
          ))}
      </div>
    </AppContext.Provider>
  );
}

export default App;
