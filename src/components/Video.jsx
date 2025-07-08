import React, { useState } from 'react';
import './Video.css';

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // Function to play the video and remove the blocker
  const handlePlay = () => {
    const iframe = document.getElementById('youtube-iframe');
    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    setIsPlaying(true);
  };

  // Function to pause the video and add the blocker back
  const handlePause = () => {
    const iframe = document.getElementById('youtube-iframe');
    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    setIsPlaying(false);
    document.getElementById('iframeBlocker').style.display = 'block'; // Add the blocker back when video is paused
  };

  const getUserName = () => {
    const storedData = localStorage.getItem('userData'); // Get the stored JSON string
    if (storedData) {
      const parsedData = JSON.parse(storedData); // Parse it back to an object
      return parsedData.name; // Access the 'name' field
    }
    return null; // Return null if there's no data
  };
  
  const userName = getUserName();
  console.log(userName);

  const handleLogout = () => {
    // Remove the isLoggedIn flag from local storage
    localStorage.removeItem('isLoggedIn');
    
    // Optionally remove any other user-related data
   
    
    // Navigate to the login page or home page after logout
    
  };

  return (
    <>
        <h6 onClick={handleLogout}> <span style={{color: "#337ab7" , cursor: "pointer"}}> Logout:</span>{userName}</h6>
    <div className="video-container">
    
      <div className="video-wrapper">
        <iframe
          id="youtube-iframe"
          width="100%"
          height="100%"
          // src="https://www.youtube.com/embed/zJStJnmGmW0?enablejsapi=1"
          src="https://www.youtube.com/embed/wXmKqDM9isQ?modestbranding=1&rel=0&enablejsapi=1"
          // src="https://www.youtube.com/embed/t7YtZoVZHtI?enablejsapi=1"
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation"

        ></iframe>
        {/* Blocker div that prevents interaction until play is clicked */}
        <div
          id="iframeBlocker"
          className="iframe-blocker"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'transparent' }}
        ></div>
      </div>

      <div className="video-controls">
        <button className="control-btn" onClick={handlePlay} disabled={isPlaying}>
          Play
        </button>
        <button className="control-btn" onClick={handlePause} disabled={!isPlaying}>
          Pause
        </button>
      </div>
    </div>
    </>
  );
};

export default Video;
