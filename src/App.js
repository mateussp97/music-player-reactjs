import React, { useState, useRef } from "react";

//? Import components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";

//? Import styles
import "./styles/app.scss";

//? Import util
import data from "./data";

function App() {
  //* Ref
  const audioRef = useRef(null);

  //* State
  const [songs, setSongs] = useState(data()); //! songs inicia com valor de data(), então no songs está guardado o Array de dados das músicas
  const [currentSong, setCurrentSong] = useState(songs[0]); //! currentSong inicia com song[0], então é a primeira música do Array songs
  const [isPlaying, setIsPlaying] = useState(false); //! isPlaying inicia false, então não está tocando nada
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  }); //! song info inicia com três valores sendo os três do tipo Number e com valor 0, o primeiro é referente ao tempo atual da música, o segundo a duração e o terceiro a porcentagem da música tocando
  const [libraryStatus, setLibraryStatus] = useState(false); //! libraryStatus inicia com valor false, então a libraryStatus está escondida, e só sera exibida ao clicar no botão Library que se encontra no component Nav

  //* Event Handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //! Calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animation,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />
    </div>
  );
}

export default App;
