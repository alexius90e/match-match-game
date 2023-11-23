import { Component } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  protected isFliped: boolean;

  constructor() {
    this.isFliped = false;
  }

  public flipCard(): void {
    this.isFliped = !this.isFliped;
    console.log(this.isFliped);
  }
}
