import React from 'react';
import LibrarySongs from './LibrarySongs';

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySongs
            key={song.id}
            song={song}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            id={song.id}
            setSongs={setSongs}
            songs={songs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
