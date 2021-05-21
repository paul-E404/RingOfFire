import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-endscreen',
  templateUrl: './endscreen.component.html',
  styleUrls: ['./endscreen.component.scss']
})
export class EndscreenComponent implements OnInit {

  game: Game;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBackToStartscreen() {
    this.router.navigateByUrl('/');
  }

  playAnotherRound() {
    for (let i = 2; i < 3; i++) {
      this.game.stack.push(i + '_C');
      this.game.stack.push(i + '_D');
      this.game.stack.push(i + '_H');
      this.game.stack.push(i + '_S');
    }

    /* shuffle(this.game.stack); */
    this.game.currentCard = 'red_back';
    this.game.playedCards = [];
    this.game.gameOver = false;

  }

}
