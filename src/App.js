import { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import futureFunk from "./sound/120_future_funk_beats_25.mp3";
import stutterBreakbeats from "./sound/120_stutter_breakbeats_16.mp3";
import heavyFunk from "./sound/Bass Warwick heavy funk groove on E 120 BPM.mp3";
import electricGuitar from "./sound/electric guitar coutry slide 120bpm - B.mp3";
import stompySlosh from "./sound/FUD_120_StompySlosh.mp3";
import grooveTanggu from "./sound/GrooveB_120bpm_Tanggu.mp3";
import mazePolitics from "./sound/MazePolitics_120_Perc.mp3";
import pas3Groove1 from "./sound/PAS3GROOVE1.03B.mp3";
import silentStar from "./sound/SilentStar_120_Em_OrganSynth.mp3";
import PadSquareCol from "./padSquare/PadSquareCol";
import "./App.css";

function App() {
  /*The time of the interval*/
  const loopCycleTimeInMilliSeconds = 8000;
  /*State to know that all the pads stop*/
  const [isStop, setIsStop] = useState(false);
  /*State to know the status of each pad*/
  const [musicStatus, setMusicStatus] = useState([
    { isPlaying: false, statusBeforeStop: false },
    { isPlaying: false, statusBeforeStop: false },
    { isPlaying: false, statusBeforeStop: false },
    { isPlaying: false, statusBeforeStop: false },
    { isPlaying: false, statusBeforeStop: false },
    { isPlaying: false, statusBeforeStop: false },
    { isPlaying: false, statusBeforeStop: false },
    { isPlaying: false, statusBeforeStop: false },
    { isPlaying: false, statusBeforeStop: false },
  ]);

  /*State to know if end loop and more sound can start to play*/
  const [isEndLoop, setIsEndLoop] = useState(false);
  /*State to know the interval id*/
  const [intervalId, setIntervalId] = useState(null);
  /*Function when the user select on Play button*/
  const playFunction = () => {
    setIsStop(false);
    const newMusicStatus = [...musicStatus];
    for (let i = 0; i < newMusicStatus.length; i++) {
      musicStatus[i].isPlaying = musicStatus[i].statusBeforeStop;
    }
    setMusicStatus(newMusicStatus);
  };
  /*Function when the user select on Stop button*/
  const stopFunction = () => {
    setIsStop(true);
    const newMusicStatus = [...musicStatus];
    for (let i = 0; i < newMusicStatus.length; i++) {
      musicStatus[i].statusBeforeStop = musicStatus[i].isPlaying;
      musicStatus[i].isPlaying = false;
    }
    setMusicStatus(newMusicStatus);
  };
  /*Function check if the current pad is first to play*/
  const isFirstFunction = () => {
    return countMusicPlaying() <= 1 || !intervalId;
  };
  /*Function that update the music status of specific pad*/
  const setMusicStatusOfPad = (positionInMusicStatus, isOn) => {
    const newMusicStatus = [...musicStatus];
    newMusicStatus[positionInMusicStatus].isPlaying = isOn;
    newMusicStatus[positionInMusicStatus].statusBeforeStop = isOn;
    setMusicStatus(newMusicStatus);
  };
  /*Function that count how many pads are now playing*/
  const countMusicPlaying = () => {
    let numOfPlaying = 0;
    for (let i = 0; i < musicStatus.length; i++) {
      if (musicStatus[i].isPlaying) {
        numOfPlaying++;
      }
    }
    return numOfPlaying;
  };
  /*Use effect that check if music is playing*/
  useEffect(() => {
    /*If there is no sound that playing end interval*/
    if (countMusicPlaying() === 0) {
      clearInterval(intervalId);
      setIntervalId(null);
      /*If his the first sound start interval*/
    } else if (countMusicPlaying() === 1 || !intervalId) {
      let currentIntervalId = setInterval(function () {
        /*After each interval said end loop*/
        setIsEndLoop(true);
      }, loopCycleTimeInMilliSeconds);
      setIntervalId(currentIntervalId);
    }
  }, [musicStatus]);

  useEffect(() => {
    /*Change the state of end loop*/
    if (isEndLoop) setIsEndLoop(false);
  }, [isEndLoop]);

  return (
    <div className="App Pad-Square-Text">
      <Container className="mt-3">
        <Row className="mt-2 mb-2">
          <h1 className="My-Header">Eden Slavin Loop Machine</h1>
        </Row>
        <Row className="mt-2 mb-2">
          <PadSquareCol
            name="Future funk"
            mpFile={futureFunk}
            managerSaidToStop={isStop}
            managerSaidEndLoop={isEndLoop}
            isOn={musicStatus[0].isPlaying}
            positionInMusicStatus={0}
            isFirstFunction={isFirstFunction}
            setMusicStatusOfPad={setMusicStatusOfPad}
          />
          <PadSquareCol
            name="Stutter breakbeats"
            mpFile={stutterBreakbeats}
            managerSaidToStop={isStop}
            managerSaidEndLoop={isEndLoop}
            isOn={musicStatus[1].isPlaying}
            positionInMusicStatus={1}
            isFirstFunction={isFirstFunction}
            setMusicStatusOfPad={setMusicStatusOfPad}
          />
          <PadSquareCol
            name="Heavy funk"
            mpFile={heavyFunk}
            managerSaidToStop={isStop}
            managerSaidEndLoop={isEndLoop}
            isOn={musicStatus[2].isPlaying}
            positionInMusicStatus={2}
            isFirstFunction={isFirstFunction}
            setMusicStatusOfPad={setMusicStatusOfPad}
          />
        </Row>
        <Row className="mt-2 mb-2">
          <PadSquareCol
            name="Electric guitar"
            mpFile={electricGuitar}
            managerSaidToStop={isStop}
            managerSaidEndLoop={isEndLoop}
            isOn={musicStatus[3].isPlaying}
            positionInMusicStatus={3}
            isFirstFunction={isFirstFunction}
            setMusicStatusOfPad={setMusicStatusOfPad}
          />
          <PadSquareCol
            name="Stompy slosh"
            mpFile={stompySlosh}
            managerSaidToStop={isStop}
            managerSaidEndLoop={isEndLoop}
            isOn={musicStatus[4].isPlaying}
            positionInMusicStatus={4}
            isFirstFunction={isFirstFunction}
            setMusicStatusOfPad={setMusicStatusOfPad}
          />
          <PadSquareCol
            name="Groove tanggu"
            mpFile={grooveTanggu}
            managerSaidToStop={isStop}
            managerSaidEndLoop={isEndLoop}
            isOn={musicStatus[5].isPlaying}
            positionInMusicStatus={5}
            isFirstFunction={isFirstFunction}
            setMusicStatusOfPad={setMusicStatusOfPad}
          />
        </Row>
        <Row className="mt-2 mb-2">
          <PadSquareCol
            name="Maze politics"
            mpFile={mazePolitics}
            managerSaidToStop={isStop}
            managerSaidEndLoop={isEndLoop}
            isOn={musicStatus[6].isPlaying}
            positionInMusicStatus={6}
            isFirstFunction={isFirstFunction}
            setMusicStatusOfPad={setMusicStatusOfPad}
          />
          <PadSquareCol
            name="Pas3 groove1"
            mpFile={pas3Groove1}
            managerSaidToStop={isStop}
            managerSaidEndLoop={isEndLoop}
            isOn={musicStatus[7].isPlaying}
            positionInMusicStatus={7}
            isFirstFunction={isFirstFunction}
            setMusicStatusOfPad={setMusicStatusOfPad}
          />
          <PadSquareCol
            name="Silent star"
            mpFile={silentStar}
            managerSaidToStop={isStop}
            managerSaidEndLoop={isEndLoop}
            isOn={musicStatus[8].isPlaying}
            positionInMusicStatus={8}
            isFirstFunction={isFirstFunction}
            setMusicStatusOfPad={setMusicStatusOfPad}
          />
        </Row>
        <Row className="mt-5 mb-2 d-flex justify-content-center">
          <div style={{ width: "fit-content" }}>
            <Button onClick={playFunction} variant="outline-success">
              Play
            </Button>
          </div>
          <div style={{ width: "fit-content" }}>
            <Button onClick={stopFunction} variant="outline-danger">
              Stop
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default App;
