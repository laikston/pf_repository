/**
 * SamSung Display Solutions
 * @author rui13th@pulipinc.com
 */

var startTool,
    startToolFrameData = {
      environment : function(_obj){
        var prop = {
          'img' : '/static/images/tools/img_environment.gif',
          'title' : 'For which environment you need your screen?',
          'btns' : _obj.stepBtns
        };
        return prop;
      },
  
      hour : function(_obj){
        var prop = {
          'img' : '/static/images/tools/img_hour.gif',
          'title' : 'How many hours per day will be on?',
          'btns' : _obj.stepBtns
        };
        return prop;
      },
  
      smartsignage : function(_obj){
        var prop = {
          'img' : '/static/images/tools/img_videowall.gif',
          'title' : 'Select the type of SMART Signage?',
          'btns' : _obj.stepBtns
        };
        return prop;
      },
  
      outdoorsignage : function(_obj){
        var prop = {
          'img' : '/static/images/tools/img_outdoor.gif',
          'title' : 'Select the type of Outdoor Signage?',
          'btns' : _obj.stepBtns
        };
        return prop;
      },
  
      outdoorsignage_detail : function(_obj){ //
        var prop = {
          'img' : '/static/images/tools/img_outdoor.gif',
          'title' : 'Select the type of Outdoor Signage?',
          'btns' : _obj.stepBtns,
          'btnCopy' : [ , '(*for customized use)']
        };
        return prop;
      },
  
      size : function(_obj){
        var prop = {
          'img' : '/static/images/tools/img_size.gif',
          'title' : 'Select the size of the screen',
          'backward' : '"',
          'btns' : _obj.stepBtns,
        };
        return prop;
      },
  
      brightness : function(_obj){
        var prop = {
          'img' : '/static/images/tools/img_brightness.gif',
          'title' : 'Select the brightness level',
          'backward' : ' nit',
          'btns' : _obj.stepBtns,
        };
        return prop;
      },
  
      bezel : function(_obj){
        var prop = {
          'img' : '/static/images/tools/img_bezel.gif',
          'title' : 'Select the bezel width',
          'btns' : _obj.stepBtns,
        };
        return prop;
      },
  
      choiceModel : function(_obj){
        var prop = {
          'img' : '/static/images/tools/img_products.gif',
          'title' : 'Select Products',
          'btns' : _obj.stepBtns,
        };
        return prop;
      }
    };

startTool = angular.module('startTool', ['ngRoute']);
startTool.config(function($routeProvider){
  $routeProvider.when('/startTool-index', {
    templateUrl : '/static/route/startTool.html'
  }).when('/smartchoice-spec', {
    templateUrl : '/static/route/smartChoiceSpec.html'
  }).when('/smartchoice-detail', {
    templateUrl : '/static/route/smartChoiceDetail.html'
  }).otherwise({redirectTo : '/startTool-index'});
});

startTool.controller('startToolController', function($scope){
  var o_data               = {},
      a_selectModel        = [],
  
      step                 = 0,
      a_sequenceHistory    = [{
        'stepTitle' : 'environment',
        'stepBtns' : ['INDOOR', 'OUTDOOR']
      }],
      o_filterData         = {},
      o_tempData           = {},
      o_dataFrame,
  
      model,
      $questionBox         = angular.element('#question-box'),
      $questionBoxSelector = {
        btn : $questionBox.find('.question-btn'),
        img : $questionBox.find('.question-img img'),
        title : $questionBox.find('.question-title'),
        txt : $questionBox.find('.question-txt'),
        back : $questionBox.find('.question-back')
      },
  
      stepTitle,
  
      smartsignage         = {
        'STANDALONE' : 0,
        'VIDEOWALL' : 1,
        'Interactive' : 2
      },
      outdoorsignage       = {
        'FULL OUTDOOR' : 0,
        'SEMI OUTDOOR' : 1
      },
      outdoorsignage_detail       = {
        'COMPLETE-PRODUCT' : 0,
        'KIT TYPE' : 1
      };
  
  function init(_reset){
    if(_reset)  step = 0;
    
    $scope.data = {};
    
    o_data = o_filterData = startToolData;
    o_dataFrame = startToolFrameData;
    
    changeView(step, a_sequenceHistory[step].stepTitle);
    
    a_selectModel[step] = o_tempData = o_filterData;
    
    o_filterData = {};
    o_filterData = o_tempData;
    o_tempData = {};
    
    ssds.common.addEvent.callEvent('resize', resizeIcon);
  }
  
  function resizeIcon(){
    if(ssds.common.byDeviceWidth().type == 'mobile'){
      $questionBoxSelector.btn.find('li').each(function(){
        if(stepTitle == 'choiceModel'){
          $(this).find('img').css(common.prodSize.mobile);
        }else{
          $(this).find('img').css(common.iconSize.mobile);
        }
      });
    }else{
      $questionBoxSelector.btn.find('li').each(function(){
        if(stepTitle == 'choiceModel'){
          $(this).find('img').css(common.prodSize.pc);
        }else{
          $(this).find('img').css(common.iconSize.pc);
        }
      });
    }
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
    
    stepTitle = _stepTitle;
    $scope.data.btnProp = [];
    
    (_step != 0) ? $questionBoxSelector.back.removeClass(common.className.blind) : $questionBoxSelector.back.addClass(common.className.blind);
    //if(data.backward)  backward = data.backward;
    
    $questionBoxSelector.btn.find('li').remove();
    for(; btnProp.i < btnProp.total; ++btnProp.i){
      // var node = btnProp.node.clone();
      // node.find('a i').html(data.btns[btnProp.i] + backward);
      // node.find('a i').attr({'data-value' : data.btns[btnProp.i]});
      // if(ssds.common.byDeviceWidth().type == 'mobile'){
      //   node.find('a img').css(common.iconSize.mobile); //ng-style
      // }else{ // pc
      //   node.find('a img').css(common.iconSize.pc);
      // }
      
      switch(_stepTitle){
        case 'bezel' :
          imgName = '/static/images/tools/' + _stepTitle + '_' + parseFloat(data.btns[btnProp.i]) + '.gif';
          break;
        
        case 'choiceModel' :
          imgName = o_data[data.btns[btnProp.i]].spec.bigImg;
          
          // if(ssds.common.byDeviceWidth().type == 'mobile'){ // style 따로 설정
          //   node.find('a img').css(common.prodSize.mobile);
          // }else{ // pc
          //   node.find('a img').css(common.prodSize.pc);
          // }
          break;
        
        default :
          imgName = '/static/images/tools/' + _stepTitle + '_' + data.btns[btnProp.i] + '.gif';
          break;
      }
      
      /* $scope에 바인딩 하기 */
      $scope.data.img = data.img;
      $scope.data.title = data.title;
      (data.backward) ? $scope.data.backward = data.backward : $scope.data.backward = '';
      $scope.data.btnProp[btnProp.i] = {
        btn : data.btns[btnProp.i],
        img : imgName
      };
      if(data.btnCopy) $scope.data.btnProp[btnProp.i].btnCopy = data.btnCopy[btnProp.i];
      
      // node.find('a img').attr({'src' : imgName});
      // $questionBoxSelector.btn.append(node);
      $questionBoxSelector.btn.children('li').removeClass(common.className.isOn);
    }
    // $questionBoxSelector.img.attr('src', data.img);
    /* when .gif */
    // $questionBoxSelector.img.bind({ // when .gif image format
    // 'load' : function(){
    // $(this).removeClass(common.className.blind);
    // $(this).unbind('load');
    // }
    // });
    
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
        selModel,
    
        stepTitle,
        btns    = [],
        tmpBtns,
    
        i;
    
    for(i in filData){
      a_selectModel[step] = {};
      // console.log(filData[i]['sequence'])
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
          if(stepTitle != ii)  stepTitle = ii;//stepTitle 戮묎린
          
          btnTotal = btns.length;
          
          tmpBtn = filData[i].sequence[step][ii];
          if(btnTotal == 0){
            btns.push(tmpBtn);
          }else{
            for(var b = 0; b < btnTotal; b++){
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
    
    switch(stepTitle){
      case 'smartsignage':
        tmpBtns = [];
        for(var i = 0; i < btns.length; ++i){
          for(var idx in smartsignage){
            if(idx == btns[i]){
              tmpBtns[smartsignage[idx]] = idx;
            }
          }
        }
        break;
      
      case 'outdoorsignage':
        tmpBtns = [];
        
        for(var i = 0; i < btns.length; ++i){
          for(var idx in outdoorsignage){
            // console.log(idx, outdoorsignage[idx], btns[i]);
            if(idx == btns[i]){
              //tmpBtns[outdoorsignage[idx]] = idx;
              tmpBtns.push(idx)
            }
          }
        }
        break;
      
      default :
        break;
    }
    
    return {
      'stepTitle' : stepTitle,
      'stepBtns' : (tmpBtns == undefined) ? sortBtns(btns) : tmpBtns
    }
  }
  
  function sortBtns(_btns){
    var btns = _btns.sort(compare);
    
    function compare(a, b){
      var a, b;
      
      if(!isNaN(a) && !isNaN(b)) return a - b;
      a = a.toString();
      b = b.toString();
      return (a < b) ? -1 : (a == b) ? 0 : 1;   // 또는,  return a.localeCompare ( b );
    }
    
    return btns;
  }
 
  function gotoSpec(_this){
    //
    // for(i in o_filterData){
    //   model = i;
    //   $questionBox.addClass(common.className.blind);
    //   $modelSpecBox.removeClass(common.className.blind);
    //
    //   modelSpecController.init(model);
    // }
    // changeView(step, a_sequenceHistory[step].stepTitle, 'isSpec');
    for(var i in o_filterData){
      smartChoiceProp.model = i;
    }
    
    smartChoiceController.spec(_this);
  }
  
  function prevStep(){
    ga_behavior_event('Support-SMART_Choice', 'Support-SMART_Choice_Click', 'support-smart_choice-[' + a_sequenceHistory[step].stepTitle + '][BACK]_btn'); // google analytics
    if(step != 0){
      a_selectModel[step] = {};
      step = subtractStep(step);
      changeView(step, a_sequenceHistory[step].stepTitle);
    }
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
  
  $scope.setChoiceModelStyle = function(){
    var size;
  
    //when 'choiceModel', set image size
    if(stepTitle == 'choiceModel'){
      if(ssds.common.byDeviceWidth().type == 'mobile'){
        size = common.prodSize.mobile;
      }else{ // pc
        size = common.prodSize.pc;
      }
    }
    
    return size;
  }
  
  init();
  
  $scope.nextStep = function(){
    var selectStep = this.obj.btn,//angular.element(_this).find('i').data('value'),//$(_this).text().split('"')[0]
        selector,
        i,
        prevTitle  = o_dataFrame[a_sequenceHistory[step].stepTitle](a_sequenceHistory[step]).title;//google analytics
  
    o_filterData = a_selectModel[step];
  
    if(Object.keys(a_selectModel[step]).length == 0){
      o_filterData[selectStep] = startToolData[selectStep];
      gotoSpec(this);
    }else{
      o_filterData = getData(o_filterData, selectStep, step);
    }
  
    if(Object.keys(o_filterData).length == 1){
      gotoSpec(this);
    }else{
      step = addStep(step);
      a_sequenceHistory[step] = getSequence(step, o_filterData);
      changeView(step, a_sequenceHistory[step].stepTitle);
    }
    ga_behavior_event('Support-SMART_Choice', 'Support-SMART_Choice_Click', 'support-smart_choice-[' + prevTitle + '][' + selectStep + ']_btn'); // google analytics
    
  };
  
  $scope.prevStep = function(){
    prevStep();
  };
});

startTool.controller('smartchoiceSpecController', function($scope){
  if(smartChoiceProp.model == ''){
    location.href = "/support/tools/smart-choice/start-tool";
  }else{
    angular.element('#model-spec-box').removeClass(common.className.blind);
    smartChoiceController.rootSpecController();
    
    $scope.goMoreSpec = function(){
      location.href = "#/smartchoice-detail";
      smartChoiceController.detail();
      $("html, body").scrollTop(0);
      $('#header').removeAttr('style');
    };
    
    $scope.goAdvancedIndex = function(){
      smartChoiceController.reset(smartChoiceProp.toolName);
      $("html, body").scrollTop(0);
      $('#header').removeAttr('style');
    };
  }
});

startTool.controller('smartchoiceDetailController', function($scope){
  if(smartChoiceProp.model == ''){
    location.href = "/support/tools/smart-choice/start-tool";
  }else{
    $('#model-detail-box').removeClass(common.className.blind);
    smartChoiceController.rootDetailController();
    
    $scope.goAdvancedIndex = function(){
      smartChoiceController.reset(smartChoiceProp.toolName);
      $("html, body").scrollTop(0);
      $('#header').removeAttr('style');
    };
  }
});
