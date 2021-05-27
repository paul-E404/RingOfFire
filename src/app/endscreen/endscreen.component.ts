import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endscreen',
  templateUrl: './endscreen.component.html',
  styleUrls: ['./endscreen.component.scss']
})
export class EndscreenComponent implements OnInit {

  @Input() whoopSound;
  @Output() restartButtonClicked = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBackToStartscreen() {
    this.whoopSound.play();
    this.router.navigateByUrl('/');
  }

  playAnotherRound() {
    this.whoopSound.play();
    this.restartButtonClicked.emit();
  }

}
