/**
 * SamSung Display Solutions
 * @author rui13th@pulipinc.com
 */

var smartChoiceController,
    smartChoiceProp = {
      toolName : $('#lfd-smart-choice').attr('ng-app'),
      model : '',
      prodLink : '',
      prodSeq : ''
    },
    common          = {
      toUpperTxt : function(_txt){
        var txt = _txt.toUpperCase();
    
        return txt;
      },
  
      toLowerTxt : function(_txt){
        var txt = _txt.toLowerCase();
    
        return txt;
      },
  
      toCamelTxt : function(_txt){
        var txt      = _txt.toLowerCase(),
            blankIdx = txt.indexOf(' '),
            word;
    
        if(blankIdx != -1){
          word = txt.charAt(blankIdx + 1);
          txt = txt.replace(' ' + word, word.toUpperCase() + '');
          txt = checkBlank(txt);
        }
    
        function checkBlank(_txt){
          var blank   = _txt.indexOf(' '),
              txt     = _txt,
              word,
              isBlank = (blank != -1) ? true : false;
      
          if(isBlank){
            word = txt.charAt(blank + 1);
            txt = txt.replace(' ' + word, word.toUpperCase() + '');
          }
      
          return txt;
        }
    
        return txt;
      },
  
      className : {
        blind : 'blind',
        isOn : 'is-on'
      },
  
      iconSize : {
        pc : {
          width : 130 + 'px',
          height : 130 + 'px'
        },
        mobile : { // ~ 767
          width : 65 + 'px',
          height : 65 + 'px'
        }
      },
  
      prodSize : {
        pc : {
          width : 80 + '%',
          height : 'auto'
        },
        mobile : { // ~ 767
          width : 100 + 'px',
          height : 'auto'
        }
      }
    };
smartChoiceController = (function($){
  function spec(_this){
    location.href = "#/smartchoice-spec";
    $(window).scrollTop(0);
    
    if(smartChoiceProp.toolName == 'advancedTool'){
        smartChoiceProp.prodLink = $(_this).find('img').data('product-link');
        smartChoiceProp.model = $(_this).parents('.visual').next('.explain').find('.stitle a').text();
        smartChoiceProp.prodSeq = $(_this).find('img').data('product-seq');
    }
  }
  
  function detail(){
    $(window).scrollTop(0);
  }
  
  function reset(_toolName){
    switch(_toolName){
      case 'startTool':
        location.href = "#/startTool-index";
        break;
      
      case 'advancedTool':
        location.href = "/support/tools/smart-choice/advanced-tool";
        smartChoiceProp.model = '';
        smartChoiceProp.prodLink = '';
        smartChoiceProp.prodSeq = '';
        break;
      
      default:
        break;
    }
  }
  
  function rootSpecController(){
    var $modelSpecBox,
        $modelSpecBoxSelector;
    
    $modelSpecBox = angular.element('#model-spec-box');
    $modelSpecBoxSelector = {
      name : $modelSpecBox.find('.model-name'),
      link : $modelSpecBox.find('.model-img .btnarea a'),
      img : $modelSpecBox.find('.model-img img'),
      title : $modelSpecBox.find('.model-title'),
      subtitle : $modelSpecBox.find('.model-subtitle'),
      keyParent : $modelSpecBox.find('.key-features').eq(0).find('ul'),
      key : $modelSpecBox.find('.key-features').eq(0).find('li').eq(0),
      spec : $modelSpecBox.find('.key-features').eq(1).find('li')
    };
    
    switch(smartChoiceProp.toolName){
      case 'startTool':
        displayStartToolSpec();
        break;
      
      case 'advancedTool':
        displayAdvancedToolSpec();
        break;
      
      default:
        break;
    }
    
    function displayStartToolSpec(){ // START TOOL
      var cloneTag,
          modelData = startToolData[smartChoiceProp.model];
      
      smartChoiceProp.prodLink = '/digital-signage/detail/' + modelData['PRODUCT_SEQ'] + '/' + modelData['PRODUCT_NAME'];
      
      $modelSpecBoxSelector.name.text(smartChoiceProp.model);
      $modelSpecBoxSelector.link.attr({href : smartChoiceProp.prodLink, target : '_blank'});
      $modelSpecBoxSelector.img.attr('src', modelData['spec'].bigImg);
      $modelSpecBoxSelector.title.text(smartChoiceProp.model);
      $modelSpecBoxSelector.subtitle.html(modelData['spec'].keyCopy);
      
      /* key features */
      cloneTag = $modelSpecBoxSelector.key.clone();
      $modelSpecBoxSelector.keyParent.empty();
      $.each(modelData['detail'].keyFeatures, function(_idx){
        cloneTag = cloneTag.clone();
        cloneTag.text(modelData['detail'].keyFeatures[_idx]);
        $modelSpecBoxSelector.keyParent.append(cloneTag);
      });
      
      /* Display specifications */
      $modelSpecBoxSelector.spec.eq(0).find('.spec-info').text(modelData['spec'].screensize);
      $modelSpecBoxSelector.spec.eq(1).find('.spec-info').text(modelData['spec'].brightness);
      $modelSpecBoxSelector.spec.eq(2).find('.spec-info').text(modelData['spec'].resolution);
    }
    
    function displayAdvancedToolSpec(){ // ADVANCED TOOL
    	if (console) console.log("call displayAdvancedToolSpec");
      var cloneTag,
          modelData;
      
      /* 테스트를 위한 임시 로직 :: 데이터 : http://dsf-dev.devtree.co.kr/static/js/smartChoice/smartChoiceResultData.json */
      $.ajax({
        url : '/support/tools/smart-choice/advanced-tool?method=spec',
        data : { prodSeq : smartChoiceProp.prodSeq },
        dataType : 'json',
        cache : false,
        success : function(data){
          modelData = data.detail;
          
          $modelSpecBoxSelector.name.text(modelData.PRODUCT_NAME);
          $modelSpecBoxSelector.link.attr({href : smartChoiceProp.prodLink, target : '_blank'});
          $modelSpecBoxSelector.img.attr('src', modelData.img);
          $modelSpecBoxSelector.title.text(modelData.PRODUCT_NAME);
          $modelSpecBoxSelector.subtitle.html(modelData.KEY_COPY);
          
          /* key features */
          cloneTag = $modelSpecBoxSelector.key.clone();
          $modelSpecBoxSelector.keyParent.empty();
          $.each(data.keyFeatures, function(_idx){
            cloneTag = cloneTag.clone();
            cloneTag.text(data.keyFeatures[_idx].TITLE);
            $modelSpecBoxSelector.keyParent.append(cloneTag);
          });
          
          /* Display specifications */
          $modelSpecBoxSelector.spec.eq(0).find('.spec-info').text(data.spec.screensize);
          $modelSpecBoxSelector.spec.eq(1).find('.spec-info').text(data.spec.brightness);
          $modelSpecBoxSelector.spec.eq(2).find('.spec-info').text(data.spec.resolution);
        },
        error : function(xhr, status, err){
          console.error('/support/tools/smart-choice/advanced-tool?method=spec', status, err.toString());
        }
      });
    }
  }
  
  function rootDetailController(){
    var $modelDetailBox,
        $modelDetailBoxSelector;
    
    $modelDetailBox = angular.element('#model-detail-box');
    $modelDetailBoxSelector = {
      name : $modelDetailBox.find('.model_name'),
      measure : $modelDetailBox.find('.measure'),
      thumb : $modelDetailBox.find('.measure-thumb img'),
      link : $modelDetailBox.find('.model-key-measure .btnarea a'),
      
      panel : {
        type : $modelDetailBox.find('.model-panel-type'),
        resolution : $modelDetailBox.find('.model-panel-resolution'),
        brightness : $modelDetailBox.find('.model-panel-brightness'),
        contrast : $modelDetailBox.find('.model-panel-contrast'),
        response : $modelDetailBox.find('.model-panel-response'),
        operation : $modelDetailBox.find('.model-panel-operation')
      },
      
      conectivity : {
        input : {
          rgb : $modelDetailBox.find('.model-input-rgb'),
          video : $modelDetailBox.find('.model-input-video'),
          hdcp : $modelDetailBox.find('.model-input-hdcp'),
          audio : $modelDetailBox.find('.model-input-audio'),
          usb : $modelDetailBox.find('.model-input-usb')
        },
        output : {
          rgb : $modelDetailBox.find('.model-output-rgb'),
          video : $modelDetailBox.find('.model-output-video'),
          audio : $modelDetailBox.find('.model-output-audio'),
          usb : $modelDetailBox.find('.model-output-usb'),
          touch : $modelDetailBox.find('.model-output-touch'),
          power : $modelDetailBox.find('.model-output-power')
        },
      },
      
      mechanical : {
        weight : {
          set : $modelDetailBox.find('.model-weight-set'),
          package : $modelDetailBox.find('.model-weight-package')
        },
        bezel : $modelDetailBox.find('.model-bezel')
      },
      
      certification : {
        environment : $modelDetailBox.find('.model-environment')
      },
      
      keyFeature : $modelDetailBox.find('.key-features')
    };
    
    switch(smartChoiceProp.toolName){
      case 'startTool':
        displayStartToolDetail();
        break;
      
      case 'advancedTool':
        displayAdvancedToolDetail();
        break;
      
      default:
        break;
    }
    
    function displayStartToolDetail(){ // START TOOL
      var modelData     = startToolData[smartChoiceProp.model],
          measure       = modelData['measure'],
          thumb         = modelData['spec']['bigImg'],
          panel         = modelData['panel'],
          conectivity   = modelData['conectivity'],
          mechanical    = modelData['mechanicalSpec'],
          certification = modelData['certification'],
      
          keyFeature    = modelData['detail']['keyFeatures'],
      
          kFeatureProp  = {},
          cloneTag;
      
      $modelDetailBoxSelector.name.text(smartChoiceProp.model);
      
      $modelDetailBoxSelector.thumb.attr({'src' : thumb});
      
      $modelDetailBoxSelector.link.attr({'href' : smartChoiceProp.prodLink, 'target' : '_blank'});
      
      $modelDetailBoxSelector.panel.type.text(panel.type);
      $modelDetailBoxSelector.panel.resolution.text(panel.resolution);
      $modelDetailBoxSelector.panel.brightness.text(panel.brightness);
      $modelDetailBoxSelector.panel.contrast.text(panel.contrastRatio);
      $modelDetailBoxSelector.panel.response.text(panel.responseTime);
      $modelDetailBoxSelector.panel.operation.text(panel.operationHour);
      
      $modelDetailBoxSelector.conectivity.input.rgb.text(conectivity.input.rgb);
      $modelDetailBoxSelector.conectivity.input.video.text(conectivity.input.video);
      $modelDetailBoxSelector.conectivity.input.hdcp.text(conectivity.input.hdcp);
      $modelDetailBoxSelector.conectivity.input.audio.text(conectivity.input.audio);
      $modelDetailBoxSelector.conectivity.input.usb.text(conectivity.input.usb);
      
      $modelDetailBoxSelector.conectivity.output.rgb.text(conectivity.output.rgb);
      $modelDetailBoxSelector.conectivity.output.video.text(conectivity.output.video);
      $modelDetailBoxSelector.conectivity.output.audio.text(conectivity.output.audio);
      $modelDetailBoxSelector.conectivity.output.usb.text(conectivity.output.usb);
      $modelDetailBoxSelector.conectivity.output.touch.text(conectivity.output.touchOut);
      $modelDetailBoxSelector.conectivity.output.power.text(conectivity.output.powerOut);
      
      $modelDetailBoxSelector.mechanical.weight.set.text(mechanical.weight.set);
      $modelDetailBoxSelector.mechanical.weight.package.text(mechanical.weight.package);
      $modelDetailBoxSelector.mechanical.bezel.text(mechanical.bezelWidth);
      
      $modelDetailBoxSelector.certification.environment.text(certification.environment);
      
      kFeatureProp = {
        i : 0,
        tag : $modelDetailBoxSelector.keyFeature.find('li').eq(0).clone(),
        total : keyFeature.length
      };
      
      //key Features
      $modelDetailBoxSelector.measure.find('li').each(function(_idx){
        switch(String($(this).find('i').text()).charAt(0)){
          case 'W' :
            $(this).find('span').text(measure['width'] + 'mm');
            break;
          
          case 'H' :
            $(this).find('span').text(measure['height'] + 'mm');
            break;
          
          case 'D' :
            $(this).find('span').text(measure['dpi'] + 'mm');
            break;
          
          default :
            break;
        }
      });
      
      for(; kFeatureProp.i < kFeatureProp.total; ++kFeatureProp.i){
        cloneTag = kFeatureProp.tag.clone().text(keyFeature[kFeatureProp.i]);
        
        $modelDetailBoxSelector.keyFeature.find('ul').append(cloneTag);
      }
      
    }
    
    function displayAdvancedToolDetail(){ // ADVANCED TOOL
    	if (console) console.log("call displayAdvancedToolDetail");
      var modelData,
          measure,
          thumb,
          panel,
          conectivity,
          mechanical,
          certification,
      
          cloneTag,
          modelSpec;
      
      /* 테스트를 위한 임시 로직 :: 데이터 : http://dsf-dev.devtree.co.kr/static/js/smartChoice/smartChoiceResultData.json */
      $.ajax({
        url : '/support/tools/smart-choice/advanced-tool?method=detail',
        data : { prodSeq : smartChoiceProp.prodSeq },
        dataType : 'json',
        cache : false,
        success : function(data){
          modelData = data.detail;
          modelSpec = data.spec;
          thumb = modelSpec.specImg;
          
          measure = modelData['measure'];
          
//          panel = modelData['panel'];
//          conectivity = modelData['conectivity'];
//          mechanical = modelData['mechanicalSpec'];
//          certification = modelData['certification'];
          
          $modelDetailBoxSelector.name.text(smartChoiceProp.model);
          
          $modelDetailBoxSelector.thumb.attr({'src' : thumb});
          
          $modelDetailBoxSelector.link.attr({'href' : smartChoiceProp.prodLink, 'target' : '_blank'});
          
          $modelDetailBoxSelector.measure.find('li').each(function(_idx){
	        switch(String($(this).find('i').text()).charAt(0)){
	          case 'W' :
	            $(this).find('span').text(parseFloat(modelSpec.width) + 'mm');
	            break;
	            
	          case 'H' :
	            $(this).find('span').text(parseFloat(modelSpec.height) + 'mm');
	            break;
	            
	          case 'D' :
	            $(this).find('span').text(parseFloat(modelSpec.dpi) + 'mm');
	            break;
	            
	          default :
	            break;
	        }
	      });
          
          $modelDetailBoxSelector.panel.type.text(modelSpec.panel_type);
          $modelDetailBoxSelector.panel.resolution.text(modelSpec.panel_resolution);
          $modelDetailBoxSelector.panel.brightness.text(modelSpec.panel_brightness);
          $modelDetailBoxSelector.panel.contrast.text(modelSpec.panel_contrastRatio);
          $modelDetailBoxSelector.panel.response.text(modelSpec.panel_responseTime);
          $modelDetailBoxSelector.panel.operation.text(modelSpec.panel_operationHour);
          
          $modelDetailBoxSelector.conectivity.input.rgb.text(modelSpec.conectivity_input_rgb);
          $modelDetailBoxSelector.conectivity.input.video.text(modelSpec.conectivity_input_video);
          $modelDetailBoxSelector.conectivity.input.hdcp.text(modelSpec.conectivity_input_hdcp);
          $modelDetailBoxSelector.conectivity.input.audio.text(modelSpec.conectivity_input_audio);
          $modelDetailBoxSelector.conectivity.input.usb.text(modelSpec.conectivity_input_usb);
          
          $modelDetailBoxSelector.conectivity.output.rgb.text(modelSpec.conectivity_output_rgb);
          $modelDetailBoxSelector.conectivity.output.video.text(modelSpec.conectivity_output_video);
          $modelDetailBoxSelector.conectivity.output.audio.text(modelSpec.conectivity_output_audio);
          $modelDetailBoxSelector.conectivity.output.usb.text(modelSpec.conectivity_output_usb);
          $modelDetailBoxSelector.conectivity.output.power.text(modelSpec.conectivity_output_powerOut);
          
          $modelDetailBoxSelector.mechanical.weight.set.text(modelSpec.mechanical_weight_set);
          $modelDetailBoxSelector.mechanical.weight.package.text(modelSpec.mechanical_weight_package);
          $modelDetailBoxSelector.mechanical.bezel.text(modelSpec.mechanical_bezelWidth);
          
          $modelDetailBoxSelector.certification.environment.text(modelSpec.certification_environment);
          
        },
        error : function(xhr, status, err){
          console.error('/support/tools/smart-choice/advanced-tool?method=detail', status, err.toString());
        }
      });
    }
  }
  
  function init(){
    $(window).scrollTop(0);
  }
  
  return {
    init : init,
    detail : detail,
    spec : spec,
    reset : reset,
    
    rootSpecController : rootSpecController,
    rootDetailController : rootDetailController
  }
})(jQuery);
