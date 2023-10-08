import { useContext, useState } from "react";
import { ContractContext } from "../contexts/ContractContext";
import Timer from "./Timer";

export const GameFinish =({secondPlayer, solve, timeRemaining, firstPlayerTimeout, stake})=>{
    const [salt, setSalt] = useState()
    const [move, setMove] = useState()
    const [gameFinished, setGameFinished] = useState(false)

    const {currentAccount} = useContext(ContractContext)

    if(currentAccount.toUpperCase() === secondPlayer.toUpperCase()){
        return <Timer targetTime={timeRemaining} timeout={firstPlayerTimeout} stake={stake}/>
    }

    const handleSolve = async()=>{
        try{
          await solve(move, salt)
          setGameFinished(true)
        }catch(e){
            console.log(e)
        }
    }

    return (<div>
        { gameFinished? <div>Game has Finished!</div> : <> <input title= 'salt' placeholder="salt" onChange={e => setSalt(e.target.value)}/>
        <input title= 'move' placeholder="move" onChange={e => setMove(e.target.value)}/>
        <button onClick={handleSolve}>Solve</button>
        </>}
    </div>)
}

export default GameFinish;