// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "hardhat/console.sol";


contract TokenCreator is ERC20, Ownable {

    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    uint256 public nonce;
    address tokenOwner;

    constructor(
        address _owner,
        string memory _tokenName,
        string memory _symbol
    )
        ERC20(_tokenName, _symbol)
        Ownable(msg.sender)
    {
        tokenOwner = _owner;
    }

    function mint(
        address assetOwner,
        uint256 amount,
        uint256 _nonce,
        uint256 deadline,
        bytes calldata owner_signature,
        bytes calldata user_signature
    ) external {

        require(_nonce == nonce + 1, "Invalid nonce");
        require(block.timestamp <= deadline, "Signature expired");

        bool ownerSigned = verifyOwner(assetOwner, amount, _nonce, deadline, owner_signature);
        bool userSigned = verifyUser(assetOwner, amount, _nonce, deadline, user_signature);
        require(ownerSigned,"Backend Not Authorized");
        require(userSigned, "User Not Authorized");
        nonce = _nonce;

        _mint(assetOwner, amount);
    }

    function verifyOwner( 
        address assetOwner,
        uint256 amount,
        uint256 _nonce,
        uint256 deadline,
        bytes calldata signature) private view returns(bool){

        bytes32 messageHash = keccak256(
            abi.encode(
                assetOwner,
                amount,
                _nonce,
                deadline,
                address(this)
            )
        );

        bytes32 ethSignedMessageHash =
            messageHash.toEthSignedMessageHash();


        address signer = ECDSA.recover(ethSignedMessageHash, signature);
        console.log(signer, owner());
    
        return (signer == owner());
          
    }

    function verifyUser( 
        address assetOwner,
        uint256 amount,
        uint256 _nonce,
        uint256 deadline,
        bytes calldata signature) private view returns(bool){

        bytes32 messageHash = keccak256(
            abi.encode(
                assetOwner,
                amount,
                _nonce,
                deadline,
                address(this)
            )
        );

        bytes32 ethSignedMessageHash =
            messageHash.toEthSignedMessageHash();


        address signer = ECDSA.recover(ethSignedMessageHash, signature);
        console.log(signer, owner());
    
        return (signer == assetOwner);
          
    }
}