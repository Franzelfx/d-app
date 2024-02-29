import Web3 from 'web3';
import { Injectable } from '@angular/core';
import CounterContract from '../../build/contracts/Counter.json';

declare let window: any;


@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3!: Web3;
  private counterContract!: any; // Using non-null assertion
  private contractABI = CounterContract.abi;
  private blockchainUrl = 'http://127.0.0.1:9545';

  constructor() {
    this.initWeb3();
  }

  private async initWeb3() {
    try {
      if (window.ethereum) {
        this.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else {
        this.web3 = new Web3(
          new Web3.providers.HttpProvider(this.blockchainUrl)
        );
      }
      await this.initContract();
    } catch (error) {
      console.error('Error initializing web3:', error);
    }
  }

  private async initContract() {
    try {
      const networkId = await this.web3.eth.net.getId();
      const networkIdString = networkId.toString();

      // Define a type for the network object
      type NetworkType = {
        [key: string]: {
          events: any;
          links: any;
          address: string;
          transactionHash: string;
        };
      };

      // Use type assertion for CounterContract.networks
      const networks = CounterContract.networks as NetworkType;

      const deployedNetwork = networks[networkIdString];
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
      console.error('Error initializing contract:', error);
    }
  }

  async incrementCounter() {
    // Removed the loadContract call as the contract should already be initialized
    const accounts = await this.web3.eth.getAccounts();
    return this.counterContract.methods.increment().send({ from: accounts[0] });
  }

  async getCounterValue() {
    // Removed the loadContract call as the contract should already be initialized
    const value = await this.counterContract.methods.getCount().call();
    return parseInt(value, 10); // Parse the result as an integer
  }

  async decrementCounter() {
    // Removed the loadContract call as the contract should already be initialized
    const accounts = await this.web3.eth.getAccounts();
    return this.counterContract.methods.decrement().send({ from: accounts[0] });
  }
}
