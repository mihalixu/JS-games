https://schueler.bulme.at/~mihael.subasic/
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Das ist unser Spiel "Snake". Unser Spiel basiert auf dem gleichnamigen Computerspieleklassiker. 
Diese Spiel spiegelt unseren Alltag auf der HTL Bulme wieder. 
Wir (die Schlange) müssen die Computersprachen lernen (essen) und den Feinden ausweichen. 
Die Feinde spiegeln Sachen wieder, die uns vom Lernen abhalten könnten.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Der Großteil des Programmes besteht aus Funktionen. Wir haben überlegt ob wir es objektorientiert schreiben sollen, haben uns aber dann nicht dafür entscheiden, weil es sonst den Rahmen sprengen würde.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Der Hintergrund wurde ebenfalls von uns gezeichnet und eingefügt. 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Wir haben für dieses Projekt ausschließlich HTML, CSS und JavaSript verwendet.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Unser Spiel hat 2 Canvase. Beide haben eine Größe von 900x600 Pixel.
Canvas 1 ist für die Objekte Enemies, Food, Redbull und den bewegenden Hintergrund.
Canvas 2 ist wegen der Begrenzung des Snake auf 60FPS und der countdown()-Funktion.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Objekte bzw. kleine Klassen --> Snake, Food, Enemies, Redbull
Events --> Keydown
Timer --> requestAnimationFrame / Wir haben 2 animation-Funktionen. animate1() ist auf 60FPS begrenzt und animate2() ist unbegrenzt. Deshalb haben Spieler mit 120hz-Monitoren einen kleinen Vorteil.
Überschneidung --> myColision()
Selbsprogrammierter Rückwertszähler --> countdown(), der einen Countdown von 10 bis 0 auslöst.
Snake Logik --> drawSnake()
Highscore --> Für den Highscore haben wir die Entwicklungs-Plattform Firebase genutzt und eine Datenbank mit den ganzen Highscores in die Tabelle eingefügt.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 