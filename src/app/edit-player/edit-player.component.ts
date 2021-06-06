import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; 

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  //To be able to display the selected player's name, the variable player needs to be declarated here.
  player: any;

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
