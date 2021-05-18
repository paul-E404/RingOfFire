import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  /*   currentCard: string = 'red_back';
    cardIsTaken = false; */
  game: Game;
  gameId: string;

  players = [];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(() => {
      console.log(this.route.params['_value'].id);   //id aus der URL holen
      this.gameId = this.route.params['_value'].id;

      //DATENBANK ABONNIEREN - um die aktuellen Daten abzurufen!
      this
        .firestore
        .collection('games')                    //Name der Sammlung im Cloud Firestore: "games"
        .doc(this.gameId)    //Dokument in der Collection mit der entsprechenden ID aufrufen
        .valueChanges()
        .subscribe((game: any) => {                  //game wird abonniert, d.h.
          console.log("Game update", game);     //...jedesmal, wenn ich in in der Datenbank etwas ändere, wird diese Änderung ausgelogged.
          this.game.players = game.players;     //Alle Variablen in unserem JSON updaten.
          this.game.stack = game.stack;
          this.game.playedCards = game.playedCards;
          this.game.currentPlayer = game.currentPlayer;
          this.game.currentCard = game.currentCard;
          this.game.cardIsTaken = game.cardIsTaken;
        });
    })
  }

  takeCard() {
    if (!this.game.cardIsTaken) {
      this.game.cardIsTaken = true;
      this.game.currentCard = this.game.stack.pop();
      this.saveGame();
    }
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      if (this.game.stack.length > 0) {
        this.game.cardIsTaken = false;
      }
      this.game.currentCard = 'red_back';
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
    }, 3000)
  }

  newGame() {
    this.game = new Game();

    //NEUES game JSON zur DATENBANK HINZUFÜGEN:
    /* this
      .firestore
      .collection('games')
      .add(this.game.toJSON()); */
  }

  /*  openDialog(): void {
     const dialogRef = this.dialog.open(DialogAddPlayerComponent);
 
     dialogRef.afterClosed().subscribe((name: string) => {
       console.log('The dialog was closed', name);
       if (name && name.length > 0) {
         this.game.players.push(name);
         this.saveGame();                //Spiel updaten --> aktuelle Daten zur Datenbank hinzufügen
       }
     });
   } */

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result.name && result.avatarSrc) {
        this.game.players.push(result);
        console.log("players array: ", this.game.players);
        this.saveGame();                //Spiel updaten --> aktuelle Daten zur Datenbank hinzufügen
      }
    });
  }


  saveGame() {
    this
      .firestore
      .collection('games')          //Name der Sammlung im Cloud Firestore: "games"
      .doc(this.gameId)             //Im Dokument der Sammlung mit der betreffenden ID
      .update(this.game.toJSON());  //Wird das aktualisierte JSON-Objekt gespeichert.
  }
}
