import React, { useState } from "react";

//? Import components
import Song from "./components/Song";
import Player from "./components/Player";

//? Import styles
import "./styles/app.scss";

//? Import util
import data from "./util";

function App() {
  //* State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[1]);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player />
    </div>
  );
}

export default App;
