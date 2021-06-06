import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endscreen',
  templateUrl: './endscreen.component.html',
  styleUrls: ['./endscreen.component.scss']
})
export class EndscreenComponent implements OnInit {

  @Input() shuffleCardsSound;
  @Output() restartButtonClicked = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Navigates the user back to startscreen.
   */
  goBackToStartscreen() {
    this.router.navigateByUrl('/');
  }

  /**
   * Fires the event to play another round when restart button is clicked.
   */
  playAnotherRound() {
    this.shuffleCardsSound.play();
    this.restartButtonClicked.emit();
  }

}
