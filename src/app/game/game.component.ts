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

  AUDIO_SHUFFLE_CARDS = new Audio('assets/audio/shuffle_cards.mp3');
  AUDIO_WHOOP = new Audio('assets/audio/whoop.mp3');
  AUDIO_TAKE_CARD = new Audio('assets/audio/take_card.mp3');
  AUDIO_PLACE_CARD = new Audio('assets/audio/place_card.mp3');
  AUDIO_ENDSCREEN_SONG = new Audio('assets/audio/endscreen_song.mp3');

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(() => {
      //Get id from URL
      this.gameId = this.route.params['_value'].id; 

      //Subscribe database - to get the current data.
      this
        .firestore
        //games: name of the collection in cloud firestore
        .collection('games')
        //Call document of the collection 'games' with the corresponding ID
        .doc(this.gameId)
        .valueChanges()
        //game is subscribed: that means everytime something changes in the database, this change is logged out
        .subscribe((game: any) => {             
          //console.log("Game update", game);
          this.updateGameJSON(game);
        });
    })
  }

  /**
   * Generates a new game.
   */
  newGame() {
    this.game = new Game();

    //NEUES game JSON zur DATENBANK HINZUFÜGEN:
    /* this
      .firestore
      .collection('games')
      .add(this.game.toJSON()); */
  }

  /**
   * Updates all variables in 'game' JSON.
   * @param  {any} game JSON with all current game data from database.
   */
  updateGameJSON(game: any) {
    this.game.players = game.players; 
    this.game.stack = game.stack;
    this.game.playedCards = game.playedCards;
    this.game.currentPlayer = game.currentPlayer;
    this.game.currentCard = game.currentCard;
    this.game.cardIsTaken = game.cardIsTaken;
    this.game.gameOver = game.gameOver;
  }

  /**
   * Make drawing a card possible as soon as one player has been created at least.
   */
  releaseStack() {
    this.stackReleased = true;
  }

  /**
   * Let the player take a card and manages audio sounds.
   */
  takeCard() {
    if (this.stackReleased) {
      if (!this.game.cardIsTaken) {
        this.AUDIO_TAKE_CARD.play();
        this.game.cardIsTaken = true;
        //Remove card from stack array
        this.game.currentCard = this.game.stack.pop();
        this.saveGame();
      }
      setTimeout(() => {
        this.AUDIO_PLACE_CARD.play();
      }, 2500)
      setTimeout(() => {
        //Add card to played cards array
        this.game.playedCards.push(this.game.currentCard);
        if (this.game.stack.length > 0) {
          this.game.cardIsTaken = false;
          this.game.currentCard = 'red_back';
        }
        this.selectNextPlayer();
        this.saveGame();
        this.checkForGameOver();
      }, 3000)
    }
  }

  /**
   * Selects next player.
   */
  selectNextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  /**
   * Checks for game over for possibly playing the endscreen song.
   */
  checkForGameOver() {
    if (this.game.stack.length == 0) {
      this.game.gameOver = true;
      this.saveGame();
      this.AUDIO_ENDSCREEN_SONG.play();
    }
  }

  /**
   * Opens a dialog for showing AddPlayerComponent and saves new generated player to game JSON after closing.
   * @returns void
   */
  openDialog(): void {
    this.AUDIO_WHOOP.play();
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed, the created player is:', result);
      if (result) {
        if (result.name && result.avatarSrc) {
          //Add created player to existing players
          this.game.players.push(result);
          this.saveGame();
        }
      }
    });
  }

  /**
   * Opens a dialog with the option to delete the selected player.
   * @param  {number} playerId The player's ID.
   */
  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    //Show player's name in edit-player-dialog
    dialogRef.componentInstance.player = this.game.players[playerId];

    dialogRef.afterClosed().subscribe(change => {
      if (change == 'DELETE') {
        //Delete player from players array
        this.game.players.splice(playerId, 1);
        this.saveGame();
      }
    });
  }

  /**
   * Saves current game data to game JSON at firestore database.
   */
  saveGame() {
    this
      .firestore
      //games: name of the collecction at cloud firestore
      .collection('games')
      //document of the collection with the corresponding ID
      .doc(this.gameId)
      /* .update(this.game.toJSON()); */                //Alternative (Junus Ergin)
      //Save JSON to firestore (Stackoverflow)
      .update(JSON.parse(JSON.stringify(this.game)));   //Lösung Stackoverflow (mit dieser Lösung kann das Player Objekt mit new Player erstellt werden!)
  }

  /**
   * Restarts the game with the same players.
   */
  playAnotherRound() {

    this.AUDIO_ENDSCREEN_SONG.pause();
    this.AUDIO_SHUFFLE_CARDS.play();

    this.refillStack();

    this.game.currentCard = 'red_back';
    this.game.playedCards = [];
    this.game.gameOver = false;
    this.game.cardIsTaken = false;

    this.saveGame();
    
  }

  /**
   * Refills the empty stack with new shuffled cards.
   */
  refillStack() {
    for (let i = 2; i < 15; i++) {
      this.game.stack.push(i + '_C');
      this.game.stack.push(i + '_D');
      this.game.stack.push(i + '_H');
      this.game.stack.push(i + '_S');
    }

    shuffle(this.game.stack);
  }

}
