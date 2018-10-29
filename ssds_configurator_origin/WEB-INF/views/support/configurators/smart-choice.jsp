<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/layout/taglibs.jsp"%>


<link rel="stylesheet" href="/static/css${minifyPath}/smartChoice${minifyExtension}.css">

<script src="/static/js/smartChoice/smartChoiceData.js"></script>

<main id="content" role="main">

	<article id="lfd-smart-choice" class="webapp-lfd-smart-choice">
		<h1 class="blind">smartChoice</h1>

		<!-- // quistion-box :: start -->
		<section id="question-box" class="smart-box smart-box choice-question">
			<div class="inbox">
				<div class="question-img"><img class="question-img-source" alt="" /></div>
				<h2 class="question-title"></h2>

				<ul class="question-btn">
					<li>
						<a href="javascript:;" onclick="smartChoiceApp.START_TOOL.nextStep(this);">
							<img class="icon" alt="">
							<i></i>
							<span class="check">check this item</span>
						</a>
					</li>
				</ul>
				<p class="question-txt"></p>

				<div class="question-back blind"><a href="javascript:;" onclick="smartChoiceApp.START_TOOL.prevStep();"><span>BACK</span></a></div>
			</div>
		</section>
		<!-- // quistion-box :: end -->

		<!-- // model-spec-box :: start -->
		<section id="model-spec-box" class="smart-box choice-spec-overview blind">
			<div class="inbox">
				<div class="vbox">
					<div class="model-overview">
						<h3 class="model-name"></h3>
						<div class="model-img">
							<img alt="" />
							<!-- 0817 :: 버튼 추가 -->
							<div class="btnarea">
								<a href="#" class="g-btn-l-arrow3" onclick="try{ga_behavior_event('Support','Support_SMART_Choice_Click','support-smart_choice-[' + $('.choice-spec-overview h3').text() + '][View Product][View Detail]_btn');}catch(e){};"><span>view detail</span></a>
							</div>
							<!-- //0817 :: 버튼 추가 -->
						</div>
					</div>
					<div class="model-contents">
						<div class="inner">
							<h4 class="model-title"></h4>
							<!-- 0817 :: 추가 -->
							<h5 class="model-subtitle">A harmonized hybrid display with integrated digital signage and mirror functionalities</h5>
							<!-- //0817 :: 추가 -->

							<%--<p class="model-txt"></p>--%><!-- 0817 :: 삭제 -->
							<!-- 0817 :: key features 추가 및 display specifications 태그 변경 -->
							<!-- 0817 :: key features 추가 및 display specifications 태그 변경 -->

							<div class="key-features">
								<h4 class="model-spec-title">Key Features</h4>
								<ul>
									<li></li>
								</ul>
							</div>
							<div class="key-features">
								<h4 class="model-spec-title">Display specifications :</h4>
								<ul>
									<li><span class="spec-title">Screen Size</span> : <span class="info spec-info">46</span></li>
									<li><span class="spec-title">Brightness</span> : <span class="info spec-info">2500 nits</span></li>
									<li><span class="spec-title">Resolution</span> : <span class="info spec-info">1920*1080 (Full HD)</li>
								</ul>
							</div>
							<!-- //0817 :: key features 추가 및 display specifications 태그 변경 -->

							<%--<h5 class="model-spec-title">Display specifications : </h5>

							<!-- //ng-repeat :: start -->
							<ul class="model-spec">
								<li><span class="spec-title">Screen Size</span> : <span class="info spec-info"></span></li>
								<li><span class="spec-title">Brightness</span> : <span class="info spec-info"></span></li>
								<li><span class="spec-title">Resolution</span> : <span class="info spec-info"></span></li>
							</ul>
							<!-- //ng-repeat :: end -->--%>

							<div class="model-btnbox">
								<a href="javascript:;" class="g-btn-l-arrow4" onclick="smartChoiceApp.START_TOOL.more();try{ga_behavior_event('Support','Support_SMART_Choice_Click','support-smart_choice-[' + $('.choice-spec-overview h3').text() + '][View Product][MORE SPECIFICATIONS]_btn');}catch(e){};"><span>More specifications</span></a>
							</div>
							<!-- <div class="model-reset"><a href="javascript:;" onclick="smartChoiceApp.START_TOOL.reset();">RESET TOOL</a></div> -->

							<div class="btn-resettool">
								<a href="javascript:;" class="g-btn-l-reset" onclick="smartChoiceApp.START_TOOL.gotoAdvanced();try{ga_behavior_event('Support','Support_SMART_Choice_Click','support-smart_choice-[' + $('.choice-spec-overview h3').text() + '][View Product][RESET TOOL]_btn');}catch(e){};"><span>Reset tool</span></a>
							</div><!-- // reset btn vor mo -->

						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- // model-spec-box :: end -->


		<!-- model-detail-box -->
		<section id="model-detail-box" class="smart-box model-advanced-overview blind">
			<div class="inbox">
				<div class="model-key-measure">
					<h2 class="model_name"></h2>
					<div id="lfd_size">
						<div class="measure-thumb">
							<span class="thumb"><img class="img-responsive" alt=""></span>
							<div id="lfd_overlay">
								<div id="measure_w" class="measure-size-w"><span>W</span></div>
								<div id="measure_h" class="measure-size-h"><span>H</span></div>
								<div id="measure_d" class="measure-size-d"><span>D</span></div>
							</div>
						</div>
						<ul class="measure">
							<li><i>W : </i><span></span></li>
							<li><i>H : </i><span></span></li>
							<li><i>D : </i><span></span></li>
						</ul>
					</div>
					<!-- 0819 :: 버튼 추가 -->
					<div class="btnarea">
						<a href="#" class="g-btn-l-arrow3" onclick="try{ga_behavior_event('Support','Support_SMART_Choice_Click','support-smart_choice-[' + $('.model-key-measure h1').text() + '][MORE SPECIFICATIONS][View Detail]_btn');}catch(e){};"><span>view detail</span></a>
					</div>
					<!-- //0819 :: 버튼 추가 -->

				</div>
				<div class="model-key-specs info-model-specifications">
					<div class="inner">
						<div class="tb-h">
							<h3>Key Specs</h3>
						</div>
						<table class="g-tb-data">
							<tr>
								<th class="th1" rowspan="6">Panel</th>
								<th class="th2" colspan="2">Type</th>
								<td class="model-panel-type"></td>
							</tr>
							<tr>
								<th class="th2 bug-ie" colspan="2">Resolution</th>
								<td class="model-panel-resolution"></td>
							</tr>
							<tr>
								<th class="th2 bug-ie" colspan="2">Brightness</th>
								<td class="model-panel-brightness"></td>
							</tr>
							<tr>
								<th class="th2 bug-ie" colspan="2">Contrast Ratio</th>
								<td class="model-panel-contrast"></td>
							</tr>
							<tr>
								<th class="th2 bug-ie" colspan="2">Response Time(G-to-G)</th>
								<td class="model-panel-response"></td>
							</tr>
							<tr>
								<th class="th2 bug-ie" colspan="2">Operation Hour</th>
								<td class="model-panel-operation"></td>
							</tr>
							<tr>
								<th class="th1" rowspan="8">Conectivity</th>
								<th class="th2 bug-ie" rowspan="4">INPUT</th>
								<th class="th3">RGB</th>
								<td class="model-input-rgb"></td>
							</tr>
							<tr>
								<th class="th3 bug-ie">VIDEO</th>
								<td class="model-input-video"></td>
							</tr>
							<tr>
								<th class="th3 bug-ie">AUDIO</th>
								<td class="model-input-audio"></td>
							</tr>
							<tr>
								<th class="th3 bug-ie">USB</th>
								<td class="model-input-usb"></td>
							</tr>
							<tr>
								<th class="th2 bug-ie" rowspan="4">OUTPUT</th>
								<th>RGB</th>
								<td class="model-output-rgb"></td>
							</tr>
							<tr>
								<th class="th3 bug-ie">VIDEO</th>
								<td class="model-output-video"></td>
							</tr>
							<tr>
								<th class="th3 bug-ie">AUDIO</th>
								<td class="model-output-audio"></td>
							</tr>
							<tr>
								<th class="th3 bug-ie">Power Out</th>
								<td class="model-output-power"></td>
							</tr>

							<tr>
								<th class="th1" rowspan="3">Mechanical Spec</th>
								<th class="th2 bug-ie" rowspan="2">Weight (kg)</th>
								<th class="th3">Set</th>
								<td class="model-weight-set"></td>
							</tr>
							<tr>
								<th class="th3 bug-ie">Package</th>
								<td class="model-weight-package"></td>
							</tr>
							<tr>
								<th class="th3 bug-ie" colspan="2">Bezel Width (mm)</th>
								<td class="model-bezel"></td>
							</tr>

							<tr>
								<th class="th1">Cetification</th>
								<th class="th2" colspan="2">Environment</th>
								<td class="model-environment"></td>
							</tr>
						</table>

						<%--<div class="key-features">
							<h3>Key Features</h3>
							<ul class="">
								<li></li>
							</ul>
						</div>--%>

						<div class="btn-resettool">
							<a href="javascript:;" class="g-btn-l-reset" onclick="smartChoiceApp.START_TOOL.gotoAdvanced();try{ga_behavior_event('Support','Support_SMART_Choice_Click','support-smart_choice-[' + $('.model-key-measure h1').text() + '][MORE SPECIFICATIONS][RESET TOOL]_btn');}catch(e){};"><span>Reset tool</span></a>
						</div><!-- // reset btn vor mo -->
					</div>
				</div>
			</div>
		</section>
		<!-- // model-detail-box :: end -->

		<!-- #c-wrap -->
		<div id="c-wrap" class="cwrap-smartchoice advanced-box blind">
			<!-- #c-aside -->
			<aside id="c-aside">
				<!-- .aside-sort -->
				<div class="aside-sort sort-smartchoice">
					<!-- reset btn vor mo -->
					<div class="btn-apply-filter mo">
						<a href="javascript:;" class="g-btn-l-reset" onclick="smartChoiceApp.ADVANCED_TOOL.reset();ga_behavior_event('Support','Support_SMART_Choice_Click','support-smart_choice-[RESET FILTERS]_btn');"><span>Reset Filters</span></a>
					</div><!-- // reset btn vor mo -->

					<!-- .g-filter -->
					<div class="g-filter"><!-- open || -->
						<form name="">
							<div class="header">
								<h3>Advanced Search<button type="button" class="btn">open/close</button></h3>
							</div>

							<!-- 0817-2 :: 버튼 위치 변경 여기에 추가 -->
							<div class="btn-apply-filter pc up"><!-- 0817-2 :: up 클래스 추가 -->
								<a href="javascript:;" class="g-btn-l-reset" onclick="smartChoiceApp.ADVANCED_TOOL.reset();ga_behavior_event('Support','Support_SMART_Choice_Click','support-smart_choice-[RESET FILTERS]_btn');"><span>Reset Filters</span></a>
							</div>
							<!-- //0817-2 :: 버튼 위치 변경 여기에 추가 -->

							<!-- .list-filter -->
							<ul class="list-filter">
								<li class="size item-box" data-front-phrase="size" data-back-phrase='"'><!-- is-open || null -->
									<em><a href="#">Size</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_size.gif" alt=""></span>
									<strong class="pc-title">Size</strong>
									<ul>
										<li>
											<input type="checkbox" id="size-32" name="32" value="32" >
											<label for="size-32">32"</label>
										</li>
										<li>
											<input type="checkbox" id="size-40" name="40" value="40">
											<label for="size-40">40"</label>
										</li>
										<li>
											<input type="checkbox" id="size-46" name="46" value="46">
											<label for="size-46">46"</label>
										</li>
										<li>
											<input type="checkbox" id="size-48" name="48" value="48">
											<label for="size-48">48"</label>
										</li>
										<li>
											<input type="checkbox" id="size-55" name="55" value="55">
											<label for="size-55">55"</label>
										</li>
										<li>
											<input type="checkbox" id="size-65" name="65" value="65">
											<label for="size-65">65"</label>
										</li>
										<li>
											<input type="checkbox" id="size-75" name="75" value="75">
											<label for="size-75">75"</label>
										</li>
										<li>
											<input type="checkbox" id="size-85" name="85" value="85">
											<label for="size-85">85"</label>
										</li>
									</ul>
								</li>
								<li class="operation-time item-box" data-front-phrase="" data-back-phrase="operation time">
									<em><a href="#">Operation time</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_time.gif" alt=""></span>
									<strong class="pc-title">Operation time</strong>
									<ul>
										<li>
											<input type="checkbox" id="time-16" name="time" value="16/7">
											<label for="time-16">16/7</label>
										</li>
										<li>
											<input type="checkbox" id="time-24" name="time" value="24/7">
											<label for="time-24">24/7</label>
										</li>
									</ul>
								</li>
								<li class="environment item-box" data-front-phrase="for" data-back-phrase="s">
									<em><a href="#">Environment</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_environment.gif" alt=""></span>
									<strong class="pc-title">Environment</strong>
									<ul>
										<li>
											<input type="checkbox" id="environment-indoor" name="environment" value="indoor">
											<label for="environment-indoor">Indoor</label>
										</li>
										<li>
											<input type="checkbox" id="environment-outdoor" name="environment" value="outdoor">
											<label for="environment-outdoor">Outdoor</label>
										</li>
									</ul>
								</li>
								<li class="touch-overlay-ready item-box" data-item="Touch overlay" data-front-phrase="no" data-back-phrase="ready"><!-- yes일때 back, no일때 front-->
									<em><a href="#">Touch overlay ready</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_touch.gif" alt=""></span>
									<strong class="pc-title">Touch overlay ready</strong>
									<ul>
										<li>
											<input type="checkbox" id="touch-overlay-ready-yes" name="overlay" value="yes">
											<label for="touch-overlay-ready-yes">Yes</label>
										</li>
										<li>
											<input type="checkbox" id="touch-overlay-ready-no" name="overlay" value="no">
											<label for="touch-overlay-ready-no">No</label>
										</li>
									</ul>
								</li>
								<li class="led item-box" data-front-phrase="" data-back-phrase="">
									<em><a href="#">LED</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_led.gif" alt=""></span>
									<strong class="pc-title">LED</strong>
									<ul>
										<li>
											<input type="checkbox" id="led-direct" name="led" value="direct">
											<label for="led-direct">Direct</label>
										</li>
										<li>
											<input type="checkbox" id="led-edge" name="led" value="edge">
											<label for="led-edge">Edge</label>
										</li>
									</ul>
								</li>
								<li class="resolution item-box" data-front-phrase="" data-back-phrase="of resolution">
									<em><a href="#">Resolution</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_resolution.gif" alt=""></span>
									<div class="selector">
										<div class="inner">
											<strong class="pc-title">Resolution</strong>
											<select name="resolution" id="resolution-list">
												<option value="any" selected>Any</option>
												<option value="1366 X 768(HD)">1366 X 768(HD)</option>
												<option value="1920*1080 (Full HD)">1920 X 1080(FHD)</option>
												<option value="3840*2160 (4K UHD)">3840 X 2160(UHD)</option>
											</select>
										</div>
									</div>
								</li>
								<li class="brightness item-box" data-front-phrase="" data-back-phrase="brightness">
									<em><a href="#">Brightness</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_brightness.gif" alt=""></span>

									<div class="selector">
										<div class="inner">
											<strong class="pc-title">Brightness</strong>
											<select name="brightness" id="bright-list">
												<option value="any" selected >Any</option>
												<option value="low">Low</option>
												<option value="medium">Medium</option>
												<option value="high">High</option>
												<option value="very-high">Very High</option>
											</select>
										</div>
									</div>
								</li>
								<li class="display-port item-box" data-front-phrase="" data-back-phrase="">
									<em><a href="#">Display port</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_port.gif" alt=""></span>
									<strong class="pc-title">Display port</strong>
									<ul>
										<li data-front-phrase="with">
											<input type="checkbox" id="display-port-yes" name="port" value="yes">
											<label for="display-port-yes">Yes</label>
										</li>
										<li data-front-phrase="no">
											<input type="checkbox" id="display-port-no" name="port" value="no">
											<label for="display-port-no">No</label>
										</li>
									</ul>
								</li>
								<li class="tuner item-box" data-front-phrase="" data-back-phrase="">
									<em><a href="#">Tuner</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_tuner.gif" alt=""></span>
									<strong class="pc-title">Tuner</strong>
									<ul>
										<li data-front-phrase="with">
											<input type="checkbox" id="tuner-yes" name="tuner" value="Yes(only for NA)">
											<label for="tuner-yes">Yes</label>
										</li>
										<li data-front-phrase="no">
											<input type="checkbox" id="tuner-no" name="tuner" value="N/A">
											<label for="tuner-no">No</label>
										</li>
									</ul>
								</li>
								<li class="internal-player item-box" data-front-phrase="" data-back-phrase="">
									<em><a href="#">Internal player</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_internal.gif" alt=""></span>
									<strong class="pc-title">Internal player</strong>
									<ul>
										<li data-front-phrase="with">
											<input type="checkbox" id="internal-player-yes" name="player" value="yes">
											<label for="internal-player-yes">Yes</label>
										</li>
										<li data-front-phrase="no">
											<input type="checkbox" id="internal-player-no" name="player" value="no">
											<label for="internal-player-no">No</label>
										</li>
									</ul>
								</li>
								<li class="storage item-box" data-front-phrase="" data-back-phrase="of storage">
									<em><a href="#">Storage</a></em>

									<span class="pc-icon"><img src="/static/images/smartchoice/ico_advaned_storage.gif" alt=""></span>
									<strong class="pc-title">Storage</strong>
									<ul>
										<li>
											<input type="checkbox" id="storage-8gb" name="storage" value="8gb">
											<label for="storage-8gb">8GB</label>
										</li>
										<li>
											<input type="checkbox" id="storage-4gb" name="storage" value="4gb">
											<label for="storage-4gb">4GB</label>
										</li>
									</ul>
								</li>
							</ul><!-- // .list-filter -->

							<!-- reset btn vor pc -->
							<%--<div class="btn-apply-filter pc">
								<a href="javascript:;" class="g-btn-l-reset" onclick="smartChoiceApp.ADVANCED_TOOL.reset();"><span>Reset Filters</span></a>
							</div>--%><!-- // reset btn vor pc --><!-- 0817-2 :: 위치변경 -->

						</form>
					</div><!-- // .g-filter -->
				</div>
			</aside>

			<div id="c-content" class="advanced-result">
				<!-- 0817-2 :: 버튼 추가 -->
				<div class="advBtn"><a href="javascript:;" onclick="smartChoiceApp.START_TOOL.reset();ga_behavior_event('Support','Support_SMART_Choice_Click','support-smart_choice-[GO TO START]_btn');" class="g-btn-l-arrow4"><span>Go TO START</span></a></div>
				<!-- //0817-2 :: 버튼 추가 -->

				<div class="g-result">
					<span class="view"><i>0</i></span>
					<span class="result">Results</span>
				</div>

				<div class="selected-opt">
					<em>SIZE 75”</em>
				</div>

				<!-- 0817-2 :: 검색결과 없을 경우 추가 -->
				<div class="g-list-aticle">
					<ul>
						<li class="null">
							<p>No Results Found.</p>
						</li>
					</ul>
				</div>
				<!-- //0817-2 :: 검색결과 없을 경우 추가 -->

				<section class="g-box advanced-list-box">
					<div class="g-list-by-advanced">
						<ul class="advanced-list">
							<li>
								<div class="item">
									<div class="itembox">
										<figure class="visual">
											<a id="aaaa" href="javascript:;" onclick="smartChoiceApp.ADVANCED_TOOL.viewDetail(this);try{ga_behavior_event('Support','Support_SMART_Choice_Click','support-smart_choice-[' + $(this).closest('div').find('strong').find('a').text() + '][View Product]_btn');}catch(e){};"><img  alt=""></a>
										</figure>
										<div class="explain">
											<span class="moreArr"></span>
											<strong class="stitle"><a href="#" onclick="try{ga_behavior_event('Support','Support_SMART_Choice_Click','support-smart_choice-[' + $(this).text() + '][View Detail]_btn');}catch(e){};">DC32E-H</a></strong>
										</div>
									</div>
									<span class="line-t"></span>
									<span class="line-r"></span>
									<span class="line-b"></span>
									<span class="line-l"></span>
								</div>
							</li>
						</ul>
					</div>
				</section>
			</div>

		</div>




	</article>


</main><hr><!-- // #content -->

<!-- ui js -->
<script src="/static/js${minifyPath}/ssds.common${minifyExtension}.js?${cacheQueryString}"></script>
<script src="/static/js${minifyPath}/ssds.support${minifyExtension}.js"></script>

<!-- for smart choice -->
<script src="/static/js/smartChoice/smartChoiceApp.js"></script>
<!-- //ui js -->
