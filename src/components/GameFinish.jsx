import { useContext, useState } from "react";
import { ContractContext } from "../contexts/ContractContext";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Input from "./Input";
import Timer from "./Timer";

export const GameFinish = ({
  secondPlayer,
  secondPlayerTimeout,
  secondPlayerMove,
  solve,
  timeRemaining,
  firstPlayerTimeout,
  stake,
}) => {
  const [salt, setSalt] = useState();
  const [move, setMove] = useState(1);
  const { currentAccount } = useContext(ContractContext);

  if (currentAccount?.toUpperCase() === secondPlayer?.toUpperCase()) {
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {secondPlayerMove ? (
          <div className="flex justify-center items-center gap-4">
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
          </div>
        ) : (
          <Timer
            targetTime={timeRemaining}
            timeout={secondPlayerTimeout}
            stake={stake}
            text="If Second player fails to response in the time limit, you can also withdraw all the assets in"
          />
        )}
      </div>
    </div>
  );
};

export default GameFinish;
