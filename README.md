# toys
This directory is a collection of single page applications that I have built to explore various ideas. I have played around with:
* Simple games
* Data vizualisation algorithms
* Google charts API
* Machine learning approaches
* Automated trading using bitcoin price data

## 1-boxes.html
[Demo](1-boxes.html)
This is a simple implementation of that 3x3 tile game. Fun times :smile:

## 2-diff_input.html
[Demo](2-diff_input.html)
Enter text into each of the input boxes and then click "Compare Inputs" to see the differences in the two text inputs Implements the Javascript Diff Algorithm by John Resig found here http://ejohn.org/projects/javascript-diff-algorithm/

## 3-force_direct.html
[Demo](3-force_direct.html)
This app implements the force directed algorithm discussed [here](http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=6297585)
A network diagram is created from node and link JSON data, where the network is modelled using a "repulsive force" between nodes and an "attractive force" between connected nodes.  

## 4-arc_network.html
[Demo](4-arc_network.html)
Another data viz app, this time representing a network using a linear arrangement of nodes and arcs between connected nodes. Also discussed [here](http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=6297585)

## 5-oneNN.html
[Demo](5-oneNN.html)
This app builds a data set of nodes in a square and tests the one nearest neighbour algorithm against it. The tomek-links optimisation is also implemented with black lines. Hit refresh to see another random distribution. Orginally discussed in "An introduction to machine learning" by Miroslav Kubat Springer.

## 6a-btcgbp.html
[Demo](6a-btcgbp.html)
Bitcoin price data is analysed using some simple trading signals. Results displayed using the Google charts API.

## 6b-btc-trading.html
[Demo](6b-btc-trading.html)
A simple trading algorithm is applied to the bitcoin price data. The returns are charted using the Google charts API, and the results are analysed for statistical significance.

## 7-nm.test.html
[Demo](7-nm.test.html)
This app runs some tests using the Jasime testing framework against some utility functions created in nm.js

## 8-svg_animation.html
[Demo](8-svg_animation.html)
A simple CSS rotation using the cubic-bezier transform function

