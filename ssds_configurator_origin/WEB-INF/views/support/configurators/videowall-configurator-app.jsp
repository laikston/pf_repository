<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/layout/taglibs.jsp"%>
<html lang="en" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="format-detection" content="telephone=no">

	<script src="/static/js/lib/jquery-1.10.2.min.js"></script>
	<script src="/static/js/lib/jquery-migrate-1.2.1.min.js"></script>
	<script src="/static/js/lib/modernizr-2.6.2.min.js"></script>
	<script src="/static/js/lib/jquery-ui-1.10.3.custom.js"></script>
	
	<!--[if lt IE 9]>
    <script src="/static/js/html5shiv.min.js"></script>
    <script src="/static/js/respond.js"></script>
    <![endif]-->

	<!-- Default css -->
    <link rel="stylesheet" href="/static/css/base.css?2017022322">
    <link rel="stylesheet" href="/static/css/common.css?201704131101">
    <link rel="stylesheet" href="/static/css/newBase.css?20170614111">		
	<link rel="stylesheet" href="/static/css/idangerous.swiper.css">
					
	<link rel="stylesheet" href="/static/css/support.css">

	<!-- Frameworks, Plugins -->
    <script src="/static/js/ui.plugins.js"></script>

	<script src="/static/js/lib/plugins.js"></script>
	<script src="/static/js/lib/jquery.form.js"></script>
	<script src="/static/js/lib/js.cookie.js"></script>	
	<script src="/static/js/custom.swiper.js?20170330"></script>	

<!-- configurator css -->    
<link rel="stylesheet" href="/static/css/configurator.css"/>

<script src="/static/js/configurator/lib/angular.min.js"></script>
<script src="/static/js/configurator/configuratorData.js?2016110094000"></script>

</head>

<body>

<main id="content" role="main">
	<!-- . support-tools-configurator -->

	<div class="support-tools-configurator forAppVw">
		<!-- #videowall-configurator configurator-section -->
		<div id="videowall-configurator" class="configurator-section" ng-app="configurator" ng-controller="configuratorController as videowall" ng-cloak><!-- //ng-app="configurator" ng-controller="configuratorController as videowall"  -->
			<form method="post"  id="configuratorsFrm" name="configuratorsFrm"  enctype="multipart/form-data" >
				<div class="g-box need-help">
					<div class="inbox">
						<div class="g-h-box">
							<h1 class="h-page">Videowall Configurator </h1>
						</div>
						
					</div>
				</div>

				<!-- #tool Configurator -->
				<div id="tool-configurator" class="tool-videowall" >
					<!-- #options-tool -->
					<div id="options-tool" class="options-tool" style="overflow:hidden;">
						<div class="fitToWallBtn"><div><a href="javascript:;" class="g-btn-l-fit" ng-click="setMaxVideowall()"><span>Fit to room</span></a></div></div>
						<div id="form-tool" class="inbox">
							<!--<form name=""> -->

							<!-- ROOM CONFIGURATION -->
							<div class="opts-configurator-room" ng-class="{'is-active':getTab(1)}"><!-- .is-active || null -->
								<!-- .tab -->
								<span class="tab"><a href="javascript:;"><span>1</span>room configuration</a></span>
								<!-- // .tab -->

								<!-- Define Wall Size -->
								<div class="box-configurator configurator-room1" ng-class="{'is-active':getTab(1)}"><!-- .is-active || null -->
									<i class="opt-tab-room1"><a href="javascript:;" ng-click="setTab(1)" ng-init="tab.opts=1">Define Wall Size</a></i>
									<div class="opt-cont-room1" ng-show="getTab(1)" ng-class="{'is-active':getTab(1)}">
										<fieldset>
											<legend>options room configurator</legend>
											<!-- ROOM Options-->
											<div class="box-option">
												<div class="inner">
													<!-- .define wall size -->
													<div class="define-wallsize">
														<!-- .unit -->
														<ul class="unit">
															<!-- 활성화 시 -->
															<li><a href="javascript:;" ng-click="setUnit('feet')" class="g-btn-m-arrow1" ng-class="{'is-active':(tab.unit == 'feet') ? true : false}"><span>Feet</span></a></li>
															<li><a href="javascript:;" ng-click="setUnit('meter')" class="g-btn-m-arrow1" ng-class="{'is-active':(tab.unit == 'meter') ? true : false}"><span>Meters</span></a></li>
														</ul><!-- // .unit -->

														<!-- .controls -->
														<div class="controls">
															<div class="control-w">
																<label>Width ({{unit == 'feet' ? 'ft' : 'm'}})</label>
																<div class="input-group">
																	<input type="number" class="form-control" ng-model="room.size.width" step="any">
																	<div class="input-group-addon">
																		<a class="input_arrow arrow_up" ng-click="changeRoomWidth(1)"></a>
																		<a class="input_arrow arrow_down" ng-click="changeRoomWidth(-1)"></a>
																	</div>
																</div>
															</div>
															<div class="control-h">
																<label>Height ({{unit == 'feet' ? 'ft' : 'm' }})</label>
																<div class="input-group">
																	<input type="number" class="form-control" ng-model="room.size.height" step="any">
																	<div class="input-group-addon">
																		<a class="input_arrow arrow_up" ng-click="changeRoomHeight(1)"></a>
																		<a class="input_arrow arrow_down" ng-click="changeRoomHeight(-1)"></a>
																	</div>
																</div>
															</div>
														</div><!-- // .controls -->
													</div><!-- // .define wall size -->
												</div>
											</div><!-- // ROOM Options-->
										</fieldset>
									</div>
								</div><!-- // Define Wall Size -->
							</div><!-- // ROOM CONFIGURATION -->

							<!-- DISPLAY CONFIGURATION -->
							<div class="opts-configurator-display" ng-class="{'is-active':getTab(2) || getTab(3) || getTab(4)}">
								<!-- .tab -->
								<span class="tab"><a href="javascript:;"><span>2</span>Display Configuration</a></span>
								<!-- // .tab -->

								<!-- Choose Model -->
								<div class="box-configurator configurator-display1" ng-class="{'is-active':getTab(2)}">
									<i class="opt-tab-display1"><a href="javascript:;" ng-click="setTab(2)">Choose Model</a></i>
									<div class="opt-cont-display1" ng-show="getTab(2)" ng-class="{'is-active':getTab(2)}">
										<fieldset>
											<legend>options room configurator</legend>

											<!-- DISPLAY Options-->
											<div class="box-option">
												<div class="inner">
													<!-- .define model -->
													<div class="define-model">
														<div class="btnarea"><a href="javascript:;" id="selects-model" class="g-btn-m-arrow1" ng-click="getChooseDisplayLayer(true)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Choose Model][SELECT MODEL]_btn');"><span>Select Model</span></a></div>
														<p class="mcode">Model Name : <span>"{{display.name}}"</span></p>
													</div><!-- // .define model -->
												</div>
											</div>
										</fieldset>
									</div>
								</div><!-- // Choose Model -->

								<!-- Display Layout -->
								<div class="box-configurator configurator-display2" ng-class="{'is-active':getTab(3)}">
									<i class="opt-tab-display2"><a href="javascript:;" ng-click="setTab(3)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Display Layout]_tab');">Display Layout</a></i>
									<div class="opt-cont-display2" ng-show="getTab(3)" ng-class="{'is-active':getTab(3)}">
										<fieldset>
											<legend>options room configurator</legend>

											<!-- .define layout -->
											<div class="box-option">
												<div class="inner">
													<div class="define-model">
														<!-- .controls Columns//Rows -->
														<div class="controls">
															<!-- .control-columns -->
															<div class="control-columns">
																<label for="Columns">Columns</label>
																<div class="input-group">
																	<input type="text" id="Columns" class="form-control" ng-model="display.videowall.input_col">
																	<div class="input-group-addon">
																		<span class="input_arrow arrow_up" ng-click="changeCol(1)"></span>
																		<span class="input_arrow arrow_down" ng-click="changeCol(-1)"></span>
																	</div>
																</div>
															</div><!-- // .control-columns -->

															<!-- .control-rows -->
															<div class="control-rows">
																<label for="">Rows</label>
																<div class="input-group">
																	<input type="text" id="rows" class="form-control" ng-model="display.videowall.input_row">
																	<div class="input-group-addon">
																		<a class="input_arrow arrow_up" ng-click="changeRow(1)"></a>
																		<a class="input_arrow arrow_down" ng-click="changeRow(-1)"></a>
																	</div>
																</div>
															</div><!-- // .control-rows -->
														</div>
													</div>

													<!-- <div class="btnarea al-r"><a href="javascript:;" class="g-btn-m-arrow1" ng-click="setMaxVideowall()" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Display Layout][FIT TO ROOM]_btn');"><span>Fit to room</span></a></div> -->
													<!-- 201708 -->
													<div class="btnarea al-r al-r2"><a href="javascript:;" class="g-btn-l-reset" ng-click="resetContents()" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Display Layout][Reset]_btn');"><span>Reset</span></a></div>
													<!-- //201708 -->
												</div>
											</div>
										</fieldset>
									</div>
								</div><!-- // Display Layout -->

								<!-- Orientation -->
								<div class="box-configurator configurator-display3" ng-class="{'is-active':getTab(4)}">
									<i class="opt-tab-display3"><a href="javascript:;" ng-click="setTab(4)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Orientation]_tab');">Orientation</a></i>
									<div class="opt-cont-display3" ng-show="getTab(4)" ng-class="{'is-active':getTab(4)}">
										<fieldset>
											<legend>options room configurator</legend>

											<!-- .define layout -->
											<div class="box-option">
												<div class="inner">
													<!-- .define orientation -->
													<div class="define-orientation">
														<!-- .controls orientation -->
														<div class="controls">
															<div class="control-orientation">
																<select class="form-control" ng-model="display.orientation" ng-change="changeOrientation()" ng-style="{'width' : 192 + 'px'}" onchange="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Orientation][' +  this.options[this.selectedIndex].text   + ']_btn');">
																	<option ng-repeat="orientation in ['landscape', 'portrait']" value="{{orientation}}" ng-selected="orientation === display.orientation">{{orientation}}</option>
																	<!-- <option value="landscape" ng-selected="display.orientation === 'portrait'" >Landscape</option>
                                                                    <option value="portrait" ng-selected="display.orientation === 'portrait'" >Portrait</option> -->
																</select>
															</div>
														</div><!-- // .controls orientation -->
													</div><!-- // .define orientation -->
												</div>
											</div>
									</div><!-- // .define layout -->
									</fieldset>
								</div><!-- // Orientation -->
							</div><!-- // DISPLAY CONFIGURATION -->

							<!-- CONTENT CONFIGURATION -->
							<div class="opts-configurator-content" ng-class="{'is-active':getTab(5)}">
								<!-- .tab -->
								<span class="tab"><a href="javascript:;"><span>3</span>Content Configuration</a></span>
								<!-- // .tab -->

								<div class="box-configurator configurator-content1" ng-class="{'is-active':getTab(5)}">
									<i class="opt-tab-content1"><a href="javascript:;" ng-click="setTab(5)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Upload Content]_tab');">Upload Content</a></i>
									<div class="opt-cont-content1" ng-show="getTab(5)" ng-class="{'is-active':getTab(5)}">
										<fieldset>
											<legend>options room Orientation</legend>

											<!-- ROOM Options-->
											<div class="box-option">
												<div class="inner">
													<!-- .define browse -->
													<div class="define-upload">
														<div class="upload">
															<input type="file" class="upload" file-model="videoFile1" id="tempFile1" name="tempFile1" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Upload Content][FILE]_btn');">
															<div class="btnarea"><button type="button" class="g-btn-m-arrow1"><span>BROWSE…</span></button></div>
														</div>

														<div class="opt-select">
															<select class="type" title="select type" ng-model="upload.contents.video" ng-options="video.title for video in upload.video.list" ng-change="getVideo(upload.contents.video)" onchange="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Upload Content][' +  this.options[this.selectedIndex].text   + '][Select]_btn');">
																<option value="">Default Image</option>
															</select>
														</div>

														<ul class="tip">
															<li><i>IMAGE : </i>jpg or png only, max 3mb</li>
															<li><i>VIDEO : </i>mp4 only, max 15mb</li>
														</ul>
														<!-- <i class="tip">jpg or png only, 3MB max size</i> -->
													</div><!-- // .define browse -->

													<div class="btnarea al-r">
														<button type="button" class="g-btn-m-arrow2" ng-click="resetImgContents();" ng-style="setResetBtnStyle()" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Upload Content][RESET]_btn');"><span>Reset content</span></button>
													</div>
												</div>
											</div>
										</fieldset>
									</div>
								</div>
							</div><!-- // CONTENT CONFIGURATION -->
							<!-- </form> -->
						</div>
					</div>
					<!-- // #options-tool -->

					<!-- // #tool-view-total -->
					<div id="tool-view-total">
						<!-- #blueprint-->
						<div id="blueprint" class="scrollbar" ng-init="tab.view = 1" ng-show="getViewTab(1)">
							<div class="ly-full-mask"></div>


							<%--<div class="unit-vs"><div class="space"><span>Horizontal</span> <span>Space</span><i>{{getBlueprintSpace(room.size.width, setBlueprintWidth())}} {{unit == 'feet' ? 'ft' : 'm' }}</i></div></div>--%>
							<%--<div class="unit-hs"><div class="space"><span>Vertical</span> <span>Space</span><i>{{getBlueprintSpace(room.size.height, setBlueprintHeight())}} {{unit == 'feet' ? 'ft' : 'm' }}</i></div></div>--%>

							<div class="scroll-viewport">
								<div class="scroll-overview" style="top:0px;">
									<div id="blueprint_scenario_background">
										<img id="blueprint_img" src="/${attachFile}" width="100%" />
										<!-- img id="blueprint_img" src="/static/images/configuratorApp/Screenshot_20170915173609.jpg" width="100%" / -->
									</div>
								</div>
							</div>
						</div>
						<!-- #blueprint-->

						<!-- // #view_options -->
						<div id="view_options" class="tools-view-opt">
							<div class="inbox">
								<div class="btnarea">
									<a href="javascript:;" id="blueprint_btn" class="g-btn-l-o" ng-click="setViewTab(1)" ng-class="{'is-active':getViewTab(1)}"><span>Blueprint</span></a>
									<a href="javascript:;" id="render_btn" class="g-btn-l-o" ng-click="setViewTab(2)" ng-class="{'is-active':getViewTab(2)}"><span>Render</span></a>
									<a href="javascript:;" id="export_btn" class="g-btn-l-down2" ng-click="exportToPDF();"><span>Export to PDF</span></a>
								</div>
							</div>
						</div>
						<!-- // #view_options -->

						<!-- // #export_overlay -->
						<div id="export_overlay" style="display:none;">
							<div id="loader">
								Generating PDF <div style="margin-top:-15px;"><img src="/static/images/videowall_configurator/loader.gif"></div>
							</div>
						</div>
						<!-- // #export_overlay -->
					</div>
					<!-- // #tool-view-total -->
				</div>
				<!-- // #tool Configurator -->

				<!--// #spec_container-->
				<div id="spec_container" class="container">
					<div class="info-model-specifications">
						<div class="tb-h">
							<h3>Specifications</h3>
							<strong class="model-code"><a href="{{data[layer.choose.name].choose['url_' + host]}}" target="_blank">{{display.name}}</a></strong>
						</div>
						<!-- 201708 -->
						<table class="g-tb-data">
							<tbody>
							<tr>
								<th rowspan="2" class="th1">DISPLAY REQUIREMENTS</th>
								<th class="th2">Total No. of Displays</th>
								<td id="spec_displayNum">{{display.videowall.col * display.videowall.row}}</td>
							</tr>
							<tr>
								<th class="th2 bug-ie">Screen Configuration (WxH)</th>
								<td id="spec_screenConfig">{{display.videowall.col}} x {{display.videowall.row}}</td>
							</tr>
							<tr>
								<th rowspan="3" class="th1">DISPLAY WALL DIMENSIONS</th>
								<th class="th2">Dimensions (WxHxD)</th>
								<td id="spec_dimension">{{setBlueprintWidth()}} x {{setBlueprintHeight()}} x {{setBlueprintDpi()}} {{unit == 'feet' ? 'ft' : 'm' }}</td>
							</tr>
							<tr>
								<th class="th2 bug-ie">Diagonal</th>
								<td id="spec_diagonal">{{setDiagonal()}} inch</td>
							</tr>
							<tr>
								<th class="th2 bug-ie">Weight</th>
								<td id="spec_weight">{{setWeight()}} kg</td>
							</tr>
							<tr>
								<th rowspan="2" class="th1">POWER REQUIREMENTS</th>
								<th class="th2">Max</th>
								<td id="spec_max">{{setMax()}} (W/h)</td>
							</tr>
							<tr>
								<th class="th2 bug-ie">Typical</th>
								<td id="spec_typical">{{setTypical()}} (W/h)</td>
							</tr>
							<!--  
							<tr>
								<th class="th2 bug-ie">BTU</th>
								<td id="spec_btu">{{setBTU()}} (W/h)</td>
							</tr>
							-->
							</tbody>
						</table>

					</div>
				</div>
				<!--// #spec_container-->
				
				<input type="hidden" id="pdfTitle" value="${pdfTitle}"  maxlength="20" />
				<input type="hidden" id="configType" name="configType" value="${configType}"/>
				<input type="hidden" id="device" name="device" value="${device}"/>
				
				
				<!-- // 16-08-19 alert modify :: start :: rui13th -->
				<div class="g-layer-fix-size1 ly-configurator" ng-class="{'is-active':layer.limit.open === true}">
				<!-- layer -->
				<div class="layer">
				<div class="inbox">
				<h2 class="sm">{{layer.limit.msg}}</h2>
				<!--<div class="btnarea">-->
				<!--<p><a href="/member/sign-in?returnUrl=/search/commonsearch" class="g-btn-l-arrow3"><span>SIGN IN</span></a></p>-->
				<!--</div>-->
				<span class="angular-close"><button type="button" ng-click="layer.limit.closeF()">layer close</button></span>
				</div>
				</div>
				<!-- layer -->
				<div class="ly-mask"></div>
				</div>
				<!-- // 16-08-19 alert modify :: end :: rui13th -->

				<!-- // 16-08-19 alert modify :: start :: rui13th -->
				<div class="g-layer-fix-size1 ly-configurator" ng-class="{'is-active':layer.uploadAlert.open === true}">
				<!-- layer -->
				<div class="layer">
				<div class="inbox">
				<h2 class="sm">{{layer.uploadAlert.msg}}</h2>
				<!--<div class="btnarea">-->
				<!--<p><a href="/member/sign-in?returnUrl=/search/commonsearch" class="g-btn-l-arrow3"><span>SIGN IN</span></a></p>-->
				<!--</div>-->
				<span class="angular-close"><button type="button" ng-click="layer.uploadAlert.closeF()">layer close</button></span>
				</div>
				</div>
				<!-- layer -->
				<div class="ly-mask"></div>
				</div>
				<!-- // 16-08-19 alert modify :: end :: rui13th -->
				
				<!-- // 17-09-11 alert add :: start :: rui13th -->
					<div class="g-layer-fix-size1 ly-configurator" ng-class="{'is-active':layer.same.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2 class="sm" style="font-size:28px;">{{layer.same.msg}}</h2>
								<span class="angular-close"><button type="button" ng-click="layer.same.closeF()">layer close</button></span>
							</div>
						</div>
						<!-- layer -->
						<div class="ly-mask"></div>
					</div>
					<!-- // 17-09-11 alert add :: end :: rui13th -->




				<!-- .ly-loading-layer -->
				<div class="g-layer-fix-size ly-loading" id="loading-layer" ng-class="{'is-active':layer.loading.open === true}">
					<!-- layer -->
					<div class="layer">
						<div class="loading">
						</div>
					</div>
					<div class="ly-mask" style="display:none;"></div>
				</div><!-- // .ly-loading-layer -->



		</div>
		</form>
	</div><!--// #videowall-configurator-->
	<!-- . support-tools-configurator -->

</main><hr><!-- // #content -->

<footer id="footer" role="contentinfo"></footer>

</body>

<style>
	/*.summary a{#3f85fe}*/
	/*.model-code a{text-decoration:none;color:#fff; }*/
	/*.model-code a:hover, .model-code a:link, .model-code a:visited, .model-code a:active, .model-code a:focus {color:#fff;}*/

	.ly-choose-display{ display:none; }
	.ly-choose-display.is-active{ display:block; }
	.ly-upload-content{ display:none; }
	.ly-upload-content.is-active{display:block;}
	.ly-upload-content .layer{padding-top:200px;}
	.ly-configurator{ display:none; }
	.ly-configurator.is-active{ display:block; }
	.ly-configurator .angular-close{position:absolute;right:10px;top:9px;overflow:hidden;display:block;width:40px;height:40px;background:url('/static/images/btn/btn_ly_close.png') center center no-repeat;background-size:19px 20px;}
	.ly-configurator .angular-close button{width:100%;height:100%;text-indent:-500px;font-size:0;line-height:0;}
	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
	}
	.ly-loading{display:none;}
	.ly-loading.is-active{display:block;}
	.ly-loading .layer{padding-top:500px; width:500px;}
	#upload-layer.fakeW .g-select-title{width:100% !important;}

</style>

<!-- ui js -->
<!--  script src="/static/js/ssds.common.js"></script-->
<!-- script src="/static/js/ssds.support.js"></script -->
<!--  pdf전환  -->
<script src="/static/js/lib/jspdf/html2canvas.js"></script>
<script src="/static/js/lib/export_loader.js"></script>
<script src="/static/js/lib/jspdf/jspdf.js"></script>
<script src="/static/js/lib/jspdf/jspdf.plugin.addimage.js"></script>
<script src="/static/js/lib/jspdf/FileSaver.js"></script>

<script>
function pdfExportApp(pdfUrl){	
	var obj = new Object();
	
	var osName 		= "${os}";
	var configType 	= $("#configType").val();
	
	if (osName=="I") {
		obj.command = "sendUrlPDF"; //커맨드명
		obj.url = pdfUrl;
		var jsonString= JSON.stringify(obj);
		webkit.messageHandlers.callbackHandler.postMessage(jsonString);	
	}else if (osName=="A") {		
		android.sendUrlPDF(pdfUrl);
	}
}
</script>

<script src="/static/js/lib/exportPDF_App.js?20171122"></script>
<!--  app  -->
<!-- script src="/static/js/configurator/configuratorAppForApp.js?20171013"></script-->

<script>
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
        name : '${modelName}'
      };
  
  configuratorSection = function(){
    var config = {
          unit : '${unitValue}',
          room : {width : ${width}, height : ${height}},
          videowall : {row : ${rows}, col : ${columns}},
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
      
	  angular.element('#footer').append('<div id="insert_title" style="background:#0088d0;color:#fff;font-size:48px;font-weight:bold;width:1100px;margin:0 auto;padding:50px 0 0 90px;display:none;">${pdfTitle}</div>');
	  angular.element('#insert_title').css('font-family',"'SamsungOneRg' !important");
      
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
          meter_height : s.model.display.data.choose.dimension.height * 0.001,
          meter_dpi : s.model.display.data.choose.dimension.dpi * 0.001
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
      s.setBlueprintDpi = function(){
    	var dpi;
    	
    	if(s.unit == 'feet'){
    		dpi = s.converseToFeet(s.display.size.meter_dpi);
    	}else{
    		dpi = s.display.size.meter_dpi;
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
    	  var pattern = /^([0-9]*)[\.]?([0-9])?$/;
    	  if(!pattern.test(btu)){
    		  btu = btu.toFixed(2);
    	  }
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
    	  var title = (angular.element('#pdfTitle').val()) ? angular.element('#pdfTitle').val() : 'VIDEOWALL CONFIGURATOR';
    	  s.upload = uploadModel.get();
    	  s.layer.title.closeF();
    	  angular.element('#insert_title').text(title);
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
      
      model.name = '${modelName}';
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
        return (a < b) ? -1 : (a == b) ? 0 : 1;   // 또는,  return a.localeCompare ( b );
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
        
        model.name = '${modelName}';
        model.data = o_data['${modelName}'];
        
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
</script>
<script>
$(document).ready(function() {
	exportToPDF();
});
</script>
<!-- //ui js -->
</html>