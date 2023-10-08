import RPSAbi from "../contractsABI/rps.json";
import { ethers } from "ethers";
import { Hasher } from "./Hasher";

export const RPSFactory = (player, move, salt, value, signer) => {
  const factory = new ethers.ContractFactory(
    RPSAbi.abi,
    RPSAbi.bytecode,
    signer
  );

  const createContract = async () => {
    const secret = await Hasher(signer).getHash(move, salt);
    return factory.deploy(secret, player, { value });
  };

  return { createContract };
};
