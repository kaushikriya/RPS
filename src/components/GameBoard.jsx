import { useContext, useState } from "react";
import { ContractContext } from "../contexts/ContractContext";
import Timer from "../components/Timer";
import Dropdown from "./Dropdown";
import Button from "./Button";

export const GameBoard = ({
  stake,
  secondPlayer,
  firstPlayer,
  timeRemaining,
  play,
  secondPlayerTimeout,
}) => {
  const { currentAccount } = useContext(ContractContext);

  const [move, setMove] = useState(1);

  const handleMove = async () => {
    try {
      await play(move, stake);
    } catch (e) {
      console.log(e);
    }
  };

  if (
    secondPlayer !== null &&
    currentAccount.toUpperCase() === secondPlayer.toUpperCase()
  ) {
    return (
      <div className="flex flex-col justify-center items-center gap-10">
        <p className="text-lg">Current stake : {stake.toString()} wei</p>
        <div className="flex gap-5">
          <Dropdown value={move} onChange={setMove} />
          <Button disabled={move === 0} onClick={handleMove}>
            Make move
          </Button>
        </div>
      </div>
    );
  }

  if (
    firstPlayer !== null &&
    currentAccount.toUpperCase() === firstPlayer.toUpperCase()
  ) {
    return (
      <Timer
        targetTime={timeRemaining}
        timeout={secondPlayerTimeout}
        stake={stake}
        text="Waiting for second player to make a move, you can withdraw the assets in "
      />
    );
  }

  return <div>You are not a participant of this game</div>;
};

export default GameBoard;
