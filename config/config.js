				
const url = {nodes: "http://adattarhaz.telekom.intra/meta/getNetworkNodes.php",
			 edges: "http://adattarhaz.telekom.intra/meta/getNetworkEdges.php"
			};				
			
const layerColors = {source: {html: '#FFD329', rgba: 'rgba(255, 211, 41, 0.15)'}, 		// Másodlagos Yellow
					 mirror: {html: '#FF9A1E', rgba: 'rgba(255, 154, 30, 0.15)'},		// Másodlagos Orange
					 engineering: {html: '#53BAF2', rgba: 'rgba(83, 186, 242, 0.15)'},	// Másodlagos Light blue
					 analytical: {html: '#1063AD', rgba: 'rgba(16, 99, 173, 0.15)'},	// Másodlagos Dark blue
					 consumption: {html: '#1BADA2', rgba: 'rgba(27, 173, 162, 0.15)'},	// Másodlagos Petrol
					 easyToData: {html: '#BFCB44', rgba: 'rgba(191, 203, 68, 0.15)'},	// Másodlagos Green
					 unknown: {html: '#E20074', rgba: 'rgba(226, 0, 116, 0.15)'}		// Magenta
                    };			
					
const options = {
			height: '100%',
			width: '100%',
			autoResize: true,
			interaction:{hover:true},	
			layout: {
				randomSeed: 2,    // Optional; insert your value here
//				improvedLayout: true
				improvedLayout: false
			},		

//			physics: {
//				stabilization: true,
//			},
			nodes: {
				chosen: true,
				font: {
					size: 14
				}
			},
			edges: {
				selectionWidth:  function (width) {
//				myLog("Selection:width: " + width);
					return width;
				},
				length:	300
//				smooth:{type:'cubicBezier'}
			},
			interaction: {
				tooltipDelay: 200
			},
			groups: {
				
				
				PROJECT: {
					shape: 'icon',
					color: 'black',
					icon: {
						face: 'FontAwesome',
						code: '\uf15c',
						size: 15,
						color: '#1063AD'
						}
				},				
				EMPLOYER: {
					shape: 'icon',
					color: 'black',
					icon: {
						face: 'FontAwesome',
						code: '\uf007',
						size: 15,
						color: '#FF9A1E'
						}
				},
				CALL: {
					shape: 'icon',
					color: '#FF9A1E',
					icon: {
						face: 'FontAwesome',
						code: '\uf10b',
						size: 15,
						color: layerColors.source.html
						}
				},
				EMAIL: {
					shape: 'icon',
					color: '#FF9A1E',
					icon: {
						face: 'FontAwesome',
						code: '\uf2b7',
						size: 15,
						color: layerColors.engineering.html
						}
				},
				
				
				BD_DATAINGESTION: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf10c',
						size: 100,
						color: layerColors.source.html
						}
				},
				BD_SOURCESYSTEM: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf1c0',
						size: 50,
						color: layerColors.unknown.html
						}
					},
				BD_SOURCESYSTEM_SOURCE: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf1c0',
						size: 50,
						color: layerColors.source.html
						}
					},
				BD_PROCESS: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf013',
						size: 50,
						color: layerColors.unknown.html
						}
					},
				BD_PROCESS_MIRROR: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf013',
						size: 50,
						color: layerColors.mirror.html
						}
					},
				BD_PROCESS_ENGINEERING: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf013',
						size: 50,
						color: layerColors.engineering.html
						}
					},
				BD_PROCESS_ANALYTICAL: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf013',
						size: 50,
						color: layerColors.analytical.html
						}
					},
				BD_PROCESS_CONSUMPTION: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf013',
						size: 50,
						color: layerColors.consumption.html
						}
					},
				BD_SOURCEDATA: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf0c8',
						size: 50,
						color: layerColors.unknown.html
						}
					},
				BD_SOURCEDATA_SOURCE: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf0c8',
						size: 50,
						color: layerColors.source.html
						}
					},
				BD_DATA: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf0c8',
						size: 50,
						color: layerColors.unknown.html
						}
					},
				BD_DATA_MIRROR: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf0c8',
						size: 50,
						color: layerColors.mirror.html
						}
					},
				BD_DATA_ENGINEERING: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf0c8',
						size: 50,
						color: layerColors.engineering.html
						}
					},
				BD_DATA_ANALYTICAL: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf0c8',
						size: 50,
						color: layerColors.analytical.html,
						}
					},
				BD_DATA_CONSUMPTION: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf0c8',
						size: 50,
						color: layerColors.consumption.html
						}
					},
				BD_REPORT: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf15c',
						size: 50,
						color: layerColors.unknown.html
						}
					},
				BD_REPORT_MIRROR: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf15c',
						size: 50,
						color: layerColors.mirror.html
						}
					},
				BD_REPORT_ENGINEERING: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf15c',
						size: 50,
						color: layerColors.engineering.html
						}
					},
				BD_REPORT_ANALYTICAL: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf15c',
						size: 50,
						color: layerColors.analytical.html
						}
					},
				BD_REPORT_CONSUMPTION: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf15c',
						size: 50,
						color: layerColors.consumption.html
						}
					},
				BD_VIEW: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf150',
						size: 50,
						color: layerColors.unknown.html
						}
					},
				BD_VIEW_MIRROR: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf150',
						size: 50,
						color: layerColors.mirror.html
						}
					},
				BD_VIEW_ENGINEERING: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf150',
						size: 50,
						color: layerColors.engineering.html
						}
					},
				BD_VIEW_ANALYTICAL: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf150',
						size: 50,
						color: layerColors.analytical.html
						}
					},
				BD_VIEW_CONSUMPTION: {
					shape: 'icon',
					color: 'white',
					icon: {
						face: 'FontAwesome',
						code: '\uf150',
						size: 50,
						color: layerColors.consumption.html
						}
					},
				UNKNOWN: {
					shape: 'icon',
					color: '#FFD329',
					icon: {
						face: 'FontAwesome',
						code: '\uf128',
						size: 50,
						color: '#FFD329'
						}
				}
        }
    };
					
const	initLayers = {
				  '1-Source': 
					{
						minX: 0,
						minY: 0,
						maxX: 0,
						maxY: 0,
						strokeColor: '#262626',
						fillColor: layerColors.source.rgba,
						nodes: []
					}, 
				  '2-Mirror':
					{
						minX: 0,
						minY: 0,
						maxX: 0,
						maxY: 0,
						strokeColor: '#262626',
						fillColor: layerColors.mirror.rgba,
						nodes: []
					}, 
				  '3-Engineering': 
					{
						minX: 0,
						minY: 0,
						maxX: 0,
						maxY: 0,
						strokeColor: '#262626',
						fillColor: layerColors.engineering.rgba,
						nodes: []
					}, 				  
		          '4-Analytical':
					{
						minX: 0,
						minY: 0,
						maxX: 0,
						maxY: 0,
						strokeColor: '#262626',
						fillColor: layerColors.analytical.rgba,
						nodes: []
					}, 
				  '5-Consumption':
					{
						minX: 0,
						minY: 0,
						maxX: 0,
						maxY: 0,
						strokeColor: '#262626',
						fillColor: layerColors.consumption.rgba,
						nodes: []
					}, 
				  '6-Easy To Data':
					{
						minX: 0,
						minY: 0,
						maxX: 0,
						maxY: 0,
						strokeColor: '#262626',
						fillColor: layerColors.easyToData.rgba,
						nodes: []
					}/*, 
				  '9-???':
					{
						minX: 0,
						minY: 0,
						maxX: 0,
						maxY: 0,
						strokeColor: '#262626',
						fillColor: 'rgba(255, 154, 30, 0.15)', // Orange
						nodes: []
					} */
				  
				  };
					