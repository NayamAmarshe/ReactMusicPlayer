import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";

export default function Player({ currentSong, isPlaying, setIsPlaying }) {
    //Ref
    const AudioRef = useRef(null);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

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
    function timeUpdateHandler(e) {
        const { currentTime, duration } = e.target;
        setSongInfo({
            ...songInfo,
            currentTime: currentTime,
            duration: duration,
        });
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
                    max={songInfo.duration}
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
            <audio
                ref={AudioRef}
                src={currentSong.audio}
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
            />
        </div>
    );
}
