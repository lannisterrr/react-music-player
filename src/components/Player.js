import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // this is kinda like components not the specific icons
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'; // the actual icon

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying); // falsef
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying); // true -> first this executes
    }
  };

  const timeUpdateHandler = e => {
    let current = e.target.currentTime;
    let duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration }); // ... for previous value in object
  };

  const getTime = time => {
    let Minutes = Math.floor(time / 60); // to get the minutes
    let Seconds = Math.floor(time % 60);
    if (Seconds < 10) {
      Seconds = `0${Seconds}`;
    }
    return `${Minutes}:${Seconds}`;
  };

  function dragHandler(e) {
    // to sync our audio with the currrent time
    audioRef.current.currentTime = e.target.value;
    // value in input(range) is already in sync with the ongoing time of the song, so just need to fetch that
    setSongInfo({ ...songInfo, currentTime: e.target.value }); // this sets our Slider(UI) in sync with the currentTime but not audio
  }

  //state
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          type="range"
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play-pause"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
