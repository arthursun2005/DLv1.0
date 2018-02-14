/*
	These numbers down there are the intervals between the main 
	beats of the music, so that it keeps in sync :)
*/
var Data = {
	music: {
		intervals: [
			12, 16, 16, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 12, 
			4, 8, 4, 1, 1, 4, 4, 1, 1, 4, 4, 4, 6, 4, 4, 4, 4, 4, 
			1, 1, 1, 4, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 
			1, 1, 1, 4, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 
			1, 1, 1, 4, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
			1,1,1,6,32,6,1,2,5,6,1,5,3,1,2,4,32,16,16,32,10,32,40,
			1,1,1,6,32,6,1,2,5,6,1,5,3,1,2,4,32,16,16,32,10,32,40,
			1,1,1,6,32,6,1,2,5,6,1,5,3,1,2,4,32,16,16,32,10,32,40,
		],
		make1: function(){
			var rbs = [];
			var w1 = 30;
			var sr = 15/2;
			var b  = new Block(0,-w1,0,w1,w1,w1);
			b.direction = 3;
			rbs.push(b);
			// b,length,diameter,thickness,changeInY,changeInD,turn,f
			var y = 0, d = 0;
			y = -20, d = 70;
			rbs.push(createNormalBlockFromInterval(rbs[rbs.length-1],sr*this.intervals[0]-d,w1,w1,y,d));
			for (var i = 1; i < this.intervals.length; i++) {
			  var y = 0, d = 0;
			  if(Math.round(this.intervals[i]) == 32){
			    y = -170;
			    d = 220;
			  }
			  rbs.push(createNormalBlockFromInterval(rbs[rbs.length-1],sr*this.intervals[i]-d,w1,w1,y,d));
			}
			return rbs;
		},
		make2: function(){
		}
	}
};