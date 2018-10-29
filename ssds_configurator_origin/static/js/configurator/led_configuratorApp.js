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
		configurator.controller('ledConfiguratorController', function($scope, $document, $http, variable, constant, setDisplayProp, releaseDisplay, chooseDisplay, loadDisplayList, converseToFeet, converseToMeter, converseToInch, getBlueprintSize, getTagSize, uploadModel, decimalPoint){
			var s      = $scope,
				$body  = angular.element('body'),
				$popup = angular.element('.ly-configurator');
			s.setTab = function(_tab){s.tab.opts = _tab;};
			s.getTab = function(_tab){return s.tab.opts === _tab;};
			s.setViewTab = function(_tab){s.tab.view = _tab;s.setTop();};
			s.getViewTab = function(_tab){return s.tab.view === _tab;};
			s.setChooseTab = function(_tab){
				if(s.tab.choose != _tab){
					s.tab.choose = _tab;
					switch(_tab){
						case 1:
							s.layer.choose.type = 'indoor';
							break;
							
						case 2:
							s.layer.choose.type = 'outdoor';
							break;
							
						case 3:
							s.layer.choose.type = 'thewall';
							break;
							
						default:
							break;
					}
					loadDisplayList.set(s.layer.choose.type, s.setChooseList);
				}
			};
			s.getChooseTab = function(_tab){return s.tab.choose === _tab;};
			s.setTop = function(){$document.scrollTop(s.scrollTop);}
			s.changeOrientation = function(){
				var pixel_size = {width : variable.get().STATIC_SIZE.width, height : variable.get().STATIC_SIZE.height}, size = {};
				switch(s.display.orientation){
					case 'landscape' :
						size.width = pixel_size.width;
						size.height = pixel_size.height;
						break;
					
					case 'portrait' :
						size.width = pixel_size.height;
						size.height = pixel_size.width;
						break;
						
					default :
						break;
				}
				
				s.display.pixel_size = size;
				s.getMaxVideowall();
				s.setVideowall();
				s.setExceedTable();
				s.changeOptsPosition();
				
				if(console)	console.log('changeOrientation :: ', s.videowall.input_col);
			};
			s.toggleOrientation = function(){
				var orientation;
				
				switch(s.display.orientation){
					case 'landscape' :
						orientation = 'portrait';
						break;
						
					case 'portrait' :
						orientation = 'landscape';
						break;
						
					default :
						break;
				}
				angular.element('.define-orientation').find('.g-select-title strong').text(orientation);
				s.display.orientation = orientation;
//        		s.changeOrientation();
			};
			s.getChooseDisplayLayer = function(_boolean){
				if(_boolean)	loadDisplayList.set(s.layer.choose.type, s.setChooseList);
				s.layer.choose.open = _boolean;
				if(s.layer.choose.open){
					$body.addClass('no-scroll');
					s.choose = variable.get().choose;
				}else{
					$body.removeClass('no-scroll');
					s.layer.choose.name = s.display.name; // not choose this model
					s.layer.choose.seq = s.display.seq; // not choose this model
					s.layer.choose.type = 'indoor'; // not choose this model
					s.tab.choose = 1;
				}
			};
			s.getChooseDisplay = function(_model, _seq){
				s.layer.choose.name = _model;
				s.layer.choose.seq = _seq;
				chooseDisplay.set(s.layer.choose.seq, s.setChooseOverview);
			};
			s.setChooseList = function(){
				s.layer.choose.list = variable.get().choose.list;
				chooseDisplay.set(s.layer.choose.seq, s.setChooseOverview);
			};
			s.setChooseOverview = function(){
				s.layer.choose.detail = variable.get().choose.detail;
			};
			s.setChooseDisplay = function(_modelName, _modelSeq){
				s.getChooseDisplayLayer(false);
				if(s.display.seq !== _modelSeq){
					s.display.seq = _modelSeq;
					setLoadingBar(true);
				}
			};
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
				s.changeOptsPosition();
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
//	    					if(s.videowall.col > s.videowall.max.col)  s.videowall.col = s.videowall.max.col + 1;
							if(s.videowall.col > s.videowall.max.col)  s.videowall.col = s.videowall.max.col;
							break;
							
						case 'row' :
//		    				if(s.videowall.row > s.videowall.max.row)  s.videowall.row = s.videowall.max.row + 1;
							if(s.videowall.row > s.videowall.max.row)  s.videowall.row = s.videowall.max.row;
							break;
							
						default :
							break;
					}
				}else{
					if(s.videowall.col > s.videowall.max.col){
//    					s.videowall.input_col = s.videowall.col = s.videowall.max.col + 1;
						s.videowall.input_col = s.videowall.col = s.videowall.max.col;
					}else{
						s.videowall.input_col = s.videowall.col;
					}
					if(s.videowall.row > s.videowall.max.row){
//						s.videowall.row = s.videowall.max.row + 1;
						s.videowall.row = s.videowall.max.row;
					}else{
						s.videowall.input_row = s.videowall.row;
					}
				}
			};
			s.setMaxVideowall = function(){				
				if(s.videowall.col < s.videowall.max.col || s.videowall.row < s.videowall.max.row){
					s.layer.loading.open = true;
					setLoadingBar(true);
					
					setTimeout(function(){
						s.getMaxVideowall();
						s.videowall.input_col = s.videowall.col = s.videowall.max.col;
						s.videowall.input_row = s.videowall.row = s.videowall.max.row;
            			
						/* 171023 추가 */
						s.getFHDCol();
						s.getUHDCol();
						s.getFHDRow();
						s.getUHDRow();						
            			/*  //171023 추가 */
						s.setFHDUHDText(); // 171123 추가
						
            			//s.exceed.num = 1;
						s.renderComplete(s.tab.view);
            			
            			/* 171121 추가*/
						setTimeout(function(){
							setLoadingBar(false);
							s.layer.loading.open = false;
						}, 1000);
            			/*  //171121 추가*/
					}, 1000);
				}
			};
			s.changeOptsPosition = function(){
				s.videoPosition();
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
			s.showExceedCase = function(){
				var isShow = (s.videowall.max.col <= s.videowall.col && s.videowall.max.row <= s.videowall.row) ? true : false;
				return isShow;
			};
			s.selectExceedCaseStyle = function(_exceedNum){
				var isActive = (s.exceed.num === _exceedNum);
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(_exceedNum != 1)	isActive = false;
				}
				return isActive;
			};
			s.clickExceedCase = function(_exceedNum, _isClick){
				s.videowall.isExceed.row = true;
				s.videowall.isExceed.col = true;
				s.selectExceedCase(_exceedNum, _isClick);
			};
			s.selectExceedCase = function(_exceedNum, _isClick){
				var key, val, isSpace, isClick = _isClick;
				s.exceed.num = _exceedNum;
				$.each(s.exceed.state, function(idx){
					if(s.exceed.num == s.exceed.state[idx]){
						key = idx;
						val = s.exceed.state[idx];
					}
				});
				switch(val){
					case 1:
						s.videowall.input_col = s.videowall.col = s.videowall.max.col;
						s.videowall.input_row = s.videowall.row = s.videowall.max.row;
						break;
						
					case 2:
						isSpace = s.calculateVideowall('row', 'exceed-case').isSame;
						s.videowall.input_row = s.videowall.row = (isSpace) ? s.videowall.max.row : s.videowall.max.row + 1;
						if(isClick)	s.videowall.input_col = s.videowall.col = s.videowall.max.col;
						if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
							if(s.setBlueprintHeight(s.videowall.row) > s.wall.size.height){
								if(s.layer.same.open == false){
									s.videowall.input_row = s.videowall.row = s.videowall.max.row;
									s.layer.same.msg = s.layer.same.msgF('The currently installed display is too large for the wall size, which is an inappropriate setting.');
									s.layer.same.open = true;
									s.layer.same.posF();
								}
							}
						}
						break;
						
					case 3:
						isSpace = s.calculateVideowall('col', 'exceed-case').isSame;
						s.videowall.input_col = s.videowall.col = (isSpace) ? s.videowall.max.col : s.videowall.max.col + 1;
						if(isClick)	s.videowall.input_row = s.videowall.row = s.videowall.max.row;
						if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
							if(s.setBlueprintWidth(s.videowall.col) > s.wall.size.width){
								if(s.layer.same.open == false){
									s.videowall.input_col = s.videowall.col = s.videowall.max.col;
									s.layer.same.msg = s.layer.same.msgF('The currently installed display is too large for the wall size, which is an inappropriate setting.');
									s.layer.same.open = true;
									s.layer.same.posF();
								}
							}
						}
						break;
						
					case 4:
						isSpace = s.calculateVideowall('col', 'exceed-case').isSame;
						s.videowall.input_col = s.videowall.col = (isSpace) ? s.videowall.max.col : s.videowall.max.col + 1;//s.videowall.input_col =
						isSpace = s.calculateVideowall('row', 'exceed-case').isSame;
						s.videowall.input_row = s.videowall.row = (isSpace) ? s.videowall.max.row : s.videowall.max.row + 1;//s.videowall.input_row =
						if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
							if(s.setBlueprintWidth(s.videowall.col) > s.wall.size.width || s.setBlueprintHeight(s.videowall.row) > s.wall.size.height){
								if(s.layer.same.open == false){
									s.videowall.input_col = s.videowall.col = s.videowall.max.col;
									s.videowall.input_row = s.videowall.row = s.videowall.max.row;
									s.layer.same.msg = s.layer.same.msgF('The currently installed display is too large for the wall size, which is an inappropriate setting.');
									s.layer.same.open = true;
									s.layer.same.posF();
								}
							}
						}
						break;
						
					default:
						break;
				}
			};
			s.getDottedStyle = function(){
				var style = {}, borderL, borderR, borderT, borderB,
					wall = {
						width : s.wall.size.width,
						height : s.wall.size.height
					},
					display = {}, top = 0, left = 0, width = 692, height = 411, overline = '2px #f89bb0 dotted', noneline = 'none';
				
				switch(s.display.orientation){
					case 'landscape' :
						display.width = (s.unit == 'meter') ? decimalPoint.getNum(s.display.meter_size.width * s.videowall.col, 3) : decimalPoint.getNum(converseToFeet.getNum(s.display.meter_size.width) * s.videowall.col, 3);
						display.height = (s.unit == 'meter') ? decimalPoint.getNum(s.display.meter_size.height * s.videowall.row, 3) : decimalPoint.getNum(converseToFeet.getNum(s.display.meter_size.height) * s.videowall.row, 3);
						break;
						
					case 'portrait' :
						display.width = (s.unit == 'meter') ? decimalPoint.getNum(s.display.meter_size.height * s.videowall.col, 3) : decimalPoint.getNum(converseToFeet.getNum(s.display.meter_size.height) * s.videowall.col, 3);
						display.height = (s.unit == 'meter') ? decimalPoint.getNum(s.display.meter_size.width * s.videowall.row, 3) : decimalPoint.getNum(converseToFeet.getNum(s.display.meter_size.width) * s.videowall.row, 3);
						break;
						
					default :
						break;
				}
				if(display.width > wall.width){
					borderL = borderR = overline;
					height = s.display.pixel_size.height * s.videowall.row;
					top = (s.wall.size.pixel_height - (s.display.pixel_size.height * s.videowall.row)) / 2;
				}else{
					borderL = borderR = noneline;
				}
				if(display.height > wall.height){
					borderT = borderB = overline;
					width = s.display.pixel_size.width * s.videowall.col;
					left = (692 - (s.display.pixel_size.width * s.videowall.col)) / 2;
					height = s.wall.size.pixel_height;
				}else{
					borderT = borderB = noneline;
				}
				if(display.height > wall.height && display.width >= wall.width){
					top = 0;
					left = 0;
					width = 100 + '%';
					height = 100 + '%';
				}
				style = {
						'border-left' : borderL,
						'border-right' : borderR,
						'border-top' : borderT,
						'border-bottom' : borderB,
						'top' : top,
						'left' : left,
						'width' : width,
						'height' : height
				};
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
				var w = s.blueprintProp.width, //s.setBlueprintWidth(),
					h = s.blueprintProp.height, //s.setBlueprintHeight(),
					wh = (Math.sqrt((w * w) + (h * h))).toFixed(2);
				return converseToInch.getNum(wh, s.unit);//return wh + ' ' + ((s.unit == 'meter') ? 'm' : 'ft' ) + ' (' + converseToInch.getNum(wh, s.unit) + ' inch)';
			};
    		
			/* 171116 :: table -> svg로 변경되어 삭제
			s.getRepeatNum = function(_num){
				return new Array(_num);
			};
    		 */
    		
			/* 171116 :: svg row, col 그리기 :: 추가 */
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
			/*  //171116 :: svg row, col 그리기 :: 추가 */
    		/*
			s.changeCol = function(_num, _exceed){
				var col, input_col = Number(s.videowall.input_col);
    			
    			if(display.width > wall.width){
    				borderL = borderR = overline;  
    				height = s.display.pixel_size.height * s.videowall.row;
    				top = (s.wall.size.pixel_height - (s.display.pixel_size.height * s.videowall.row)) / 2;
    			}else{
    				borderL = borderR = noneline;
    			}
    			
    			if(display.height > wall.height){
    				borderT = borderB = overline;
    				width = s.display.pixel_size.width * s.videowall.col;
    				left = (692 - (s.display.pixel_size.width * s.videowall.col)) / 2;
    				height = s.wall.size.pixel_height;
    			}else{
    				borderT = borderB = noneline;
    			}
    			
    			if(display.height > wall.height && display.width >= wall.width){
    				top = 0;
    				left = 0;
    				width = 100 + '%';
    				height = 100 + '%';
    			}
    			
    			style = {
    					'border-left' : borderL,
    					'border-right' : borderR,
    					'border-top' : borderT,
    					'border-bottom' : borderB,
    					'top' : top,
    					'left' : left,
    					'width' : width,
    					'height' : height
    			};
    			
    			return style;
    		};*/
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
    			var w = s.blueprintProp.width, //s.setBlueprintWidth(),
    				h = s.blueprintProp.height, //s.setBlueprintHeight(),
    				wh = (Math.sqrt((w * w) + (h * h))).toFixed(2);
    			
    			//return wh + ' ' + ((s.unit == 'meter') ? 'm' : 'ft' ) + ' (' + converseToInch.getNum(wh, s.unit) + ' inch)';
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
					if(s.layer.over.open == true)  s.layer.over.open = false;
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
						s.renderComplete(s.tab.view);
					}
					if(Number(s.videowall.input_col) > s.videowall.max.col){
						s.setExceedTable();
						isSpace = s.calculateVideowall('col').isSpace;
						if(isSpace){
							s.videowall.input_col = s.videowall.col = s.videowall.max.col;
							s.layer.same.msg = s.layer.same.msgF('Since the installed cabinet width is the same as the wall width, it can not be installed additionally');
							s.layer.same.open = true;
							s.layer.same.posF();
						}else{
							if(_exceed == undefined || _exceed == false){
								if(s.layer.same.open == false){
									s.videowall.input_col = s.videowall.col = s.videowall.max.col;

//    								170911 :: +1 삭제   								
//    								s.videowall.input_col = s.videowall.col = s.videowall.max.col + 1;
//	        	    				s.layer.over.msg = s.layer.over.msgF('width', (s.setBlueprintWidth() - s.wall.size.width).toPrecision(2));
//	        						s.layer.over.open = true;
//	        						s.layer.over.posF();
//    	    	    				s.layer.same.msg = s.layer.same.msgF('Since the installed cabinet width is the same as the wall width, it can not be installed additionally');
									s.layer.same.msg = s.layer.same.msgF('The maximum number of displays you can install is ' + s.videowall.max.col + ' x ' + s.videowall.max.row + '(WxH).');
									s.layer.same.open = true;
									s.layer.same.posF();
								}
							}
						}
					}
					if(Number(s.videowall.input_col) <= 0){
						s.videowall.input_col = s.videowall.col = 1;
						s.renderComplete(s.tab.view);
					}
					if(Number(s.videowall.col) == s.videowall.max.col)	s.setExceedTable();
				}
				s.setVideowall('col');
    			
				/* 171023 추가 */
				s.getFHDCol();
				s.getUHDCol();
				/* //171023 추가 */
				s.setFHDUHDText(); // 171123 추가
    			
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
					if(s.layer.over.open == true)  s.layer.over.open = false;
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
						s.renderComplete(s.tab.view);
					}
					
					if(Number(s.videowall.input_row) > s.videowall.max.row){
						s.setExceedTable();	
						isSpace = s.calculateVideowall('row').isSpace;
						if(isSpace){
							s.videowall.input_row = s.videowall.row = s.videowall.max.row;
							s.layer.same.msg = s.layer.same.msgF('Since the installed cabinet height is the same as the wall height, it can not be installed additionally');
							s.layer.same.open = true;
							s.layer.same.posF();
						}else{
							if(_exceed == undefined || _exceed == false){
								if(s.layer.same.open == false){
									s.videowall.input_row = s.videowall.row = s.videowall.max.row;
//									170911 :: +1 삭제
//									s.videowall.input_row = s.videowall.row = s.videowall.max.row + 1;
//				    				s.layer.over.msg = s.layer.over.msgF('height', (s.setBlueprintHeight() - s.wall.size.height).toPrecision(2));
//									s.layer.over.open = true;
//									s.layer.over.posF();
									
									s.layer.same.msg = s.layer.same.msgF('The maximum number of displays you can install is ' + s.videowall.max.col + ' x ' + s.videowall.max.row + '(WxH).');
//									s.layer.same.msg = s.layer.same.msgF('Since the installed cabinet height is the same as the wall height, it can not be installed additionally');
									s.layer.same.open = true;
									s.layer.same.posF();
								}
							}
						}
					}
					
					if(Number(s.videowall.input_row) <= 0){    	
						//s.setExceedTable();
						s.videowall.input_row = s.videowall.row = 1;
						s.renderComplete(s.tab.view);
					}
					
					if(Number(s.videowall.row) == s.videowall.max.row)	s.setExceedTable();	
				}
				
				s.setVideowall('row');
				/* 171023 추가 */
				s.getFHDRow();
				s.getUHDRow();
    			/* //171023 추가 */
				s.setFHDUHDText(); // 171123 추가
				
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
			s.setExceedTable = function(_item){
				if(s.videowall.row == s.videowall.max.row && s.videowall.col == s.videowall.max.col){
					s.selectExceedCase(s.exceed.state.fix);
				}else if(s.videowall.row > s.videowall.max.row && s.videowall.col > s.videowall.max.col){
					s.selectExceedCase(s.exceed.state.both);
				}else{
					if(s.videowall.row > s.videowall.max.row){
						s.selectExceedCase(s.exceed.state.row);
					}
    				
					if(s.videowall.col > s.videowall.max.col){
						s.selectExceedCase(s.exceed.state.col);
					}
				}
//    			if(s.videowall.isExceed.row == true)	s.videowall.isExceed.row = false;
//    			if(s.videowall.isExceed.col == true)	s.videowall.isExceed.col = false;
//    			if(console)		console.log('s.setExceedTable :: ', s.videowall.input_col);
			};
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
			s.exceedOptimizedWidth = function(){
				var width = s.setBlueprintWidth(s.videowall.max.col);
				width = decimalPoint.getNum(width, 2);
				return width;
			};
			s.exceedOptimizedHeight = function(){
				var height = s.setBlueprintHeight(s.videowall.max.row);
				height = decimalPoint.getNum(height, 2);
				return height;
			};
			s.exceedOptimizedCabinet = function(){
				var cabinet = s.videowall.max.col * s.videowall.max.row + '(' + s.videowall.max.col + 'x' + s.videowall.max.row + ')';
				return cabinet;
			};
			s.exceedOptimizedResolution = function(){
				var resolution = s.display.module.width * s.videowall.max.col + 'X' + s.display.module.height * s.videowall.max.row;
				return resolution;
			};
			s.exceedOptimizedSbox = function(){
				var getsbox = s.getSbox({col : s.videowall.max.col, row : s.videowall.max.row}), sbox;
				sbox = (s.hasSbox() == true) ? (getsbox.FHD + ((getsbox.UHD == '') ? '' : '(FHD) /') + getsbox.UHD + ((getsbox.UHD == '') ? '' : '(UHD)')) : 'N/A' ;
				return sbox;
			};
			s.exceedHeightWidth = function(){
				var width = s.setBlueprintWidth(s.videowall.max.col);
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1)	width = s.setBlueprintWidth(s.videowall.max.col);
				width = decimalPoint.getNum(width, 2);
				return width;
			};
			s.exceedHeightHeight = function(){
				var height = (s.calculateVideowall('row', 'exceed-case').isSame) ? s.setBlueprintHeight(s.videowall.max.row) : s.setBlueprintHeight(s.videowall.max.row + 1);
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(s.setBlueprintHeight(s.videowall.max.row) > s.wall.size.height)	height = s.setBlueprintHeight(s.videowall.max.row);
				}
				height = decimalPoint.getNum(height, 2);
				return height;
			};
			s.exceedHeightCabinet = function(){
				var cabinet = ((s.calculateVideowall('row', 'exceed-case').isSame) ? s.videowall.max.col * s.videowall.max.row : s.videowall.max.col * (s.videowall.max.row + 1)) + '(' + s.videowall.max.col + 'x' + ((s.calculateVideowall('row', 'exceed-case').isSame) ? (s.videowall.max.row) : (s.videowall.max.row + 1)) + ')';
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(s.setBlueprintHeight(s.videowall.row) > s.wall.size.height){
						cabinet = (s.videowall.max.col * s.videowall.max.row) + '(' + (s.videowall.max.col + 'x' + s.videowall.max.row) + ')';
					}
				}
				return cabinet;
			};
			s.exceedHeightResolution = function(){
				var resolution = (s.display.module.width * s.videowall.max.col) + 'X' + ((s.calculateVideowall('row', 'exceed-case').isSame) ? s.display.module.height * s.videowall.max.row : s.display.module.height * (s.videowall.max.row + 1));
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(s.setBlueprintHeight(s.videowall.row) > s.wall.size.height){
						resolution = (s.display.module.width * s.videowall.max.col) + 'X' + s.display.module.height * s.videowall.max.row;
					}
				}
				return resolution;
			};
			s.exceedHeightSbox = function(){
				var row = (s.calculateVideowall('col', 'exceed-case').isSame) ? s.videowall.max.row : (s.videowall.max.row + 1),
					getsbox = s.getSbox({col : s.videowall.max.col, row : row}), sbox;
				if(s.hasSbox() == true){
					sbox = getsbox.FHD + ((getsbox.UHD == '') ? '' : '(FHD) /') + getsbox.UHD + ((getsbox.UHD == '') ? '' : '(UHD)');
					if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
						if(s.setBlueprintHeight(s.videowall.row) > s.wall.size.height){
							row = s.videowall.max.row;
							getsbox = s.getSbox({col : s.videowall.max.col, row : row});
							sbox = getsbox.FHD + ((getsbox.UHD == '') ? '' : '(FHD) /') + getsbox.UHD + ((getsbox.UHD == '') ? '' : '(UHD)');
						}
					}
				}else{
					sbox = 'N/A'
				}
				return sbox;
			}; 
			s.exceedWidthWidth = function(){
				var width = (s.calculateVideowall('col', 'exceed-case').isSame) ? s.setBlueprintWidth(s.videowall.max.col) : s.setBlueprintWidth(s.videowall.max.col + 1);
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(s.setBlueprintWidth(s.videowall.max.col) > s.wall.size.width){
						width = s.setBlueprintWidth(s.videowall.max.col);
					}
				}
				width = decimalPoint.getNum(width, 2);
				return width;
			};
			s.exceedWidthHeight = function(){
				var height = (s.calculateVideowall('row', 'exceed-case').isSame) ? s.setBlueprintHeight(s.videowall.max.row) : s.setBlueprintHeight(s.videowall.max.row + 1);
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1)	height = s.setBlueprintHeight(s.videowall.max.row);
				height = decimalPoint.getNum(height, 2);
				return height;
			};
			s.exceedWidthCabinet = function(){
				var cabinet = ((s.calculateVideowall('col', 'exceed-case').isSame) ? s.videowall.max.col * s.videowall.max.row : (s.videowall.max.col + 1) * s.videowall.max.row) + '(' + ((s.calculateVideowall('col', 'exceed-case').isSame) ? (s.videowall.max.col) : (s.videowall.max.col + 1)) + 'x' + (s.videowall.max.row) + ')';
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(s.setBlueprintWidth(s.videowall.col) > s.wall.size.width){
						cabinet = (s.videowall.max.col * s.videowall.max.row) + '(' + (s.videowall.max.col + 'x' + s.videowall.max.row) + ')';
					}
				}
				return cabinet;
			};
			s.exceedWidthResolution = function(){
				var resolution = (s.display.module.width * s.videowall.max.col) + 'X' + ((s.calculateVideowall('row', 'exceed-case').isSame) ? s.display.module.height * s.videowall.max.row : s.display.module.height * (s.videowall.max.row + 1));
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(s.setBlueprintWidth(s.videowall.col) > s.wall.size.width){
						resolution = (s.display.module.width * s.videowall.max.col) + 'X' + s.display.module.height * s.videowall.max.row;
					}
				}
				return resolution;
			};
			s.exceedWidthSbox = function(){
				var col = (s.calculateVideowall('col', 'exceed-case').isSame) ? s.videowall.max.col + 1: (s.videowall.max.col + 1),
					getsbox = s.getSbox({col : col, row : s.videowall.max.row}), sbox;
				if(s.hasSbox() == true){
					sbox = getsbox.FHD + ((getsbox.UHD == '') ? '' : '(FHD) /') + getsbox.UHD + ((getsbox.UHD == '') ? '' : '(UHD)');
					if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
						if(s.setBlueprintWidth(s.videowall.col) > s.wall.size.width){
							col = s.videowall.max.col;
							getsbox = s.getSbox({col : col, row : s.videowall.max.row});
							sbox = getsbox.FHD + ((getsbox.UHD == '') ? '' : '(FHD) /') + getsbox.UHD + ((getsbox.UHD == '') ? '' : '(UHD)');
						}
					}
				}else{
					sbox = 'N/A';
				}
				return sbox;
			};
			s.exceedOverWidth = function(){
				var width = (s.calculateVideowall('col', 'exceed-case').isSame) ? s.setBlueprintWidth(s.videowall.max.col) : s.setBlueprintWidth(s.videowall.max.col + 1);
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(s.setBlueprintWidth(s.videowall.col) > s.wall.size.width){
						width = s.setBlueprintWidth(s.videowall.max.col);
					}
				}
				width = decimalPoint.getNum(width, 2);
				return width;
			};
			s.exceedOverHeight = function(){
				var height = s.setBlueprintHeight(s.videowall.max.row);
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(s.setBlueprintHeight(s.videowall.row) > s.wall.size.height){
						height = s.setBlueprintHeight(s.videowall.max.row);
					}
				}
				height = decimalPoint.getNum(height, 2);
				return height;
			};
			s.exceedOverCabinet = function(){    			
				var col = ((s.calculateVideowall('col', 'exceed-case').isSame) ? s.videowall.max.col : (s.videowall.max.col + 1)), 
					row = ((s.calculateVideowall('row', 'exceed-case').isSame) ? s.videowall.max.row : (s.videowall.max.row + 1)),
					cabinet;
    			
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(s.setBlueprintWidth(s.videowall.col) > s.wall.size.width){
						col = s.videowall.max.col;
					}
					if(s.setBlueprintHeight(s.videowall.row) > s.wall.size.height){
						row = s.videowall.max.row;
					}
				}
				cabinet = s.getTotalCabinet(col, row) + '(' + col + 'x' + row + ')';
				return cabinet;
			};
			s.exceedOverResolution = function(){
				var col = ((s.calculateVideowall('col', 'exceed-case').isSame) ? s.display.module.width * s.videowall.max.col : s.display.module.width * (s.videowall.max.col + 1)),
					row = ((s.calculateVideowall('row', 'exceed-case').isSame) ? s.display.module.height * s.videowall.max.row : s.display.module.height * (s.videowall.max.row + 1)),
					resolution;
    			
				if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
					if(s.setBlueprintWidth(s.videowall.col) > s.wall.size.width){
						col = s.display.module.width * s.videowall.max.col;
    				}
					if(s.setBlueprintHeight(s.videowall.row) > s.wall.size.height){
						row = s.display.module.height * s.videowall.max.row;
					}
				}
				resolution = col + 'X' + row;
				return resolution;
			};
			s.exceedOverSbox = function(){ 
				var col = (s.calculateVideowall('col', 'exceed-case').isSame) ? s.videowall.max.col : (s.videowall.max.col + 1),
					row = (s.calculateVideowall('row', 'exceed-case').isSame) ? s.videowall.max.row : (s.videowall.max.row + 1),
					getsbox, sbox;
    			
				if(s.hasSbox() == true){
					if(s.videowall.max.col == 1 && s.videowall.max.row == 1){
						if(s.setBlueprintWidth(s.videowall.col) > s.wall.size.width){
							col = s.videowall.max.col;
						}
						if(s.setBlueprintHeight(s.videowall.row) > s.wall.size.height){
							row = s.videowall.max.row;
						}
					}
					getsbox = s.getSbox({col : col, row : row});
					sbox = getsbox.FHD + ((getsbox.UHD == '') ? '' : '(FHD) /') + getsbox.UHD + ((getsbox.UHD == '') ? '' : '(UHD)');
				}else{
					sbox = 'N/A';
				}
				return sbox;
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
//					'right' : -(45 - ((tagSize.width - 45)))
				};
				return style;
			};
			 
//			170911 :: 새함수(s.getNewSbox) 추가로 복 함수 삭제
//			s.getSbox = function(_videowall){
//				var col = (_videowall && _videowall.col) ? _videowall.col : s.videowall.col,
//					row = (_videowall && _videowall.row) ? _videowall.row : s.videowall.row,    			
//					w = s.display.module.width * col,
//					h = s.display.module.height * row,
//					b = {
//							w : (w % constant.info.w != 0) ? parseInt(w / constant.info.w) + 1 : parseInt(w / constant.info.w),
//							h : (h % constant.info.h != 0) ? parseInt(h / constant.info.h) + 1 : parseInt(h / constant.info.h)
//					},
//					sbox = {
//							FHD : b.h * b.w
//					};
//				sbox.UHD = (sbox.FHD % 4 != 0) ? parseInt(sbox.FHD / 4) + 1 : parseInt(sbox.FHD / 4);
//    			
//				if(variable.get().display.spec.PRODUCT_NAME != undefined){
//					if(variable.get().display.spec.CATEGORY == "Outdoor" || variable.get().display.spec.PRODUCT_NAME.match("IPS")){
//						sbox.FHD = 'N/A';
//						sbox.UHD = '';
//					}
//				}
//    			
//				return sbox;
//			};
			s.getNewSbox = function(){ /* 171215 수정 */
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
    				//max1unit = (s.display.spec.POWER_CONSUMPTION_MAX1_UNIT != undefined) ? (s.display.spec.POWER_CONSUMPTION_MAX1_UNIT).replace('&#13217;','㎡') : '',
    	    		//max2unit = s.display.spec.POWER_CONSUMPTION_MAX2_UNIT;
    			if(s.display.seriesname == 'IF Series'){ // cabinet
    				max = (String(s.display.spec.POWER_CONSUMPTION_MAX2 * total).split('.').length == 1) ? s.display.spec.POWER_CONSUMPTION_MAX2 * total : (s.display.spec.POWER_CONSUMPTION_MAX2 * total).toFixed(2);
    				//max += (' ' + max2unit);
    			}else{ //
    				tmp = (s.unit == 'feet') ? s.display.spec.POWER_CONSUMPTION_MAX2 * s.setDisplayArea() : s.display.spec.POWER_CONSUMPTION_MAX1 * s.setDisplayArea();
    				max = Math.round(tmp);
    				//max += (' ' + max1unit);
    			}
    			
//    			var total = s.videowall.col * s.videowall.row,
//    				max1value = s.display.spec.POWER_CONSUMPTION_MAX1 * total,
//    				max2value = (String(s.display.spec.POWER_CONSUMPTION_MAX2 * total).split('.').length == 1) ? s.display.spec.POWER_CONSUMPTION_MAX2 * total : (s.display.spec.POWER_CONSUMPTION_MAX2 * total).toFixed(2) ,
//    				max1unit = (s.display.spec.POWER_CONSUMPTION_MAX1_UNIT != undefined) ? (s.display.spec.POWER_CONSUMPTION_MAX1_UNIT).replace('&#13217;','㎡') : '',
//    				max2unit = s.display.spec.POWER_CONSUMPTION_MAX2_UNIT,
//    				max = max1value + max1unit + ' / ' + max2value + max2unit;
//    			    if(s.display.spec.POWER_CONSUMPTION_MAX == 'TBD') max = 'TBD';
    			
				if(s.display.spec.POWER_CONSUMPTION_MAX == 'TBD') max = 'TBD';    				
    			return max + ' Watts';	
    		};
    		s.setTypical = function(){
    			var total = s.videowall.col * s.videowall.row, 
    				typical, 
    				tmp;
    				//typical1unit = (s.display.spec.POWER_CONSUMPTION_TYPICAL1_UNIT != undefined) ? (s.display.spec.POWER_CONSUMPTION_TYPICAL1_UNIT).replace('&#13217;','㎡') : '',
    				//typical2unit = s.display.spec.POWER_CONSUMPTION_TYPICAL2_UNIT;
    				
    			if(s.display.seriesname == 'IF Series'){ // cabinet
    				typical = (String(s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total).split('.').length == 1) ? s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total : (s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total).toFixed(2);
    				//typical += (' ' + typical2unit);
    			}else{ //
    				tmp = (s.unit == 'feet') ? s.display.spec.POWER_CONSUMPTION_TYPICAL2 * s.setDisplayArea() : s.display.spec.POWER_CONSUMPTION_TYPICAL1 * s.setDisplayArea();
    				typical = Math.round(tmp);
    				//typical += (' ' + typical1unit);
    			}    			
    			if(s.display.spec.POWER_CONSUMPTION_TYPICAL == 'TBD' || s.display.spec.POWER_CONSUMPTION_TYPICAL == 'N/A') typical = s.display.spec.POWER_CONSUMPTION_TYPICAL;
    			
//    			var total = s.videowall.col * s.videowall.row,
//					typical1value = s.display.spec.POWER_CONSUMPTION_TYPICAL1 * total,
//					typical2value = (String(s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total).split('.').length == 1) ? s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total : (s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total).toFixed(2) ,
//					typical1unit = (s.display.spec.POWER_CONSUMPTION_TYPICAL1_UNIT != undefined) ? (s.display.spec.POWER_CONSUMPTION_TYPICAL1_UNIT).replace('&#13217;','㎡') : '',
//					typical2unit = s.display.spec.POWER_CONSUMPTION_TYPICAL2_UNIT,
//					typical = typical1value + typical1unit + ' / ' + typical2value + typical2unit;
//				if(s.display.spec.POWER_CONSUMPTION_TYPICAL == 'TBD' || s.display.spec.POWER_CONSUMPTION_TYPICAL == 'N/A') typical = s.display.spec.POWER_CONSUMPTION_TYPICAL;
				
    			return typical + ' Watts';	
    		};
    		s.specSbox = function(){
    			var sbox;    			
// 				170911 :: 연산 수정   		
//    			if(s.hasSbox() == true){
//    				sbox = s.getSbox().FHD + ' ' + ((s.getSbox().UHD == '') ? '' : '(FHD) /') + ' ' + s.getSbox().UHD + ' ' + ((s.getSbox().UHD == '') ? '' : '(UHD)');
//    			}else{
//    				sbox = 'N/A';
//    			}
				sbox = s.getNewSbox(); //170911 :: 연산 수정
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
				if(_changeH == undefined)  s.changePerson();
				s.resizeDisplay();
			};
			s.changeWallWidth = function(_num){
				var width;
    			
				if(_num != 0){
					if(s.layer.limit.open == true)  s.layer.limit.open = false;
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
								if(s.layer.limit.open == true)  s.layer.limit.open = false;
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
								if(s.layer.limit.open == true)  s.layer.limit.open = false;
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
								s.layer.limit.msg = s.layer.limit.msgF('Minimum width', constant.wall.minSize.meter_width);
								s.layer.limit.open = true;
								s.layer.limit.posF();
								s.layer.limit.w_count += 1;
							}
							if(s.wall.size.width > constant.wall.maxSize.meter_width){
								s.wall.size.width = constant.wall.maxSize.meter_width;
								s.layer.limit.msg = s.layer.limit.msgF('Maximum width', constant.wall.maxSize.meter_width);
								s.layer.limit.open = true;
								s.layer.limit.posF();
								s.layer.limit.w_count += 1;
							}
							if(s.wall.size.width == "")  s.wall.size.width = constant.wall.minSize.meter_width;
							break;
    		            
						case 'feet' :
							if(s.wall.size.width > constant.wall.maxSize.feet_width){
								s.wall.size.width = constant.wall.maxSize.feet_width;
								s.layer.limit.msg = s.layer.limit.msgF('Maximum width', constant.wall.maxSize.feet_width);
								s.layer.limit.open = true;
								s.layer.limit.posF();
								s.layer.limit.w_count += 1;
							}
							if(s.wall.size.width < constant.wall.minSize.feet_width){
								s.wall.size.width = constant.wall.minSize.feet_width;
								s.layer.limit.msg = s.layer.limit.msgF('Minimum width', constant.wall.minSize.feet_width);
								s.layer.limit.open = true;
								s.layer.limit.posF();
								s.layer.limit.w_count += 1;
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
					s.layer.limit.open = false;
					s.layer.limit.w_count = 0;
					s.renderComplete(s.tab.view);
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
					if(s.layer.limit.open == true)  s.layer.limit.open = false;
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
								if(s.layer.limit.open == true)  s.layer.limit.open = false;
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
								if(s.layer.limit.open == true)  s.layer.limit.open = false;
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
								s.layer.limit.msg = s.layer.limit.msgF('Maximum height', constant.wall.maxSize.meter_height);
								s.layer.limit.open = true;
								s.layer.limit.posF();
								s.layer.limit.h_count += 1;
							}
							if(s.wall.size.height < constant.wall.minSize.meter_height){
								s.wall.size.height = constant.wall.minSize.meter_height;
								s.layer.limit.msg = s.layer.limit.msgF('Minimum height', constant.wall.minSize.meter_height);
								s.layer.limit.open = true;
								s.layer.limit.posF();
								s.layer.limit.h_count += 1;
							}
							if(s.wall.size.height == "")  s.wall.size.height = constant.wall.minSize.meter_height;
							break;
    		            
						case 'feet' :
							if(s.wall.size.height > constant.wall.maxSize.feet_height){
								s.wall.size.height = constant.wall.maxSize.feet_height;
								s.layer.limit.msg = s.layer.limit.msgF('Maximum height', constant.wall.maxSize.feet_height);
								s.layer.limit.open = true;
								s.layer.limit.posF();
								s.layer.limit.h_count += 1;
							}
							if(s.wall.size.height < constant.wall.minSize.feet_height){
								s.wall.size.height = constant.wall.minSize.feet_height;
								s.layer.limit.msg = s.layer.limit.msgF('Minimum height', constant.wall.minSize.feet_height);
								s.layer.limit.open = true;
								s.layer.limit.posF();
								s.layer.limit.h_count += 1;
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
					s.layer.limit.open = false;
					s.layer.limit.h_count = 0;
					s.renderComplete(s.tab.view);
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
			s.changePerson = function(){
				var roomH = (s.unit == 'feet') ? converseToMeter.getNum(s.wall.size.height) : s.wall.size.height, personH = (s.wall.size.pixel_height * constant.person.meter_height) / roomH;
				s.person.size.width = constant.person.ratio * personH;
				s.person.position.right = -s.person.size.width - 46;
			};
			s.restrictSize = function(_size, _item){
				s.wall.size[_item] = decimalPoint.getNum(_size, 2);
			};
			s.renderComplete = function(_viewTab){
				var btn;
    			
				switch(_viewTab){
					case 1: // 1 :: blueprint
						btn = '#blueprint_btn';
    					break;
    	          
					case 2: // 2 :: render
						btn = '#render_btn';
						break;
    	          
					default:
						break;
				}
    			
				angular.element(btn).triggerHandler('click');
			};
			s.openHelp = function(){
				s.help.step = 1;
				s.help.open = true;
				$body.addClass(s.help.className[s.help.step - 1]);
			};
			s.closeHelp = function(_index){
				s.help.open = false;
				$body.removeClass(s.help.className[s.help.step - 1]);
			};
			s.uploadContentLayer = function(_boolean){
				s.layer.upload.open = _boolean;
				if(s.layer.upload.open){
					$body.addClass('no-scroll');
					if(angular.element('#upload-layer').hasClass == 'fakeW')  angular.element('#upload-layer').addClass('fakeW');
				}else{
					$body.removeClass('no-scroll');
				}
    	        
				if(s.upload.contents.video.title){
					angular.element('.layer .define-upload .g-select-title strong').text(s.upload.contents.video.title);
					angular.element('.define-upload .opt-select .g-select-title strong').text(s.upload.contents.video.title);
				}else{
					angular.element('.layer .define-upload .g-select-title strong').text(s.upload.contents.video);
					angular.element('.define-upload .opt-select .g-select-title strong').text(s.upload.contents.video);
				}
			};
			s.videoPosition = function(){
				s.upload.video.position.top = ((s.wall.size.pixel_height - (s.display.pixel_size.height * s.videowall.row)) / 2);
				s.upload.video.position.left = ((constant.wall.pixel_width - s.display.pixel_size.width * s.videowall.col) / 2);
			};
			s.videoSize = function(){
				var selectedOption = {
						title : angular.element('.define-upload .opt-select .g-select-title strong').text()
				},
				scaleSize      = {},
				ratio          = {},
				size           = {};
    	            
				$.each(s.upload.video.list, function(_idx){
					if(selectedOption.title == s.upload.video.list[_idx].title){
						selectedOption.size = s.upload.video.list[_idx].size;
					}
				});
    	        
				if(selectedOption.size){
					ratio = {
							width : selectedOption.size.height / selectedOption.size.width,
							height : selectedOption.size.width / selectedOption.size.height
					};
    	          
					function fitVideoSize(){
						size = {
								width : ((s.display.pixel_size.width * s.videowall.col).toFixed(2) / selectedOption.size.width),
								height : ((s.display.pixel_size.height * s.videowall.row).toFixed(2) / selectedOption.size.height)
						};

						if(size.height > 1){
							size.height = 1;
							scaleSize.width = (ratio.height * (s.display.pixel_size.height * s.videowall.row)).toFixed(2);
							size.width = (s.display.pixel_size.width * s.videowall.col).toFixed(2) / scaleSize.width;
						}

						if(size.width > 1){
							size.width = 1;
							scaleSize.height = (ratio.width * (s.display.pixel_size.width * s.videowall.col)).toFixed(2);
							size.height = (s.display.pixel_size.height * s.videowall.row).toFixed(2) / scaleSize.height;
						}
					}

					setTimeout(function(){
						fitVideoSize();
						angular.element('#vid').css({'transform' : 'scale(' + size.width + ',' + size.height + ')'});
						angular.element('#vid_blueprint').css({'transform' : 'scale(' + size.width + ',' + size.height + ')'});
					}, 100);

					fitVideoSize();
    	          
					return {
						'transform' : 'scale(' + ((s.display.pixel_size.width * s.videowall.col) / size.width) + ', ' + ((s.display.pixel_size.height * s.videowall.row) / size.height) + ')'
					};
				}
			};
			s.changeVideoSize = function(_size){
				var ratio          = {},
					scaleSize      = {},
					tmpSize        = _size,
					size = {};
    	  
				ratio = {
						width : tmpSize.height / tmpSize.width,
						height : tmpSize.width / tmpSize.height
				};
    	  
				function fitVideoSize(){
					size = {
							width : ((s.display.pixel_size.width * s.videowall.col).toFixed(2) / tmpSize.width),
							height : ((s.display.pixel_size.height * s.videowall.row).toFixed(2) / tmpSize.height)
					};
    	    
					if(size.height > 1){
						size.height = 1;
						scaleSize.width = (ratio.height * (s.display.pixel_size.height * s.videowall.row)).toFixed(2);
						size.width = (s.display.pixel_size.width * s.videowall.col).toFixed(2) / scaleSize.width;
					}
    	    
					if(size.width > 1){
						size.width = 1;
						scaleSize.height = (ratio.width * (s.display.pixel_size.width * s.videowall.col)).toFixed(2);
						size.height = (s.display.pixel_size.height * s.videowall.row).toFixed(2) / scaleSize.height;
					}
				}
    	  
				setTimeout(function(){
					fitVideoSize();
    	    
					angular.element('#vid').css({'transform' : 'scale(' + size.width + ',' + size.height + ')'});
					angular.element('#vid_blueprint').css({'transform' : 'scale(' + size.width + ',' + size.height + ')'});
				}, 1000);
    	  
				fitVideoSize();
    	        
				return size;
			};
			s.getVideo = function(_self){
				var size = {};
    	        
				if(_self == null){ // when choose 'Select' in selectbox
					s.resetImgContents();
					s.upload.isColor = false;
				}else{
					s.upload.contents.image = null;
					s.upload.current = 'video';
    				
					if(_self['background-color'] != undefined){
						s.resetColorContents();
						s.upload.isColor = true;
					}else{
						s.upload.isColor = false;
						angular.element('#vid').attr({'src' : _self.url});
						angular.element('#vid_blueprint').attr({'src' : _self.url});
						s.changeVideoSize(_self.size);
					}
				}
    	        
				if(s.layer.upload.open == true){
					s.uploadContentLayer(false);
				}
			};
			s.resetContents = function(){
				s.layer.loading.openF(s);
    	    	  
				s.unit = s.tab.unit = config.unit;
    	    	  
				s.wall.size.width = config.wall.width;
				s.wall.size.height = config.wall.height;
    	    	  
				s.videowall.input_col = s.videowall.col = config.videowall.col;
				s.videowall.input_row = s.videowall.row = config.videowall.row;
    	    	  
				s.display.orientation = config.orientation;
				s.videowall.mode = null;
				s.videowall.uhd.isActive = s.videowall.fhd.isActive = false;
				s.videowall.fhd.txtPos = s.videowall.uhd.txtPos = []; // 171123 추가
				angular.element('.define-orientation').find('.g-select-title strong').text(s.display.orientation);
				    	    	  
				s.resetImgContents();    
				Cookies.remove('LEDConfigValue', { path: '/' }); // 180808 이전세팅 cookie 제거
				s.display.seq = s.defaultSeq;  	  
				
				setTimeout(function(){
					s.layer.loading.closeF(s);
				}, 1000);
			};
			s.resetImgContents = function(){
				angular.element('#vid').attr({'src' : ''});
				angular.element('#vid_blueprint').attr({'src' : ''});
				s.upload.current = 'image';
				s.upload.isColor = false;
				s.upload.contents[s.upload.current] = config.image;
				s.upload.contents.video = 'Default Image';
				angular.element('.layer .define-upload .g-select-title strong').text(s.upload.contents.video);
				angular.element('.define-upload .opt-select .g-select-title strong').text(s.upload.contents.video);
			};
			s.resetColorContents = function(){
				angular.element('#vid').attr({'src' : ''});
				angular.element('#vid_blueprint').attr({'src' : ''});
				s.upload.current = 'image';
				s.upload.contents[s.upload.current] = config.image;
			};
			s.setResetBtnStyle = function(){
				var style, display = 'none';
    	    	  
				s.upload = uploadModel.get();
				switch(s.upload.current){
					case 'image':
						if(s.upload.contents.image != config.image || s.upload.isColor == true){
							display = 'block'; 
						}
						break;
	    	    		  
					case 'video':
						display = 'block'; 
						break;
    	    		  
					default : 
						break;
				}
				style = {
						display : display
				};
    	    	  
				return style;
			};
    	      
			/* 171023 추가 :: 171122 :: table -> svg로 변경되어 삭제 */
//    	      s.showText = function(_ridx, _didx){
//    	    	 var isShow = false, ridx = _ridx, didx = _didx;
//    	    	 if(s.videowall.mode != null){
//    	    		 if(s.videowall[s.videowall.mode].row != 0 || s.videowall[s.videowall.mode].col != 0){
//    	    			 if(((s.display[s.videowall.mode + '_each'].width * s.display.pixel_size.width) < 80) && ((s.display[s.videowall.mode + '_each'].height * s.display.pixel_size.height) < 76)){
//    	    				 isShow = false;
//    	    			 }else{
//    	    				 if((parseInt(ridx % s.display[s.videowall.mode + '_each'].height) == 0) && (parseInt(ridx / s.display[s.videowall.mode + '_each'].height) < s.videowall[s.videowall.mode].row)){
//    	    	    			 if((parseInt(didx % s.display[s.videowall.mode + '_each'].width) == 0) && (parseInt(didx / s.display[s.videowall.mode + '_each'].width) < s.videowall[s.videowall.mode].col)){
//    	    	    				 isShow = true;
//    	    	    			 }
//    		    			  }
//    	    			 }
//    	    		 }    	    		 
//    	    	 }
//    	    	 return isShow;
//    	      };
    	      /* 171023 추가 :: // 171122 :: table -> svg로 변경되어 삭제 */
    	      
			s.getDisplayWidthStyle = function(){
				var style = {
						'width' : s.display.pixel_size.width, 
						'height' : s.display.pixel_size.height
				};
				return style;
			};
    	      
    	      /* 171122 :: table -> svg로 변경되어 삭제 */
//    	      s.getDisplayWidthClass = function(_ridx, _didx){ // 171122 table
//    	    	  var classProp = {
//    	    			  'both-area' : false,
//    	    			  'col-area' : false,
//    	    			  'row-area' : false,
//    	    			  'fhduhd-both' : false,
//    	    			  'fhduhd-col' : false,
//    	    			  'fhduhd-row' : false
//    	    	  }, ridx = _ridx + 1, didx = _didx + 1;
//    	    	  
//    	    	  if(s.videowall.mode != null){
//    	    		  if((ridx / s.display[s.videowall.mode + '_each'].height <= s.videowall[s.videowall.mode].row) && (parseInt(ridx % s.display[s.videowall.mode + '_each'].height) == 0)){    	    			  
//    	    			  if((didx / s.display[s.videowall.mode + '_each'].width <= s.videowall[s.videowall.mode].col) && (parseInt(didx % s.display[s.videowall.mode + '_each'].width) == 0)){
//    	    				  classProp['fhduhd-both'] = classProp['both-area'] = true;
//    	    			  }
//	    			  }
//    	    		  
//    	    		  if(ridx / s.display[s.videowall.mode + '_each'].height <= s.videowall[s.videowall.mode].row){
//    	    			  if((didx / s.display[s.videowall.mode + '_each'].width <= s.videowall[s.videowall.mode].col) && (parseInt(didx % s.display[s.videowall.mode + '_each'].width) == 0)){
//    	    				  classProp['fhduhd-col'] = classProp['col-area'] = true;
//    	    			  }
//    	    		  }
//    	    		  
//    	    		  if((ridx / s.display[s.videowall.mode + '_each'].height <= s.videowall[s.videowall.mode].row) && (parseInt(ridx % s.display[s.videowall.mode + '_each'].height) == 0)){
//    	    			  if((didx / s.display[s.videowall.mode + '_each'].width <= s.videowall[s.videowall.mode].col)){
//    	    				  classProp['fhduhd-row'] = classProp['row-area'] = true;
//    	    			  }
//    	    		  }
//    	    	  }
//    	    	  return classProp;
//    	      };
			/* // 171122 :: table -> svg로 변경되어 삭제 */
			/* 171212 수정 */
			s.toggleFHDMode = function(){
				s.getFHDColByWall();
				s.getFHDRowByWall();
				
				if((s.videowall.fhd.display.col >= 1) && (s.videowall.fhd.display.row >= 1)){
					s.setFHD();
				}else{
					if(s.layer.confirm.ok != 'YES')	s.layer.confirm.ok = 'YES';
					if(s.layer.confirm.cancel != 'NO')	s.layer.confirm.cancel = 'NO';
					
					if(s.videowall.max.col < s.display.fhd_each.width || s.videowall.max.row < s.display.fhd_each.height){
						s.layer.confirm.msg = 'Wall size is not big enough to install the pre-set number of screens for FHD. Want to go back to ‘Define Wall Size’ page to reset?';
						s.layer.confirm.okF = function(){
							s.layer.confirm.closeF();
							s.setTab(1);
						}
						s.layer.confirm.posF();
					}else{
						if(s.videowall.fhd.display.col < s.display.fhd_each.width || s.videowall.fhd.display.row < s.display.fhd_each.height){
							s.layer.confirm.msg = 'Want to change the display setting to be set to FHD?';
							s.layer.confirm.okF = function(){
								s.layer.confirm.closeF();
								s.videowall.col = s.videowall.input_col = s.display.fhd_each.width;
								s.videowall.row = s.videowall.input_row = s.display.fhd_each.height;
								s.setFHD();
							}
							s.layer.confirm.posF();
						}
					}
				}
			};
			s.setFHD = function(){ // 171128 fhd 기능 추가
				if(s.videowall.uhd.isActive == true)	s.videowall.uhd.isActive = false;
				s.videowall.fhd.isActive = !s.videowall.fhd.isActive;
				s.videowall.mode = (s.videowall.fhd.isActive == true) ? 'fhd' : null ;
				if(s.videowall.fhd.isActive == true)	s.setFHDUHDText(); // 171123 추가
			};
			s.getFHDCol = function(){
				s.videowall.fhd.display.col = parseInt(s.videowall.col / s.display.fhd_each.width);
				if(s.videowall.mode == 'fhd'){
					if(s.videowall.fhd.display.col == 0){
						s.setFHD();
					}
				}
			};
			s.getFHDRow = function(){
				s.videowall.fhd.display.row = parseInt(s.videowall.row / s.display.fhd_each.height);
				if(s.videowall.mode == 'fhd'){
					if(s.videowall.fhd.display.row == 0){
						s.setFHD();
					}
				}
			};
			/* 171212 :: 추가 */
			s.getFHDColByWall = function(){
				s.videowall.fhd.wall.col = parseInt(s.videowall.max.col / s.display.fhd_each.width);
			};
			s.getFHDRowByWall = function(){
				s.videowall.fhd.wall.row = parseInt(s.videowall.max.row / s.display.fhd_each.height);
			};
			/* //171212 :: 추가 */
			/* 171122 :: table -> svg로 변경되어 추가 */
			s.setFHDColLine = function(){			
				var colLine, width, each, count, totalH;
				
				if(s.videowall.fhd.isActive == true){
					colLine = '';
					width = s.display.pixel_size.width * s.display.fhd_each.width;
					each = s.videowall.fhd.display.col;
					count = 1;
					totalH = s.display.pixel_size.height * s.display.fhd_each.height * s.videowall.fhd.display.row;
					
					for(; count <= each; ++count){
						colLine += 'M' + String(width * count) + ',0 L' + String(width * count) + ',' + totalH + ' ';
					}
				}    
				return colLine;
			};
			s.setFHDRowLine = function(){
				var rowLine, height, each, count, totalW;
				
				if(s.videowall.fhd.isActive == true){
					rowLine = '';
					height = s.display.pixel_size.height * s.display.fhd_each.height;
					each = s.videowall.fhd.display.row;
					count = 1;
					totalW = s.display.pixel_size.width * s.display.fhd_each.width * s.videowall.fhd.display.col;
					
					for(; count <= each; ++count){
						rowLine += 'M0,' + String(height * count) + ' L' + totalW + ',' + String(height * count) + ' ';
					}
				}
			
				return rowLine;
			};
			s.setUHDColLine = function(){			
				var colLine, width, each, count, totalH;
				
				if(s.videowall.uhd.isActive == true){
					colLine = '';
					width = s.display.pixel_size.width * s.display.uhd_each.width;
					each = s.videowall.uhd.display.col;
					count = 1;
					totalH = s.display.pixel_size.height * s.display.uhd_each.height * s.videowall.uhd.display.row;
					
					for(; count <= each; ++count){
						colLine += 'M' + String(width * count) + ',0 L' + String(width * count) + ',' + totalH + ' ';
					}
				}    
				return colLine;
			};
			s.setUHDRowLine = function(){
				var rowLine, height, each, count, totalW;
				
				if(s.videowall.uhd.isActive == true){
					rowLine = '';
					height = s.display.pixel_size.height * s.display.uhd_each.height;
					each = s.videowall.uhd.display.row;
					count = 1;
					totalW = s.display.pixel_size.width * s.display.uhd_each.width * s.videowall.uhd.display.col;
					
					for(; count <= each; ++count){
						rowLine += 'M0,' + String(height * count) + ' L' + totalW + ',' + String(height * count) + ' ';
					}
				}
			
				return rowLine;
			};
			s.setFHDUHDText = function(){
				var col, row, colI, rowI, width, height;
				
				if(s.videowall.mode != null){
					s.videowall[s.videowall.mode].txtPos = [];
					colT = s.videowall[s.videowall.mode].display.col;
					rowT = s.videowall[s.videowall.mode].display.row;
					width = s.display.pixel_size.width;
					height = s.display.pixel_size.height;
					col = s.display[s.videowall.mode + '_each'].width;
					row = s.display[s.videowall.mode + '_each'].height;
					colI = 0;
					
					for(; colI < colT; ++colI){
						for(rowI = 0; rowI < rowT; ++rowI){
							s.videowall[s.videowall.mode].txtPos.push({x : 10 + width * col * colI, y : 25 + height * row * rowI});
						}
					}
				}else{
					s.videowall.fhd.txtPos = [];
					s.videowall.uhd.txtPos = [];
				}
			};
			s.hideText = function(){
				var hide = true, col, row, width, height;
				
				if(s.videowall.mode != null){
					col = s.display[s.videowall.mode + '_each'].width;
					row = s.display[s.videowall.mode + '_each'].height;
					width = s.display.pixel_size.width;
					height = s.display.pixel_size.height;
					
					if(col * width > config.minSize.width || row * height > config.minSize.height){
						hide = false;
					}
				}
				
				return hide;
			};
			/* //171122 :: table -> svg로 변경되어 추가 */
			
			s.toggleUHDMode = function(){
				s.getUHDColByWall();
				s.getUHDRowByWall();
				
				if((s.videowall.uhd.display.col >= 1) && (s.videowall.uhd.display.row >= 1)){
					s.setUHD();
				}else{
					if(s.layer.confirm.ok != 'YES')	s.layer.confirm.ok = 'YES';
					if(s.layer.confirm.cancel != 'NO')	s.layer.confirm.cancel = 'NO';
					
					if(s.videowall.max.col < s.display.uhd_each.width || s.videowall.max.row < s.display.uhd_each.height){
						s.layer.confirm.msg = 'Wall size is not big enough to install the pre-set number of screens for UHD. Want to go back to ‘Define Wall Size’ page to reset?';
						s.layer.confirm.okF = function(){
							s.layer.confirm.closeF();
							s.setTab(1);
						}
						s.layer.confirm.posF();
					}else{
						if(s.videowall.uhd.display.col < s.display.uhd_each.width || s.videowall.uhd.display.row < s.display.uhd_each.height){
							s.layer.confirm.msg = 'Want to change the display setting to be set to UHD?';
							s.layer.confirm.okF = function(){
								s.layer.confirm.closeF();
								s.videowall.col = s.videowall.input_col = s.display.uhd_each.width;
								s.videowall.row = s.videowall.input_row = s.display.uhd_each.height;
								s.setUHD();
							}
							s.layer.confirm.posF();
						}
					}
				}
			};
			s.setUHD = function(){  // 171128 uhd 기능 추가
				if(s.videowall.fhd.isActive == true)	s.videowall.fhd.isActive = false;
				s.videowall.uhd.isActive = !s.videowall.uhd.isActive;
				s.videowall.mode = (s.videowall.uhd.isActive == true) ? 'uhd' : null ;
				if(s.videowall.uhd.isActive == true)	s.setFHDUHDText(); // 171123 추가
			};
			s.getUHDCol = function(){
				s.videowall.uhd.display.col = parseInt(s.videowall.col / s.display.uhd_each.width);
				if(s.videowall.mode == 'uhd'){
					if(s.videowall.uhd.display.col == 0){
						s.setUHD();
					}
				}
			};
			s.getUHDRow = function(){
				s.videowall.uhd.display.row = parseInt(s.videowall.row / s.display.uhd_each.height);
				if(s.videowall.mode == 'uhd'){
					if(s.videowall.uhd.display.row == 0){
						s.setUHD();
					}
				}
			};
			s.setDisplayArea = function(){
				var area = (s.blueprintProp.width * s.blueprintProp.height).toFixed(2)//decimalPoint.getNum(s.blueprintProp.width * s.blueprintProp.height, 4);
				return area;
			};
			/*  //171023 추가 */
			/* 171212 :: 추가 */
			s.getUHDColByWall = function(){
				s.videowall.uhd.wall.col = parseInt(s.videowall.max.col / s.display.uhd_each.width);
			};
			s.getUHDRowByWall = function(){
				s.videowall.uhd.wall.row = parseInt(s.videowall.max.row / s.display.uhd_each.height);
			};
			s.setDisplayArea = function(){
				var area = (s.blueprintProp.width * s.blueprintProp.height).toFixed(2)//decimalPoint.getNum(s.blueprintProp.width * s.blueprintProp.height, 4);
				return area;
			};
			/*  //171023 추가 */
			s.setPDFTitle = function(_boolean){
				var LEDConfigCookieData;
				s.pdf.title = '';
				Cookies.remove('LEDConfigValue', { path: '/' }); // 180808 이전세팅 cookie 제거				
				if(_boolean){
					switch(s.unit){
						case 'meter':
							if(s.wall.size.width < 3){
								if(s.wall.size.width >= 1 && s.wall.size.width < 2){
									(s.wall.size.height > 20) ? renderSizePopup(20) : titlePopup();
								}else if(s.wall.size.width >= 2 && s.wall.size.width < 3){
									(s.wall.size.height > 40) ? renderSizePopup(40) : titlePopup();
								}else{
									titlePopup();
								}
							}else{
								titlePopup();
							}							
							break;
							
						case 'feet':
							if(s.wall.size.width < 9.8){
								if(s.wall.size.width >= 3.28 && s.wall.size.width < 6.6){
									(s.wall.size.height > 65.6) ? renderSizePopup(65.6) : titlePopup();
								}else if(s.wall.size.width >= 6.6 && s.wall.size.width < 9.8){
									(s.wall.size.height > 131.2) ? renderSizePopup(131.2) : titlePopup();
								}else{
									titlePopup();
								}
							}else{
								titlePopup();
							}
							break;
						
						default:
							break;
					}
				}else{
					// signout
					s.layer.signin.open = true;
					s.layer.signin.posF();
					
					//20180808 로그인 창 띄우면서 현재 값 cookie 에 저장 처리
					LEDConfigCookieData = s.wall.size.width + "|" + s.wall.size.height + "|" + s.unit + "|" + s.display.seq + "|" + s.display.name + "|"+ s.videowall.col + "|" + s.videowall.row;					
					if(console)	console.log('LEDConfigCookieData :: ', LEDConfigCookieData);
					Cookies.set('LEDConfigValue', LEDConfigCookieData, { expires: 365, path: '/' });
				}
				
				function titlePopup(){
					s.layer.title.open = true;
					s.layer.title.posF();
				}
				function renderSizePopup(_height){
					s.layer.rendersize.msg = s.layer.rendersize.msgF(_height);
					s.layer.rendersize.open = true;
					s.layer.rendersize.posF();
				}
			};
			s.exportToPDF = function(){
				var title = (s.pdf.title != '') ? s.pdf.title : 'LED CONFIGURATOR',
    	    		  
					/* 171116 정은정 backend 지원 :: 추가 */
					unit = (s.unit == 'feet') ? 'f'.toUpperCase() : 'm'.toUpperCase(),
					width = s.blueprintProp.width, // 벽 크기보다 커질 때 0으로 세팅
					height = s.blueprintProp.height,  // 벽 크기보다 커질 때 0으로 세팅
					modelSeq = s.display.seq,
					modelName = s.display.name,
					columns = s.videowall.col,
					rows = s.videowall.row,
					orient = s.display.orientation; 
					/* 171116 정은정 backend 지원 :: 추가 */
    	    		  
				if(console)	console.log('unit :: ', unit, ' width :: ', width, ' height :: ', height, ' modelSeq :: ', modelSeq, ' modelName :: ', modelName, ' columns:: ', columns, ' row:: ', rows, ' orient:: ', orient);
    	    		  
				s.upload = uploadModel.get();
				s.layer.title.closeF();
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
        		
				/* about need help :: view binding */
				s.help = {
						open : false,
						step : 1,
						totalstep : 3,
						className : ['is-needhelp-step1 is-tab-tools-on', 'is-needhelp-step2', 'is-needhelp-step3 is-tab-tools-on'],
						nextStep : null
				};
				s.help.nextStep = function(){
					$body.removeClass(s.help.className[s.help.step - 1]);
					s.help.step += 1;
					if(s.help.step > s.help.totalstep)  s.closeHelp();
					$body.addClass(s.help.className[s.help.step - 1]);
				};
                
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
					hasProductInfo: false
				};

				/* about layer popup*/
				s.layer = {
						choose : {open : false, name : s.display.name, seq : s.display.seq, type : 'indoor', list : [], detail : {}},
						limit : {
							open : false, msg : null, w_count : 0, h_count : 0, msgF : function(_msg, _size){
								var msg = _msg + ' allowed is ' + _size + ' ' + s.unit;
								return msg;
							},
							posF : function(){
								var layerH, posTop, $popup = $('.limit-layer');
                              
								$popup.css('display', 'block');
								$body.addClass(ssds.common.o_className.noScroll);
								layerH = $popup.find('.layer').height();
                              
								posTop = (ssds.common.o_screenSize.height - layerH) / 2;
								$popup.find('.layer').css({'padding-top' : posTop});
							},
							closeF : function(){
								var $popup = $('.limit-layer');
								
								s.layer.limit.open = false;
								$popup.css('display', 'none');
								$body.removeClass(ssds.common.o_className.noScroll);
								$popup.find('.layer').css({'padding-top' : 0});
							}
						},
						over : {
							open : false, msg : null, msgF : function(_item, _overSize){
								var unit = (s.unit == 'meter') ? 'meters' : 'feet',
									size = {
										wall : {width : s.wall.size.width, height : s.wall.size.height},
										display : {width : s.setBlueprintWidth(s.videowall.col), height : s.setBlueprintHeight(s.videowall.row)}
									}, msg;
    	    					  
								if(size.display.width / size.wall.width >= 1.5){
									s.videowall.col -= 1;
									msg = 'The currently installed display is too large for the wall size, which is an inappropriate setting.';
								}else if(size.display.height / size.wall.height >= 1.5){
									s.videowall.row -= 1;
									msg = 'The currently installed display is too large for the wall size, which is an inappropriate setting.';
								}else{
									msg = 'The ' + _item + ' exceeds ' + _overSize + ' ' + unit + ' above the wall.';
								}
								return msg;
							},
							posF : function(){
								var layerH, posTop, $popup = $('.over-layer');
                              
								$popup.css('display', 'block');
								$body.addClass(ssds.common.o_className.noScroll);
								layerH = $popup.find('.layer .inbox').height();
                              
								posTop = (ssds.common.o_screenSize.height - layerH) / 2;
								$popup.find('.layer').css({'padding-top' : posTop});
							},
							closeF : function(){
								var $popup = $('.over-layer');
								
								s.layer.over.open = false;
								$popup.css('display', 'none');
								$body.removeClass(ssds.common.o_className.noScroll);
								$popup.find('.layer').css({'padding-top' : 0});
							}
						},
						fhduhd : { /* 171025 추가 */
							open : false, msg : null, msgF : function(_msg){
								var msg = 'Configure more displays to use this function.';
								return msg;
							},
							posF : function(){
								var layerH, posTop, $popup = $('.fhduhd-layer');
                              
								$popup.css('display', 'block');
								$body.addClass(ssds.common.o_className.noScroll);
								layerH = $popup.find('.layer .inbox').height();
                              
								posTop = (ssds.common.o_screenSize.height - layerH) / 2;
								$popup.find('.layer').css({'padding-top' : posTop});
							},
							closeF : function(){
								var $popup = $('.fhduhd-layer');
								
								s.layer.fhduhd.open = false;
								$popup.css('display', 'none');
								$body.removeClass(ssds.common.o_className.noScroll);
								$popup.find('.layer').css({'padding-top' : 0});
							}
						},
						same : {
							open : false, msg : null, msgF : function(_msg){
								var msg = _msg;
								return msg;
							},
							posF : function(){
								var layerH, posTop, $popup = $('.same-layer');
                              
								$popup.css('display', 'block');
								$body.addClass(ssds.common.o_className.noScroll);
								layerH = $popup.find('.layer .inbox').height();
                              
								posTop = (ssds.common.o_screenSize.height - layerH) / 2;
								$popup.find('.layer').css({'padding-top' : posTop});
							},
							closeF : function(){
								var $popup = $('.same-layer');
								
								s.layer.same.open = false;
								$popup.css('display', 'none');
								$body.removeClass(ssds.common.o_className.noScroll);
								$popup.find('.layer').css({'padding-top' : 0});
							}
						},
						title : {
							open : false, msg : null, msgF : function(_msg){
								var msg = _msg;
								return msg;
							},
							posF : function(){
								var layerH, posTop, $popup = $('.title-layer');
                              
								$popup.css('display', 'block');
								$body.addClass(ssds.common.o_className.noScroll);
								layerH = $popup.find('.layer .inbox').height();
                              
								posTop = (ssds.common.o_screenSize.height - layerH) / 2;
								$popup.find('.layer').css({'padding-top' : posTop});
							},
							closeF : function(){
								var $popup = $('.title-layer');
								
								s.layer.title.open = false;
								$popup.css('display', 'none');
								$body.removeClass(ssds.common.o_className.noScroll);
								$popup.find('.layer').css({'padding-top' : 0});
							}
						},
						upload : {open : false},
						loading : {
							open : false,
							openF : function(_scope){
								_scope.layer.loading.open = true;
								setLoadingBar(true);
    	    					//_scope.renderComplete(_scope.tab.view);
							},
							closeF : function(_scope){
								_scope.layer.loading.open = false;
								setLoadingBar(false);
    	    					//_scope.renderComplete(_scope.tab.view);
							}
						},
						uploadAlert : {
							open : false, msg : null, timer : null, msgF : function(_msg){
								var msg = _msg;
								return msg;
							},
							openF : function(_scope, _msg){
								_scope.layer.loading.open = false;
								_scope.layer.uploadAlert.open = true;
								_scope.layer.uploadAlert.msg = _scope.layer.uploadAlert.msgF(_msg);
								_scope.renderComplete(_scope.tab.view);
    	    					//_scope.layer.uploadAlert.timer = setTimeout(function(){_scope.layer.uploadAlert.open = false;_scope.renderComplete();}, 3000) // auto close popup
							},
							posF : function(){
								var layerH, posTop, $popup = $('.uploadAlert-layer');
                              
								$popup.css('display', 'block');
								$body.addClass(ssds.common.o_className.noScroll);
								layerH = $popup.find('.layer').height();
                              
								posTop = (ssds.common.o_screenSize.height - layerH) / 2;
								$popup.find('.layer').css({'padding-top' : posTop});
							},
							closeF : function(){
								var $popup = $('.uploadAlert-layer');
								
								s.layer.uploadAlert.open = false;
								$popup.css('display', 'none');
								$body.removeClass(ssds.common.o_className.noScroll);
								$popup.find('.layer').css({'padding-top' : 0});
							}
						},					
						signin : {
							open : false, 
							msg : null, 
							msgF : function(_msg){
								var msg = _msg;
								return msg;
							},
							posF : function(){
								var layerH, posTop, $popup = $('.signin-layer');
								
								$popup.css('display', 'block');
								$body.addClass(ssds.common.o_className.noScroll);
								layerH = $popup.find('.layer .inbox').height();
								
								posTop = (ssds.common.o_screenSize.height - layerH) / 2;
								$popup.find('.layer').css({'padding-top' : posTop});
							},
							closeF : function(){
								var $popup = $('.signin-layer');
								
								s.layer.signin.open = false;
								$popup.css('display', 'none');
								$body.removeClass(ssds.common.o_className.noScroll);
								$popup.find('.layer').css({'padding-top' : 0});
							}
						},					
						renewal : {
							open : false, 
							msg : null, 
							msgF : function(_msg){
								var msg = _msg;
								return msg;
							},
							posF : function(){
								var layerH, posTop, $popup = $('.renewal-layer');
								
								$popup.css('display', 'block');
								$body.addClass(ssds.common.o_className.noScroll);
								layerH = $popup.find('.layer .inbox').height();
								
								posTop = (ssds.common.o_screenSize.height - layerH) / 2;
								$popup.find('.layer').css({'padding-top' : posTop});
							},
							closeF : function(){
								var $popup = $('.renewal-layer');
								
								s.layer.renewal.open = false;
								$popup.css('display', 'none');
								$body.removeClass(ssds.common.o_className.noScroll);
								$popup.find('.layer').css({'padding-top' : 0});
							}
						},
						rendersize : {
							open : false, msg : null, msgF : function(_height){
								var msg = 'When the width you set is ' + s.wall.size.width + ' ' + s.unit + ', the maximum height should be under ' + _height + s.unit + 's.';
								return msg;
							},
							posF : function(){
								var layerH, posTop, $popup = $('.render-size-layer');
                              
								$popup.css('display', 'block');
								$body.addClass(ssds.common.o_className.noScroll);
								layerH = $popup.find('.layer').height();
                              
								posTop = (ssds.common.o_screenSize.height - layerH) / 2;
								$popup.find('.layer').css({'padding-top' : posTop});
							},
							closeF : function(){
								var $popup = $('.render-size-layer');
								
								s.layer.limit.open = false;
								$popup.css('display', 'none');
								$body.removeClass(ssds.common.o_className.noScroll);
								$popup.find('.layer').css({'padding-top' : 0});
							}
						},
						
						/* 171212 public confirm layer */
						confirm : {
							open : false,
							msg : null,
							ok : 'OK',
							cancel : 'CANCEL',
							okF : function(){},
							cancelF : function(){
								s.layer.confirm.closeF();
							},
							posF : function(){
								var layerH, posTop, $popup = $('.confirm-public-layer');
								
								$popup.css('display', 'block');
								$body.addClass(ssds.common.o_className.noScroll);
								layerH = $popup.find('.layer .inbox').height();
								
								posTop = (ssds.common.o_screenSize.height - layerH) / 2;
								$popup.find('.layer').css({'padding-top' : posTop});
							},
							closeF : function(){
								var $popup = $('.confirm-public-layer');
								
								s.layer.confirm.open = false;
								$popup.css('display', 'none');
								$body.removeClass(ssds.common.o_className.noScroll);
								$popup.find('.layer').css({'padding-top' : 0});
							}
						}
				};	
				s.hasDiagramModel = config.hasDiagramModel.name;
        		
				setTimeout(function(){
					var renewal_layer_cookie = "";
					renewal_layer_cookie = Cookies.get('renewal_layer');
					if ((typeof renewal_layer_cookie !="undefined")) { // data 가 null 아니거나 0 이상일때 (정상일때)						
						if (renewal_layer_cookie!="close") {
							// 팝업 띄우기
							s.layer.renewal.open = true;
							s.layer.renewal.posF();							
						}						
					}else{
						// 팝업 띄우기
						s.layer.renewal.open = true;
						s.layer.renewal.posF();						
					}
					
					if(s.layer.renewal.open === false){
						setLoadingBar(true);
					}
				}, 500);
    	    	//s.changeWall();
				
				// exportPDF 로그인 후 이전설정으로 세팅
				s.LEDConfigCookieData = [];
				function getLEDConfigCookie(){
					var config_value_cookie = Cookies.get('LEDConfigValue')
					if((typeof config_value_cookie !="undefined")) { // data 가 null 아니거나 0 이상일때 (정상일때)
						s.LEDConfigCookieData = config_value_cookie.split('|');
						// if(console)	console.log(s.LEDConfigCookieData);
						s.wall.size.width = Number(s.LEDConfigCookieData[0]);
						s.wall.size.height = Number(s.LEDConfigCookieData[1]);
						s.tab.unit = s.unit = s.LEDConfigCookieData[2];
						s.display.seq = Number(s.LEDConfigCookieData[3]);
						s.display.name = s.LEDConfigCookieData[4];
						s.videowall.col = s.videowall.input_col = Number(s.LEDConfigCookieData[5]);
						s.videowall.row = s.videowall.input_row = Number(s.LEDConfigCookieData[6]);
					}
				}
				getLEDConfigCookie();
			}
			
			// init function :: 20180808 cookie model add
			s.setModelSeq = function(_seq){
				if(s.LEDConfigCookieData.length == 0){
					s.display.seq = s.defaultSeq = _seq;
				}else{
					s.display.seq = Number(s.LEDConfigCookieData[3]);
					s.defaultSeq = _seq;
				}
			};
			s.getModelSeq = function(){
				return s.display.seq;
			};
			s.initDisplay = function(){
				variable.set('display.spec', variable.get().display.spec); // s.display.spec
				setTimeout(function(){
					if($('#loading-layer').hasClass('is-active'))	setLoadingBar(false);
				}, 600);
				s.display = setDisplayProp.get(); // display
				s.layer.choose.name = s.display.name ;
				s.layer.choose.seq = s.display.seq;
				s.resizeDisplay();
				angular.element('#blueprint .model_tag .model-name').text(s.display.name);
    	    	  
    	    	/* 171026 추가 */
				s.videowall.mode = null;
				s.videowall.uhd.isActive = s.videowall.fhd.isActive = false;
				s.getFHDCol();
				s.getFHDRow();
				s.getUHDCol();
				s.getUHDRow();
    	    	/* //171026 추가 */
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
		configurator.config(function($provide){
			$provide.decorator('uploadModel', function($delegate){
				$delegate.setUploadModel = function(_oldData, _newData){
					var oldData = _oldData, //upload
						newData = _newData, // data
						data    = _oldData, //return data
						size    = {},
						url;               
                
					if(newData.fileExt == 'jpg' || newData.fileExt == 'png'){
						angular.element('#vid').attr({'src' : ''});
						angular.element('#vid_blueprint').attr({'src' : ''});
						data.current = 'image';
						data.contents[data.current] = encodeURI(newData.fileUrl);
						data.contents.video = 'Default Image';
					}else if(newData.fileExt == 'mp4'){
						data.current = 'video';
						data.contents[data.current] = newData.fileUrl;
						data.contents.image = null;
                  
						angular.element('#vid').attr({'src' : data.contents.video});
						angular.element('#vid_blueprint').attr({'src' : data.contents.video});
						angular.element('#vid').on('loadedmetadata', function(e){
							size.width = e.target.videoWidth;
							size.height = e.target.videoHeight;
						});
        
						if(size.width == undefined){
							angular.element('#vid_blueprint').on('loadedmetadata', function(e){
								size.width = e.target.videoWidth;
								size.height = e.target.videoHeight;
                      
							});
						}
						data.video.list.push({
							'id' : data.video.list.length,
							'title' : newData.fileNameOnly,
							'url' : encodeURI(newData.fileUrl),
							'size' : size
						});
						data.contents.video = {
							'id' : data.video.list.length,
							'title' : newData.fileNameOnly,
							'url' : encodeURI(newData.fileUrl)
						};
					}else{
						if(console) console.log('not supported');
					}
					return data;
				};
              
				return $delegate;
			});
		});
		configurator.directive('fileModel', function(uploadModel, $parse){
			return {
				restrict : 'A',
				link : function(scope, element, attrs){
					element.bind('change', function(){
						var frm   = angular.element('#configuratorsFrm'),
							options,
							model = {};
                  
						model.originInfo = $parse(attrs.fileModel);
						model.setter = model.originInfo.assign;
						model.info = model.setter(scope, element[0].files[0]); // console.log(model.info);
                  
						if(model.info){
							model.type = '';
							model.media = '';
							model.size = 0;
                    
							checkFormat();
						}
                  
						function checkFormat(){
							var type = model.info.type;
                    
							type = type.split('/');
							model.media = type[0];
							model.type = type[1];
        					
							if(model.media != 'image'){
								scope.layer.uploadAlert.openF(scope, "Invalid file format! Please upload only .jpg or .png files.");
								scope.layer.uploadAlert.posF();
							}else{
								if(model.type == 'jpeg' || model.type == 'png' || model.type == 'jpg'){
									checkSize(model.media);
								}else{
									scope.layer.uploadAlert.openF(scope, 'Invalid file format! Please upload only .jpg or .png files.');
									scope.layer.uploadAlert.posF();
								}
							}
						}

						function checkSize(_media){
							var size = model.info.size,
								fileUploadTimer;
                    
							switch(_media){
								case 'video' :
									if(size <= 15000000){
										scope.layer.loading.openF(scope, true);
										fileUploadTimer = setTimeout(uploadFile, 1000);
									}else{
										scope.layer.uploadAlert.openF(scope, "There was an error processing the video file. Please check it's not larger than 15 MB, if the problem persists try with another video.");
										scope.layer.uploadAlert.posF();
									}
									break;
                      
								case 'image' :
									if(size <= 3000000){
										scope.layer.loading.openF(scope, true);
										fileUploadTimer = setTimeout(uploadFile, 1000);
									}else{
										scope.layer.uploadAlert.openF(scope, "There was an error processing the image file. Please check it's not larger than 3 MB, if the problem persists try with another image.");
										scope.layer.uploadAlert.posF();
									}
									break;
                      
								default :
									break;
							}
						}
                  
						function uploadFile(){
							options = {
									cache : false,
									url : "/fileUpload/configurators/" + attrs.id,
									type : "POST",
									dataType : "json",
									async : false,
									error : function(xhr, status, e){
										scope.layer.uploadAlert.openF(scope, status + ' error! try again.');
										scope.layer.uploadAlert.posF();
									},
									success : function(data){
										scope.uploadContentLayer(false);
                        
										if(data.resultCd == "SUCCESS"){
											uploadModel.set(uploadModel.setUploadModel(uploadModel.get(), data));
											scope.upload = uploadModel.get();
//        									if(console)  console.log('::', scope.upload);
											if(scope.upload.current == "video"){
												angular.element('.box-option .define-upload .opt-select .g-select-title strong').text(data.fileNameOnly);
												angular.element('.box-option .define-upload .opt-select option:last').attr('selected', 'selected');
											}
											setTimeout(function(){
												var size = {
														width : ((scope.display.size.width * scope.videowall.col) / scope.upload.video.list[scope.upload.video.list.length - 1].size.width),
														height : ((scope.display.size.height * scope.videowall.row) / scope.upload.video.list[scope.upload.video.list.length - 1].size.height)
												};
												angular.element('.define-upload .opt-select option:last').attr('selected', 'selected');
												angular.element('#vid').css({'transform' : 'scale(' + size.width + ',' + size.height + ')'});
												angular.element('#vid_blueprint').css({'transform' : 'scale(' + size.width + ',' + size.height + ')'});
												scope.renderComplete(scope.tab.view);
											}, 1000);
											scope.layer.loading.open = false;
											setLoadingBar(false)
										}else if(data.resultCd == "FILE_TYPE"){
        									//scope.layer.uploadAlert.openF(scope, 'Invalid file format! Please upload only .jpg or .png or mp4 files.');
										}else if(data.resultCd == "IMAGE_BYTE"){
        									//scope.layer.uploadAlert.openF(scope, "There was an error processing the image file. Please check it's not larger than 3 MB, if the problem persists try with another image.");
										}else if(data.resultCd == "VIDEO_BYTE"){
        									//scope.layer.uploadAlert.openF(scope, "There was an error processing the video file. Please check it's not larger than 15 MB, if the problem persists try with another video.");
										}else if(data.resultCd == "FAIL"){
											scope.layer.uploadAlert.openF(scope, 'Failed to upload file.'); // data.resultMessage
											scope.layer.uploadAlert.posF();
										}else if(data.resultCd == "SELECT_EMPTY"){
											scope.layer.uploadAlert.openF(scope, 'Select file');
											scope.layer.uploadAlert.posF();
										}else{
											console.log(':: :: ', data.resultCd);
										}
									}
							};
							frm.ajaxSubmit(options);
						}
					});
				}
			};
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
		
		/* choose layer popup :: detail data */
		configurator.factory('chooseDisplay', function($http, variable, constant){
			return {
				set : function(_seq, _func){
					var displayData = {},
						url = constant.data.base + constant.data.detail,
						req;
        			
					req = $http({
						method : 'GET',
						url : url + _seq
					});
					req.success(function(data, status, headers, config){
						variable.set('choose.detail', data.detail);
						if(_func)	_func();
					});
					req.then(function(response){}, function(response){
						if(console)	console.log('select display error!')
					});
				}
			}
		});
        
		/* choose layer popup :: list data */
		configurator.factory('loadDisplayList', function($http, variable, constant){
			return {
				set : function(_type ,_func){
					var displayData = {},
						url = constant.data.base,
						req;
        			
					url += constant.data.list[_type];
        			
					req = $http({
						method : 'GET',
						url : url
					});
					req.success(function(data, status, headers, config){
						variable.set('choose.list', data.list);
						if(_func)	_func();
					});
					req.then(function(response){}, function(response){
						if(console)	console.log('load DisplayList error!')
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