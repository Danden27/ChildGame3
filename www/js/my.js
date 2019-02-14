/** 
 * @author Daniel Denk
 * @version 1.0
 */

/**  Wurde bereits eine Karte umgedreht? */
let hasFlippedCard = false;
let firstCard;
let secondCard;
 /** Zähler für aufgedeckte Paare  */
let counter = 0; 
 /** Karten in Liste speichern  */
const cards = document.querySelectorAll('.memoryCard'); 
/**  Anzahl der Fehlversuche */
let faults = 0;
 /**  Variable um das Umdrehen der Karten zu sperren*/
let lockBoard = false;
let pairNumbers = 0;
let timer;


 /**   
 * Timer bis sich Karten wieder zurückdrehen bei 1500ms für Level 1 und 750ms für Level 2
 */
    $( document ).on( "pageinit", "#p1", function( event ) {
  timer = 1500;
    faults = 0;
});
    
    $( document ).on( "pageinit", "#p2", function( event ) {
  timer = 750;
        faults = 0;
});

 /** anzahl der Paare hängt vom Level ab  
 * Level 1
 */
 
$( document ).on( "pageinit", "#p1", function( event ) {
  pairNumbers = 4;
});

 /** anzahl der Paare hängt vom Level ab  
 * Level 2
 */

$( document ).on( "pageinit", "#p2", function( event ) {
  pairNumbers = 6;
});

 /**  Funktion für das Umdrehen der Karten */

function flipCard(){

    if (lockBoard) return;

    
     /**  fügt den Klassennamen 'flip' zur Klasse memoryCard bei Klick */
    this.classList.add('flip');

     /**  prüft ob eine Karte bereits gedreht wurde */
       if(!hasFlippedCard){
                /**  erste Karte */
       firstCard = this;
            /**  erste Karte wurde geklickt = wahr */ 
           hasFlippedCard = true;                     
           }else{

           /**  zweite Karte
           * hasFlippedCard wird wieder zurückgesetzt auf false
           */
           hasFlippedCard = false;
           secondCard = this;

      /**  Doppelklick auf eine Karte soll nur als einfach Klick gewertet werden, secondCard bleibt bei null bist andere Karte angeklickt wird */  
if (firstCard == secondCard){
    secondCard = null;
    hasFlippedCard = true;

}
    else{
    
           /**  checkForMatch Funktion wird aufgerufen */
         checkForMatch();
    }
    }
    /**  wenn alle Paare aufgedeckt sind, alert mit "Gewonnen!", Seite wird aktualisiert*/ 
    if (counter==pairNumbers){
        alert("Gewonnen mit "+faults+" Fehlversuchen");
        location.reload();
    }    
    /**  Anzahl der Fehlversuche wird ausgegeben in HTML */ 
    document.getElementsByClassName("result")[0].innerHTML = "<h1>Fehlversuche: " + faults +"</h1>";
     document.getElementsByClassName("result")[1].innerHTML = "<h1>Fehlversuche: " + faults +"</h1>";
}

    /** Überprüft per dataset.framework ob die Karten den gleichen Wert haben */ 
function checkForMatch(){
      if (firstCard.dataset.framework === secondCard.dataset.framework){
              /**  aufgedeckte richtige Paare bekommen die Klasse 'aufgedeckt', um sie in CSS grün zu markieren */ 
          firstCard.classList.add('aufgedeckt');
          secondCard.classList.add('aufgedeckt');
               /**  Funktion disableCards() wird aufgerufen, Zähler der richtigen Paare wird um 1 erhöht */ 
          disableCards();
          counter ++;
           }else {
       /**  stimmen die Karten nicht überein, wird Funktion unflipCards() aufgerufen */ 
         unflipCards();
           }
    
}
    /**  disableCards() entfernt den Click Eventlistener der aufgedeckten Karten, damit diese nicht mehr umgedreht werden können */ 
function disableCards(){
    
    firstCard.removeEventListener('click', flipCard);
     secondCard.removeEventListener('click', flipCard);
    resetBoard()
    
}
    /**  Funktion unflipCards() dreht Karten um, wenn Karten nicht übereinstimmen */ 
function unflipCards(){

    console.log(timer);
    
        /**  Board wird gesperrt, damit keine dritte Karte aufgedeckt werden kann */ 
    lockBoard = true;
        /**  Fehlversuche wird um 1 erhöht */ 
     faults++;
    /**  Timeout von 750ms bzw. 1500ms, um die Karten zu sehen, danach werden sie wieder umgedreht */ 
                   setTimeout(() => {
               firstCard.classList.remove('flip');
               secondCard.classList.remove('flip');
resetBoard()
               }, timer);
    
    
}


    /** resetBoard() löscht die zuvor gespeicherten Werte der Variablen und setzt das Board zurück */ 
function resetBoard(){
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    
}



    /**  Funktion für den Button Restart, aktualisiert die Seite, alle Karten sind wieder umgedreht */ 

document.getElementsByClassName("resetGame")[0].addEventListener("click", function resetGame(){
    location.reload();

});
document.getElementsByClassName("resetGame")[1].addEventListener("click", function resetGame(){
    location.reload();

});


    
    /**  Diese Funktion wird sofort aufgerufen und mischt die Karten */ 
(function shuffle(){
    cards.forEach(card => {
         /**  Zufallszahl zwischen 0 und 11  
         * math.floor rundet auf ganze Zahl
         */    
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
        
    });
    
})(); 
    
/** Liste durchgehen, jede Karte bekommt einen EventListener, bei Click wird Funktion flipCard ausgeführt */
cards.forEach(card => card.addEventListener('click', flipCard)); 


