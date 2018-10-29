var advancedTool = angular.module('advancedTool', ['ngRoute']);

advancedTool.config(function($routeProvider){
  $routeProvider.when('/advancedTool-index', {
    templateUrl : '/static/route/advancedTool.html'
  }).when('/smartchoice-spec', {
    templateUrl : '/static/route/smartChoiceSpec.html'
  }).when('/smartchoice-detail', {
    templateUrl : '/static/route/smartChoiceDetail.html'
  }).otherwise({redirectTo : '/advancedTool-index'});
});

advancedTool.controller('advancedToolController', function($scope){
  var $advanceBox        = angular.element('.advanced-box'), /*필터링 옵션 폼 관련*/
      $searchBox         = $advanceBox.find('.list-filter'),
      $searchOptionBox   = $searchBox.children('li.item-box'),
  
      $advancedResultBox = angular.element('.advanced-result'), /*필터링 결과 키워드 관련*/
      $result            = $advancedResultBox.find('.g-result .view i'),
      $keywordBox        = $advancedResultBox.find('.selected-opt'),
      $keywordTxt        = $keywordBox.find('em'),
      keywordTag         = $keywordTxt.clone(),
      $noDataScreen      = $advancedResultBox.find('.g-list-aticle').eq(0),
      $noOptionScreen    = $advancedResultBox.find('.g-list-aticle').eq(1),
  
      $productList       = $advancedResultBox.find('.advanced-list-box .advanced-list'), /*필터링 결과 상품 리스트 관련*/
      productTag         = $productList.find('li').clone(),
  
      o_searchData       = {}, //o_data에서 search 데이터만 담기 // o_data는 전체 데이터
  
      a_itemKey          = [],
  
      a_DEFAULT_KEYWORD  = [],
      a_DEFAULT_VALUE    = [],
  
      a_keyword          = [], // 선택된 옵션값 뷰단에 뿌릴 키워드
      a_value            = [], // 선택된 옵션의 밸류값 필터링에 이용
      a_total            = [],
  
      o_select           = {},
  
      o_sizeProp         = {
        DEFAULT_TXT : 'SIZE ',
        count : 0
      },
  
      model,
      isInit             = true,
      o_filterData       = [],
      
      currentItem;
  
  function getFrontPhrase($this){
    var phrase = $this.parents('.item-box').data('front-phrase');
    
    if(phrase == ''){
      phrase = $this.parent().data('front-phrase');
      
      if(phrase == '' || phrase == undefined)  phrase = '';
    }
    phrase += '';
    
    return common.toUpperTxt(phrase);
  }
  
  function getBackPhrase($this){
    var phrase = $this.parents('.item-box').data('back-phrase');
    
    if(phrase == '' || phrase == undefined)  phrase = '';
    
    phrase += '';
    
    return common.toUpperTxt(phrase);
  }
  
  function getKeyword(_formtype, _options){
    var formtype = _formtype,
        options  = _options,
        keyword  = '';
    
    switch(formtype){
      case 'select' :
        switch(options.item){
          case 'Resolution' :
            keyword = (options.value != 'any') ? common.toUpperTxt(options.value) + ' ' + common.toUpperTxt(options.phrase.back) : null;
            break;
          
          case 'Brightness' :
            keyword = (options.value != 'any') ? common.toUpperTxt(options.value) + ' ' + common.toUpperTxt(options.phrase.back) : null;
            break;
          
          default :
            break;
        }
        break;
      
      case 'checkbox' :
        switch(options.item){
          case 'Size' :
            keyword = options.value + options.phrase.back;
            break;
          
          case 'Operation time' :
            keyword = options.value + ' ' + options.phrase.back;
            break;
          
          case 'Environment' :
            keyword = options.phrase.front + ' ' + common.toUpperTxt(options.value) + options.phrase.back;
            break;
          
          case 'Touch overlay' :
            keyword = (options.value == 'yes') ? common.toUpperTxt(options.item) + ' ' + options.phrase.back : options.phrase.front + ' ' + common.toUpperTxt(options.item);
            break;
          
          case 'LED' :
            keyword = common.toUpperTxt(options.item) + ' ' + common.toUpperTxt(options.value);
            break;
          
          case 'Storage' :
            keyword = common.toUpperTxt(options.value) + ' ' + options.phrase.back;
            break;
          
          default :
            if(options.item == 'Display port' || options.item == 'Tuner' || options.item == 'Internal player'){
              keyword = options.phrase.front + ' ' + common.toUpperTxt(options.item);
            }
            break;
        }
        break;
      
      default :
        break;
    }
    
    return keyword;
  }
  
  function setDefault(){
    var $       = angular.element,
        keyword,
    
        value,
        item,
        phrase  = {},
    
        options = {};
    
    $searchOptionBox.each(function(_boxNum){
      var $this = $(this);
      
      if($(this).attr('data-item') == undefined)  $(this).attr({'data-item' : $(this).find('.pc-title').text()});
      
      a_DEFAULT_VALUE[_boxNum] = [];
      a_DEFAULT_KEYWORD[_boxNum] = [];
      a_keyword[_boxNum] = [];
      a_value[_boxNum] = [];
      a_itemKey[_boxNum] = common.toCamelTxt($(this).find('.pc-title').text());
      
      if($(this).find('select').length){
        item = $(this).data('item');
        
        phrase = {
          front : getFrontPhrase($(this).find('select')),
          back : getBackPhrase($(this).find('select'))
        };
        
        $(this).find('select option').each(function(_optionNum){
          value = $(this).val();
          options = {
            value : value,
            item : item,
            phrase : phrase
          };
          
          a_DEFAULT_VALUE[_boxNum][_optionNum] = value;
          a_DEFAULT_KEYWORD[_boxNum][_optionNum] = getKeyword('select', options);
        });
        a_keyword[_boxNum][0] = a_value[_boxNum][0] = null;
        a_total[_boxNum] = $(this).find('select').length;
        
        // ssds.common.addEvent.callEvent('resize', resizeSelectBox);
        // function resizeSelectBox(){
        //   $this.css({width : 100 + '%'});
        //   $this.find('.g-select-title').css({width : 100 + '%'});
        // }
      }
      
      if($(this).children('ul').length){
        item = $(this).data('item');
        
        $(this).children('ul').children('li').each(function(_optionNum){
          var $checkbox = $(this).find('input[type=checkbox]');
          value = $checkbox.val();
          phrase = {
            front : getFrontPhrase($checkbox),
            back : getBackPhrase($checkbox)
          };
          options = {
            value : value,
            item : item,
            phrase : phrase
          };
          
          a_DEFAULT_VALUE[_boxNum][_optionNum] = value;
          a_DEFAULT_KEYWORD[_boxNum][_optionNum] = getKeyword('checkbox', options);
          a_keyword[_boxNum][_optionNum] = a_value[_boxNum][_optionNum] = null;
          
          if($(this).find('input').prop('checked'))  $(this).find('input').prop('checked', false);
        });
        a_total[_boxNum] = $(this).children('ul').children('li').length;
      }
    });
  }
  
  function addEvent(){
    var data;
    
    $searchOptionBox.each(function(_boxNum){
      $(this).find('select').bind({
        'change' : function(){
          var selectNum = $(this).prop('selectedIndex'),
              keyword   = (selectNum == 0) ? null : a_DEFAULT_KEYWORD[_boxNum][selectNum],
              value     = a_DEFAULT_VALUE[_boxNum][selectNum];
          
          if(selectNum != 0){
            
          }
          
          a_value[_boxNum][0] = value;
          a_keyword[_boxNum][0] = keyword;
          
          o_select.item = a_itemKey[_boxNum];
          o_select.idx = _boxNum;
          o_select.value = a_value[_boxNum];
  
          currentItem = $(this).parents('li.item-box').data('item');
          
          if(!$noDataScreen.hasClass('blind'))  $noDataScreen.addClass('blind');
          if(!$noOptionScreen.hasClass('blind'))  $noOptionScreen.addClass('blind');
          
          // console.log($(this).parents('.item-box').data('item'), $(this).children('option:selected').val());
          ga_behavior_event('Support-SMART_Choice', 'Support-SMART_Choice_Click', 'support-smart_choice-[' + $(this).parents('.item-box').data('item') + '][' + $(this).children('option:selected').val() + '][Filter]');
          
          changeView();
        },
        'touchend' : function(e){
          e.stopPropagation();
        }
      });
      
      $(this).find('li').each(function(_optionNum){
        $(this).find('label').bind({
          'touchend' : function(e){
            e.stopPropagation();
          }
        });
        $(this).find('input[type=checkbox]').bind({
          'change' : function(){
            var checked      = $(this).prop('checked'),
            
                total        = a_total[_boxNum],
                keyword      = a_DEFAULT_KEYWORD[_boxNum][_optionNum],
                value        = a_DEFAULT_VALUE[_boxNum][_optionNum],
            
                checkedTotal = getCheckedTotal(_boxNum);
  
            currentItem = $(this).parents('li.item-box').data('item');
            // console.log($(this).parents('.item-box').data('item'), $(this).val());
            ga_behavior_event('Support-SMART_Choice', 'Support-SMART_Choice_Click', 'support-smart_choice-[' + $(this).parents('.item-box').data('item') + '][' + $(this).val() + '][Filter]');
            
            if(checked){
              a_keyword[_boxNum][_optionNum] = keyword;
              a_value[_boxNum][_optionNum] = value;
              
              if(checkedTotal == total){
                allChecked(_boxNum);
              }
              
              o_select.item = a_itemKey[_boxNum];
              o_select.idx = _boxNum;
              o_select.value = a_value[_boxNum];
              
              if(!$noDataScreen.hasClass('blind'))  $noDataScreen.addClass('blind');
              if(!$noOptionScreen.hasClass('blind'))  $noOptionScreen.addClass('blind');
              
            }else{
              clearChecked(_boxNum, _optionNum);
            }
            
            changeView();
          },
          'touchend' : function(e){
            e.stopPropagation();
          }
        });
      });
    });
  }
  
  function getCheckedTotal(_boxNum){
    var checkedTotal = 0;
    
    $searchOptionBox.eq(_boxNum).find('li').each(function(_optionNum){
      if($(this).find('input[type=checkbox]').prop('checked'))  checkedTotal += 1;
    });
    
    return checkedTotal;
  }
  
  function allChecked(_boxNum){
    $searchOptionBox.eq(_boxNum).find('li').each(function(_optionNum){
      a_keyword[_boxNum][_optionNum] = null;
    });
  }
  
  function clearChecked(_boxNum, _optionNum){
    var i     = 0,
        total = a_value[_boxNum].length;
    
    a_value[_boxNum][_optionNum] = null;
    for(; i < total; ++i){
      a_keyword[_boxNum][i] = a_value[_boxNum][i];
      
      if(a_keyword[_boxNum][i] != null)  a_keyword[_boxNum][i] = a_DEFAULT_KEYWORD[_boxNum][i];
    }
  }
  
  function changeView(_reset){
    if($productList.hasClass('blind'))  $productList.removeClass('blind');
    
    if(_reset){
      $keywordBox.empty();
      $productList.empty();
      $result.text(0);
      if(!$noDataScreen.hasClass('blind'))  $noDataScreen.addClass('blind');
      $noOptionScreen.removeClass('blind');
    }else{
      $productList.children('li').remove();
      
      // back-end
      // ajax로 form 보낸 후 success 함수
      displayProductList();
    }
    changeViewKeyword();
  }
  
  function displayProductList(){
	//로딩이미지 노출
	  ssds.common.newLoading();
	  if(console) console.log("param::"+$('#advancedToolForm').serialize());
	$.ajax({
	  url : '/support/tools/smart-choice/advanced-tool?method=list',
	  data : $('#advancedToolForm').serialize(),
	  dataType : 'json',
	  cache : false,
	  success : function(data){
	    var model_data;
	    var list = data.list;
	    
	    // /* 데이터가 없을 때 */
	    //if(Object.keys(data).length == 0){
	    if(list == null){
	      $productList.empty(); // 리스트 비우기
	      $result.text(0);  // result 갯수 세팅
	      $noDataScreen.removeClass('blind'); // no results 보이기
	      
	    }
	    
	    /* 필터링 된 데이터 붙이기 // 붙인 데이터노드(li) 안 요소 채우기 */
	    for(var i in list){
	      productTag = productTag.clone();
	      model_data = '/digital-signage/detail/' + list[i]['PRODUCT_SEQ'] + '/' + list[i]['PRODUCT_NAME'];
	      productTag.find('.stitle a').text(list[i]['PRODUCT_NAME']); // 모델명
	      productTag.find('.stitle a').attr({href : model_data, target : '_blank'}); // 모델명 눌렀을 때 a링크
	      productTag.find('.visual').find('img').attr({
	        'src' : list[i]['img'],
	        'alt' : list[i]['PRODUCT_SEQ'],
	        'data-product-link' : model_data,
	        'data-product-seq' : list[i]['PRODUCT_SEQ']
	      }); // 이미지 & alt값 & product seq값
	      $productList.append(productTag);
	    }
	    if(list != null) $result.text(Object.keys(list).length); // result 갯수 세팅
	  
	        changeScreen(list);
      },
      error : function(xhr, status, err){
        console.error('/smart-choice/advanced-tool?method=list', status, err.toString());
	  },
	  complete : function(){
		//로딩이미지 숨김
		ssds.common.newLoadingDone();
	  }
	});
  }
  
  function changeScreen(_list){
    var list = _list;
    
    if(list){
      if(list.length == 0){
        if(!$noOptionScreen.hasClass('blind'))  $noOptionScreen.addClass('blind');
        $noDataScreen.removeClass('blind');
      }else if(list.length > 0){
        if(!$noDataScreen.hasClass('blind'))  $noDataScreen.addClass('blind');
        if(!$noOptionScreen.hasClass('blind'))  $noOptionScreen.addClass('blind');
      }
    }else{
      if(!$noDataScreen.hasClass('blind'))  $noDataScreen.addClass('blind');
      $noOptionScreen.removeClass('blind');
    }
  }
  
  function changeViewKeyword(){
    var i,
        total,
        sizeTxt;
    
    $keywordBox.empty();
    $.each(a_keyword, function(_idx){
      i = 0;
      total = a_total[_idx];
      sizeTxt = o_sizeProp.DEFAULT_TXT;
      
      switch(a_total[_idx]){
        case 1 : //selectbox
          if(a_keyword[_idx][0] != null)  $keywordBox.append(keywordTag.clone().html(a_keyword[_idx][0]));
          break;

        case 2 : //checkbox
          for(i = 0; i < total; ++i){
            if(a_keyword[_idx][i] != null)  $keywordBox.append(keywordTag.clone().html(a_keyword[_idx][i]));
          }
          break;
  
        case 4 : //checkbox :: Storage
          for(i = 0; i < total; ++i){
            if(a_keyword[_idx][i] != null)  $keywordBox.append(keywordTag.clone().html(a_keyword[_idx][i]));
          }
          break;

        default : //checkbox :: size
          for(i = 0; i < total; ++i){
            if(a_keyword[_idx][i] != null)  o_sizeProp.count += 1;
          }
  
          for(i = 0; i < total; ++i){
            if(a_keyword[_idx][i] != null){
              o_sizeProp.count -= 1;
              sizeTxt += (o_sizeProp.count == 0) ? a_keyword[_idx][i] : a_keyword[_idx][i] + ', ';
            }
          }
          if(sizeTxt != o_sizeProp.DEFAULT_TXT)  $keywordBox.append(keywordTag.clone().html(sizeTxt));
          
          break;
      }
    });
    // ssds.common.util.cardListImg.loadList();
  }
  
  function reset(){
    $searchOptionBox.each(function(_boxNum){
      if($(this).find('select').length){
        a_keyword[_boxNum][0] = a_value[_boxNum][0] = null;
        $(this).find('select').next('.g-select-title').find('strong').text('Any');
        
        //모바일일때
        $(this).find('select').find("option:eq(0)").prop("selected", true);
      }
      
      if($(this).children('ul').length){
        $(this).children('ul').children('li').each(function(_optionNum){
          a_keyword[_boxNum][_optionNum] = a_value[_boxNum][_optionNum] = null;
          $(this).find('input[type=checkbox]').prop('checked', false);
        });
      }
    });
    
    changeView('reset');
  }
  
  $scope.reset = function(){
    reset();
  };
  
  setDefault();
  addEvent();
  $productList.addClass('blind');
  changeViewKeyword();
  angular.element('body').addClass('filter-is-filter');
  ssds.common.util.filterBox.init();
});

advancedTool.controller('smartchoiceSpecController', function($scope){
  
  if(smartChoiceProp.model == ''){
    location.href = "/support/tools/smart-choice/advanced-tool";
    // location.href = "#/advancedTool-index";
  }else{
    $('#model-spec-box').removeClass(common.className.blind);
    smartChoiceController.rootSpecController();
  
    $scope.goMoreSpec = function(){
      location.href = "#/smartchoice-detail";
      smartChoiceController.detail();
    };
  
    $scope.goAdvancedIndex = function(){
      smartChoiceController.reset(smartChoiceProp.toolName);
    };
  }
  
});

advancedTool.controller('smartchoiceDetailController', function($scope){
  if(smartChoiceProp.model == ''){
    location.href = "/support/tools/smart-choice/advanced-tool";
  }else{
    $('#model-detail-box').removeClass(common.className.blind);
    smartChoiceController.rootDetailController();
  
    $scope.goAdvancedIndex = function(){
      smartChoiceController.reset(smartChoiceProp.toolName);
    };
  }
  
});

