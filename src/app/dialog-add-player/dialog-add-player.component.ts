import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Player } from 'src/models/game';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  name: string = '';
  avatarSrc: string = '';
  /* public chosenAvatar: string; */
  avatarSources: string[] = ['ava1.png', 'ava2.png', 'ava3.png', 'ava4.png', 'ava5.png', 'ava6.png', 'ava7.png', 'ava8.png', 'ava9.png'];
  player: Player;

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  ngOnInit(): void {
    console.log("avatar Sources", this.avatarSources);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  chooseAvatar(avatarSrc: string) {
    /* this.chosenAvatar = avatarSrc; */
    this.player.avatarSrc = avatarSrc;
    console.log("avatarSrc", avatarSrc);
  }


}
