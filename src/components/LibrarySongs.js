import React from 'react';

const LibrarySongs = ({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  songs,
  setSongs,
  id,
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song); // outstanding you did it your self
    // Add active state
    const newSongs = songs.map(song => {
      if (song.id === id) {
        return {
          // whatever inside song object - keep that , just change the active property to true.
          ...song,
          active: true,
        };
        // else every other song which is not playing set it to false.
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    // to deal with toggling between different songs while playing .
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      // when the audio is ready to play and not undefined then play the music
      if (playPromise !== undefined) {
        playPromise.then(audio => {
          audioRef.current.play();
        });
      }
    }
  };
  return (
    // 'library-song' is generated with map and contains each song's information
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <img src={song.cover} alt="song-cover" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySongs;
