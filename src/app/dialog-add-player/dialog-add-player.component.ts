import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  name: string = '';
  avatarNumber: number;

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  ngOnInit(): void {
    console.log("avatar Number", this.avatarNumber);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  chooseAvatar(i: number) {
    this.avatarNumber = i;
    console.log("avatar Number", this.avatarNumber);
  }


}
