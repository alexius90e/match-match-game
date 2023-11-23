import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  private gameSize: number = 6;

  protected gameCards: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.gameCards = new Array(this.gameSize ** 2).fill('');
  }
}
