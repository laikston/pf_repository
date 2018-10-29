/**
 * SamSung Display Solutions
 * @author rui13th@pulipinc.com
 */
var ledConfiguratorApp = (function($){
	var config = {
			unit : 'meter',
			wall : {width : 5, height : 3},
			videowall : {row : 1, col : 1},
			orientation : 'landscape',
			color : '#ffffff',
			image : '/static/images/videowall_configurator/background2.png',
			video : '/static/images/videowall_configurator/big_buck_bunny.mp4',
			display : { // 다시 세팅됨
				name : '',
				seq : undefined
			},
			isFirst : {
				width : true,
				height : true
			},
			minSize : {
				width : 82,
				height : 46
			},
			exceptModel : ['IPE030', 'IPE040', 'IPE060', 'IPE100'], // sbox except
			hasDiagramModel: {
				name: ['IF015H', 'IF020H', 'IF025H', 'IF025H-D', 'IF040H-D', 'IF060H-D', 'IF012J'],
				bufferStockRatio: {
					'IF015H': 0.056,
					'IF020H': 0.04,
					'IF025H': 0.03,
					'IF025H-D': 0.04,
					'IF040H-D': 0.04,
					'IF060H-D': 0.03,
					'IF012J': 0.056
				}
			} // renewal model :: IF seriese			
	},
	configurator;
	
	function init(){
		configurator = angular.module('led-configurator', []);
		configurator.controller('ledConfiguratorController', function($scope, $document, $http, variable, constant, setDisplayProp, releaseDisplay, converseToFeet, converseToMeter, converseToInch, getBlueprintSize, getTagSize, uploadModel, decimalPoint){
			var s      = $scope,
				$body  = angular.element('body'),
				$popup = angular.element('.ly-configurator');
			
			s.resizeDisplay = function(){
				switch(s.unit){
					case 'feet' :
						if(s.display.orientation == 'landscape'){
							s.display.pixel_size.width = ((converseToFeet.getNum(variable.get().display.meter_size.width) * constant.wall.pixel_width) / s.wall.size.width); // feet -> pixel .toPrecision(2)
							s.display.pixel_size.height = s.display.pixel_size.width * variable.get().display.ratio; // feet -> pixel
						}else{
							s.display.pixel_size.width = ((converseToFeet.getNum(variable.get().display.meter_size.width) * constant.wall.pixel_width) / s.wall.size.width) * variable.get().display.ratio; // feet -> pixel .toPrecision(2)
							s.display.pixel_size.height = ((converseToFeet.getNum(variable.get().display.meter_size.width) * constant.wall.pixel_width) / s.wall.size.width); // feet -> pixel
						}
						break;
						
					case 'meter' :
						if(s.display.orientation == 'landscape'){
							s.display.pixel_size.width = ((variable.get().display.meter_size.width * constant.wall.pixel_width) / s.wall.size.width); // m -> pixel .toPrecision(2)
							s.display.pixel_size.height = s.display.pixel_size.width * variable.get().display.ratio; // m -> pixel
						}else{
							s.display.pixel_size.width = ((variable.get().display.meter_size.width * constant.wall.pixel_width) / s.wall.size.width) * variable.get().display.ratio; // m -> pixel .toPrecision(2)
							s.display.pixel_size.height = ((variable.get().display.meter_size.width * constant.wall.pixel_width) / s.wall.size.width); // m -> pixel
						}
						break;
						
					default :
						break;
				}
				if(s.display.orientation == 'landscape')	variable.set('STATIC_SIZE', s.display.pixel_size); // s.display.pixel_size
				if(s.display.orientation == 'portrait')	variable.set('STATIC_SIZE', {width : s.display.pixel_size.height, height : s.display.pixel_size.width}); // s.display.pixel_size
				s.getMaxVideowall();
				if(s.videowall.max.col <= s.videowall.col || s.videowall.max.row <= s.videowall.row){
					if(s.videowall.max.col <= s.videowall.col)  s.videowall.col = s.videowall.max.col;
					if(s.videowall.max.row <= s.videowall.row)  s.videowall.row = s.videowall.max.row;
					s.videowall.input_col = s.videowall.col;
					s.videowall.input_row = s.videowall.row;
				}else{
					s.setVideowall();
				}
			};
			s.getMaxVideowall = function(){
				var wall = {
						width : s.wall.size.width,
						height : s.wall.size.height
					},
					display = {
						width : (s.display.orientation == 'landscape') ? s.display.meter_size.width : s.display.meter_size.height,
						height : (s.display.orientation == 'landscape') ? s.display.meter_size.height : s.display.meter_size.width
					};
				if(s.unit == 'meter'){
					s.videowall.max.col = parseInt(wall.width/display.width + 0.0001);
					s.videowall.max.row = parseInt(wall.height/display.height + 0.0001);
				}else{
					s.videowall.max.col = parseInt(wall.width/converseToFeet.getNum(display.width));
					s.videowall.max.row = parseInt(wall.height/converseToFeet.getNum(display.height));
				}
				if(s.videowall.max.col <= 0)	s.videowall.max.col = 1;
				if(s.videowall.max.row <= 0)	s.videowall.max.row = 1;
			};
			s.setVideowall = function(_item){
				if(_item){
					switch(_item){
						case 'col' :
							if(s.videowall.col > s.videowall.max.col)  s.videowall.col = s.videowall.max.col;
							break;
							
						case 'row' :
							if(s.videowall.row > s.videowall.max.row)  s.videowall.row = s.videowall.max.row;
							break;
							
						default :
							break;
					}
				}else{
					if(s.videowall.col > s.videowall.max.col){
						s.videowall.input_col = s.videowall.col = s.videowall.max.col;
					}else{
						s.videowall.input_col = s.videowall.col;
					}
					if(s.videowall.row > s.videowall.max.row){
						s.videowall.row = s.videowall.max.row;
					}else{
						s.videowall.input_row = s.videowall.row;
					}
				}
			};
			s.getTotalDisplaysStyle = function(){
				var size = {
						width : decimalPoint.getNum(s.display.pixel_size.width * s.videowall.col, 2),
						height : decimalPoint.getNum(s.display.pixel_size.height * s.videowall.row, 2)
					},
					color = (s.upload.isColor) ? config.color : 'none', style;
				s.videowall.size.width = size.width;
				s.videowall.size.height = size.height;
				style = {
						'top' : (((s.wall.size.pixel_height) - (s.display.pixel_size.height * s.videowall.row)) / 2),
						'left' : ((constant.wall.pixel_width - s.display.pixel_size.width * s.videowall.col) / 2 + 3),
						'width' : size.width,
						'height' : size.height,
						'background-color' : color
				};
				return style;
			};
			s.getTotalDisplayWidthStyle = function(){
				var size = {
						width : s.display.pixel_size.width * s.videowall.col,
						height : s.display.pixel_size.height
					}, 
					style = {
						'width' : decimalPoint.getNum(size.width),
						'height' : size.height
					};
				return style;
			};
			s.setWallPosition = function(){
				var size = {
						width : s.display.pixel_size.width * s.videowall.col,
						height : s.display.pixel_size.height * s.videowall.row
					},
					style = {
						'padding-top' : (size.height > s.wall.size.pixel_height) ? (size.height - s.wall.size.pixel_height) / 2 + 'px' : 0,
						'padding-bottom' : 50 + 'px'
					};
				return style;
			};
			s.getVideoContainerStyle = function(){
				var style = {
						'top' : (((s.wall.size.pixel_height) - (s.display.pixel_size.height * s.videowall.row)) / 2),
						'left' : ((constant.wall.pixel_width - s.display.pixel_size.width * s.videowall.col) / 2 + 3),
						'width' : s.display.pixel_size.width * s.videowall.col,
						'height' : s.display.pixel_size.height * s.videowall.row,
						'background-image':'url('+ s.upload.contents.image + ')'
				};
				return style;
			};
			s.setBlueprintVerticalStyle = function(){
				var style = {'height' : s.display.pixel_size.height * s.videowall.row};
				return style;
			};
			s.setBlueprintHorizonStyle = function(_value){
				var style = {};
				if(_value == 0){
					style = {
							'width' : 100 + '%',
							'height' : ((s.wall.size.pixel_height - s.display.pixel_size.height * s.videowall.row) / 2) + 86,
							'left' : 0
					};
				}else{
					style = {
							'width' : s.display.pixel_size.width * s.videowall.col,
							'height' : ((s.wall.size.pixel_height - s.display.pixel_size.height * s.videowall.row) / 2) + 86,
							'left' : ((constant.wall.pixel_width - s.display.pixel_size.width * s.videowall.col) / 2) + 3
					};
				}
				return style;
			};
			s.getBlueprintSpace = function(_totalSize, _size){
				return decimalPoint.getNum((_totalSize - _size), 3);
			};
			s.setBlueprintWidth = function(_col){
				var col = (_col != undefined) ? _col : s.videowall.col, tmpW, width;
				switch(s.display.orientation){
					case 'landscape' :
						tmpW = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.width), col) : getBlueprintSize.getSize(s.display.meter_size.width, col) ;
						break;
						
					case 'portrait' :
						tmpW = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.height), col) : getBlueprintSize.getSize(s.display.meter_size.height, col) ;
						break;
						
					default :
						break;
				}
				width = decimalPoint.getNum(tmpW, 3);
				s.blueprintProp.width = width;
				return width;
			};
			s.setBlueprintHeight = function(_row){
				var row = (_row) ? _row : s.videowall.row, tmpH, height;
				switch(s.display.orientation){
					case 'landscape' :
						tmpH = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.height), row) : getBlueprintSize.getSize(s.display.meter_size.height, row) ;
						break;
						
					case 'portrait' :
						tmpH = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.width), row) : getBlueprintSize.getSize(s.display.meter_size.width, row) ;
						break;
						
					default :
						break;
				}
				height = decimalPoint.getNum(tmpH, 3);
				s.blueprintProp.height = height;
				return height;
			};
			s.setDiagonal = function(){
				var w = s.blueprintProp.width,
					h = s.blueprintProp.height,
					wh = (Math.sqrt((w * w) + (h * h))).toFixed(2);
				return converseToInch.getNum(wh, s.unit);
			};
			s.setRowLine = function(){
				var rowLine = '', 
					height = s.display.pixel_size.height, 
					each = s.videowall.row, 
					count = 1, 
					totalW = s.display.pixel_size.width * s.videowall.col - 2;
				
				for(; count < each; ++count){
					rowLine += 'M0,' + String(height * count) + ' L' + totalW + ',' + String(height * count) + ' ';
				}
				return rowLine;
			};
			s.setColLine = function(){
				var colLine = '', 
					width = s.display.pixel_size.width, 
					each = s.videowall.col, 
					count = 1, 
					totalH = s.display.pixel_size.height * s.videowall.row - 2;
				
				for(; count < each; ++count){
					colLine += 'M' + String(width * count) + ',0 L' + String(width * count) + ',' + totalH + ' ';
				}
				return colLine;
			};
    		s.getBlueprintSpace = function(_totalSize, _size){
    			return decimalPoint.getNum((_totalSize - _size), 3);
    		};
    		s.setBlueprintWidth = function(_col){
    			var col = (_col != undefined) ? _col : s.videowall.col, tmpW, width;    			
    			switch(s.display.orientation){
	    			case 'landscape' :
	    				tmpW = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.width), col) : getBlueprintSize.getSize(s.display.meter_size.width, col) ;
	    				break;
	    				
	    			case 'portrait' :
	    				tmpW = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.height), col) : getBlueprintSize.getSize(s.display.meter_size.height, col) ;
	    				break;
	    				
	    			default :
	    				break;
    			}
    			width = decimalPoint.getNum(tmpW, 3);
    			s.blueprintProp.width = width;    			
    			return width; 
    		};
    		s.setBlueprintHeight = function(_row){
    			var row = (_row) ? _row : s.videowall.row, tmpH, height;    			
    			switch(s.display.orientation){
	    			case 'landscape' :
	    				tmpH = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.height), row) : getBlueprintSize.getSize(s.display.meter_size.height, row) ;
	    				break;
	    				
	    			case 'portrait' :
	    				tmpH = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.width), row) : getBlueprintSize.getSize(s.display.meter_size.width, row) ;
	    				break;
	    				
	    			default :
	    				break;
    			}	
    			height = decimalPoint.getNum(tmpH, 3);
    			s.blueprintProp.height = height;
    			return height;
    		};
    		s.setDiagonal = function(){
    			var w = s.blueprintProp.width,
    				h = s.blueprintProp.height,
    				wh = (Math.sqrt((w * w) + (h * h))).toFixed(2);
    			return converseToInch.getNum(wh, s.unit);
    		};
    		s.getRepeatNum = function(_num){
    	        return new Array(_num);
    		};
    		s.changeCol = function(_num, _exceed){
    			var col,
    				input_col = Number(s.videowall.input_col);    			
    			s.videowall.isExceed.col = false;
    			s.getMaxVideowall();
    			if(_num != 0){
    				if(_num < 0){
						if(s.videowall.col >= 2){
							col = input_col + _num;
							s.videowall.input_col = s.videowall.col = col;
							inputColTimer();
						}
					}else{
						col = input_col + _num;
						s.videowall.input_col = s.videowall.col = col;
						inputColTimer();
					}
				}else{
					
					if((s.videowall.input_col == "") || (input_col <= 0) || (input_col > s.videowall.max.col)){
						if(input_col > s.videowall.max.col)	inputColTimer();
						if(input_col < s.videowall.max.col)	s.videowall.timer.col = setTimeout(inputColTimer, 1000);
					}else{
						s.videowall.col = Number(s.videowall.input_col);
						inputColTimer();
					}
				}
				function inputColTimer(){
					var isSpace = false;
					clearTimeout(s.videowall.timer.col);
					if(s.videowall.input_col == ""){
						s.videowall.input_col = s.videowall.col = 1;
						
					}
					if(Number(s.videowall.input_col) > s.videowall.max.col){
						isSpace = s.calculateVideowall('col').isSpace;
						if(isSpace){
							s.videowall.input_col = s.videowall.col = s.videowall.max.col;
							
						}else{
							if(_exceed == undefined || _exceed == false){
								s.videowall.input_col = s.videowall.col = s.videowall.max.col;
							}
						}
					}
					if(Number(s.videowall.input_col) <= 0){
						s.videowall.input_col = s.videowall.col = 1;
						
					}
				}
				s.setVideowall('col');    			    			
				if(_num == 0){
					if(!s.$$phase)  $scope.$apply();
				}
			};
			s.$watch('videowall.input_col', function(newValue, oldValue){
				if(oldValue != newValue){
					if(s.videowall.isExceed.col == true){
						s.videowall.isExceed.col = false;
						s.changeCol(0, true);
					}else{
						s.changeCol(0);
					}
				}
			});
			s.changeRow = function(_num, _exceed){
				var row,
					input_row = Number(s.videowall.input_row);
    			
				s.videowall.isExceed.row = false;
				s.getMaxVideowall();
				if(_num != 0){
					if(_num < 0){
						if(s.videowall.row >= 2){
							row = input_row + _num;
							s.videowall.input_row = s.videowall.row = row;
							inputRowTimer();
						}
					}else{
						row = input_row + _num;
						s.videowall.input_row = s.videowall.row = row;
						inputRowTimer();
					}	
				}else{					
					if((s.videowall.input_row == "") || (input_row <= 0) || (input_row > s.videowall.max.row)){
						if(input_row > s.videowall.max.row)	inputRowTimer();
						if(input_row < s.videowall.max.row)	s.videowall.timer.row = setTimeout(inputRowTimer, 1000);
					}else{
						s.videowall.row = Number(s.videowall.input_row);
						inputRowTimer();
					}
				}					
				function inputRowTimer(){
					var isSpace = false;
					clearTimeout(s.videowall.timer.row);
					if(s.videowall.input_row == ""){
						s.videowall.input_row = s.videowall.row = 1;
						
					}
					
					if(Number(s.videowall.input_row) > s.videowall.max.row){	
						isSpace = s.calculateVideowall('row').isSpace;
						if(isSpace){
							s.videowall.input_row = s.videowall.row = s.videowall.max.row;
						}else{
							if(_exceed == undefined || _exceed == false){
								s.videowall.input_row = s.videowall.row = s.videowall.max.row;
							}
						}
					}					
					if(Number(s.videowall.input_row) <= 0){    	
						s.videowall.input_row = s.videowall.row = 1;
						
					}
				}				
				s.setVideowall('row');								
				if(_num == 0){
					if(!s.$$phase)  $scope.$apply();
				}
			};
			s.$watch('videowall.input_row', function(newValue, oldValue){
				if(oldValue != newValue){
					if(s.videowall.isExceed.row == true){
						s.videowall.isExceed.row = false;
						s.changeRow(0, true);
					}else{
						s.changeRow(0);
					}
				}
			});
			s.calculateVideowall = function(_item, _num){
				var same = s.videowall.same[_item],
					num;    			
				switch(_item){
					case 'row' : 
						num = (_num) ? s.setBlueprintHeight(s.videowall.max.row) : s.blueprintProp.height; //s.setBlueprintHeight();
						if(s.unit == 'meter'){
							same.display = s.display.meter_size.height;
							same.space = s.getBlueprintSpace(s.wall.size.height, num);
						}else{
							same.display = converseToMeter.getNum(s.display.meter_size.height);
							same.space = converseToMeter.getNum(s.getBlueprintSpace(s.wall.size.height, num));
						}
						break;
	    				
					case 'col' :
						num = (_num) ? s.setBlueprintWidth(s.videowall.max.col) : s.blueprintProp.width;//s.setBlueprintWidth();
						if(s.unit == 'meter'){
							same.display = s.display.meter_size.width;
							same.space = s.getBlueprintSpace(s.wall.size.width, num);
						}else{
							same.display = converseToMeter.getNum(s.display.meter_size.width);
							same.space = converseToMeter.getNum(s.getBlueprintSpace(s.wall.size.width, num));
						}
						break;
	    				
					default :
						break;
				}
    			
				return { 
					isSame : (Math.abs(same.space) == 0) ? true : false,
					isSpace : (same.space == 0) ? true : false
				}    			
			};
			s.getTotalCabinet = function(_col, _row){
				var num, count;
				if(_col == undefined && _row == undefined){
					num = {
							width : (s.calculateVideowall('col', 'exceed-case').isSame) ? s.videowall.max.col : (s.videowall.max.col + 1),
							height : (s.calculateVideowall('row', 'exceed-case').isSame) ? s.videowall.max.row : (s.videowall.max.row + 1)
					};
				}    			
				if(_col != undefined && _row != undefined){
					num = {
							width : _col,
							height : _row
					};
				}
				count = num.width * num.height;
    			
				return count;
			};
			s.setUnit = function(_unit){
				if(s.unit != _unit){
					switch(_unit){
						case 'meter' :
							s.wall.size.width = s.wall.meter_size.width = Number((converseToMeter.getNum(s.wall.size.width)).toFixed(1));
							s.wall.size.height = s.wall.meter_size.height = Number((converseToMeter.getNum(s.wall.size.height)).toFixed(1));
							break;
    		            
						case 'feet' :
							s.wall.size.width = s.wall.feet_size.width = Number((converseToFeet.getNum(s.wall.size.width)).toFixed(1));
							s.wall.size.height = s.wall.feet_size.height = Number((converseToFeet.getNum(s.wall.size.height)).toFixed(1));
							break;
   		            
						default :
							break;
					}
					s.tab.unit = _unit;
					if(_unit)  s.unit = _unit;
				}
			};
			s.hasSbox = function(){
				var hasbox = true;
				angular.forEach(config.exceptModel, function(value, idx){
					if(s.display.name == value){
						hasbox = false;
					}
				});
				return hasbox;
			};
			s.getOverWSpaceDottedStyle = function(_value){
				var borderW,
					style = {};
    			
				if(_value == 0){
					style = {
							'border-left' : 'none', 
							'border-right' : 'none'
					};
				}else{
					if(s.videowall.col > s.videowall.max.col){
						borderW = '2px dotted #f89bb0';
						angular.element('.measure_width_space').addClass('over');
					}else{
						borderW = '2px dotted #9ea0a6';
						angular.element('.measure_width_space').removeClass('over');
					}
        			
					style = {
							'border-left' : borderW, 
							'border-right' : borderW
					};
				}
    			
				return style;
			};
			s.getOverHSpaceDottedStyle = function(_value){
				var borderH,
					style = {};
    			
				if(_value == 0){
					style = {
							'border-top' : 'none', 
							'border-bottom' : 'none'
					};
				}else{
					if(s.videowall.row > s.videowall.max.row){
						borderH = '2px dotted #f89bb0';
						angular.element('.measure_height_space').addClass('over');
					}else{
						borderH = '2px dotted #9ea0a6';
						angular.element('.measure_height_space').removeClass('over');
					}
        			
					style = {
							'border-top' : borderH, 
							'border-bottom' : borderH,
							'height' : s.wall.size.pixel_height - 1
					};
				}
    			
				return style;
			};
			s.getTagHSpaceStyle = function(_value, _direction){
				var videowallH,
					tagSize = {},
					bgColor,
					marginTop,
					style = {};
    			
				if(_value == 0){
					style = {
							'display' : 'none'
					};    				
				}else{
					videowallH = (s.wall.size.pixel_height - (s.display.pixel_size.height * s.videowall.row)) / 2;
					tagSize = {
							width : getTagSize.getSize(_value).width,
							height : getTagSize.height
					};
					bgColor = (s.videowall.row > s.videowall.max.row) ? '#f89bb0' : '#9ea0a6';
    				
					if(s.wall.size.pixel_height >= tagSize.height * 3){
						marginTop = (videowallH / 2) - (tagSize.height / 2);
						if(s.videowall.row > s.videowall.max.row && _direction == 'bottom'){
							marginTop = -(videowallH + tagSize.height) / 2;
						}
					}else{
						marginTop = (videowallH / 2);
    					
						if(_direction){
							marginTop = videowallH;
						}else{
							marginTop = -tagSize.height;
						}
					}
    				
					style = {
							'display' : 'block',
							'margin-top' : marginTop,
							'width' : tagSize.width,
							'height' : tagSize.height,
							'background-color' : bgColor
					};
				}
    			
				return style;
			};
			s.getTagWSpaceStyle = function(_value, _direction){
				var videowallW,
					tagSize = {},
					bgColor,
					marginLeft,
					style = {};
    			
				if(_value == 0){
					style = {
							'display' : 'none'
					};
    			}else{
    				videowallW = (689 - (s.display.pixel_size.width * s.videowall.col)) / 2;
    				tagSize = {
    						width : getTagSize.getSize(_value).width,
    						height : getTagSize.height
    				};
	    			
    				bgColor = (s.videowall.col > s.videowall.max.col) ? '#f89bb0' : '#9ea0a6';
					
    				if(s.videowall.col > s.videowall.max.col){
    					marginLeft = (_direction) ? (videowallW - tagSize.width) / 2 - (videowallW) : (videowallW - tagSize.width) / 2 ;
    				}else{
    					marginLeft = (videowallW - tagSize.width) / 2;
    				}
					
    				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
    					if(s.setBlueprintWidth(s.videowall.col) > s.wall.size.width){
    						marginLeft = (_direction) ? (videowallW - tagSize.width) / 2 - (videowallW) : (videowallW - tagSize.width) / 2 ;
    					}
    				}
					
    				style = {
    						'display' : 'block',
    						'margin-left' : marginLeft,
    						'width' : tagSize.width,
	    					'height' : tagSize.height,
	    					'background-color' : bgColor
    				};
    			}
    			
				return style;
			};
			s.getTagWStyle = function(_value){
				var displayW = s.display.pixel_size.width * s.videowall.col,
					tagSize = {
						width : getTagSize.getSize(_value).width,
						height : getTagSize.height
					},
					marginLeft = (displayW - tagSize.width) / 2,
					style = {
						'margin-left' : marginLeft,
						'width' : tagSize.width,
						'height' : tagSize.height
				};
    			
				return style;
			};
			s.getTagHStyle = function(_value){
				var tagSize = {
						width : getTagSize.getSize(_value).width,
						height : getTagSize.height
				},
				top = (s.display.pixel_size.height * s.videowall.row - tagSize.height) / 2,
				style = {
					'top' : top,
					'width' : tagSize.width,
					'height' : tagSize.height,
					'right' : 0,
					'left' : 40 + 'px'
				};
				return style;
			};
			s.getNewSbox = function(){
				var resolutionW = s.display.module.width * s.videowall.col,
					resolutionH = s.display.module.height * s.videowall.row,
					w = (s.display.seriesname == 'XAF Series' || s.display.seriesname == 'IPS Series' || s.display.seriesname == 'IPE Series' || s.display.seriesname == 'XPS Series') ? constant.fhd.w : constant.uhd.w,
					h = (s.display.seriesname == 'XAF Series' || s.display.seriesname == 'IPS Series' || s.display.seriesname == 'IPE Series' || s.display.seriesname == 'XPS Series') ? constant.fhd.h : constant.uhd.h,
					sbox = Math.ceil(resolutionW / w) * Math.ceil(resolutionH / h);
    			
    			return sbox;
    		};
    		s.setWeight = function(){
    			var weight = parseFloat(s.display.spec.WEIGHT) * s.videowall.col * s.videowall.row;
    			return weight.toFixed(1);
    		};
    		s.setMax = function(){
    			var total = s.videowall.col * s.videowall.row, 
    				max, 
    				tmp;
    			if(s.display.seriesname == 'IF Series'){ // cabinet
    				max = (String(s.display.spec.POWER_CONSUMPTION_MAX2 * total).split('.').length == 1) ? s.display.spec.POWER_CONSUMPTION_MAX2 * total : (s.display.spec.POWER_CONSUMPTION_MAX2 * total).toFixed(2);
    			}else{
    				tmp = (s.unit == 'feet') ? s.display.spec.POWER_CONSUMPTION_MAX2 * s.setDisplayArea() : s.display.spec.POWER_CONSUMPTION_MAX1 * s.setDisplayArea();
    				max = Math.round(tmp);
    			}    			
				if(s.display.spec.POWER_CONSUMPTION_MAX == 'TBD') max = 'TBD';    				
    			return max + ' Watts';	
    		};
    		s.setTypical = function(){
    			var total = s.videowall.col * s.videowall.row, 
    				typical, 
    				tmp;
    			if(s.display.seriesname == 'IF Series'){ // cabinet
    				typical = (String(s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total).split('.').length == 1) ? s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total : (s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total).toFixed(2);
    			}else{
    				tmp = (s.unit == 'feet') ? s.display.spec.POWER_CONSUMPTION_TYPICAL2 * s.setDisplayArea() : s.display.spec.POWER_CONSUMPTION_TYPICAL1 * s.setDisplayArea();
    				typical = Math.round(tmp);
    			}    			
    			if(s.display.spec.POWER_CONSUMPTION_TYPICAL == 'TBD' || s.display.spec.POWER_CONSUMPTION_TYPICAL == 'N/A') typical = s.display.spec.POWER_CONSUMPTION_TYPICAL;
    			return typical + ' Watts';	
    		};
    		s.specSbox = function(){
    			var sbox;    			
				sbox = s.getNewSbox();
				return sbox;
			};
			s.getMeasureWStyle = function(_value){
				var style = {};    			
				if(_value == 0){
					style = {
							'margin-left' : 0,
							'width' : 100 + '%'
					};
				}else{
					style = {
							'width' : s.display.pixel_size.width * s.videowall.col,
							'margin-left' : (686-(s.display.pixel_size.width * s.videowall.col)) / 2 + 3
					};
				}    			
				return style;
			};
			s.getMeasureHStyle = function(_value){
				var style = {};
    			
				if(_value == 0){
					style = {
							'height' : s.wall.size.pixel_height
					};
				}else{
					style = {
							'height' : s.wall.size.pixel_height - 1
					};
				}    			
				return style;
			};
			s.changeWall = function(_changeH){
				s.wall.size.pixel_height = (s.wall.size.height * constant.wall.pixel_width) / s.wall.size.width;
				s.resizeDisplay();
			};
			s.changeWallWidth = function(_num){
				var width;    			
				if(_num != 0){
					width = Number(s.wall.size.width) + _num;
					s.wall.size.width = Number(width.toFixed(1));//Number(width.toPrecision(2));
					inputWidthTimer();
				}else{
					switch(s.unit){
						case 'meter' :
							if(isNaN(s.wall.size.width)){
								s.wall.size.width = constant.wall.minSize.meter_width;
							}
							if((s.wall.size.width == "") || (s.wall.size.width < constant.wall.minSize.meter_width) || (s.wall.size.width > constant.wall.maxSize.meter_width)){								
								if(s.wall.size.width > constant.wall.maxSize.meter_width)	inputWidthTimer();
								s.wall.sizeTimer.width = setTimeout(inputWidthTimer, 1000);
							}else{
								inputWidthTimer();
							}
							break;
    		            
						case 'feet' :
							if(isNaN(s.wall.size.width)){
								s.wall.size.width = constant.wall.minSize.meter_height;
							}
							if((s.wall.size.width == "") || (s.wall.size.width < constant.wall.minSize.feet_width) || (s.wall.size.width > constant.wall.maxSize.feet_width)){								
								if(s.wall.size.width > constant.wall.maxSize.feet_width)	inputWidthTimer();
								s.wall.sizeTimer.width = setTimeout(inputWidthTimer, 1000);
							}else{
								inputWidthTimer();
							}
							break;
    		            
						default :
							break;
					}
				}
				function inputWidthTimer(){
					clearTimeout(s.wall.sizeTimer.width);
					switch(s.unit){
						case 'meter' :
							if(s.wall.size.width < constant.wall.minSize.meter_width){
								s.wall.size.width = constant.wall.minSize.meter_width;								
							}
							if(s.wall.size.width > constant.wall.maxSize.meter_width){
								s.wall.size.width = constant.wall.maxSize.meter_width;								
							}
							if(s.wall.size.width == "")  s.wall.size.width = constant.wall.minSize.meter_width;
							break;
    		            
						case 'feet' :
							if(s.wall.size.width > constant.wall.maxSize.feet_width){
								s.wall.size.width = constant.wall.maxSize.feet_width;								
							}
							if(s.wall.size.width < constant.wall.minSize.feet_width){
								s.wall.size.width = constant.wall.minSize.feet_width;								
							}
							if(s.wall.size.width == "")  s.wall.size.width = constant.wall.minSize.feet_width;
							break;
    		            
						default :
							break;
					}
    		        s.changeWall();
    		        if(_num == 0){
    		        	if(!s.$$phase)  $scope.$apply();
    		        }
				}
				function inputWidthRemoveTimer(){
					clearTimeout(s.wall.sizePopupRemoveTimer.width);					
					
				}
			};
			s.$watch('wall.size.width', function(newValue, oldValue){
				switch(s.unit){
					case 'meter' :
						if(converseToMeter.getNum(oldValue) != newValue)	s.changeWallWidth(0);
						break;
    	          
					case 'feet' :
						if(converseToFeet.getNum(oldValue) != newValue)  s.changeWallWidth(0);
						break;
    	          
					default :
						break;
				}
				if(s.videowall.mode != null)	s.setFHDUHDText(); // 171124 추가
			});
			s.changeWallHeight = function(_num){
				var height;
    			
				if(_num != 0){					
					height = Number(s.wall.size.height) + _num;
					s.wall.size.height = Number(height.toFixed(1));//Number(height.toPrecision(2));
					inputHeightTimer();
				}else{
					switch(s.unit){
						case 'meter' :
							if(isNaN(s.wall.size.height)){
								s.wall.size.height = constant.wall.minSize.meter_height;
							}
							if((s.wall.size.height == "") || (s.wall.size.height < constant.wall.minSize.meter_height) || (s.wall.size.height > constant.wall.maxSize.meter_height)){
								
								if(s.wall.size.height > constant.wall.maxSize.meter_height)	inputHeightTimer();
								s.wall.sizeTimer.height = setTimeout(inputHeightTimer, 1000);
							}else{
								inputHeightTimer();
							}
							break;
    	            
						case 'feet' :
							if(isNaN(s.wall.size.height)){
								s.wall.size.height = constant.wall.minSize.feet_height;
							}
							if((s.wall.size.height == "") || (s.wall.size.height < constant.wall.minSize.feet_height) || (s.wall.size.height > constant.wall.maxSize.feet_height)){
								
								if(s.wall.size.height > constant.wall.maxSize.feet_height)	inputHeightTimer();
	    						s.wall.sizeTimer.height = setTimeout(inputHeightTimer, 1000);
							}else{
								inputHeightTimer();
							}
							break;
    	            
						default :
							break;
					}
				}
				function inputHeightTimer(){
					clearTimeout(s.wall.sizeTimer.height);
					switch(s.unit){
						case 'meter' :
							if(s.wall.size.height > constant.wall.maxSize.meter_height){
								s.wall.size.height = constant.wall.maxSize.meter_height;								
							}
							if(s.wall.size.height < constant.wall.minSize.meter_height){
								s.wall.size.height = constant.wall.minSize.meter_height;								
							}
							if(s.wall.size.height == "")  s.wall.size.height = constant.wall.minSize.meter_height;
							break;
    		            
						case 'feet' :
							if(s.wall.size.height > constant.wall.maxSize.feet_height){
								s.wall.size.height = constant.wall.maxSize.feet_height;								
							}
							if(s.wall.size.height < constant.wall.minSize.feet_height){
								s.wall.size.height = constant.wall.minSize.feet_height;								
							}
							if(s.wall.size.height == "")  s.wall.size.height = constant.wall.minSize.feet_height;
							break;
    		            
						default :
							break;
					}
					s.changeWall('chanageH'); // when add height num, don't change person size
					if(_num == 0){
						if(!s.$$phase)  $scope.$apply();
					}
				}
				function inputHeightRemoveTimer(){
					clearTimeout(s.wall.sizePopupRemoveTimer.height);
					
					
				}
			};
			s.$watch('wall.size.height', function(newValue, oldValue){
				switch(s.unit){
					case 'meter' :
						if(converseToMeter.getNum(oldValue) != newValue)  s.changeWallHeight(0);
						break;
    	          
					case 'feet' :
						if(converseToFeet.getNum(oldValue) != newValue)  s.changeWallHeight(0);
						break;
    	          
					default :
						break;
				}
			});
			s.restrictSize = function(_size, _item){
				s.wall.size[_item] = decimalPoint.getNum(_size, 2);
			};    
			s.getDisplayWidthStyle = function(){
				var style = {
						'width' : s.display.pixel_size.width, 
						'height' : s.display.pixel_size.height
				};
				return style;
			};
			s.setDisplayArea = function(){
				var area = (s.blueprintProp.width * s.blueprintProp.height).toFixed(2);
				return area;
			};			
			s.setDisplayArea = function(){
				var area = (s.blueprintProp.width * s.blueprintProp.height).toFixed(2);
				return area;
			};
			s.exportToPDF = function(){
				var title = (s.pdf.title != '') ? s.pdf.title : 'LED CONFIGURATOR',
    	    		  
					/* 171116 정은정 backend 지원 :: 추가 */
					unit = (s.unit == 'feet') ? 'f'.toUpperCase() : 'm'.toUpperCase(),
					width = s.wall.size.width,
					height = s.wall.size.height,
					modelSeq = s.display.seq,
					modelName = s.display.name,
					columns = s.videowall.col,
					rows = s.videowall.row,
					orient = s.display.orientation; 
					/* 171116 정은정 backend 지원 :: 추가 */
    	    		  
				if(console)	console.log('unit :: ', unit, ' width :: ', width, ' height :: ', height, ' modelSeq :: ', modelSeq, ' modelName :: ', modelName, ' columns:: ', columns, ' row:: ', rows, ' orient:: ', orient);
    	    		  
				angular.element('#pdf-image-section-txt').text(title);
    	    	  
				//20171110 member export info DB save start  
				var memberSeq = angular.element('#memberSeq').val();    			
				var detailReq = $http({
					method : 'GET',
					url : '/api/pdf/exportPc?memberSeq=' + memberSeq + '&configType=L&unit=' + unit + '&width=' + width + '&height=' + height + '&modelSeq=' + modelSeq + '&modelName=' + modelName + '&columns=' + columns + '&rows=' + rows + '&orient=' + orient
            		//url : '/api/pdf/exportPc?memberSeq=' + memberSeq + '&configType=L&unit=M&width=100m&height=50m&modelSeq=1031&modelName=UH55F-E&columns=10&rows=5&orient=landscape'              		
				});
          		
				detailReq.success(function(data){
      				//if(console)	console.log('data='+data)        			
				});
				detailReq.then(function(response){}, function(response){
					if(console)	console.log('export DB save error')
				});
          		//20171110 member export info DB save end
				
				if(s.pdf.title == 'LED CONFIGURATOR')	s.pdf.title = '';
				exportToPDF();
			};
			s.showUpdateModel = function(_modelName){
				var isUpdateModel = false;
				angular.forEach(s.hasDiagramModel, function(val, idx){
					if(_modelName == val)	isUpdateModel = true;
				});
				return isUpdateModel;
			}
			s.setBufferStock = function(_modelName, _cabinetTotal){
				var ratio = config.hasDiagramModel.bufferStockRatio[_modelName];
				return Math.ceil(_cabinetTotal * ratio);				
			};
			s.init = function(){
				s.scrollTop = angular.element('#header').outerHeight(true) + angular.element('.h-page').outerHeight(true) - angular.element('#nav-local').outerHeight(true) - angular.element('#nav-local').outerHeight(true);
				s.unit = config.unit; // 'feet' or 'meter'
        		
				s.imgUrl = constant.data.img;
    	    	  
				/* 1) '$scope.display': current information(view binding) 
				 * 2) 'variable.get().display' : storage
				 */ 
				/* about display :: Specifications information */
				s.display = variable.get().display;
    	    	  
				/* about wall */
				s.wall = {
						sizeTimer : {width : null, height : null},
						sizePopupRemoveTimer : {width : null, height : null},
						size : {width : config.wall.width, height : config.wall.height, pixel_height : 0, pixel_width : constant.wall.pixel_width},
						meter_size : {},
						feet_size : {},
						opts : {
							choose : {position : {left : 0, top : 0}},
							sizeW : {position: {bottom : 0}},
							sizeH : {position : {left : 0, top : 0}}   
						}
				};
				s.choose = {};
        		
				/* about videowall(set display) */
				s.videowall = {
						size : {}, 
						col : config.videowall.col, 
						row : config.videowall.row, 
						input_col : config.videowall.col,
						input_row : config.videowall.row,
						max : {},
						timer : {col : null, row : null},
						same : {
							row : {display : null, space : null},
							col : {display : null, space : null}
						},
						isExceed : {
							row : false,
							col : false
						},
						repeatNum : 0,
                		
						/* 171023 추가 */
						fhd : {
							display : {
								row : 0,
								col : 0
							},
							isActive : false,
							txtPos : [], // 171123 추가
							wall : { // 171212 추가
								row : 0,
								col : 0
							}
						},
						uhd : {
							display : {
								row : 0,
								col : 0
							},
							isActive : false,
							txtPos : [], // 171123 추가
							wall : { // 171212 추가
								row : 0,
								col : 0
							}
						},
						mode : null // null
						/* //171023 추가 */
				};
        		
				/* about person in the space */
				s.person = {size : {}, position : {}};
        		
				s.tab = {opts : 1, view : 2, unit : config.unit, choose : 1}; // opts : wall size, choose model, display layout, upload content / view : blueprint, render / unit : feet, meter
        		
				s.tag = {w : true, h : true};
        		
				                
				/* about upload contents :: view binding */
				s.upload = uploadModel.get();
				s.same = {
						row : null,
						col : null
				};
				s.exceed = {
						num : 0,
        			
						state : {
							fix : 1,
							row : 2,
							col : 3,
							both : 4
						}
				};
    	    	  
				s.blueprintProp = {/* 171116 :: 리펙토링 추가*/
						width : 0,
						height : 0
				};
				
				s.pdf = {
					title: '',
					hasProductInfo: false,
					imgFile: '',
					os: ''
				};

				/* about layer popup*/
				s.layer = {
						loading : {
							open : false,
							openF : function(_scope){
								_scope.layer.loading.open = true;
								setLoadingBar(true);
							},
							closeF : function(_scope){
								_scope.layer.loading.open = false;
								setLoadingBar(false);
							}
						}
				};	
				s.hasDiagramModel = config.hasDiagramModel.name;
			}
			s.getModelSeq = function(){
				return s.display.seq;
			};
			s.initDisplay = function(){
				variable.set('display.spec', variable.get().display.spec); // s.display.spec
				setTimeout(function(){
					if($('#loading-layer').hasClass('is-active'))	setLoadingBar(false);
					s.exportToPDF();
				}, 2000);
				s.display = setDisplayProp.get(); // display
			
				s.resizeDisplay();
				angular.element('#blueprint .model_tag .model-name').text(s.display.name);
			}
			s.$watch('display.seq', function(newValue, oldValue){
				if(console)	console.log(newValue, oldValue);	
				releaseDisplay.set(s.display.seq, s.initDisplay);
			});
			s.init();
		});
        
		configurator.directive('inputNumber', function($filter){
			return {
				require: 'ngModel',
				link : function($scope, $element, $attrs, ngModelCtrl) {
					ngModelCtrl.$render = function() {
						$element.val($filter('nDot')(ngModelCtrl.$viewValue, $attrs.ngModel, false));
					};
				}
			}
		});
        
		/* 171121 custom directive 추가 */
		configurator.directive('ngD', function() {
			return function(scope, elem, attrs) {
				attrs.$observe('ngD', function(d) {
					elem.attr('d', d);
				});
			};
		});
		configurator.directive('ngWidth', function() {
			return function(scope, elem, attrs) {
				attrs.$observe('ngWidth', function(width) {
					var _w = width;
					if(width == 'NaN'){
						_w = 167.68;
					}
					elem.attr('width', _w);
				});
			};
		});
		configurator.directive('ngHeight', function() {
			return function(scope, elem, attrs) {
				attrs.$observe('ngHeight', function(height) {
					var _h = height;
					if(height == 'NaN'){
						_h = 94.44;
					}
					elem.attr('height', _h);
				});
			};
		});
		configurator.directive('ngX', function() {
			return function(scope, elem, attrs) {
				attrs.$observe('ngX', function(x) {
					elem.attr('x', x);
				});
			};
		});
		configurator.directive('ngY', function() {
			return function(scope, elem, attrs) {
				attrs.$observe('ngY', function(y) {
					elem.attr('y', y);
				});
			};
		});
		/* //171121 custom directive 추가 */
        
		configurator.filter('nDot', [function(){
			return function(_data, _model){
				var num,
					tmp = _model.split('.'),
					tmp1 = (isNaN(_data)) ? [] : _data.split('.'),
					tmp2;
        		
				if(config.isFirst[tmp[2]] == true){
					config.isFirst[tmp[2]] = false;
					num = (Number(_data));
				}else{
					if(tmp1[1]){
						tmp2 = String(tmp1[1]).substr(0, 2);
						num = (tmp1[0] + '.' + tmp2);
					}else{
						num = (tmp1[0]);
					}
				}
				return num;
			}
		}]);
        
		configurator.constant('constant', {
			wall : {
				maxSize : {
					meter_width : 60,
					meter_height : 60,
					feet_width : 196.85,
					feet_height : 196.85
				},
				minSize : {
					meter_width : 1,//4,//1
					meter_height : 1,//2.64,//1
					feet_width : 3.28,//13.12,//3.28
					feet_height : 3.28//8.65//3.28
				},
				pixel_width : 686,//692,
				pixel_bottom : 95
			},
			person : {
				meter_height : 1.83,
				ratio : (119 / 361)
			},
			data : {
				base : '/support/led-configurator?method=',
				list : {
					outdoor : 'list&sTypeCd=1697',
					indoor : 'list&sTypeCd=1696',
					thewall : 'list&sTypeCd=' + ((window.location.host === 'dsf-stg.devtree.co.kr') ? '2476' : '2577') // stg :: 2476 // gate :: 2577 context.local.properties stg :: 23306 // gate :: 3306
				},
				detail : 'detail&seq=',
				spec : 'spec&seq=',
				link : 'https://displaysolutions.samsung.com/led-signage/detail/',
				img : 'https://vd-dsg.s3.amazonaws.com/logs/upload'
			},
			info : {
				w : 1920,
				h : 1080
			},
        	
			/* 171023 추가 */
			fhd : { 
				w : 1920,
				h : 1080
			},
			uhd : { 
				w : 3840,
				h : 2160
			}
			/*  //171023 추가 */
		});
        
		configurator.factory('variable', function(){
			var _scope = {}, req;
        	
			_scope.STATIC_SIZE = {};
        	
			/* about choose display layer popup */
			_scope.choose = {
					list : [],
					detail : {}
			};
        	
			/* about display in the space */
			_scope.display = {
					name : config.display.name, 
					seq : config.display.seq,
					orientation : 'landscape',
					spec : {},
					real_size: {},
					size : {},
					module : {},
					meter_size : {},
					pixel_size : {},
					ratio : null,
					fhd_each : {},
					uhd_each : {}
			};
			
			return {
				set : function(_namespace, _data){
					var temp = {},
						arr = _namespace.split('.'),
						j = 0, len = arr.length;
					/*
            		function indata(){
            			var parent = temp,
            				i, total = arr.length;
            			
            			angular.forEach(arr, function(value, idx){
            				if(idx == total - 1){
            					parent[arr[idx]] = _data;
            				}else{
            					parent[arr[idx]] = {};
            				}
            					
            		        parent = parent[arr[idx]];
            		        
            			});
            		  
            		    return parent;        			
            		}
            		
            		indata();
            		*/
					(len == 2) ? _scope[arr[0]][arr[1]] = _data : _scope[arr[0]] = _data ; // �� �꾩떆
				},
				get : function(){
					return _scope;
				}
			}
		});
        
		configurator.factory('uploadModel', function(){
			var upload = {
					current : 'image',
					isColor : false,
					contents : {video : 'Default Image', image : config.image},
					video : {
						position : {top : 0, left : 0},
						list : [{
							'id' : 0,
							'title' : 'No Image',
							'background-color' : config.color
						},{
							'id' : 1,
							'title' : 'Sample Video',
							'url' : config.video,
							'size' : {width : 640, height : 360}
						}]
					}
			};
            
			return {
				set : function(_upload){
					upload = _upload;
				},
				get : function(){
					return upload;
				}
			}
		});
        
		configurator.directive('repeatComplete', function(){
			return function(scope, element, attrs) {
				if (scope.$last){
					scope.videowall.repeatNum += 1;
					if(scope.videowall.repeatNum >= (scope.videowall.row)){
						setLoadingBar(false);
						scope.videowall.repeatNum = scope.videowall.row;	
					}
				}
			};
		});
        
		configurator.factory('setDisplayProp', function(variable, converseDisplaySize, decimalPoint, perDisplay){
			return{
				get : function(){
					var tempS = variable.get().display.spec.DIMENSIONS.split('x'),
						tempMTotal = variable.get().display.spec.CABINET_MODULE_CONFIGURATION.length,
						tempM = variable.get().display.spec.CABINET_MODULE_CONFIGURATION.substring(0, tempMTotal - 6).split('x'),
						size = {},
						real_size = {},
						module = {},
						ratio,
						t;
        			
					$.each(tempS, function(_idx){
						if(_idx == 0){
							size.width = parseFloat(tempS[_idx]);
							real_size.width = Number(tempS[_idx]);
							module.width = parseInt(tempM[_idx]);
						}else{
							if(_idx == 1){
								size.height = parseFloat(tempS[_idx]);
								real_size.height = Number(tempS[_idx]);
								module.height = parseInt(tempM[_idx]);
							}else{
								size.depth = parseInt(tempS[_idx]);
							}
						}
					});
        			
					variable.set('display.size', size);
					variable.set('display.real_size', real_size);
					variable.set('display.module', module);
					variable.set('display.meter_size', converseDisplaySize.getSize(size));
        			
					ratio = decimalPoint.getNum(variable.get().display.meter_size.height / variable.get().display.meter_size.width, 2);
					variable.set('display.ratio', Number(ratio));
        			
					/* 171023 추가 */
					variable.set('display.fhd_each', perDisplay.getEach(module, 'fhd'));
					variable.set('display.uhd_each', perDisplay.getEach(module, 'uhd'));
					/* //171023 추가 */
        			
					return variable.get().display;
				}
			}
		});
        
		/* spec data */
		configurator.factory('releaseDisplay', function($http, variable, constant, converseDisplaySize){
			return {
				set : function(_seq, _func){
					var displayData = {},
						url = constant.data.base + constant.data.spec,
						req;
        			
					req = $http({
						method : 'GET',
						url : url + _seq
					});
					req.success(function(data, status, headers, config){
						variable.set('display.spec', data.spec);
						variable.set('display.name', data.spec.PRODUCT_NAME);						
						variable.set('display.seriesname', data.spec.SERIES_NAME);
						if(console)	console.log(variable.get().display)
						if(_func)	_func();
					});
					req.then(function(response){}, function(response){
						if(console)	console.log('set display error!')
					});
				}
			}
		});
		
		
        
		configurator.factory('converseToFeet', function(){
			var feetNum;
			return{
				getNum : function(_metersNum){
					feetNum = parseFloat((_metersNum * 3.2808)); // .toPrecision(2)
					return feetNum;
				}
			}
		});
        
		configurator.factory('converseToMeter', function(){
			var meterNum;
			return{
				getNum : function(_feetNum){
					meterNum = parseFloat((_feetNum * 0.3048)); // .toPrecision(2)
					return meterNum;
				}
			}
		});
        
		configurator.factory('converseToInch', function(converseToMeter, decimalPoint){
			var inchNum, num, num2;
			return{
				getNum : function(_num, _unit){
					num = _num;
					if(_unit != 'meter'){
						num = converseToMeter.getNum(_num);
					}
        			
					//inchNum = parseFloat((num * 39.3700)); // .toPrecision(2)
					num2 = parseFloat((num * 39.3700)); // .toPrecision(2)
					inchNum = decimalPoint.getNum(num2, 2);
					return inchNum;
				}
			}
		});
        
		configurator.factory('converseDisplaySize', function(){
			var meterSize;
			return{
				getSize : function(_milliSize){  // milli -> m
					meterSize = {
							width : Number((_milliSize.width * 0.001).toFixed(4)),
							height : Number((_milliSize.height * 0.001).toFixed(4))
					};
					return meterSize;
				}
			}
		});
        
		configurator.factory('getBlueprintSize', function(decimalPoint){
			return {
				getSize : function(_size, _videowall){
					return (_size * _videowall);
				}
			}
		});
        
		configurator.factory('getTagSize', function(){
			var w = 45, h = 24, padding = 4, char = 10, unit = 12, dot = 4, i, j;
        	
			return {
				getSize : function(_val){
					var val = String(_val), tmp = val.split('.'), total = tmp.length, width = padding * 2 + unit + dot;
					for(i = 0; i < total; i += 1){
						for(j = 0; j < tmp[i].length; j += 1){
							width += char;
						}
					}
					w = width;
        			
					return {
						'width' : w        				
					}
				},
				'height' : h
			}
		});
        
		configurator.factory('decimalPoint', function(){
			return {
				getNum : function(_num, _point){
					var s = [], nmr, num;
					if(!isNaN(_num)){
						num = Math.abs(_num) + 0.00001;
						s = String(num).split('.');
						nmr = (s[1] == undefined) ? s[0] : s[0] + '.' + String(s[1]).substring(0, _point);
					}
        			
					return Number(nmr);
				}
			}
		});
        
		/* 171023 추가 */
		configurator.factory('perDisplay', function(constant){
			return {
				getEach : function(_perSize, _type){
					var each = {
							width : parseInt(constant[_type].w / _perSize.width),
							height : parseInt(constant[_type].h / _perSize.height)
					};
        			
					return each;
				}
			}
		});
		/*  //171023 추가 */
	}
	
	function setLoadingBar(_view){
		var view = _view, $loadingLayer = $('#loading-layer'), $loading = $loadingLayer.find('.layer .loading'), btn_class = 'is-active';
		if(view){
			$loadingLayer.addClass(btn_class);
			ssds.common.newLoading($loading);
			$body.addClass('no-scroll');
		}else{
			$loadingLayer.removeClass(btn_class);
			ssds.common.newLoadingDone($loading.find('.newLoading'));
			$body.removeClass('no-scroll');
		}
	}
    
	return {init: init}
})(jQuery);

ledConfiguratorApp.init();