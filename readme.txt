Hello! Welcome to the readme.

The basic power of the code I've provided here is the easy creation of network data in a relatively user-friendly interface. That means that there is a lot of JavaScript and D3 to explore, while the HTML and CSS are unlikely to draw any attention.

This site is fairly small, and the bulk of the interesting work takes place in script.js. The site itself is available to use at https://loss.peterforberg.com, but if you wish to run it on your local system, it should be as easy as unzipping this folder and opening any of the HTML pages. This site has not been optimized for mobile devices, though everything should work with touchscreens and tablets.

As you might've noticed, this document was written in a text editor with word wrap on, which I would suggest generally for ease of reading the code here.

OK, so the basics are this:
- style.css contains all external styling.
- example.js provides the JavaScript for index.html's example graphs
- tutorial.js powers tutorial.html with a little help from script.js
- script.js powers the entirety of this tool, namely lose.html
- about.html is very short and sweet html
- there is sass on this site, not even used once, I just like the sass functionality and thought I might leverage it

If, while using the network tool, you decide to export your data and want to quickly visualize it, I would recommend using it to replace the current value of the variable "data" in example.js (where the "meat" networks are stored) and then resizing the svg to whatever size you desire (currently it's 800x600, but 100vw and 100vh would make it full screen).

I think that should be all, enjoy!