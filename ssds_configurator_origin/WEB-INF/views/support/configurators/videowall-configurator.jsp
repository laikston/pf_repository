<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/layout/taglibs.jsp"%>
<%
	String memberSeq  	= (String)session.getAttribute("memberSeq");
	boolean statusSign	= !("").equals(memberSeq) && memberSeq != null ? true : false;
%>
<c:set var="memberSeq" value="<%=memberSeq %>"/>
<c:set var="statusSign" value="<%=statusSign %>"/>
<!-- configurator css -->
<link rel="stylesheet" href="/static/css/configurator.css?20171128"/>

<script src="/static/js/configurator/lib/angular.min.js"></script>


<main id="content" role="main">
	<!-- . support-tools-configurator -->

	<div class="support-tools-configurator">
		<!-- #videowall-configurator configurator-section -->
		<div id="videowall-configurator" class="configurator-section" ng-app="configurator" ng-controller="configuratorController as videowall" ng-cloak><!-- //ng-app="configurator" ng-controller="configuratorController as videowall"  -->
			<input type="hidden" value="${seq}" id="modelSeq" ng-init="display.seq = ${seq};defaultSeq = ${seq}"/><!-- 20180327 modelSeq add -->
			<form method="post"  id="configuratorsFrm" name="configuratorsFrm"  enctype="multipart/form-data" >
			
			<!-- 20171110 memberSeq add -->
			<input type="hidden" name="memberSeq" id="memberSeq" value="${memberSeq}" />			
			
				<div class="g-box need-help">
					<div class="inbox">
						<div class="g-h-box">
							<h1 class="h-page">Videowall Configurator </h1>
						</div>

						<div class="btnarea">
							<a href="javascript:;" class="g-btn-l-o" ng-click="openHelp()" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][NEED HELP]_btn');"><span>Need Help ?</span></a>
						</div>
					</div>
				</div>

				<!-- 0811 :: 추가 -->
				<!--<div class="g-box conf-uparea">
					<div class="inbox">
						Do you know the model number of your screen?
						<p>
							"I don't know model number."
							<a href="/support/videowall-selector" class="g-btn-l-conf"><span>Go to Videowall Selector</span></a>
						</p>
					</div>
				</div>-->
				<!-- //0811 :: 추가 -->

				<!-- #tool Configurator -->
				<div id="tool-configurator" class="tool-videowall" >
					<!-- #options-tool -->
					<div id="options-tool" class="options-tool">
						<div class="fitToWallBtn"><div><a href="javascript:;" class="g-btn-l-fit" ng-click="setMaxVideowall()" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Display Layout][FIT TO ROOM]_btn');"><span>Fit to room</span></a></div></div>
						<div id="form-tool" class="inbox">
							<!--<form name=""> -->

							<!-- ROOM CONFIGURATION -->
							<div class="opts-configurator-room" ng-class="{'is-active':getTab(1)}"><!-- .is-active || null -->
								<!-- .tab -->
								<span class="tab"><a href="javascript:;"><span>1</span>room configuration</a></span>
								<!-- // .tab -->

								<!-- Define Wall Size -->
								<div class="box-configurator configurator-room1" ng-class="{'is-active':getTab(1)}"><!-- .is-active || null -->
									<i class="opt-tab-room1"><a href="javascript:;" ng-click="setTab(1)" ng-init="tab.opts=1" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Define Wall Size]_tab');">Define Wall Size</a></i>
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
															<li><a href="javascript:;" ng-click="setUnit('feet')" class="g-btn-m-arrow1" ng-class="{'is-active':(tab.unit == 'feet') ? true : false}" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Define Wall Size][FEET]_btn');"><span>Feet</span></a></li>
															<li><a href="javascript:;" ng-click="setUnit('meter')" class="g-btn-m-arrow1" ng-class="{'is-active':(tab.unit == 'meter') ? true : false}" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Define Wall Size][METERS]_btn');"><span>Meters</span></a></li>
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
									<i class="opt-tab-display1"><a href="javascript:;" ng-click="setTab(2)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Choose Model]_tab');">Choose Model</a></i>
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
						<div id="blueprint" class="scrollbar videowall-blueprint" ng-init="tab.view = 1">

							<!-- body에 .is-needhelp-step1 추가 -->
							<div class="ly-help-step1">
								<span class="this">look this</span>
								<div class="layer">
									<span class="step"><strong>1</strong>/3</span>
									<h2>Configuration Option</h2>
									<p class="desc">Click any of these buttons to configure the room, videowall or the content of the videowall</p>
									<div class="btnarea">
										<a href="javascript:;" class="g-btn-l-arrow5" ng-click="help.nextStep()" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][NEED HELP][Next]_btn');"><span>NEXT : SCENARIO</span></a>
									</div>
									<span class="close"><button type="button" ng-click="closeHelp()" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][NEED HELP][Close]_btn');">layer close</button></span>
								</div>
								<div class="ly-mask"></div>
							</div><!-- // body에 .is-needhelp-step1 추가 -->

							<!-- body에 .is-needhelp-step2 추가 -->
							<div class="ly-help-step2">
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
							<div class="ly-help-step3">
								<span class="this">look this</span>
								<div class="layer">
									<span class="step"><strong>3</strong>/3</span>
									<h2>Export to PDF</h2>
									<p class="desc">When you have finished configuring your Videowall, click here to download the PDF.</p>
									<div class="btnarea">
										<a href="javascript:;" class="g-btn-l-arrow5" ng-click="help.nextStep()"><span>NEXT : FINISH WIZARD</span></a>
									</div>
									<span class="close"><button type="button" ng-click="closeHelp()">layer close</button></span>
								</div>
								<div class="ly-mask"></div>
							</div><!-- // body에 .is-needhelp-step3 추가 -->
							<div class="ly-full-mask"></div>
							<div class="scroll-viewport videowall-viewport">
								<div class="scroll-overview" style="top:0px;">
									<div id="blueprint_scenario_background">
										<div id="scenario_top">
											<div class="roof-corner-l"></div>
											<div id="roof"></div>
											<div class="roof-corner-r"></div>
										</div>
										<div id="scenario_middle"  class="videowall-scenario_middle" ng-style="{'height':room.size.pixel_height}">
											<div id="space" style="height:auto;">
												<!--// 160823 버튼들 추가 rui13th :: start -->
                      							<!-- opts width -->
                      							<!-- // 171020 탑 고정으로 변경 -->
												<div class="choose-size-w" style="z-index:1000;top:-45px;"><!-- <div class="choose-size-w" ng-style="{'top':room.opts.sizeW_top}" style="z-index:1000;">-->
													<span class="opt-btn-plus"><button type="button" ng-click="changeCol(1)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][VIEW CHANGE][COL PLUS]_btn');">pluse</button></span>
													<span class="opt-btn-minus"><button type="button" ng-click="changeCol(-1)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][VIEW CHANGE][COL MINUS]_btn');">minus</button></span>
												</div>
												<!-- opts height -->
												<!-- // 171020 left 고정으로 변경 -->
												<div class="choose-size-h" ng-style="{'top':room.opts.sizeH.position.top}" style="right:auto;z-index:1000;left:700px;"><!-- <div class="choose-size-h" ng-style="{'left':room.opts.sizeH.position.left, 'top':room.opts.sizeH.position.top}" style="right:auto;z-index:1000;"> -->
													<span class="opt-btn-plus"><button type="button" ng-click="changeRow(1)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][VIEW CHANGE][ROW PLUS]_btn');">pluse</button></span>
													<span class="opt-btn-minus"><button type="button" ng-click="changeRow(-1)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][VIEW CHANGE][ROW MINUS]_btn');">minus</button></span>
												</div>
												<!-- // 171020 left 고정으로 변경, top 기준위치 변경 -->
												<div class="choose-opts" ng-style="{'top':room.opts.sizeH.position.top-21}" style="margin-top:-3px;left:-50px;z-index:1000;"><!-- <div class="choose-opts" ng-style="{'top':room.opts.choose.position.top, 'left':room.opts.choose.position.left}" style="margin-top:-3px;"> -->
													<ul>
														<li ng-click="toggleOrientation()">
															<div class="tooltip"><span>Orientation</span></div>
															<span class="opt-btn-orientation"><button type="button" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][VIEW CHANGE][Orientation]_btn');">orientation</button></span>
														</li>
														<li ng-click="getChooseDisplayLayer(true)">
															<div class="tooltip"><span>Choose Model</span></div>
															<span class="opt-btn-model"><button type="button" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][VIEW CHANGE][Choose Model]_btn');">model</button></span>
														</li>
														<li ng-click="uploadContentLayer(true)">
															<div class="tooltip"><span>upload content</span></div>
															<span class="opt-btn-content"><button type="button" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][VIEW CHANGE][UPLOAD]_btn');">upload content</button></span>
														</li>
													</ul>
												</div>
												<!-- // opts -->
												<!--// 160823 버튼들 추가 rui13th :: end -->
												<table style="width:100%;height:100%;"> <!--//160907 :: measure add-->
													<tr style="height:0;" ng-show="getViewTab(1)" id="blueprint_measure_width_section"><!--//160907 :: measure width add :: start--><!-- 171101 scenario 마크업 삭제후 각 모드에 따른 요소 선택적으로 보여주기 -->
														<td style="height:0;">
															<div class="measure_width_dotted_line" style="position:absolute;top:-55px;left:0;width:100%;height:55px;border-left:2px dotted #b0b2b9;border-right:2px dotted #b0b2b9;"></div>
															<div class="measure_width_space" style="position:absolute;top:-75px;left:0;width:100%;height:23px;"><!-- style border 속성 제거 :: ssong --><!-- // 171020 탑 위로 올림 -->
																<div class="measure_width_space_left" ng-style="{'width':(const.room.pixel_width-(display.size.width * display.videowall.col)) / 2}">
																	<div class="measure_width_space_left_number" ng-style="getTagWSpaceStyle(getBlueprintSpace(room.size.width, blueprintProp.width) / 2)">
																		<span class="measure-number">{{getBlueprintSpace(room.size.width, blueprintProp.width) / 2}} {{unit == 'feet' ? 'ft' : 'm' }}</span>
																	</div>
																</div>
																<div class="measure_width_space_right" ng-style="{'width':(const.room.pixel_width-(display.size.width * display.videowall.col)) / 2}" style="position:absolute;right:0;top:0;">
																	<div class="measure_width_space_right_number" ng-style="getTagWSpaceStyle(getBlueprintSpace(room.size.width, blueprintProp.width) / 2, 'right')">
																		<span class="measure-number">{{getBlueprintSpace(room.size.width, blueprintProp.width) / 2}} {{unit == 'feet' ? 'ft' : 'm' }}</span>
																	</div>
																</div>
															</div>
															<div class="measure_width_new_line" style="position:absolute;top:-75px;left:0;width:100%;height:23px;"><!-- // 171020 탑 위로 올림 -->
																<div style="position:relative;margin:0 auto;border-left:2px dotted #222;border-right:2px dotted #222;" ng-style="setBlueprintHorizonStyle()"></div>
															</div>
															<div class="measure_width_new" style="position:absolute;top:-75px;left:0;width:100%;height:23px;"><!-- // 171020 탑 위로 올림 -->
																<div id="measure_width" style="margin:0 auto;" ng-style="{'width':display.size.width * display.videowall.col}">
																	<div class="width_tag_wrap" style="background:none;width:100%;margin-top:-30px;">
																		<div class="width_tag" ng-style="getTagWStyle(blueprintProp.width)">
																			<span class="measure-number">{{setBlueprintWidth()}} {{unit == 'feet' ? 'ft' : 'm' }}</span>
																		</div>
																	</div>
																</div>
															</div>
														</td>
													</tr> <!--//160907 :: measure width add :: end-->
													<tr>
														<td>
															<!-- 171116 :: 성능최적화 to svg -->
															<div id="blueprint_container" ng-style="getTotalDisplaysStyle()">
																<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" ng-width="{{display.videowall.size.width}}" ng-height="{{display.videowall.size.height}}">
																	<path id="col-line" ng-d="{{setColLine()}}" style="stroke:#222; fill:none; stroke-opacity:1;"/>
																	<path id="row-line" ng-d="{{setRowLine()}}" style="stroke:#222; fill:none; stroke-opacity:1;"/>
																</svg>
															</div>
															<!-- 171116 :: 성능최적화 to svg -->
                          	
															<!-- 
															<table id="blueprint_container" style="margin:0;position:absolute;" ng-style="getTotalDisplaysStyle()">
																<tbody>
																	<tr>
																		<td></td>
																	</tr>
																	<tr>
																		<td>
																			<table class="blueprint" style="display:block;" ng-style="{'width':display.size.width * display.videowall.col, 'height':display.size.height * display.videowall.row}" >
																				<tbody>
																					<tr ng-style="{'width':display.size.width * display.videowall.col, 'height':display.size.height}" ng-repeat="n in getRepeatNum(display.videowall.row) track by $index" style="display:block;">
																						<td class="lfd ng-scope" ng-repeat="n in getRepeatNum(display.videowall.col) track by $index" ng-style="{'width':display.size.width, 'height':display.size.height}" repeat-complete></td>
																					</tr>
																				</tbody>
																			</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															-->                            
														</td>

														<!--//160907 :: measure height add :: start-->
														<td style="width:0;" ng-show="getViewTab(1)" id="blueprint_measure_height_section"><!-- 171101 scenario 마크업 삭제후 각 모드에 따른 요소 선택적으로 보여주기 -->
															<div class="measure_height_dotted_line" style="position:absolute;top:0;right:-75px;width:75px;border-top:2px dotted #b0b2b9;border-bottom:2px dotted #b0b2b9;" ng-style="{'height':room.size.pixel_height}"></div>
															<!-- // 171020 탑 고정으로 변경 -->
															<div class="measure_height_space" style="position:absolute;top:0;right:-95px;width:45px;" ng-style="{'height':room.size.pixel_height}"><!-- style border 속성 제거 :: ssong --><!-- //171020 위치수정 -->
																<div class="measure_height_space_top" ng-style="{'height':(room.size.pixel_height-(display.size.height * display.videowall.row)) / 2}" style="position:absolute;right:0;top:0;">
																	<div class="measure_height_space_top_number" ng-style="getTagHSpaceStyle(getBlueprintSpace(room.size.height, blueprintProp.height) / 2)">
																		<span class="measure-number">{{getBlueprintSpace(room.size.height, blueprintProp.height) / 2}} {{unit == 'feet' ? 'ft' : 'm' }}</span>
																	</div>
																</div>
																<div class="measure_height_space_bottom" ng-style="{'height':(room.size.pixel_height-(display.size.height * display.videowall.row)) / 2}" style="position:absolute;right:0;bottom:0;">
																	<div class="measure_height_space_bottom_number" ng-style="getTagHSpaceStyle(getBlueprintSpace(room.size.height, blueprintProp.height) / 2, 'bottom')">
																		<span class="measure-number">{{getBlueprintSpace(room.size.height, blueprintProp.height) / 2}} {{unit == 'feet' ? 'ft' : 'm' }}</span>
																	</div>
																</div>
															</div>
															<div class="measure_height_new_line" style="position:absolute;right:-71px;" ng-style="{'top':(room.size.pixel_height-(display.size.height * display.videowall.row)) / 2, 'width':(const.room.pixel_width-(display.size.width * display.videowall.col)) / 2 + 71}">
																<div style="position:relative;border-top:2px dotted #222;border-bottom:2px dotted #222;" ng-style="setBlueprintVerticalStyle()"></div>
															</div><!-- style right 수치변경, right 값 변경에 따른 width 계산 수식 중 30 -> 51로 변경 :: ssong -->
															<div class="measure_height_new" style="position:absolute;right:-125px;width:75px;" ng-style="{'top':(room.size.pixel_height-(display.size.height * display.videowall.row)) / 2}">
																<div id="measure_height" style="margin-left:0;" ng-style="{'height':display.size.height * display.videowall.row}">
																	<div ng-style="getTagHStyle(blueprintProp.height)">
																		<span class="measure-number">{{setBlueprintHeight()}} {{unit == 'feet' ? 'ft' : 'm' }}</span>
																	</div>
																</div>
															</div><!-- //171020 위치수정 -->
														</td>
														<!--//160907 :: measure height add :: end-->
													</tr>
												</table>
                      
												<!-- // 171101 사람 추가 :: scenario 마크업 삭제후 각 모드에 따른 요소 선택적으로 보여주기-->
												<div class="prop" id="scenario_person_section" style="right:0; bottom:0px; height:auto;" ng-style="{'width':person.size.width, 'bottom':person.position.bottom}" ng-show="getViewTab(2)">
													<img src="/static/images/videowall_configurator/default/guy.png">
												</div>
												<!-- // 171101 사람 추가 :: scenario 마크업 삭제후 각 모드에 따른 요소 선택적으로 보여주기 -->

												<!--// 160823 비디오 추가 rui13th :: start -->
												<div id="videoContainer_blueprint" style="position:absolute;width:100px;height:100px;overflow:hidden;background-size:100% 100%;background-color:transparent;" ng-style="{'top': ((room.size.pixel_height) - (display.size.height * display.videowall.row)) / 2,'left':(const.room.pixel_width - display.size.width * display.videowall.col) / 2, 'width':display.size.width*display.videowall.col, 'height':display.size.height*display.videowall.row, 'background-image':'url('+ upload.contents.image + ')'}">
													<video autoplay="" loop="" muted="" ng-show="upload.contents.video != 'Default Image'" id="vid_blueprint" style="width:auto;height:auto;" ng-style="videoSize()">
														<source src type="video/mp4">
													</video>
												</div>
												<!--// 160823 비디오 추가 rui13th :: end -->
												<div class="model_tag" id="model-tag" style="left:auto;right:0;top:0;">{{display.name}}</div><!-- <div class="model_tag" id="model-tag" ng-style="{'top': room.modelTag.position.top, 'left':room.modelTag.position.left}" style="right:auto;"> --><!-- //171020 위치수정 -->
											</div>
										</div>
										<div id="scenario_bottom">
											<div class="bottom-corner-l"></div>
											<div id="bottom"></div>
											<div class="bottom-corner-r"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- #blueprint-->

						<!-- // #view_options -->
						<div id="view_options" class="tools-view-opt">
							<div class="inbox">
								<div class="btnarea">
									<a href="javascript:;" id="blueprint_btn" class="g-btn-l-o" ng-click="setViewTab(1)" ng-class="{'is-active':getViewTab(1)}" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][BLUEPRINT]_btn');"><span>Blueprint</span></a>
									<a href="javascript:;" id="render_btn" class="g-btn-l-o" ng-click="setViewTab(2)" ng-class="{'is-active':getViewTab(2)}" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][RENDER]_btn');"><span>Render</span></a>
									<a href="javascript:;" id="export_btn" class="g-btn-l-down2" ng-click="setPDFTitle(${statusSign });ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][EXPORT TO PDF]_btn');"><span>Export to PDF</span></a>
								</div>
							</div>
						</div>
						<!-- // #view_options -->

						<!-- // #export_overlay //171120 기본 로더 대체로 삭제  -->
						<!-- 
						<div id="export_overlay" style="display:none;">
							<div id="loader">
								Generating PDF <div style="margin-top:-15px;"><img src="/static/images/videowall_configurator/loader.gif"></div>
							</div>
						</div>
						-->
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
							<strong class="model-code"><a href="{{display.data.URL}}" target="_blank">{{display.name}}</a></strong>
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
								<td id="spec_dimension">{{blueprintProp.width}} x {{blueprintProp.height}} x {{setBlueprintDpi()}} {{unit == 'feet' ? 'ft' : 'm' }}</td>
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
						<!-- //201708 -->
						<!--<table class="g-tb-data">
							<tbody>
							<tr>
								<th class="th1" rowspan="6">Panel</th>
								<th class="th2" colspan="2">Type</th>
								<td>{{data[display.name].panel.type}}</td>
							</tr>
							<tr>
								<th class="th2 bug-ie" colspan="2">Resolution</th>
								<td>{{data[display.name].choose.resolution}}</td>
							</tr>
							<tr>
								<th class="th2 bug-ie" colspan="2">Brightness</th>
								<td>{{data[display.name].panel.brightness}} cd/m2</td>
							</tr>
							<tr>
								<th class="th2 bug-ie" colspan="2">Contrast Ratio</th>
								<td>{{data[display.name].panel.contrastRatio}}</td>
							</tr>
							<tr>
								<th class="th2 bug-ie" colspan="2">Response Time(G-to-G)</th>
								<td>{{data[display.name].panel.responseTime}} ms</td>
							</tr>
							<tr>
								<th class="th2 bug-ie" colspan="2">Operation Hour</th>
								<td>{{data[display.name].panel.operationHour}}</td>
							</tr>
							<tr>
								<th class="th1" rowspan="8">Conectivity</th>
								<th class="th2 bug-ie" rowspan="4">INPUT</th>
								<th class="th3">RGB</th>
								<td>{{data[display.name].connectivity.input.rgb}}</td>
							</tr>
							<tr>
								<th class="th3 bug-ie">VIDEO</th>
								<td>{{data[display.name].connectivity.input.video}}</td>
							</tr>
							<tr>
								<th class="th3 bug-ie">AUDIO</th>
								<td>{{data[display.name].connectivity.input.audio}}</td>
							</tr>
							<tr>
								<th class="th3 bug-ie">USB</th>
								<td>{{data[display.name].connectivity.input.usb}}</td>
							</tr>

							<tr>
								<th class="th2 bug-ie" rowspan="4">OUTPUT</th>
								<th class="th3">RGB</th>
								<td>{{data[display.name].connectivity.output.rgb}}</td>
							</tr>
							<tr>
								<th class="th3 bug-ie">VIDEO</th>
								<td>{{data[display.name].connectivity.output.video}}</td>
							</tr>
							<tr>
								<th class="th3 bug-ie">AUDIO</th>
								<td>{{data[display.name].connectivity.output.audio}}</td>
							</tr>
							<tr>
								<th class="th3 bug-ie">Power Out</th>
								<td>{{data[display.name].connectivity.output.powerOut}}</td>
							</tr>
							<tr>
								<th class="th1" rowspan="3">Mechanical Spec</th>
								<th class="th2 bug-ie" rowspan="3">Weight (kg)</th>
								<th class="th3">Set</th>
								<td>{{data[display.name].mechanicalSpec.weight.set}} kg</td>
							</tr>
							<tr>
								<th class="th3 bug-ie">Package</th>
								<td>{{data[display.name].mechanicalSpec.weight.package}} kg</td>
							</tr>
							<tr>
								<th class="th3 bug-ie">Bezel Width (mm)</td>
								<td>{{data[display.name].mechanicalSpec.bezelWidth}}</td>
							</tr>
							<%--
							<tr>
								<th class="th1" rowspan="1">Certification</th>
								<th class="th2" colspan="2">Environment</th>
								<td>{{data[display.name].certification.environment}}</td>
							</tr>
							--%>
							</tbody>
						</table>-->
						<p class="specifications-info"><i>* Specifications are subject to change without notice.</i></p>
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
									<div class="thumb"><img ng-src="{{layer.choose.detail.IMG_URL}}" alt="Explore Samsung's Lineup of Powerful SMART Signage Products" class="pc" /></div>

									<div class="summary">
										<h3><a href="{{layer.choose.detail.URL}}" target="_blank">{{layer.choose.name}}</a></h3>
										<ul class="spec">
											<li><i>Dimension :</i> {{layer.choose.size[0]}} X {{layer.choose.size[1]}} X {{layer.choose.size[2]}}</li>
											<li><i>Resolution :</i> {{layer.choose.resolution[0]}} X {{layer.choose.resolution[1]}} {{(layer.choose.resolution[2] == undefined) ? '' : layer.choose.resolution[2]}}</li>
											<li><i>Power ConsumptionMax[W/h] :</i> {{layer.choose.detail.POWER_MAX}}</li>
											<li><i>Weight :</i> {{layer.choose.weight}} kg</li>
										</ul>

										<div class="btnarea">
											<a href="javascript:;" class="g-btn-l-arrow3" ng-click="setChooseDisplay(layer.choose.name, layer.choose.seq)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Choose Model][CHOOSE THIS MODEL]_btn');"><span>Choose This Model</span></a>
										</div>
									</div>
								</div>

								<div class="choose-product">
									<table class="g-tb-data">
										<thead>
										<tr>
											<th class="model" scope="col">Model</th>
											<th class="time" scope="col">Operation time</th>
											<th class="brightness" scope="col">Brightness</th>
											<th class="bezel" scope="col">Bezel</th>
											<th class="size" scope="col">Size</th>
										</tr>
										</thead>
										<tbody>
										<tr ng-repeat="item in display.list" ng-click="getChooseDisplay(item.PRODUCT_NAME, item.SEQ)" ng-dblclick="setChooseDisplay(layer.choose.name, layer.choose.seq)" ng-class="{'is-active':layer.choose.name === item.PRODUCT_NAME}" style="user-select:none;">
											<td>{{item.PRODUCT_NAME}}</td>
											<td>{{item.PANEL_OPERATION_HOUR}}</td>
											<td>{{item.PANEL_BRIGHTNESS}} nit</td>
											<td>{{item.MECHANICAL_SPEC_BEZEL_WIDTH2}}</td>
											<td>{{item.PANEL_DIAGONAL_SIZE}}"</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
							<!-- // content -->
							<span class="close"><button type="button" ng-click="getChooseDisplayLayer(false)" onclick="ga_behavior_event('Support','Support_Videowall_Configurator_Click','support-videowall_configurator-[' + angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name + '][Choose Model][CLOSE]_btn');">layer close</button></span>
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
									<li><i>VIDEO : </i>mp4 only, max 15mb</li>
								</ul>
							</div>

							<!-- .define browse -->
							<div class="define-upload">
								<div class="upload">
									<input type="file" class="upload" file-model="videoFile2" id="tempFile2" name="tempFile2">
									<div class="btnarea"><button type="button" class="g-btn-m-arrow1"><span>BROWSE…</span></button></div>
								</div>


								<select class="type" title="select type" ng-model="upload.contents.video" ng-options="video.title for video in upload.video.list" ng-change="getVideo(upload.contents.video)" ng-style="{'width':192+'px'}">
									<option value="">Default Image</option>
								</select>


								<!-- <select class="type" title="select type" ng-repeat="video in upload.video.list">
                                    <option>Select</option>
                                    <option>{{video.title}}</option>
                                </select> -->
							</div><!-- // .define browse -->

							<!-- content -->
							<span class="close"><button type="button" ng-click="uploadContentLayer(false)">layer close</button></span>
						</div>
					</div>
					<div class="ly-mask"></div>
				</div><!-- // .ly-choose-display -->
				
				<!-- // 17-11-08 alert signin :: start :: kimluffy -->
				<div class="g-layer-fix-size1 ly-configurator signin-layer" ng-class="{'is-active':layer.signin.open === true}">
					<!-- layer -->
					<div class="layer">
						<div class="inbox">
							<h2 class="sm">You need to log in to export</h2>
							<div class="btnarea"><a href="/member/sign-in?returnUrl=/support/tools/videowall-configurator" class="g-btn-l-arrow3"><span>GO TO SIGN IN</span></a></div>
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
							<h2>Export Videowall Configurator</h2>
							<div class="g-copybox">
								<p class="copy1">Please enter the title of PDF. <br />If you do not enter a title, "VIDEOWALL CONFIGURATOR" is output.</p>
								<div class="pdfInput"><span class="g-f" style="width:100%;"><input type="text" id="pdfTitle" placeholder="VIDEOWALL CONFIGURATOR"  maxlength="20" /></span></div>
							</div>
							<div class="btnarea"><a href="javascript:;" class="g-btn-l-pdf2" ng-click="exportToPDF()"><span>EXPORT</span></a></div>
							<span class="angular-close"><button type="button" ng-click="layer.title.closeF()">layer close</button></span>
						</div>
					</div>
					<!-- layer -->
					<div class="ly-mask"></div>
				</div>
				<!-- // 17-02-02 alert add title :: end :: rui13th -->

				<!-- // 16-08-19 alert modify :: start :: rui13th -->
				<div class="g-layer-fix-size1 ly-configurator limit-layer" ng-class="{'is-active':layer.limit.open === true}">
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
				<div class="g-layer-fix-size1 ly-configurator uploadAlert-layer" ng-class="{'is-active':layer.uploadAlert.open === true}">
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
<script src="/static/js/ssds.common.js"></script>
<script src="/static/js/ssds.support.js"></script>
<!--  pdf전환  -->
<script src="/static/js/lib/jspdf/html2canvas.js"></script>
<!-- <script src="/static/js/lib/export_loader.js"></script> //171120 기본 로더 대체로 삭제 -->
<script src="/static/js/lib/jspdf/jspdf.js"></script>
<script src="/static/js/lib/jspdf/jspdf.plugin.addimage.js"></script>
<script src="/static/js/lib/jspdf/FileSaver.js"></script>
<script src="/static/js/lib/exportPDF.js?20171128"></script>
<!--  app  -->
<script src="/static/js/configurator/configuratorApp.js?20171215"></script>
<!-- //ui js -->
