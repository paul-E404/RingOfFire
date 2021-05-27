import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  AUDIO_SHUFFLE_CARDS = new Audio('assets/audio/shuffle_cards.mp3');

  //private, da wir den Router nur innerhalb der Komponente verwenden wollen
  //public wenn wir den Router auch in der index.html verwenden möchten
  constructor (private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  startGame() {
    let game = new Game();      //Beim Klick auf "Start Game" wird eine neues Game Objekt gestartet.
    this.AUDIO_SHUFFLE_CARDS.play();

    this                        //Dieses Game Objekt wird in ein JSON Objekt umgewandelt und in der Collection "games" gespeichert.
      .firestore
      .collection('games')
      /* .add(game.toJSON()) */
      .add(JSON.parse(JSON.stringify(game)))    //...damit ein Objekt new Player erstellt werden kann!
      .then ((gameInfo: any) => {            //then() wird im Gegensatz zu subscribe() nicht mehrfach, sondern nur einmal aufgerufen und gibt ein Promise-Objekt zurück.
        console.log("gameInfo", gameInfo);    //Aus dem Promise gameInfo wird die id ausgelesen:
        this.router.navigateByUrl('/game/' + gameInfo.id);  //Navigation zum Spiel, welches die betreffende ID in der URL hat.
      })
      
    
  }

}
