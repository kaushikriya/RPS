import GameInitialiser from "./components/GameInitialiser";
import { GameBoard } from "./components/GameBoard";
import GameFinish from "./components/GameFinish";
import { useRPS } from "./hooks/useRPS";
import { useContext } from "react";
import { ContractContext } from "./contexts/ContractContext";

function App() {
  const {
    gameState,
    getContractInfo,
    play,
    solve,
    firstPlayerTimeout,
    secondPlayerTimeout,
  } = useRPS();

  const { loading, error } = useContext(ContractContext);

  if (loading) {
    return <div>Please wait...</div>;
  }

  console.log("error", error);

  if (error) {
    return <div>{error}</div>;
  }

  if (!gameState.firstPlayer) {
    return <GameInitialiser />;
  }

  const remainingTime =
    parseInt(gameState.lastAction) * 1000 + parseInt(gameState.timeout) * 1000;

  if (!gameState.secondPlayerMove && gameState.secondPlayer) {
    return (
      <GameBoard
        stake={gameState.stake}
        secondPlayer={gameState.secondPlayer}
        timeRemaining={remainingTime}
        play={play}
        secondPlayerTimeout={secondPlayerTimeout}
      />
    );
  }

  if (gameState.secondPlayer && gameState.stake === 0) {
    return <div>Game over</div>;
  }

  return (
    <GameFinish
      secondPlayer={gameState.secondPlayer}
      solve={solve}
      timeRemaining={remainingTime}
      firstPlayerTimeout={firstPlayerTimeout}
    />
  );
}

export default App;
