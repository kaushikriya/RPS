import { useContext, useState } from "react";
import { ContractContext } from "../contexts/ContractContext";
import Button from "./Button";
import Input from "./Input";
import Dropdown from "./Dropdown";

export const GameInitialiser = () => {
  const { currentAccount, connectWallet, startGame } =
    useContext(ContractContext);
  const [stake, setStake] = useState();
  const [salt, setSalt] = useState();
  const [move, setMove] = useState(1);
  const [player, setPlayer] = useState();

  if (!currentAccount) {
    return <Button onClick={connectWallet}>Connect</Button>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <p className=" text-lg">Stake value should be greater than 0</p>
      <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-8 focus:none p-8">
        <Input
          id="stake"
          placeholder="Stake"
          value={stake}
          onChange={(event) => {
            setStake(event.target.value);
          }}
        />
        <Input
          id="salt"
          placeholder="Salt"
          value={salt}
          onChange={(event) => {
            setSalt(event.target.value);
          }}
        />
        <Dropdown value={move} onChange={setMove} />
        <Input
          id="player"
          placeholder="Player"
          value={player}
          onChange={(event) => {
            setPlayer(event.target.value);
          }}
        />
        <Button
          // disabled={move === undefined || move === 0 || stake === 0}
          onClick={() => startGame(player, move, salt, stake)}
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default GameInitialiser;
