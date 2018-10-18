'use strict';

class Operations{
  constructor(a,b){
    this.points = [a,b];
  }
  addPoints(){
    var sum = this.points[1] + this.points[0];
    return sum;
  }
}
var nodes = new Operations(1,2);
console.log(nodes.addPoints());

module.exports = {Operations};
