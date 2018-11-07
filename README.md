# Markov-Chain-Monte-Carlo [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 
## Introductoin
This project uses Monte Carlo methods on a Markov Chain between different graph states.Markov chain Monte Carlo (MCMC) methods are a class of algorithms for sampling from a probability distribution based on constructing a Markov chain that has the desired distribution as its equilibrium distribution. 
Graphs are proposed from the previous graph by either adding an edge, deleting an edge. Graphs are accepted based on their relative goodness, which incorporates connectedness, total edge weights, and total source-to-node path lengths. The relative goodness equation is shown below.

f(X_i,X_j) = e^{-(wt(X_j) - wt(X_i))/T}



## Installation
$ git clone https://github.com/yaraki0912/Markov-Chain-Monte-Carlo
$ cd Markov-Chain-Monte-Carlo

```sh
$ npm install --save oct_10
```

## Usage
After cloning this ripository, you can run by 
$ node lib\index.js 
with default values.
To change the values, go to the bottom codes of index.js
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
