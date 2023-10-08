import { useContext, useState } from "react";
import { ContractContext } from "../contexts/ContractContext";

export const GameInitialiser = () => {
  const { currentAccount, connectWallet, startGame } =
    useContext(ContractContext);
  const [stake, setStake] = useState(0);
  const [salt, setSalt] = useState(0);
  const [move, setMove] = useState(0);
  const [player, setPlayer] = useState();

  if (!currentAccount) {
    return <button onClick={connectWallet}>Connect</button>;
  }

  return (
    <div>
      <input
        id="stake"
        placeholder="stake"
        onChange={(event) => {
          setStake(event.target.value);
        }}
      />
      <input
        id="salt"
        placeholder="salt"
        onChange={(event) => {
          setSalt(event.target.value);
        }}
      />
      <input
        id="move"
        placeholder="move"
        onChange={(event) => {
          setMove(event.target.value);
        }}
      />
      <input
        id="player"
        placeholder="player"
        onChange={(event) => {
          setPlayer(event.target.value);
        }}
      />
      <button onClick={() => startGame(player, move, salt, stake)}>
        Start Game
      </button>
    </div>
  );
};

export default GameInitialiser;
