import { Component } from '@angular/core';
import { Web3Service } from './web3.service';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  counterValue: number; // Property to store the counter value

  constructor(private web3Service: Web3Service) {
    this.counterValue = 0; // Initialize the counter value
  }

  async ngOnInit() {
    // Load the initial counter value from the blockchain when the component initializes
    await this.loadCounterValue();
  }

  async loadCounterValue() {
    // Fetch the counter value from the blockchain
    const value = await this.web3Service.getCounterValue();
    this.counterValue = value; // Update the counterValue property
  }

  async increment() {
    await this.web3Service.incrementCounter();
    // After incrementing, reload the counter value from the blockchain
    await this.loadCounterValue();
  }

  async decrement() {
    await this.web3Service.decrementCounter();
    // After decrementing, reload the counter value from the blockchain
    await this.loadCounterValue();
  }
}
