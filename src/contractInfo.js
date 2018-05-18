var ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "mailType",
				"type": "uint8"
			},
			{
				"name": "sender",
				"type": "bytes32"
			},
			{
				"name": "recipient",
				"type": "bytes32"
			}
		],
		"name": "newMail",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "mailId",
				"type": "uint256"
			},
			{
				"name": "currentAddress",
				"type": "bytes32"
			}
		],
		"name": "markDeliveryError",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "mailId",
				"type": "uint256"
			}
		],
		"name": "completeDelivery",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "mailId",
				"type": "uint256"
			},
			{
				"name": "currentAddress",
				"type": "bytes32"
			}
		],
		"name": "newLocationReport",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// contractAddress

export {ABI};