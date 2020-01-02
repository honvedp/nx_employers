
$(document).ready(function(){
	let warningText = '';
	const gDebug = true;
	const gNodeLimit = 150;

	let network;
	let bProject = true;
	let bAllocated = false;
	let bCall = true;
	let bEmail = true;
	let bRank1 = true;
	let bRank2 = true;
	let bRank3 = true;
	let bRank4 = true;
	let bRank5 = true;
	let edgeFilter = ['CALL', 'EMAIL', 'RANK-1', 'RANK-2', 'RANK-3', 'RANK-4', 'RANK-5'];
	let actNode;
	let pickedNode;
	let nodeIds = [];
	let edgeIds = [];
	let nodesDSall = new vis.DataSet();
	let nodesDSVfiltered = new vis.DataView(nodesDSall, {
		filter: function (node) {
			if (bProject) {
				return (true)
			} else {
				return (node.group !== 'PROJECT')
			}
		}
	});
	let edgesDSall = new vis.DataSet();


	let edgesDSVfiltered = new vis.DataView(edgesDSall, {
		filter: function (edge) {

			switch(edge.type){
				case "CONVERSATION":
					return (edge.width > 0);
					break;
				case "PROJECT":
					if (bAllocated) {
						return true;
					} else {
						return (edge.allocPercent > 0);
					}
					break;
				default:
					return true;
			}
		}
	});	

	let data = {
//        nodes: nodesDS,
        nodes: nodesDSVfiltered,
        edges: edgesDSVfiltered
    };
	
    // create a network
//	$("#mynetwork").height($(document).height()-95);
	if($(document).height() > 800 ) {
		$("#mynetwork").height($(document).height() - $(document).height()/4);
	} else {
		$("#mynetwork").height($(document).height() - 200);
	}
    let container = document.getElementById('mynetwork');
	
//	p paraméter lekérése	
/*	$.urlParam = function (name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) {
			return -1;
		}
		return results[1] || -1;
	}

	const oid = $.urlParam('oid'); 
*/	
	
//	INIT
	// ha nincs oid (page_id) paraméter, akkor a fetch közben is muttatja, különbem csak ha betöltötte az adatokat
/*	if (oid === -1) {
		network = new vis.Network(container, data, options);
	} else {*/
	network = new vis.Network(container);
	network.setOptions(options);
//	}
	
/*	edgesDSall.on('update', function (event, properties, senderId) {
		console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
	});
*/


//	filterChnage();
	getNodes();

	// load settings from localStorage
/*	if (localStorage.getItem("settings-show-layers") !== null) {
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
	*/

	$( "#nav-projects" ).click(function() {
		if (bProject) {
			$("#nav-projects-icon-filter").css('color', 'grey');
		} else{
			$("#nav-projects-icon-filter").css('color', '#007bff'); //#53BAF2
		};
		bProject = !bProject;
		nodesDSVfiltered.refresh();
	});	

	$( "#nav-allocated" ).click(function() {
		if (bAllocated) {
			$("#nav-allocated-icon-filter").css('color', '#007bff'); //#53BAF2
		} else{
			$("#nav-allocated-icon-filter").css('color', 'grey');
		};
		bAllocated = !bAllocated;
		edgesDSVfiltered.refresh();
	});	

	$( "#nav-phone" ).click(function() {
		if (bCall) {
			$("#nav-phone-icon-filter").css('color', 'grey');
		} else{
			$("#nav-phone-icon-filter").css('color', '#007bff'); //#53BAF2
		};
		bCall = !bCall;
		filterChnage();
	});	

	$( "#nav-email" ).click(function() {
		if (bEmail) {
			$("#nav-email-icon-filter").css('color', 'grey');
		} else{
			$("#nav-email-icon-filter").css('color', '#007bff'); //#53BAF2
		};
		bEmail = !bEmail;
		filterChnage();
	});	

	$( "#nav-rank-1" ).click(function() {
		if (bRank1) {
			$("#nav-rank-1-icon-filter").css('color', 'grey');
		} else{
			$("#nav-rank-1-icon-filter").css('color', '#660000'); //#53BAF2
		};
		bRank1 = !bRank1;
		filterChnage();
	});	

	$( "#nav-rank-2" ).click(function() {
		if (bRank2) {
			$("#nav-rank-2-icon-filter").css('color', 'grey');
		} else{
			$("#nav-rank-2-icon-filter").css('color', '#ff6600'); //#53BAF2
		};
		bRank2 = !bRank2;
		filterChnage();
	});	

	$( "#nav-rank-3" ).click(function() {
		if (bRank3) {
			$("#nav-rank-3-icon-filter").css('color', 'grey');
		} else{
			$("#nav-rank-3-icon-filter").css('color', '#ffcc00'); //#53BAF2
		};
		bRank3 = !bRank3;
		filterChnage();
	});	

	$( "#nav-rank-4" ).click(function() {
		if (bRank4) {
			$("#nav-rank-4-icon-filter").css('color', 'grey');
		} else{
			$("#nav-rank-4-icon-filter").css('color', '#99ff33'); //#53BAF2
		};
		bRank4 = !bRank4;
		filterChnage();
	});	

	$( "#nav-rank-5" ).click(function() {
		if (bRank5) {
			$("#nav-rank-5-icon-filter").css('color', 'grey');
		} else{
			$("#nav-rank-5-icon-filter").css('color', '#009900'); //#53BAF2
		};
		bRank5 = !bRank5;
		filterChnage();
	});	

	function filterChnage(){
		edgeFilter.length = 0;
		if (bCall) { edgeFilter.push('CALL'); }
		if (bEmail) { edgeFilter.push('EMAIL'); }
		if (bRank1) { edgeFilter.push('RANK-1'); }
		if (bRank2) { edgeFilter.push('RANK-2'); }
		if (bRank3) { edgeFilter.push('RANK-3'); }
		if (bRank4) { edgeFilter.push('RANK-4'); }
		if (bRank5) { edgeFilter.push('RANK-5'); }

		edgeIds.forEach(setEdgeProperies);
		
		if (edgeFilter.length > 0) {
			clearObjectlist();
			fillObjectlist();
		}
	}	


	
	$('#test1').click(function(e){
		myLog("test1 button is clicked");
     });
	$('#test2').click(function(e){
		myLog("test2 button is clicked");
     });

    network.on("click", function (params) {
		if (params.nodes.length > 0) { // van kiválasztott NODE
			actNode = nodesDSall.get( params.nodes)[0];
			pickedNode = actNode;
			
//			document.getElementById("pickedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; ">' + getIconByGroup(actNode, 'i') + '</div><div class="info"><a href=\"' + actNode.url + '" target="_blank" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" title="'+actNode.name+'">'+actNode.name+' DataFlow diagramja</a></div>';
//			document.getElementById("objectDetails").innerHTML = actNode.details;
			var lIcon = '';
			switch(actNode.group) {
				case "PROJECT":
					lIcon = 'fa-file-text';
					break;
				case "EMPLOYER":
					lIcon = 'fa-user';
					break;
				default:
					lIcon = 'fa-circle-o';
	//				rIcon = '<i' + pTag + ' id="nav-un-icon" class="fa fa-circle-o nav-icon"></' + pTag + '>';
					break;
			}
	
			document.getElementById("pickedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; "> <i id="nav-data-icon" class="fa ' + lIcon + ' nav-icon" style="color: #1063AD; margin-top: .2rem;"></i></div><div class="info"><a href="#" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" >' + actNode.label + '</a></div>';
			document.getElementById("selectedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; "> <i id="nav-data-icon" class="fa ' + lIcon + ' nav-icon" style="color: #1063AD; margin-top: .2rem;"></i></div><div class="info"><a href="#" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" >' + actNode.label + '</a></div>';
			
			myLog('actNode.label: ' + actNode.label);
		} else {
			pickedNode = null;
			document.getElementById("pickedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; "> <i id="nav-data-icon" class="fa fa-circle-o nav-icon" style="color: #1063AD; margin-top: .2rem;"></i></div><div class="info"><a href="#" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" >Nincs kiválasztott dolgozó</a></div>';
			document.getElementById("selectedNode").innerHTML = '<div class="image" style="font-size: 1.3rem; margin-left: .5rem; "> <i id="nav-data-icon" class="fa fa-circle-o nav-icon" style="color: #1063AD; margin-top: .2rem;"></i></div><div class="info"><a href="#" class="d-block" style="color: rgba(255,255,255,.8); font-size: 1rem;" >Nincs kiválasztott dolgozó</a></div>';
		}
		clearObjectlist();
		fillObjectlist();
    });



	
    function fit(){
		myLog('fit');
		network.fit();
    }
  
  
  
	function getNodes(){
		let lRESP;
		let lPos;
		
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
								   conversations: []
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
								   conversations: []
								   };
						nodeIds.push(lId, 'PROJECT');
						nodesDSall.add(actNode);
					
					}

						
					fromNode = nodesDSall.get('pn_' + allocationsD[i].projectCode);
					toNode = nodesDSall.get(allocationsD[i].userId);
					if (fromNode != null && toNode != null){
						lId = fromNode.id + ' -> ' + toNode.id;

						if ( edgeIds.indexOf( lId) >= 0) {
							edgesDSall.update([{id: lId, width: edgesDSall.get(lId).width + 1 }]);
						} else {
							edgesDSall.add({id: lId, from: fromNode.id, to: toNode.id, type: 'PROJECT', width: 1, conversations: [], allocPercent: allocationsD[i].allocPercent});
							edgeIds.push(lId);
						}
					}
					
				}
				
				for (i in conversationsD ) {
					
					
					fromNode = conversationsD[i].userIdFrom;
					toNode = conversationsD[i].userIdTo;

					if (fromNode != null && toNode != null){
						lId = fromNode + ' -> ' + toNode;
						iEdge = edgeIds.indexOf( lId);
						if ( iEdge >= 0) {
							edgesDSall.get(lId).conversations.push({rank: conversationsD[i].rank, messageType: conversationsD[i].messageType, messageID: conversationsD[i].messageID});


						} else {
							edgesDSall.add({id: lId, from: fromNode, to: toNode, type: 'CONVERSATION', count: 1, width: 1, arrows: 'to', color: { color: '#660000'}, conversations: [{rank: conversationsD[i].rank, messageType: conversationsD[i].messageType, messageID: conversationsD[i].messageID}] });
							edgeIds.push(lId);
						}
						eventDT = new Date(conversationsD[i].eventDT);
						hint = nodesDSall.get(fromNode).label + ' -> ' + nodesDSall.get(toNode).label;
						nodesDSall.get(fromNode).conversations.push({rank: conversationsD[i].rank, messageType: conversationsD[i].messageType, messageID: conversationsD[i].messageID, eventDT: eventDT, partnerName: nodesDSall.get(toNode).label, hint: hint});
						nodesDSall.get(toNode).conversations.push({rank: conversationsD[i].rank, messageType: conversationsD[i].messageType, messageID: conversationsD[i].messageID, eventDT: eventDT, partnerName: nodesDSall.get(fromNode).label, hint: hint});
					}
				}
				
				network.setData(data);
				edgeIds.forEach(setEdgeProperies);
	}

	function setEdgeProperies(value, index, array) {
		actEdge = edgesDSall.get(value)
		if (actEdge.type == 'CONVERSATION') {

			var filteredConversations = actEdge.conversations.filter(conversatonTypeFilter);
			AVGRank = Math.round(filteredConversations.reduce(getSumRank, 0) / filteredConversations.length);

			edgesDSall.update([{id: value, width: filteredConversations.length, color: { color: getColorByRank(AVGRank)}}]);
		}
	}

	function conversatonTypeFilter(conversation, index, array) {
		return edgeFilter.indexOf(conversation.messageType) !== -1 && edgeFilter.indexOf('RANK-' + conversation.rank) !== -1;
	}


	function getSumRank(total, conversation) {
		return total + conversation.rank;
	}
	
	function getColorByRank(rank){
		retVal = 'blue';
		switch  (rank) {
			case 1: 
				retVal = '#660000';
				break;
			case 2: 
				retVal = '#ff6600';
				break;
			case 3: 
				retVal = '#ffcc00';
				break;
			case 4: 
				retVal = '#99ff33';
				break;
			case 5: 
				retVal = '#009900';
				break;

		}		
		return retVal;
	}

	function clearObjectlist(){
		$("#obejctFilter").val('');
		$("#Objektumlista").empty();
		$("#Objektumlista").off("dblclick");
		$("#Objektumlista").off("click");
	}
	
	
	function fillObjectlist(){
		var rIcon;
		var lIcon;

		if (pickedNode ){
			for (i in pickedNode.conversations) {
				if (edgeFilter.indexOf(pickedNode.conversations[i].messageType) !== -1 && edgeFilter.indexOf('RANK-' + pickedNode.conversations[i].rank) !== -1) {
					switch(pickedNode.conversations[i].messageType) {
						case "EMAIL":
							lIcon = 'fa-envelope-open-o';
							break;
						case "CALL":
							lIcon = 'fa-mobile';
							break;
						default:
							lIcon = 'fa-circle-o';
							break;
					}
		
					rIcon = '<i id="nav-un-icon" class="fa ' + lIcon + ' nav-icon" style="color: ' + getColorByRank(pickedNode.conversations[i].rank) + ';"></i>';
					$("#Objektumlista").append('<li id="' + pickedNode.conversations[i].messageID + '" rank="' + pickedNode.conversations[i].rank + '" class="nav-item nav-obj-el"> <a href="#" class="nav-link" title="' + pickedNode.conversations[i].hint + '">' + rIcon + ' <p id="callout-link">' + pickedNode.conversations[i].eventDT.toISOString().slice(0,10) + ' ' + pickedNode.conversations[i].partnerName + '</p> </a> </li>');
				}
			}
	
		}
		

		$('#Objektumlista').on('click','.nav-obj-el',function(e, myName, myValue) {
			const messageID = this.id;
			const messageRank = $("#" + messageID).attr("rank")
			var message = messagesD.filter(function(value) {
				return value.messageID == messageID;
			});

			if (message.length == 1) {
				$('#mailRank').css('color', getColorByRank(parseInt(messageRank)));
				$('#mailRank').attr("class","fa fa-circle-o nav-icon");

				document.getElementById("mailSubject").innerHTML = '&nbsp;' + message[0].subject;
				if (message[0].fromName) {
					document.getElementById("mailFrom").innerHTML = 'From: ' + message[0].fromName + ' (' + message[0].fromAddress + ')';
				} else {
					document.getElementById("mailFrom").innerHTML = 'From: ' + message[0].fromAddress;
				}
				if (message[0].toName) {
					document.getElementById("mailTo").innerHTML = 'To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + message[0].toName + '<span class="mailbox-read-time pull-right">' + message[0].submitTime + '</span>';
				}
				document.getElementById("mailSubject").innerHTML = '&nbsp;' + message[0].subject;
				
				document.getElementById("mailBody").innerHTML = message[0].body;

				$("#mailRank").show();
				$("#mailSubject").show();
				$("#mailFrom").show();
				$("#mailTo").show();
				$("#mailBody").show();
			} else {
				$('#mailRank').css('color', 'blue');
//				document.getElementById("mailSubject").innerHTML = '&nbsp;';
//				document.getElementById("mailFrom").innerHTML = 'From:';
//				document.getElementById("mailTo").innerHTML = 'To:';
//				document.getElementById("mailBody").innerHTML = '&nbsp;';

				$("#mailRank").hide();
				$("#mailSubject").hide();
				$("#mailFrom").hide();
				$("#mailTo").hide();
				$("#mailBody").hide();
			}
		});
	}

	// debug 
	function myLog(logText){
		const dt = new Date();
		if (gDebug == true) {
			console.log(logText /*+ ' - ' + dt.toUTCString()*/);	
		}
	}
});	
