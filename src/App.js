import "./styles/app.scss";
import data from "./data";
import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const AudioRef = useRef(null);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
	});
	const [showLibrary, setShowLibrary] = useState(false);

	function timeUpdateHandler(e) {
		const { currentTime, duration } = e.target;
		const roundedCurrentTime = Math.round(currentTime);
		const roundedDuration = Math.round(duration);
		const animationValue = Math.round(
			(roundedCurrentTime / roundedDuration) * 100
		);
		setSongInfo({
			...songInfo,
			currentTime: currentTime,
			duration: duration,
			animationPercentage: animationValue,
		});
	}
	async function songEndHandler(e) {
		let currentSongIndex = songs.findIndex(
			(songFromIndex) => songFromIndex.id === currentSong.id
		);
		await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
	}
	if (isPlaying) {
		AudioRef.current.play();
	}

	return (
		<div className={`App ${showLibrary ? "library-active" : ""}`}>
			<Nav showLibrary={showLibrary} setShowLibrary={setShowLibrary} />
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				AudioRef={AudioRef}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
			/>
			<Library
				showLibrary={showLibrary}
				setShowLibrary={setShowLibrary}
				songs={songs}
				setCurrentSong={setCurrentSong}
				AudioRef={AudioRef}
				isPlaying={isPlaying}
				setSongs={setSongs}
			/>
			<audio
				ref={AudioRef}
				src={currentSong.audio}
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				onEnded={songEndHandler}
			/>
		</div>
	);
}

export default App;
