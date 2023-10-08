import GameInitialiser  from "./components/GameInitialiser";
import {GameBoard} from "./components/GameBoard";
import GameFinish from "./components/GameFinish";
import { useRPS } from "./hooks/useRPS";

function App() {
  const { gameState,
    getContractInfo,
    play,
    solve,
    firstPlayerTimeout,
    secondPlayerTimeout} = useRPS()

    if(!gameState.firstPlayer){
      return <GameInitialiser/>
    }

    console.log(typeof gameState.lastAction, typeof gameState.timeout)

    if(!gameState.secondPlayerMove && gameState.secondPlayer){
      return <GameBoard stake={gameState.stake} secondPlayer={gameState.secondPlayer} timeRemaining={parseInt(gameState.lastAction)+ parseInt(gameState.timeout)} play={play} secondPlayerTimeout={secondPlayerTimeout}/>
    }

    return <GameFinish secondPlayer={gameState.secondPlayer} solve={solve} timeRemaining={parseInt(gameState.lastAction)+ parseInt(gameState.timeout)} firstPlayerTimeout={firstPlayerTimeout}/>
}

export default App;
