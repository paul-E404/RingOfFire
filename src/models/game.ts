//Object (Model): Was drin stehen darf ist vorab definiert, im Gegensatz zu einem JSON.
//Nach : steht der Datentyp, z.B. string[] => ein Array aus Strings

export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string [] = [];
    public currentPlayer: number = 0;

    //Der Konstruktor ist die erste Methode die bei Instanziierung eines Objektes (Erstellung eines Objektes mit ...= new Classname) aufgerufen wird.
    constructor() {
        for (let i = 2; i < 15; i++) {
            this.stack.push(i + 'C');
            this.stack.push(i + 'D');
            this.stack.push(i + 'H');
            this.stack.push(i + 'S'); 
        }

        shuffle(this.stack);
    }
}


//Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: string[]) {
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