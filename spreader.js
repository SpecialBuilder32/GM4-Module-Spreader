	var canvas;
	var c;
	var midx;
	var midy;
	var pi = Math.PI;
	
	var boxes = [];
	var boxSize = 25; // size of box
	
	var tickTotal = 16;	// total ticks to spread modules across
	var groupSize = 3; // sorting group size
	
	var worldList = new moduleList([]);	// contains module objects
	
	// source data for modules
	var batGrenades = {name : "Bat Grenades", profile : [1], color : "darkviolet", marker : "GM4_batGrenades"};
	var endermanSupport = {name : "Enderman Support", profile : [2], color : "darkcyan", marker : "GM4_endermanSupport"};
	var weightedArmor = {name : "Weighted Armor", profile : [1], color : "dimgray", marker : "GM4_weightedArmour"};
	var undeadPlayers = {name : "Undead Players", profile : [1], color : "darkolivegreen", marker : "GM4_undeadPlayers"};
	var inkSquid = {name : "Ink Spitting Squid", profile : [1, 1], color : "navy", marker : "GM4_inkSquid"};
	var decorMush = {name : "Decorative Mushroom" , profile : [3], color : "red", marker : "GM4_decorativeMushroom"};
	var verticalRails = {name : "Vertical Rails" , profile : [3], color : "gold", marker : "GM4_verticalRails"};
	var customCrafting = {name : "Custom Crafting" , profile : [3, 10, 10], color : "peru", marker : "GM4_customCrafter"};
	var sunkenTreasure = {name : "Sunken Treasure" , profile : [1], color : "royalblue", marker : "GM4_sunkenTreasure"};
	var armorStands = {name : "Better Armor Stands" , profile : [1, 2], color : "brown", marker : "MS_BAClock"};
	var liquidTanks = {name : "Liquid Tanks" , profile : [3, 1, 10, 10, 4, 2], color : "yellowgreen", marker : "GM4_liquidTanks"};
	var enchExtract = {name : "Enchantment Extractors" , profile : [2, 7], color : "mediumvioletred", marker : "GM4_enchantExtractor"};
	var pigTractors = {name : "Pig Tractors" , profile : [1], color : "pink", marker : "GM4_pigTractors"};
	var enderHoppers = {name : "Ender Hoppers" , profile : [3], color : "darkslategray", marker : "GM4_enderHoppers"};
	var zauberCauldrons = {name : "Zauber Cauldrons" , profile : [4, 9, 7, 0, 0, 0, 0, 0, 4, 9, 7], color : "darkorange", marker : "GM4_ZC01"};
	var sweethearts = {name : "Sweet Hearts" , profile : [1, 1], color : "magenta", marker : "GM4_sweethearts"};
	var mysteriousMids = {name : "Mysterious Midnights" , profile : [1, 3, 1, 2, 1, 2], color : "midnightblue", marker : "GM4_mystNights"};
	var metallurgy = {name : "Metallurgy" , profile : [3, 9, 10], color : "cyan", marker : "GM4_metallurgy"};
	var speedPaths = {name : "Speed Paths", profile : [1, 0, 0, 0, 0, 0, 0, 0, 1], color : "green", marker : "GM4_speedPaths"};
	var advancePack = {name : "Advancement Pack", profile : [1], color : "brown", marker : "GM4_advancPack"};

	
	var doneSpread = true;
	var modified = false;
	
	var graphCumuHeight = [];
	var bars = [];
	
	
	
	
	
	
    function initialize() {
        canvas = document.getElementById( "canvas" );
        if ( canvas && canvas.getContext ) {
            c = canvas.getContext( "2d" );
			
			// Center of screen
			midx = canvas.width/2;
			midy = canvas.height/2;
			
			// Selection Menu
			canvas.addEventListener("mousedown", mouseDown);
			window.addEventListener("keydown", keyStroke);
			
			//Button Init
			boxes.push(new box(10, 10, batGrenades));
			boxes.push(new box(10, 40, endermanSupport));
			boxes.push(new box(10, 70, weightedArmor));
			boxes.push(new box(10, 100, undeadPlayers));
			boxes.push(new box(10, 130, inkSquid));
			boxes.push(new box(10, 160, decorMush));
			boxes.push(new box(10, 190, speedPaths));
			boxes.push(new box(270, 10, verticalRails));
			boxes.push(new box(270, 40, customCrafting));
			boxes.push(new box(270, 70, sunkenTreasure));
			boxes.push(new box(270, 100, armorStands));
			boxes.push(new box(270, 130, liquidTanks));
			boxes.push(new box(270, 160, enchExtract));
			boxes.push(new box(270, 190, advancePack));
			boxes.push(new box(530, 10, pigTractors));
			boxes.push(new box(530, 40, enderHoppers));
			boxes.push(new box(530, 70, zauberCauldrons));
			boxes.push(new box(530, 100, sweethearts));
			boxes.push(new box(530, 130, mysteriousMids));
			boxes.push(new box(530, 160, metallurgy));
						            			
			drawScreen();   // call the function to draw once
			//window.setInterval("drawScreen()",1000/60);  // call repeatedly
			
        } // end if
    } // initialize()
	  
	  	  
		  
		  
	function drawScreen() {
	  
	  // Draw Background
	  
	  c.beginPath();
	  c.fillStyle = "white";	//#4AA0C7
	  c.fillRect(0,0, canvas.width, canvas.height);
	  c.closePath();
	  
	  c.beginPath();
	  c.strokeStyle = "#4AA0C7";
	  c.lineWidth = 8;
	  c.moveTo(1,1);
	  c.lineTo(canvas.width-1, 1);
	  c.lineTo(canvas.width-1, canvas.height-1);
	  c.lineTo(1, canvas.height-1);
	  c.lineTo(1,1);
	  c.stroke();
	  c.closePath();

	  //Draw Graph
	  c.beginPath();
	  c.strokeStyle = "#4AA0C7";
	  c.lineCap = "round";
	  c.moveTo(45, 350);
	  c.lineTo(45, 550);
	  c.lineTo(750, 550);
	  c.stroke();
	  c.closePath();
	  
	  for (var i = 1; i < tickTotal; i++)
	  {
		  var xGraphScale = 700 / tickTotal;
		  c.beginPath();
		  c.lineWidth = 4;
		  c.moveTo(50 + (xGraphScale * i), 540);
		  c.lineTo(50 + (xGraphScale * i), 560);
		  c.stroke();
		  c.closePath();
	  }
	  
	  //spread modules
	  if (!doneSpread && worldList.list.length > 1)
	  {
		  spreadModules();
	  }
	  
	  //draw re-spread button
	  if (modified)
	  {
		  c.beginPath();
		  c.fillStyle = "#4AA0C7";
		  c.font = "normal 20pt arial";
		  c.textAlign = "left";
		  c.textBaseline = "bottom";
		  c.fillText("Restore Edits", 500, 320);
		  c.closePath();
		  
		  c.beginPath();
		  c.strokeStyle = "#4AA0C7";
		  c.rect(490, 320, 180, -30);
		  c.stroke();
		  c.closePath();
	  }
	  
	  
	  //Draw Module Displays
	  for (var i = 0; i < tickTotal; i++)
		  graphCumuHeight[i] = 0;
	  
	  bars = [];
	  
	  for (var i = 0; i < worldList.list.length; i++)
	  {
		  c.beginPath();
		  c.fillStyle = worldList.list[i].color;
		  c.shadowColor = worldList.list[i].color;
		  c.strokeStyle = "black";
		  c.lineWidth = 2;
		  
		  for (var j = 0; j < worldList.list[i].profile.length; j++)
		  {
			  graphCumuHeight[j + worldList.list[i].tick] += worldList.list[i].profile[j];
			  c.rect( (50 + (xGraphScale * (j + worldList.list[i].tick) ) ), (545 - (graphCumuHeight[j + worldList.list[i].tick] * 10) ), xGraphScale, worldList.list[i].profile[j] * 10);
			  bars.push(new bar((50 + (xGraphScale * (j + worldList.list[i].tick) ) ), (545 - (graphCumuHeight[j + worldList.list[i].tick] * 10) ), xGraphScale, worldList.list[i].profile[j] * 10, i));
		  }
		  
		  for (var j = 0; j < worldList.list[i].profile.length; j++)
		  {
			  graphCumuHeight[j + worldList.list[i].overflowTick] += worldList.list[i].profile[j];
			  c.rect( (50 + (xGraphScale * (j + worldList.list[i].overflowTick) ) ), (545 - (graphCumuHeight[j + worldList.list[i].overflowTick] * 10) ), xGraphScale, worldList.list[i].profile[j] * 10);
			  bars.push(new bar((50 + (xGraphScale * (j + worldList.list[i].overflowTick) ) ), (545 - (graphCumuHeight[j + worldList.list[i].overflowTick] * 10) ), xGraphScale, worldList.list[i].profile[j] * 10, i));
			  if (bars[bars.length-1].isInvalid())
				  bars.splice(bars.length-1, 1);
		  }
		  
		  if (worldList.list[i].sel)
			  c.shadowBlur = 15;
		  
		  c.fill();
		  c.stroke();
		  c.closePath();
		  
		  c.shadowBlur = 0;
		  
		  //module info
		  if (worldList.list[i].sel)
		  {
			  c.beginPath();
			  c.font = "normal 20pt arial";
			  c.textAlign = "left";
			  c.textBaseline = "bottom";
			  c.fillStyle = worldList.list[i].color;
			  c.fillText(worldList.list[i].name + ", Tick : " + worldList.list[i].tick, 50, 320);
			  c.closePath();
		  }
	  }
	  
	  
	  // Draw Boxes
	  for (var i = 0; i < boxes.length; i++)
	  {
		  c.beginPath();
		  c.fillStyle = "#4AA0C7";
		  c.fillRect(boxes[i].x, boxes[i].y, boxSize, boxSize);
		  c.closePath();
		  
		  c.beginPath();
		  c.fillStyle = "black";
		  c.font = "normal 16pt arial";
		  c.textAlign = "left";
		  c.textBaseline = "top";
		  c.fillText(boxes[i].boxModule.name, (boxes[i].x + boxSize), boxes[i].y);
		  c.closePath();
		  
		  if (boxes[i].pressed)
		  {
			  c.beginPath();
			  c.strokeStyle = "black";
			  c.lineWidth = 5;
			  c.lineCap = "round";
			  c.moveTo(boxes[i].x, (boxes[i].y + (boxSize / 2) ) );
			  c.lineTo( (boxes[i].x + (boxSize / 3) ), (boxes[i].y + boxSize) );
			  c.lineTo( (boxes[i].x + boxSize), boxes[i].y );
			  c.stroke();
			  c.closePath();
		  }
	  }
	  
	  //draw one-click button	  
	  c.beginPath();
	  c.fillStyle = "#4AA0C7";
	  c.font = "normal 20pt arial";
	  c.textAlign = "center";
	  c.textBaseLine = "top";
	  c.fillText("Generate One-Click", 400, 240);
	  c.closePath();
	  
	  c.beginPath();
	  c.shadoeBlur = 0;
	  c.strokeStyle = "#4AA0C7";
	  c.rect(270, 240, 260, 30);
	  c.stroke();
	  c.closePath();
	 	 
	} // end drawScreen
	
	
	
	
	function mouseDown(mouse)
	{
		var mouseX = mouse.pageX - canvas.offsetLeft;
		var mouseY = mouse.pageY - canvas.offsetTop;
		
		for (var i = 0; i < worldList.list.length; i++)
		{
			worldList.list[i].sel = false;
		}

		
		for (var i = 0; i < boxes.length; i++)
		{
			if (boxes[i].within(mouseX, mouseY))
			{
				boxes[i].press();
			}
		}
		
		for (var i = 0; i < bars.length; i++)
		{
			if (bars[i].within(mouseX, mouseY))
			{
				worldList.list[bars[i].moduleI].sel = true;
			}
		}
		
		//if re-spread button
		if (mouseX > 490 && mouseX < 670 && mouseY > 290 && mouseY < 320)
		{
			doneSpread = false;
		}
		
		//if one-click button
		if (mouseX > 270 && mouseX < 530 && mouseY > 240 && mouseY < 270)
		{
			generateOneClick();
		}
		
		//console.log(mouseX, mouseY);
		drawScreen();
		
	} // end mouseDown

	
	
	function keyStroke(key)
	{
		switch (key.keyCode)
		{
			case 37:	//left
				for (var i = 0; i < worldList.list.length; i++)
				{
					if (worldList.list[i].sel)
					{
						worldList.list[i].tick--;
						if (worldList.list[i].tick < 0)
							worldList.list[i].tick = 15;
						worldList.list[i].normalizeOverflow();
					}
				}
				modified = true;
				break;
			case 39: 	//right
				for (var i = 0; i < worldList.list.length; i++)
				{
					if (worldList.list[i].sel)
					{
						worldList.list[i].tick++;
						if (worldList.list[i].tick > 15)
							worldList.list[i].tick = 0;
						worldList.list[i].normalizeOverflow();
					}
				modified = true;
				}
				break;
			default:
				//console.log(key.keyCode)
				break;
		}
		drawScreen();
	}
	
	
	
	function module(name, profile, color, tick, marker)
	{
		this.name = name;
		this.profile = profile;
		this.color = color;
		this.marker = marker;
		this.lock = false;
		this.sel = false;
		this.complex = (profile.length > 1);
		this.tick = tick;
		this.overflowTick = tickTotal;
		this.total = 0;
		for (var i = 0; i < profile.length; i++)
			this.total += profile[i];
		
		this.normalizeOverflow = function() {
			if ( (this.tick + this.profile.length) > tickTotal)
				this.overflowTick = this.tick - tickTotal;
			else
				this.overflowTick = tickTotal;
		}
	}	// end module class
	
	
	
	
	function moduleList(array)	//stores modules in array.
	{
		this.list = [];
		
		for (var i = 0; i < array.length; i++)
		{
			this.list.push(new module(array[i].name, array[i].profile, array[i].color, array[i].tick, array[i].marker));
			if (array[i].lock)
				this.list[this.list.length-1].lock = true;
		}
		
		this.order = function order() {	//bubble sorts list by total
			var maxTotal = 0;
			var maxIdx = 0;
		
			for (var i = 0; i < this.list.length - 1; i++)
			{
				for (var j = i; j < this.list.length; j++)
				{
					if (this.list[j].total > maxTotal)
					{
						maxTotal = this.list[j].total;
						maxIdx = j;
					}
				
					this.list[i] =  this.list.splice(maxIdx, 1, this.list[i])[0];
				}
				maxTotal = 0;
			}
		}
		
		this.add = function add(addModule, tick) { //adds module to list
			this.list.push(new module(addModule.name, addModule.profile, addModule.color, tick, addModule.marker));
		}
		
		this.lock = function lock() {	//locks all modules in list
			for (var i = 0; i < this.list.length; i++)
			{
				this.list[i].lock = true;
			}
		}
		
		this.combine = function combine(addList) {	//adds contents of given module list to this
			for (var i = 0; i < addList.list.length; i++)
			{
				this.add(addList.list[i], addList.list[i].tick)
				
			}
		}
		
		this.copyTicks = function copyTicks(inList) {// copies tick data from given modulelist. requires same order of modules
			for (var i = 0; i < this.list.length; i++)
			{
				for (var j = 0; j < inList.list.length; j++)
				{
					if (this.list[i].name == inList.list[j].name)
					{
						this.list[i].tick = inList.list[j].tick;
						this.list[i].normalizeOverflow();
					}
				}
			}
		}
		
		this.increment = function increment() {//increments list tick by one place value if not locked
			var unlockedList = [];
			for (var i = 0; i < this.list.length; i++)
			{
				if (!this.list[i].lock)
				{
					unlockedList.push(i);;
				}
			}
			if (unlockedList.length > 0)
			{
				this.list[unlockedList[0]].tick ++;
				for (var i = 0; i < unlockedList.length; i++)
				{
					if (this.list[unlockedList[i]].tick >= tickTotal)
					{
						this.list[unlockedList[i]].tick = 0;
						if (i < unlockedList.length - 1)
							this.list[unlockedList[i+1]].tick++;
					}
					this.list[unlockedList[i]].normalizeOverflow();
				}
			}
			
		}
		
	}
	
	
	
	
	function box(x, y, boxModule)
	{
		this.x = x;
		this.y = y;
		this.boxModule = boxModule;
		this.pressed = false;
		
		
		//toggles pressed state and adds/removes module from worldList
		this.press = function press() {
			if (this.pressed)
			{
				this.pressed = false;
				for (var i = 0; i < worldList.list.length; i++)
				{
					if (worldList.list[i].name == boxModule.name)
						worldList.list.splice(i, 1 );
				}
			}

			else if (!this.pressed)
			{
				this.pressed = true;
				worldList.add(this.boxModule, 0);
				worldList.order();
			}
			doneSpread = false;
				
		}
	
		this.within = function within(checkX, checkY) {
			if (checkX > this.x && checkY > this.y && checkX < this.x + boxSize && checkY < this.y + boxSize)
				return true;
			else return false;
		}
	} // end box class
	
	
	
	
	function bar(barX, barY, barDX, barDY, moduleI)	//stores coordinates of display graph for click detection
	{
		this.x = barX;
		this.y = barY;
		this.dx = barDX;
		this.dy = barDY;
		this.moduleI = moduleI;
		if (x = 750)
		
		this.within = function within(checkX, checkY) {
			if (checkX > this.x && checkX < this.x + this.dx && checkY > this.y && checkY < this.y + this.dy)
				return true;
		}
		
		this.isInvalid = function isInvalid() {
			if ( isNaN(this.x) || isNaN(this.y) )
				return true;
			else
				return false;
		}
	}
	
	
	
	function stat(sourceList)		//stores worldAverage, worldMax, worldStandardDeviation for each module placement senerio
	{
		this.data = new moduleList(sourceList.list);
		
		this.tickIntensities = [];
		this.averageIntensity = 0;	
		this.maxIntensity = 0;	
		this.standardDeviation = 0;
		this.paddingDifference = 0;
		this.decisionDistance = 0;
					
		//updates stat values
		this.recalcStat = function recalcStat() {
			this.tickIntensities = [];
			this.averageIntensity = 0;	
			this.maxIntensity = 0;	
			this.standardDeviation = 0;
			
			//tickIntensities
			for (var i = 0; i < tickTotal; i++)
				this.tickIntensities[i] = 0;
			
			for (var i = 0; i < this.data.list.length; i++)
				this.data.list[i].normalizeOverflow();
		
			for (var i = 0; i < this.data.list.length; i++)
			{
				for (var j = 0; j < this.data.list[i].profile.length; j++)
				{
					this.tickIntensities[j + this.data.list[i].tick] += this.data.list[i].profile[j];
				}
		  
				for (var j = 0; j < this.data.list[i].profile.length; j++)
				{
					this.tickIntensities[j + this.data.list[i].overflowTick] += this.data.list[i].profile[j];
				}
			}
			//averageIntensity
			for (var i = 0; i < tickTotal; i++)
			{
				this.averageIntensity += this.tickIntensities[i];
			}
			
			this.averageIntensity /= tickTotal;
			
			//maxIntensity
			for (var i = 0; i < tickTotal; i++)
			{
				if (this.tickIntensities[i] > this.maxIntensity)
					this.maxIntensity = this.tickIntensities[i];
			}
			
			//standardDeviation
			var stdCal = [];
			for (var i = 0; i < tickTotal; i++)
			{
				stdCal[i] = Math.pow((this.tickIntensities[i] - this.averageIntensity), 2)
			}
			for (var i = 0; i < tickTotal; i++)
			{
				this.standardDeviation += stdCal[i];
			}
			this.standardDeviation /= tickTotal;
			this.standardDeviation = Math.sqrt(this.standardDeviation);
			
			//paddingDifference
			var padCal = [];
			var padCalcI = 0;
			var minPad = tickTotal;
			var maxPad = 0;
			
			for (var i = 0; i < tickTotal; i++)
			{
				if (this.tickIntensities[i] == 0)
				{
					if (padCal.length == padCalcI)
						padCal[padCalcI] = 1;
					else 
						padCal[padCalcI]++;
					
				}
				else if (this.tickIntensities[i] >= 1 && this.tickIntensities[i-1] == 0)
				{
					padCalcI++;
				}
				
			}
			for (var i = 0; i < padCal.length; i++)
			{
				if (padCal[i] > maxPad)
					maxPad = padCal[i];
				if (padCal[i] < minPad)
					minPad = padCal[i];
			}
			this.paddingDifference = maxPad - minPad;
			if (padCal.length == 1)
			{
				this.paddingDifference = tickTotal;
			}
			
			//decisionDistance
			var a, b, c;
			
			a = this.standardDeviation;
			b = this.maxIntensity;
			c = Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) );
			
			a = c;
			b = this.paddingDifference;
			c = Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) );
			
			this.decisionDistance = c;
		}
		
	} // end stat class
	
	
	
	
	function spreadModules()
	{
	
		//create groups for sorting
		var subLists = [];	//smaller groups to sort and layer
		var complexList = new moduleList([]);	//list of all complex modules
		var simpleList = new moduleList([]); 	//list of all simple modules
		for (var i = 0; i < worldList.list.length; i++)
		{
			if (worldList.list[i].complex)
				complexList.add(worldList.list[i], 0);
			else
				simpleList.add(worldList.list[i], 0);
		}
		
		var subListSplit = 0; var subListSplitI = 0;
		for (var i = 0; i < complexList.list.length; i++)
		{
			if (subListSplit == 0)
			{
				subLists[subListSplitI] = new moduleList([]);
				
			}
			subLists[subListSplitI].add(complexList.list[i], 0);
			subListSplit++;
			if (subListSplit >= groupSize)
			{
				subListSplit = 0;
				subListSplitI++;
			}	
		}
		
		//sort complex groups
		var buildList = new moduleList([]);
		for (var i = 0; i < subLists.length; i++)
		{
			buildList.combine(subLists[i]);
			if (i <= 0 && subLists[0].list.length > 1)
			{
				buildList.list[0].lock = true;
			}
			buildList.copyTicks( generateBestStat(buildList).data );
			buildList.lock();
		}
				
		//sort simple groups
		buildStat = new stat(buildList);
		buildStat.recalcStat();
		for (var i = 0; i < simpleList.list.length; i++)
		{
			var lowestTick = 0;
			var lowestIntensity = 100;
				
			for (var j = 0; j < tickTotal; j++)
			{
				if (buildStat.tickIntensities[j] < lowestIntensity)
				{
					lowestTick = j;
					lowestIntensity = buildStat.tickIntensities[j];
				}
			}
			buildList.add(simpleList.list[i], lowestTick);
			buildStat.data.add(simpleList.list[i], lowestTick);
			buildStat.recalcStat();
		}
		
		//finalise best list
		doneSpread = true;
		modified = false;
		worldList.copyTicks(buildList);
	} // end spreadComplex
	
	
	
	
	function generateBestStat(inputList)		//returns best stat from a given list
	{
		var bestStat = new stat(inputList);
		var calStat = new stat(inputList);
		calStat.recalcStat();
		var minDecisionVal = 100;
		var lastUnlockedI = 0;
		for (var i = 0; i < inputList.list.length; i++)
		{
			if (!inputList.list[i].locked)
			{
				lastUnlockedI = i;
			}
		}
		
		while (calStat.data.list[lastUnlockedI].tick < tickTotal - 1)
		{	
			if (calStat.decisionDistance <= minDecisionVal)
			{
				minDecisionVal = calStat.decisionDistance;
				bestStat.data.copyTicks(calStat.data);
				bestStat.recalcStat();
			}
			
			calStat.data.increment();
			calStat.recalcStat();
		}
		return bestStat;
	}
	

	
	function generateOneClick()				//generates and putputs one-click
	{
		var output = "summon falling_block ~ ~1.5 ~ {Motion:[0.0,-1.0,0.0],Time:1,DropItem:0,Block:redstone_block,Passengers:[{id:\"falling_block\",Time:1,DropItem:0,Block:activator_rail},{id:\"commandblock_minecart\",Command:";
		
		for (var i = 0; i < worldList.list.length; i++)
		{
			output += "\"scoreboard players set @e[name=" + worldList.list[i].marker + ",c=1] GM4_clockTick " + worldList.list[i].tick + "\"},{id:\"commandblock_minecart\",Command:";
		}
		
		output += "\"kill @e[type=commandblock_minecart,r=1]\"}]}";
		document.getElementById("oneclick").innerHTML = output;
	}

	
	
	
	
	
	
	
	

	

	