# Fancy & Simple Video Player!
A fancy & simple video player on Vanilla Javascript with CSS.

## Preview
- https://aaronlab.github.io/simple-video-player/

## Features
- Play / Pause by using space bar / clicking video
- Play / Pause & Mute / Unmute by clicking icons
- Update progress bar in real-time
- Jump to the clicked point by clicking progress bar

## How to Use
- Put your FontAwesome Kit in the head.
- Link attatched ```styles.css``` file in the head.
- Put the JavaScript file on the body.
- Put the code below on the body.
    ```html
    <!-- Copy all and paste it in the body -->
    <!-- Do not remove class name or id -->
    <!-- Or you can change the name or id in .css / .js file -->
    <div id="videoPlayer">
        <!-- Change video source location below -->
        <video src="./samplevideo.mp4"></video>
        <div id="controls" class="videoPlayer__controls displayNone">
        <div class="videoPlayer__column">
            <span id="playBtn"><i class="fas fa-play"></i></span>
        </div>
        <div class="videoPlayer__column">
            <div id="progressBar">
            <div id="inProgressBar"></div>
            </div>
        </div>
        <div class="videoPlayer__column">
            <span id="currentTime">00:00:00</span>
            <span> / </span>
            <span id="totalTime">00:00:00</span>
        </div>
        <div class="videoPlayer__column">
            <span id="volumnBtn"><i class="fas fa-volume-up"></i></span>
        </div>
        </div>
    </div>
    ```

## Customizing
- How to adjust video width
    ```css
    /* styles.css */
    /* change the 23rd line */
    max-width: <THE SIZE YOU WANT>;

    /* also, you may need to change the width of the progress bar on the 50th line */
    min-width: <THE SIZE YOU WNAT>;
    ```
- You can change background colors in css file.
  - the 40th, 53rd, 61st line in ```styles.css```
- You can remove replay function that works when the video is ended in ```index.js``` file.
    ```javascript
    // find handleEnded function on the 79th line and then remove it.
    function handleEnded() {
        video.currentTime = 0;
        video.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    // find the 125th line and then remove it.
    video.addEventListener("ended", handleEnded);
    ```