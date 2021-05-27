import { Component, OnInit } from '@angular/core';
import { Game, shuffle } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  gameId: string;
  stackReleased: boolean = false;

  players = [];

  AUDIO_WHOOP = new Audio('assets/audio/whoop.mp3');
  AUDIO_TAKE_CARD = new Audio('assets/audio/take_card.mp3');
  AUDIO_PLACE_CARD = new Audio('assets/audio/place_card.mp3');
  AUDIO_ENDSCREEN_SONG = new Audio('assets/audio/endscreen_song.mp3');

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
          this.game.gameOver = game.gameOver;
        });
    })
  }

  releaseStack() {
    this.stackReleased = true;
  }

  takeCard() {
    if (this.stackReleased) {
      if (!this.game.cardIsTaken) {
        this.AUDIO_TAKE_CARD.play();
        this.game.cardIsTaken = true;
        this.game.currentCard = this.game.stack.pop();
        this.saveGame();
      }
      setTimeout(() => {
        this.AUDIO_PLACE_CARD.play();
      }, 2500)
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        if (this.game.stack.length > 0) {
          this.game.cardIsTaken = false;
          this.game.currentCard = 'red_back';
        }
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
        this.checkForGameOver();
      }, 3000)
    }
  }

  newGame() {
    this.game = new Game();

    //NEUES game JSON zur DATENBANK HINZUFÜGEN:
    /* this
      .firestore
      .collection('games')
      .add(this.game.toJSON()); */
  }

  checkForGameOver() {
    if (this.game.stack.length == 0) {
      this.game.gameOver = true;
      this.saveGame();
      this.AUDIO_ENDSCREEN_SONG.play();
    }
  }

  openDialog(): void {
    this.AUDIO_WHOOP.play();
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        if (result.name && result.avatarSrc) {
          this.game.players.push(result);
          console.log("players array: ", this.game.players);
          console.log("this.game", this.game);
          this.saveGame();                //Spiel updaten --> aktuelle Daten zur Datenbank hinzufügen
        }
      }

    });
  }


  editPlayer(playerId: number) {
    console.log("playerId", playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    //Name des Spielers im Delete-Dialog anzeigen:
    dialogRef.componentInstance.player = this.game.players[playerId];

    dialogRef.afterClosed().subscribe(change => {
      if (change == 'DELETE') {
        this.game.players.splice(playerId, 1);
        this.saveGame();
      }
    });
  }


  saveGame() {
    this
      .firestore
      .collection('games')          //Name der Sammlung im Cloud Firestore: "games"
      .doc(this.gameId)             //Im Dokument der Sammlung mit der betreffenden ID
      /* .update(this.game.toJSON()); */                //Wird das aktualisierte JSON-Objekt gespeichert. (Junus Lösung)
      .update(JSON.parse(JSON.stringify(this.game)));   //Lösung Stackoverflow (mit dieser Lösung kann das Player Objekt mit new Player erstellt werden!)
  }


  playAnotherRound() {

    this.AUDIO_ENDSCREEN_SONG.pause();

    for (let i = 2; i < 15; i++) {
      this.game.stack.push(i + '_C');
      this.game.stack.push(i + '_D');
      this.game.stack.push(i + '_H');
      this.game.stack.push(i + '_S');
    }

    shuffle(this.game.stack);

    this.game.currentCard = 'red_back';
    this.game.playedCards = [];
    this.game.gameOver = false;
    this.game.cardIsTaken = false;

    this.saveGame();
  }
}
