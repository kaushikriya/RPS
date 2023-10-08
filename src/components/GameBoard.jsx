import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../contexts/ContractContext";
import GameFinish from "./GameFinish";

export const GameBoard=()=>{
    const {RPSContract, currentAccount} = useContext(ContractContext)
    const [move, setMove] = useState(0)
    const [contractInfo, setContractInfo] = useState({
        secondPlayer: null,
        timeout: null,
        lastAction: null,
        stake: null
    })

    useEffect(()=>{
        const getContractInfo= async()=>{
            try{
                const currentStake = await RPSContract.stake();
                console.log(currentStake)
                const player = await RPSContract.j2()
                const timeout= await RPSContract.TIMEOUT()
                const lastAction = await RPSContract.lastAction()
                setContractInfo({
                    secondPlayer:player,
                    timeout: timeout,
                    lastAction:lastAction,
                    stake: currentStake
                })
            }
            catch(e){
                console.error(e)
            }   
          }
        getContractInfo()
    },[RPSContract])

    const handleMove=async()=>{
        try{
            const value = contractInfo.stake
            await RPSContract.play(move,{ value })
        }catch(e){
            console.log(e)
        }    
    }

    console.log( typeof contractInfo.secondPlayer, typeof currentAccount)

    if(contractInfo.secondPlayer!== null && currentAccount.toUpperCase() === contractInfo.secondPlayer.toUpperCase()){
        return(
            <div>
                <p>Current stake : ${contractInfo.stake.toString()}</p>
                <input id='move' placeholder="move" onChange={e => setMove(e.target.value)} />
                <button onClick={handleMove}>Make move</button>
            </div>
        )
    }

    return <div>Timeout for second player</div> 

}

export default GameBoard;