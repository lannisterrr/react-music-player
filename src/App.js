import React, { useState, useRef } from 'react';
import './styles/app.scss';
import Song from './components/Song';
import Player from './components/Player';
import data from './util';
import Library from './components/Library';
function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]); // at mount show the first song in array
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const timeUpdateHandler = e => {
    let current = e.target.currentTime;
    let duration = e.target.duration;

    setSongInfo({ ...songInfo, currentTime: current, duration }); // ... for previous value in object
  };
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
