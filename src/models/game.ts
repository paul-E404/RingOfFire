export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string [] = [];
    public currentPlayer: number = 0;
    public currentCard: string = 'red_back';
    public cardIsTaken = false;
    public gameOver = false;

    constructor() {
        for (let i = 2; i < 15; i++) {
            this.stack.push(i + '_C');
            this.stack.push(i + '_D');
            this.stack.push(i + '_H');
            this.stack.push(i + '_S'); 
        }

        shuffle(this.stack);
    }

    //Umwandlung von einem Game-Objekt in ein JSON-Objekt damit dieses in der Firebase Datenbank gespeichert werden kann (Lösung Junus Ergin)
   /*  public toJSON() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards, 
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            cardIsTaken: this.cardIsTaken
        };
    } */
}

export class Player {
    public name: string = '';
    public avatarSrc: string = '';
}

//Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array: string[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }