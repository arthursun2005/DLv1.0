var Data = {
	m1: {
		U: {
			F: [
				function(){}
			]
		},
		notes: [
			// length, dy ,dd ,diameter, thickness, f
			[320,-10,0,20,30,null],
			[120,-30,100,20,30,null],
			[120,-30,100,30,30,null],
			[240,-0,0,30,50,null],

			[120,-0,0,30,50,null],
			[120,-30,100,30,50,null],
			[120,-0,0,30,120,null],
			[120,-30,100,30,120,null],
			[120,-30,100,30,120,null],
			[120,-0,0,30,120,null],
			[120,-30,100,30,120,null],
			[120,-30,100,30,120,null],
			[120,-30,100,30,120,null],

			[90,-5,40,25,10,null],
			[30,-0,0,25,10,function(b){}],
			[60,-1,40,25,10,function(b){}],
			[45,-1,20,25,10,function(b){}],
			[7.5,-0,0,25,10,function(b){}],
			[7.5,-0,0,25,10,function(b){}],
			[30,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[7.5,-0,0,25,10,function(b){}],
			[7.5,-0,0,25,10,function(b){}],
			[30,-1,0,25,10,function(b){}],
			[30,-1,20,25,10,function(b){}],
			[30,-2,0,25,10,function(b){}],
			[45,-2,30,25,10,function(b){}],
			[30,-2,0,25,10,function(b){}],
			[30,-2,0,25,10,function(b){}],
			[30,-2,0,25,10,function(b){}],
			[30,-1,0,25,10,function(b){}],
			[30,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[30,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[15,-0,0,25,10,function(b){}],
			[30,-0,0,25,10,function(b){}],
		],
		make1: function(x,y,z){
			var rr = [];
			var it = this.notes;
			var d = it[0][2];
			var b = new Block(0,-20+it[0][1]-it[0][4]/2,-50-d,it[0][3],it[0][4],it[0][0]-d+it[0][3]);
			rr.push(b);
			for (var i = 1; i < it.length; i++) {
				var d = it[i][2];
				// b,length,diameter,thickness,changeInY,changeInD,f
				var b = createNormalBlockFromInterval(rr[rr.length-1],it[i][0]-d,it[i][3],it[i][4],it[i][1],d,it[i][5]);
				rr.push(b);
			}
			return rr;
		},
		speed: 2.55
	}
};