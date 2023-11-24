// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Web3Service } from './web3.service'; // Ensure this path is correct

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [Web3Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
