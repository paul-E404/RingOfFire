import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/models/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name;
  @Input() playerActive: boolean = false;
  @Input() avatarSrc: string = '';
  player: Player;

  constructor() { }

  ngOnInit(): void {
    this.newPlayer();
  }

  newPlayer() {
    this.player = new Player();
    console.log("player", this.player);
    this.player.name = this.name;
    this.player.playerActive = this.playerActive;
   /*  this.player.avatarSrc = chosenAvatar; */
   this.player.avatarSrc = this.avatarSrc;
  }

  

}
