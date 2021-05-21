import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endscreen',
  templateUrl: './endscreen.component.html',
  styleUrls: ['./endscreen.component.scss']
})
export class EndscreenComponent implements OnInit {

  @Output() restartButtonClicked = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBackToStartscreen() {
    this.router.navigateByUrl('/');
  }

  playAnotherRound() {
    this.restartButtonClicked.emit();
  }

}
