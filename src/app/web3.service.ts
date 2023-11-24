import Web3 from 'web3';
import { Injectable } from '@angular/core';
import CounterContract from '../../build/contracts/Counter.json';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: Web3;
  private counterContract: any;
  private contractABI = CounterContract.abi;
  private blockchainUrl = 'http://127.0.0.1:8545';

  constructor() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      window.ethereum.enable().catch((error: any) => {
        // User denied account access
        console.error('User denied account access');
      });
    } else {
      // If MetaMask is not available, use a local provider (Ganache)
      // Instead of this:
      // this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

      // Use this:
      this.web3 = new Web3(new Web3.providers.HttpProvider(this.blockchainUrl));
    }
    this.loadContract();
  }

  async loadContract() {
    try {
      const networkId = await this.web3.eth.net.getId();
      const networkIdString = networkId.toString(); // Convert to string
      const deployedNetwork = (CounterContract.networks as Record<string, any>)[
        networkIdString
      ]; // Type assertion
      if (deployedNetwork) {
        this.counterContract = new this.web3.eth.Contract(
          this.contractABI,
          deployedNetwork.address
        );
      } else {
        console.error(
          'Contract not deployed on network with ID:',
          networkIdString
        );
      }
    } catch (error) {
      console.error('Error loading contract:', error);
    }
  }

  async incrementCounter() {
    await this.loadContract(); // Ensure contract is loaded
    const accounts = await this.web3.eth.getAccounts();
    return this.counterContract.methods.increment().send({ from: accounts[0] });
  }

  async getCounterValue() {
    await this.loadContract(); // Ensure contract is loaded
    const value = await this.counterContract.methods.getCount().call();
    return parseInt(value, 10); // Parse the result as an integer
  }

  async decrementCounter() {
    await this.loadContract(); // Ensure contract is loaded
    const accounts = await this.web3.eth.getAccounts();
    return this.counterContract.methods.decrement().send({ from: accounts[0] });
  }
}
