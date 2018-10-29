/**
 * SamSung Display Solutions
 * @author rui13th@pulipinc.com
 */

var smartChoiceFrameData = {
		intro : function(_obj){
    var prop = {
      'img' : '/static/images/tools/img_intro.gif',
      'title' : 'Welcome to the Smart Choice',
      'btns' : _obj.stepBtns
    };
    return prop;
  },
  
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
      'title' : 'Select the type of SMART Signage',
      'btns' : _obj.stepBtns
    };
    return prop;
  },
  
  outdoorsignage : function(_obj){
    var prop = {
      'img' : '/static/images/tools/img_outdoor.gif',
      'title' : 'Select the type of Outdoor Signage',
      'btns' : _obj.stepBtns
    };
    return prop;
  },
  
  outdoorsignage_detail : function(_obj){ //
    var prop = {
      'img' : '/static/images/tools/img_outdoor.gif',
      'title' : 'Select the type of Outdoor Signage',
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
	},

	smartChoiceApp = (function($){

		var o_data = {},

			common = {
				CURRENT_TOOL : undefined,
				toUpperTxt : function(_txt){
					var txt = _txt.toUpperCase();

					return txt;
				},

				toLowerTxt : function(_txt){
					var txt = _txt.toLowerCase();

					return txt;
				},

				toCamelTxt : function(_txt){
					var txt = _txt.toLowerCase(),
						blankIdx = txt.indexOf(' '),
						word;

					if(blankIdx != -1){
						word = txt.charAt(blankIdx + 1);
						txt = txt.replace(' ' + word, word.toUpperCase() + '');
						txt = checkBlank(txt);
					}

					function checkBlank(_txt){
						var blank = _txt.indexOf(' '),
							txt = _txt,
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
			},

			START_TOOL = (function(){
				var $totalBox = $('#lfd-smart-choice'),
					$questionBox = $totalBox.find('#question-box'),
					$modelSpecBox = $totalBox.find('#model-spec-box'),
					$modelDetailBox = $totalBox.find('#model-detail-box'),

					a_selectModel = [],

					step = 0,
					a_sequenceHistory = [{
						'stepTitle' : 'intro',
						'stepBtns' : ['START TOOL', 'ADVANCED TOOL']
					}],
					o_filterData = {},
					o_tempData = {},
					o_dataFrame,

					model,

					questionController = (function(){
						var $questionBoxSelector = {
								btn : $questionBox.find('.question-btn'),
								img : $questionBox.find('.question-img img'),
								title : $questionBox.find('.question-title'),
								txt : $questionBox.find('.question-txt'),
								back : $questionBox.find('.question-back')
							},

							stepTitle,

							smartsignage = {
								'STANDALONE' : 0,
								'VIDEOWALL' : 1,
								'INTERACTIVE' : 2
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
							if(_reset)	step = 0;

							o_data = o_filterData = smartChoiceData;
							o_dataFrame = smartChoiceFrameData;

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
							var data = o_dataFrame[_stepTitle](a_sequenceHistory[_step]),
								btnProp = {
									i : 0,
									total : data.btns.length,
									node : $questionBoxSelector.btn.find('li').eq(0).clone()
								},
								backward = '',
                btnCopy = (data.btnCopy) ? data.btnCopy : undefined,
								imgName;

							stepTitle = _stepTitle;
              
							(_step != 0) ? $questionBoxSelector.back.removeClass(common.className.blind) : $questionBoxSelector.back.addClass(common.className.blind);
							if(data.backward)	backward = data.backward;
              
              $questionBoxSelector.btn.find('li').remove();
              
							for(; btnProp.i < btnProp.total; ++btnProp.i){
								var node = btnProp.node.clone();
               
								node.find('a i').html(data.btns[btnProp.i] + backward);
                
                if(btnCopy){
                  node.find('a i').append('<em></em>');
                  node.find('a i em').html(btnCopy[btnProp.i]);
                }
								node.find('a i').attr({'data-value' : data.btns[btnProp.i]});
								if(ssds.common.byDeviceWidth().type == 'mobile'){
									node.find('a img').css(common.iconSize.mobile);
								}else{ // pc
									node.find('a img').css(common.iconSize.pc);
								}

								switch(_stepTitle){
									case 'bezel' :
										imgName = '/static/images/tools/' + _stepTitle + '_' + parseFloat(data.btns[btnProp.i]) + '.gif';
										break;

									case 'choiceModel' :
										imgName = o_data[data.btns[btnProp.i]].spec.img;

										if(ssds.common.byDeviceWidth().type == 'mobile'){
											node.find('a img').css(common.prodSize.mobile);
										}else{ // pc
											node.find('a img').css(common.prodSize.pc);
										}
										break;

									default :
										imgName = '/static/images/tools/' + _stepTitle + '_' + data.btns[btnProp.i] + '.gif';
										break;
								}

								node.find('a img').attr({'src' : imgName});
								$questionBoxSelector.btn.append(node);
								$questionBoxSelector.btn.children('li').removeClass(common.className.isOn);
							}
							
							// $questionBoxSelector.btn.find('li:last').find('a').attr('href','/support/smart-choice/advanced-tool');
							// $questionBoxSelector.btn.find('li:last').find('a').removeAttr("onclick");


							$questionBoxSelector.img.attr('src', data.img);
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
								step = _step,
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
							var step = _step,
								filData = _filterData,

								stepTitle,
								btns = [],
								tmpBtns,

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
										if(stepTitle != ii)	stepTitle = ii;//stepTitle 戮묎린

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

							function compare(a ,b){
								var a, b;

								if(!isNaN(a) && !isNaN(b)) return a - b;
								a = a.toString();
								b = b.toString();
								return (a < b) ? -1 : (a == b) ? 0 : 1;   // 또는,  return a.localeCompare ( b );
							}

							return btns;
						}

						function nextStep(_this){
							var selectStep = $(_this).find('i').data('value'),//$(_this).text().split('"')[0]
								selector,
								i;
              
							$(_this).parent('li').addClass(common.className.isOn);

							if(selectStep != 'ADVANCED TOOL'){
								common.CURRENT_TOOL = 'START TOOL';
								o_filterData = a_selectModel[step];

								if(Object.keys(a_selectModel[step]).length == 0){
									o_filterData[selectStep] =  smartChoiceData[selectStep];
									gotoSpec();
								}else{
									o_filterData = getData(o_filterData, selectStep, step);
								}

					// 			if(Object.keys(o_filterData).length == 1){
                  // console.log('Object.keys(o_filterData).length == 1');
					// 				gotoSpec();
					// 			}else{
					// 				step = addStep(step);
					// 				a_sequenceHistory[step] = getSequence(step, o_filterData);
					// 				changeView(step, a_sequenceHistory[step].stepTitle);
					// 			}
                //console.log(Object.keys(o_filterData).length)
                if(Object.keys(o_filterData).length > 1){
                  step = addStep(step);
                  a_sequenceHistory[step] = getSequence(step, o_filterData);
                  changeView(step, a_sequenceHistory[step].stepTitle);
                }else{
                  if(Object.keys(o_filterData).length == 1){
                    gotoSpec();
                  }
                }
							}else{
								common.CURRENT_TOOL = 'ADVANCED TOOL';
								a_sequenceHistory = [{
									'stepTitle' : 'intro',
									'stepBtns' : ['START TOOL', 'ADVANCED TOOL']
								}];
								gotoAdvanced();
							}
							//console.log(o_dataFrame[a_sequenceHistory[step].stepTitle](a_sequenceHistory[step]).title, selectStep);
              ga_behavior_event('Support-SMART_Choice','Support-SMART_Choice_Click','support-smart_choice-[' + o_dataFrame[a_sequenceHistory[step].stepTitle](a_sequenceHistory[step]).title + '][' + selectStep + ']_btn'); // google analytics
						}

						function gotoSpec(){
							var i;
              
							for(i in o_filterData){
								model = i;
								$questionBox.addClass(common.className.blind);
								$modelSpecBox.removeClass(common.className.blind);

								modelSpecController.init(model);
							}
							changeView(step, a_sequenceHistory[step].stepTitle, 'isSpec');
						}

						function prevStep(){
              ga_behavior_event('Support-SMART_Choice','Support-SMART_Choice_Click','support-smart_choice-[' + a_sequenceHistory[step].stepTitle + '][BACK]_btn'); // google analytics
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
							if(_step <= 0)	_step = 0;

							return _step;
						}

						function gotoAdvanced(){
							$questionBox.addClass(common.className.blind)
							$('.advanced-box').removeClass(common.className.blind);
							$('.advanced-box .advanced-result').removeClass(common.className.blind);
							smartChoiceApp.ADVANCED_TOOL.init('init');
							$(window).scrollTop(0);
						}

						return{
							init : init,
							nextStep : nextStep,
							prevStep : prevStep,
							gotoAdvanced : gotoAdvanced
						};
					})(),

					modelSpecController = (function(){
						var $modelSpecBoxSelector = {
								name : $modelSpecBox.find('.model-name'),
								link : $modelSpecBox.find('.model-img .btnarea a'),
								img : $modelSpecBox.find('.model-img img'),
								title : $modelSpecBox.find('.model-title'),
								subtitle : $modelSpecBox.find('.model-subtitle'),
								keyParent : $modelSpecBox.find('.key-features').eq(0).find('ul'),
								key : $modelSpecBox.find('.key-features').eq(0).find('li').eq(0),
								spec : $modelSpecBox.find('.key-features').eq(1).find('li')
							},

							model,
							keyTag = $modelSpecBoxSelector.key.clone();

						function init(_model){
							model = _model;
              
							changeView();
						}

						function changeView(){
							var data = smartChoiceData[model],
								keyProp = {
									total : data['detail']['keyFeatures'].length,
									i : 0
								},
                tag;
              
							$modelSpecBoxSelector.link.attr({href : '/digital-signage/detail/' + data['PRODUCT_SEQ'] + '/' + data['PRODUCT_NAME'], target : '_blank'});

							$modelSpecBoxSelector.name.text(model);
							$modelSpecBoxSelector.img.attr('src', data['spec'].bigImg);

							$modelSpecBoxSelector.title.text(data['PRODUCT_NAME']);
							$modelSpecBoxSelector.subtitle.html(data['spec']['keyCopy']);
							// $modelSpecBoxSelector.subtitle.css({display:'none'});

							//$modelSpecBoxSelector.txt.html(spec.txt);

							// for(; specProp.i < specProp.total; ++specProp.i){
							// 	className = $modelSpecBoxSelector.spec.eq(specProp.i).find('.spec-title').text().toLowerCase().replace(/\s/g, '');
							//
							// 	$modelSpecBoxSelector.spec.eq(specProp.i).find('.spec-info').text(spec[className]);
							// }
              
              $modelSpecBox.find('.key-features').eq(0).find('li').remove();

							for(; keyProp.i < keyProp.total; ++keyProp.i){
								tag = keyTag.clone();
								$modelSpecBoxSelector.keyParent.append(tag);
								tag.text(data['detail']['keyFeatures'][keyProp.i]);
							}

							$modelSpecBoxSelector.spec.each(function(_idx){
								var val;

								switch(_idx){
									case 0:
										val = data['spec']['screensize'];
										break;

									case 1 :
										val = data['spec']['brightness'] + '"';
										break;

									case 2 :
										val = data['spec']['resolution'];
										break;

									default :
										break;

								}


								$(this).find('span.spec-info').text(val);
							});
						}

						function more(){
							$modelSpecBox.addClass(common.className.blind);
							$modelDetailBox.removeClass(common.className.blind);

							modelDetailController.init(model);
							$(window).scrollTop(0);
						}

						function reset(){
							$totalBox.find('.smart-box').each(function(_boxNum){
								$(this).addClass(common.className.blind);
							});
							$questionBox.removeClass(common.className.blind);
							smartChoiceApp.ADVANCED_TOOL.reset();
							$('.advanced-box').addClass(common.className.blind);

							questionController.init('reset');
							$(window).scrollTop(0);


						}

						function gotoAdvanced(){

							if(common.CURRENT_TOOL == 'START TOOL'){
								// console.log(common.CURRENT_TOOL)
								step = 0;
								a_sequenceHistory = [{
									'stepTitle' : 'intro',
									'stepBtns' : ['START TOOL', 'ADVANCED TOOL']
								}];

								$totalBox.find('.smart-box').each(function(_boxNum){
									$(this).addClass(common.className.blind);
								});
								$questionBox.removeClass(common.className.blind);
								//smartChoiceApp.ADVANCED_TOOL.reset();
								$('.advanced-box').addClass(common.className.blind);
                                //
								questionController.init('reset');
								$(window).scrollTop(0);
							}else{
								$totalBox.find('.smart-box').each(function(_boxNum){
									$(this).addClass(common.className.blind);
								});
								$questionBox.removeClass(common.className.blind);
								smartChoiceApp.ADVANCED_TOOL.reset();

								$(window).scrollTop(0);

								questionController.gotoAdvanced();/**/
							}

						}

						return {
							init : init,
							more : more,
							reset : reset,
							gotoAdvanced : gotoAdvanced
						}
					})(),

					modelDetailController = (function(_model){
						var $modelDetailBoxSelector = {
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
										audio : $modelDetailBox.find('.model-input-audio'),
										usb : $modelDetailBox.find('.model-input-usb')
									},
									output : {
										rgb : $modelDetailBox.find('.model-output-rgb'),
										video : $modelDetailBox.find('.model-output-video'),
										audio : $modelDetailBox.find('.model-output-audio'),
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

							},
							model;

						function init(_model){
							var name,
								measure,
								thumb,
								panel,
								conectivity,
								mechanical,
								certification,
								keyFeature,

								kFeatureProp = {
									i : 0 ,
									node : $modelDetailBoxSelector.keyFeature.find('li').eq(0).clone()
								},
								node;

							model = _model;
							name = model;
							measure = smartChoiceData[model]['measure'];
							thumb = smartChoiceData[model]['spec']['bigImg'];
							panel = smartChoiceData[model]['panel'];
							conectivity = smartChoiceData[model]['conectivity'];
							mechanical = smartChoiceData[model]['mechanicalSpec'];
							certification = smartChoiceData[model]['certification'];

							keyFeature = smartChoiceData[model]['detail']['keyFeatures'];
							kFeatureProp.total = keyFeature.length;

							$modelDetailBoxSelector.name.text(model);

							$modelDetailBoxSelector.thumb.attr({'src' : thumb});

							$modelDetailBoxSelector.link.attr({'href' : '/digital-signage/detail/' + o_data[model]['PRODUCT_SEQ'] + '/' + o_data[model]['PRODUCT_NAME'], 'target' : '_blank'});

							$modelDetailBoxSelector.panel.type.text(panel.type);
							$modelDetailBoxSelector.panel.resolution.text(panel.resolution);
							$modelDetailBoxSelector.panel.brightness.text(panel.brightness);
							$modelDetailBoxSelector.panel.contrast.text(panel.contrastRatio);
							$modelDetailBoxSelector.panel.response.text(panel.responseTime);
							$modelDetailBoxSelector.panel.operation.text(panel.operationHour);

							$modelDetailBoxSelector.conectivity.input.rgb.text(conectivity.input.rgb);
							$modelDetailBoxSelector.conectivity.input.video.text(conectivity.input.video);
							$modelDetailBoxSelector.conectivity.input.audio.text(conectivity.input.audio);
							$modelDetailBoxSelector.conectivity.input.usb.text(conectivity.input.usb);

							$modelDetailBoxSelector.conectivity.output.rgb.text(conectivity.output.rgb);
							$modelDetailBoxSelector.conectivity.output.video.text(conectivity.output.video);
							$modelDetailBoxSelector.conectivity.output.audio.text(conectivity.output.audio);
							$modelDetailBoxSelector.conectivity.output.power.text(conectivity.output.powerOut);

							$modelDetailBoxSelector.mechanical.weight.set.text(mechanical.weight.set);
							$modelDetailBoxSelector.mechanical.weight.package.text(mechanical.weight.package);
							$modelDetailBoxSelector.mechanical.bezel.text(mechanical.bezelWidth);

							$modelDetailBoxSelector.certification.environment.text(certification.environment);


							//key Features
							$modelDetailBoxSelector.measure.find('li').each(function(_idx){
								switch(String($(this).find('i').text()).charAt(0)){
									case 'W' :
										$(this).find('span').text(parseFloat(measure['width']) + 'mm');
										break;

									case 'H' :
										$(this).find('span').text(parseFloat(measure['height']) + 'mm');
										break;

									case 'D' :
										$(this).find('span').text(parseFloat(measure['dpi']) + 'mm');
										break;

									default :
										break;
								}
							});


							$modelDetailBoxSelector.keyFeature.find('li').remove();

							for(; kFeatureProp.i < kFeatureProp.total; ++kFeatureProp.i){
								node = kFeatureProp.node.clone().text(keyFeature[kFeatureProp.i]);

								$modelDetailBoxSelector.keyFeature.find('ul').append(node)
							}
						}

						return {
							init : init
						}
					})();

				return{
					questionBox : questionController,
					modelSpecBox : modelSpecController,
					modelDetailBox : modelDetailController
				}
			})(),

			ADVANCED_TOOL = (function(){
				var $advanceBox = $('.advanced-box'), /*필터링 옵션 폼 관련*/
					$searchBox = $advanceBox.find('.list-filter'),
					$searchOptionBox = $searchBox.find('.item-box'),
					// $tipTxt = $advanceBox.find('.selected-opt'),
					// $reset = $advanceBox.find('.btn-apply-filter'),

					$advancedResultBox = $('.advanced-result'),	/*필터링 결과 키워드 관련*/
					$result = $advancedResultBox.find('.g-result .view i'),
					$keywordBox = $advancedResultBox.find('.selected-opt'),
					$keywordTxt = $keywordBox.find('em'),
					keywordTag = $keywordTxt.clone(),
					$noDataScreen = $advancedResultBox.find('.g-list-aticle'),

					$productList = $advancedResultBox.find('.advanced-list-box .advanced-list'),	/*필터링 결과 상품 리스트 관련*/
					productTag = $productList.find('li').clone(),

					o_searchData = {}, //o_data에서 search 데이터만 담기 // o_data는 전체 데이터


					a_itemKey = [],

					a_DEFAULT_KEYWORD,
					a_DEFAULT_VALUE,

					a_keyword, // 선택된 옵션값 뷰단에 뿌릴 키워드
					a_value, // 선택된 옵션의 밸류값 필터링에 이용
					a_total,

					o_select = {},

					o_sizeProp = {
						DEFAULT_TXT : 'SIZE ',
						count : 0
					},

					model,
					isInit = true,
					o_filterData = [],

					/*
					 * checkbox 일 때 키워드 중복표시?
					 * 항목의 보기가 중복 선택되면 키워드는 삭제되고 상품은 전체 출력
					 *
					 * selectbox any옵션은 단독으로는 동작 안함
					 * 다른 항목들과 연결됐을 때
					 *
					 */

					advancedController = (function(){
						function getFrontPhrase($this){
							var phrase = $this.parents('.item-box').data('front-phrase');

							if(phrase == ''){
								phrase = $this.parent().data('front-phrase');

								if(phrase == '' || phrase == undefined)	phrase = '';
							}
							phrase += '';

							return common.toUpperTxt(phrase);
						}

						function getBackPhrase($this){
							var phrase = $this.parents('.item-box').data('back-phrase');

							if(phrase == '' || phrase == undefined)	phrase = '';

							phrase += '';

							return common.toUpperTxt(phrase);
						}

						function setDefault(){
							var keyword,

								value,
								item,
								phrase = {},

								options = {};

							$searchOptionBox.each(function(_boxNum){
								var $this = $(this);

								if($(this).attr('data-item') == undefined)	$(this).attr({'data-item' : $(this).find('.pc-title').text()});

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

									ssds.common.addEvent.callEvent('resize', resizeSelectBox);
									function resizeSelectBox(){
										$this.css({width : 100 + '%'});
										$this.find('.g-select-title').css({width : 100 + '%'});
									}
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

										if($(this).find('input').prop('checked'))	$(this).find('input').prop('checked', false);
									});
									a_total[_boxNum] = $(this).children('ul').children('li').length;
								}
							});
						}

						function getKeyword(_formtype, _options){
							var formtype = _formtype,
								options = _options,
								keyword = '';

							switch(formtype){
								case 'select' :
									switch(options.item){
										case 'Resolution' :
											keyword = (options.value != 'any') ? common.toUpperTxt(options.value) + ' ' + common.toUpperTxt(options.phrase.back) : null;
											//keyword = common.toUpperTxt(options.value) + ' ' + common.toUpperTxt(options.phrase.back);

											break;

										case 'Brightness' :
											keyword = (options.value != 'any') ? common.toUpperTxt(options.value)  + ' ' + common.toUpperTxt(options.phrase.back) : null;
											//keyword = common.toUpperTxt(options.value)  + ' ' + common.toUpperTxt(options.phrase.back);

											break;

										default :
											break;
									}
									break;

								case 'checkbox' :
									switch(options.item){
										case 'Size' :
											//keyword = phrase.front + ' ' + value + phrase.back;
											keyword = options.value + options.phrase.back;

											break;

										case 'Operation time' :
											keyword = options.value  + ' ' + options.phrase.back;

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

						function getSearchData(){
							var i;

							for(i in o_data){
								o_searchData[i] = o_data[i]['search'];
							}
						}

						function init(_init){
							a_DEFAULT_VALUE = [];
							a_DEFAULT_KEYWORD = [];
							a_keyword = [];
							a_value = [];
							a_total = [];

							if(_init){
								setDefault();
								getSearchData();
								addEvent();
								ssds.common.util.cardListImg.init();
							}
							changeView();

							//reset();
						}

						function addEvent(){
							var data;

							$searchOptionBox.each(function(_boxNum){
								$(this).find('select').bind({
									'change' : function(){
										var selectNum = $(this).prop('selectedIndex'),
											keyword = a_DEFAULT_KEYWORD[_boxNum][selectNum],
											value = a_DEFAULT_VALUE[_boxNum][selectNum];

										a_value[_boxNum][0] = value;
										a_keyword[_boxNum][0] = keyword;

										o_select.item = a_itemKey[_boxNum];
										o_select.idx = _boxNum;
										o_select.value = a_value[_boxNum];

										if(!$noDataScreen.hasClass(common.className.blind))	$noDataScreen.addClass(common.className.blind);

                    //console.log($(this).parents('.item-box').data('item'), $(this).children('option:selected').val());
                    ga_behavior_event('Support-SMART_Choice','Support-SMART_Choice_Click','support-smart_choice-[' + $(this).parents('.item-box').data('item') + '][' +  $(this).children('option:selected').val()  + '][Filter]');

										getFilterData();
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
											var checked = $(this).prop('checked'),

												total = a_total[_boxNum],
												keyword = a_DEFAULT_KEYWORD[_boxNum][_optionNum],
												value = a_DEFAULT_VALUE[_boxNum][_optionNum],

												checkedTotal = getCheckedTotal(_boxNum);

                      //console.log($(this).parents('.item-box').data('item'), $(this).val());
                      ga_behavior_event('Support-SMART_Choice','Support-SMART_Choice_Click','support-smart_choice-[' + $(this).parents('.item-box').data('item') + '][' + $(this).val() + '][Filter]');

											if(checked){
												a_keyword[_boxNum][_optionNum] = keyword;
												a_value[_boxNum][_optionNum] = value;

												if(checkedTotal == total){
													allChecked(_boxNum);
												}

												o_select.item = a_itemKey[_boxNum];
												o_select.idx = _boxNum;
												o_select.value = a_value[_boxNum];

												if(!$noDataScreen.hasClass(common.className.blind))	$noDataScreen.addClass(common.className.blind);

											}else{
												clearChecked(_boxNum, _optionNum);
											}

											getFilterData();
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
								if($(this).find('input[type=checkbox]').prop('checked'))	checkedTotal += 1;
							});

							return checkedTotal;
						}

						function allChecked(_boxNum){
							$searchOptionBox.eq(_boxNum).find('li').each(function(_optionNum){
								a_keyword[_boxNum][_optionNum] = null;
							});
						}

						function clearChecked(_boxNum, _optionNum){
							var i = 0,
								total = a_value[_boxNum].length;

							a_value[_boxNum][_optionNum] = null;
							for(; i < total; ++i){
								a_keyword[_boxNum][i] = a_value[_boxNum][i];

								if(a_keyword[_boxNum][i] != null)	a_keyword[_boxNum][i] = a_DEFAULT_KEYWORD[_boxNum][i];
							}
						}

						function changeView(_reset){
							if(_reset){
								$keywordBox.empty();
								$productList.empty();
								$result.text(0);
								$noDataScreen.removeClass(common.className.blind);
								o_filterData = [];
							}else{
								$productList.find('li').remove();

								for(var i = 0; i < o_filterData.length; ++i){
									productTag = productTag.clone();
									$productList.append(productTag);
								}

								$productList.children('li').each(function(_idx){
									$(this).find('.stitle a').text(o_filterData[_idx]);
									$(this).find('.stitle a').attr({href : '/digital-signage/detail/' + o_data[o_filterData[_idx]]['PRODUCT_SEQ'] + '/' + o_data[o_filterData[_idx]]['PRODUCT_NAME'], target : '_blank'});
									$(this).find('.visual').find('img').attr('src', o_data[o_filterData[_idx]]['spec']['bigImg']);
								});
							}

							changeViewKeyword();
						}

						function getFilterData(){
							getByItemFilterData();
						}

						function getByItemFilterData(){
							var originData = o_searchData,
								filterData,
								filterItem = {},
								resultData = {},
								i,
								j,
								k,
								m = 0,
								total = 0,
								data = originData,
								length = 0;

							o_filterData = [];
							o_filterIngData = {};	// loop를 돌면서 임시로 데이터를 저장하는 변수 추가 (o_filterData 데이터가 문자열 값만 가지고 있어 추가)
							$.each(a_value, function(_item){
								filterItem[a_itemKey[_item]] = [];
								$.each(a_value[_item], function(_option){
									if(a_value[_item][_option] != null)	filterItem[a_itemKey[_item]].push(a_value[_item][_option]);
								});
							});

							$.each(filterItem, function(_idx){
								length += filterItem[_idx].length;
							});

							isInit = (length == 1) ? true : false ;
							// console.log('isInit :: ', isInit);

							for(var item in filterItem){
								loop(item);
							}

							function loop(_item){
								var idx,
									i,
									total,
									isAll = false,
									o_tempData = [],
									o_tempFilterIngData = {};

								$.each(a_total, function(_idx){
									if(a_itemKey[_idx] == _item)	idx = _idx;
								});

								// loop를 이전 필터에서 체크가 되어있는지 확인
								var imeFilter = false; // 이전필터 체크 여부 변수
								for(var i = 0; i < idx; i ++){
									if(filterItem[a_itemKey[i]].length != 0){

										if(!imeFilter && (i == 5 || i == 6) && filterItem[a_itemKey[i]] == 'any'){ //select box 일 경우 any로 체크 되어있다면 이전필터 체크가 안되어있는것으로 처리
											imeFilter = false;
										}
										else{
											imeFilter = true;
											break;	//한번이라도 체크가 된것을 확인하면 더이상 for문을 수행하지 않음
										}
									}
								}

								// 현재 loop 의 필터조건이 모든 조건 검색 인지 확인

								if(a_total[idx] == filterItem[_item].length){
									isAll = true;	 // 모든 조건 검색 여부 변수
									if( idx == 5 || idx == 6){ //select box 일 경우
										if( null != filterItem[_item][0] && filterItem[_item][0] != 'any'){ //select box 일 경우 any가 아니라면 모든조건검색 여부 false
											isAll = false;
										}
										else{
											if(!imeFilter){ //any로 체크 되어있지만 이전필터가 체크 되어있지 않다면 모든조건 검색 여부 false
												isAll = false;
											}
										}
									}
								}
								else{
									isAll = false;
								}

								if(imeFilter ){
									data = o_filterIngData ; //이전필터가 체크 되어 있다면  loop를 돌며 저장한 임시 변수데이에서만 검색하도록 세팅
								}
								else{
									data = o_searchData; // //이전필터가 체크 되어있지 않다면 모든 검색 데이터에서 검색하도록 세팅
								}

								total = filterItem[_item].length;
								for(i = 0; i < total; ++i){
									for(j in data){

										var andValue = false;		//and 검색 조건 이기 때문에 기존데이터에서 검색할 데이터가 있는지 체크 하기위한 변수
										if(idx != 0 && o_filterData.length != 0){ //첫번재 검색필터가 아니고 이전 검색된 데이터가 있는경우

											$.each(o_filterData, function(index, value){	//기존추가된 데이터 문자배열에 추가될 데이터가 있는지 체크하여 존재한다면 true
												if(j == value){
													andValue = true;
													return;
												}
											});
										}
										else{
											andValue = true; //첫번재 검색필터이거나 이전 검색된 데이터가 없는 경우 true
										}

										if(isAll || (data[j][_item] == filterItem[_item][i] && andValue)){ // 모든 조건 검색 이거나 필터검색조건이 일치하고 and검색조건이 true 일 경우
											if ($.inArray(j, o_tempData) == -1) {  // result 에서 값을 찾는다.  //값이 없을경우(-1)
												o_tempData.push(j);              // result 배열에 값을 넣는다.
												o_tempFilterIngData[j] = o_data[j]['search'];
											}

										}
									}
								}

								if(total != 0) {	//해당 루프의 검색조건이 0이 아닐경우 해당루프에서 정재된 데이터를 변수에 저장
									o_filterData = o_tempData;
									o_filterIngData = o_tempFilterIngData;
								}
							}

							if(console)	console.log(o_filterData, Object.keys(o_filterData).length);
							$result.text(Object.keys(o_filterData).length);
							if(Object.keys(o_filterData).length == 0){
								$noDataScreen.removeClass(common.className.blind);
							}else{
								$noDataScreen.addClass(common.className.blind);
							}
							//if(Object.keys(o_filterData).length == 0)	init('');		데이터가 없을 경우 필터를 초기화하는 부분 주석
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
										if(a_keyword[_idx][0] != null)	$keywordBox.append(keywordTag.clone().html(a_keyword[_idx][0]));
										break;

									case 2 : //checkbox
										for(; i < total; ++i){
											if(a_keyword[_idx][i] != null)	$keywordBox.append(keywordTag.clone().html(a_keyword[_idx][i]));
										}
										break;

									case 8 : //checkbox :: size
										for(; i < total; ++i){
											if(a_keyword[_idx][i] != null)	o_sizeProp.count += 1;
										}

										for(i = 0; i < total; ++i){
											if(a_keyword[_idx][i] != null){
												o_sizeProp.count -= 1;
												sizeTxt += (o_sizeProp.count == 0) ? a_keyword[_idx][i] : a_keyword[_idx][i] + ', ' ;
											}
										}
										if(sizeTxt != o_sizeProp.DEFAULT_TXT)	$keywordBox.append(keywordTag.clone().html(sizeTxt));

										break;

									default :
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

						function viewDetail(_this){
							model = $(_this).parents('.visual').next().find('.stitle').text();
							$advanceBox.addClass(common.className.blind);
							$advancedResultBox.addClass(common.className.blind);

							$('#model-spec-box').removeClass(common.className.blind);

							START_TOOL.modelSpecBox.init(model);
							$(window).scrollTop(0);

							reset();
						}

						return{
							init : init,
							reset : reset,

							viewDetail : viewDetail
						};
					})();

				return{
					advancedBox : advancedController
				};
			})();

		return {
			START_TOOL : {
				init : START_TOOL.questionBox.init,
				nextStep : START_TOOL.questionBox.nextStep,
				prevStep : START_TOOL.questionBox.prevStep,

				more : START_TOOL.modelSpecBox.more,
				reset : START_TOOL.modelSpecBox.reset,

				gotoAdvanced : START_TOOL.modelSpecBox.gotoAdvanced
			},
			ADVANCED_TOOL : {
				init : ADVANCED_TOOL.advancedBox.init,
				reset : ADVANCED_TOOL.advancedBox.reset,

				viewDetail : ADVANCED_TOOL.advancedBox.viewDetail
			}
		};
})(jQuery);


$(document).ready(function(){
	smartChoiceApp.START_TOOL.init();
});
