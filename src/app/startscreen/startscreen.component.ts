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

  //private because we want to use router only within this component
  //public if we would like to use router e.g. in the index.html, too
  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  startGame() {
    //A new game object is created by clicking on "Start Game"
    let game = new Game();
    this.AUDIO_SHUFFLE_CARDS.play();

    //Created game object is converted into a JSON object and is saved to collection 'games' at firestore.
    this
      .firestore
      .collection('games')
      .add(JSON.parse(JSON.stringify(game)))
      //.then() returns a promise object and is called only one time (in contrast to .subscribe()).
      .then((gameInfo: any) => {
        console.log("gameInfo", gameInfo);
        //We need to read out the ID from the promise object - it is the game ID
        //Navigate to the game which has the corresponding ID in its URL
        this.router.navigateByUrl('/game/' + gameInfo.id);
      })

  }

}
