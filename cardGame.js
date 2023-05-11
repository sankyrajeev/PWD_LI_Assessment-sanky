/* 
Overview 

Create a JS file that uses classes to create an object representing a deck of cards. Then create a simple console version of the card game 'War'

Steps: 

1. Create a Deck class 

2. Create a method on the Deck class that dynamically generates each card object
example card object: {suit: "hearts", value: 2}

a card's value corresponds to the number/face card's rank

ace = 1
cards 2-10 = their number value 
jacks = 11 
queens = 12 
kings = 13 

3. card objects can be held inside an array 

4. create a method to select a random card object 

5. create a function that runs the random card method on each deck, and compares the values of the 2 random cards

6. console log both card objects, and a message declaring which one has the higher value

*/


class Deck {
    constructor() {
        this.cards = [];
        this.createDeck();
    }

    createDeck() {
        this.cards = [];
        const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        for (let i = 0; i < suits.length; i++) {
            const suit = suits[i];
            for (let j = 0; j < values.length; j++) {
                const value = values[j];
                const card = {
                    suit: suit,
                    value: value,
                    rank: this.getRank(value),
                };
                this.cards.push(card);
            }
        }
    }

    getRank(value) {
        if (value == 'A') {
            return 1;
        }
        else if (value == 'J') {
            return 11;
        }
        else if (value == 'Q') {
            return 12;
        }
        else if (value == 'K') {
            return 13;
        }
        else {
            return parseInt(value)
        }
    }

    shuffle() {
        const cards = this.cards;
        let n = cards.length;

        while (n > 0) {
            const i = Math.floor(Math.random() * n);
            n = n - 1;
            [cards[i], cards[n]] = [cards[n], cards[i]];

        }
    }
    dealCard() {
        return this.cards.pop();
    }

    addCard(card) {
        this.cards.push(card);
        return this;
    }

    numCards() {
        return this.cards.length;
    }
}


function wargame() {
    const player1 = new Deck();
    const player2 = new Deck();
  
    player1.shuffle();
    player2.shuffle();
  
    while (player1.numCards() > 0 && player2.numCards() > 0) {
      const player1Card = player1.dealCard();
      console.log("Player 1 Card is:", player1Card);
      const player2Card = player2.dealCard();
      console.log("Player 2 Card is:", player2Card);
  
      if (player1Card.rank > player2Card.rank) {
        console.log("Player 1 wins");
        player1.addCard(player1Card);
        player1.addCard(player2Card);
      } else if (player1Card.rank < player2Card.rank) {
        console.log("Player 2 wins");
        player2.addCard(player1Card);
        player2.addCard(player2Card);
      } else {
        console.log("Time to Battle");
  
        const player1WarCards = [player1Card];
        const player2WarCards = [player2Card];
  
        while (true) {
          const player1NextCard = player1.dealCard();
          const player2NextCard = player2.dealCard();
  
          console.log("Player 1 war card:", player1NextCard);
          console.log("Player 2 war card:", player2NextCard);
  
          player1WarCards.push(player1NextCard);
          player2WarCards.push(player2NextCard);
  
          if (player1NextCard.rank > player2NextCard.rank) {
            console.log("Player 1 wins the war!");
            player1
              .addCard(player1Card)
              .addCard(player2Card)
              .addCard(...player1WarCards)
              .addCard(...player2WarCards);
            break;
          } else if (player1NextCard.rank < player2NextCard.rank) {
            console.log("Player 2 wins the war!");
            player2
              .addCard(player1Card)
              .addCard(player2Card)
              .addCard(...player1WarCards)
              .addCard(...player2WarCards);
            break;
          } else {
            console.log("War continues!");
          }
        }
      }
  
      console.log("Player 1 deck:", player1.cards);
      console.log("Player 2 deck:", player2.cards);
    }
  
    if (player1.numCards() === 0) {
      console.log("Player 2 wins the game!");
    } else {
      console.log("Player 1 wins the game!");
    }
  }
  
  wargame();
  