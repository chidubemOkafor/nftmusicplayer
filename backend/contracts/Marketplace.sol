// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Marketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _nftIds;

    address payable public seller;
    // uint256 public createTokenFee = 0.02 ether;

    //mappings
    mapping(uint256 => bool) public isListed;
    mapping(uint256 => uint256) public price;
    mapping(uint256 => uint256) public marketPlaceAddress;

    //modifier
    modifier onlyListed(uint256 _nftId) {
        require(isListed[_nftId], "token must listed");
        _;
    }

    //constructor
    constructor() ERC721("Vidduo", "vdo") {}

    function list(uint256 _nftId, uint256 _listingPrice) public {
        require(msg.sender == ownerOf(_nftId), "you are not the owner"); //this to require that the message sender is the sender of the address
        _transfer(msg.sender, address(this), _nftId);
        isListed[_nftId] = true;
        price[_nftId] = _listingPrice;
        seller = payable(msg.sender);
    }

    function updateListPrice(
        uint256 _nftId,
        uint256 _price
    ) public onlyListed(_nftId) {
        price[_nftId] = _price;
    }

    function buy(uint256 _nftId) public payable onlyListed(_nftId) {
        require(msg.value == price[_nftId], "not equal to price");
        finalizeSale(_nftId);
    }

    function createToken(string memory _tokenUri, uint256 _price) public {
        require(_price > 0, "value must be greater than zero");
        // require(msg.value == createTokenFee, "value no create token fee");
        _nftIds.increment();
        uint256 newItemId = _nftIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenUri);
        list(newItemId, _price);
    }

    // function getUnSoldNft() public view returns() {
    //     return
    // }

    function totalsupply() public view returns (uint256) {
        return _nftIds.current();
    }

    // this is a fallback function for recieving ether
    receive() external payable {}

    function finalizeSale(uint256 _nftId) private onlyListed(_nftId) {
        _transfer(ownerOf(_nftId), msg.sender, _nftId);
        seller.transfer(msg.value);
        price[_nftId] = 0;
        isListed[_nftId] = false;
    }

    // this returns the balance of the contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
