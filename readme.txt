Readme for js-p5-example
Time-stamp: <2020-10-23 22:34:00 Nicolas Vasquez>
------------------------------------------------------------
Class Number:  

      CPSC 353-05

Project: 

      #1 Simple Block Encryption

Team: 

      3NB
      Nicolas Vasquez, Nathan Vu, Bryant Nguyen, Nicholas Jones

Intro:

      This project takes two string inputs from the user in order to encrypt them.
      You can press the submit button to have the encryption process start; you will
      see the plaintext message displayed on the top grid and the encrypted message
      in the bottom grid. The encryption algorithm used was the ECB mechanism. 
      The website includes instructions on how to format the plaintext message and password.

      This is an example project using HTML, Javascript (JS), and P5.js
      which is a JS-adapted version of the Processing Language.  CF HTML and
      JS on the web (eg, Wikipedia).  More on P5 is at
      p5js.org/reference.and at github.com/processing/p5.js/wiki.

      P5 provides sutomated animation (via a user-built "draw" function),
      and GUI manipulation functions that are simpler than JS.

Zip Contents:

  File readme.txt.  This file.

  File pix-js-p5-example-1.JPG.  A snapshot of the example webpage.

  File pix-js-p5-example2-F12-Console.JPG  A webpage + F12 Console.
    Shows entering some global var names to see their current values.

  File index-js-p5-example.html. Drag and drop this into a browser to
    run the example.
    Click to set new loc for drunk-bot (via mousePressed).
    Hit (almost) any key to toggle bot on or off (via keyPressed).

  File p5.js. This is the P5 package.  It is loaded inside the html.

  File cs-sketch.js; This contains several P5 user-defined linkage functions
    (setup, draw, keyPressed, and mousePressed), as well as example
    support functions. P5's setup() is run once before page display.
    P5's text() is run twice to display both the plaintext message and the
    encrypted message.

  File assets/styles.css.  This is an extra-small example of controlling
    webpage styling.  // Loaded inside the html.

  File assets/draw-stuff.js. This is an example to show loading a JS
    script file from a folder other than the index HTML file's
    folder location.  It also includes the utility draw_grid function
    written in P5+JS. // Loaded inside the html.

Installation & Running:

  1. Extract the .zip file into a folder.

  2. Drag the index HTML file, index-js-p5-example.html, into a browser
    window.  The example P5 program should start immediately.  You
    should see a 640x480 grid (white lines on black background) with
    row/column headers and some of the grid cells colored.  See the
    picture pix-js-p5-example-1.JPG.

Known Bugs:

    None

Warnings

    If plaintext or password input are not in the format that the  
    instructions lay out, the encryption will not begin

Testing

    Following installation instruction, above, watched it run, and
    tryed a few different plaintext and password combinations.  Looks okay to ship.

Credits

    Some code was borrowed and modified from Stuart's book.  
    Introducing JavaScript Game Development: Build a 2D Game from the
    Ground Up, by Graeme Stuart, 2018, 209 pages.

    And, of course, thanks to the HTML and P5.js developers.
