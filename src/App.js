import { useContext, useEffect, useState } from "react";
import GameInitialiser  from "./components/GameInitialiser";
import { ContractContext } from "./contexts/ContractContext";
import {GameBoard} from "./components/GameBoard";
import GameFinish from "./components/GameFinish";

function App() {
  const { RPSContract} = useContext(ContractContext)
  const [secondPlayerMove, setSecondPlayerMove] = useState()

  useEffect(()=>{
   const getSecondPlayerMove = async() =>{
      const move = await RPSContract.c2();
      setSecondPlayerMove(move)
   }

   getSecondPlayerMove()
  },[RPSContract])

  return (
    <>
    {secondPlayerMove === 0 ?  RPSContract?<GameBoard/>  : <GameInitialiser/> : <GameFinish/>
     }
    </>
    
  );
}

export default App;
