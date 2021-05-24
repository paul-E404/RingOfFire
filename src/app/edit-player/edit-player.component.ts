import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; 

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  //Um Name des Spielers im Delete-Dialog anzuzeigen
  player: any;

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { 
    
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
