import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GameCardDTO } from '../../models/game-card-dto.interface';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent implements OnInit, OnChanges {
  protected imageUrl: string = '';

  @Input() gameCard!: GameCardDTO;

  constructor(private cardsService: CardsService) {}

  ngOnChanges() {
    this.imageUrl = `../../../assets/icons/fruits/${this.gameCard.image}.svg`;
  }

  ngOnInit() {}

  public flipCard(): void {
    if (this.gameCard.isFreezed) return;
    this.gameCard.isFliped = true;
    this.gameCard.isFreezed = true;
    this.cardsService.addCardToBuffer(this.gameCard);
  }
}
