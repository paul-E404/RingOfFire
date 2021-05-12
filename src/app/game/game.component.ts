import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  currentCard: string = 'red_back';
  cardIsTaken = false;
  game: Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  takeCard() {
    if (!this.cardIsTaken) {
      this.cardIsTaken = true;
      this.currentCard = this.game.stack.pop();
      console.log("currentCard", this.currentCard);
    }
    setTimeout(() => {
      this.cardIsTaken = false;
      this.currentCard = 'red_back';
    }, 3000)
  }

  newGame() {
    this.game = new Game();
    console.log("this.game", this.game);
  }

}
