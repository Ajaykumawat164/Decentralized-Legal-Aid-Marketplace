// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract LegalAidMarketplace {
    address public owner;
    uint256 public caseCounter;

    enum CaseStatus { Open, InProgress, Resolved, Closed }

    struct LegalCase {
        uint256 id;
        address payable client;
        string description;
        uint256 budget;
        CaseStatus status;
        address payable lawyer;
    }

    struct Lawyer {
        string name;
        string specialization;
        bool isRegistered;
    }

    mapping(address => Lawyer) public lawyers;
    mapping(uint256 => LegalCase) public cases;

    event LawyerRegistered(address indexed lawyer, string name);
    event CaseCreated(uint256 indexed caseId, address indexed client);
    event CaseTaken(uint256 indexed caseId, address indexed lawyer);
    event CaseResolved(uint256 indexed caseId);
    event PaymentReleased(uint256 indexed caseId, address indexed lawyer, uint256 amount);

    modifier onlyRegisteredLawyer() {
        require(lawyers[msg.sender].isRegistered, "Not a registered lawyer");
        _;
    }

    modifier onlyClient(uint256 caseId) {
        require(cases[caseId].client == msg.sender, "Not the case client");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerLawyer(string calldata _name, string calldata _specialization) external {
        require(!lawyers[msg.sender].isRegistered, "Already registered");
        lawyers[msg.sender] = Lawyer({
            name: _name,
            specialization: _specialization,
            isRegistered: true
        });
        emit LawyerRegistered(msg.sender, _name);
    }

    function createCase(string calldata _description) external payable {
        require(msg.value > 0, "Budget must be greater than zero");

        caseCounter++;
        cases[caseCounter] = LegalCase({
            id: caseCounter,
            client: payable(msg.sender),
            description: _description,
            budget: msg.value,
            status: CaseStatus.Open,
            lawyer: payable(address(0))
        });

        emit CaseCreated(caseCounter, msg.sender);
    }

    function takeCase(uint256 caseId) external onlyRegisteredLawyer {
        LegalCase storage legalCase = cases[caseId];
        require(legalCase.status == CaseStatus.Open, "Case is not open");
        require(legalCase.lawyer == address(0), "Case already taken");

        legalCase.lawyer = payable(msg.sender);
        legalCase.status = CaseStatus.InProgress;

        emit CaseTaken(caseId, msg.sender);
    }

    function resolveCase(uint256 caseId) external onlyClient(caseId) {
        LegalCase storage legalCase = cases[caseId];
        require(legalCase.status == CaseStatus.InProgress, "Case not in progress");
        require(legalCase.lawyer != address(0), "No lawyer assigned");

        legalCase.status = CaseStatus.Resolved;

        (bool success, ) = legalCase.lawyer.call{value: legalCase.budget}("");
        require(success, "Payment transfer failed");

        emit CaseResolved(caseId);
        emit PaymentReleased(caseId, legalCase.lawyer, legalCase.budget);
    }

    function getCase(uint256 caseId) external view returns (LegalCase memory) {
        return cases[caseId];
    }

    function getLawyer(address lawyerAddress) external view returns (Lawyer memory) {
        return lawyers[lawyerAddress];
    }
}

