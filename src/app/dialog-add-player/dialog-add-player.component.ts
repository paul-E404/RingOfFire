import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; 
import { Player } from 'src/models/game';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  avatarSources: string[] = ['ava1.png', 'ava2.png', 'ava3.png', 'ava4.png', 'ava5.png', 'ava6.png', 'ava7.png', 'ava8.png', 'ava9.png'];
  player: Player;
  clickedAvatarNumber: number;
  
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  ngOnInit(): void {
    //Create a new object from type Player when opening dialog
    this.player = new Player();
  }

  /**
   * Closes the dialog when the user chlicks on "No Thanks" button.
   */
  onNoClick() {
    this.dialogRef.close();
  }

  /**
   * @param  {string} avatarSrc Source of the clicked avatar.
   * @param  {number} i Index of clicked avatar.
   */
  setAvatar(avatarSrc: string, i: number) {
    this.player.avatarSrc = avatarSrc;
    this.clickedAvatarNumber = i;
  }

}
