import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // this is kinda like components not the specific icons
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'; // the actual icon

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  setCurrentSong,
  songs,
}) => {
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying); // falsef
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying); // true -> first this executes
    }
  };

  const getTime = time => {
    if (time) {
      let Minutes = Math.floor(time / 60); // to get the minutes
      let Seconds = Math.floor(time % 60);
      if (Seconds < 10) {
        Seconds = `0${Seconds}`;
      }
      return `${Minutes}:${Seconds}`;
    }
  };

  function dragHandler(e) {
    // to sync our audio with the currrent time
    audioRef.current.currentTime = e.target.value;
    // value in input(range) is already in sync with the ongoing time of the song, so just need to fetch that
    setSongInfo({ ...songInfo, currentTime: e.target.value }); // this sets our Slider(UI) in sync with the currentTime but not audio
  }

  function skipSongHandler(direction) {
    // we need to check i which position I am i.e the 'index'. The currentSong object doesn't have the index.
    // check if the song that I am playing has an id that is equal to the any id in the songs array. than give me the index of that
    let currentIndex = songs.findIndex(song => song.id === currentSong.id); // if any object in the array has an id match with song you are playing
    if (direction === 'skip-forward') {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]); // when it reaches 9 % 9 = 0 , it sets again songs[0]
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        return; // because we don't want the below code to run
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
  }

  return (
    <div className="player-container">
      <div className="time-control">
        <p>
          {getTime(songInfo.currentTime)
            ? getTime(songInfo.currentTime)
            : '0:00'}
        </p>
        <input
          min={0}
          max={`${songInfo.duration}`}
          value={songInfo.currentTime}
          type="range"
          onChange={dragHandler}
        />
        <p>
          {getTime(songInfo.duration) ? getTime(songInfo.duration) : '0:00'}
        </p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipSongHandler('skip-back')}
        />
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
          onClick={() => skipSongHandler('skip-forward')}
        />
      </div>
    </div>
  );
};

export default Player;
