import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/models/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() playerActive: boolean;       //kann gelöscht werden?
  @Input() player: any;    //Diese Input Variable wird in der game.component.html als [player] in <app-player> verwendet.

  constructor() { }

  ngOnInit(): void {
    /* this.newPlayer(); */
  }

/*   newPlayer() {
    this.player = new Player();
    this.player.name = this.name;
    this.player.playerActive = this.playerActive;
    this.player.avatarSrc = this.avatarSrc;
    console.log("player in der player.component.ts", this.player);
  }
 */


}
