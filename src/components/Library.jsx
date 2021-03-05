import React from "react";
import LibrarySong from "./LibrarySong";

export default function Library({
	songs,
	setCurrentSong,
	AudioRef,
	isPlaying,
	setSongs,
	showLibrary,
	setShowLibrary,
}) {
	return (
		<div className={`library ${showLibrary ? "active-library" : ""}`}>
			<h2>Library</h2>
			<div className="library-songs">
				{songs.map((song) => {
					return (
						<LibrarySong
							setCurrentSong={setCurrentSong}
							song={song}
							songs={songs}
							id={song.id}
							key={song.id}
							AudioRef={AudioRef}
							isPlaying={isPlaying}
							setSongs={setSongs}
						/>
					);
				})}
			</div>
		</div>
	);
}
