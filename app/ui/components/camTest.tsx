import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import * as AWS from 'aws-sdk';
import ReactS3Client from 'react-aws-s3-typescript';
import { PutObjectCommand, S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from 'next/server';

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: "",
    secretAccessKey: ""
  }
});

const WebCam: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [selectedMimeType, setSelectedMimeType] = useState('');

  const mirrorVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useLayoutEffect(() => {
    const mimeTypes = getSupportedMimeTypes();
    if (mimeTypes.length > 0) {
      setSelectedMimeType(mimeTypes[0]);
    }
  }, []);

  useEffect(() => {
    if (!stream) {
      void getMedia();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const getMedia = async () => {
    try {
      const constraints = {
        audio: {
          echoCancellation: { exact: true },
        },
        video: {
          width: 1280,
          height: 720,
        },
      };
      const mediaStream =
        await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (mirrorVideoRef.current) {
        mirrorVideoRef.current.srcObject = mediaStream;
      }
    } catch (e) {
      console.log(`현재 마이크와 카메라가 연결되지 않았습니다`);
    }
  };

  const handleStartRecording = () => {
    setRecordedBlobs([]);
    try {
      mediaRecorderRef.current = new MediaRecorder(stream as MediaStream, {
        mimeType: selectedMimeType,
      });
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedBlobs((prev) => [...prev, event.data]);
        }
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (e) {
      console.log(`MediaRecorder error`);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  const handleDownload = () => {
    const blob = new Blob(recordedBlobs, { type: selectedMimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recorded-video.webm';
  
    const command = new PutObjectCommand({
      Bucket: "summit-rekognition-video",
      Key: `${Date.now()+'video'}`,
      Body: blob,
      ContentType: 'video/mp4'
    });

    s3.send(command);
    console.log(s3.send(command));

    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      }, 100);
  
  };

  const getSupportedMimeTypes = () => {
    const types = [
      'video/webm; codecs=vp8',
      'video/webm; codecs=vp9',
      'video/webm; codecs=h264',
      'video/mp4; codecs=h264',
    ];
    return types.filter((type) => MediaRecorder.isTypeSupported(type));
  };

  return (
    <div
    >
      <video
        ref={mirrorVideoRef}
        playsInline
        autoPlay
        muted

      />

      <div>
        <button onClick={handleStartRecording} disabled={recording}>
          시작
        </button>
        <br></br>
        <button onClick={handleStopRecording} disabled={!recording}>
          종료
        </button>
        <br></br>
        <button
          onClick={handleDownload}
          disabled={recording || recordedBlobs.length === 0}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default WebCam;
