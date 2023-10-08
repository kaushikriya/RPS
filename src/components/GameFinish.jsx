import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../contexts/ContractContext";

export const GameFinish =()=>{

    const {RPSContract} = useContext(ContractContext);
    const [secondPlayerMove, setSecondPlayerMove] = useState()
    const [salt, setSalt] = useState()
    const [move, setMove] = useState()
    const [gameFinished, setGameFinished] = useState(false)

    useEffect(()=>{
        const getContractInfo = async() =>{
            const move = await RPSContract.c2();
            setSecondPlayerMove(move)
         }
         
        getContractInfo()
    },[RPSContract])

    const handleSolve=async()=>{
        try{
            await RPSContract.solve(move, salt)
            setGameFinished(true);
        }
        catch(e){
            console.error(e)
        }
    }

    // if(secondPlayerMove !== 0){
    //    return(<div>Check for timeout</div>)
    // }

    return (<div>
        { gameFinished? <div>Game has Finished!</div> : <> <input title= 'salt' placeholder="salt" onChange={e => setSalt(e.target.value)}/>
        <input title= 'move' placeholder="move" onChange={e => setMove(e.target.value)}/>
        <button onClick={handleSolve}>Solve</button>
        </>}
       
    </div>)
}

export default GameFinish;