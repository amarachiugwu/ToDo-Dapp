const { ethers: etherjs } = ethers;
import abi from "../abi.js";
import { CONTRACT_ADDRESS, rpcUrl } from "../constant.js";

const signerProvider = new etherjs.providers.Web3Provider(window.ethereum);

const getContract = (
  isSigner = false,
  address = CONTRACT_ADDRESS,
  ABI = abi
) => {
  const provider = new etherjs.providers.JsonRpcProvider(rpcUrl);

  const signerOrProvider = new etherjs.providers.Web3Provider(window.ethereum);
  const signer = signerOrProvider.getSigner();

  const newProvider = isSigner ? signer : provider;
  return new etherjs.Contract(address, ABI, newProvider);
};

export default getContract;
export {signerProvider};
