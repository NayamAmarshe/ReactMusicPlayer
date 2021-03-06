import React from "react";

export default function Player({ currentSong }) {
	const gradientColor = {
		color: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
	};
	return (
		<div className="song-container" style={gradientColor}>
			<img src={currentSong.cover} alt="Song Cover" />
			<h2>{currentSong.name}</h2>
			<h3>{currentSong.artist}</h3>
		</div>
	);
}
