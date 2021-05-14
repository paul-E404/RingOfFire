import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  currentCard: string = 'red_back';
  cardIsTaken = false;
  game: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  takeCard() {
    if (!this.cardIsTaken) {
      this.cardIsTaken = true;
      this.currentCard = this.game.stack.pop();
    }
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      if(this.game.stack.length > 0) {
        this.cardIsTaken = false;
      }
      this.currentCard = 'red_back';
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    }, 3000)
  }

  newGame() {
    this.game = new Game();
    console.log("this.game", this.game);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe( (name: string) => {
      console.log('The dialog was closed', name);
      if(name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
