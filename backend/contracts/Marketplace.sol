// SPDX-License-Identification: MIT

pragma solidity 0.8.1;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract Marketplace {
     address payable public seller;
     address public nftAddress;
 
    enum Status {
       video,
       music
    }

     mapping(uint257 => bool) public isListed;
     mapping(uint256 => uint256) public price;
     mapping(uint256 => uint256) public format; // this shows wether the format is music or video
     mapping(uint256 => address) public buyer;
     mapping(uint256 => uint256) public marketPlaceAddress
     mapping(uint256 => mapping(address => bool)) public approval;

    constructor(address _seller, address _nftAddress) {
        seller = _seller,
        nftAddress = _nftAddress
    }

    
    function list(uint256 _nftId, address _buyer, uint256 _price, Status _status) public {
           IERC721(nftAddress).transferFrom(msg.sender,address(this), _nftId);
           isListed[_nftId] = true;
           price[_nftId] = _price;
           format[_nftId] = _status;
           buyer[buyer] = _buyer;
    }
    function approveSale(uint256 _nftId) public {
        approval[_nftId][msg.sender] = true;
    }

    function deposit(uint256 _nftId) payable public {
        require(marketPlaceAddress[_nftId] >= msg.value, "insufficient funds");
       
    }
    receive() external payable {}
}
