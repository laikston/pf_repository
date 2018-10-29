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

<!-- test css-->
<link rel="stylesheet" href="/static/css${minifyPath}/base${minifyExtension}.css?20180703">
<link rel="stylesheet" href="/static/css${minifyPath}/common${minifyExtension}.css?20180802">
<link rel="stylesheet" href="/static/css${minifyPath}/newBase${minifyExtension}.css?20180828">
<!-- test css-->

<!-- configurator css -->
<link rel="stylesheet" href="/static/css/configurator.css?20171128"/>
<link rel="stylesheet" href="/static/css/led_configurator.css?201808031510"/>


<!-- test js-->
<script src="/static/js/lib/jquery-1.10.2.min.js"></script>
<script src="/static/js/lib/jquery-migrate-1.2.1.min.js"></script>
<script src="/static/js/lib/modernizr-2.6.2.min.js"></script>
<script src="/static/js/lib/jquery-ui-1.10.3.custom.min.js"></script>
<script src="/static/js/jquery.bxslider.min.js"></script>
<script src="/static/js/min/ui.plugins.min.js"></script>
<script src="/static/js/lib/plugins.min.js"></script>
<script src="/static/js/lib/jquery.form.min.js"></script>
<script src="/static/js/lib/js.cookie.min.js"></script>
<script src="/static/js/lib/uilib_business.min.js"></script>
<script src="/static/js/lib/customPlayerManager.min.js"></script>
<script src="/static/js/lib/jquery.tmpl.js"></script>
<script src="/static/js/lib/can.custom.min.js"></script>
<script src="/static/js${minifyPath}/ssds.navCookie${minifyExtension}.js"></script>
<!-- test js-->


<script src="/static/js/configurator/lib/angular.min.js"></script>

<main id="content" role="main">
	<!-- . support-tools-configurator -->

	<div class="support-tools-configurator tool-led">
		<!-- #videowall-configurator configurator-section -->
		<div id="videowall-configurator" class="configurator-section" ng-app="led-configurator" ng-controller="ledConfiguratorController as videowall" ng-cloak>
			<input type="hidden" ng-value="display.seq" id="modelSeq"/>
			<input type="hidden" value="${memberNm}" id="memberNm" name="memberNm"/><!-- 20180724 memberNm add -->
			<form method="post" id="configuratorsFrm" name="configuratorsFrm"  enctype="multipart/form-data" >
			<!-- 20171110 memberSeq add -->
			<input type="hidden" name="memberSeq" id="memberSeq" value="${memberSeq}" />

			<!-- 20180828 App DB Data Import -->
			<input type="hidden" name="AppUnit" id="AppUnit" ng-value="unit" ng-model="unit" ng-init="unit=(${unit}==M)?'meter':'feet'" />
			<!-- 201810058 App OS Type -->
			<input type="hidden" name="AppOs" id="AppOs" ng-value="pdf.os" ng-model="pdf.os" ng-init="pdf.os='${os}'" />
			<input type="hidden" name="AppWidth" id="AppWidth" ng-value="wall.size.width" ng-model="wall.size.width" ng-init="wall.size.width=${width}" />
			<input type="hidden" name="AppHeight" id="AppHeight" ng-value="wall.size.height" ng-model="wall.size.height" ng-init="wall.size.height=${height}" />
			<input type="hidden" name="AppModelSeq" id="AppModelSeq" ng-value="display.seq" ng-model="display.seq" ng-init="display.seq=${modelSeq}" />
			<input type="hidden" name="AppModelName" id="AppModelName" ng-value="display.name" ng-model="display.name" ng-init="display.name=${modelName}" />
			<input type="hidden" name="AppColumns" id="AppColumns" ng-value="videowall.col" ng-model="videowall.col" ng-init="videowall.col=${columns}" />
			<input type="hidden" name="AppRows" id="AppRows" ng-value="videowall.row" ng-model="videowall.row" ng-init="videowall.row=${rows}" />
			<input type="hidden" name="AppPdfTitle" id="AppPdfTitle" ng-value="pdf.title" ng-model="pdf.title" ng-init="pdf.title='${pdfTitle}'" />
			<input type="hidden" name="AppAttachFile" id="AppAttachFile" ng-value="pdf.imgFile" ng-model="pdf.imgFile" ng-init="pdf.imgFile='${attachFile}'" />
			<input type="hidden" name="AppModelInfoYN" id="AppModelInfoYN" ng-value="pdf.hasProductInfo" ng-model="pdf.hasProductInfo" ng-init="pdf.hasProductInfo=('${modelInfoYN}'=='Y') ? true : false "/>
			<input type="hidden" name="configType"id="configType" value="${configType}"/>
			<input type="hidden" name="device" id="device" value="${device}"/>

			<!-- #tool Configurator -->
				<div id="tool-configurator" class="tool-videowall" >
					<!-- // #tool-view-total -->
					<div id="tool-view-total" style="background:#ebedf0;position:relative;">
						<div id="help-section" style="max-width:1200px;margin:0 auto;position:relative;">
							<div class="ly-full-mask"></div>
							<div id="pdf-section" style="width:1020px;margin:0 auto;padding-top:40px;background:#ebedf0;" ng-init="tab.view = 1"><!-- // 171124 성능최적화 수정 -->
								<!-- #blueprint-->
								<div id="blueprint" class="scrollbar" ng-style="setWallPosition()">
									<div class="scroll-viewport">
										<div class="scroll-overview">
											<div id="blueprint_scenario_background">
												<div id="scenario_middle" ng-style="{'height':wall.size.pixel_height}">
													<div id="space">
														<div class="choose-size-w"></div>
														<div class="choose-size-h"></div>
														<div class="choose-opts"></div>
														<!-- // opts -->
														<div class="prop"></div>
														<table class="tbContainer">
															<tr class="lineWidthTr">
																<td id="measure_width_total"><!-- // 171124 성능최적화 수정 -->
																	<div class="measure_width_dotted_line measure_zidx" ng-style="getOverWSpaceDottedStyle(getBlueprintSpace(wall.size.width, blueprintProp.width) / 2)" style="border-left: 2px dotted rgb(158, 160, 166); border-right: 2px dotted rgb(158, 160, 166);"></div>
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
																</td>
																<td class="lineHeightTd" id="measure_height_total"><!-- // 171124 성능최적화 수정 -->
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
														<div id="videoContainer_blueprint" class="inVideo" ng-style="getVideoContainerStyle()"></div>
														<div class="model_tag measure_zidx" id="model-tag" ><span class="model-name">{{display.name}}</span></div>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- #blueprint-->
								</div>
								<!-- //#pdf-section -->

							</div>
							<!-- //#help-section -->
						</div>
					</div>
					<!-- // #tool Configurator -->

					<!-- // #view_options -->
					<div id="view_options" class="tools-view-opt">
						<div class="inbox">
							<div class="btnarea" style="overflow:hidden;">
								<a href="javascript:;" id="export_btn" class="g-btn-l-down2" ng-click="exportToPDF();ga_behavior_event('Support','Support_led_configurator_Click','support-led_configurator-[' + angular.element(document.querySelector('[ng-app=led-configurator]')).scope().display.name + '][EXPORT TO PDF]_btn');"><span>Export to PDF</span></a>
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
								</tbody>
							</table>
						</div>

					</div>
					<!-- // 17-12-12 public confirm layer :: end :: rui13th -->

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
<!-- <script src="/static/js/ssds.support.js"></script>-->
<!--  pdf전환  -->
<script src="/static/js/lib/jspdf/html2canvas.js"></script>
<script src="/static/js/lib/jspdf/jsPDF-1.0.272/jspdf.min.js"></script>
<script src="/static/js/lib/jspdf/jsPDF-1.0.272/jspdf.debug.js"></script>
<script src="/static/js/lib/jspdf/jsPDF-1.0.272/jspdf.plugin.addimage.js"></script>

<script src="/static/js/lib/jspdf/FileSaver.js"></script>
<script src="/static/js/lib/pulip.pdf.matrix.js"></script>
<script src="/static/js/lib/pulip.pdf.patterns.js"></script>

<!-- App File URL 전달 용 -->
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


<script src="/static/js/lib/exportPDF_LED_App_Renew.js?20181005"></script>
<!--  app  -->
<script src="/static/js/configurator/led_configuratorAppForAppRenew.js?20181005"></script>
<!-- //ui js -->