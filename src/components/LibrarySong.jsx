import React from "react";

export default function LibrarySong({ song }) {
    function songSelectHandler(e) {}
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
