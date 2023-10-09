import { ethers } from "ethers";
import HasherAbi from "../contractsABI/hasher.json";

export const Hasher = (signer) => {
  const contract = new ethers.Contract(
    "0x99e0D724F22979F6d8c2041961a509A86149D4a5",
    HasherAbi,
    signer
  );

  const getHash = async (move, salt) => {
    return await contract.connect(signer).hash(move, salt);
  };

  return { getHash };
};

export default Hasher;
