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
	songs,
	setCurrentSong,
	setSongs,
}) {
	//Use
	function songListUpdating(nextPrev) {
		const updateSongStates = songs.map((listSong) => {
			if (listSong.id === nextPrev.id) {
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
		setSongs(updateSongStates);
	}

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

	async function skipTrackHandler(direction) {
		let currentSongIndex = songs.findIndex(
			(songFromIndex) => songFromIndex.id === currentSong.id
		);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
			songListUpdating(songs[(currentSongIndex + 1) % songs.length]);
		}
		if (direction === "skip-back") {
			if ((currentSongIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				if (isPlaying) {
					AudioRef.current.play();
				}
				songListUpdating(songs[(currentSongIndex - 1) % songs.length]);
				return;
			}
			await setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
			songListUpdating(songs[(currentSongIndex - 1) % songs.length]);
		}
		if (isPlaying) {
			AudioRef.current.play();
		}
	}

	//Styles
	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};
	const gradientBar = {
		background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
	};
	const gradientColor = {
		color: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
	};
	////////////////////
	//				  //
	//     Main       //
	////////////////////
	return (
		<div className="player">
			<div className="time-control" style={gradientColor}>
				<p>{convertTime(songInfo.currentTime)}</p>
				<div className="track" style={gradientBar}>
					<input
						type="range"
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						onChange={dragHandler}
					/>
					<div style={trackAnim} className="animate-track" />
				</div>
				<p>
					{songInfo.duration
						? convertTime(songInfo.duration)
						: "0:00"}
				</p>
			</div>
			<div className="play-control" style={gradientColor}>
				<FontAwesomeIcon
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
					onClick={() => skipTrackHandler("skip-back")}
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
					onClick={() => skipTrackHandler("skip-forward")}
				/>
			</div>
		</div>
	);
}
