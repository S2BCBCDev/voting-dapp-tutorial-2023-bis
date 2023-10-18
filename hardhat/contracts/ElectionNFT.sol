// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ElectionNFT is ERC721 {
    address public electionContractAddress;
    uint256 public electionId;
    uint256 private tokenIdCounter;
    string private baseTokenURI;
    mapping(uint256 => string) private tokenURIs;

    constructor(address _electionContractAddress) ERC721("Election NFT", "ENFT") {
        electionContractAddress = _electionContractAddress;
        
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseTokenURI(string memory _newBaseTokenURI) external {
        require(msg.sender == electionContractAddress, "Only the election contract can set base URI");
        baseTokenURI = _newBaseTokenURI;
    }

    function mintNFT(address _to, string memory _tokenURI) external {
        require(msg.sender == electionContractAddress, "Only the election contract can mint NFTs");
        _safeMint(_to, tokenIdCounter);
        tokenURIs[tokenIdCounter] = _tokenURI;
        tokenIdCounter++;
    }

    function getTokenURI(uint256 _tokenId) external view returns (string memory) {
        return tokenURIs[_tokenId];
    }

    

}
