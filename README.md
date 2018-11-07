# oct_10 [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 
## Introductoin
This project uses Monte Carlo methods on a Markov Chain between different graph states. Points are placed on a plane using graph.place(index, x, y), with the first point being a source node. Distances between points are given by the Euclidean distance between them. Edges in a graph are drawn using graph.connect(v1, v2).

Graphs are proposed from the previous graph by either adding an edge, deleting an edge, or swapping two existing edges. Graphs are accepted based on their relative goodness, which incorporates connectedness, total edge weights, and total source-to-node path lengths. The relative goodness equation is shown below.

\begin{align*}
$$f(X_i,X_j) = e^{-(wt(X_j) - wt(X_i))/T}$$
$$f({X_i},{X_j}) = e^{-(\Theta(X_j) - \Theta(X_i))/T}$$

where

$$\Theta(X_i) = r \sum_e w_e + \sum_k^M \sum_{e \in p_{0k}} w_e$$
\end{align*}


Summary statistics such as expected total number of edges, expected central edges, expected furthest distance, and top 1% of graphs are given.
## Installation

```sh
$ npm install --save oct_10
```

## Usage

```js
const oct10 = require('oct_10');

oct10('Rainbow');
```
## License

BSD-2-Clause-FreeBSD © [yaraki]()


[npm-image]: https://badge.fury.io/js/oct_10.svg
[npm-url]: https://npmjs.org/package/oct_10
[travis-image]: https://travis-ci.org/yaraki0912/oct_10.svg?branch=master
[travis-url]: https://travis-ci.org/yaraki0912/oct_10
[daviddm-image]: https://david-dm.org/yaraki0912/oct_10.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/yaraki0912/oct_10
[coveralls-image]: https://coveralls.io/repos/yaraki0912/oct_10/badge.svg
[coveralls-url]: https://coveralls.io/r/yaraki0912/oct_10
