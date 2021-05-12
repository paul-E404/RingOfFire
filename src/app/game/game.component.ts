import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  cardImageName = "red_back";
  cardIsTaken = false;

  constructor() { }

  ngOnInit(): void {
  }

  takeCard() {
    this.cardIsTaken = true;
    this.cardImageName = "2C";
  }

}
