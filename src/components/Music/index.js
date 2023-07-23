import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const audioRef = useRef(null);

  // 음악이 끝날 때 호출되는 핸들러
  const handleMusicEnded = () => {
    audioRef.current.play();
  };

  return (
    <div>
      {/* 음악을 반복재생하도록 loop 속성을 추가 */}
      <audio ref={audioRef} controls loop onEnded={handleMusicEnded}>
        {/* 여기에 음악 파일 경로를 넣어주세요 */}
        <source src="/music/1.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
