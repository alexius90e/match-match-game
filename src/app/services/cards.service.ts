import { Injectable } from '@angular/core';
import { GameCardDTO } from '../models/game-card-dto.interface';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor() {}

  private imageNames: string[] = [
    '050-pineapple',
    '004-pitaya',
    '010-corn',
    '012-blueberry',
    '014-mango',
    '016-avocado',
    '017-strawberry',
    '020-grape',
    '026-bananas',
    '027-watermelon',
    '028-artichoke',
    '029-carrot',
    '032-salad',
    '039-lemon',
    '040-apple',
    '042-orange',
    '044-coconut',
    '048-papaya',
    '049-asparagus',
    '001-cherry',
  ];

  private gameCards: GameCardDTO[] = [];

  private gameCardBuffer: GameCardDTO[] = [];

  private gameCards$: ReplaySubject<GameCardDTO[]> = new ReplaySubject<
    GameCardDTO[]
  >();

  public getCards$(gameSize: number): Observable<GameCardDTO[]> {
    this.gameCards = this.generateCards(gameSize);
    this.gameCards$.next(this.gameCards);
    setTimeout(() => this.flipCards(), 2000);
    return this.gameCards$.asObservable();
  }

  public addCardToBuffer(gameCard: GameCardDTO) {
    const gameCardBufferLength = this.gameCardBuffer.length;

    switch (gameCardBufferLength) {
      case 0:
        this.gameCardBuffer.push(gameCard);
        break;
      case 1:
        const isSameImage = this.gameCardBuffer[0].image === gameCard.image;
        this.gameCardBuffer.push(gameCard);
        if (isSameImage) {
          this.gameCardBuffer = [];
          break;
        }
        this.gameCardBuffer.forEach((card) => {
          setTimeout(() => {
            card.isFliped = false;
            card.isFreezed = false;
          }, 500);
        });
        this.gameCardBuffer = [];
        break;
      case 2:
        break;
      default: {
        this.gameCardBuffer = [];
      }
    }
  }

  private flipCards(): void {
    this.gameCards.forEach((card) => {
      card.isFliped = false;
      card.isFreezed = false;
    });
  }

  private generateCards(gameSize: number): GameCardDTO[] {
    const countOfCards: number = gameSize ** 2;

    const deltaOfCards: number = Math.ceil(
      countOfCards / this.imageNames.length / 2
    );

    const cardImageNames: string[] = new Array(deltaOfCards)
      .fill(this.imageNames)
      .flat()
      .slice(0, countOfCards / 2);

    const cards = new Array(2)
      .fill(cardImageNames)
      .flat()
      .map((cardImageName, index) => {
        return {
          id: index,
          image: cardImageName,
          isFliped: true,
          isFreezed: true,
        };
      });

    return this.shuffleCards(cards);
  }

  private shuffleCards(array: any[]) {
    const resultArray = [...array];
    for (let i: number = resultArray.length - 1; i > 0; i--) {
      let j: number = Math.floor(Math.random() * (i + 1));
      [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
    }

    return resultArray;
  }
}
