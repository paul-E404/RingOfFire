import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() playerActive: boolean;      
  @Input() player: any;    //Diese Input Variable wird in der game.component.html als [player] in <app-player> verwendet.

  constructor() { }

  ngOnInit(): void {
  
  }

}
