import React from "react";
export default function LibrarySong({
	song,
	songs,
	setCurrentSong,
	AudioRef,
	isPlaying,
	setSongs,
	id,
}) {
	//Event Handlers
	async function songSelectHandler(e) {
		const updateSongStates = songs.map((listSong) => {
			if (listSong === song) {
				return {
					...listSong,
					active: true,
				};
			} else {
				return {
					...listSong,
					active: false,
				};
			}
		});
		await setSongs(updateSongStates);
		await setCurrentSong(song);
		if (isPlaying) {
			AudioRef.current.play();
		}
	}

	//MAIN
	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${song.active ? "selected" : ""}`}
		>
			<img src={song.cover} alt="Song Cover" />
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
}
