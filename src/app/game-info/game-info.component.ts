import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {

  cardRules = [
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'When you put your thumb on the table everyone must follow and whomever is last must drink. You are the thumb master till someone else picks a 9.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'From now on you are the question master till someone else draws a queen. The question master can ask a question at any point, and everyone has to avoid answering it. If someone forgets the rule and answers the question, they have to drink.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' }
  ];

  title = '';
  description = '';

  @Input() card: string;
  @Input() currentStackLength: number;
  @Input() atLeastOnePlayerCreated = false;
  @Output() ableToTakeFirstCard = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    
    if (this.atLeastOnePlayerCreated && this.currentStackLength == 52) {
      this.promptUserToTakeFirstCard();
    }

    if (this.card !== "red_back") {
      this.showCardRule();
    }

  }

  /**
   * Prompts the user to take the first card.
   */
  promptUserToTakeFirstCard() {
    this.title = "Take a card!";
    this.description = "Click on the card stack to pick a card.";
    this.ableToTakeFirstCard.emit();
  }

  /**
   * Shows rule of the current card in the info box.
   */
  showCardRule() {
    let cardNumber = +this.card.split("_")[0];
    this.title = this.cardRules[cardNumber - 2].title;
    this.description = this.cardRules[cardNumber - 2].description;
  }

}
