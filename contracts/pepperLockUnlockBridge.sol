// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract PepperLockUnlockBridge {
    address public owner;
    address public relayer;
    IERC20 public weth;
    uint256 public nonce;

    mapping(bytes32 => bool) public processedBurns;

    event Locked(address indexed user, uint256 amount, uint256 destinationChainId, uint256 nonce);
    event Unlocked(address indexed user, uint256 amount, bytes32 burnTxHash);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyRelayer() {
        require(msg.sender == relayer, "Not relayer");
        _;
    }

    constructor(address _weth) {
        owner = msg.sender;
        weth = IERC20(_weth);
    }

    function setRelayer(address _relayer) external onlyOwner {
        relayer = _relayer;
    }

    function lock(uint256 amount, uint256 destinationChainId) external {
        require(weth.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit Locked(msg.sender, amount, destinationChainId, nonce++);
    }

    function unlock(address to, uint256 amount, bytes32 burnTxHash) external onlyRelayer {
        require(!processedBurns[burnTxHash], "Already processed");
        processedBurns[burnTxHash] = true;
        require(weth.transfer(to, amount), "Transfer failed");
        emit Unlocked(to, amount, burnTxHash);
    }
}
