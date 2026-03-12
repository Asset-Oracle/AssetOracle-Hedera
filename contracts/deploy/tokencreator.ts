import { network } from "hardhat";

const CA = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

async function deploy_contract() {
  const { ethers } = await network.connect();
  const [signer0, signer1, signer2, signer3] = await ethers.getSigners();
  const factory = await ethers.getContractFactory("TokenCreator");
  const contract = await factory.deploy(signer2.address, "mansion", "MSN");
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log("deplyed at : ", address);
}

async function mintAsset() {
  const { ethers } = await network.connect();
  const [signer0, signer1, signer2, signer3] = await ethers.getSigners();
  const contract = await ethers.getContractAt("TokenCreator", CA);
  const now = Math.floor(Date.now() / 1000);
  const deadline = now + 2 * 60 * 1000;
  const nonce = await contract.nonce();
  const amount = ethers.parseEther("10000");
  console.log(signer2.address);
  const backend_packed = new ethers.AbiCoder().encode(
    ["address", "uint256", "uint256", "uint256", "address"],
    [signer2.address, amount, Number(nonce) + 1, deadline, CA.toLowerCase()],
  );

  const backend_hash = ethers.keccak256(backend_packed); // bytes32
  const backend_signature = await signer0.signMessage(
    ethers.getBytes(backend_hash),
  );

  const user_packed = new ethers.AbiCoder().encode(
    ["address", "uint256", "uint256", "uint256", "address"],
    [signer2.address, amount, Number(nonce) + 1, deadline, CA.toLowerCase()],
  );

  const user_hash = ethers.keccak256(backend_packed); // bytes32
  const user_signature = await signer2.signMessage(ethers.getBytes(user_hash));
  console.log(nonce);

  const mint = await contract.mint(
    signer2.address,
    amount,
    Number(nonce) + 1,
    deadline,
    backend_signature,
    user_signature,
  );

  const reciept = await mint.wait();
  console.log(reciept);
  const bal = await contract.balanceOf(signer2.address);
  console.log(bal);
}

async function main() {
  //await deploy_contract();
  await mintAsset();
}

main();
