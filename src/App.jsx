import GameInitialiser from "./components/GameInitialiser";
import { GameBoard } from "./components/GameBoard";
import GameFinish from "./components/GameFinish";
import { useRPS } from "./hooks/useRPS";
import { useContext } from "react";
import { ContractContext } from "./contexts/ContractContext";
import { Spinner } from "./components/Spinner";

function App() {
  const {
    gameState,
    getContractInfo,
    play,
    solve,
    firstPlayerTimeout,
    secondPlayerTimeout,
  } = useRPS();

  const { loading, error, currentAccount } = useContext(ContractContext);

  const remainingTime =
    parseInt(gameState.lastAction) * 1000 + parseInt(gameState.timeout) * 1000;

  let content;

  if (error) {
    content = <p className="text-lg text-red-800">{error.message}</p>;
  } else if (
    gameState.firstPlayer &&
    currentAccount.toUpperCase() !== gameState.firstPlayer.toUpperCase() &&
    currentAccount.toUpperCase() !== gameState.secondPlayer.toUpperCase()
  ) {
    content = (
      <p className="text-lg text-red-800">You are not a member of this game</p>
    );
  } else if (loading) {
    content = <Spinner />;
  } else {
    if (!gameState.firstPlayer) {
      content = <GameInitialiser />;
    } else if (!gameState.secondPlayerMove && gameState.secondPlayer) {
      content = (
        <GameBoard
          stake={gameState.stake}
          secondPlayer={gameState.secondPlayer}
          firstPlayer={gameState.firstPlayer}
          timeRemaining={remainingTime}
          play={play}
          secondPlayerTimeout={secondPlayerTimeout}
        />
      );
    } else if (gameState.secondPlayer && gameState.stake === 0) {
      content = <div>Game over</div>;
    } else {
      content = (
        <GameFinish
          secondPlayer={gameState.secondPlayer}
          firstPlayer={gameState.firstPlayer}
          solve={solve}
          timeRemaining={remainingTime}
          firstPlayerTimeout={firstPlayerTimeout}
        />
      );
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-blue-200 to-purple-200">
      {content}
    </div>
  );
}

export default App;
