// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Counter {
    uint256 private count = 0;

    // Function to get the current count
    function getCount() public view returns (uint256) {
        return count;
    }

    // Function to increment the count
    function increment() public {
        count += 1;
    }

    function decrement() public {
        require(count > 0, "Counter cannot be negative");
        count -= 1;
    }
}
