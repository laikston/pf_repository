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
<link rel="stylesheet" href="/static/css/led_configurator.css"/>

<script src="/static/js/configurator/lib/angular.min.js"></script>

</head>

<body>

<main id="content" role="main">
	<!-- . support-tools-configurator -->

	<div class="support-tools-configurator tool-led">
		<!-- #videowall-configurator configurator-section -->
		<div id="videowall-configurator" class="configurator-section" ng-app="led-configurator" ng-controller="ledConfiguratorController as videowall" ng-cloak>
			<form method="post" id="configuratorsFrm" name="configuratorsFrm"  enctype="multipart/form-data" >
				<div class="g-box need-help">
					<div class="inbox">
						<div class="g-h-box">
							<h1 class="h-page">LED Configurator</h1>
						</div>
						<div class="btnarea">
							<a href="javascript:;" class="g-btn-l-o" ng-click="openHelp()" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][NEED HELP]_btn');"><span>Need Help ?</span></a>
						</div>
					</div>
				</div>

				<!-- #tool Configurator -->
				<div id="tool-configurator" class="tool-videowall" >
					<!-- #options-tool -->
					<div id="options-tool" class="options-tool" style="overflow:hidden;">
						<div class="fitToWallBtn"><div><a href="javascript:;" class="g-btn-l-fit" ng-click="setMaxVideowall()" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Display Layout][FIT TO WALL]_btn');"><span>Fit to wall</span></a></div></div>
						<div id="form-tool" class="inbox">
							<!-- ROOM CONFIGURATION -->
							<div class="opts-configurator-room" ng-class="{'is-active':getTab(1)}"><!-- .is-active || null -->
								<!-- .tab -->
								<span class="tab"><a href="javascript:;"><span>1</span>room configuration</a></span>
								<!-- // .tab -->
								<!-- Define Wall Size -->
								<div class="box-configurator configurator-room1" ng-class="{'is-active':getTab(1)}"><!-- .is-active || null -->
									<i class="opt-tab-room1"><a href="javascript:;" ng-click="setTab(1)" ng-init="tab.opts=1" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Define Wall Size]_tab');">Define Wall Size</a></i>
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
															<li><a href="javascript:;" ng-click="setUnit('feet')" class="g-btn-m-arrow1" ng-class="{'is-active':(tab.unit == 'feet') ? true : false}" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Define Wall Size][FEET]_btn');"><span>Feet</span></a></li>
															<li><a href="javascript:;" ng-click="setUnit('meter')" class="g-btn-m-arrow1" ng-class="{'is-active':(tab.unit == 'meter') ? true : false}" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Define Wall Size][METERS]_btn');"><span>Meters</span></a></li>
														</ul><!-- // .unit -->
														<!-- .controls -->
														<div class="controls">
															<div class="control-w">
																<label>Width ({{unit == 'feet' ? 'ft' : 'm'}})</label>
																<div class="input-group">
																	<input type="number" class="form-control" ng-model="wall.size.width" step="any" ng-change="restrictSize(wall.size.width, 'width')" input-number>
																	<div class="input-group-addon">
																		<a class="input_arrow arrow_up" ng-click="changeWallWidth(1)"></a>
																		<a class="input_arrow arrow_down" ng-click="changeWallWidth(-1)"></a>
																	</div>
																</div>
															</div>
															<div class="control-h">
																<label>Height ({{unit == 'feet' ? 'ft' : 'm' }})</label>
																<div class="input-group">
																	<input type="number" class="form-control" ng-model="wall.size.height" ng-change="restrictSize(wall.size.height, 'height')" step="any" input-number>
																	<div class="input-group-addon">
																		<a class="input_arrow arrow_up" ng-click="changeWallHeight(1)"></a>
																		<a class="input_arrow arrow_down" ng-click="changeWallHeight(-1)"></a>
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
									<i class="opt-tab-display1"><a href="javascript:;" ng-click="setTab(2)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Choose Model]_tab');">Choose Model</a></i>
									<div class="opt-cont-display1" ng-show="getTab(2)" ng-class="{'is-active':getTab(2)}">
										<fieldset>
											<legend>options room configurator</legend>
											<!-- DISPLAY Options-->
											<div class="box-option">
												<div class="inner">
													<!-- .define model -->
													<div class="define-model">
														<div class="btnarea"><a href="javascript:;" id="selects-model" class="g-btn-m-arrow1" ng-click="getChooseDisplayLayer(true)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Choose Model][SELECT MODEL]_btn');"><span>Select Model</span></a></div>
														<p class="mcode">Model Name : <span>"{{display.name}}"</span></p>
													</div><!-- // .define model -->
												</div>
											</div>
										</fieldset>
									</div>
								</div><!-- // Choose Model -->
								<!-- Display Layout -->
								<div class="box-configurator configurator-display2" ng-class="{'is-active':getTab(3)}">
									<i class="opt-tab-display2"><a href="javascript:;" ng-click="setTab(3)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Display Layout]_tab');">Display Layout</a></i>
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
																	<input type="text" id="Columns" class="form-control" ng-model="videowall.input_col">
																	<div class="input-group-addon">
																		<span class="input_arrow arrow_up" ng-click="changeCol(1, false)"></span>
																		<span class="input_arrow arrow_down" ng-click="changeCol(-1, false)"></span>
																	</div>
																</div>
															</div><!-- // .control-columns -->
															<!-- .control-rows -->
															<div class="control-rows">
																<label for="">Rows</label>
																<div class="input-group">
																	<input type="text" id="rows" class="form-control" ng-model="videowall.input_row">
																	<div class="input-group-addon">
																		<a class="input_arrow arrow_up" ng-click="changeRow(1, false)"></a>
																		<a class="input_arrow arrow_down" ng-click="changeRow(-1, false)"></a>
																	</div>
																</div>
															</div><!-- // .control-rows -->
														</div>
													</div>

													<!-- 201708 -->
													<div class="btnarea al-r"><a href="javascript:;" class="g-btn-l-reset" ng-click="resetContents()" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[Display Layout][Reset]_btn');"><span>Reset</span></a></div>
													<!-- //201708 -->
												</div>
											</div>
										</fieldset>
									</div>
								</div><!-- // Display Layout -->
								
								<!-- Orientation -->
								<div class="box-configurator configurator-display3" ng-class="{'is-active':getTab(4)}" style="display:none;"><!-- 170911 :: orientation 인라인 처리  -->
									<i class="opt-tab-display3"><a href="javascript:;" ng-click="setTab(4)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Orientation]_tab');">Orientation</a></i>
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
																<select class="form-control" ng-model="display.orientation" ng-change="changeOrientation()" ng-style="{'width' : 192 + 'px'}" onchange="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Orientation][' +  this.options[this.selectedIndex].text   + ']_btn');">
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
									<i class="opt-tab-content1"><a href="javascript:;" ng-click="setTab(5)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Upload Content]_tab');">Upload Content</a></i>
									<div class="opt-cont-content1" ng-show="getTab(5)" ng-class="{'is-active':getTab(5)}">
										<fieldset>
											<legend>options room Orientation</legend>
											<!-- ROOM Options-->
											<div class="box-option">
												<div class="inner">
													<!-- .define browse -->
													<div class="define-upload">
														<div class="upload">
															<input type="file" class="upload" file-model="videoFile1" id="tempFile1" name="tempFile1" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Upload Content][FILE]_btn');">
															<div class="btnarea"><button type="button" class="g-btn-m-arrow1"><span>BROWSE…</span></button></div>
														</div>
														<div class="opt-select">
															<select class="type" title="select type" ng-model="upload.contents.video" ng-options="video.title for video in upload.video.list" ng-change="getVideo(upload.contents.video)" onchange="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Upload Content][' +  this.options[this.selectedIndex].text   + '][Select]_btn');">
																<option value="">Default Image</option>
															</select>
														</div>
														<ul class="tip">
															<li><i>IMAGE : </i>jpg or png only, max 3mb</li>
															<!-- li><i>VIDEO : </i>mp4 only, max 15mb</li -->
														</ul>
													</div><!-- // .define browse -->
													<div class="btnarea al-r">
														<button type="button" class="g-btn-m-arrow2" ng-click="resetImgContents();" ng-style="setResetBtnStyle()" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Upload Content][RESET]_btn');"><span>Reset content</span></button>
													</div>
												</div>
											</div>
										</fieldset>
									</div>
								</div>
							</div><!-- // CONTENT CONFIGURATION -->
						</div>
					</div>
					<!-- // #options-tool -->

					<!-- // #tool-view-total -->
					<div id="tool-view-total" style="background:#ebedf0;position:relative;">
						<div id="help-section" style="max-width:1200px;margin:0 auto;position:relative;">
							<!-- body에 .is-needhelp-step1 추가 -->
							<div class="ly-help-step1" style="top:0;">
								<span class="this">look this</span>
								<div class="layer">
									<span class="step"><strong>1</strong>/3</span>
									<h2>Configuration Option</h2>
									<p class="desc">Click any of these buttons to configure the room, LED Signage or the content of the LED Signage</p>
									<div class="btnarea">
										<a href="javascript:;" class="g-btn-l-arrow5" ng-click="help.nextStep()" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][NEED HELP][Next]_btn');"><span>NEXT : SCENARIO</span></a>
									</div>
									<span class="close"><button type="button" ng-click="closeHelp()" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][NEED HELP][Close]_btn');">layer close</button></span>
								</div>
								<div class="ly-mask"></div>
							</div><!-- // body에 .is-needhelp-step1 추가 -->
							<!-- body에 .is-needhelp-step2 추가 -->
							<div class="ly-help-step2" style="left:150px;">
								<span class="this-blueprint">look this</span>
								<span class="this-render">look this</span>
								<div class="layer">
									<span class="step"><strong>2</strong>/3</span>
									<h2>Scenario</h2>
									<p class="desc">This is where all the configurations you make will be reflected and can be seen in two different views, Blueprint and Render.</p>
									<div class="btnarea">
										<a href="javascript:;" class="g-btn-l-arrow5" ng-click="help.nextStep()"><span>NEXT : EXPORT TO PDF</span></a>
									</div>
									<span class="close"><button type="button" ng-click="closeHelp()">layer close</button></span>
								</div>
								<div class="ly-mask"></div>
							</div><!-- // body에 .is-needhelp-step2 추가 -->
							<!-- body에 .is-needhelp-step3 추가 -->
							<div class="ly-help-step3" style="left:150px;">
								<span class="this" style="right:100px;">look this</span>
								<div class="layer">
									<span class="step"><strong>3</strong>/3</span>
									<h2>Export to PDF</h2>
									<p class="desc">When you have finished configuring your LED Signage, click here to download the PDF.</p>
									<div class="btnarea">
										<a href="javascript:;" class="g-btn-l-arrow5" ng-click="help.nextStep()"><span>NEXT : FINISH WIZARD</span></a>
									</div>
									<span class="close"><button type="button" ng-click="closeHelp()">layer close</button></span>
								</div>
								<div class="ly-mask"></div>
							</div><!-- // body에 .is-needhelp-step3 추가 -->
							<div class="ly-full-mask"></div>

							<div id="pdf-section" style="width:1020px;margin:0 auto;padding-top:40px;background:#ebedf0;">

								<!-- #blueprint-->
								<div id="blueprint2" class="scrollbar" ng-init="tab.view = 1" ng-show="getViewTab(1)" ng-style="setWallPosition()">
									<img id="blueprint_img" src="/${attachFile}" width="100%" />
									<!--img id="blueprint_img" src="/static/images/configuratorApp/Screenshot_20170915173609.jpg" width="100%"-->											
								</div>
								<!-- #blueprint-->

								<!-- #scenario -->
								<div id="scenario" class="scrollbar" ng-show="getViewTab(2)" ng-style="setWallPosition()">

									<div class="scroll-viewport">
										<div class="scroll-overview">
											<div id="alert_container">
												<div id="scenario_background" class="ng-scope">
													<div id="scenario_middle" ng-style="{'height':wall.size.pixel_height}">
														<div id="space">
															<!-- opts width -->
															<div class="choose-size-w"><!-- ng-style="{'top':room.opts.sizeW_top}" -->
																<span class="opt-btn-plus"><button type="button" ng-click="changeCol(1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][COL PLUS]_btn');">pluse</button></span>
																<span class="opt-btn-minus"><button type="button" ng-click="changeCol(-1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][COL MINUS]_btn');">minus</button></span>
															</div>
															<!-- opts height -->
															<div class="choose-size-h"><!-- ng-style="{'left':room.opts.sizeH.position.left, 'top':room.opts.sizeH.position.top}" -->
																<span class="opt-btn-plus"><button type="button" ng-click="changeRow(1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][ROW PLUS]_btn');">pluse</button></span>
																<span class="opt-btn-minus"><button type="button" ng-click="changeRow(-1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][ROW MINUS]_btn');">minus</button></span>
															</div>
															<div class="choose-opts"><!-- ng-style="{'top':room.opts.choose.position.top, 'left':room.opts.choose.position.left}" -->
																<ul>
																	<li ng-click="getChooseDisplayLayer(true)">
																		<div class="tooltip"><span>Choose Model</span></div>
																		<span class="opt-btn-model"><button type="button" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][Choose Model]_btn');">model</button></span>
																	</li>
																	<li ng-click="uploadContentLayer(true)">
																		<div class="tooltip"><span>Upload Content</span></div>
																		<span class="opt-btn-content"><button type="button" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][UPLOAD]_btn');">upload content</button></span>
																	</li>
																</ul>
															</div>
															<!-- // opts -->
															<div class="tbInbox" id="videowall_container" ng-style="getTotalDisplaysStyle()" style="border:1px solid #222;z-index:10;" >
																<!--<tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <table id="videowall" class="videowall" ng-style="{'width':display.pixel_size.width * videowall.col, 'height':display.pixel_size.height * videowall.row}">
                                                                                <tbody>
                                                                                    <tr ng-style="{'width':display.pixel_size.width * videowall.col, 'height':display.pixel_size.height}" ng-repeat="n in getRepeatNum(videowall.row) track by $index">
                                                                                        <td class="lfd" ng-repeat="n in getRepeatNum(videowall.col) track by $index" ng-style="{'width':display.pixel_size.width, 'height':display.pixel_size.height}" style="width:65.856px;height:74.088px;" repeat-complete></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>-->
															</div>
															<div class="prop" ng-style="{'width':person.size.width, 'left':person.position.right, 'display':(unit == 'meter')?((wall.size.width < 2 || wall.size.height < 2)?'none':'block'):((wall.size.width < 0.65 || wall.size.height < 0.65)?'none':'block')}">
																<img src="/static/images/videowall_configurator/default/guy_led.png">
															</div>
															<div id="videoContainer" class="inVideo" style="position: absolute; width: 141.459px; height: 79.8014px; overflow: hidden; top: 167.699px; left: 275.271px;" ng-style="getVideoContainerStyle()">
																
																<video autoplay="" loop="" muted="" ng-show="upload.contents.video != 'Default Image'" id="vid" style="width:auto;height:auto;" ng-style="videoSize()">
																	<source src type="video/mp4">
																</video>
															</div>
															<div class="model_tag measure_zidx" id="model-tag"><span class="model-name">{{display.name}}</span></div>
														</div>
														<!-- 170125 정은정 추가 :: space-dotted -->
														<div id="space-dotted" ng-style="getDottedStyle()"></div>
														<!-- // space-dotted -->
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- #scenario -->
								</div>
								<!-- //#pdf-section -->

							</div>
							<!-- //#help-section -->

							<!-- // #exceed-case -->
							<!-- // 170911 :: 옵션 테이블 삭제
							<div id="exceed-case" class="exceed-case" ng-show="showExceedCase()" style="z-index:10;">
								<div class="exceed-case-table" style="min-width:1024px;">
									<div id="exceed-case-table-data">
										<div class="exceed-case-col" style="cursor:default;">
											<ul>
												<li class="exceed-case-row exceed-case-title exceed-case-item exceed-case-title-2row exceed-case-option" style="padding-top:42px;height:96px;border-bottom:#cecece 1px solid;">Installed display</li>
												<li class="exceed-case-row exceed-case-title">Width ({{unit == 'feet' ? 'ft' : 'm' }})</li>
												<li class="exceed-case-row exceed-case-title">Height ({{unit == 'feet' ? 'ft' : 'm' }})</li>
												<li class="exceed-case-row exceed-case-title">No. of Cabinets (WxH)</li>
												<li class="exceed-case-row exceed-case-title">Resolution</li>
												<li class="exceed-case-row exceed-case-title">Required No. of S-Boxes</li>
											</ul>
										</div>
										<div class="exceed-case-col" ng-class="{'is-active':selectExceedCaseStyle(1)}" ng-click="clickExceedCase(1, true)">
											<ul>
												<li class="exceed-case-row exceed-case-title exceed-case-option">Option 1</li>
												<li class="exceed-case-row exceed-case-title exceed-case-title-2row" style="border-left:#cecece 1px solid;">Optimized<br/>to wall size</li>
												<li class="exceed-case-row" id="optimized-w">{{exceedOptimizedWidth()}}</li>
												<li class="exceed-case-row" id="optimized-h">{{exceedOptimizedHeight()}}</li>
												<li class="exceed-case-row" id="optimized-cabinet">{{exceedOptimizedCabinet()}}</li>
												<li class="exceed-case-row" id="optimized-resolution">{{exceedOptimizedResolution()}}</li>
												<li class="exceed-case-row" id="optimized-sbox">{{exceedOptimizedSbox()}}</li>
											</ul>
										</div>
										<div class="exceed-case-col" ng-class="{'is-active':selectExceedCaseStyle(2)}" ng-click="clickExceedCase(2, true)">
											<ul>
												<li class="exceed-case-row exceed-case-title exceed-case-option">Option 2</li>
												<li class="exceed-case-row exceed-case-title exceed-case-title-2row">Height greater<br/>than wall</li>
												<li class="exceed-case-row" id="height-w">{{exceedHeightWidth()}}</li>
												<li class="exceed-case-row" id="height-h">{{exceedHeightHeight()}}</li>
												<li class="exceed-case-row" id="height-cabinet"">{{exceedHeightCabinet()}}</li>
												<li class="exceed-case-row" id="height-resolution">{{exceedHeightResolution()}}</li>
												<li class="exceed-case-row" id="height-sbox">{{exceedHeightSbox()}}</li>
											</ul>
										</div>

										<div class="exceed-case-col" ng-class="{'is-active':selectExceedCaseStyle(3)}" ng-click="clickExceedCase(3, true)">
											<ul>
												<li class="exceed-case-row exceed-case-title exceed-case-option">Option 3</li>
												<li class="exceed-case-row exceed-case-title exceed-case-title-2row">Width greater<br/>than wall</li>
												<li class="exceed-case-row" id="width-w">{{exceedWidthWidth()}}</li>
												<li class="exceed-case-row" id="width-h">{{exceedWidthHeight()}}</li>
												<li class="exceed-case-row" id="width-cabinet">{{exceedWidthCabinet()}}</li>
												<li class="exceed-case-row" id="width-resolution">{{exceedWidthResolution()}}</li>
												<li class="exceed-case-row" id="width-sbox">{{exceedWidthSbox()}}</li>
											</ul>
										</div>
										<div class="exceed-case-col" ng-class="{'is-active':selectExceedCaseStyle(4)}" ng-click="clickExceedCase(4, true)">
											<ul>
												<li class="exceed-case-row exceed-case-title exceed-case-option">Option 4</li>
												<li class="exceed-case-row exceed-case-title exceed-case-title-2row">Width & Height<br/>greater than wall</li>
												<li class="exceed-case-row" id="over-w">{{exceedOverWidth()}}</li>
												<li class="exceed-case-row" id="over-h">{{exceedOverHeight()}}</li>
												<li class="exceed-case-row" id="over-cabinet">{{exceedOverCabinet()}}</li>
												<li class="exceed-case-row" id="over-resolution">{{exceedOverResolution()}}</li>
												<li class="exceed-case-row" id="over-sbox">{{exceedOverSbox()}}</li>
											</ul>
										</div>
									</div>
								</div>
							</div> -->
							<!-- // #exceed-case -->
							
							
							
						</div>
						<!-- // #tool-view-total -->

						<!-- // #export_overlay -->
						<div id="export_overlay" style="display:none;">
							<div id="loader">
								Generating PDF <div style="margin-top:-15px;"><img src="/static/images/videowall_configurator/loader.gif"></div>
							</div>
						</div>
						<!-- // #export_overlay -->

					</div>
					<!-- // #tool Configurator -->

					<!-- // #view_options -->
					<div id="view_options" class="tools-view-opt">
						<div class="inbox">
							<div class="btnarea">
								<a href="javascript:;" id="blueprint_btn" class="g-btn-l-o" ng-click="setViewTab(1)" ng-class="{'is-active':getViewTab(1)}" ><span>Blueprint</span></a>
								<a href="javascript:;" id="render_btn" class="g-btn-l-o" ng-click="setViewTab(2)" ng-class="{'is-active':getViewTab(2)}" ><span>Render</span></a>
								<a href="javascript:;" id="export_btn" class="g-btn-l-down2" ng-click="exportToPDF()"><span>Export to PDF</span></a>
							</div>
						</div>
					</div>
					<!-- // #view_options -->

					<!--// #spec_container-->
					<div id="spec_container" class="container">
						<div class="info-model-specifications">
							<div class="tb-h">
								<h3>Specifications</h3>
								<strong class="model-code"><a href="{{display.spec.URL}}" target="_blank">{{display.spec.PRODUCT_NAME}}</a></strong>
							</div>
							<!-- 201708 -->
							<table class="g-tb-data">
								<tbody>
								<tr>
									<th class="th1" rowspan="2">DISPLAY REQUIREMENTS</th>
									<th class="th2">Total No. of Cabinets</th>
									<td id="spec_cabinet">{{videowall.col * videowall.row}}</td>
								</tr>
								<tr>
									<th class="th2 bug-ie">Screen Configuration (WxH)</th>
									<td id="spec_config">{{videowall.col}} x {{videowall.row}}</td>
								</tr>
								<tr>
									<th class="th1" rowspan="3">DISPLAY WALL DIMENSIONS</th>
									<th class="th2">Dimensions</th>
									<td id="spec_dimension">{{setBlueprintWidth()}} X {{setBlueprintHeight()}} {{unit == 'feet' ? 'ft' : 'm' }}</td>
								</tr>
								<tr>
									<th class="th2 bug-ie">Display Area</th>
									<td id="spec_darea">{{setDisplayArea()}} {{unit == 'feet' ? 'ft²' : 'm²' }}</td>
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
									<th class="th1" rowspan="2">OPTICAL PARAMETER</th>
									<th class="th2">Resolution</th>
									<td id="spec_resolution">{{display.module.width * videowall.col}} X {{display.module.height * videowall.row}}</td>
								</tr>
								<tr>
									<th class="th2 bug-ie">{{(display.seriesname == "XAF Series") ? "Minimum No. of Sending Boxes" : "Minimum No. of S-Boxes"}}</th>								
									<td id="spec_sbox">{{specSbox()}}</td>
								</tr>
								<tr>
									<th class="th1" rowspan="2">POWER REQUIREMENTS</th>
									<th class="th2">Max</th>
									<td id="spec_max">{{setMax()}}</td>
								</tr>
								<tr>
									<th class="th2 bug-ie">Typical</th>
									<td id="spec_typical">{{setTypical()}}</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!--// #spec_container-->

					<!-- .ly-choose-display -->
					<div class="g-layer-fix-size ly-choose-display" ng-class="{'is-active':layer.choose.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2>Choose display to be configurator</h2>
								<!-- content -->
								<div class="choose-options-display">
									<div class="overview-product">
										<div class="thumb"><img ng-src="{{imgUrl + layer.choose.detail.IMG_URL}}" alt="Explore Samsung's Lineup of Powerful SMART Signage Products" class="pc" /></div>
										<div class="summary">
											<p class="sumCate">{{choose.detail.CATEGORY}}</p>
											<h3><a href="{{choose.detail.URL}}" target="_blank">{{layer.choose.name}}</a></h3>
											<ul class="spec">
												<li><i>Brightness :</i> {{layer.choose.detail.BRIGHTNESS}}</li>
												<li><i>Dimension :</i> {{layer.choose.detail.DIMENSIONS}}</li>
												<li><i>Refresh rate :</i> {{layer.choose.detail.REFRESH_RATE}}</li>
												<li><i>Color Temperature :</i> {{layer.choose.detail.COLOR_TEMPERATURE}}</li>
												<li><i>LED Lifetime :</i> {{layer.choose.detail.LED_LIFETIME}}</li>
											</ul>
											<div class="btnarea">
												<a href="javascript:;" class="g-btn-l-arrow3" ng-click="setChooseDisplay(layer.choose.name, layer.choose.seq)"><span>Choose This Model</span></a>
											</div>
										</div>
									</div>
									<!-- tab -->
									<div class="lyNewTab">
										<ul>
											<li ng-class="{'on':getChooseTab(1)}"><a href="javascript:;" ng-click="setChooseTab(1)">indoor</a></li>
											<li ng-class="{'on':getChooseTab(2)}"><a href="javascript:;" ng-click="setChooseTab(2)">outdoor</a></li>

										</ul>
									</div>
									<!-- // tab -->
									<!-- outdoor -->
									<div class="choose-product" ng-init="tab.choose=1" ng-show="getChooseTab(1)">
										<table class="g-tb-data">
											<thead>
											<tr>
												<th class="model" scope="col">Model Name</th>
												<th class="brightness" scope="col">Brightness</th>
												<th class="bezel" scope="col">Dimensions</th>
												<th class="size" scope="col">Refresh rate</th>
											</tr>
											</thead>
											<tbody>
											<tr ng-repeat="data in layer.choose.list" ng-click="getChooseDisplay(data.PRODUCT_NAME, data.SEQ)" ng-dblclick="setChooseDisplay(layer.choose.name, layer.choose.seq)" ng-class="{'is-active':layer.choose.seq === data.SEQ}" >
												<td>{{data.PRODUCT_NAME}}</td>
												<td>{{data.BRIGHTNESS}}</td>
												<td>{{data.DIMENSIONS}}</td>
												<td>{{data.REFRESH_RATE}}</td>
											</tr>
											</tbody>
										</table>
									</div>
									<!-- // outdoor -->
									<!-- indoor -->
									<div class="choose-product"  ng-show="getChooseTab(2)">
										<table class="g-tb-data">
											<thead>
											<tr>
												<th class="model" scope="col">Model Name</th>
												<th class="brightness" scope="col">Brightness</th>
												<th class="bezel" scope="col">Dimensions</th>
												<th class="size" scope="col">Refresh rate</th>
											</tr>
											</thead>
											<tbody>
											<tr ng-repeat="data in layer.choose.list" ng-click="getChooseDisplay(data.PRODUCT_NAME, data.SEQ)" ng-dblclick="setChooseDisplay(layer.choose.name, layer.choose.seq)"  ng-class="{'is-active':layer.choose.seq === data.SEQ}" >
												<td>{{data.PRODUCT_NAME}}</td>
												<td>{{data.BRIGHTNESS}}</td>
												<td>{{data.DIMENSIONS}}</td>
												<td>{{data.REFRESH_RATE}}</td>
											</tr>
											</tbody>
										</table>
									</div>
									<!-- // indoor -->
								</div>
								<!-- // content -->
								<span class="close"><button type="button" ng-click="getChooseDisplayLayer(false)">layer close</button></span>
							</div>
						</div>
						<!-- layer -->
						<div class="ly-mask"></div>
					</div><!-- // .ly-choose-display -->

					<!-- .ly-choose-display -->
					<div class="g-layer-fix-size ly-upload-content" id="upload-layer" ng-class="{'is-active':layer.upload.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2>Content Configuration</h2>
								<div class="g-copybox">
									<p class="headline">Upload Content</p>
									<ul class="tip">
										<li><i>IMAGE : </i>jpg or png only, max 3mb</li>
										<!-- li><i>VIDEO : </i>mp4 only, max 15mb</li -->
									</ul>
								</div>
								<div class="define-upload">
									<div class="upload">
										<input type="file" class="upload" file-model="videoFile2" id="tempFile2" name="tempFile2">
										<div class="btnarea"><button type="button" class="g-btn-m-arrow1"><span>BROWSE…</span></button></div>
									</div>
									<select class="type" title="select type" ng-model="upload.contents.video" ng-options="video.title for video in upload.video.list" ng-change="getVideo(upload.contents.video)" ng-style="{'width':192+'px'}">
										<option value="">Default Image</option>
									</select>
								</div><!-- // .define browse -->
								<!-- content -->
								<span class="close"><button type="button" ng-click="uploadContentLayer(false)">layer close</button></span>
							</div>
						</div>
						<div class="ly-mask"></div>
					</div><!-- // .ly-choose-display -->

					<!-- // 16-08-19 alert modify :: start :: rui13th -->
					<div class="g-layer-fix-size1 ly-configurator" ng-class="{'is-active':layer.limit.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2 class="sm">{{layer.limit.msg}}</h2>
								<span class="angular-close"><button type="button" ng-click="layer.limit.closeF()">layer close</button></span>
							</div>
						</div>
						<!-- layer -->
						<div class="ly-mask"></div>
					</div>
					<!-- // 16-08-19 alert modify :: end :: rui13th -->

					<!-- // 17-01-24 alert add :: start :: rui13th -->
					<div class="g-layer-fix-size1 ly-configurator" ng-class="{'is-active':layer.over.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2 class="sm" style="font-size:28px;">{{layer.over.msg}}</h2>
								<span class="angular-close"><button type="button" ng-click="layer.over.closeF()">layer close</button></span>
							</div>
						</div>
						<!-- layer -->
						<div class="ly-mask"></div>
					</div>
					<!-- // 17-01-24 alert add :: end :: rui13th -->

					<!-- // 17-01-31 alert add :: start :: rui13th -->
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
					<!-- // 17-01-31 alert add :: end :: rui13th -->
					
					<input type="hidden" id="pdfTitle" value="${pdfTitle}"  placeholder="LED CONFIGURATOR"  maxlength="20" />
					<input type="hidden" id="configType" name="configType" value="${configType}"/>
					<input type="hidden" id="device" name="device" value="${device}"/>					

					<!-- // 16-08-19 alert modify :: start :: rui13th -->
					<div class="g-layer-fix-size1 ly-configurator" ng-class="{'is-active':layer.uploadAlert.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2 class="sm">{{layer.uploadAlert.msg}}</h2>
								<span class="angular-close"><button type="button" ng-click="layer.uploadAlert.closeF()">layer close</button></span>
							</div>
						</div>
						<!-- layer -->
						<div class="ly-mask"></div>
					</div>
					<!-- // 16-08-19 alert modify :: end :: rui13th -->

					<!-- .ly-loading-layer -->
					<div class="g-layer-fix-size ly-loading" id="loading-layer" ng-class="{'is-active':layer.loading.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="loading"></div>
						</div>
						<div class="ly-mask" style="background:none;"></div>
					</div><!-- // .ly-loading-layer -->



				</div>
			</form>
		</div><!--// #videowall-configurator-->
		<!-- . support-tools-configurator -->
		<!-- <img src="" id="imgTest"/> -->
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

	body.is-needhelp-step1 #help-section .ly-full-mask{z-index:1000;}
	body.is-needhelp-step3 #help-section .ly-full-mask{z-index:1000;}

	#exceed-case-table-data{width:100%;background:#fff;overflow:hidden;}
	#exceed-case-table-data .exceed-case-row{padding:10px 0 0;border-bottom:#eaeaea 1px solid;border-left:#eaeaea 1px solid;text-align:center;height:39px;}
	#exceed-case-table-data .exceed-case-row.exceed-case-option{background:#e0e0e0 !important;border-bottom:#cecece 1px solid;border-left:#cecece 1px solid;}
	#exceed-case-table-data .exceed-case-row.exceed-case-title.exceed-case-title-2row{height:57px;background:#f8f8f8;border-bottom:#e4e4e4 1px solid;border-left:#e4e4e4 1px solid;}
	#exceed-case-table-data .exceed-case-row.exceed-case-title.exceed-case-item.exceed-case-title-2row{height:57px;background:#f8f8f8;}
	#exceed-case-table-data .exceed-case-col{width:20%;font-size:17px;line-height:1.1;float:left;cursor:pointer;}
	#exceed-case-table-data .exceed-case-col:first-child li{border-left:none;}


	#exceed-case-table-data .exceed-case-col.is-active .exceed-case-row{background:#e9effe;border-bottom:#d6dbe9 1px solid !important;}
	#exceed-case-table-data .exceed-case-col.is-active .exceed-case-option{background:#cdd2df !important;border-bottom:#bcc1cd 1px solid !important;}
	#exceed-case-table-data .exceed-case-col.is-active .exceed-case-title-2row{background:#e3e8f7;border-bottom:#d0d6e3 1px solid !important;}

</style>
<script src="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"/>
<script src="/static/js/etc.js"></script>


<!-- ui js -->
<script src="/static/js/ssds.common.js"></script>
<script src="/static/js/ssds.support.js"></script>
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

<script src="/static/js/lib/exportPDF_LED_App.js?20171121"></script>
<!--  app  -->
<script>
/**
 * SamSung Display Solutions
 * @author rui13th@pulipinc.com
 */
var ledConfiguratorApp = (function($){
	var config = {
			unit : '${unitValue}',
			wall : {width : ${width}, height : ${height}},
			videowall : {row : ${rows}, col : ${columns}},
			orientation : 'landscape',
			color : '#ffffff',
			image : '/static/images/videowall_configurator/background2.png',
			video : '/static/images/videowall_configurator/big_buck_bunny.mp4',
			display : { // 다시 세팅됨
				name : '${modelName}',
				seq : ${modelSeq}
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
        	
        	angular.element('#footer').append('<div id="insert_title" style="background:#0088d0;color:#fff;font-size:54px;font-weight:bold;width:1200px;margin:0 auto;padding:50px 0 0 90px;display:none;">${pdfTitle}</div>');
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
    					'padding-bottom' : 0 + 'px'
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
    				sbox = Math.ceil(resolutionW / constant.uhd.w) * Math.ceil(resolutionH / constant.uhd.h);
        			if(s.display.seriesname == 'XAF Series')	sbox = Math.ceil(resolutionW / constant.fhd.w) * Math.ceil(resolutionH / constant.fhd.h);
    			
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
				}else{ //
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
	
				}else{ //
					tmp = (s.unit == 'feet') ? s.display.spec.POWER_CONSUMPTION_TYPICAL2 * s.setDisplayArea() : s.display.spec.POWER_CONSUMPTION_TYPICAL1 * s.setDisplayArea();
					typical = Math.round(tmp);
				}    			
				if(s.display.spec.POWER_CONSUMPTION_TYPICAL == 'TBD' || s.display.spec.POWER_CONSUMPTION_TYPICAL == 'N/A') typical = s.display.spec.POWER_CONSUMPTION_TYPICAL;
				
				return typical + ' Watts';	
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
    	    	  //s.changeOrientation();    	    	  
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
    	      /* 171023 추가 */
    	      s.showText = function(_ridx, _didx){
    	    	 var isShow = false, ridx = _ridx, didx = _didx;
    	    	 if(s.videowall.mode != null){
    	    		 if(s.videowall[s.videowall.mode].row != 0 || s.videowall[s.videowall.mode].col != 0){
    	    			 if(((s.display[s.videowall.mode + '_each'].width * s.display.pixel_size.width) < 80) && ((s.display[s.videowall.mode + '_each'].height * s.display.pixel_size.height) < 76)){
    	    				 isShow = false;
    	    			 }else{
    	    				 if((parseInt(ridx % s.display[s.videowall.mode + '_each'].height) == 0) && (parseInt(ridx / s.display[s.videowall.mode + '_each'].height) < s.videowall[s.videowall.mode].row)){
    	    	    			 if((parseInt(didx % s.display[s.videowall.mode + '_each'].width) == 0) && (parseInt(didx / s.display[s.videowall.mode + '_each'].width) < s.videowall[s.videowall.mode].col)){
    	    	    				 isShow = true;
    	    	    			 }
    		    			  }
    	    			 }
    	    		 }    	    		 
    	    	 }
    	    	 return isShow;
    	      };
    	      s.getDisplayWidthStyle = function(){
    	    	  var style = {
    	    			  'width' : s.display.pixel_size.width, 
    	    			  'height' : s.display.pixel_size.height
    	    	  };
    	    	  return style;
    	      };
    	      s.setDisplayArea = function(){
    	    	  var area = (s.blueprintProp.width * s.blueprintProp.height).toFixed(2)//decimalPoint.getNum(s.blueprintProp.width * s.blueprintProp.height, 4);
    	    	  return area;
    	      };
    	      /*  //171023 추가 */    	      
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
        		
	  	    	s.blueprintProp = {/* 171116 :: 리펙토링 추가*/
		    		  width : 0,
		    		  height : 0
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
        		angular.element('#blueprint2 .model_tag .model-name').text(s.display.name);
        		
        	}
        	s.setVar = function(){
        		var req = $http({
            		method : 'GET',
            		url : '/support/led-configurator?method=detail&seq='
            	});
    			req.success(function(data, status, headers, config){
    				variable.set('display.name', data.detail.PRODUCT_NAME);
    				variable.set('display.seriesname', data.detail.SERIES_NAME);
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
        
        //configurator.factory('setDisplayProp', function(variable, converseDisplaySize, decimalPoint){
        configurator.factory('setDisplayProp', function(variable, converseDisplaySize, decimalPoint, perDisplay){        	
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
        	    		url : url + ${modelSeq}
        	    	});
        			req.success(function(data, status, headers, config){
        				variable.set('display.spec', data.spec);
        				variable.set('display.seriesname', data.spec.SERIES_NAME);
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
    
    return{init : init}
    
})(jQuery);

$(document).ready(function(){
	$('#loading-layer').addClass('is-active');
	ssds.common.newLoading(angular.element('#loading-layer .layer .loading'));
	$('body').addClass('no-scroll');
});

ledConfiguratorApp.init();
//angular.element(document.getElementById('videowall-configurator')).scope().releaseDisplay.set('${modelName}',${modelSeq});
//ledConfiguratorApp.configurator.setDisplay('${modelName}',${modelSeq});
</script>
<!-- //ui js -->
<script>
$(document).ready(function() {
	exportToPDF();
});
</script>
</html>