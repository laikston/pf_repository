<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/layout/taglibs.jsp"%>


<!-- configurator css -->
<link rel="stylesheet" href="/static/css${minifyPath}/configurator${minifyExtension}.css"/>

<script src="/static/js/configurator/lib/angular.min.js"></script>
<script src="/static/js/configurator/configuratorData.js"></script>


<main id="content" role="main">
	<!-- . support-tools-configurator -->

	<div class="support-tools-configurator">
		<!-- #videowall-configurator configurator-section -->
		<div id="videowall-configurator" class="configurator-section" ng-app="configurator" ng-controller="configuratorController as videowall" ng-cloak><!-- //ng-app="configurator" ng-controller="configuratorController as videowall"  -->
			<form method="post"  id="configuratorsFrm" name="configuratorsFrm"  enctype="multipart/form-data" >
				<div class="g-box need-help">
					<div class="inbox">
						<div class="g-h-box">
							<h1 class="h-page">Videowall Configurator </h1>
						</div>

						<div class="btnarea">
							<a href="javascript:;" class="g-btn-l-arrow3" ng-click="openHelp()"><span>Need Help</span></a>
						</div>
					</div>
				</div>

				<!-- 0811 :: 추가 -->
				<%--<div class="g-box conf-uparea">
					<div class="inbox">
						Do you know the model number of your screen?
						<p>
							"I don't know model number."
							<a href="/support/videowall-selector" class="g-btn-l-conf"><span>Go to Videowall Selector</span></a>
						</p>
					</div>
				</div>--%>
				<!-- //0811 :: 추가 -->

				<!-- #tool Configurator -->
				<div id="tool-configurator" class="tool-videowall" >
					<!-- #options-tool -->
					<div id="options-tool" class="options-tool">
						<div id="form-tool" class="inbox">
							<!--<form name=""> -->

							<!-- ROOM CONFIGURATION -->
							<div class="opts-configurator-room" ng-class="{'is-active':getTab(1)}"><!-- .is-active || null -->
								<!-- .tab -->
								<span class="tab"><a href="javascript:;"><span>1</span><i>room configurator</i></a></span>
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
															<li><a href="javascript:;" ng-click="setUnit('feet')" class="g-btn-m-arrow1" ng-class="{'is-active':getUnitTab(2)}"><span>Feet</span></a></li>
															<li><a href="javascript:;" ng-click="setUnit('meter')" class="g-btn-m-arrow1" ng-class="{'is-active':getUnitTab(1)}"><span>Meters</span></a></li>
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
														<div class="btnarea"><a href="javascript:;" id="selects-model" class="g-btn-m-arrow1" ng-click="getChooseDisplayLayer(true)"><span>Select Model</span></a></div>
														<p class="mcode">Model Name : <span>"{{display.name}}"</span></p>
													</div><!-- // .define model -->
												</div>
											</div>
										</fieldset>
									</div>
								</div><!-- // Choose Model -->

								<!-- Display Layout -->
								<div class="box-configurator configurator-display2" ng-class="{'is-active':getTab(3)}">
									<i class="opt-tab-display2"><a href="javascript:;" ng-click="setTab(3)">Display Layout</a></i>
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
																	<input type="text" id="Columns" class="form-control" ng-model="display.videowall.col">
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
																	<input type="text" id="rows" class="form-control" ng-model="display.videowall.row">
																	<div class="input-group-addon">
																		<a class="input_arrow arrow_up" ng-click="changeRow(1)"></a>
																		<a class="input_arrow arrow_down" ng-click="changeRow(-1)"></a>
																	</div>
																</div>
															</div><!-- // .control-rows -->
														</div>
													</div>

													<div class="btnarea al-r"><a href="javascript:;" class="g-btn-m-arrow1" ng-click="setMaxVideowall()"><span>Fit to room</span></a></div>
												</div>
											</div>
										</fieldset>
									</div>
								</div><!-- // Display Layout -->

								<!-- Orientation -->
								<div class="box-configurator configurator-display3" ng-class="{'is-active':getTab(4)}">
									<i class="opt-tab-display3"><a href="javascript:;" ng-click="setTab(4)">Orientation</a></i>
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
																<select class="form-control" ng-model="display.orientation" ng-change="changeOrientation()">
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
									<i class="opt-tab-content1"><a href="javascript:;" ng-click="setTab(5)">Upload Content</a></i>
									<div class="opt-cont-content1" ng-show="getTab(5)" ng-class="{'is-active':getTab(5)}">
										<fieldset>
											<legend>options room Orientation</legend>

											<!-- ROOM Options-->
											<div class="box-option">
												<div class="inner">
													<!-- .define browse -->
													<div class="define-upload">
														<div class="upload">
															<input type="file" class="upload" file-model="videoFile1" id="tempFile1" name="tempFile1">
															<div class="btnarea"><button type="button" class="g-btn-m-arrow1"><span>BROWSE…</span></button></div>
														</div>

														<div class="opt-select">
															<select class="type" title="select type" ng-model="upload.contents.video" ng-options="video.title for video in upload.video.list" ng-change="getVideo(upload.contents.video)">
																<option value="">Select</option>
															</select>
														</div>

														<ul class="tip">
															<li><i>IMAGE : </i>jpg or png only, max 3mb</li>
															<li><i>VIDEO : </i>mp4 only, max 15mb</li>
														</ul>
														<!-- <i class="tip">jpg or png only, 3MB max size</i> -->
													</div><!-- // .define browse -->

													<div class="btnarea al-r">
														<button type="button" class="g-btn-m-arrow2" ng-click="resetContents();"><span>Reset content</span></button>
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
						<div id="blueprint" class="scrollbar" ng-init="tab.view = 2" ng-show="getViewTab(1)">

							<!-- body에 .is-needhelp-step1 추가 -->
							<div class="ly-help-step1">
								<span class="this">look this</span>
								<div class="layer">
									<span class="step"><strong>1</strong>/3</span>
									<h2>Configuration Option</h2>
									<p class="desc">Click any of these buttons to configure the room, videowall or the content of the videowall</p>
									<div class="btnarea">
										<a href="javascript:;" class="g-btn-l-arrow5" ng-click="help.nextStep()"><span>NEXT : SCENARIO</span></a>
									</div>
									<span class="close"><button type="button" ng-click="closeHelp()">layer close</button></span>
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
									<p class="desc">This is where all the configurations you make will reflect and is divided in two views blueprint and render. Go ahead and click the marked buttons.</p>
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
									<p class="desc">When you're done configuring your videowall, click here to get the PDF</p>
									<div class="btnarea">
										<a href="javascript:;" class="g-btn-l-arrow5" ng-click="help.nextStep()"><span>NEXT : FINISH WIZARD</span></a>
									</div>
									<span class="close"><button type="button" ng-click="closeHelp()">layer close</button></span>
								</div>
								<div class="ly-mask"></div>
							</div><!-- // body에 .is-needhelp-step3 추가 -->
							<div class="ly-full-mask"></div>


							<div class="unit-vs"><div class="space"><span>Vertical</span> <span>Space</span><i>{{unit == 'feet' ? getBlueprintSpace(room.size.width, setBlueprintWidth()) : getBlueprintSpace(room.size.width, setBlueprintWidth())}} {{unit == 'feet' ? 'ft' : 'm' }}</i></div></div>
							<div class="unit-hs"><div class="space"><span>Horizontal</span> <span>Space</span><i>{{unit == 'feet' ? getBlueprintSpace(room.size.height, setBlueprintHeight()) : getBlueprintSpace(room.size.height, setBlueprintHeight())}} {{unit == 'feet' ? 'ft' : 'm' }}</i></div></div>

							<div class="scroll-viewport">
								<div class="scroll-overview" style="top:0px;">

									<div id="blueprint_scenario_background">
										<div id="scenario_top">
											<div class="corner-l"></div>
											<div id="roof"></div>
											<div class="corner-r"></div>
										</div>
										<div id="scenario_middle" ng-style="{'height':room.size.pixel_height}">
											<div id="space" style="height:auto;">
												<table id="blueprint_container" style="width:auto;">
													<tbody>
													<tr style="position:absolute;top:-52px;">
														<td id="measure_width" ng-style="{'width':display.size.width * display.videowall.col}"><div class="ng-binding" ng-style="{'left':(display.size.width * display.videowall.col - 45) / 2}">{{setBlueprintWidth()}} {{unit == 'feet' ? 'ft' : 'm' }}</div></td>
														<td></td>
													</tr>
													<tr>
														<td>
															<table class="blueprint" style="width:auto;">
																<tbody>
																<tr ng-style="{'width':display.size.width, 'height':display.size.height}" ng-repeat="n in getRepeatNum(display.videowall.row) track by $index">
																	<td class="lfd ng-scope" ng-repeat="n in getRepeatNum(display.videowall.col) track by $index" ng-style="{'width':display.size.width, 'height':display.size.height}"></td>
																</tr>
																</tbody>
															</table>
														</td>
														<td id="measure_height" ng-style="{'height':display.size.height * display.videowall.row}"><div ng-style="{'top':(display.size.height * display.videowall.row - 23) / 2}">{{setBlueprintHeight()}} {{unit == 'feet' ? 'ft' : 'm' }}</div></td>
													</tr>
													</tbody>
												</table>
												<div class="model_tag" id="model-tag" ng-style="{'top': room.modelTag.position.top, 'left':room.modelTag.position.left}" style="right:auto;">{{display.name}}</div>
											</div>
										</div>

										<div id="scenario_bottom" ></div>
										<!-- // -->
									</div>
								</div>
							</div>
						</div>
						<!-- #blueprint-->

						<!-- #scenario -->
						<div id="scenario" scrollbar="" class="scrollbar" ng-show="getViewTab(2)" style="width:886px;">

							<!-- body에 .is-needhelp-step1 추가 -->
							<div class="ly-help-step1">
								<span class="this">look this</span>
								<div class="layer">
									<span class="step"><strong>1</strong>/3</span>
									<h2>Configuration Option</h2>
									<p class="desc">Click any of these buttons to configure the room, videowall or the content of the videowall</p>
									<div class="btnarea">
										<a href="javascript:;" class="g-btn-l-arrow5" ng-click="help.nextStep()"><span>NEXT : SCENARIO</span></a>
									</div>
									<span class="close"><button type="button" ng-click="closeHelp()">layer close</button></span>
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
									<p class="desc">This is where all the configurations you make will reflect and is divided in two views blueprint and render. Go ahead and click the marked buttons.</p>
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
									<h2>Export toPDF</h2>
									<p class="desc">When you're done configuring your videowall, click here to get the PDF</p>
									<div class="btnarea">
										<a href="javascript:;" class="g-btn-l-arrow5" ng-click="help.nextStep()"><span>NEXT : FINISH WIZARD</span></a>
									</div>
									<span class="close"><button type="button" ng-click="closeHelp()">layer close</button></span>
								</div>
								<div class="ly-mask"></div>
							</div><!-- // body에 .is-needhelp-step3 추가 -->
							<div class="ly-full-mask"></div>

							<div class="scroll-viewport">
								<div class="scroll-overview">
									<div id="alert_container"><!-- ngRepeat: alert in alerts --></div>
									<div id="scenario_background" class="ng-scope">
										<div id="scenario_top">
											<div class="corner-l"></div>
											<div id="roof"></div>
											<div class="corner-r"></div>
										</div>

										<div id="scenario_middle" ng-style="{'height':room.size.pixel_height}">
											<div id="space" style="height:auto;">

												<!-- alert -->
												<div class="g-alert alert-configurator" ng-class="{'is-active':layer.limit.open === true}">
													<div class="alert">
														<!-- -->
														<p class="message">{{layer.limit.msg}}</p>
														<!-- // -->
														<span class="close"><button type="button" ng-click="layer.limit.open = false">layer close</button></span>
													</div>
												</div>
												<!-- // alert -->

												<!-- alert -->
												<div class="g-alert alert-configurator" ng-class="{'is-active':layer.uploadAlert.open === true}">
													<div class="alert">
														<!-- -->
														<p class="message">{{layer.uploadAlert.msg}}</p>
														<!-- // -->
														<span class="close"><button type="button" ng-click="layer.uploadAlert.open = false">layer close</button></span>
													</div>
												</div>
												<!-- // alert -->




												<!-- opts width -->
												<div class="choose-size-w" ng-style="{'top':room.opts.sizeW_top}">
													<span class="opt-btn-plus"><button type="button" ng-click="changeCol(1)">pluse</button></span>
													<span class="opt-btn-minus"><button type="button" ng-click="changeCol(-1)">minus</button></span>
												</div>

												<!-- opts height -->
												<div class="choose-size-h" ng-style="{'left':room.opts.sizeH.position.left, 'top':room.opts.sizeH.position.top}" style="right:auto;">
													<span class="opt-btn-plus"><button type="button" ng-click="changeRow(1)">pluse</button></span>
													<span class="opt-btn-minus"><button type="button" ng-click="changeRow(-1)">minus</button></span>
												</div>

												<div class="choose-opts" ng-style="{'top':room.opts.choose.position.top, 'left':room.opts.choose.position.left}" style="margin-top:-3px;">
													<ul>
														<li ng-click="toggleOrientation()">
															<div class="tooltip"><span>Orientation</span></div>
															<span class="opt-btn-orientation"><button type="button">orientation</button></span>
														</li>
														<li ng-click="getChooseDisplayLayer(true)">
															<div class="tooltip"><span>Choose Model</span></div>
															<span class="opt-btn-model"><button type="button">model</button></span>
														</li>
														<li ng-click="uploadContentLayer(true)">
															<div class="tooltip"><span>upload content</span></div>
															<span class="opt-btn-content"><button type="button">upload content</button></span>
														</li>
													</ul>
												</div>
												<!-- // opts -->


												<table videowall="" id="videowall" class="videowall" style="width:auto;" ng-style="{'background-image':'url('+ upload.contents.image + ')'}">
													<tbody>
													<tr class="ng-scope" ng-style="{'width':display.size.width, 'height':display.size.height}" ng-repeat="n in getRepeatNum(display.videowall.row) track by $index">
														<td class="lfd ng-scope" ng-repeat="n in getRepeatNum(display.videowall.col) track by $index" ng-style="{'width':display.size.width, 'height':display.size.height}"></td>
													</tr>
													</tbody>
												</table>

												<div class="prop ng-scope" style="right:0; bottom:0px; height:auto;" ng-style="{'width':person.size.width, 'bottom':person.position.bottom}">
													<img src="/static/images/videowall_configurator/default/guy.png">
												</div>

												<div id="videoContainer" style="position:absolute;width:100px;height:100px;overflow: hidden;" ng-style="{'top': upload.video.position.top,'left':upload.video.position.left, 'width':display.size.width*display.videowall.col, 'height':display.size.height*display.videowall.row}">
													<video autoplay="" loop="" muted="" ng-show="upload.contents.video != 'Select'" id="vid" style="position:relative;width:100%;height:100%;">
														<source src type="video/mp4">
													</video>
												</div>
												<!-- ngIf: videos != null -->
												<div class="model_tag ng-binding" id="model-tag" ng-style="{'top': room.modelTag.position.top, 'left':room.modelTag.position.left}" style="right:auto;">{{display.name}}</div>
											</div>
										</div>
										<div id="scenario_bottom"></div>
									</div>
								</div>
							</div>
						</div>
						<!-- #scenario -->
						<!-- // #view_options -->
						<div id="view_options" class="tools-view-opt">
							<div class="inbox">
								<div class="btnarea">
									<a href="javascript:;" id="blueprint_btn" class="g-btn-l-o" ng-click="setViewTab(1)" ng-class="{'is-active':getViewTab(1)}"><span>Blueprint</span></a>
									<a href="javascript:;" id="render_btn" class="g-btn-l-o" ng-click="setViewTab(2)" ng-class="{'is-active':getViewTab(2)}"><span>Render</span></a>
									<a href="javascript:;" id="export_btn" class="g-btn-l-down2" onclick="exportToPDF()"><span>Export to PDF</span></a>
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
						<table class="g-tb-data">
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
								<th class="th1" rowspan="8">Connectivity</th>
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
							<tr>
								<th class="th1" rowspan="1">Cetification</th>
								<th class="th2" colspan="2">Environment</th>
								<td>{{data[display.name].certification.environment}}</td>
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
									<div class="thumb"><img ng-src="{{data[layer.choose.name].choose.img}}" alt="Explore Samsung's Lineup of Powerful SMART Signage Products" class="pc" /></div>

									<div class="summary">
										<h3><a href="{{data[layer.choose.name].choose['url_' + host]}}" target="_blank">{{layer.choose.name}}</a></h3>
										<ul class="spec">
											<li><i>Dimension :</i> {{data[layer.choose.name].choose.dimension.width}} X {{data[layer.choose.name].choose.dimension.height}} X {{data[layer.choose.name].choose.dimension.dpi}}</li>
											<li><i>Resolution :</i> {{data[layer.choose.name].choose.resolution}}</li>
											<li><i>Power ConsumptionMax[W/h] :</i> {{data[layer.choose.name].choose.powerConsumptionMax}}</li>
											<li><i>Weight :</i> {{data[layer.choose.name].choose.weight}} kg</li>
										</ul>

										<div class="btnarea">
											<a href="javascript:;" class="g-btn-l-arrow3" ng-click="setChooseDisplay(layer.choose.name)"><span>Choose This Model</span></a>
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
										<tr ng-repeat="prop in data" ng-click="getChooseDisplay(prop.model)" ng-class="{'is-active':layer.choose.name === prop.model}" >
											<td>{{prop.model}}</td>
											<td>{{prop.choose.operationTime}}</td>
											<td>{{prop.choose.brightness}} nit</td>
											<td>{{prop.choose.bezel}}</td>
											<td>{{prop.choose.size}}"</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
							<!-- // content -->
							<span class="close"><button type="button" ng-click="getChooseDisplayLayer(false)">layer close</button></span>
						</div>
					</div>
					<!-- layer -->
					<div class="ly-mask"></div>
				</div><!-- // .ly-choose-display -->

				<!-- .ly-choose-display -->
				<div class="g-layer-fix-size ly-upload-content  ly-upload-content-new" id="upload-layer" ng-class="{'is-active':layer.upload.open === true}">
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


								<select class="type" title="select type" ng-model="upload.contents.video" ng-options="video.title for video in upload.video.list" ng-change="getVideo(upload.contents.video)">
									<option value="">Select</option>
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

				<!-- .ly-loading-layer -->
				<div class="g-layer-fix-size ly-loading" id="loading-layer" ng-class="{'is-active':layer.loading.open === true}">
					<!-- layer -->
					<div class="layer">
						<div class="loading">
							<img src="/static/images/@tmp/loading.gif" alt="" style="display:block;margin:0 auto;width:16px;">
							<strong style="display:block;text-align:center;color:#fff;margin-top:20px;font-size:20px;font-family:'SamsungOneRg';">Loading</strong>
						</div>
						<!--<div class="inbox">-->
						<!--<h2>loading</h2>-->
						<!---->
						<!--<div class="g-copybox">-->
						<!--<p class="headline">loading</p>-->
						<!--</div>-->
						<!--</div>-->
					</div>
					<div class="ly-mask"></div>
				</div><!-- // .ly-loading-layer -->



		</div>
		</form>
	</div><!--// #videowall-configurator-->
	<!-- . support-tools-configurator -->

</main><hr><!-- // #content -->





<style>
	.ly-choose-display{ display:none; }
	.ly-choose-display.is-active{ display:block; }
	.ly-upload-content{ display:none; }
	.alert-configurator{ display:none; }
	.alert-configurator.is-active{display:block;}
	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.ly-upload-content.is-active{display:block;}
	.ly-upload-content .layer{padding-top:200px;}
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
<script src="/static/js/lib/export_loader.js"></script>
<script src="/static/js/lib/jspdf/jspdf.js"></script>
<script src="/static/js/lib/jspdf/jspdf.plugin.addimage.js"></script>
<script src="/static/js/lib/jspdf/FileSaver.js"></script>
<script src="/static/js/lib/exportPDF.js"></script>
<!--  app  -->
<script src="/static/js/configurator/configuratorApp.js"></script>
<!-- //ui js -->
