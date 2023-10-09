import { ethers } from "ethers";
import OrchestratorAbi from "../contractsABI/orchestrator.json";

export const Orchestrator = (signer) => {
  const contract = new ethers.Contract(
    "0x4E396C640BB66C3bc2663929C8222970d6158f3f",
    OrchestratorAbi,
    signer
  );

  const getGameAddress = async () => {
    const address = await contract.connect(signer).getGameAddress();
    return address;
  };

  const setGameAddress = async (address) => {
    try {
      const tx = await contract.connect(signer).setGameAddress(address);
      await tx.wait();
    } catch (e) {
      console.error(e);
    }
  };

  return { getGameAddress, setGameAddress };
};

export default Orchestrator;
