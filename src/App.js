import "./styles/app.scss";
import data from "./util";
import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

function App() {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const AudioRef = useRef(null);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});

	function timeUpdateHandler(e) {
		const { currentTime, duration } = e.target;
		setSongInfo({
			...songInfo,
			currentTime: currentTime,
			duration: duration,
		});
	}

	return (
		<div className="App">
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				AudioRef={AudioRef}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
			/>
			<Library
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
			/>
		</div>
	);
}

export default App;
