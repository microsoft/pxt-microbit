# Unplugged: Battleship

The game Battleship is perhaps the most fun a student can have practicing using a coordinate grid. The original Battleship game is a 10x10 grid with numbers on one axis and letters on the other.
 
To help us practice using the correct coordinates for the grid of micro:bit LEDs, let's play a smaller 5x5 version of Battleship using x- and y-coordinates instead of letters and numbers.
 
First, make your own set of 5x5 grids to reinforce the layout of the micro:bit grid.

Each player should make two grids. One grid is for placing their own ships and keeping track of their opponent’s hits and misses and the other grid is for keeping track of their own hits and misses while trying to determine the location of their opponent’s ships.

![Player Grid Example](/static/courses/csintro/coordinates/player-grid.png)
Player’s grid: Mark where your ships are and keep track of your opponent’s hits and misses.

```
	(0,0)	(1,0)	(2,0)	(3,0)	(4,0)
	(0,1)	(1,1)	(2,1)	(3,1)	(4,1)
	(0,2)	(1,2)	(2,2)	(3,2)	(4,2)
	(0,3)	(1,3)	(2,3)	(3,3)	(4,3)
	(0,4)	(1,4)	(2,4)	(3,4)	(4,4)
	 
```

![Opponent Grid Example](/static/courses/csintro/coordinates/opponent-grid.png)
Opponent’s grid: Keep track of your hits and misses while trying to locate your opponent’s ships.

```
	(0,0)	(1,0)	(2,0)	(3,0)	(4,0)
	(0,1)	(1,1)	(2,1)	(3,1)	(4,1)
	(0,2)	(1,2)	(2,2)	(3,2)	(4,2)
	(0,3)	(1,3)	(2,3)	(3,3)	(4,3)
	(0,4)	(1,4)	(2,4)	(3,4)	(4,4)
```

Then, find someone to play Battleship with. Each person's ships are hidden somewhere on their 5x5 grid. Take turns calling your shots using x- and y-coordinates, in the proper order. Your opponent will use those coordinates to plot the location of your shots.

If a hit is recorded on a ship, then you say, "Hit". If the shot misses, you say, "Miss". If the entire length of a ship is hit, it is sunk and removed from play. Tradition dictates that the player announces, "You sank my battleship!"

Since your grid is only one quarter the size of the original Battleship grid, we suggest that you use fewer and smaller ships. For example, you could play with 3 ships, one each of size 3, 2, and 1.

The game can be played with just paper and pencils or you could use small tokens and markers, like coins, buttons, or paper clips to represent the ships.
 
## Notes:
* The official rules of Battleship are easily found on the internet. Modify them as needed!

![Battleship board game](/static/courses/csintro/coordinates/battleship-board-game.jpg)
The original Battleship Board Game
