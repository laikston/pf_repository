<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/layout/taglibs.jsp"%>
<%
	String memberSeq  	= (String)session.getAttribute("memberSeq");
	boolean statusSign	= !("").equals(memberSeq) && memberSeq != null ? true : false;
	String memberNm	 	= "";	
	if(!"".equals(memberSeq)) {
		memberNm = (String)session.getAttribute("memberNm");
	}
%>
<c:set var="memberSeq" value="<%=memberSeq %>"/>
<c:set var="statusSign" value="<%=statusSign %>"/>
<c:set var="memberNm" value="<%=memberNm %>"/>
<!-- configurator css -->
<link rel="stylesheet" href="/static/css/configurator.css?20171128"/>
<link rel="stylesheet" href="/static/css/led_configurator.css?20180921"/>

<script src="/static/js/configurator/lib/angular.min.js"></script>

<main id="content" role="main">
	<!-- . support-tools-configurator -->

	<div class="support-tools-configurator tool-led">
		<!-- #videowall-configurator configurator-section -->
		<div id="videowall-configurator" class="configurator-section" ng-app="led-configurator" ng-controller="ledConfiguratorController as videowall" ng-cloak>
			<input type="hidden" ng-value="getModelSeq()" id="modelSeq" ng-init="setModelSeq(${seq})"/><!-- 20180327 modelSeq add // 20180808 cookie model add -->
			<input type="hidden" value="${memberNm}" id="memberNm" name="memberNm"/><!-- 20180724 memberNm add -->
			<form method="post" id="configuratorsFrm" name="configuratorsFrm"  enctype="multipart/form-data" >			
			<!-- 20171110 memberSeq add -->
			<input type="hidden" name="memberSeq" id="memberSeq" value="${memberSeq}" />			
			
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
					<div id="options-tool" class="options-tool">
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
													<!-- 171024 추가 -->
													<div class="btnarea al-r al-fhduhd"><a href="javascript:;" class="g-btn-l-fhduhd" ng-class="{'is-active':videowall.fhd.isActive}" ng-click="toggleFHDMode()" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[Display Layout][FHD]_btn');"><span>FHD</span></a></div>
													<div class="btnarea al-r"><a href="javascript:;" class="g-btn-l-fhduhd" ng-class="{'is-active':videowall.uhd.isActive}" ng-click="toggleUHDMode()" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[Display Layout][UHD]_btn');"><span>UHD</span></a></div>
													<!-- //171024 추가 -->
													
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

							<div id="pdf-section" style="width:1020px;margin:0 auto;padding-top:40px;background:#ebedf0;" ng-init="tab.view = 1"><!-- // 171124 성능최적화 수정 -->
								<!-- #blueprint-->
								<div id="blueprint" class="scrollbar" ng-style="setWallPosition()">
									<div class="scroll-viewport">
										<div class="scroll-overview">
											<div id="blueprint_scenario_background">
												<div id="scenario_middle" ng-style="{'height':wall.size.pixel_height}">
													<div id="space">
														<!-- opts width -->
														<div class="choose-size-w">
															<span class="opt-btn-plus"><button type="button" ng-click="changeCol(1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][COL PLUS]_btn');">pluse</button></span>
															<span class="opt-btn-minus"><button type="button" ng-click="changeCol(-1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][COL MINUS]_btn');">minus</button></span>
														</div>
														<!-- opts height -->
														<div class="choose-size-h">
															<span class="opt-btn-plus"><button type="button" ng-click="changeRow(1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][ROW PLUS]_btn');">pluse</button></span>
															<span class="opt-btn-minus"><button type="button" ng-click="changeRow(-1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][ROW MINUS]_btn');">minus</button></span>
														</div>
														<div class="choose-opts">
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
														<div class="prop" ng-style="{'width':person.size.width, 'left':person.position.right, 'display':(unit == 'meter')?((wall.size.width < 2 || wall.size.height < 2)?'none':'block'):((wall.size.width < 6.56 || wall.size.height < 6.56)?'none':'block')}">
															<img src="/static/images/videowall_configurator/default/guy_led.png">
														</div>
														<table class="tbContainer">
															<tr class="lineWidthTr">
																<td ng-show="getViewTab(1)" id="measure_width_total"><!-- // 171124 성능최적화 수정 -->
																	<div class="measure_width_dotted_line measure_zidx" ng-style="getOverWSpaceDottedStyle(getBlueprintSpace(wall.size.width, blueprintProp.width) / 2)"></div>
																	<div class="measure_width_space">
																		<div class="measure_width_space_left measure_zidx" ng-style="{'width':(689-(display.pixel_size.width * videowall.col)) / 2}">
																			<div ng-style="getTagWSpaceStyle(getBlueprintSpace(wall.size.width, blueprintProp.width) / 2)"><span class="measure-number">{{(videowall.col > videowall.max.col) ? '+'+(getBlueprintSpace(wall.size.width, blueprintProp.width) / 2) : (getBlueprintSpace(wall.size.width, blueprintProp.width) / 2)}} {{unit == 'feet' ? 'ft' : 'm' }}</span></div>
																		</div>
																		<div class="measure_width_space_right measure_zidx" ng-style="{'width':(689-(display.pixel_size.width * videowall.col)) / 2}">
																			<div ng-style="getTagWSpaceStyle(getBlueprintSpace(wall.size.width, blueprintProp.width) / 2, 'right')"><span class="measure-number">{{(videowall.col > videowall.max.col) ? '+'+(getBlueprintSpace(wall.size.width, blueprintProp.width) / 2) : (getBlueprintSpace(wall.size.width, blueprintProp.width) / 2)}} {{unit == 'feet' ? 'ft' : 'm' }}</span></div>
																		</div>
																	</div>
																	<div class="measure_width_new_line measure_zidx">
																		<!-- 아래 div 셋팅시 "margin-left" 값 (-) 값으로 셋팅 -> 수식 : -((width/2)-3) -->
																		<div ng-style="setBlueprintHorizonStyle(getBlueprintSpace(wall.size.width, blueprintProp.width) / 2)"  style="width: 65.856px; height: 254.756px; left: 313.072px;"></div>
																	</div>
																	<div class="measure_width_new measure_zidx">
																		<div id="measure_width" ng-style="getMeasureWStyle(getBlueprintSpace(wall.size.width, blueprintProp.width) / 2)" style="width: 65.856px; margin-left: 310.072px;">
																			<div class="width_tag_wrap">
																				<div class="width_tag" ng-style="getTagWStyle(blueprintProp.width)"><span class="measure-number">{{setBlueprintWidth()}} {{unit == 'feet' ? 'ft' : 'm' }}</span></div>
																			</div>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<td>	
																	<!-- 171120 :: 성능최적화 to svg -->
										                          	<div id="blueprint_container" class="tbInbox" ng-style="getTotalDisplaysStyle()">
										                          		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" ng-width="{{videowall.size.width}}" ng-height="{{videowall.size.height}}" ng-show="tab.view == 1">
											                          		<path id="col-line" ng-d="{{setColLine()}}" style="stroke:#a1a1a1; fill:none; stroke-opacity:0.6;"/>
																			<path id="row-line" ng-d="{{setRowLine()}}" style="stroke:#a1a1a1; fill:none; stroke-opacity:0.6;"/>
																			<path id="fhd-col-line" ng-d="{{setFHDColLine()}}" style="stroke:#fff; fill:none; stroke-opacity:1;"/>
																			<path id="fhd-row-line" ng-d="{{setFHDRowLine()}}" style="stroke:#fff; fill:none; stroke-opacity:1;"/>
																			<path id="uhd-col-line" ng-d="{{setUHDColLine()}}" style="stroke:#fff; fill:none; stroke-opacity:1;"/>
																			<path id="uhd-row-line" ng-d="{{setUHDRowLine()}}" style="stroke:#fff; fill:none; stroke-opacity:1;"/>
																			<text id="fhduhd-txt" x="0" y="0" style="fill:#fff;" font-family="Malgun Gothic" font-size="15" ng-hide="hideText()">
																				<tspan ng-repeat="pos in videowall[videowall.mode].txtPos track by $index" ng-x="{{pos.x}}" ng-y="{{pos.y}}" ng-cloak>{{videowall.mode | uppercase}}</tspan>
																			</text>
										                          		</svg>
										                          	</div>
										                          	<!-- 171120 :: 성능최적화 to svg -->			
										                          	
										                          	<!-- 													
																	<table class="tbInbox" id="blueprint_container" ng-style="getTotalDisplaysStyle()" style="top: 168.756px; left: 313.072px; width: 65.856px; height: 74.088px;">
																		<tbody>
																		<tr>
																			<td>
																				<table class="blueprint" ng-style="getTotalDisplaysStyle()">
																					<tbody>
																						<tr ng-style="getTotalDisplayWidthStyle()" ng-repeat="r in getRepeatNum(videowall.row) track by $index;" ng-init="$rowIdx = $index">
																							<td class="lfd" ng-repeat="d in getRepeatNum(videowall.col) track by $index" ng-style="getDisplayWidthStyle()" ng-class="getDisplayWidthClass($rowIdx, $index)" repeat-complete><span class="fhduhd-txt"ng-show="showText($rowIdx, $index)">{{videowall.mode | uppercase}}</span></td>
																						</tr>
																					</tbody>
																				</table>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																	 -->
																</td>
																<td class="lineHeightTd" ng-show="getViewTab(1)" id="measure_height_total"><!-- // 171124 성능최적화 수정 -->
																	<div class="measure_height_dotted_line measure_zidx" ng-style="getOverHSpaceDottedStyle(getBlueprintSpace(wall.size.height, blueprintProp.height) / 2)"></div>
																	<div class="measure_height_space measure_zidx" ng-style="getMeasureHStyle(getBlueprintSpace(wall.size.height, blueprintProp.height) / 2)">
																		<div class="measure_height_space_top" ng-style="{'height':(wall.size.pixel_height-(display.pixel_size.height * videowall.row)) / 2}">
																			<div ng-style="getTagHSpaceStyle(getBlueprintSpace(wall.size.height, blueprintProp.height) / 2)"><span class="measure-number">{{(videowall.row > videowall.max.row) ? '+'+(getBlueprintSpace(wall.size.height, blueprintProp.height) / 2) : (getBlueprintSpace(wall.size.height, blueprintProp.height) / 2)}} {{unit == 'feet' ? 'ft' : 'm' }}</span></div>
																		</div>
																		<div class="measure_height_space_bottom" ng-style="{'height':(wall.size.pixel_height-(display.pixel_size.height * videowall.row)) / 2}">
																			<div ng-style="getTagHSpaceStyle(getBlueprintSpace(wall.size.height, blueprintProp.height) / 2, 'bottom')"><span class="measure-number">{{(videowall.row > videowall.max.row) ? '+'+(getBlueprintSpace(wall.size.height, blueprintProp.height) / 2) : (getBlueprintSpace(wall.size.height, blueprintProp.height) / 2)}} {{unit == 'feet' ? 'ft' : 'm' }}</span></div>
																		</div>
																	</div>
																	<div class="measure_height_new_line measure_zidx" ng-style="{'top':(wall.size.pixel_height-(display.pixel_size.height * videowall.row)) / 2, 'width':(689-(display.pixel_size.width * videowall.col)) / 2 + 70 + 3}" style="top: 168.756px;width: 364.572px;">
																		<div ng-style="setBlueprintVerticalStyle()" style="height: 74.088px;"></div>
																	</div>
																	<div class="measure_height_new measure_zidx" ng-style="{'top':(wall.size.pixel_height-(display.pixel_size.height * videowall.row)) / 2}">
																		<div id="measure_height" ng-style="{'height':display.pixel_size.height * videowall.row}" style="height: 74.088px;">
																			<div ng-style="getTagHStyle(blueprintProp.height)" style="right:0;"><span class="measure-number">{{setBlueprintHeight()}} {{unit == 'feet' ? 'ft' : 'm' }}</span></div>
																		</div>
																	</div>
																</td>
															</tr>
														</table>
														<div id="videoContainer_blueprint" class="inVideo" ng-style="getVideoContainerStyle()">

															<video autoplay="" loop="" muted="" ng-show="upload.contents.video != 'Default Image'" id="vid_blueprint" style="width:auto;height:auto;" ng-style="videoSize()">
																<source src type="video/mp4">
															</video>
														</div>
														<div class="model_tag measure_zidx" id="model-tag" ><span class="model-name">{{display.name}}</span></div>
													</div>

													<!-- 170125 정은정 추가 :: space-dotted -->
													<div id="space-dotted" ng-style="getDottedStyle()" style="display:none;"></div>
													<!-- // space-dotted -->

												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- #blueprint-->

								<!-- #scenario // 171124 성능최적화로 삭제-->
								<!-- <div id="scenario" class="scrollbar" ng-show="getViewTab(2)" ng-style="setWallPosition()">

									<div class="scroll-viewport">
										<div class="scroll-overview">
											<div id="alert_container">
												<div id="scenario_background" class="ng-scope">
													<div id="scenario_middle" ng-style="{'height':wall.size.pixel_height}">
														<div id="space">
															<div class="choose-size-w">
																<span class="opt-btn-plus"><button type="button" ng-click="changeCol(1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][COL PLUS]_btn');">pluse</button></span>
																<span class="opt-btn-minus"><button type="button" ng-click="changeCol(-1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][COL MINUS]_btn');">minus</button></span>
															</div>
															<div class="choose-size-h">
																<span class="opt-btn-plus"><button type="button" ng-click="changeRow(1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][ROW PLUS]_btn');">pluse</button></span>
																<span class="opt-btn-minus"><button type="button" ng-click="changeRow(-1, false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][VIEW CHANGE][ROW MINUS]_btn');">minus</button></span>
															</div>
															<div class="choose-opts">
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
															<div class="tbInbox" id="videowall_container" ng-style="getTotalDisplaysStyle()"></div>
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
														//170125 정은정 추가 :: space-dotted
														<div id="space-dotted" ng-style="getDottedStyle()"></div>
													</div>
												</div>
											</div>
										</div>
									</div> -->
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

						<!-- // #export_overlay //171120 기본 로더 대체로 삭제 -->
						<!-- 
						<div id="export_overlay" style="display:none;">
							<div id="loader">
								Generating PDF <div style="margin-top:-15px;"><img src="/static/images/videowall_configurator/loader.gif"></div>
							</div>
						</div>
						 -->
						<!-- // #export_overlay -->

					</div>
					<!-- // #tool Configurator -->

					<!-- // #view_options -->
					<div id="view_options" class="tools-view-opt">
						<div class="inbox">
							<div class="btnarea">
								<a href="javascript:;" id="blueprint_btn" class="g-btn-l-o" ng-click="setViewTab(1)" ng-class="{'is-active':getViewTab(1)}" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][BLUEPRINT]_btn');"><span>Blueprint</span></a>
								<a href="javascript:;" id="render_btn" class="g-btn-l-o" ng-click="setViewTab(2)" ng-class="{'is-active':getViewTab(2)}" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][RENDER]_btn');"><span>Render</span></a>
								<!-- <a href="javascript:;" id="export_btn" class="g-btn-l-down2" onclick="exportToPDF();ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][EXPORT TO PDF]_btn');"><span>Export to PDF</span></a> -->
								<a href="javascript:;" id="export_btn" class="g-btn-l-down2" ng-click="setPDFTitle(${statusSign });ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][EXPORT TO PDF]_btn');"><span>Export to PDF</span></a>
								<span id="update-comment">
									<span class="tag-text">
										<span class="flash">UPDATED</span>
									</span>
									<a href="javascript:;" class="tag-info">
										<span class="tag-balloon">Now available with Frame kit, Data in/out and Power cable route information, when you 'Export to pdf'<br/>Note: This only applies to IFH, IFJ, IFH-D models</span>
									</a>
								</span>
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
									<th class="th1" rowspan="{{(showUpdateModel(display.name) == true) ? 4 : 2}}">DISPLAY REQUIREMENTS</th>
									<th class="th2 bug-ie">Screen Configuration (WxH)</th>
									<td id="spec_config">{{videowall.col}} x {{videowall.row}}</td>
								</tr>
								<tr ng-if="showUpdateModel(display.name)">
									<th class="th2 bug-ie">No. of Cabinets</th>
									<td id="spec_cabinet">{{videowall.col * videowall.row}}</td>
								</tr>							
								<tr ng-if="showUpdateModel(display.name)">
									<th class="th2 bug-ie">No. of Spare Cabinets</th>
									<td id="spec_bufferstock">{{setBufferStock(display.name, videowall.col * videowall.row)}}</td>
								</tr>
								<tr>
									<th class="th2" id="spec_total_title">{{(display.seriesname == 'IPS Series' || display.seriesname == 'IPE Series' || display.seriesname == 'XPS Series') ? 'Total No. of Modules' : 'Total No. of Cabinets' ;}}</th>
									<td id="spec_total">{{(showUpdateModel(display.name)) ? (videowall.col * videowall.row) + setBufferStock(display.name, videowall.col * videowall.row) : videowall.col * videowall.row}}</td>
								</tr>
								
								<tr>
									<th class="th1" rowspan="4">DISPLAY WALL DIMENSIONS</th>
									<th class="th2">Dimensions</th>
									<td id="spec_dimension">{{blueprintProp.width}} X {{blueprintProp.height}} {{unit == 'feet' ? 'ft' : 'm' }}</td>
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
									<th class="th2 bug-ie" id="spec_sbox_title">{{(display.seriesname == "XAF Series") ? "Minimum No. of Sending Boxes" : "Minimum No. of S-Boxes"}}</th></th><!-- //171215 id 추가 -->
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
								<!-- // 171024 보류 
								<tr>
									<th class="th1">ACCESSORIES</th>
									<th class="th2">Required No. of Frame Kit</th>
									<td id="spec_max">33</td>
								</tr>
								 -->
								</tbody>
							</table>
							<!-- //201708 -->
							<!--<table class="g-tb-data">
								<tbody>
								<tr>
									<th class="th1" rowspan="2">Physical Parameter</th>
									<th class="th2">Pixel Pitch</th>
									<td>{{display.spec.PIXEL_PITCH}}</td>
								</tr>
								<tr>
									<th class="th2 bug-ie">Dimensions</th>
									<td>{{display.spec.DIMENSIONS}}</td>
								</tr>
								<tr>
									<th class="th1" rowspan="3">Optical Parameter</th>
									<th class="th2">Brightness</th>
									<td>{{display.spec.BRIGHTNESS}}</td>
								</tr>
								<tr>
									<th class="th2 bug-ie">Contrast Ratio</th>
									<td>{{display.spec.CONTRAST_RATIO}}</td>
								</tr>
								<tr>
									<th class="th2">Color Temperature</th>
									<td>{{display.spec.COLOR_TEMPERATURE}}</td>
								</tr>
								<tr>
									<th class="th1">Electrical Parameter</th>
									<th class="th2">Refresh Rate</th>
									<td id="refresh-rate">{{display.spec.REFRESH_RATE}}</td>
								</tr>
								<tr>
									<th class="th1">Operation Conditions</th>
									<th class="th2">LED Lifetime</th>
									<td>{{display.spec.LED_LIFETIME}}</td>
								</tr>
								</tbody>
							</table>-->
							<p class="specifications-info" data-type="{{(display.seriesname == 'IPS Series' || display.seriesname == 'IPE Series' || display.seriesname == 'XPS Series') ? 'except-series' : 'normal-series'}}"><i>* {{(display.seriesname == 'IPS Series' || display.seriesname == 'IPE Series' || display.seriesname == 'XPS Series') ? 'Specifications may vary as this model is customizable. Please contact our sales team for details.' : 'Specifications are subject to change without notice.'}}</i></p><!-- // 171215 수정 -->
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
												<a href="javascript:;" class="g-btn-l-arrow3" ng-click="setChooseDisplay(layer.choose.name, layer.choose.seq)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Choose Model][CHOOSE THIS MODEL]_btn');"><span>Choose This Model</span></a>
											</div>
										</div>
									</div>
									<!-- tab -->
									<div class="lyNewTab">
										<ul>
											<li ng-class="{'on':getChooseTab(1)}"><a href="javascript:;" ng-click="setChooseTab(1)">indoor</a></li>
											<li ng-class="{'on':getChooseTab(2)}"><a href="javascript:;" ng-click="setChooseTab(2)">outdoor</a></li>
											<li ng-class="{'on':getChooseTab(3)}"><a href="javascript:;" ng-click="setChooseTab(3)">thewall</a></li> <!-- // 180807 Choose display to be configurator tab 막음 -->
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
												<td class="product-name">{{data.PRODUCT_NAME}}<span id="update-display-tag" ng-show="showUpdateModel(data.PRODUCT_NAME)">Updated Config</span></td>
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
												<td class="product-name">{{data.PRODUCT_NAME}}<span id="update-display-tag" ng-show="showUpdateModel(data.PRODUCT_NAME)">Updated Config</span></td>
												<td>{{data.BRIGHTNESS}}</td>
												<td>{{data.DIMENSIONS}}</td>
												<td>{{data.REFRESH_RATE}}</td>
											</tr>
											</tbody>
										</table>
									</div>
									<!-- // indoor -->
									<!-- thewall -->
									<div class="choose-product"  ng-show="getChooseTab(3)">
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
												<td class="product-name">{{data.PRODUCT_NAME}}<span id="update-display-tag" ng-show="showUpdateModel(data.PRODUCT_NAME)">Updated Config</span></td>
												<td>{{data.BRIGHTNESS}}</td>
												<td>{{data.DIMENSIONS}}</td>
												<td>{{data.REFRESH_RATE}}</td>
											</tr>
											</tbody>
										</table>
									</div>
									<!-- // thewall -->
								</div>
								<!-- // content -->
								<span class="close"><button type="button" ng-click="getChooseDisplayLayer(false)" onclick="ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][Choose Model][CLOSE]_btn');">layer close</button></span>
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
					<div class="g-layer-fix-size1 ly-configurator limit-layer" ng-class="{'is-active':layer.limit.open === true}">
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
					<div class="g-layer-fix-size1 ly-configurator over-layer" ng-class="{'is-active':layer.over.open === true}">
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
					<div class="g-layer-fix-size1 ly-configurator same-layer" ng-class="{'is-active':layer.same.open === true}">
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
					
					<!-- // 17-10-25 alert add :: start :: rui13th -->
					<div class="g-layer-fix-size1 ly-configurator fhduhd-layer" ng-class="{'is-active':layer.fhduhd.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2 class="sm" style="font-size:28px;">{{layer.fhduhd.msg}}</h2>
								<span class="angular-close"><button type="button" ng-click="layer.fhduhd.closeF()">layer close</button></span>
							</div>
						</div>
						<!-- layer -->
						<div class="ly-mask"></div>
					</div>
					<!-- // 17-10-25 alert add :: end :: rui13th -->

					<!-- // 17-11-08 alert signin :: start :: kimluffy -->
					<div class="g-layer-fix-size1 ly-configurator signin-layer" ng-class="{'is-active':layer.signin.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2 class="sm">You need to log in to export</h2>
								<div class="btnarea"><a href="/member/sign-in?returnUrl=/support/tools/led-configurator" class="g-btn-l-arrow3"><span>GO TO SIGN IN</span></a></div>
								<span class="angular-close"><button type="button" ng-click="layer.signin.closeF()">layer close</button></span>
							</div>
						</div>
						<!-- layer -->
						<div class="ly-mask"></div>
					</div>
					<!-- // 17-11-08 alert signin :: end :: kimluffy -->

					<!-- // 17-02-02 alert add title :: start :: rui13th -->
					<div class="g-layer-fix-size1 ly-configurator title-layer" ng-class="{'is-active':layer.title.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2 class="bold-headline">Export LED Configurator</h2>
								<div class="conbox">
									<h3 class="s-title">Enter the title of PDF</h3>
									<div class="g-copybox">
										<p class="copy1">If you do not enter a title, "LED CONFIGURATOR" is output.</p>
										<div class="pdfInput"><span class="g-f"><input type="text" id="pdfTitle" placeholder="LED CONFIGURATOR"  maxlength="20" ng-model="pdf.title"/></span></div>
									</div>
								</div>
								<div class="conbox" ng-if="showUpdateModel(display.name)">
									<h3 class="s-title">Choose your document option</h3>
									<div class="g-copybox">
										<ul>
											<li>
												<input type="checkbox" class="fake-check checked" id="only-renderInfo">
												<label for="only-renderInfo">Only information about LED configuration (*mandatory)</label>
											</li>
											<li>
												<input type="checkbox" class="fake-check" id="include-productInfo" ng-model="pdf.hasProductInfo">
												<label for="include-productInfo">Include all product specs</label>
											</li>
										</ul>
									</div>
								</div>
								
								<div class="btnarea"><a href="javascript:;" class="g-btn-l-o" ng-click="exportToPDF()"><span>EXPORT TO PDF</span></a></div>
								<span class="angular-close"><button type="button" ng-click="layer.title.closeF()">layer close</button></span>
							</div>
						</div>
						<!-- layer -->
						<div class="ly-mask"></div>
					</div>
					<!-- // 17-02-02 alert add title :: end :: rui13th -->

					<!-- // 16-08-19 alert modify :: start :: rui13th -->
					<div class="g-layer-fix-size1 ly-configurator uploadAlert-layer" ng-class="{'is-active':layer.uploadAlert.open === true}">
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
					
					<!-- // 17-12-12 public confirm layer :: start :: rui13th -->
					<div class="g-layer-fix-size3 ly-configurator confirm-public-layer" ng-class="{'is-active':layer.confirm.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2>{{layer.confirm.msg}}</h2>
								<div class="btnarea">
									<a href="javascript:;" class="g-btn-l-arrow3" ng-click="layer.confirm.okF()"><span>{{layer.confirm.ok}}</span></a>
									<a href="javascript:;" class="g-btn-l-arrow3" ng-click="layer.confirm.cancelF()"><span>{{layer.confirm.cancel}}</span></a>
								</div>
								<span class="angular-close"><button type="button" ng-click="layer.confirm.closeF()">layer close</button></span>
							</div>
						</div>
						<!-- layer -->
						<div class="ly-mask"></div>
					</div>
					<!-- // 17-12-12 public confirm layer :: end :: rui13th -->
					
					<!-- // 18-07-31 alert renewal :: start :: rui13th -->
					<div class="g-layer-fix-size1 ly-configurator renewal-layer" ng-class="{'is-active':layer.renewal.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<div class="icon"><img src="/static/images/support/led-configu-renewal-icon.jpg"></div>
								<h2 class="sm">NEW configuration update added!</h2>
								<div class="g-copybox">									
									<p class="copy1">Now available with Frame kit, Data in/out and Power cable route information, when you 'Export to pdf'<br/>Note: This only applies to IFH, IFJ, IFH-D models</p>									
								</div>
								<div class="cookie-check-box">
									<input type="checkbox" class="fake-check" id="configu-chkCookie" name="chkCookie" value="Y" onclick="closeLayerCookie()">
									<label for="configu-chkCookie">Don’t show this popup again</label>
								</div>
								<span class="angular-close"><button type="button" ng-click="layer.renewal.closeF()">layer close</button></span>
							</div>							
						</div>
						
						<!-- layer -->
						<div class="ly-mask"></div>
					</div>
					<!-- // 18-07-31 alert renewal :: end :: rui13th -->
					
					<!-- // 18-08-30 alert render size limit :: start :: rui13th -->
					<div class="g-layer-fix-size1 ly-configurator render-size-layer" ng-class="{'is-active':layer.rendersize.open === true}">
						<!-- layer -->
						<div class="layer">
							<div class="inbox">
								<h2 class="sm">{{layer.rendersize.msg}}</h2>
								<span class="angular-close"><button type="button" ng-click="layer.rendersize.closeF()">layer close</button></span>
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
					</div><!-- // .ly-loading-layer -->
				</div>
			</form>
		</div><!--// #videowall-configurator-->
		<!-- . support-tools-configurator -->
		
		<!-- 20180713 :: pdf 확장  이미지 캡쳐영역--> 
		<div id="pdf-image-section"> 
			<div id="pdf-image-section-txt"></div>
		</div>
</main><hr><!-- // #content -->





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

<!-- ui js -->
<script src="/static/js/ssds.common.js"></script>
<script src="/static/js/ssds.support.js"></script>
<!--  pdf전환  -->
<script src="/static/js/lib/jspdf/html2canvas.js"></script>
<script src="/static/js/lib/jspdf/jsPDF-1.0.272/jspdf.min.js"></script>
<script src="/static/js/lib/jspdf/jsPDF-1.0.272/jspdf.debug.js"></script>
<script src="/static/js/lib/jspdf/jsPDF-1.0.272/jspdf.plugin.addimage.js"></script>

<script src="/static/js/lib/jspdf/FileSaver.js"></script>
<script src="/static/js/lib/pulip.pdf.matrix.js"></script>
<script src="/static/js/lib/pulip.pdf.patterns.js"></script>
<script src="/static/js/lib/exportPDF_LED.js?20181002"></script>
<!--  app  -->
<script src="/static/js/configurator/led_configuratorApp.js?20180921"></script>
<!-- //ui js -->

<script>
function closeLayerCookie() {	
	if ($("#configu-chkCookie").prop("checked")) {
		setTimeout(function(){
			angular.element(document.querySelector('[ng-app=led-configurator]')).scope().layer.renewal.closeF();	
		}, 500);
		Cookies.set('renewal_layer', 'close', { expires: 365, path: '/' });		
	}	
}
</script>