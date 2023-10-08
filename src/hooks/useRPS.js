import { useCallback } from 'react';
import { useContext, useEffect, useState } from 'react';
import { ContractContext } from '../contexts/ContractContext';

export const useRPS = () => {
  const {RPSContract, signer, setLoading, setError} = useContext(ContractContext)

  const [gameState, setGameState] = useState({
    stake: undefined,
    secondPlayerMove: undefined,
    timeout: undefined,
    firstPlayer: undefined,
    secondPlayer: undefined,
    lastAction: undefined
  });

  const getContractInfo = useCallback( async () => {
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
    } catch (error) {
      setError(error)
      console.error('Error fetching contract info:', error);
    }
  },[RPSContract, setError, signer]);

  useEffect(() => {
    if (RPSContract) {
      getContractInfo();

     
      const intervalId = setInterval(getContractInfo, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [RPSContract, getContractInfo]);

  const play = async (move, value) => {
    if(!RPSContract) return;
    try {
      setLoading(true)
      await RPSContract.connect(signer).play(move, {value});
      setLoading(false)
    } catch (error) {
      setError(error)
      console.error('Error calling play function:', error);
    }
  };

  const solve = async (move, salt) => {
    if(!RPSContract) return;
    try {
      setLoading(true)
      await RPSContract.connect(signer).solve(move, salt);
      setLoading(false)
    } catch (error) {
      setError(error)
      console.error('Error calling solve function:', error); 
    }
  }; 

  const firstPlayerTimeout = async () => {
    if(!RPSContract) return;
    try {
      setLoading(true)
      await RPSContract.connect(signer).j1Timeout();
      setLoading(false)
    } catch (error) {
      setError(error)
      console.error('Error calling firstPlayerTimeout function:', error);
    }
  };

  const secondPlayerTimeout = async () => {
    if(!RPSContract) return;
    try {
      setLoading(true)
      await RPSContract.connect(signer).j2Timeout();
      setLoading(false)
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
