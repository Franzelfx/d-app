import { Component } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  counterValue: number = 0; // Initialize directly for simplicity

  constructor() {}

  increment() {
    this.counterValue += 1;
    console.log(`Counter incremented to: ${this.counterValue}`);
    // Simulate updating and fetching from the blockchain
  }

  decrement() {
    this.counterValue -= 1;
    console.log(`Counter decremented to: ${this.counterValue}`);
    // Simulate updating and fetching from the blockchain
  }
}
