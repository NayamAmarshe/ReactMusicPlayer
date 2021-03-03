import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

export default function Player({
	currentSong,
	isPlaying,
	setIsPlaying,
	AudioRef,
	songInfo,
	setSongInfo,
}) {
	//Ref

	//Event Handlers
	function playSongHandler() {
		if (isPlaying) {
			AudioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			AudioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	}

	function convertTime(time) {
		return (
			Math.floor(time / 60) +
			":" +
			("0" + Math.floor(time % 60)).slice(-2)
		);
	}
	function dragHandler(e) {
		AudioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	}

	//Main
	return (
		<div className="player">
			<div className="time-control">
				<p>{convertTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration || 0}
					type="range"
					value={songInfo.currentTime}
					onChange={dragHandler}
				/>
				<p>{convertTime(songInfo.duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
				/>

				<FontAwesomeIcon
					className="play"
					size="2x"
					icon={!isPlaying ? faPlay : faPause}
					onClick={playSongHandler}
				/>

				<FontAwesomeIcon
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
}
