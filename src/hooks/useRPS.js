import { ethers } from 'ethers';
import { useCallback } from 'react';
import { useContext, useEffect, useState } from 'react';
import { ContractContext } from '../contexts/ContractContext';
import Orchestrator from '../contracts/Orchestrator';

export const useRPS = () => {
  const {RPSContract, signer, setLoading, setError, provider} = useContext(ContractContext)

  const [gameState, setGameState] = useState({
    stake: undefined,
    secondPlayerMove: undefined,
    timeout: undefined,
    firstPlayer: undefined,
    secondPlayer: undefined,
    lastAction: undefined
  });   

  const getContractInfo = useCallback( async () => {
    if(!RPSContract) return false;
    try {
      const stake = await RPSContract.connect(signer).stake();
      const secondPlayerMove = await RPSContract.connect(signer).c2();
      const timeout = await RPSContract.connect(signer).TIMEOUT();
      const firstPlayer = await RPSContract.connect(signer).j1();
      const secondPlayer = await RPSContract.connect(signer).j2();
      const lastAction = await RPSContract.connect(signer).lastAction();
      setGameState({
        stake,
        secondPlayerMove,
        timeout,
        firstPlayer,
        secondPlayer,
        lastAction
      });
      return true
    } catch (error) {
      setError(error)
      console.error('Error fetching contract info:', error);
      return false
    }
  },[RPSContract, setError, signer]);

  useEffect(() => {
    if(!provider) return;
    const subscribeToNewBlocks = async () => {
      try {
        provider.on('block', (blockNumber) => {
          getContractInfo()
          
        });
      } catch (error) {
        console.error('Error setting up block subscription:', error);
      }
    };

    subscribeToNewBlocks();
  }, [getContractInfo, provider]);


  useEffect(() => {
    if (!provider) return;
    provider.on('block', blockNumber => {
        if (blockNumber && typeof blockNumber === 'number') {
            getContractInfo()
        }
    });
    return () => {
        provider.removeAllListeners('block');
    };
}, [getContractInfo, provider]);

  const play = async (move, value) => {
    if(!RPSContract || !signer){
      throw new Error('No signer available')
    };
    try {
      setLoading(true)
      const tx= await RPSContract.connect(signer).play(move, {value});
      const contractReceipt= await tx.wait()
      if(contractReceipt && contractReceipt.blockNumber ){
        const infoTx = await getContractInfo()
        if(infoTx){
          setLoading(false)
        }
        else{
          setError('Failed to get data')
        }
      }
    } catch (error) {
      setError(error)
      console.error('Error calling play function:', error);
    }
  };

  const solve = async (move, salt) => {
    if(!RPSContract || !signer){
      throw new Error('No signer available')
    };
    try {
      setLoading(true)
      const tx = await RPSContract.connect(signer).solve(move, salt);
      await Orchestrator(signer).setGameAddress(ethers.constants.AddressZero)
      const contractReceipt= await tx.wait()
      if(contractReceipt && contractReceipt.blockNumber ){
        const infoTx = await getContractInfo()
        if(infoTx){
          setLoading(false)
        }else{
          setError('Failed to get data')
        }
      }
    } catch (error) {
      setError(error)
      console.error('Error calling solve function:', error); 
    }
  }; 

  const firstPlayerTimeout = async () => {
    if(!RPSContract || !signer){
      throw new Error('No signer available')
    };
    try {
      setLoading(true)
      const tx = await RPSContract.connect(signer).j1Timeout();
      await Orchestrator(signer).setGameAddress(ethers.constants.AddressZero)
      const contractReceipt= await tx.wait()
      if(contractReceipt && contractReceipt.blockNumber ){
        const infoTx = await getContractInfo()
        if(infoTx){
          setLoading(false)
        }else{
          setError('Failed to get data')
        }
      }
    } catch (error) {
      setError(error)
      console.error('Error calling firstPlayerTimeout function:', error);
    }
  };

  const secondPlayerTimeout = async () => {
    if(!RPSContract || !signer){
      throw new Error('No signer available')
    };
    try {
      setLoading(true)
      const tx = await RPSContract.connect(signer).j2Timeout();
      await Orchestrator(signer).setGameAddress(ethers.constants.AddressZero)
      const contractReceipt= await tx.wait()
      if(contractReceipt && contractReceipt.blockNumber ){
        const infoTx = await getContractInfo()
        if(infoTx){
          setLoading(false)
        }else{
          setError('Failed to get data')
        }
      }
    } catch (error) {
      setError(error)
      console.error('Error calling secondPlayerTimeout function:', error);
    }
  };


  return {
    gameState,
    getContractInfo,
    play,
    solve,
    firstPlayerTimeout,
    secondPlayerTimeout,
  };
};
