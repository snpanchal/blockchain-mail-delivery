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
		"constant": true,
		"inputs": [
			{
				"name": "mailId",
				"type": "uint256"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getLocationReport",
		"outputs": [
			{
				"name": "currentAddress",
				"type": "bytes32"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"constant": true,
		"inputs": [
			{
				"name": "mailId",
				"type": "uint256"
			}
		],
		"name": "getMailInfo",
		"outputs": [
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
			},
			{
				"name": "deliveryStatus",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "mailId",
				"type": "uint256"
			}
		],
		"name": "getNumLocationReports",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
];

var contractAddress = "0xae3342638091ad31bff7ff8d45f8be95ed6383dd";

export {ABI};
export {contractAddress};
