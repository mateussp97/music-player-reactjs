import React from "react";

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);

    //! Adiciona a estilização na song atual tocando (conforme active true/false), isso no libraryStatus
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);

    //! Verifica se a música está tocando
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
