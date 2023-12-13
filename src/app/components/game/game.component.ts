import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { GameCardDTO } from '../../models/game-card-dto.interface';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  private gameSize: number = 6;

  protected gameCards$!: Observable<GameCardDTO[]>;

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.gameCards$ = this.cardsService.getCards$(this.gameSize);
  }
}
