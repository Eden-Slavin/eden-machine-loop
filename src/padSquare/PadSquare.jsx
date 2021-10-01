import { useEffect, useState } from "react";
import useSound from "use-sound";
import { BiMusic } from "react-icons/bi";
import "./padSquare.css";
function PadSquare(props) {
  /*library that play and stop mp3 file*/
  const [play, { stop }] = useSound(props.mpFile, { loop: true });
  /*State to know the pad is waiting to start to play next loop*/
  const [isWaiting, setIsWaiting] = useState(false);
  /*on click pad change status*/
  const handleClick = () => {
    props.setMusicStatusOfPad(props.positionInMusicStatus, !props.isOn);
  };

  /*Function play music check if the machine is in middle of a loop*/
  const playMusic = () => {
    /*If the machine is not in the middle of a loop play the sound*/
    if (props.isFirstFunction()) {
      play();
    } else {
      /*If the machine is in the middle of a loop set state waiting to true*/
      setIsWaiting(true);
    }
  };

  /*Function stop music*/
  const stopMusic = () => {
    stop();
  };

  /*Use effect if manager didn't said to stop and the pad is ON play music else stop music*/
  useEffect(() => {
    !props.managerSaidToStop && props.isOn ? playMusic() : stopMusic();
  }, [props.isOn, props.managerSaidToStop]);

  /*finish waiting*/
  useEffect(() => {
    if (props.managerSaidEndLoop && isWaiting && !props.managerSaidToStop) {
      play();
      setIsWaiting(false);
    }
  }, [isWaiting, props.managerSaidEndLoop]);

  return (
    <div
      className="Pad-Square d-flex align-items-center justify-content-center"
      onClick={handleClick}
    >
      <span>
        {props.name} <BiMusic />
      </span>
    </div>
  );
}

export default PadSquare;
