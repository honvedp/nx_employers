
$(document).ready(function(){
	let warningText = '';
	const gDebug = true;
	const gNodeLimit = 150;

	let bUnknown = true;
	let bSolution = true;
	let bProcess = true;
	let bData = true;
	let bSourcedata = true;
	let bReport = true;
	let bView = true;
	let bSourcesystem = true;
	let bIngestion = true;	
	
	let network;
//	let networkAll;
//	let networkFiltered;

	let filter = [];
	let layers = {};
	
	let actNode;
	let selectedNode;
	let pickedNode;
	let onlyDataProcess = false;
	let onlyEmployers = false;
	let nodeIds = [];
	let edgeIds = [];
	let nodeIdFilter = [];
	let nodesDSall = new vis.DataSet();
	let edgesDS = new vis.DataSet();
	let nodesDSVfiltered = new vis.DataView(nodesDSall, {
		filter: function (node) {
			// Ha egy kiválsztott NODE kapcsolatai érdekesek csak (egy DATAFLOW)
/*			if (nodeIdFilter.length > 0) {
				if (onlyDataProcess){
					return (filter.indexOf(node.page_type) !== -1 && nodeIdFilter.indexOf(node.id) !== -1 && hasDataConnection(node))
				} else {
					return (filter.indexOf(node.page_type) !== -1 && nodeIdFilter.indexOf(node.id) !== -1)
				}
			} else {
				if (onlyDataProcess){
					return (filter.indexOf(node.page_type) !== -1 && hasDataConnection(node))
				} else {
					return (filter.indexOf(node.page_type) !== -1)
				}
				
								   group: 'EMPLOYER', 
				
				
			}*/
			if (onlyEmployers) {
				return (node.group !== 'PROJECT')
			} else {
				return (true)
			}
		},
		fields: ['id', 'name', 'group', 'page_type', 'label', 'title', 'fixed', 'x', 'y']
	});
	
	let data = {
//        nodes: nodesDS,
        nodes: nodesDSVfiltered,
        edges: edgesDS
    };
	
    // create a network
	$("#mynetwork").height($(document).height()-95);
    let container = document.getElementById('mynetwork');
	
//	p paraméter lekérése	
	$.urlParam = function (name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) {
			return -1;
		}
		return results[1] || -1;
	}

	const oid = $.urlParam('oid'); 
	
	
//	INIT
	// ha nincs oid (page_id) paraméter, akkor a fetch közben is muttatja, különbem csak ha betöltötte az adatokat
	if (oid === -1) {
		network = new vis.Network(container, data, options);
	} else {
		network = new vis.Network(container);
		network.setOptions(options);
	}
	
	filterChnage();
	getNodes();
	constructLayers();

	// load settings from localStorage
	if (localStorage.getItem("settings-show-layers") !== null) {
		$('#show-layers').attr('checked', localStorage.getItem("settings-show-layers") === 'true');
	}
	if (localStorage.getItem("settings-show-labels") !== null) {
		$('#show-labels').attr('checked', localStorage.getItem("settings-show-labels") === 'true');
		if (localStorage.getItem("settings-show-labels") === 'true') {
			options.nodes.font.size = 14;
		} else {
			options.nodes.font.size = 0;
		}		
		network.setOptions(options);
	}
	if (localStorage.getItem("settings-only-data-process") !== null) {
		$('#only-data-process').attr('checked', localStorage.getItem("settings-only-data-process") === 'true');
		if (localStorage.getItem("settings-only-data-process") === 'true') {
			onlyDataProcess = true;
		} else {
			onlyDataProcess = false;
		}
		nodesDSVfiltered.refresh();
	} else {
		onlyDataProcess = false;
		nodesDSVfiltered.refresh();
	}
	

	$( "#nav-projects" ).click(function() {
		if (onlyEmployers) {
			$("#nav-projects-icon-filter").css('color', 'grey');
		} else{
			$("#nav-projects-icon-filter").css('color', '#007bff'); //#53BAF2
		};
		onlyEmployers = !onlyEmployers;
		nodesDSVfiltered.refresh();

	});	
	
/*	
	$('#Teszt').click(function(e){
         e.preventDefault();
         // your statements;
     });
     $('#Teszt').bind("click",function(){
		myLog("button is clicked");
     });
*/

/*
$("#Teszt").click(function() {
});
*/	


	$('#show-layers').on('change',function(e, myName, myValue) {
		var $input = $( this );
		localStorage.setItem("settings-show-layers", $input[0].checked);
		network.redraw();
	});
	$('#show-labels').on('change',function(e, myName, myValue) {
		var $input = $( this );
		localStorage.setItem("settings-show-labels", $input[0].checked);
		if ($input[0].checked) {
			options.nodes.font.size = 14;
		} else {
			options.nodes.font.size = 0;
		}
		network.setOptions(options);
		
	});		

/*	$('#only-data-process').on('change',function(e, myName, myValue) {
		var $input = $( this );
		localStorage.setItem("settings-Employers", $input[0].checked);
		console.log('only-Employers - CHANGE');
		onlyEmployers = $input[0].checked;
		nodesDSVfiltered.refresh();
	});
*/
	
	$('#Teszt1').on('click',function(e, myName, myValue) {


		actNodes = network.getPositions();
		for (var key in actNodes) {
			actNode = nodesDSall.get(key);
			console.log(actNode);

			if(! actNode.fixed){
//				console.log('y:', actNodes[key].y);
				posX = actNodes[key].x;
				posY = actNodes[key].y;
				
				inConnectionCount = 0;
				outConnectionCount = 0;
				for (i = 0; i < actNode.connections.length; i++) {
					if (actNode.connections[i].direction === 'in') {
						inConnectionCount++;
					} else if (actNode.connections[i].direction === 'out') {
						outConnectionCount++; 
					}
				}
				
				if (inConnectionCount === 0){
					network.moveNode(key, posX, posY - 2000);
				}
				
				if (inConnectionCount > 0 && outConnectionCount > 0){
					network.moveNode(key, posX, posY - 1000);
				}
				
				
				
/*				if (posY > 0) {
					network.moveNode(key, posX, posY + 500);
				} else {
					network.moveNode(key, posX, posY - 500);
				}*/
//				actNode.y = -500;
			}
		}
		
		
	
//		network.fit();	
//		network.stabilize(1000);
//		network.startSimulation();
		
		
//		$('#show-layers').attr('checked', false);

	});	
	$('#Teszt2').on('click',function(e, myName, myValue) {
/*		actNode = nodesDSall.get(7466);
		actNode.fixed = true;		
		actNode.y = -500; */
//		network.moveNode(7466, -500, -500);
/*		network.stabilize(100);
		network.fit();		
		*/
//		nodesDSall.update(actNode);		

		actNode = nodesDSall.get(7261);
		actNode.dataConnection = 2;
		nodesDSall.update(actNode);
		console.log('7261 1: ',nodesDSall.get(7261));
		nodesDSVfiltered.refresh();
		actNode = nodesDSall.get(7261);
		console.log('7261 2: ',nodesDSall.get(7261));
		
	});	
	

	function releaseLayers(){
		for (var property in layers) {
			if (layers.hasOwnProperty(property)) {
				if (layers[property].nodes.length > 0 /*&& property != '9-???'*/){
					for (j = 0; j < layers[property].nodes.length; j++) {
						actNode = nodesDSall.get(layers[property].nodes[j].id);

						actNode.fixed = false;
						delete actNode.x;
						delete actNode.y;	
						
						nodesDSall.update(actNode);		
					}
				}
			}
		}			
	}
	
	function setLayers() {
		let layerCount = 0;
		let actLayer = 0;
		var topLayer = '';
		var downLayer = '';
		
		for (var property in layers) {
			if (layers.hasOwnProperty(property)) {
				if (layers[property].nodes.length > 0){
					layerCount++;
					myLog("   " + property + ": " + layers[property].nodes.length);
					if (topLayer === '') {topLayer = property;}
					downLayer = property;
				}
			}
		}	
		
		canvasHight = 2000;
		let actLayerStart = 0;
		let actLayerEnd = 0;
		
		layerHight       = Math.round(canvasHight / layerCount);
		layerMarginHight = Math.round(layerHight / 5);
		layerRangeHight  = layerHight - 2 * layerMarginHight;
		layerStart = (canvasHight / 2) * -1
		actLayerStart = layerStart;
		actLayerEnd = layerStart + layerHight -1;
			
		canvasHight = (layerCount * 500) + 500 ;
		layerTop = (canvasHight / 2) * -1;
		layerDown = (canvasHight / 2);
		
		// legfelső elem kiválasztása
		var minConInNodes = getExtremNodes(topLayer, 'in');
		
		// legfelső elem elhelyezése
		if (! jQuery.isEmptyObject(minConInNodes)) {
			for (i = 0; i < minConInNodes.length; i++) {
				actNode = minConInNodes[i];
//				console.log('actNode', actNode);
				actNode.fixed = true;		
				if (actNode.page_type === "BD_SOURCESYSTEM") {
					actNode.y =  layerTop - 100; // yPos; 
				} else {
					actNode.y =  layerTop; // yPos; 
				}
				actNode.x = (i + 1) * 200 ; 
				nodesDSall.update(actNode);
			}		
		}
		
		// legalsó elem kiválasztása
		var minConOutNodes = getExtremNodes(downLayer, 'out');
		
		// legalsó elem elhelyezése
		if (! jQuery.isEmptyObject(minConOutNodes)) {
			for (i = 0; i < minConOutNodes.length; i++) {
				actNode = minConOutNodes[i];
				actNode.fixed = true;		
				actNode.y =  layerDown; // yPos; 
				actNode.x = (i + 1) * 200 ; 
				nodesDSall.update(actNode);
			}
		}
	}	

	
	function constructLayers(){
		layers = JSON.parse(JSON.stringify(initLayers));
	};	
	
    network.on("click", function (params) {
		if (params.nodes.length > 0) { // van kiválasztott NODE
			actNode = nodesDSall.get( params.nodes)[0];
			pickedNode = actNode;
			
			document.getElementById("pickedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; ">' + getIconByGroup(actNode, 'i') + '</div><div class="info"><a href=\"' + actNode.url + '" target="_blank" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" title="'+actNode.name+'">'+actNode.name+' DataFlow diagramja</a></div>';
			document.getElementById("objectDetails").innerHTML = actNode.details;
		} else {
			pickedNode = null;
			document.getElementById("pickedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; "> <i id="nav-data-icon" class="fa fa-circle-o nav-icon" style="color: #1063AD; margin-top: .2rem;"></i></div><div class="info"><a href="#" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" >Nincs kiválasztott elem</a></div>';
		}
		clearObjectlist();
		fillObjectlist();
    });
	
    network.on("doubleClick", function (params) {
		nodeIdFilter.length = 0;
		clearObjectlist();
		releaseLayers();
		constructLayers();
		
		if (params.nodes.length > 0) { // van kiválasztott NODE
			network.stabilize();
		
			let lNodeId = params.nodes;
			actNode = nodesDSall.get( params.nodes)[0];

			console.log('doubleClick.actNode: ', actNode);
			
			actNode.fixed = false;
			delete actNode.x;
			delete actNode.y;			
			
			addCallout(actNode);
			
			nodesDSall.update(actNode);
			
			if (actNode.page_type === 'BD_SOLUTION' || actNode.page_type === 'BD_DATAINGESTION' || actNode.page_type === 'BD_SOURCESYSTEM') {
				nodeIdFilter.push(actNode.id);	
				node2Layers(actNode);
				collectChildConnections(actNode);
			} else {
				nodeIdFilter.push(actNode.id);	
				node2Layers(actNode);
//				collectParentConnections(actNode);
				collectIOConnections(actNode, 'in', '.');
				collectIOConnections(actNode, 'out', '.');
			}
			
			fillObjectlist();
			setLayers();
			
		} else {
			removeCallout();
		}
		
		nodesDSVfiltered.refresh();
		network.stabilize(100);
		network.fit();
	
	});
		
	// háttérre rajzol
	network.on("beforeDrawing", function (ctx) {
		// kiválasztott node köré keret rajzolása
		if (selectedNode ){
			actPos = network.getPositions([selectedNode.id])[selectedNode.id];
			
			if (actPos) {
				actX = network.getPositions([selectedNode.id])[selectedNode.id].x;
				actY = network.getPositions([selectedNode.id])[selectedNode.id].y;
		
				ctx.beginPath();
				ctx.lineWidth = 5;
				ctx.strokeStyle = '#4b4b4b';
				ctx.fillStyle = '#FFFFFF';
//				ctx.arc(actX, actY, 100, 0, Math.PI * 2, true); // Outer circle
				if (selectedNode.page_type === 'BD_SOLUTION' || selectedNode.page_type === 'BD_DATAINGESTION' /*|| selectedNode.page_type === 'BD_SOURCESYSTEM'˛*/) {
					ctx.fillRect(actX - 50, actY - 50, 100, 100);
					ctx.rect(actX - 50, actY - 50, 100, 100);
				} else {
					ctx.fillRect(actX - 35, actY - 35, 70, 70);
					ctx.rect(actX - 35, actY - 35, 70, 70);
				}
				ctx.closePath();			
				ctx.stroke();
			}
		}
		
		if (pickedNode ){
			actPos = network.getPositions([pickedNode.id])[pickedNode.id];
			if (actPos) {
				actX = network.getPositions([pickedNode.id])[pickedNode.id].x;
				actY = network.getPositions([pickedNode.id])[pickedNode.id].y;
		
				ctx.beginPath();
				ctx.lineWidth = 5;
				ctx.strokeStyle = '#FFFFFF';
//				ctx.arc(actX, actY, 100, 0, Math.PI * 2, true); // Outer circle
				if (pickedNode.page_type === 'BD_SOLUTION' || pickedNode.page_type === 'BD_DATAINGESTION' /*|| pickedNode.page_type === 'BD_SOURCESYSTEM'˛*/) {
					ctx.rect(actX - 50, actY - 50, 100, 100);
				} else {
					ctx.rect(actX - 35, actY - 35, 70, 70);
				}
				ctx.closePath();			
				ctx.stroke();
			}
		}
		
		
		
		// layer dobozok rajzolása
		if($('#show-layers').prop('checked')) {
			const filteredIds = nodesDSVfiltered.getIds();
			
			//laer-ek kiszámítása
			for (var property in layers) {
				if (layers.hasOwnProperty(property)) {
					layers[property].minX = 0;
					layers[property].maxX = 0; 
					layers[property].minY = 0;
					layers[property].maxY = 0;					
					if (layers[property].nodes.length > 0 ){ // && property != '9-???'
						for (j = 0; j < layers[property].nodes.length; j++) {
							actNode = nodesDSall.get(layers[property].nodes[j].id);
//							console.log('actNode: ', actNode);
/*							console.log('   network.getPositions([actNode.id].x): ', network.getPositions([actNode.id])[actNode.id].x);
							console.log('   network.getPositions([actNode.id].y): ', network.getPositions([actNode.id])[actNode.id].y);*/
							
							if (filteredIds.indexOf(actNode.id) > -1){
								xPos = network.getPositions([actNode.id])[actNode.id].x;
								yPos = network.getPositions([actNode.id])[actNode.id].y;

								if (j == 0) {
									layers[property].minX = xPos;
									layers[property].maxX = xPos; 
									layers[property].minY = yPos;
									layers[property].maxY = yPos;
								} else {
									if( layers[property].minX > xPos ){ layers[property].minX = xPos; }
									if( layers[property].maxX < xPos ){ layers[property].maxX = xPos; }
									if( layers[property].minY > yPos ){ layers[property].minY = yPos; }
									if( layers[property].maxY < yPos ){ layers[property].maxY = yPos; }
								}
							}
						}
						
						// ha a kicsi a doboz, meg kell növelni legalább 100-ra a szélességét, hogy a felirat beleférjen
						if (layers[property].maxX - layers[property].minX < 100) {
							layers[property].maxX = layers[property].minX + 100;
						}
					}
				}
			}		
			
			for (var property in layers) {
				if (layers.hasOwnProperty(property)) {
					if (layers[property].nodes.length > 0 && (layers[property].minX + layers[property].maxX != 0) > 0){
//						myLog("layer" + property + ": minX:" + layers[property].minX + ' , minY: ' + layers[property].minY + ' , maxX: ' + layers[property].maxX + ' , maxY: ' + layers[property].maxY);
					
						ctx.beginPath();
						ctx.fillStyle = layers[property].fillColor;
						ctx.strokeStyle = layers[property].strokeColor;
						ctx.rect(layers[property].minX - 50, 
								layers[property].minY - 100, 
								layers[property].maxX - layers[property].minX + 100, 
								layers[property].maxY - layers[property].minY + 150);		
						ctx.lineWidth = 5;
						ctx.stroke();
						ctx.fill();
						ctx.closePath();
					
						ctx.fillStyle = layers[property].strokeColor
						ctx.font = "bold 20px Comic Sans MS";
						ctx.fillText(property.substr(2) + ' layer',layers[property].minX - 40, layers[property].minY - 70);
						ctx.closePath();
					}
				}
			}
		}
	});

	
/*    network.on("click", function (params) {
		console.log("click.params: ", params);
		if (params.nodes.length > 0) { // van kiválasztott NODE
			console.log("click.params.dolgozik");
			const lNodeId = params.nodes;
			actNode = nodesDSall.get(lNodeId)[0];
			actNode.fixed = false;
			delete actNode.x;
			delete actNode.y;
			nodesDSall.update(actNode);
		} else {
			console.log("click.params.nemDolgozik");
		}
		
		
//		network.stabilize(100);
//		network.fit();
//		nodesDSall.clear();
    });*/
	
/*	
network.on("hoverNode", function(params) {
  $('#mynetwork').qtip({
    content: 'Node with ID: ' + params.node,
      show: {
        event: event.type // original event
      },
      position: {
        my: 'top left',
        target: 'mouse',
        adjust: {
          x: 10, y: 10
        }
      }
    });
});

network.on("blurNode", function(params) {
  $('#mynetwork').qtip({
    content: 'Node with ID: ' + params.node,
    hide: true
  });
});	*/

    network.on("dragStart", function (params) {
		if (params.nodes.length > 0) { // van kiválasztott NODE
			const lNodeId = params.nodes;
			actNode = nodesDSall.get(lNodeId)[0];
			actNode.fixed = false;
			delete actNode.x;
			delete actNode.y;
			nodesDSall.update(actNode);
			
			// ha elkezdem mozgarni az objektumot, elrejtem a tooltip-et
			$(".vis-tooltip").css("visibility", "hidden");
		}
	});	
	
    network.on("dragEnd", function (params) {
		if (params.nodes.length > 0) { // van kiválasztott NODE
			const lNodeId = params.nodes;
			actNode = nodesDSall.get(lNodeId)[0];
			actNode.x = params.pointer.canvas.x;
			actNode.y = params.pointer.canvas.y;	
			actNode.fixed = true;
			nodesDSall.update(actNode);
			
			var actLayer = actNode.layer;
//			if(! actLayer ) { actLayer = '???';}
			if(! actLayer ) { actLayer = '***';}
			
			for (var property in layers) {
				if (property.substr(2) == actLayer){
					
					layers[property].maxX = 0;
					layers[property].minY = 0;

					for (j = 0; j < layers[property].nodes.length; j++) {
						actNode = nodesDSall.get(layers[property].nodes[j].id);
						
						xPos = network.getPositions([actNode.id])[actNode.id].x;
						yPos = network.getPositions([actNode.id])[actNode.id].y;
						if (j == 0) {
							layers[property].minX = xPos;
							layers[property].maxX = xPos; 
							layers[property].minY = yPos;
							layers[property].maxY = yPos;
						} else {
							if( layers[property].minX > xPos ){ layers[property].minX = xPos; }
							if( layers[property].maxX < xPos ){ layers[property].maxX = xPos; }
							if( layers[property].minY > yPos ){ layers[property].minY = yPos; }
							if( layers[property].maxY < yPos ){ layers[property].maxY = yPos; }
						}
					}					
				} 
			}
		}
    });	

    function pickNode(p_nodeId) {
						
			nodeIdFilter.length = 0;
			
			clearObjectlist();
			removeCallout();
			constructLayers();
			network.stabilize();

			actNode = nodesDSall.get(p_nodeId);
//			myLog('actNode.id: ' + actNode.id);
			
			actNode.fixed = false;
			delete actNode.x;
			delete actNode.y;			
			
			addCallout(actNode);
			
//			actNode.y = 10; 
//			actNode.fixed = true;
			nodesDSall.update(actNode);
			
			if (actNode.page_type === 'BD_SOLUTION' || actNode.page_type === 'BD_DATAINGESTION' || actNode.page_type === 'BD_SOURCESYSTEM') {
				// Ktvadmin.rfdata yyMMd
				nodeIdFilter.push(actNode.id);	
//				console.log('pickNode.sourcesystem', actNode);
				node2Layers(actNode);
//				console.log('pickNode.layers', layers);
				collectChildConnections(actNode);
			} else {
				nodeIdFilter.push(actNode.id);	
				node2Layers(actNode);
//				collectParentConnections(actNode);
				collectIOConnections(actNode, 'in', '.');
				collectIOConnections(actNode, 'out', '.');
			}
			
			fillObjectlist();
			setLayers();
			
		nodesDSVfiltered.refresh();
		network.stabilize(100);
		network.fit();			
    };
	
	function collectChildConnections(p_actNode){
		for (i in p_actNode.connections) {
			if (p_actNode.connections[i].con_type == 'P') {
				nodeIdFilter.push(p_actNode.connections[i].node.id);
				node2Layers(p_actNode.connections[i].node);
//				myLog('connections: ' + p_actNode.connections[i].con_type + ' id: ' + p_actNode.connections[i].node.id);
			}
		}
	}
	
	function collectIOConnections(p_actNode, p_conDirection, p_prevNodeId){
//		myLog('p_actNode.id: ' + p_actNode.id + ', p_prevNodeId: ' + p_prevNodeId + ', p_conDirection: ' + p_conDirection);
//		if (nodeIdFilter.indexOf(p_actNode.id) < 0 ){
//			nodeIdFilter.push(p_actNode.id);	

//			console.log('collectIOConnections', p_actNode);
			for (i in p_actNode.connections) {
//				actNode = nodesDSall.get(p_actNode.connections[i].node.id);
//				myLog(actNode);
//				myLog('my connections: ' + p_actNode.connections[i].con_type + ' id: ' + p_actNode.connections[i].node.id + ' Layer: ' + p_actNode.connections[i].node.layer + ' Label: ' + p_actNode.connections[i].node.name);
//				myLog('my connections: ' + p_actNode.connections[i].con_type + ' id: ' + p_actNode.connections[i].node.id + ' Layer: ' + p_actNode.connections[i].node.layer + ' Label: ' + p_actNode.connections[i].node.name);
				
//				node2Layers(p_actNode.connections[i].node);

				if (p_actNode.connections[i].con_type == 'P') {
					if (nodeIdFilter.indexOf(p_actNode.connections[i].id) < 0 ){
						nodeIdFilter.push(p_actNode.connections[i].id);
						node2Layers(p_actNode.connections[i].node);
//						myLog('connections: ' + p_actNode.connections[i].con_type + ' id: ' + p_actNode.connections[i].node.id);
					}
				}
				if (p_actNode.connections[i].direction == p_conDirection && p_actNode.id !== p_prevNodeId) {
//					myLog('OK p_conDirection: ' + p_conDirection + ', ' + 'p_actNode.connections[i].direction: ' + p_actNode.connections[i].direction);
					if (nodeIdFilter.indexOf(p_actNode.connections[i].id) < 0 ){ // ha még nincs a listán
//						myLog('   OK p_conDirection: ' + p_conDirection + ', ' + 'p_actNode.id: ' + p_actNode.id + ', p_actNode.connections[i].node.id: ' + p_actNode.connections[i].node.id);

						// csak akkor kell 'C' (Call) típusú kapcsolat, ha az az aktuális NODE-ra mutat
						if (p_actNode.connections[i].con_type != 'C' || (p_actNode.connections[i].con_type == 'C' && p_actNode.connections[i].direction == 'in')) {
							nodeIdFilter.push(p_actNode.connections[i].id);						
							node2Layers(p_actNode.connections[i].node);
							collectIOConnections(p_actNode.connections[i].node, p_conDirection, p_actNode.id);
						}
					} else {
						myLog('   NOK p_conDirection: ' + p_conDirection + ', ' + 'p_actNode.id: ' + p_actNode.id + ', p_actNode.connections[i].node.id: ' + p_actNode.connections[i].node.id);
//						addWarning('Már van ilyen NODE!');
					}
				}
			}		
/*		} else {*/
//			myLog('   NOK p_conDirection: ' + p_conDirection + ', ' + 'p_actNode.id: ' + p_actNode.id + ', p_actNode.connections[i].node.id: ' + p_actNode.connections[i].node.id);
			//addWarning('Már van ilyen NODE!');
//		}
	}

	// layer-be sorolás layer és / vagy page_type alapján
	function node2Layers(pNode){
				switch(pNode.layer) {
					case "Source":
						if (! layers["1-Source"].nodes.includes(pNode)){
							layers["1-Source"].nodes.push(pNode);
						}
						break;					
					case "Mirror":
						if (! layers["2-Mirror"].nodes.includes(pNode)){
							layers["2-Mirror"].nodes.push(pNode);
						}
						break;
					case "Engineering":
						if (! layers["3-Engineering"].nodes.includes(pNode)){
							layers["3-Engineering"].nodes.push(pNode);
						}					
						break;
					case "Analytical":
						if (! layers["4-Analytical"].nodes.includes(pNode)){
							layers["4-Analytical"].nodes.push(pNode);
						}
						break;
					case "Consumption":
						if (! layers["5-Consumption"].nodes.includes(pNode)){
							layers["5-Consumption"].nodes.push(pNode);
						}					
						break;
					case "Easy To Data":
						if (! layers["6-Easy To Data"].nodes.includes(pNode)){
							layers["6-Easy To Data"].nodes.push(pNode);
						}					
						break;
						
					default:
						switch(pNode.page_type){
							case "BD_REPORT":
								if (! layers["5-Consumption"].nodes.includes(pNode)){
									layers["5-Consumption"].nodes.push(pNode);
								}							
								break;
							case "BD_SOURCEDATA":
								if (! layers["1-Source"].nodes.includes(pNode)){
									layers["1-Source"].nodes.push(pNode);
								}							
								break;
							case "BD_SOURCESYSTEM":
								if (! layers["1-Source"].nodes.includes(pNode)){
									layers["1-Source"].nodes.push(pNode);
								}							
								break;
						}
						break;
				}		
	}
	
	
	// Obektum filter
	$("#obejctFilter").on("keyup", function() {
		const value = $(this).val().toLowerCase();
//		myLog(value);

		if ($('#Objektumlista').is(':empty')){
			const lFilter = $("#obejctFilter").val();
			clearObjectlist();
			$("#obejctFilter").val(lFilter);
			fillObjectlist();
		}

		$("#Objektumlista li").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});	
	
	
	// objektum választó
	$( ".nav-obj-el" ).click(function() {
//		myLog($(this).val());
		myLog('Katt');
	});		
	
	$( "#nav-solution" ).click(function() {
		if (bSolution) {
			$("#nav-solution-icon-filter").css('color', 'grey');
		} else{
			$("#nav-solution-icon-filter").css('color', '#007bff'); //#FF9A1E
		};
		bSolution = !bSolution;
		filterChnage();
		
	});	
	$( "#nav-unknown" ).click(function() {
		if (bUnknown) {
			$("#nav-unknown-icon-filter").css('color', 'grey');
		} else{
			$("#nav-unknown-icon-filter").css('color', '#007bff'); //#FFD329
		};
		bUnknown = !bUnknown;
		filterChnage();
	});	
	$( "#nav-process" ).click(function() {
		if (bProcess) {
			$("#nav-process-icon-filter").css('color', 'grey');
		} else{
			$("#nav-process-icon-filter").css('color', '#007bff'); //#53BAF2
		};
		bProcess = !bProcess;
		filterChnage();
	});		
	$( "#nav-data" ).click(function() {
		if (bData) {
			$("#nav-data-icon-filter").css('color', 'grey');
		} else{
			$("#nav-data-icon-filter").css('color', '#007bff'); //#1063AD
		};
		bData = !bData;
		filterChnage();
	});			
	$( "#nav-sourcedata" ).click(function() {
		if (bSourcedata) {
			$("#nav-sourcedata-icon-filter").css('color', 'grey');
		} else{
			$("#nav-sourcedata-icon-filter").css('color', '#007bff'); //#1063AD
		};
		bSourcedata = !bSourcedata;
		filterChnage();
	});	
	$( "#nav-report" ).click(function() {
		if (bReport) {
			$("#nav-report-icon-filter").css('color', 'grey');
		} else{
			$("#nav-report-icon-filter").css('color', '#007bff'); //#BFCB44
		};
		bReport = !bReport;
		filterChnage();
	});	
	$( "#nav-view" ).click(function() {
		if (bView) {
			$("#nav-view-icon-filter").css('color', 'grey');
		} else{
			$("#nav-view-icon-filter").css('color', '#007bff'); //#BFCB44
		};
		bView = !bView;
		filterChnage();
	});	
	$( "#nav-sourcesystem" ).click(function() {
		if (bSourcesystem) {
			$("#nav-sourcesystem-icon-filter").css('color', 'grey');
		} else{
			$("#nav-sourcesystem-icon-filter").css('color', '#007bff'); //#D48936
		};
		bSourcesystem = !bSourcesystem;
		filterChnage();
	});	
	$( "#nav-ingestion" ).click(function() {
		if (bIngestion) {
			$("#nav-ingestion-icon-filter").css('color', 'grey');
		} else{
			$("#nav-ingestion-icon-filter").css('color', '#007bff'); //#D48936
		};
		bIngestion = !bIngestion;
		filterChnage();
	});	
	
	function filterChnage(){
		filter.length = 0;
		if (bSolution) { filter.push('BD_SOLUTION'); }
		if (bUnknown) { filter.push('UNKNOWN'); }
		if (bProcess) { filter.push('BD_PROCESS'); }
		if (bData) { filter.push('BD_DATA'); }
		if (bSourcedata) { filter.push('BD_SOURCEDATA'); }
		if (bReport) { filter.push('BD_REPORT'); }
		if (bView) { filter.push('BD_VIEW'); }
		if (bSourcesystem) { filter.push('BD_SOURCESYSTEM'); }
		if (bIngestion) { filter.push('BD_DATAINGESTION'); }
	
		nodesDSVfiltered.refresh();
		
		if (nodeIdFilter.length > 0) {
			clearObjectlist();
			fillObjectlist();
		}
	}

    function fit(){
		myLog('fit');
		network.fit();
    }
  
  
  /*
	function loadData(fromDT, toDT, userID, projektID, showProjects, allocated) {
		myLog("loadData - START");	

		nodes.clear();
		edges.clear();
		nodeIds.length = 0;
		edgeIds.length = 0;
		actNodes.length = 0;

		for (i = 0; i < employersD.length; i++ ) {          
			munkaviszonyFrom = new Date(employersD[i].munkaviszonyFrom);
			(employersD[i].munkaviszonyTo) ? munkaviszonyTo = new Date(employersD[i].munkaviszonyTo) : munkaviszonyTo = new Date();

			if (munkaviszonyFrom <=  fromDT && munkaviszonyTo >= toDT) {
				upsertNode(employersD[i].id, employersD[i].name, employersD[i].name + '</br>(' + employersD[i].email + ')', 'dot', 'user', employersD[i].treeData);
//				myLog('eventsD végigolvasása: ' + employersD[i].name);
			}
		}
		
		if (showProjects) {
			for (i = 0; i < allocationsD.length; i++ ) {
				bShow = true;
				if (allocated && allocationsD[i].allocPercent == 0) {
					bShow = false;
				}	
				
				if (bShow) {
					allocationFrom = new Date(allocationsD[i].fromDT);
					allocationTo = new Date(allocationsD[i].toDT);
		//			if (allocationFrom <=  fromDT && allocationTo >= toDT) {
					if ( (allocationFrom <= fromDT  && allocationTo >=  fromDT ) ||
						(allocationFrom >=  fromDT && allocationTo <= toDT ) ||
						(allocationFrom >=  fromDT && allocationTo >= toDT ) 
						) 
					{
						upsertNode('pn_' + allocationsD[i].projectCode, allocationsD[i].projectCode, allocationsD[i].projectName, 'dot', 'project');
						upsertEdge('pn_' + allocationsD[i].projectCode, allocationsD[i].userId);
					}
				}
			}		
		}
		
		
		for (i = 0; i < conversationsD.length; i++ ) {
			eventDT = new Date(conversationsD[i].eventDT);
			if (eventDT >=  fromDT && eventDT <= toDT) {
				upsertEdge(conversationsD[i].userIdFrom, conversationsD[i].userIdTo, conversationsD[i].eventDT);
				eventDT = new Date(conversationsD[i].eventDT);

			}
		}
	
		
	  myLog("loadData - END");	
		
	}
  
  */
  
  
  
	function getNodes(){
		let lRESP;
		let lPos;
		

// 				pagesD végigolvasása
/*				lLabel = "";
				lTitle = "";
				lDetails = "";
				lHeaderText = "";
				lRESP = false;
				lTECH = false;
				lSEC = false;*/
				
				
				for (i in employersD ) {
					lId = employersD[i].id;
					munkaviszonyFrom = new Date(employersD[i].munkaviszonyFrom);
					(employersD[i].munkaviszonyTo) ? munkaviszonyTo = new Date(employersD[i].munkaviszonyTo) : munkaviszonyTo = new Date();

					if (  nodeIds.indexOf( lId ) < 0 ) {
						actNode = {id: lId, 
						           title: employersD[i].name + '</br>(' + employersD[i].email + ')',
								   label: employersD[i].name, 
								   shape: 'dot', 
								   size: 15, 
								   icon: {size: 15}, 
								   group: 'EMPLOYER', 
								   treeData: []
								   };
								   
						nodeIds.push(lId, 'EMPLOYER');
						nodesDSall.add(actNode);						
					}
				}
				
				
				for (i in allocationsD ) {
					lId = 'pn_' + allocationsD[i].projectCode;
					allocationFrom = new Date(allocationsD[i].fromDT);
					allocationTo = new Date(allocationsD[i].toDT);
					
					if (gDebug == true && i >  gNodeLimit) { break; }
					if (  nodeIds.indexOf( lId ) < 0 ) {
						actNode = {id: lId, 
						           title: allocationsD[i].projectName, 
								   label: allocationsD[i].projectCode, 
								   shape: 'dot', 
								   size: 15, 
								   icon: {size: 15}, 
								   group: 'PROJECT', 
								   treeData: []
								   };
//						actNode.title = '<div style="text-align: center; font: 15pt arial; font-weight: bold; padding-top: 15px; padding-right: 15px; padding-left: 15px;">' + getIconByGroup(actNode, 'p') + ' <big>&nbsp;&nbsp;' + pagesD[i].page_name + '</big></div>' + actNode.title;

						nodeIds.push(lId, 'PROJECT');
						nodesDSall.add(actNode);
					
					}

						
					fromNode = nodesDSall.get('pn_' + allocationsD[i].projectCode);
					toNode = nodesDSall.get(allocationsD[i].userId);
					if (fromNode != null && toNode != null){
						lId = fromNode.id + ' -> ' + toNode.id;

						if ( edgeIds.indexOf( lId) >= 0) {
							edgesDS.update([{id: lId, width: edgesDS.get(lId).width + 1 }]);
						} else {
							edgesDS.add({id: lId, from: fromNode.id, to: toNode.id, width: 1});
							edgeIds.push(lId);
						}
					}
					
				}
				
				for (i in conversationsD ) {
					
					
					fromNode = conversationsD[i].userIdFrom;
					toNode = conversationsD[i].userIdTo;
					conNode = fromNode + ' ' + conversationsD[i].messageType + ' ' + toNode;

					if (fromNode != null && toNode != null){
						if (  nodeIds.indexOf( conNode ) < 0 ) {
							actNode = {	id: conNode, 
										title: conversationsD[i].messageType, 
										label: conversationsD[i].messageType, 
										shape: 'dot', 
										size: 15, 
										icon: {size: 15}, 
										group: conversationsD[i].messageType, 
										treeData: []
										};
//							actNode.title = '<div style="text-align: center; font: 15pt arial; font-weight: bold; padding-top: 15px; padding-right: 15px; padding-left: 15px;">' + getIconByGroup(actNode, 'p') + ' <big>&nbsp;&nbsp;' + pagesD[i].page_name + '</big></div>' + actNode.title;

							nodeIds.push(conNode, conversationsD[i].messageType);
							nodesDSall.add(actNode);							
						}


						lId = fromNode + ' -> ' + conNode;
						iEdge = edgeIds.indexOf( lId);
						if ( iEdge >= 0) {
							edgesDS.update([{id: lId, width: edgesDS.get(lId).width + 1}]);
						} else {
							edgesDS.add({id: lId, from: fromNode, to: conNode, width: 1});
							edgeIds.push(lId);
						}
						
						lId = conNode + ' -> ' + toNode;
						iEdge = edgeIds.indexOf( lId);
						if ( iEdge >= 0) {
							edgesDS.update([{id: lId, width: edgesDS.get(lId).width + 1}]);
						} else {
							edgesDS.add({id: lId, from: conNode, to: toNode, width: 1});
							edgeIds.push(lId);
						}						
						
						
					}
				}
				
				network.setData(data);

//				getEdges();
	}

	
	function getEdges(){
		const xmlhttp = new XMLHttpRequest();
		let fromNode;
		let toNode;

		xmlhttp.open("GET", url.edges, true);
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				const edgesD = JSON.parse(this.responseText);
// 				edgesD végigolvasása

				edgesDS.add(edgesD);

				for (i in edgesD) {
//					switch(edgesD[i].con_type) {
					fromNode = null;
					fromDirection = null;
					toNode = null;
					toDirection = null;
//					isData = null;
					// kapcsoltok felépítése
//					if (edgesD[i].con_type == "P") { // PARENT
//						myLog('edgesD[i].from_type: ' + edgesD[i].from_type + ', to_type: ' + edgesD[i].to_type+ ', con_type: ' + edgesD[i].con_type);
//						myLog('edgesD[i].from_type: ' + edgesD[i].from_type + ', to_type: ' + edgesD[i].to_type+ ', con_type: ' + edgesD[i].con_type+ ', arrows: ' + edgesD[i].arrows);
						fromNode = nodesDSall.get(edgesD[i].from);
						toNode = nodesDSall.get(edgesD[i].to);
/*						if (fromNode != null && toNode != null){
							console.log('Node.id: ', fromNode.id);
							if (fromNode.id == '7260')  {
								console.log('fromNode', fromNode);
							}
							if (toNode.id == '7260')  {
								console.log('toNode', fromNode);
							}
						}*/
						switch  (edgesD[i].arrows) {
							case 'from': 
								fromDirection = 'in';
								toDirection = 'out';
								break;
							case 'to': 
								fromDirection = 'out';
								toDirection = 'in';
								break;
							default: 
								fromDirection = '--';
								toDirection = '--';
								break;
						}

						
//						myLog('fromNode.id: ' + fromNode.id);						
//						myLog('toNode.id: ' + toNode.id);						
						if (fromNode != null && toNode != null){
							fromNode.connections.push({con_type: edgesD[i].con_type, direction: fromDirection, id: toNode.id , node: toNode});
							toNode.connections.push({con_type: edgesD[i].con_type, direction: toDirection, id: fromNode.id , node: fromNode});

/*							if (isData == true) {
								if (! fromNode.hasDataConnection == true){
									if (fromNode.id == '7261')  {
										console.log('! fromNode.hasDataConnection');
										fromNode.hasDataConnection = true;
//									nodesDSall.update(fromNode);	
										nodesDSall.update({id: 7261, hasDataConnection: true});
										console.log('fromNode.hasDataConnection update', fromNode.hasDataConnection);
										console.log('fromNode after update', fromNode);
									}
								}
								if (! toNode.hasDataConnection == true){
									if (toNode.id == '7261')  {
										console.log('! toNode.hasDataConnection');
										toNode.hasDataConnection = true;
	//								nodesDSall.update(toNode);	
										nodesDSall.update({id: 7261, hasDataConnection: true});
										console.log('toNode after update', toNode);
									}
								}
								
							}*/
//							myLog('két értékem van');
						}
//					}
				}

				if (oid > -1) {
					network.setData(data);
					pickNode(oid);
				}

			}
		};
		
		xmlhttp.send();
	}	

	function addWarning(newText) {
				if (warningText !== '') {
					warningText = warningText + '<br>';
				}
				warningText = warningText + newText
				document.getElementById("myalert").innerHTML = '<div class="alert alert-warning alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <h5><i class="icon fa fa-warning"></i>Adathiba</h5>' + warningText + '</div>';
	}

	function addCallout(pNode) {
		document.getElementById("pickedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; ">' + getIconByGroup(actNode, 'i') + '</div><div class="info"><a href=\"' + pNode.url + '" target="_blank" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" title="'+pNode.name+'">'+pNode.name+' DataFlow diagramja</a></div>';
		document.getElementById("selectedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; ">' + getIconByGroup(actNode, 'i') + '</div><div class="info"><a href=\"' + pNode.url + '" target="_blank" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" title="'+pNode.name+'">'+pNode.name+' DataFlow diagramja</a></div>';
		document.getElementById("objectDetails").innerHTML = actNode.details;

		selectNode(pNode);
	}

	function selectNode(pNode) {
		if (typeof selectedNode !== "undefined" && selectedNode !== null) {
			deselectNode(selectedNode);
		}
		if (! pNode.selected) {
			pNode.selected = true;
			nodesDSall.update(pNode);
		}
		selectedNode = pNode;
		pickedNode = pNode;
		
	}

	function removeCallout() {
		document.getElementById("pickedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; "> <i id="nav-data-icon" class="fa fa-circle-o nav-icon" style="color: #1063AD; margin-top: .2rem;"></i></div><div class="info"><a href="#" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" >Nincs kiválasztott elem</a></div>';
		document.getElementById("selectedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; "> <i id="nav-data-icon" class="fa fa-circle-o nav-icon" style="color: #1063AD; margin-top: .2rem;"></i></div><div class="info"><a href="#" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" >Nincs kiválasztott elem</a></div>';
//		document.getElementById("objectDetails").innerHTML = '<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false"> <li class="nav-item has-treeview menu "> <a href="#" class="nav-link active"  > <i class="nav-icon fa fa-info-circle "></i> <p>Részletek <i class="right fa fa-angle-left"></i> </p> </a> <ul class="nav nav-treeview "></ul>';
		document.getElementById("objectDetails").innerHTML = '';
		deselectNode(selectedNode);
	}

    function deselectNode(pNode) {
		if (pNode) {
			if (selectedNode) {
				pNode.selected = false;
				nodesDSall.update(pNode);
			}
			selectedNode = null;
			pickedNode = null;
		}
    };		
	
	function clearObjectlist(){
		$("#obejctFilter").val('');
		$("#Objektumlista").empty();
		$("#Objektumlista").off("dblclick");
		$("#Objektumlista").off("click");
	}
	
	function fillObjectlist(){
		const delay = 200;
		const nodeIdFiltered = nodesDSVfiltered.getIds();
		var timer = 0;
		var prevent = false;
		
		for (i in nodeIdFiltered) {
			actNode = nodesDSall.get(nodeIdFiltered[i]);			
//			$("#Objektumlista").append('<li id="' + actNode.id + '" class="nav-item nav-obj-el"> <a href="#" class="nav-link"> <i id="nav-un-icon" class="fa fa-circle-o nav-icon"></i> <p>' + actNode.title + '</p> </a> </li>');
//			$("#Objektumlista").append('<li id="' + actNode.id + '" class="nav-item nav-obj-el"> <a href="#" class="nav-link"> <i id="nav-solution-icon" class="fa fa-circle nav-icon" style="color: #FF9A1E;"></i> <p>' + actNode.title + '</p> </a> </li>');

			if (actNode.selected) {
				$("#Objektumlista").append('<li id="' + actNode.id + '" class="nav-item nav-obj-el"> <a href="#" class="nav-link" title="' + actNode.name + '">' + getIconByGroup(actNode, 'i', true) + ' <p id="callout-link-white">' + actNode.name + '</p> </a> </li>');
			} else {
				$("#Objektumlista").append('<li id="' + actNode.id + '" class="nav-item nav-obj-el"> <a href="#" class="nav-link" title="' + actNode.name + '">' + getIconByGroup(actNode, 'i', true) + ' <p id="callout-link">' + actNode.name + '</p> </a> </li>');
			}
		}

		$('#Objektumlista').on('dblclick','.nav-obj-el',function(e, myName, myValue) {
			clearTimeout(timer);
			prevent = true;
			dblclickObjektum(this.id);			
		});
		$('#Objektumlista').on('click','.nav-obj-el',function(e, myName, myValue) {
			const lId = this.id;
			timer = setTimeout(function() {
			if (!prevent) {
				clickObjektum(lId);
			}
      prevent = false;
    }, delay);			
			
		});
	}

	function dblclickObjektum(pNodeId){
		 pickNode(pNodeId);
	}
	function clickObjektum(pNodeId){
			actNode = nodesDSall.get( pNodeId);
			pickedNode = actNode;
			network.redraw();
			
			document.getElementById("pickedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; ">' + getIconByGroup(pickedNode, 'i', false) + '</div><div class="info"><a href=\"' + pickedNode.url + '" target="_blank" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" title="'+pickedNode.name+'"> '+pickedNode.name+'</a></div>';
			document.getElementById("objectDetails").innerHTML = pickedNode.details;
			
			clearObjectlist();
			fillObjectlist();
	}
	
	function getIconByGroup(pNode, pTag, pDecoration) {
		var rIcon;
		var lIcon;
		var lSelected = '';

		if (pDecoration) {
			if ((pickedNode) && (pNode.id == pickedNode.id)) {
				lSelected = ' fa-border';
			} else {
				lSelected = '';
			}
		}
		switch(pNode.layer) {
			case "Source":
				lColor = layerColors.source.html;
				break;
			case "Mirror":
				lColor = layerColors.mirror.html;
				break;
			case "Engineering":
				lColor = layerColors.engineering.html;
				break;
			case "Analytical":
				lColor = layerColors.analytical.html;
				break;
			case "Consumption":
				lColor = layerColors.consumption.html;
				break;
			case "Easy To Data":				
				lColor = layerColors.easyToData.html;
				break;
			default:
				lColor = layerColors.unknown.html;
				break;
		}
		
		
		switch(pNode.page_type) {
			case "BD_SOLUTION":
				if (pNode.layer == '') {
					lColor = layerColors.source.html	;				
				}
				lIcon = 'fa-circle';
				break;
			case "BD_DATAINGESTION":
				if (pNode.layer == '') {
					lColor = layerColors.source.html	;				
				}
				lIcon = 'fa-circle-o';
				break;
			case "BD_SOURCESYSTEM":
				lIcon = 'fa-database';
				break;
			case "BD_PROCESS":
				lIcon = 'fa-cog';
				break;
			case "BD_SOURCEDATA":
				lIcon = 'fa-square';
				break;
			case "BD_DATA":
				lIcon = 'fa-square';
				break;
			case "BD_REPORT":
				lIcon = 'fa-file-text';
				break;
			case "BD_VIEW":
				lIcon = 'fa-caret-square-o-down';
				break;
			case "UNKNOWN":
				lIcon = 'fa-question';
				break;
			default:
				lIcon = 'fa-circle-o';
//				rIcon = '<i' + pTag + ' id="nav-un-icon" class="fa fa-circle-o nav-icon"></' + pTag + '>';
				break;
		}
		
		if (pNode.selected && pDecoration){
			return '<span class="fa-stack fa-lg">  <i class="fa fa-square fa-stack-2x" style="color: #FFFFFF;"></i>   <i class="fa ' + lIcon + ' fa-stack-1x" style="color: ' + lColor + ';"></i> </span>';
		} else {
			rIcon = '<' + pTag + ' id="nav-unknown-icon" class="fa ' + lIcon + ' nav-icon' + lSelected + '" style="color: ' + lColor + ';"></' + pTag + '>';						
			return rIcon;
		}
	}

	// debug 
	function myLog(logText){
		const dt = new Date();
		if (gDebug == true) {
			console.log(logText /*+ ' - ' + dt.toUTCString()*/);	
		}
	}
});	






/*
<div class="vis-tooltip" style="left: 0px; top: 0px; visibility: hidden;"><div style="text-align: center; font: 15pt arial; font-weight: bold; padding-top: 15px; padding-right: 15px; padding-left: 15px;"><p id="nav-unknown-icon" class="fa fa-square nav-icon" style="color: #1063AD;"></p> <big>&nbsp;&nbsp;DWH.ENG IPTV EVENT table</big></div><table class="node-hint" style="width:100%"><tbody><tr class="node-hint-header"><td>&nbsp;</td><td>Felelősök</td></tr><tr><td class="node-hint-key">BigData felelős</td> <td>Füzes Márta</td></tr><tr class="node-hint-header"><td>&nbsp;</td><td>Technikai információk</td></tr><tr><td class="node-hint-key">Státusz</td> <td>live</td></tr><tr><td class="node-hint-key">Frissítési gyakoriság</td> <td>daily</td></tr><tr><td class="node-hint-key">Típus</td> <td>table</td></tr><tr><td class="node-hint-key">BigData layer</td> <td>Analytical</td></tr><tr><td class="node-hint-key">Tulajdonos</td> <td>dwh</td></tr><tr><td class="node-hint-key">Path</td> <td>dwh</td></tr></tbody></table></div>
*/