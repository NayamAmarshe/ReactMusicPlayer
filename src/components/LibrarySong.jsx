import React from "react";

export default function LibrarySong({ song, songs, setCurrentSong }) {
    function songSelectHandler(e) {
        const selectedSong = songs.filter();
    }
    return (
        <div onClick={songSelectHandler} className="library-song">
            <img src={song.cover} alt="Song Cover" />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}
