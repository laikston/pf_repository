/**
 * SamSung Display Solutions
 * @author rui13th@pulipinc.com
 */


var configuratorApp = (function($){
	var config = {
			unit : 'meter',
			room : {width : 5, height : 3},
			videowall : {row : 1, col : 1},
			orientation : 'landscape',
			image : '/static/images/videowall_configurator/background.gif',
			color : '#ffffff',
			model : {name : '', seq : undefined}
		},
		configurator;
	
    function init(){
    	configurator = angular.module('configurator', []);
        configurator.constant('constVar', {});
        configurator.controller('configuratorController', function($scope, $http, constVar, uploadModel, $location, $document, decimalPoint, constant, sizeNumber, resolutionNumber, getTagSize){
        	var s = $scope,
        		$body  = angular.element('body'),
        		$popup = angular.element('.ly-configurator');        	
        	angular.element('#footer').append('<div id="insert_title" style="background:#0088d0;color:#fff;font-size:54px;font-weight:bold;width:1200px;margin:0 auto;padding:50px 0 0 90px;display:none;"></div>');
        	angular.element('#insert_title').css('font-family',"'SamsungOneRg' !important");        	
        	s.converseToFeet = function(_metersNum){
        		var feetNum = parseFloat((_metersNum * 3.28));//.toFixed(2)
        		return feetNum;
        	};
        	s.converseToMeter = function(_feetNum){
        		var meterNum = parseFloat((_feetNum * 0.3048));//.toFixed(2)
        		return meterNum;
        	};
        	s.converseToInch = function(_num){
        		var inchNum, num, num2;
        		num = _num;
        		if(s.unit != 'meter')	num =  s.converseToMeter(_num);
        		num2 = parseFloat((num * 39.3700)); // .toPrecision(2)
        		inchNum = decimalPoint.getNum(num2, 2);
        		return inchNum;
        	};
        	s.changePerson = function(){
        		var roomH = (s.unit == 'feet') ? s.converseToMeter(s.room.size.height) : s.room.size.height, personH = (s.room.size.pixel_height * s.const.person.meter_height) / roomH;
        		s.person.size.width = s.const.person.ratio * personH;
        		s.person.position.bottom = -s.const.room.pixel_bottom + (personH / 20);
        	};
        	s.changeRoom = function(_changeH){
        		s.room.size.pixel_height = s.model.room.size.pixel_height = (s.room.size.height * s.const.room.pixel_width) / s.room.size.width;
        		if(_changeH == undefined)  s.changePerson();
        		s.resizeDisplay();
        	};
        	s.getMaxVideowall = function(){
    			s.display.videowall.max.col = s.model.display.videowall.max.col = Math.floor(s.const.room.pixel_width / s.display.size.width);
    			s.display.videowall.max.row = s.model.display.videowall.max.row = Math.floor(s.room.size.pixel_height / s.display.size.height);
    		};
    		s.setVideowall = function(){
//    			if(s.display.videowall.col >= s.display.videowall.max.col)  s.display.videowall.col = s.display.videowall.max.col;
//    			if(s.display.videowall.row >= s.display.videowall.max.row)  s.display.videowall.row = s.display.videowall.max.row;
        	  
    			/* 170911 */
    			if(s.display.videowall.col >= s.display.videowall.max.col){
    				s.model.display.videowall.col = s.display.videowall.input_col = s.display.videowall.col = s.display.videowall.max.col;
    			}else{
    				s.model.display.videowall.col = s.display.videowall.input_col = s.display.videowall.col;
    			}
    			if(s.display.videowall.row >= s.display.videowall.max.row){
    				s.model.display.videowall.row = s.display.videowall.input_row = s.display.videowall.row = s.display.videowall.max.row;
    			}else{
    				s.model.display.videowall.row = s.display.videowall.input_row = s.display.videowall.row;
    			}
    		};
    		s.videoPosition = function(){
    			s.upload.video.position.top = ((s.room.size.pixel_height - (s.display.size.height * s.display.videowall.row)) / 2);
    			s.upload.video.position.left = ((s.const.room.pixel_width - s.display.size.width * s.display.videowall.col) / 2);
    		};
    		s.changeOptsPosition = function(){
    			s.videoPosition();
    			s.room.opts.choose.position.top = ((s.room.size.pixel_height - (s.display.size.height * s.display.videowall.row)) / 2);
    			s.room.opts.choose.position.left = ((s.const.room.pixel_width - s.display.size.width * s.display.videowall.col) / 2) - 38 - 10;
    			s.room.opts.sizeW_top = ((s.room.size.pixel_height - (s.display.size.height * s.display.videowall.row)) / 2) - 36 - 10;
    			s.room.opts.sizeH.position.top = s.room.size.pixel_height / 2 - 40;
    			s.room.opts.sizeH.position.left = ((s.const.room.pixel_width + s.display.size.width * s.display.videowall.col) / 2) + 10;
    			s.room.modelTag.position.top = ((s.room.size.pixel_height - (s.display.size.height * s.display.videowall.row)) / 2);
    			s.room.modelTag.position.left = ((s.const.room.pixel_width + s.display.size.width * s.display.videowall.col) / 2) - 68;
    		};
        	s.resizeDisplay = function(_setDisplay){
        		switch(s.unit){
    	    		case 'feet' :
    	    			s.model.display.size.width = (s.converseToFeet(s.model.display.size.meter_width) * s.const.room.pixel_width) / s.room.size.width; // feet -> pixel
    	    			s.model.display.size.height = s.model.display.size.width * s.model.display.ratio; // feet -> pixel
    	    			break;
    	    			
    	    		case 'meter' :
    	    			s.model.display.size.width = (s.model.display.size.meter_width * s.const.room.pixel_width) / s.room.size.width; // m -> pixel
    	    			s.model.display.size.height = s.model.display.size.width * s.model.display.ratio; // m -> pixel
    	    			break;
    	    			
    	    		default :
    	    			break;
        		}
        		switch(s.display.orientation){
    	    		case 'landscape' :
    	    			s.display.size.width = decimalPoint.getNum(s.model.display.size.width, 2);
    	    			s.display.size.height = decimalPoint.getNum(s.model.display.size.height, 2);
    	    			break;
    	    			
    	    		case 'portrait' :
    	    			s.display.size.width = decimalPoint.getNum(s.model.display.size.height, 2);
    	    			s.display.size.height = decimalPoint.getNum(s.model.display.size.width, 2);
    	    			break;
    	    			
    	    		default :
    	    			break;
        		}
        		if(_setDisplay){ // choose new display
        			if(s.display.orientation == 'portrait'){
        				s.display.size.width = s.model.display.size.height;
        				s.display.size.height = s.model.display.size.width;
        			}
        		}
        		s.getMaxVideowall();        		
        		/* 170911 추가 */
        		s.model.display.videowall.col = s.display.videowall.input_col = s.display.videowall.col;
        		s.model.display.videowall.row = s.display.videowall.input_row = s.display.videowall.row;        		
        		s.setVideowall();
        		s.changeOptsPosition();
        	};
        	/* 171019 */
        	s.getDisplaySpecData = function(_seq, _completeFunc){
        		var req = $http({
            		method : 'GET',
            		url : constant.data.base + constant.data.spec + _seq
            	});
        		req.success(function(data, status, headers){
        			s.display.name = s.model.display.name = data.spec.PRODUCT_NAME;
    				s.display.data = s.model.display.data = data.spec;
    				s.layer.choose.name = s.model.display.name;
    				s.layer.choose.seq = s.model.display.data.SEQ;
    				
//    				if(_isInit){
//    					config.model.name = data.spec.PRODUCT_NAME;
//        				config.model.seq = data.spec.SEQ;
//    				}
    				if(_completeFunc)	_completeFunc();
    	    	});
        		req.then(function(response){}, function(response){
    				if(console)	console.log('select display error!')
    			});
        	}
        	/* //171019 */
        	s.setDisplay = function(){ // choose new display
        		var size = sizeNumber.getSize(s.model.display.data.MECHANICAL_SPEC_DIMENSION_SET); /* 171017 추가 */
    			
        		/* 171017 수정 */
        		s.display.size = {
        				meter_width : Number(size[0]) * 0.001,
        				meter_height : Number(size[1]) * 0.001,
        				meter_dpi : Number(size[2]) * 0.001
        		}; // milli -> m   
        		s.model.display.size = {meter_width : s.display.size.meter_width, meter_height : s.display.size.meter_height}; // milli -> m
        		s.display.ratio = s.model.display.ratio = s.model.display.size.meter_height / s.model.display.size.meter_width;
        		angular.element('.model_tag').text(s.display.name);
        		s.resizeDisplay('_setDisplay');
        	};
//        	s.init = function(){
//    			s.changeRoom();
//    			s.setDisplay();
//    			//setTimeout(s.openHelp, 2000); // need help    			
//    			setTimeout(function(){    					
//        			s.layer.loading.openF(s, false);
//				}, 1000); 
//    		};
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
    		/* 171019 */
    		s.getDisplayDetailData = function(){
        		var detailReq = $http({
            		method : 'GET',
            		url : constant.data.base + constant.data.detail + s.layer.choose.seq
            	});
        		detailReq.success(function(data, status, headers, config){
        			s.layer.choose.detail = data.detail;
        			s.layer.choose.size = sizeNumber.getSize(data.detail.MECHANICAL_SPEC_DIMENSION_SET);
        			s.layer.choose.weight = parseFloat(data.detail.MECHANICAL_SPEC_WEIGHT_SET);
        			s.layer.choose.resolution = resolutionNumber.getResolution(data.detail.PANEL_RESOLUTION);
    	    	});
        		detailReq.then(function(response){}, function(response){
    				if(console)	console.log('set display list error!')
    			});
        	}
    		/*//171019 */
        	s.setVar = function(){
    			s.model = { /* internal variable :: save value when change display name :: storage */
    					room : {size : {width : config.room.width, height : config.room.height, pixel_height : 0}},
    					display : {
    						name : null,
    						data : null,
    						size : {},
    						orientation : 'landscape',
    						videowall : {size : {}, col : config.videowall.col, row : config.videowall.row, input_col : config.videowall.col, input_row : config.videowall.row, max : {}, repeatNum : 0, timer : {col:null, row:null}}
    					}
    			};
    			s.display = { /* about display in the room :: view binding */
    					name : null,
    					data : null,
    					orientation : s.model.display.orientation,
    					size : s.model.display.size,
    					videowall : s.model.display.videowall,
    					list : [] /* 171017 :: Choose display to be configurator 추가*/
    			};	
    			s.defaultSeq;
    			s.unit = config.unit; // 'feet' or 'meter'
    			s.tab = {opts : 1, view : 1, unit : config.unit}; // opts : wall size, choose model, display layout, orientation, upload content / view : blueprint, render / unit : feet, meter
    			s.scrollTop = angular.element('#header').outerHeight(true) + angular.element('.h-page').outerHeight(true) - angular.element('#nav-local').outerHeight(true) - angular.element('#nav-local').outerHeight(true);
    			s.videoW = 0;
    			s.videoH = 0;
    			s.blueprintProp = {/* 171116 :: 리펙토링 추가*/
    					width : 0,
    					height : 0
    			};
    			s.const = {}; /* define constant */
    			s.const.room = {
    					maxSize : {meter_width : 60, meter_height : 60},
    					minSize : {meter_width : 2, meter_height : 2},
    					pixel_width : 692,
    					pixel_bottom : 95
    			};
    			s.const.room.maxSize.feet_width = Number((s.converseToFeet(s.const.room.maxSize.meter_width)).toFixed(1)); // 171106 수정
    			s.const.room.maxSize.feet_height = Number((s.converseToFeet(s.const.room.maxSize.meter_height)).toFixed(1)); // 171106 수정
    			s.const.room.minSize.feet_width = Number((s.converseToFeet(s.const.room.minSize.meter_width)).toFixed(1)); // 171106 수정
    			s.const.room.minSize.feet_height = Number((s.converseToFeet(s.const.room.minSize.meter_height)).toFixed(1)); // 171106 수정
    			s.const.person = {meter_height : 1.83, ratio : (119 / 361)};
    			s.room = { /* about room :: view binding */
    					sizeTimer : {width : null, height : null},
    					sizePopupRemoveTimer : {width : null, height : null},
    					size : s.model.room.size,
    					opts : {
    						choose : {position : {left : 0, top : 0}},
    						sizeW_top : 0,
    						sizeH : {position : {left : 0, top : 0}}
    					},
    					modelTag : {position : {left : 0, top : 0}},
    					isClick : false
    			};
    			s.person = {size : {}, position : {}}; /* about person in the room :: view binding */
    			s.layer = { /* about layer popup :: view binding */
    					choose : {open : false},
    					upload : {open : false},
    					loading : {
    						open : false,
    						openF : function(_scope, _boolean){
    							_scope.layer.loading.open = _boolean;
    							_scope.renderComplete(_scope.tab.view);
    							if(_boolean){
    								$body.addClass('no-scroll');
    								ssds.common.newLoading(angular.element('#loading-layer .layer .loading'));
    							}else{
    								$body.removeClass('no-scroll');
    								ssds.common.newLoadingDone(angular.element('#loading-layer .layer .loading .newLoading'));
    							}
    						}
    					},					
    					title : {
    						open : false, 
    						msg : null, 
    						msgF : function(_msg){
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
    					same : {
    						open : false, 
    						msg : null, 
    						msgF : function(_msg){
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
    					uploadAlert : {
    						open : false, 
    						msg : null, 
    						timer : null, 
    						msgF : function(_msg){
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
    					limit : {
    						open : false, 
    						msg : null, 
    						w_count : 0, 
    						h_count : 0, 
    						msgF : function(_msg, _size){
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
    					}
    			};
    			s.help = { /* about need help :: view binding */
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
    			s.upload = uploadModel.get(); /* about upload contents :: view binding */
    			
    			/* 171017 추가 :: default 모델 정보 가져오기 */
    			setTimeout(function(){    					
        			s.layer.loading.openF(s, true);
				}, 0); 
    		};
    		s.setVar();
    		s.$watch('display.seq', function(newValue, oldValue){
				console.log(s.display.seq);
				s.getDisplaySpecData(s.display.seq, s.setDisplay);
				setTimeout(function(){    					
        			s.layer.loading.openF(s, false);
				}, 2500); 
			});
        	s.setTab = function(_tab){
        		s.tab.opts = _tab;
        	};
        	s.getTab = function(_tab){
        		return s.tab.opts === _tab;
        	};
        	s.setViewTab = function(_tab){
        		s.tab.view = _tab;
        		$document.scrollTop(s.scrollTop);
        	};
        	s.getViewTab = function(_tab){
        		return s.tab.view === _tab;
        	};
        	
        	s.setUnit = function(_unit){
        		if(s.unit != _unit){
        			switch(_unit){
    	    			case 'meter' :
    	    				s.room.size.width = s.model.room.size.width = Number((s.converseToMeter(s.room.size.width)).toFixed(1));
    	    				s.room.size.height = s.model.room.size.height = Number((s.converseToMeter(s.room.size.height)).toFixed(1));
    	    				s.tab.unit = 1;
    	    				break;
    	    				
    	    			case 'feet' :
    	    				s.room.size.width = s.model.room.size.width = Number((s.converseToFeet(s.room.size.width)).toFixed(1));
    	    				s.room.size.height = s.model.room.size.height = Number((s.converseToFeet(s.room.size.height)).toFixed(1));
    	    				s.tab.unit = 2;
    	    				break;
    	    				
    	    			default :
    	    				break;
        			}
        			s.tab.unit = _unit;
        			if(_unit)  s.unit = _unit;
        		}
        	};    	        	
//        	s.changeRoomWidth = function(_num){
//        		var width;
//        		s.room.size.width = s.model.room.size.width;
//        		if(_num != 0){
//        			if(s.layer.limit.open == true)  s.layer.limit.open = false;
//        			width = Number(s.room.size.width) + _num;
//        			s.room.size.width = Number(width.toPrecision(2));
//        			inputWidthTimer();
//        		}else{
//        			switch(s.unit){
//    	    			case 'meter' :
//    	    				if((s.room.size.width == "") || (s.room.size.width < s.const.room.minSize.meter_width) || (s.room.size.width > s.const.room.maxSize.meter_width)){
//    	    					if(s.room.size.width > s.const.room.maxSize.meter_width)	inputWidthTimer();
//    	    					if(s.layer.limit.open == true){
//    	    						s.room.sizeTimer.width = setTimeout(inputWidthTimer, 2000);
//    	    					}
//    	    				}else{
//    	    					inputWidthTimer();
//    	    				}
//    	    				break;
//    	    				
//    	    			case 'feet' :
//    	    				if((s.room.size.width == "") || (s.room.size.width < s.const.room.minSize.feet_width) || (s.room.size.width > s.const.room.maxSize.feet_width)){
//    	    					if(s.room.size.width > s.const.room.maxSize.feet_width)	inputWidthTimer();
//    	    					if(s.layer.limit.open == true){
//    	    						s.room.sizeTimer.width = setTimeout(inputWidthTimer, 2000);
//    	    					}
//    	    				}else{
//    	    					inputWidthTimer();
//    	    				}
//    	    				break;
//    	    			
//    	    			default :
//    	    				break;
//    	    			}
//        		}
//        		
//        		function inputWidthTimer(){
//        			clearTimeout(s.room.sizeTimer.width);
//        			switch(s.unit){
//    	    			case 'meter' :
//    	    				if(s.room.size.width > s.const.room.maxSize.meter_width){
//    	    					s.room.size.width = s.const.room.maxSize.meter_width;
//    	    					s.layer.limit.msg = s.layer.limit.msgF('Maximum width', s.const.room.maxSize.meter_width);
//    	    					s.layer.limit.open = true;
//    	    					s.layer.limit.posF();
//    	    					s.layer.limit.w_count += 1;
//    	    				}
//    	    				if(s.room.size.width < s.const.room.minSize.meter_width){
//    	    					s.room.size.width = s.const.room.minSize.meter_width;
//    	    					s.layer.limit.msg = s.layer.limit.msgF('Minimum width', s.const.room.minSize.meter_width);
//    	    					s.layer.limit.open = true;
//    	    					s.layer.limit.posF();
//    	    					s.layer.limit.w_count += 1;
//    	    				}
//    	    				if(s.room.size.width == "")  s.room.size.width = s.const.room.minSize.meter_width;
//    	    				break;
//    	    				
//    	    			case 'feet' :
//    	    				if(s.room.size.width == "")  s.room.size.width = s.const.room.minSize.feet_width;
//    	    				if(s.room.size.width > s.const.room.maxSize.feet_width){
//    	    					s.room.size.width = s.const.room.maxSize.feet_width;
//    	    					s.layer.limit.msg = s.layer.limit.msgF('Maximum width', s.const.room.maxSize.feet_width);
//    	    					s.layer.limit.open = true;
//    	    					s.layer.limit.posF();
//    	    					s.layer.limit.w_count += 1;
//    	    				}
//    	    				if(s.room.size.width < s.const.room.minSize.feet_width){
//    	    					s.room.size.width = s.const.room.minSize.feet_width;
//    	    					s.layer.limit.msg = s.layer.limit.msgF('Minimum width', s.const.room.minSize.feet_width);
//    	    					s.layer.limit.open = true;
//    	    					s.layer.limit.posF();
//    	    					s.layer.limit.w_count += 1;
//    	    				}
//    	    				if(s.room.size.width == "")  s.room.size.width = s.const.room.minSize.feet_width;
//    	    				break;
//    	    				
//    	    			default :
//    	    				break;
//        			}
//        			s.model.room.size.width = s.room.size.width;
//        			s.changeRoom();
//        			if(_num == 0){
//        				if(!s.$$phase)  $scope.$apply();
//        			}
//        		}
//        		
//        		function inputWidthRemoveTimer(){
//        			clearTimeout(s.room.sizePopupRemoveTimer.width);
//        			s.layer.limit.open = false;
//        			s.layer.limit.w_count = 0;
//        			s.renderComplete(s.tab.view);
//        		}
//        	};
//        	s.$watch('room.size.width', function(newValue, oldValue){
//        		switch(s.unit){
//    	    		case 'meter' :
//    	    			if(s.converseToMeter(oldValue) != newValue)  s.changeRoomWidth(0);
//    	    			break;
//    	    			
//    	    		case 'feet' :
//    	    			if(s.converseToFeet(oldValue) != newValue)  s.changeRoomWidth(0);
//    	    			break;
//    	    			
//    	    		default :
//    	    			break;
//        		}
//        	});        	
        	s.changeRoomWidth = function(_num){
        		var width;
        		s.room.size.width = s.model.room.size.width;
        		if(_num != 0){
        			if(s.layer.limit.open == true)  s.layer.limit.open = false;
        			width = Number(s.room.size.width) + _num;
        			s.room.size.width = Number(width.toFixed(1));
        			inputWidthTimer();
        		}else{
        			switch(s.unit){
    	    			case 'meter' :
    	    				if(s.room.size.width == undefined){
    	    					s.room.size.width = s.const.room.minSize.meter_width;
    	    				}
    	    				if((s.room.size.width == "") || (s.room.size.width < s.const.room.minSize.meter_width) || (s.room.size.width > s.const.room.maxSize.meter_width)){
    	    					if(s.layer.limit.open == true)  s.layer.limit.open = false;
    	    					if(s.room.size.width > s.const.room.maxSize.meter_width)	inputWidthTimer();
    	    					s.room.sizeTimer.width = setTimeout(inputWidthTimer, 2000);
    	    				}else{
    	    					inputWidthTimer();
    	    				}
    	    				break;
    	    				
    	    			case 'feet' :
    	    				if(s.room.size.width == undefined){
    	    					s.room.size.width = s.const.room.minSize.feet_width;
    	    				}
    	    				if((s.room.size.width == "") || (s.room.size.width < s.const.room.minSize.feet_width) || (s.room.size.width > s.const.room.maxSize.feet_width)){
    	    					if(s.layer.limit.open == true)  s.layer.limit.open = false;
    	    					if(s.room.size.width > s.const.room.maxSize.feet_width)	inputWidthTimer();
    	    					s.room.sizeTimer.width = setTimeout(inputWidthTimer, 2000);
    	    				}else{
    	    					inputWidthTimer();
    	    				}
    	    				break;
    	    				
    	    			default :
    	    				break;
        			}
        		}        		
        		function inputWidthTimer(){
        			clearTimeout(s.room.sizeTimer.width);
        			switch(s.unit){
    	    			case 'meter' :
    	    				if(s.room.size.width == "")  s.room.size.width = s.const.room.minSize.meter_width;
    	    				if(s.room.size.width > s.const.room.maxSize.meter_width){
    	    					s.room.size.width = s.const.room.maxSize.meter_width;
    	    					s.layer.limit.msg = s.layer.limit.msgF('Maximum width', s.const.room.maxSize.meter_width);
    	    					s.layer.limit.open = true;
    	    					s.layer.limit.posF();
    	    					s.layer.limit.h_count += 1;
    	    				}
    	    				if(s.room.size.width < s.const.room.minSize.meter_width){
    	    					s.room.size.width = s.const.room.minSize.meter_width;
    	    					s.layer.limit.msg = s.layer.limit.msgF('Minimum width', s.const.room.minSize.meter_width);
    	    					s.layer.limit.open = true;
    	    					s.layer.limit.posF();
    	    					s.layer.limit.h_count += 1;
    	    				}
    	    				break;
    	    				
    	    			case 'feet' :
    	    				if(s.room.size.width == "")  s.room.size.width = s.const.room.minSize.feet_width;
    	    				if(s.room.size.width > s.const.room.maxSize.feet_width){
    	    					s.room.size.width = s.const.room.maxSize.feet_width;
    	    					s.layer.limit.msg = s.layer.limit.msgF('Maximum width', s.const.room.maxSize.feet_width);
    	    					s.layer.limit.open = true;
    	    					s.layer.limit.posF();
    	    					s.layer.limit.h_count += 1;
    	    				}
    	    				if(s.room.size.width < s.const.room.minSize.feet_width){
    	    					s.room.size.width = s.const.room.minSize.feet_width;
    	    					s.layer.limit.msg = s.layer.limit.msgF('Minimum width', s.const.room.minSize.feet_width);
    	    					s.layer.limit.open = true;
    	    					s.layer.limit.posF();
    	    					s.layer.limit.h_count += 1;
    	    				}
    	    				break;
    	    				
    	    			default :
    	    				break;
        			}
        			
        			s.model.room.size.width = s.room.size.width;
        			s.changeRoom(); // when add width num, don't change person size
        			if(_num == 0){
        				if(!s.$$phase)  $scope.$apply();
        			}
        			//if(s.layer.limit.open == true && s.layer.limit.h_count == 1)	s.room.sizePopupRemoveTimer.width = setTimeout(inputWidthRemoveTimer, 3000);
        		}
        		
        		function inputWidthRemoveTimer(){
        			clearTimeout(s.room.sizePopupRemoveTimer.width);
        			s.layer.limit.open = false;
        			s.layer.limit.h_count = 0;
        			s.renderComplete(s.tab.view);
        		}
        	};
        	s.$watch('room.size.width', function(newValue, oldValue){
        		switch(s.unit){
    	    		case 'meter' :
    	    			if(s.converseToMeter(oldValue) != newValue)  s.changeRoomWidth(0);
    	    			break;
    	    			
    	    		case 'feet' :
    	    			if(s.converseToFeet(oldValue) != newValue)  s.changeRoomWidth(0);
    	    			break;
    	    			
    	    		default :
    	    			break;
        		}
        	});        	
        	s.changeRoomHeight = function(_num){
        		var height;
        		s.room.size.height = s.model.room.size.height;
        		if(_num != 0){
        			if(s.layer.limit.open == true)  s.layer.limit.open = false;
        			height = Number(s.room.size.height) + _num;
        			s.room.size.height = Number(height.toFixed(1));
        			inputHeightTimer();
        		}else{
        			switch(s.unit){
    	    			case 'meter' :
    	    				if(s.room.size.height == undefined){
    	    					s.room.size.height = s.const.room.minSize.meter_height;
    	    				}
    	    				if((s.room.size.height == "") || (s.room.size.height < s.const.room.minSize.meter_height) || (s.room.size.height > s.const.room.maxSize.meter_height)){
    	    					if(s.layer.limit.open == true)  s.layer.limit.open = false;
    	    					if(s.room.size.height > s.const.room.maxSize.meter_height)	inputHeightTimer();
    	    					s.room.sizeTimer.height = setTimeout(inputHeightTimer, 2000);
    	    				}else{
    	    					inputHeightTimer();
    	    				}
    	    				break;
    	    				
    	    			case 'feet' :
    	    				if(s.room.size.height == undefined){
    	    					s.room.size.height = s.const.room.minSize.feet_height;
    	    				}
    	    				if((s.room.size.height == "") || (s.room.size.height < s.const.room.minSize.feet_height) || (s.room.size.height > s.const.room.maxSize.feet_height)){
    	    					if(s.layer.limit.open == true)  s.layer.limit.open = false;
    	    					if(s.room.size.height > s.const.room.maxSize.feet_height)	inputHeightTimer();
    	    					s.room.sizeTimer.height = setTimeout(inputHeightTimer, 2000);
    	    				}else{
    	    					inputHeightTimer();
    	    				}
    	    				break;
    	    				
    	    			default :
    	    				break;
        			}
        		}        		
        		function inputHeightTimer(){
        			clearTimeout(s.room.sizeTimer.height);
        			switch(s.unit){
    	    			case 'meter' :
    	    				if(s.room.size.height == "")  s.room.size.height = s.const.room.minSize.meter_height;
    	    				if(s.room.size.height > s.const.room.maxSize.meter_height){
    	    					s.room.size.height = s.const.room.maxSize.meter_height;
    	    					s.layer.limit.msg = s.layer.limit.msgF('Maximum height', s.const.room.maxSize.meter_height);
    	    					s.layer.limit.open = true;
    	    					s.layer.limit.posF();
    	    					s.layer.limit.h_count += 1;
    	    				}
    	    				if(s.room.size.height < s.const.room.minSize.meter_height){
    	    					s.room.size.height = s.const.room.minSize.meter_height;
    	    					s.layer.limit.msg = s.layer.limit.msgF('Minimum height', s.const.room.minSize.meter_height);
    	    					s.layer.limit.open = true;
    	    					s.layer.limit.posF();
    	    					s.layer.limit.h_count += 1;
    	    				}
    	    				break;
    	    				
    	    			case 'feet' :
    	    				if(s.room.size.height == "")  s.room.size.height = s.const.room.minSize.feet_height;
    	    				if(s.room.size.height > s.const.room.maxSize.feet_height){
    	    					s.room.size.height = s.const.room.maxSize.feet_height;
    	    					s.layer.limit.msg = s.layer.limit.msgF('Maximum height', s.const.room.maxSize.feet_height);
    	    					s.layer.limit.open = true;
    	    					s.layer.limit.posF();
    	    					s.layer.limit.h_count += 1;
    	    				}
    	    				if(s.room.size.height < s.const.room.minSize.feet_height){
    	    					s.room.size.height = s.const.room.minSize.feet_height;
    	    					s.layer.limit.msg = s.layer.limit.msgF('Minimum height', s.const.room.minSize.feet_height);
    	    					s.layer.limit.open = true;
    	    					s.layer.limit.posF();
    	    					s.layer.limit.h_count += 1;
    	    				}
    	    				break;
    	    				
    	    			default :
    	    				break;
        			}
        			
        			s.model.room.size.height = s.room.size.height;
        			s.changeRoom('chanageH'); // when add height num, don't change person size
        			if(_num == 0){
        				if(!s.$$phase)  $scope.$apply();
        			}
        			//if(s.layer.limit.open == true && s.layer.limit.h_count == 1)	s.room.sizePopupRemoveTimer.height = setTimeout(inputHeightRemoveTimer, 3000);
        		}
        		
        		function inputHeightRemoveTimer(){
        			clearTimeout(s.room.sizePopupRemoveTimer.height);
        			s.layer.limit.open = false;
        			s.layer.limit.h_count = 0;
        			s.renderComplete(s.tab.view);
        		}
        	};
        	s.$watch('room.size.height', function(newValue, oldValue){
        		switch(s.unit){
    	    		case 'meter' :
    	    			if(s.converseToMeter(oldValue) != newValue)  s.changeRoomHeight(0);
    	    			break;
    	    			
    	    		case 'feet' :
    	    			if(s.converseToFeet(oldValue) != newValue)  s.changeRoomHeight(0);
    	    			break;
    	    			
    	    		default :
    	    			break;
        		}
        	});
        	s.getChooseDisplayLayer = function(_boolean){
        		var listReq;
        		if(s.display.list.length == 0){
        			/* 171019 */
        			listReq = $http({
                		method : 'GET',
                		url : constant.data.base + constant.data.list
                	});
        			listReq.success(function(data, status, headers, config){
        				s.display.list = data.list;
        	    	});
        			listReq.then(function(response){}, function(response){
        				if(console)	console.log('set display list error!')
        			});
        			/*//171019 */
        		}
        		
        		s.getDisplayDetailData(); /* 171019 */
    			
        		s.layer.choose.open = _boolean;
        		if(s.layer.choose.open){
        			$body.addClass('no-scroll');
        		}else{
        			$body.removeClass('no-scroll');
        			s.display.name = s.model.display.name;
        		}
        	};
        	s.getChooseDisplay = function(_modelName, _seq){
        		s.layer.choose.name = _modelName;
                s.layer.choose.seq = _seq;
                s.getDisplayDetailData();
        	};
        	s.setChooseDisplay = function(_modelName, _seq){
        		s.getChooseDisplayLayer(false);
        		s.display.seq = _seq;        		
        	}; 	
        	s.changeCol = function(_num){
        		var col, input_col = Number(s.display.videowall.input_col);
        		
        		s.getMaxVideowall();
        		if(_num != 0){
        			if(_num < 0){
        				if(s.display.videowall.col >= 2){
        					col = input_col + _num;
        					s.model.display.videowall.col = s.display.videowall.input_col = s.display.videowall.col = col;
        					inputColTimer();
        				}
        			}else{
        				col = input_col + _num;
        				s.model.display.videowall.col = s.display.videowall.input_col = s.display.videowall.col = col;
        				inputColTimer();
        			}
        		}else{
//        			if(s.layer.over.open == true)  s.layer.over.open = false;
        			if((s.display.videowall.input_col == "") || (input_col <= 0) || (input_col > s.display.videowall.max.col)){
        				if(input_col > s.display.videowall.max.col)	inputColTimer();
        				if(input_col < s.display.videowall.max.col)	s.display.videowall.timer.col = setTimeout(inputColTimer, 2000);
        			}else{
        				s.display.videowall.col = Number(s.display.videowall.input_col);
        				inputColTimer();
        			}
        		}
        		
        		function inputColTimer(){
        			clearTimeout(s.display.videowall.timer.col);
        			if(s.display.videowall.input_col == ""){
        				s.model.display.videowall.col = s.display.videowall.input_col = s.display.videowall.col = 1;
        				s.renderComplete(s.tab.view);
        			}
        			if(Number(s.display.videowall.input_col) > s.display.videowall.max.col){
        				s.model.display.videowall.col = s.display.videowall.input_col = s.display.videowall.col = s.display.videowall.max.col;
        				if(s.layer.same.open == false){
//        					s.layer.over.msg = s.layer.over.msgF('width', (s.setBlueprintWidth() - s.wall.size.width).toPrecision(2));
//        					s.layer.over.open = true;
//        					s.layer.over.posF();
        					s.layer.same.msg = s.layer.same.msgF('The maximum number of displays you can install is ' + s.display.videowall.max.col + ' x ' + s.display.videowall.max.row + '(WxH).');
        					s.layer.same.open = true;
        					s.layer.same.posF();
        				}
        			}
        			
        			if(Number(s.display.videowall.input_col) <= 0){
        				s.model.display.videowall.col = s.display.videowall.input_col = s.display.videowall.col = 1;
        				s.renderComplete(s.tab.view);
        			}
        		}
        		s.setVideowall('col');
        		s.changeOptsPosition();
        		
        		if(_num == 0){
        			if(!s.$$phase)  $scope.$apply();
        		}
        	};
        	s.$watch('display.videowall.input_col', function(newValue, oldValue){
        		if(oldValue != newValue){
        			s.changeCol(0);
        		}
        	});
        	
//        	s.changeRow = function(_num){
//        		s.display.videowall.row += _num;
//        		s.setVideowall('_row');
//        		if(s.display.videowall.row <= 1)  s.display.videowall.row = 1;
//        		s.model.display.videowall.row = s.display.videowall.row;
//        		s.changeOptsPosition();
//        	};
        	
        	s.changeRow = function(_num){
        		var row, input_row = Number(s.display.videowall.input_row);
        		
        		s.getMaxVideowall();
        		if(_num != 0){
        			if(_num < 0){
        				if(s.display.videowall.row >= 2){
        					row = input_row + _num;
        					s.model.display.videowall.row = s.display.videowall.input_row = s.display.videowall.row = row;
        					inputRowTimer();
        				}
        			}else{
        				row = input_row + _num;
        				s.model.display.videowall.row = s.display.videowall.input_row = s.display.videowall.row = row;
        				inputRowTimer();
        			}
        		}else{
        			if((s.display.videowall.input_row == "") || (input_row <= 0) || (input_row > s.display.videowall.max.row)){
        				if(input_row > s.display.videowall.max.row)	inputRowTimer();
        				if(input_row < s.display.videowall.max.row)	s.display.videowall.timer.row = setTimeout(inputRowTimer, 2000);
        			}else{
        				s.model.display.videowall.row = s.display.videowall.row = Number(s.display.videowall.input_row);
        				inputRowTimer();
        			}
        		}
        		
        		function inputRowTimer(){
        			var isSpace = false;
        			
        			clearTimeout(s.display.videowall.timer.row);
        			if(s.display.videowall.input_row == ""){
        				s.model.display.videowall.row = s.display.videowall.input_row = s.display.videowall.row = 1;
        				s.renderComplete(s.tab.view);
        			}
        			if(Number(s.display.videowall.input_row) > s.display.videowall.max.row){
        				if(s.layer.same.open == false){
        					s.model.display.videowall.row = s.display.videowall.input_row = s.display.videowall.row = s.display.videowall.max.row;
        					s.layer.same.msg = s.layer.same.msgF('The maximum number of displays you can install is ' + s.display.videowall.max.col + ' x ' + s.display.videowall.max.row + '(WxH).');
        					s.layer.same.open = true;
        					s.layer.same.posF();
        				}
        			}
        			if(Number(s.display.videowall.input_row) <= 0){
        				s.model.display.videowall.row = s.display.videowall.input_row = s.display.videowall.row = 1;
        				s.renderComplete(s.tab.view);
        			}
        		}
        		s.setVideowall('row');
    			s.changeOptsPosition();
    			
    			if(_num == 0){
    				if(!s.$$phase)  $scope.$apply();
    			}
    		};
    		s.$watch('display.videowall.input_row', function(newValue, oldValue){
    			if(oldValue != newValue){
    				s.changeRow(0);
    			}
    		});
    		/* // table -> svg로 변경되어 삭제
    		s.getRepeatNum = function(_num){ 
    			return new Array(_num);
    		};
    		*/
    		/* 171116 :: svg row, col 그리기 :: 추가 */
    		s.setRowLine = function(){
    			var rowLine = '', 
    				height = s.display.size.height,
    				each = s.display.videowall.row, 
    				count = 1, 
    				totalW = s.display.videowall.col * s.display.size.width - 2;
    			
    			for(; count < each; ++count){
    				rowLine += 'M0,' + String(height * count) + ' L' + totalW + ',' + String(height * count) + ' ';
    			}    			
    			
    			return rowLine;
    		};
    		s.setColLine = function(){
    			var colLine = '', 
					width = s.display.size.width,
					each = s.display.videowall.col, 
					count = 1, 
					totalH = s.display.videowall.row * s.display.size.height - 2;
			
				for(; count < each; ++count){
					colLine += 'M' + String(width * count) + ',0 L' + String(width * count) + ',' + totalH + ' ';
				}    
    			return colLine;
    		};
    		/*  //171116 :: svg row, col 그리기 :: 추가 */
    		s.changeOrientation = function(){
    			switch(s.display.orientation){
    				case 'landscape' :
    					s.display.size.width = s.model.display.size.width;
    					s.display.size.height = s.model.display.size.height;
    					break;
    					
    				case 'portrait' :
    					s.display.size.width = s.model.display.size.height;
    					s.display.size.height = s.model.display.size.width;
    					break;
    					
    				default :
    					break;
    			}
    			s.getMaxVideowall();
    			s.setVideowall();
    			s.changeOptsPosition();
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
    		s.setMaxVideowall = function(){
    			if(s.display.videowall.col < s.display.videowall.max.col || s.display.videowall.row < s.display.videowall.max.row){
    				angular.element('#loading-layer').addClass('is-active');
    				ssds.common.newLoading(angular.element('#loading-layer .layer .loading'));
    				$body.addClass('no-scroll');
    				
    				setTimeout(function(){
    					s.getMaxVideowall();
    					s.display.videowall.input_col = s.display.videowall.col = s.model.display.videowall.col = s.model.display.videowall.max.col;
    					s.display.videowall.input_row = s.display.videowall.row = s.model.display.videowall.row = s.model.display.videowall.max.row;
    					s.changeOptsPosition();
    					s.renderComplete(s.tab.view);
    					setTimeout(function(){
	    					angular.element('#loading-layer').removeClass('is-active');
	    					ssds.common.newLoadingDone(angular.element('#loading-layer .layer .loading .newLoading'));
	        				$body.removeClass('no-scroll');
    					}, 1000);
    				}, 1000);
    			}
    		};
    		s.setBlueprintWidth = function(){
    			var width;
    			if(s.unit == 'feet'){
    				if(s.display.orientation == 'landscape'){
    					width = s.getBlueprintSize(s.converseToFeet(s.display.size.meter_width), s.display.videowall.col);
    				}else{
    					width = s.getBlueprintSize(s.converseToFeet(s.display.size.meter_height), s.display.videowall.col);
    				}
    			}else{
    				if(s.display.orientation == 'landscape'){
    					width = s.getBlueprintSize(s.display.size.meter_width, s.display.videowall.col);
    				}else{
    					width = s.getBlueprintSize(s.display.size.meter_height, s.display.videowall.col);
    				}
    			}
    			
    			s.blueprintProp.width = width; // 171116
    			return width;
    		};
    		s.setBlueprintHeight = function(){
    			var height;
    			if(s.unit == 'feet'){
    				if(s.display.orientation == 'landscape'){
    					height = s.getBlueprintSize(s.converseToFeet(s.display.size.meter_height), s.display.videowall.row);
    				}else{
    					height = s.getBlueprintSize(s.converseToFeet(s.display.size.meter_width), s.display.videowall.row);
    				}
    			}else{
    				if(s.display.orientation == 'landscape'){
    					height = s.getBlueprintSize(s.display.size.meter_height, s.display.videowall.row);
    				}else{
    					height = s.getBlueprintSize(s.display.size.meter_width, s.display.videowall.row);
    				}
    			}
    			
    			s.blueprintProp.height = height; // 171116
    			return height;
    		};
    		s.setBlueprintDpi = function(){
    			var dpi;
    			
    			if(s.unit == 'feet'){
    				dpi = s.converseToFeet(Number(s.display.size.meter_dpi));
    			}else{
    				dpi = Number(s.display.size.meter_dpi);
    			}
    			dpi = dpi.toFixed(2);
    			
    			return dpi;
    		};
    		s.getBlueprintSize = function(_size, _videowall){
    			return (_size * _videowall).toFixed(2);
    		};
    		s.getBlueprintSpace = function(_totalSize, _size){
    			return (_totalSize - _size).toFixed(2);
    		};
    		s.setBlueprintHorizonStyle = function(){
    			var size = {};
    			size.width = s.display.size.width * s.display.videowall.col;
    			size.height = (s.room.size.pixel_height - s.display.size.height) / 2 + 75; // 171020
    			return size;
    		};
    		s.setBlueprintVerticalStyle = function(){
    			var size = {};
    			size.height = s.display.size.height * s.display.videowall.row;
    			return size;
    		};
    		
    		/* 171030 :: 추가 */
    		s.getTagWStyle = function(_value){
    			var displayW = s.display.size.width * s.display.videowall.col,
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
    				top = (s.display.size.height * s.display.videowall.row - tagSize.height) / 2,
    				style = {
	    				'top' : top,
						'width' : tagSize.width,
						'height' : tagSize.height
	    			};
    			
    			return style;
    		};
    		s.getTagWSpaceStyle = function(_value, _direction){
    			var videowallW, tagSize = {}, marginLeft, style = {};
    			
    			videowallW = (692 - (s.display.size.width * s.display.videowall.col)) / 2;
    			tagSize = {
					width : getTagSize.getSize(_value).width,
					height : getTagSize.height
				};
				
				if(s.display.videowall.col > s.display.videowall.max.col){
					marginLeft = (_direction) ? (videowallW - tagSize.width) / 2 - (videowallW) : (videowallW - tagSize.width) / 2 ;
				}else{
					marginLeft = (videowallW - tagSize.width) / 2;
				}
				
				if(s.display.videowall.max.col == 1 && s.display.videowall.max.row == 1){
					if(s.setBlueprintWidth(s.display.videowall.col) > s.room.size.width){
						marginLeft = (_direction) ? (videowallW - tagSize.width) / 2 - (videowallW) : (videowallW - tagSize.width) / 2 ;
					}
				}
    			style = {
    					'margin-left' : marginLeft,
    					'width' : tagSize.width,
    					'height' : tagSize.height
				};
    			
    			return style;
    		};
    		s.getTagHSpaceStyle = function(_value, _direction){
    			var videowallH, tagSize = {}, marginTop, style = {};
    			
    			if(_value == 0){
    				style = {
    						'display' : 'none'
    				};
    			}else{
    				videowallH = (s.room.size.pixel_height - (s.display.size.height * s.display.videowall.row)) / 2;
    				tagSize = {
    					width : getTagSize.getSize(_value).width,
    					height : getTagSize.height
    				};
    				
    				if(s.room.size.pixel_height >= tagSize.height * 3){
    					marginTop = (videowallH / 2) - (tagSize.height / 2);
    					if(s.display.videowall.row > s.display.videowall.max.row && _direction == 'bottom'){
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
    						'margin-top' : marginTop,
    						'width' : tagSize.width,
    						'height' : tagSize.height
    				};
    			}
    			
    			return style;
    		};
    		/*  //171030 :: 추가 */
    		
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
    				//size = s.changeVideoSize(selectedOption.size);
    				
    				function fitVideoSize(){
    					size = {
    							width : ((s.display.size.width * s.display.videowall.col).toFixed(2) / selectedOption.size.width),
    							height : ((s.display.size.height * s.display.videowall.row).toFixed(2) / selectedOption.size.height)
    					};
    					
    					if(size.height > 1){
    						size.height = 1;
    						scaleSize.width = (ratio.height * (s.display.size.height * s.display.videowall.row)).toFixed(2);
    						size.width = (s.display.size.width * s.display.videowall.col).toFixed(2) / scaleSize.width;
    					}
    					if(size.width > 1){
    						size.width = 1;
    						scaleSize.height = (ratio.width * (s.display.size.width * s.display.videowall.col)).toFixed(2);
    						size.height = (s.display.size.height * s.display.videowall.row).toFixed(2) / scaleSize.height;
    					}
    				}
    				
    				setTimeout(function(){
    					fitVideoSize();
    					
    					angular.element('#vid').css({'transform' : 'scale(' + size.width + ',' + size.height + ')'});
    					angular.element('#vid_blueprint').css({'transform' : 'scale(' + size.width + ',' + size.height + ')'});
    				}, 100);
    				
    				fitVideoSize();
    				
    				return {
    					'transform' : 'scale(' + ((s.display.size.width * s.display.videowall.col) / size.width) + ', ' + ((s.display.size.height * s.display.videowall.row) / size.height) + ')'
    				};
    			}
    		};
    		s.changeVideoSize = function(_size){
    			var ratio = {},
    				scaleSize = {},
    				tmpSize = _size,
    				size = {};
    			
    			ratio = {
    					width : tmpSize.height / tmpSize.width,
    					height : tmpSize.width / tmpSize.height
    			};
    			
    			function fitVideoSize(){
    				size = {
    						width : ((s.display.size.width * s.display.videowall.col).toFixed(2) / tmpSize.width),
    						height : ((s.display.size.height * s.display.videowall.row).toFixed(2) / tmpSize.height)
    				};
    				
    				if(size.height > 1){
    					size.height = 1;
    					scaleSize.width = (ratio.height * (s.display.size.height * s.display.videowall.row)).toFixed(2);
    					size.width = (s.display.size.width * s.display.videowall.col).toFixed(2) / scaleSize.width;
    				}
    				
    				if(size.width > 1){
    					size.width = 1;
    					scaleSize.height = (ratio.width * (s.display.size.width * s.display.videowall.col)).toFixed(2);
    					size.height = (s.display.size.height * s.display.videowall.row).toFixed(2) / scaleSize.height;
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
//    			s.renderComplete(s.tab.view);
    		};		
    		s.resetContents = function(){
    			setTimeout(function(){    					
        			s.layer.loading.openF(s, true);
				}, 0);
    			
    			s.unit = s.tab.unit = s.model.unit = config.unit;
    			s.setUnit(s.unit);
    			
    			s.room.size.width = s.model.room.size.width = config.room.width;
    			s.room.size.height = s.model.room.size.height = config.room.height;
    			
    			s.model.display.videowall.col = s.display.videowall.col = config.videowall.col;
    			s.model.display.videowall.row = s.display.videowall.row = config.videowall.row;
    			s.changeOptsPosition();
    			
    			s.display.videowall.input_col = s.model.display.videowall.col = s.display.videowall.col = config.videowall.col;
    			s.display.videowall.input_row = s.model.display.videowall.row = s.display.videowall.row = config.videowall.row;
    			
    			s.model.display.orientation = s.display.orientation = config.orientation;
    			angular.element('.define-orientation').find('.g-select-title strong').text(s.display.orientation);
    			s.changeOrientation();
    			s.resetImgContents();
    			
    			s.display.seq = s.defaultSeq;    			
    			//s.getDisplaySpecData(config.model.seq, s.setDisplay); // s.setDisplay(model.name); // 171019
    			
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
    		s.setDiagonal = function(){
    			var w = s.blueprintProp.width, //s.setBlueprintWidth(),
    				h = s.blueprintProp.height, //s.setBlueprintHeight(),
    				wh = (Math.sqrt((w * w) + (h * h))).toFixed(2);
    			return s.converseToInch(wh);
    		};		
    		s.setWeight = function(){
    			var weight;
    			if(s.display.data != null){
//    				weight = Number(parseInt(s.display.data.MECHANICAL_SPEC_WEIGHT_SET)) * s.display.videowall.col * s.display.videowall.row;
    				weight = decimalPoint.getNum(Number(parseFloat(s.display.data.MECHANICAL_SPEC_WEIGHT_SET)) * s.display.videowall.col * s.display.videowall.row, 1);
    				return weight;
    			}
    		};
    		s.setMax = function(){
    			var max;
    			if(s.display.data != null){
//    				max = Number(parseInt(s.display.data.POWER_MAX)) * s.display.videowall.col * s.display.videowall.row;
    				max = decimalPoint.getNum(Number(parseFloat(s.display.data.POWER_MAX)) * s.display.videowall.col * s.display.videowall.row, 1);
        			return max;
    			}
    		};
    		s.setTypical = function(){
    			var typical;
    			if(s.display.data != null){
//    				typical = Number(parseInt(s.display.data.POWER_TYPICAL)) * s.display.videowall.col * s.display.videowall.row;
    				typical = decimalPoint.getNum(Number(parseFloat(s.display.data.POWER_TYPICAL)) * s.display.videowall.col * s.display.videowall.row, 1);
    				return typical;
    			}
    		};
    		s.setBTU = function(){
    			var btu = Number(parseInt(s.display.data.POWER_BTU)) * s.display.videowall.col * s.display.videowall.row;
    			var pattern = /^([0-9]*)[\.]?([0-9])?$/;
    			if(!pattern.test(btu)){
    				btu = btu.toFixed(2);
    			}
    			return btu;
    		};
    		s.getTotalDisplaysStyle = function(_hasBackImg){
    			var backcolor, backimg, top, left, width, height;
    			if(s.upload.isColor == true){
    				backcolor = config.color;
    				backimg = 'none';
    			}else{
    				backcolor = 'none';
    				backimg = (_hasBackImg == true) ?	'url('+ s.upload.contents.image + ')' : 'none';
    			}
    			
    			top = ((s.room.size.pixel_height) - (s.display.size.height * s.display.videowall.row)) / 2; //s.upload.video.position.top;
    			left = (s.const.room.pixel_width - s.display.size.width * s.display.videowall.col) / 2;
    			s.display.videowall.size.width = decimalPoint.getNum(s.display.size.width * s.display.videowall.col, 2);
    			s.display.videowall.size.height = decimalPoint.getNum(s.display.size.height * s.display.videowall.row, 2);
    			
    			return {
					'top' : top,
					'left' : left,
					'width' : s.display.videowall.size.width,
					'height' : s.display.videowall.size.height,
					'background-color' : backcolor,
					'background-image' : backimg
    			}
    		};
    		s.setPDFTitle = function(_boolean){
    			console.log('call setPDFTitle');
    			angular.element('#pdfTitle').val('');
    			if(_boolean){
    				// signin
        			s.layer.title.open = true;
        			s.layer.title.posF();
    			}else{
    				// signout
        			s.layer.signin.open = true;
        			s.layer.signin.posF();
    			}
    		};
    		s.exportToPDF = function(){
    			var title = (angular.element('#pdfTitle').val()) ? angular.element('#pdfTitle').val() : 'VIDEOWALL CONFIGURATOR',
    				
    				/* 171116 정은정 backend 지원 :: 추가 */
    				unit = (s.unit == 'feet') ? 'f'.toUpperCase() : 'm'.toUpperCase(),
    				width = s.blueprintProp.width, 
        			height = s.blueprintProp.height, 
        			modelSeq = s.display.data.SEQ, 
        			modelName = s.display.name, 
        			columns = s.display.videowall.col, 
        			rows = s.display.videowall.row, 
        			orient = s.display.orientation;
    				/*  //171116 정은정 backend 지원 :: 추가 */
    			
    			if(console)	console.log('unit :: ', unit, ' width :: ', width, ' height :: ', height, ' modelSeq :: ', modelSeq, ' modelName :: ', modelName, ' columns:: ', columns, ' rows:: ', rows, ' orient:: ', orient);
    			
    			s.upload = uploadModel.get();
    			s.layer.title.closeF();
    			angular.element('#insert_title').text(title);    			
    			
    			//20171110 member export info DB save start  
    			var memberSeq = angular.element('#memberSeq').val();    			
        		var detailReq = $http({
            		method : 'GET',
            		url : '/api/pdf/exportPc?memberSeq=' + memberSeq + '&configType=V&unit=' + unit + '&width=' + width + '&height=' + height + '&modelSeq=' + modelSeq + '&modelName=' + modelName + '&columns=' + columns + '&rows=' + rows + '&orient=' + orient
            		//url : '/api/pdf/exportPc?memberSeq=' + memberSeq + '&configType=V&unit=M&width=100m&height=50m&modelSeq=1031&modelName=UH55F-E&columns=10&rows=5&orient=landscape'
        		});
        		
        		//if(console)	console.log('detailReq='+detailReq);
        		
        		detailReq.success(function(data){
    				//if(console)	console.log('data='+data)        			
    	    	});
        		detailReq.then(function(response){}, function(response){
    				if(console)	console.log('export DB save error')
    			});
        		//20171110 member export info DB save end
    			
    			exportToPDF();
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
    		
    	});
        
        /* 171017 상수 추가 :: data 기반 변경 */
        configurator.constant('constant', {
        	data : {
        		base : '/support/videowall-configurator?method=',
        		list : 'list',
        		detail : 'detail&seq=',
        		spec : 'spec&seq='
        	}
        });
        
        /* // table -> svg로 변경되어 삭제
        configurator.directive('repeatComplete', function(){
        	return function(scope, element, attrs) {
        		if (scope.$last){
        			scope.display.videowall.repeatNum += 1;
        			if(scope.display.videowall.repeatNum >= (scope.display.videowall.row)){
        				angular.element('#loading-layer').removeClass('is-active');
        				angular.element('body').removeClass('no-scroll');
        				ssds.common.newLoadingDone(angular.element('#loading-layer .layer .loading .newLoading'));
        				scope.display.videowall.repeatNum = scope.display.videowall.row;	
        			}
        	    }
        	};
        });
        */
        
        /* 171116 custom directive 추가 */
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
        /* //171116 custom directive 추가 */
        
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
        /* 171019 */
        configurator.factory('sizeNumber', function(){
        	var arr = ['X', 'x', '*'], arrTotal = arr.length, i;
        	return {
        		getSize : function(_num){
        			var sizeArr, size = [];
        			for(i = 0; i < arrTotal; ++i){
        				if(_num.indexOf(arr[i]) != -1){
        					sizeArr = _num.split(arr[i])
        				}
        			}
        			
        			angular.forEach(sizeArr, function(value, idx){
        				size[idx] = parseFloat(value);
        			});
        			
        			return size;
        		}
        	}
        });
        configurator.factory('resolutionNumber', function(){
        	return {
        		getResolution : function(_num){
        			var resolutionArr = _num.split('*'), resolution = [], i = 0, total = 3 , tmp = resolutionArr[1].split('(');
        			if(tmp[1]){
        				resolution[0] = resolutionArr[0];
        				resolution[1] = tmp[0];
        				resolution[2] = '(' + tmp[1];
        			}else{
        				resolution = resolutionArr;
        			}
        			
        			return resolution;
        		}
        	}
        });
        /*//171019 */
        
        /* 171027 */
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
        /* //171027 */
        configurator.factory('uploadModel', function(){
        	var upload = {
        			current : 'image',
        			isColor : false,
        			contents : {video : 'Default Image', image : '/static/images/videowall_configurator/background.gif'},
        			video : {
        				position : {top : 0, left : 0},
        				list : [
        					{
        					'id' : 0,
        					'title' : 'No Image',
        					'background-color' : config.color
        					},
        					{
        						'id' : 1,
        						'title' : 'Sample Video',
        						'url' : '/static/images/videowall_configurator/big_buck_bunny.mp4',
        						'size' : {width : 640, height : 360}
        					}
        				]
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
        				//data.fileName = decodeURIComponent(data.fileName);
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
        				var frm   = angular.element('#configuratorsFrm'), options, model = {};
        				
        				model.originInfo = $parse(attrs.fileModel);
        				model.setter = model.originInfo.assign;
        				model.info = model.setter(scope, element[0].files[0]); // console.log(model.info);
        				
        				if(model.info){
        					model.type = '';
        					model.media = '';
        					model.size = 0;
        					checkFormat();
        				}
        				
        				// file format
        				function checkFormat(){
        					var type = model.info.type;
        					
        					type = type.split('/');
        					model.media = type[0];
        					model.type = type[1];
        					
        					switch(model.media){
    	    					case 'video' :
    	    						if(model.type == 'mp4'){
    	    							checkSize(model.media);
    	    						}else{
    	    							scope.layer.uploadAlert.openF(scope, 'Invalid file format! Please upload only or mp4 files.');
    	    							scope.layer.uploadAlert.posF();
    	    						}
    	    						break;
    	    						
    	    					case 'image' :
    	    						if(model.type == 'jpeg' || model.type == 'png' || model.type == 'jpg'){
    	    							checkSize(model.media);
    	    						}else{
    	    							scope.layer.uploadAlert.openF(scope, 'Invalid file format! Please upload only .jpg or .png files.');
    	    							scope.layer.uploadAlert.posF();
    	    						}
    	    						break;
    	    						
    	    					default :
    	    						break;
        					}
        				}
        				
        				// file size
        				function checkSize(_media){
        					var size = model.info.size, fileUploadTimer;
        					
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
    	    							scope.layer.uploadAlert.openF(scope, 'error!!!');
    	    							scope.layer.uploadAlert.posF();
    	    						},
    	    						success : function(data){
    	    							scope.uploadContentLayer(false);
    	    							// if(console)console.log("resultCd : " + data.resultCd
    	    							//   + ", resultMessage : " + data.resultMessage
    	    							//   + ", fileName : " + data.fileName
    	    							//   + ", fileDir : " + data.fileDir
    	    							//   + ", fileUrl : " + data.fileUrl);
    	    							
    	    							if(data.resultCd == "SUCCESS"){
    	    								//if(console)  console.log(", fileOrgName : " + data.fileOrgName + ", fileUrl : " + data.fileUrl);
    	    								uploadModel.set(uploadModel.setUploadModel(uploadModel.get(), data));
    	    								scope.upload = uploadModel.get();
    	    								if(console)  console.log('::', scope.upload);
    	    								if(scope.upload.current == "video"){
    	    									angular.element('.box-option .define-upload .opt-select .g-select-title strong').text(data.fileNameOnly);
    	    									angular.element('.box-option .define-upload .opt-select option:last').attr('selected', 'selected');
    	    								}
    	    								
    	    								setTimeout(function(){
    	    									var size = {
    	    											width : ((scope.display.size.width * scope.display.videowall.col) / scope.upload.video.list[scope.upload.video.list.length - 1].size.width),
    	    											height : ((scope.display.size.height * scope.display.videowall.row) / scope.upload.video.list[scope.upload.video.list.length - 1].size.height)
    	    									};
    	    									angular.element('.define-upload .opt-select option:last').attr('selected', 'selected');
    	    									angular.element('#vid').css({'transform' : 'scale(' + size.width + ',' + size.height + ')'});
    	    									angular.element('#vid_blueprint').css({'transform' : 'scale(' + size.width + ',' + size.height + ')'});
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
    	
    }
    return {init : init}
})(jQuery);
configuratorApp.init();
