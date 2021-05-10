import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  //private, da wir den Router nur innerhalb der Komponente verwenden wollen
  //public wenn wir den Router auch in der index.html verwenden möchten
  constructor (private router: Router) { }

  ngOnInit(): void {
  }

  startGame() {
    this.router.navigateByUrl('/game');
  }

}
