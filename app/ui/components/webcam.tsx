"use client";
import Webcam from 'react-webcam';
import React, { useRef, useState } from 'react';

function WebcamComponent() { 


    return (
        <div>
            <Webcam
            // height={800}
            width={1150}
            mirrored={false}
            />
        {/* {   
            isShowVideo &&
            <
            Webcam
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
            />
        }
        <button onClick={startCam}></button> */}
        </div>
        
    );
};

export default WebcamComponent;


// const WebcamStreamCapture = () => {
    
  
//     const handleStartCaptureClick = React.useCallback(() => {
//       setCapturing(true);
//       mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
//         mimeType: "video/webm"
//       });
//       mediaRecorderRef.current.addEventListener(
//         "dataavailable",
//         handleDataAvailable
//       );
//       mediaRecorderRef.current.start();
//     }, [webcamRef, setCapturing, mediaRecorderRef]);
  
//     const handleDataAvailable = React.useCallback(
//       ({ data }) => {
//         if (data.size > 0) {
//           setRecordedChunks((prev) => prev.concat(data));
//         }
//       },
//       [setRecordedChunks]
//     );
  
//     const handleStopCaptureClick = React.useCallback(() => {
//       mediaRecorderRef.current.stop();
//       setCapturing(false);
//     }, [mediaRecorderRef, webcamRef, setCapturing]);
  
//     const handleDownload = React.useCallback(() => {
//       if (recordedChunks.length) {
//         const blob = new Blob(recordedChunks, {
//           type: "video/webm"
//         });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         document.body.appendChild(a);
//         a.style = "display: none";
//         a.href = url;
//         a.download = "react-webcam-stream-capture.webm";
//         a.click();
//         window.URL.revokeObjectURL(url);
//         setRecordedChunks([]);
//       }
//     }, [recordedChunks]);
// };
// return (
//     <>
//         <Webcam audio={false} ref={webcamRef} />
//         {capturing ? (
//         <button onClick={handleStopCaptureClick}>Stop Capture</button>
//         ) : (
//         <button onClick={handleStartCaptureClick}>Start Capture</button>
//         )}
//         {recordedChunks.length > 0 && (
//         <button onClick={handleDownload}>Download</button>
//         )}
//     </>
//     );
// };

// ReactDOM.render(<WebcamStreamCapture />, document.getElementById("root"));