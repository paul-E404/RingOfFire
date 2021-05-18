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
  player: any;
  clickedAvatarNumber: number;
  
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  ngOnInit(): void {
    this.player = new Player();         //Neues Objekt von Typ Player erzeugen
    console.log("this.player", this.player);
    /* this.player = {
      name: "",
      avatarSrc: ""
    }; */
    
  }

  onNoClick() {
    this.dialogRef.close();
  }

  setAvatar(src: string, i: number) {
    this.player.avatarSrc = src;
    console.log("this.player.avatarSrc", this.player.avatarSrc);
    this.clickedAvatarNumber = i;
    console.log("this.clickedAvatarNumber", this.clickedAvatarNumber);
  }


}
