import "./styles/app.scss";
import data from "./util";
import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

function App() {
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className="App">
            <Song currentSong={currentSong} />
            <Player
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
            />
            <Library songs={songs} setCurrentSong={setCurrentSong} />
        </div>
    );
}

export default App;
