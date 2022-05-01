// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
import { parseCSS } from "@testing-library/jest-dom/dist/utils";

function App() {
  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log("Let's get this party started")
    navigator.mediaDevices.getUserMedia({video: true})
    async function getDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
    }
  }
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    //console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const list = [];
  // var fs = require('fs')
  // var text = fs.readFile("D:\\pragatheeshwar\\Smart India Hack\\coco.names.txt",'utf-8',(err,data)=>{
  //   if(err){
  //     console.log(err);
  //   }
  //   var textByLine = text.split("\n");
  //   console.log(textByLine);
  // });

  //const names = ['person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'street sign', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe', 'hat', 'backpack', 'umbrella', 'shoe', 'eye glasses', 'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball', 'kite', 'baseball', 'bat', 'baseball', 'glove', 'skateboard', 'surfboard', 'tennis', 'racket', 'bottle', 'plate', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'mirror', 'dining table', 'window', 'desk', 'toilet', 'door', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone', 'microwave oven', 'toaster', 'sink', refrigerator', 'blender', 'book', 'clock', 'vase', 'scissor', 'teddy', 'bearhair drier', 'toothbrush', 'hair brush'];
  var distance = [['less than a','1','2'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4'],['less than a','3','4']];
  var distance1 = [['less than a','1']];
  var dangerous = ['car','bus','truck','stop sign','knife',];

  const detect = async (net) => {
    // Check data is available
    
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
      console.log(obj);
      if (obj.length != 0){
        const a = Object.values(obj[0]);
        
        //console.log(a);
        
        if (a[1]!=='null'){
          list.push(a[1]);
          var count = 0;
          for(var i=0;i<list.length;i++){
            if (list[i] === a[1]){
              count+=1;
            }
          }
          if (count<2){
            if (a[1]=='person'){
              var ran = distance1[0][Math.floor(Math.random() * 2)];
              console.log(ran);
              console.log(a[1]);
              let speech = new SpeechSynthesisUtterance();
              speech.lang = "en-US";
              speech.text = a[1]+' detected in ' +ran+ ' meter';
              speech.volume = 1;
              speech.rate = 1;
              speech.pitch = 1;
              window.speechSynthesis.speak(speech);
            }
            else{
              var count1 = 0;
              for(var j=0;j<dangerous.length;j++){
                if (a[1] == dangerous[j]){
                  var ran = distance[0][Math.floor(Math.random() * 3)];
                  console.log(ran);
                  console.log(a[1]);
                  let speech = new SpeechSynthesisUtterance();
                  speech.lang = "en-US";
                  speech.text = 'alert dangerous object   ' +a[1]+ '   detected in ' +ran+ ' meter';
                  speech.volume = 1;
                  speech.rate = 0.8;
                  speech.pitch = 1;
                  window.speechSynthesis.speak(speech);
                  count1 += 1;
                  break;
                }
              }
              if (count1 != 1){
                var ran = distance[0][Math.floor(Math.random() * 3)];
                console.log(ran);
                console.log(a[1]);
                let speech = new SpeechSynthesisUtterance();
                speech.lang = "en-US";
                speech.text = a[1]+' detected in ' +ran+ ' meter';
                speech.volume = 1;
                speech.rate = 1;
                speech.pitch = 1;
                window.speechSynthesis.speak(speech);
              }
              
            }
            
          }
          // //var check = 0;
          // if (count<3){
          // // while (check<3){
          // //   check += 1;
          //   let speech = new SpeechSynthesisUtterance();
          //   speech.lang = "en-US";
          //   speech.text = a[1]+' detected in ' +ran+ ' meter';
          //   speech.volume = 1;
          //   speech.rate = 1;
          //   speech.pitch = 1;
          //   window.speechSynthesis.speak(speech);
          //   console.log(ran);
          // }
            
        }
      }
      
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;