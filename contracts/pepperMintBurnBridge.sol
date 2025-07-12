// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IPepperWETH {
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
}

contract PepperMintBurnBridge {
    address public owner;
    address public relayer;
    IPepperWETH public pWETH;
    uint256 public nonce;

    mapping(bytes32 => bool) public processedLocks;

    event Minted(address indexed user, uint256 amount, bytes32 lockTxHash);
    event Burned(address indexed user, uint256 amount, uint256 destinationChainId, uint256 nonce);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyRelayer() {
        require(msg.sender == relayer, "Not relayer");
        _;
    }

    constructor(address _pWETH) {
        owner = msg.sender;
        pWETH = IPepperWETH(_pWETH);
    }

    function setRelayer(address _relayer) external onlyOwner {
        relayer = _relayer;
    }

    function mint(address to, uint256 amount, bytes32 lockTxHash) external onlyRelayer {
        require(!processedLocks[lockTxHash], "Already minted");
        processedLocks[lockTxHash] = true;
        pWETH.mint(to, amount);
        emit Minted(to, amount, lockTxHash);
    }

    function burn(uint256 amount, uint256 destinationChainId) external {
        pWETH.burn(msg.sender, amount);
        emit Burned(msg.sender, amount, destinationChainId, nonce++);
    }
}
