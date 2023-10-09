import { useContext, useState } from "react";
import { ContractContext } from "../contexts/ContractContext";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Input from "./Input";
import Timer from "./Timer";

export const GameFinish = ({
  secondPlayer,
  secondPlayerTimeout,
  solve,
  timeRemaining,
  firstPlayerTimeout,
  stake,
}) => {
  const [salt, setSalt] = useState();
  const [move, setMove] = useState();
  const [gameFinished, setGameFinished] = useState(false);

  const { currentAccount } = useContext(ContractContext);

  if (currentAccount.toUpperCase() === secondPlayer.toUpperCase()) {
    return (
      <Timer
        targetTime={timeRemaining}
        timeout={firstPlayerTimeout}
        stake={stake}
        text="Waiting for first player to solve the game, you can withdraw your assets in"
      />
    );
  }

  const handleSolve = async () => {
    try {
      await solve(move, salt);
      setGameFinished(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {gameFinished ? (
        <p className="text-lg">Game has Finished!</p>
      ) : (
        <>
          {" "}
          <Input
            title="salt"
            value={salt}
            placeholder="salt"
            onChange={(e) => setSalt(e.target.value)}
          />
          <Dropdown value={move} onChange={setMove} />
          <Button disabled={move === 0} onClick={handleSolve}>
            Solve
          </Button>
          <Timer
            targetTime={timeRemaining}
            timeout={secondPlayerTimeout}
            stake={stake}
            text="If First player fails to response in the time limit, you can also withdraw all the assets"
          />
        </>
      )}
    </div>
  );
};

export default GameFinish;
