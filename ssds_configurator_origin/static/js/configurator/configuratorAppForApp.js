/**
 * SamSung Display Solutions
 * @author rui13th@pulipinc.com
 */

var configuratorApp = (function($){
  var $choiceSection,
      $configuratorSection,
  
      introSection,
      choiceSection,
      configuratorSection,
  
      model = {
        name : 'UH55F-E'
      };
  
  configuratorSection = function(){
    var config = {
          unit : 'meter',
          room : {width : 5, height : 3},
          videowall : {row : 4, col : 4},
          orientation : 'landscape',
          image : '/static/images/videowall_configurator/background.gif',
          color : '#ffffff',
          model : {
            name : model.name
          }
        },
        configurator;
    
    configurator = angular.module('configurator', []);
    configurator.constant('constVar', {});
    configurator.controller('configuratorController', function($scope, constVar, uploadModel, $location, $document, decimalPoint){
      var s      = $scope,
          $body  = angular.element('body'),
          $popup = angular.element('.ly-configurator');
      
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
    	  if(s.unit != 'meter'){
    		  num =  s.converseToMeter(_num);
    	  }
    	  
    	  num2 = parseFloat((num * 39.3700)); // .toPrecision(2)
    	  inchNum = decimalPoint.getNum(num2, 2);
    	  return inchNum;
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
            	console.log(s.converseToFeet(s.room.size.width))
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
      s.changeRoom = function(_changeH){
        s.room.size.pixel_height = s.model.room.size.pixel_height = (s.room.size.height * s.const.room.pixel_width) / s.room.size.width;
        if(_changeH == undefined)  s.changePerson();
        s.resizeDisplay();
      };

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
      s.changePerson = function(){
        var roomH = (s.unit == 'feet') ? s.converseToMeter(s.room.size.height) : s.room.size.height, personH = (s.room.size.pixel_height * s.const.person.meter_height) / roomH;
        s.person.size.width = s.const.person.ratio * personH;
        s.person.position.bottom = -s.const.room.pixel_bottom + (personH / 20);
      };
      s.getChooseDisplayLayer = function(_boolean){
        s.layer.choose.open = _boolean;
        if(s.layer.choose.open){
          $body.addClass('no-scroll');
        }
        else{
          $body.removeClass('no-scroll');
          s.display.name = s.model.display.name;
        }
      };
      s.getChooseDisplay = function(_modelName){
        s.layer.choose.name = _modelName;
      };
      s.setChooseDisplay = function(_modelName){
        s.getChooseDisplayLayer(false);
        s.setDisplay(_modelName);
      };
      s.setDisplay = function(_modelName, _selector){ // choose new display
        if(_selector != undefined){
          s.closeHelp();
          s.setTab(2);
        }
        s.layer.choose.name = s.display.name = s.model.display.name = _modelName;
        s.display.data = s.model.display.data = s.data[_modelName];
        s.display.size = {
          meter_width : s.model.display.data.choose.dimension.width * 0.001,
          meter_height : s.model.display.data.choose.dimension.height * 0.001
        }; // milli -> m
        s.model.display.size = {meter_width : s.display.size.meter_width, meter_height : s.display.size.meter_height}; // milli -> m
        s.display.ratio = s.model.display.ratio = s.model.display.size.meter_height / s.model.display.size.meter_width;
        angular.element('.model_tag').text(s.display.name);
        
        s.resizeDisplay('_setDisplay');
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
        if(_setDisplay){ // choose new display
          if(s.display.orientation == 'portrait'){
            s.display.size.width = s.model.display.size.height;
            s.display.size.height = s.model.display.size.width;
          }
        }
        s.getMaxVideowall();
        
        s.model.display.videowall.col = s.display.videowall.input_col = s.display.videowall.col;
        s.model.display.videowall.row = s.display.videowall.input_row = s.display.videowall.row;
        
        s.setVideowall();
        s.changeOptsPosition();
      };
      
      s.changeCol = function(_num){
    	  var col,
    	  	input_col = Number(s.display.videowall.input_col);

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
      
      s.getRepeatNum = function(_num){
        return new Array(_num);
      };
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
      s.getMaxVideowall = function(){
        s.display.videowall.max.col = s.model.display.videowall.max.col = Math.floor(s.const.room.pixel_width / s.display.size.width);
        s.display.videowall.max.row = s.model.display.videowall.max.row = Math.floor(s.room.size.pixel_height / s.display.size.height);
      };
      s.setVideowall = function(){
    	  
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
        
        return height;
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
        size.height = (s.room.size.pixel_height - s.display.size.height) / 2 + 55;
        return size;
      };
      s.setBlueprintVerticalStyle = function(){
        var size = {};
        size.height = s.display.size.height * s.display.videowall.row;
        return size;
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
        s.upload.video.position.top = ((s.room.size.pixel_height - (s.display.size.height * s.display.videowall.row)) / 2);
        s.upload.video.position.left = ((s.const.room.pixel_width - s.display.size.width * s.display.videowall.col) / 2);
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
        // s.renderComplete(s.tab.view);
      };
      s.resetContents = function(){
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
    	  
    	  s.setDisplay(model.name);    	    	  
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
      s.setDiagonal = function(){
			var w = s.setBlueprintWidth(),
				h = s.setBlueprintHeight(),
				wh = (Math.sqrt((w * w) + (h * h))).toFixed(2);
			return s.converseToInch(wh);
      };
      s.setWeight = function(){
    	  var weight = Number(s.display.data.choose.weight) *  s.display.videowall.col * s.display.videowall.row;
    	  return weight;
      };
      s.setMax = function(){
    	  var max = Number(s.display.data.choose.powerConsumptionMax) *  s.display.videowall.col * s.display.videowall.row;
    	  return max;
      };
      s.setTypical = function(){
    	  var typical = Number(s.display.data.power.powerConsumption.Typical) *  s.display.videowall.col * s.display.videowall.row;
    	  return typical;
      };
      s.setBTU = function(){
    	  var btu = Number(s.display.data.power.powerConsumption.BTU) *  s.display.videowall.col * s.display.videowall.row;
    	  return btu;
      };
      s.getTotalDisplaysStyle = function(_hasBackImg){
    	  var backcolor, backimg, style;
    	  if(s.upload.isColor == true){
    		  backcolor = config.color;
    		  backimg = 'none';
    	  }else{
    		  backcolor = 'none';
    		  backimg = (_hasBackImg == true) ?	'url('+ s.upload.contents.image + ')' : 'none';
    	  }
    	  
    	  style = {
    			  'top' : ((s.room.size.pixel_height) - (s.display.size.height * s.display.videowall.row)) / 2,//s.upload.video.position.top,
    			  'left' : (s.const.room.pixel_width - s.display.size.width * s.display.videowall.col) / 2,
    			  'width' : s.display.size.width * s.display.videowall.col,
    			  'height' : s.display.size.height * s.display.videowall.row,
    			  'background-color' : backcolor,
    			  'background-image' : backimg
			};
			return style;
      };
      s.setPDFTitle = function(){
    	  angular.element('#pdfTitle').val('');
    	  s.layer.title.open = true;
    	  s.layer.title.posF(); 
      };
      s.exportToPDF = function(){
    	  s.upload = uploadModel.get();
    	  s.layer.title.closeF();
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
      s.init = function(){
        s.changeRoom();
        s.setDisplay(s.display.name);
      };
      s.setVar = function(){
        s.data = configuratorData; // origin data
        s.host = ($location.host()).substr(4, 3); // dev, stg, real each url different link //real link
        if(s.host != 'dev' && s.host != 'stg'){
          s.host = 'real';
        }
        s.unit = config.unit; // 'feet' or 'meter'
        s.tab = {opts : 1, view : 2, unit : config.unit}; // opts : wall size, choose model, display layout, orientation, upload content / view : blueprint, render / unit : feet, meter
        s.scrollTop = angular.element('#header').outerHeight(true) + angular.element('.h-page').outerHeight(true) - angular.element('#nav-local').outerHeight(true) - angular.element('#nav-local').outerHeight(true);
        s.videoW = 0;
        s.videoH = 0;
        
        /* define constant */
        s.const = {};
        s.const.room = {
          maxSize : {meter_width : 20, meter_height : 20},
          minSize : {meter_width : 2, meter_height : 2},
          pixel_width : 692,
          pixel_bottom : 95
        };
        s.const.room.maxSize.feet_width = s.converseToFeet(s.const.room.maxSize.meter_width);
        s.const.room.maxSize.feet_height = s.converseToFeet(s.const.room.maxSize.meter_height);
        s.const.room.minSize.feet_width = s.converseToFeet(s.const.room.minSize.meter_width);
        s.const.room.minSize.feet_height = s.converseToFeet(s.const.room.minSize.meter_height);
        s.const.person = {meter_height : 1.83, ratio : (119 / 361)};
        
        /* internal variable :: save value when change display name :: storage */
        s.model = {
          room : {size : {width : config.room.width, height : config.room.height, pixel_height : 0}},
          display : {
            name : model.name,
            data : s.data[model.name],
            size : {},
            orientation : 'landscape',
            
            videowall : {size : {}, col : config.videowall.col, row : config.videowall.row, input_col : config.videowall.col, input_row : config.videowall.row, max : {}, repeatNum : 0, timer : {col:null, row:null}}
          }
        };
        
        /* about room :: view binding */
        s.room = {
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
        
        /* about display in the room :: view binding */
        s.display = {
          name : s.model.display.name,
          data : s.model.display.data,
          orientation : s.model.display.orientation,
          size : s.model.display.size,
          videowall : s.model.display.videowall
        };
        
        /* about person in the room :: view binding */
        s.person = {size : {}, position : {}};
        
        /* about layer popup :: view binding */
        s.layer = {
          choose : {open : false, name : s.model.display.name},
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
          },
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
          }
        };
        
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
        
        s.init();
      };
      s.setVar();
    });
    
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
    
    configurator.factory('uploadModel', function(){
      var upload = {
        current : 'image',
        isColor : false,
        contents : {video : 'Default Image', image : '/static/images/videowall_configurator/background.gif'},
        video : {
          position : {top : 0, left : 0},
          list : [{
				'id' : 0,
				'title' : 'No Image',
				'background-color' : config.color
			},{
            'id' : 1,
            'title' : 'Sample Video',
            'url' : '/static/images/videowall_configurator/big_buck_bunny.mp4',
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
            console.log(_oldData)
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
                  scope.layer.uploadAlert.openF(scope, 'error!!!');
                  scope.layer.uploadAlert.posF();
                },
                success : function(data){
                  scope.uploadContentLayer(false);
                  
                  if(data.resultCd == "SUCCESS"){
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
                  }else if(data.resultCd == "IMAGE_BYTE"){
                  }else if(data.resultCd == "VIDEO_BYTE"){
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
    
    function init(_selector){
      //angular.element('#model-tag').scope().setDisplay(model.name, _selector);
      //angular.element('#blueprint_btn').triggerHandler('click');
    }
    
    return {init : init}
  };
  
  choiceSection = (function(){
    var o_data               = {},
    
        a_selectModel        = [],
    
        step                 = 0,
        a_sequenceHistory    = [{
          'stepTitle' : 'hour',
          'stepBtns' : ['16', '24']
        }],
        o_filterData         = {},
        o_tempData           = {},
        o_dataFrame,
        className            = {
          blind : 'no-see'
        },
    
        common               = {
          toUpperTxt : function(_txt){
            var txt = _txt.toUpperCase();
        
            return txt;
          },
      
          toLowerTxt : function(_txt){
            var txt = _txt.toLowerCase();
        
            return txt;
          }
        },
    
        $questionBox,
        $questionBoxSelector = {};
    
    function getSelector(){
      $questionBox = $('#question-box');
      
      $questionBoxSelector = {
        btn : $questionBox.find('.question-btn'),
        img : $questionBox.find('.question-img img'),
        title : $questionBox.find('.question-title'),
        txt : $questionBox.find('.question-txt'),
        back : $questionBox.find('.question-back')
      };
      
      init();
    }
    
    function init(_reset){
      if(_reset)  step = 0;
      
      o_data = o_filterData = configuratorData;
      o_dataFrame = configuratorFrameData;
      
      model.name = 'UH55F-E';
      model.data = o_filterData[model.name];
      
      changeView(step, a_sequenceHistory[step].stepTitle);
      
      a_selectModel[step] = o_tempData = o_filterData;
      
      o_filterData = {};
      o_filterData = o_tempData;
      o_tempData = {};
    }
    
    function changeView(_step, _stepTitle){
      var data     = o_dataFrame[_stepTitle](a_sequenceHistory[_step]),
          btnProp  = {
            i : 0,
            total : data.btns.length,
            node : $questionBoxSelector.btn.find('li').eq(0).clone()
          },
          backward = '',
          imgName;
      
      (_step != 0) ? $questionBoxSelector.back.removeClass(className.blind) : $questionBoxSelector.back.addClass(className.blind);
      if(data.backward)  backward = data.backward;
      
      $questionBoxSelector.btn.find('li').remove();
      for(; btnProp.i < btnProp.total; ++btnProp.i){
        var node = btnProp.node.clone();
        node.find('a i').html(data.btns[btnProp.i] + backward);
        node.find('a i').attr({'data-value' : data.btns[btnProp.i]});
        
        switch(_stepTitle){
          case 'bezel' :
            imgName = '/static/images/tools/' + _stepTitle + '_' + parseFloat(data.btns[btnProp.i]) + '.gif';
            break;
          
          case 'choiceModel' :
            imgName = o_data[data.btns[btnProp.i]].choose.img;
            break;
          
          default :
            imgName = '/static/images/tools/' + _stepTitle + '_' + data.btns[btnProp.i] + '.gif';
            break;
        }
        
        node.find('a img').attr({'src' : imgName});
        $questionBoxSelector.btn.append(node);
      }
      
      $questionBoxSelector.img.attr('src', data.img);
      
      $questionBoxSelector.title.html(data.title);
      
      if(data.txt != undefined){
        $questionBoxSelector.txt.html(data.txt);
      }else{
        $questionBoxSelector.txt.empty();
      }
    }
    
    function getData(_filterData, _selectStep, _step){
      var filData = _filterData,
          selStep = _selectStep,
          step    = _step,
          tmpData = {},
          i,
          ii;
      
      for(i in filData){
        for(ii in filData[i].sequence[step]){
          if(filData[i].sequence[_step][ii] == selStep){
            tmpData[i] = filData[i];
          }
        }
      }
      
      filData = {};
      filData = tmpData;
      tmpData = {};
      
      return filData;
    }
    
    function getSequence(_step, _filterData){
      var step    = _step,
          filData = _filterData,
      
          stepTitle,
          btns    = [],
      
          i;
      
      for(i in filData){
        a_selectModel[step] = {};
        if(filData[i]['sequence'].length <= step){
          stepTitle = 'choiceModel';
          btns.push(i);
        }else{
          checkRepeat();
        }
      }
      
      function checkRepeat(){
        var i,
            ii,
            tmpBtn,
            tmpFlag,
            btnTotal,
            count = 0;
        
        for(i in filData){
          a_selectModel[step] = filData;
          selModel = filData;
          for(ii in o_filterData[i].sequence[step]){
            if(stepTitle != ii)  stepTitle = ii;
            
            btnTotal = btns.length;
            tmpBtn = filData[i].sequence[step][ii];
            if(btnTotal == 0){
              btns.push(tmpBtn);
            }else{
              for(b = 0; b < btnTotal; b++){
                if(btns[b] == tmpBtn){
                  tmpFlag = true;
                  count += 1;
                  continue;
                }else{
                  tmpFlag = false;
                }
              }
              if(tmpFlag == false && count == 0){
                btns.push(tmpBtn);
                tmpFlag = null;
              }
              count = 0;
            }
          }
        }
      }
      
      return {
        'stepTitle' : stepTitle,
        'stepBtns' : sortBtns(btns)
      }
    }
    
    function nextStep(_this){
      var selectStep = $(_this).find('i').data('value'),
          i;
      
      if(selectStep != 'YES'){
        o_filterData = a_selectModel[step];
        
        if(Object.keys(a_selectModel[step]).length == 0){
          o_filterData[selectStep] = configuratorData[selectStep];
        }else{
          o_filterData = getData(o_filterData, selectStep, step);
        }
        
        if(Object.keys(o_filterData).length == 1){
          goConfigurator();
        }else{
          step = addStep(step);
          a_sequenceHistory[step] = getSequence(step, o_filterData);
          changeView(step, a_sequenceHistory[step].stepTitle);
        }
      }else{
        goConfigurator();
      }
    }
    
    function sortBtns(_btns){
      var btns = _btns.sort(compare);
      
      function compare(a, b){
        var a, b;
        
        if(!isNaN(a) && !isNaN(b)) return a - b;
        a = a.toString();
        b = b.toString();
        return (a < b) ? -1 : (a == b) ? 0 : 1;   // ?�는,  return a.localeCompare ( b );
      }
      
      return btns;
    }
    
    function addStep(_step){
      _step += 1;
      
      return _step;
    }
    
    function subtractStep(_step){
      _step -= 1;
      if(_step <= 0)  _step = 0;
      
      return _step;
    }
    
    function prevStep(){
      if(step != 0){
        a_selectModel[step] = {};
        step = subtractStep(step);
        changeView(step, a_sequenceHistory[step].stepTitle);
      }
    }
    
    function goConfigurator(){
      var i;
      
      $choiceSection.addClass('no-see');
      $configuratorSection.removeClass('no-see');
      
      if(Object.keys(o_filterData).length == 1){
        for(var i in o_filterData){
          model.name = i;
          model.data = o_filterData[i];
        }
      }
      
      configuratorSection().init('videowall-selector');
    }
    
    return {
      getSelector : getSelector,
      nextStep : nextStep,
      prevStep : prevStep
    }
  })();
  
  introSection = (function(){
    function start(_noQuestion){
      $configuratorSection = $('.support-tools-configurator');
      
      if(_noQuestion){
        o_data = configuratorData;
        
        $configuratorSection.removeClass('blind');
        
        model.name = 'UH55F-E';
        model.data = o_data['UH55F-E'];
        
        configuratorSection().init();
      }else{
        $choiceSection = $('#question-box');
        $choiceSection.removeClass('blind');
        
        choiceSection.getSelector();
      }
    }
    
    function init(){
      var timer;
      configuratorSection();
      
      if(!$('#question-box').length){
        timer = setTimeout(noQuestion, 500);
        
        function noQuestion(){
          start('noQuestion');
        }
      }else{
        start();
      }
    }
    
    return {
      init : init
    }
  })()
  
  return {
    introSection : introSection,
    choiceSection : choiceSection
  }
})(jQuery);

configuratorApp.introSection.init();
