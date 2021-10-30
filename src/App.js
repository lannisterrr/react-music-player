import React, { useState } from 'react';
import './styles/app.scss';
import Song from './components/Song';
import Player from './components/Player';
import data from './util';
function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]); // at mount show the first song in array
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player />
    </div>
  );
}

export default App;
