let contract;
let web3;

const contractAddress = "0xBa2B9d815b2272EdD00d81b7979Bba07903dA9a8";
const contractABI = [[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "client",
				"type": "address"
			}
		],
		"name": "CaseCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			}
		],
		"name": "CaseResolved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "lawyer",
				"type": "address"
			}
		],
		"name": "CaseTaken",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "lawyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "LawyerRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "lawyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PaymentReleased",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "caseCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "cases",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "client",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "budget",
				"type": "uint256"
			},
			{
				"internalType": "enum LegalAidMarketplace.CaseStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "address payable",
				"name": "lawyer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "createCase",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			}
		],
		"name": "getCase",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "client",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "budget",
						"type": "uint256"
					},
					{
						"internalType": "enum LegalAidMarketplace.CaseStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "address payable",
						"name": "lawyer",
						"type": "address"
					}
				],
				"internalType": "struct LegalAidMarketplace.LegalCase",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "lawyerAddress",
				"type": "address"
			}
		],
		"name": "getLawyer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "specialization",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isRegistered",
						"type": "bool"
					}
				],
				"internalType": "struct LegalAidMarketplace.Lawyer",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lawyers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "specialization",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_specialization",
				"type": "string"
			}
		],
		"name": "registerLawyer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			}
		],
		"name": "resolveCase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			}
		],
		"name": "takeCase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]];

window.addEventListener("load", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });
    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Please install MetaMask to use this app.");
  }
});

async function registerLawyer() {
  const name = document.getElementById("lawyerName").value;
  const specialization = document.getElementById("specialization").value;
  const accounts = await web3.eth.getAccounts();
  await contract.methods.registerLawyer(name, specialization).send({ from: accounts[0] });
  alert("Lawyer registered!");
}

async function createCase() {
  const desc = document.getElementById("caseDescription").value;
  const budget = document.getElementById("caseBudget").value;
  const accounts = await web3.eth.getAccounts();
  await contract.methods.createCase(desc).send({ from: accounts[0], value: web3.utils.toWei(budget, "ether") });
  alert("Case created!");
}

async function takeCase() {
  const caseId = document.getElementById("caseIdToTake").value;
  const accounts = await web3.eth.getAccounts();
  await contract.methods.takeCase(caseId).send({ from: accounts[0] });
  alert("Case taken!");
}

async function resolveCase() {
  const caseId = document.getElementById("caseIdToResolve").value;
  const accounts = await web3.eth.getAccounts();
  await contract.methods.resolveCase(caseId).send({ from: accounts[0] });
  alert("Case resolved!");
}
