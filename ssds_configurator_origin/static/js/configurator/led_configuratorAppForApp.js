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
				name : 'P1.5(Pixel pitch 1.5)',
				seq : 805
			},
			isFirst : {
				width : true,
				height : true
			},
			exceptModel : ['IPE030', 'IPE040', 'IPE060', 'IPE100'] // sbox except
	},
	configurator;
	
    function init(){
    	configurator = angular.module('led-configurator', []);
        configurator.controller('ledConfiguratorController', function($scope, $document, $http, variable, constant, setDisplayProp, releaseDisplay, chooseDisplay, loadDisplayList, converseToFeet, converseToMeter, converseToInch, getBlueprintSize, getTagSize, uploadModel, decimalPoint){
        	var s      = $scope,
        		$body  = angular.element('body'),
        		$popup = angular.element('.ly-configurator');
        	
        	angular.element('#footer').append('<div id="insert_title" style="background:#0088d0;color:#fff;font-size:54px;font-weight:bold;width:1200px;margin:0 auto;padding:50px 0 0 90px;display:none;"></div>');
        	angular.element('#insert_title').css('font-family',"'SamsungOneRg' !important");
        	        	
        	s.setTab = function(_tab){s.tab.opts = _tab;};
        	s.getTab = function(_tab){return s.tab.opts === _tab;};
        	s.setViewTab = function(_tab){s.tab.view = _tab;s.setTop();};
        	s.getViewTab = function(_tab){return s.tab.view === _tab;};
        	s.setChooseTab = function(_tab){
        		if(s.tab.choose != _tab){
        			s.tab.choose = _tab;
            		s.layer.choose.type = (_tab == 2) ? 'outdoor' : 'indoor' ;
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
        		s.changeOrientation();
        	};
        	s.getChooseDisplayLayer = function(_boolean){
        		if(_boolean)	loadDisplayList.set(s.layer.choose.type, s.setChooseList);
        		s.layer.choose.open = _boolean;
        		if(s.layer.choose.open){
                    $body.addClass('no-scroll');
                    s.choose = variable.get().choose;
        		}
        		else{
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
    			s.setDisplay(_modelName, _modelSeq);
    		};
    		s.setDisplay = function(_modelName, _modelSeq){ // choose new display
    	        s.layer.choose.name = s.display.name = _modelName;
    	        s.layer.choose.seq = s.display.seq = _modelSeq;
    	        releaseDisplay.set(_modelSeq, s.initDisplay);
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
    				angular.element('#loading-layer').addClass('is-active');
    				ssds.common.newLoading(angular.element('#loading-layer .layer .loading'));
    				$body.addClass('no-scroll');
    				
        			setTimeout(function(){
        				s.getMaxVideowall();
            			s.videowall.input_col = s.videowall.col = s.videowall.max.col;
            			s.videowall.input_row = s.videowall.row = s.videowall.max.row;
            			s.exceed.num = 1;
            			s.renderComplete(s.tab.view);
        			}, 1000);
    			}
    		};
    		s.changeOptsPosition = function(){ 
    			s.videoPosition();
    		};
    		s.getTotalDisplaysStyle = function(){
    			var size = {
    					width : s.display.pixel_size.width * s.videowall.col,
    					height : s.display.pixel_size.height * s.videowall.row
    				},
    				color = (s.upload.isColor) ? config.color : 'none',
    				style;
    			style = {
    					'top' : (((s.wall.size.pixel_height) - (s.display.pixel_size.height * s.videowall.row)) / 2),
    					'left' : ((constant.wall.pixel_width - s.display.pixel_size.width * s.videowall.col) / 2 + 3),
    					'width' : decimalPoint.getNum(size.width),
    					'height' : size.height,
    					'background-color' : color
    			};
    			return style;
    		};
    		s.getTotalDisplayWidthStyle = function(){
    			var size = {
    					width : s.display.pixel_size.width * s.videowall.col,
    					height : s.display.pixel_size.height
    				}, style;
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
    			}, style; // 예외처리 해야함
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
    			var style = {
    					'height' : s.display.pixel_size.height * s.videowall.row
    			};
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
    			var style = {},
    				borderL,
    				borderR,
    				borderT,
    				borderB,
	    			wall = {
    					width : s.wall.size.width,
    					height : s.wall.size.height	
	    			}, 
	    			display = {},
    				top = 0,
    				left = 0,
    				width = 692,
    				height = 411,
    				overline = '2px #f89bb0 dotted',
    				noneline = 'none';
    			
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
    			var col = (_col != undefined) ? _col : s.videowall.col,
    				width;
    			
    			switch(s.display.orientation){
	    			case 'landscape' :
	    				width = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.width), col) : getBlueprintSize.getSize(s.display.meter_size.width, col) ;
	    				break;
	    				
	    			case 'portrait' :
	    				width = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.height), col) : getBlueprintSize.getSize(s.display.meter_size.height, col) ;
	    				break;
	    				
	    			default :
	    				break;
    			}
    			
    			return decimalPoint.getNum(width, 3);
    		};
    		s.setBlueprintHeight = function(_row){
    			var row = (_row) ? _row : s.videowall.row,
    				height;
    			
    			switch(s.display.orientation){
	    			case 'landscape' :
	    				height = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.height), row) : getBlueprintSize.getSize(s.display.meter_size.height, row) ;
	    				break;
	    				
	    			case 'portrait' :
	    				height = (s.unit == 'feet') ? getBlueprintSize.getSize(converseToFeet.getNum(s.display.meter_size.width), row) : getBlueprintSize.getSize(s.display.meter_size.width, row) ;
	    				break;
	    				
	    			default :
	    				break;
    			}	
    			return decimalPoint.getNum(height, 3);
    		};
    		s.setDiagonal = function(){
    			var w = s.setBlueprintWidth(),
    				h = s.setBlueprintHeight(),
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
    		};
    		s.calculateVideowall = function(_item, _num){
    			var same = s.videowall.same[_item],
    				num;
    			
    			switch(_item){
	    			case 'row' : 
	    				num = (_num) ? s.setBlueprintHeight(s.videowall.max.row) : s.setBlueprintHeight();
	    				if(s.unit == 'meter'){
							 same.display = s.display.meter_size.height;
							 same.space = s.getBlueprintSpace(s.wall.size.height, num);
						}else{
							same.display = converseToMeter.getNum(s.display.meter_size.height);
							same.space = converseToMeter.getNum(s.getBlueprintSpace(s.wall.size.height, num));
						}
	    				break;
	    				
	    			case 'col' :
	    				num = (_num) ? s.setBlueprintWidth(s.videowall.max.col) : s.setBlueprintWidth();
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
//						'right' : -(45 - ((tagSize.width - 45)))
	    			};
    			
    			return style;
    		};
//    		170911 :: 새함수 :: s.getNewSbox
    		s.getSbox = function(_videowall){
    		};
    		s.getNewSbox = function(){
    			var resolutionW = s.display.module.width * s.videowall.col,
    				resolutionH = s.display.module.height * s.videowall.row,
    				sbox = Math.ceil(resolutionW/3840) * Math.ceil(resolutionH/2160);    			
    			return sbox;
    		};
    		s.setWeight = function(){
    			var weight = parseFloat(s.display.spec.WEIGHT) * s.videowall.col * s.videowall.row;
    			return weight.toFixed(1);
    		};
    		s.setMax = function(){
    			var total = s.videowall.col * s.videowall.row,
    				max1value = s.display.spec.POWER_CONSUMPTION_MAX1 * total,
    				max2value = (String(s.display.spec.POWER_CONSUMPTION_MAX2 * total).split('.').length == 1) ? s.display.spec.POWER_CONSUMPTION_MAX2 * total : (s.display.spec.POWER_CONSUMPTION_MAX2 * total).toFixed(2) ,
    				max1unit = (s.display.spec.POWER_CONSUMPTION_MAX1_UNIT != undefined) ? (s.display.spec.POWER_CONSUMPTION_MAX1_UNIT).replace('&#13217;','㎡') : '',
    				max2unit = s.display.spec.POWER_CONSUMPTION_MAX2_UNIT,
    				max = max1value + max1unit + ' / ' + max2value + max2unit;
				if(s.display.spec.POWER_CONSUMPTION_MAX == 'TBD') max = 'TBD';    				
    			return max;	
    		};
    		s.setTypical = function(){
    			var total = s.videowall.col * s.videowall.row,
					typical1value = s.display.spec.POWER_CONSUMPTION_TYPICAL1 * total,
					typical2value = (String(s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total).split('.').length == 1) ? s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total : (s.display.spec.POWER_CONSUMPTION_TYPICAL2 * total).toFixed(2) ,
					typical1unit = (s.display.spec.POWER_CONSUMPTION_TYPICAL1_UNIT != undefined) ? (s.display.spec.POWER_CONSUMPTION_TYPICAL1_UNIT).replace('&#13217;','㎡') : '',
					typical2unit = s.display.spec.POWER_CONSUMPTION_TYPICAL2_UNIT,
					typical = typical1value + typical1unit + ' / ' + typical2value + typical2unit;
				if(s.display.spec.POWER_CONSUMPTION_TYPICAL == 'TBD') typical = 'TBD';
			return typical;	
    		};
    		s.specSbox = function(){
    			var sbox;    			
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
    	    	  s.layer.loading.openF(s, true);
    	    	  
    	    	  s.unit = s.tab.unit = config.unit;
    	    	  s.setUnit(s.unit);
    	    	  
    	    	  s.wall.size.width = config.wall.width;
    	    	  s.wall.size.height = config.wall.height;
    	    	  
    	    	  s.videowall.input_col = s.videowall.col = config.videowall.col;
    	    	  s.videowall.input_row = s.videowall.row = config.videowall.row;
    	    	  
    	    	  s.display.orientation = config.orientation;
    	    	  angular.element('.define-orientation').find('.g-select-title strong').text(s.display.orientation);
    	    	  s.changeOrientation();
    	    	  
    	    	  s.resetImgContents();
    	    	  
    	    	  s.setVar();
    	    	  
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
    	      s.setPDFTitle = function(){
    	    	  angular.element('#pdfTitle').val('');
    	    	  s.layer.title.open = true;
    	    	  s.layer.title.posF(); 
    	      };
    	      s.exportToPDF = function(){
    	    	  var title = (angular.element('#pdfTitle').val()) ? angular.element('#pdfTitle').val() : 'LED CONFIGURATOR';
    	    	  s.upload = uploadModel.get();
    	    	  s.layer.title.closeF();
    	    	  angular.element('#insert_title').text(title);
    	    	  exportToPDF();
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
                		repeatNum : 0
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
                /* about layer popup*/
                s.layer = {
                		choose : {open : false, name : s.display.name, seq : s.display.seq, type : 'indoor', list : [], detail : {}},
                		limit : {
                			open : false, msg : null, w_count : 0, h_count : 0, msgF : function(_msg, _size){
                				var msg = _msg + ' allowed is ' + _size + ' ' + s.unit;
                				return msg;
                			},
                			posF : function(){
                				var layerH, posTop;
                              
                				$popup.css({opacity : 0});
                				$body.addClass(ssds.common.o_className.noScroll);
                				layerH = $popup.find('.layer').height();
                              
                				posTop = (ssds.common.o_screenSize.height - layerH) / 2;
                				$popup.css({opacity : 1});
                				$popup.find('.layer').css({'padding-top' : posTop});
                			},
                			closeF : function(){
                				s.layer.limit.open = false;
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
                					},
                					msg;

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
                				var layerH, posTop;
                              
                				$popup.css({opacity : 0});
                				$body.addClass(ssds.common.o_className.noScroll);
                				layerH = $popup.find('.layer .inbox').height();
                              
                				posTop = (ssds.common.o_screenSize.height - layerH) / 2;
                				$popup.css({opacity : 1});
                				$popup.find('.layer').css({'padding-top' : posTop});
                			},
                			closeF : function(){
                				s.layer.over.open = false;
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
                				var layerH, posTop;
                              
                				$popup.css({opacity : 0});
                				$body.addClass(ssds.common.o_className.noScroll);
                				layerH = $popup.find('.layer .inbox').height();
                              
                				posTop = (ssds.common.o_screenSize.height - layerH) / 2;
                				$popup.css({opacity : 1});
                				$popup.find('.layer').css({'padding-top' : posTop});
                			},
                			closeF : function(){
                				s.layer.same.open = false;
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
                				var layerH, posTop;
                              
                				$popup.css({opacity : 0});
                				$body.addClass(ssds.common.o_className.noScroll);
                				layerH = $popup.find('.layer .inbox').height();
                              
                				posTop = (ssds.common.o_screenSize.height - layerH) / 2;
                				$popup.css({opacity : 1});
                				$popup.find('.layer').css({'padding-top' : posTop});
                			},
                			closeF : function(){
                				s.layer.title.open = false;
                				$body.removeClass(ssds.common.o_className.noScroll);
                				$popup.find('.layer').css({'padding-top' : 0});
                			}
                		},
                		upload : {open : false},
                		loading : {
                			open : false,
                			openF : function(_scope, _boolean){
                				_scope.layer.loading.open = _boolean;
                				//_scope.renderComplete(_scope.tab.view);
                				if(_boolean){
                					angular.element('#loading-layer').addClass('is-active');//
                					$body.addClass('no-scroll');
                					ssds.common.newLoading(angular.element('#loading-layer .layer .loading'));
                				}else{
                					angular.element('#loading-layer').removeClass('is-active');//
                					$body.removeClass('no-scroll');
                					ssds.common.newLoadingDone(angular.element('#loading-layer .layer .loading .newLoading'));
                				}
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
                				var layerH, posTop;
                              
                				$popup.css({opacity : 0});
                				$body.addClass(ssds.common.o_className.noScroll);
                				layerH = $popup.find('.layer').height();
                              
                				posTop = (ssds.common.o_screenSize.height - layerH) / 2;
                				$popup.css({opacity : 1});
                				$popup.find('.layer').css({'padding-top' : posTop});
                			},
                			closeF : function(){
                				s.layer.uploadAlert.open = false;
                				$body.removeClass(ssds.common.o_className.noScroll);
                				$popup.find('.layer').css({'padding-top' : 0});
                			}
                		}
                };
        		
                setTimeout(function(){
                	s.setTop();
            	}, 500);
                //s.changeWall();
        	}
        	s.initDisplay = function(){
        		variable.set('display.spec', variable.get().display.spec); // s.display.spec
        		s.display = setDisplayProp.get(); // display
        		s.resizeDisplay();
        		angular.element('#blueprint .model_tag .model-name').text(s.display.name);
        		
        	}
        	s.setVar = function(){
        		var req = $http({
            		method : 'GET',
            		url : '/support/led-configurator?method=detail&seq='
            	});
    			req.success(function(data, status, headers, config){
    				variable.set('display.name', data.detail.PRODUCT_NAME);
    				variable.set('display.seq', data.detail.SEQ);
    				variable.set('display.spec', data.detail);
    				
    				s.layer.choose.name = s.display.name = variable.get().display.name;
    				s.layer.choose.seq = s.display.seq = variable.get().display.seq;
    				s.layer.choose.detail = data.detail;
    				
    				releaseDisplay.set(variable.get().display.seq, s.initDisplay);
    				
    				setTimeout(function(){
//    					angular.element('#loading-layer').removeClass('is-active');
//        				ssds.common.newLoadingDone(angular.element('#loading-layer .layer .loading .newLoading'));
//            			$body.removeClass('no-scroll');
    					
            			s.layer.loading.openF(s, false);
    				}, 1000);    				
    	    	});
    			req.then(function(response){}, function(response){
    				if(console)	console.log('select display error!')
    			});
        	}
			
        	s.init();
        	s.setVar();        	
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
            		indoor : 'list&sTypeCd=1696'
        		},
        		detail : 'detail&seq=',
        		spec : 'spec&seq=',
        		link : 'https://displaysolutions.samsung.com/led-signage/detail/',
        		img : 'https://vd-dsg.s3.amazonaws.com/logs/upload'
        	},
        	info : {
        		w : 1920,
        		h : 1080
        	}
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
            		size : {},
            		module : {},
            		meter_size : {},
            		pixel_size : {},
            		ratio : null
            };
			
            return {
            	set : function(_namespace, _data){
            		var temp = {},
            			arr = _namespace.split('.'),
            			j = 0, len = arr.length;
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
        									scope.layer.loading.openF(scope, false);
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
        				angular.element('#loading-layer').removeClass('is-active');
        				angular.element('body').removeClass('no-scroll');
        				ssds.common.newLoadingDone(angular.element('#loading-layer .layer .loading .newLoading'));
        				scope.videowall.repeatNum = scope.videowall.row;	
        			}
        	    }
        	};
        });
        
        configurator.factory('setDisplayProp', function(variable, converseDisplaySize, decimalPoint){
        	return{
        		get : function(){
        			var tempS = variable.get().display.spec.DIMENSIONS.split('x'),
        				tempMTotal = variable.get().display.spec.CABINET_MODULE_CONFIGURATION.length,
        				tempM = variable.get().display.spec.CABINET_MODULE_CONFIGURATION.substring(0, tempMTotal - 6).split('x'),
        				size = {},
        				module = {},
        				ratio,
        				t;
        			
        			$.each(tempS, function(_idx){
        				if(_idx == 0){
        					size.width = parseInt(tempS[_idx]);
        					module.width = parseInt(tempM[_idx]);
        				}else{
        					if(_idx == 1){
        						size.height = parseInt(tempS[_idx]);
            					module.height = parseInt(tempM[_idx]);
        					}else{
        						size.depth = parseInt(tempS[_idx]);
        					}
        				}
        			});
        			
        			variable.set('display.size', size);
        			variable.set('display.module', module);
        			variable.set('display.meter_size', converseDisplaySize.getSize(size));
        			
        			ratio = decimalPoint.getNum(variable.get().display.meter_size.height / variable.get().display.meter_size.width, 2);
        			variable.set('display.ratio', Number(ratio));
        			
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
        					width : _milliSize.width * 0.001,
        					height : _milliSize.height * 0.001
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
        	
        	return{
        		getSize : function(_val){
        			var val = String(_val), tmp = val.split('.'), total = tmp.length, width = padding * 2 + unit + dot;
        			for(i = 0; i < total; i += 1){
        				for(j = 0; j < tmp[i].length; j += 1){
        					width += char;
        				}
        			}
        			w = width;
        			
        			return{
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
    }
    
    return{init : init}
    
})(jQuery);

$(document).ready(function(){
	$('#loading-layer').addClass('is-active');
	ssds.common.newLoading(angular.element('#loading-layer .layer .loading'));
	$('body').addClass('no-scroll');
});

ledConfiguratorApp.init();