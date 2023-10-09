import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { RPSFactory } from "../contracts/RPS";
import RPSAbi from "../contractsABI/rps.json";
import Orchestrator from "../contracts/Orchestrator";

export const ContractContext = React.createContext();

const { ethereum } = window;

export const ContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [signer, setSigner] = useState();
  const [RPSContract, setRPSContract] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      } else {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const provider = new ethers.BrowserProvider(ethereum);
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
          setSigner(await provider.getSigner());
          // setRPSContract(gameContract)
        }
      }
    } catch (error) {
      setError(error);
      console.log(error);
      throw new Error("Could not connect with ethereum");
    }
  };

  const startGame = async (player, move, salt, stake) => {
    console.log(player, move, salt, stake);
    try {
      if (!RPSContract && signer) {
        setLoading(true);
        const contract = await RPSFactory(
          player,
          move,
          salt,
          stake,
          signer
        ).createContract();
        await contract.waitForDeployment();
        setRPSContract(contract);
        await Orchestrator(signer).setGameAddress(contract.target);
        setLoading(false);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    // Listen for Metamask account changes
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount(null); // No connected account
      }
    };

    ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      // Cleanup: remove the event listener
      if (ethereum.removeListener) {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
      } else if (ethereum.off) {
        // For older versions of Metamask
        ethereum.off("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  useEffect(() => {
    const checkIfGameExists = async () => {
      const gameAddress = await Orchestrator(signer).getGameAddress();
      console.log(gameAddress);
      if (gameAddress !== ethers.ZeroAddress) {
        const contract = new ethers.Contract(gameAddress, RPSAbi.abi, signer);
        setRPSContract(contract);
      }
    };
    if (signer) {
      checkIfGameExists();
    }
  }, [signer]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <ContractContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        currentAccount,
        startGame,
        RPSContract,
        signer,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
