let hasFlippedCard = false;
let firstCard;
let secondCard;
let counter = 0; // counter für aufgedeckte Paare
const cards = document.querySelectorAll('.memoryCard'); // Karten in Liste speichern
let fehlversuche = 0;
let lockBoard = false;
let anzahlPaare = 0;


// anzahl der Paare hängt vom Level ab 
$( document ).on( "pageinit", "#p1", function( event ) {
  anzahlPaare = 4;
});

$( document ).on( "pageinit", "#p2", function( event ) {
  anzahlPaare = 6;
});

function flipCard(){
    console.log(anzahlPaare);
    if (lockBoard) return;

    
    //fügt den Klassennamen 'flip' zur Klasse memoryCard bei Klick
    this.classList.add('flip');
   // alert("starte funktion");
    //alert(hasFlippedCard);
//prüft ob bereits eine Karte geflippt wurde
       if(!hasFlippedCard){
           // First Click
       firstCard = this;
           // erste Karte wurde geklickt = wahr
           hasFlippedCard = true;
           // Entfernt den Action Listener, damit umgedrehte Karte nicht erneut geflippt werden kann
           
           }else{


           // Second Click
           hasFlippedCard = false;
           secondCard = this;

    

    // Überprüfen, dass Doppelklick auf Karte keinen Fehler erzeugt
if (firstCard == secondCard){
    secondCard = null;
    hasFlippedCard = true;

}
    else{
    
           // stimmen Karten überein?
         checkForMatch();
    }
    }
    // wenn alle Paare aufgedeckt sind, alert mit "Gewonnen!"
    if (counter==anzahlPaare){
        alert("Gewonnen!");
        location.reload();
    }
    document.getElementById("result").innerHTML = "<h1>Fehlversuche: " + fehlversuche +"</h1>";
}


function checkForMatch(){
      if (firstCard.dataset.framework === secondCard.dataset.framework){
          firstCard.classList.add('aufgedeckt');
          secondCard.classList.add('aufgedeckt');
               // eventListener werden entfernt, damit aufgedeckte Karten nicht mehr umgedreht werden können
          disableCards();
          counter ++;


           }else {
         unflipCards();
           }
    
}

function disableCards(){
    
                   firstCard.removeEventListener('click', flipCard);
               secondCard.removeEventListener('click', flipCard);
    resetBoard()
    
}

function unflipCards(){
    lockBoard = true;
     fehlversuche++;
               //Karten stimmen nicht überein
               // Timer von 1500ms um Karten sehen zu können
                   setTimeout(() => {
               firstCard.classList.remove('flip');
               secondCard.classList.remove('flip');
resetBoard()
               }, 1500);
    
    
}

function resetBoard(){
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    
}



// restart Game

document.getElementById("resetGame").addEventListener("click", function resetGame(){
    location.reload();

});


    
// Diese Funktion wird sofort aufgerufen und mischt die Karten
(function shuffle(){
    cards.forEach(card => {
        //Zufallszahl zwischen 0 und 11 
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
        
    });
    
})(); 
    

cards.forEach(card => card.addEventListener('click', flipCard)); // Liste durchgehen, jede Karte bekommt einen EventListener, bei Click wird Funktion flipCard ausgeführt

