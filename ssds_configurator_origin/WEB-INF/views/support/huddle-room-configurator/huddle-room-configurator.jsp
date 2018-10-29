<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/layout/taglibs.jsp"%>
<%
	String memberSeq  	= (String)session.getAttribute("memberSeq");
	boolean statusSign	= !("").equals(memberSeq) && memberSeq != null ? true : false;
%>
<c:set var="memberSeq" value="<%=memberSeq %>"/>
<c:set var="statusSign" value="<%=statusSign %>"/>

<link rel="stylesheet" href="/static/css/huddle_configurator.css?201802070911">
<script src="/static/js/configurator/huddle_configuratorData.js?201802061715"></script>
<script src="/static/js/configurator/lib/vue.min.js"></script>

<main id="content" role="main">
	<div class="g-box huddle v-cloak-hidden" id="huddle-configurator-app" v-cloak>
		<div class="inbox">
			<div class="g-h-box">
				<h1 class="h-page">Huddle Room Solutions for You</h1>
			</div>
		</div>
		<div class="selectArea">
			<p class="title">Choose the features you need for your huddle room and ensure that you have the right solution.</p>
			<div class="actionBox">				
				<div class="actionList">
					<ul>
						<li v-for="(frame, idx) in sequenceFrame" :class="['q'+(idx+1), {'active':sequenceInactive[sequenceActiveStep][idx]}, {'disabled':!sequenceInactive[sequenceActiveStep][idx]} ]">
							<span class="num">{{idx+1}}</span>							
							<div class="txt">{{frame.title}}
								<div class="info">
									<p>?</p>
									<div class="layer"><div v-html="frame.txt"></div></div>
								</div>
							</div>
							<div class="choose">
								<p v-for="option in frame.options">
									<input type="radio" :name="frame.code" :value="option" @click="nextStep(frame.code, option)" :id="frame.code+option" v-model="selectSequenceOption[idx][frame.code]">
									<label :for="frame.code+option">{{option}}</label>
								</p>
							</div>
							<div class="noti" v-if="idx == 0">
								<dl :class="{'on':exceptProp.seat}">
									<dt><a href="javascript:;" @click="nextStep('seat', '9+')"><span>Do you need to accommodate over 9 participants?</span></a></dt>
									<dd>
										Our bundles are specially designed for small/mid-sized meeting rooms and huddle spaces. However, Samsung & HARMAN possess options to help you meet the needs of rooms of any size with a range of features geared  to spaces able to accommodate nine or more participants. Please contact a representative for more details.
										<p class="btn"><a href="javascript:;" onclick="$('#inquiryFrm').find('#inflowUrl').val(window.location.href);var originType=ssds.common.byDeviceWidth().type;$('#inquiryFrm').find('#origin').val(originType+'|detail');$('#inquiryFrm').attr('action','https://displaysolutions.samsung.com/etc/inquiry?salesInquiryType=REQ001').submit();ga_behavior_event('Support','Support_huddle_room_configurator_Click','support-huddle_room_configurator-[Contact Us]_btn');"><span><strong>Contact Us</strong></span></a></p>
										<p class="copy">Please note that this solution is currently only available in the following countries<br />: United States, United Kingdom, Germany, France, Denmark, Finland, Norway, Sweden and Netherlands.</p>
									</dd>
								</dl>
							</div>
							<em class="disabledLayer"></em>
						</li>
					</ul>
				</div>								
				<div class="actionImg" :class="[{'many':selectSequenceOption[0]['seat'] == '5-8'}, {'audio_':selectSequenceOption[1]['premium_audio'] == 'yes'}, {'confer_':selectSequenceOption[2]['conferencing_collaboration'] == 'yes'}, {'touch':selectSequenceOption[3]['touch_screen'] == 'yes'}, {'schedual_':selectSequenceOption[4]['room_schedule'] == 'yes'}, {'sereno_':selectSerenoOption['sereno']}, {'size49':selectSizeOption['size'] == '49'}]"><!-- touch, confer_, schedual_, many, audio_, sereno_ -->
					<div class="action">
						<div class="display">
							<p></p>
							<span>{{selectSizeOption.size}}”</span>
						</div>
						<div class="confer"></div>
						<div class="inch" v-for="(frame, idx) in sizeFrame" :class="{'disabled':!selectSizeOption['size' + frame.options[1]]}">
							<p class="tit" v-html="frame.title"></p>
							<div class="choose">
								<p v-for="option in frame.options">	
									<input type="radio" :name="frame.code" :value="option" @click="selectSize(option)" :id="frame.code+option" :checked="selectSizeOption.size == option" :v-model="selectSizeOption.size">
									<label :for="frame.code+option">{{option}}"</label>
								</p>
							</div>
						</div>
						<div class="schedual">
							<div class="clock"></div>
						</div>
						<div class="people"></div>
						<div class="audio"></div>
						<div class="sereno"></div>
						<div class="noti" :class="{'on':exceptProp.seat}">
							<dl>
								<dt><a href="javascript:;"><span>Do you need to accommodate over 9 participants?</span></a></dt>
								<dd>
									Our bundles are specially designed for small/mid-sized meeting rooms and huddle spaces. However, Samsung & HARMAN possess options to help you meet the needs of rooms of any size with a range of features geared  to spaces able to accommodate nine or more participants. Please contact a representative for more details.
									<p class="btn"><a href="javascript:;" onclick="$('#inquiryFrm').find('#inflowUrl').val(window.location.href);var originType=ssds.common.byDeviceWidth().type;$('#inquiryFrm').find('#origin').val(originType+'|detail');$('#inquiryFrm').attr('action','https://displaysolutions.samsung.com/etc/inquiry?salesInquiryType=REQ001').submit();ga_behavior_event('Support','Support_huddle_room_configurator_Click','support-huddle_room_configurator-[Contact Us]_btn');"><span><strong>Contact Us</strong></span></a></p>
									<p class="copy">Please note that this solution is currently only available in the following countries<br />: United States, United Kingdom, Germany, France, Denmark, Finland, Norway, Sweden and Netherlands.</p>
								</dd>
							</dl>
						</div>
					</div>
				</div>				
			</div>
		</div>		
		<div class="btnArea" :class="{'disabled':!isSequenceEnd}">
			<a href="javascript:;" class="g-btn-l-arrow3" onclick="ga_behavior_event('Support','Support_huddle_room_configurator_Click','support-huddle_room_configurator-[Receive Our Recommended Solution]_btn');" @click="showResult()"><span>RECEIVE OUR RECOMMENDED SOLUTION</span></a>
			<a href="javascript:;" class="g-btn-l-reset" onclick="ga_behavior_event('Support','Support_huddle_room_configurator_Click','support-huddle_room_configurator-[Reset]_btn');" @click="init()"><span>Reset</span></a>
			<em class="disabledLayer"></em>
		</div>
		
		<div class="g-layer-fix-size ly-choose-display resultArea" :class="{'abled':resultSolutionProp.isShow}">
			<!-- layer -->
			<div class="layer">
				<div class="inbox">
					<!-- content -->
					<p class="name"><span>Recommended Solution</span>{{resultSolutionData.name}}</p>
					<div class="image"><img :src="resultSolutionData.img" /></div>			
					<div class="models">
						<div><a :href="resultSolutionData.product_samsung.link" target="_blank" onclick="ga_behavior_event('Support','Support_huddle_room_configurator_Click','support-huddle_room_configurator-[Product]-[' + huddleConfiguratorApp.resultSolutionData.product_samsung.fullname + ' ' + huddleConfiguratorApp.resultSolutionData.product_samsung.size + '”]_btn');"><img :src="resultSolutionData.product_samsung.img" /><p><span>{{resultSolutionData.product_samsung.fullname}}</span></p></a></div>
						<div v-for="harman in resultSolutionData.product_harman">
							<a :href="harman.link" target="_blank" class="appOutLink" @click="ga_behavior_event('Support','Support_huddle_room_configurator_Click','support-huddle_room_configurator-[Product]-[' + harman.fullname + ']_btn');"><img :src="harman.img" /><p><span v-html="harman.txt"></span></p></a>
						</div>
					</div>			
					<div class="desc">
						<div>
							<p class="title">{{resultSolutionData.title}}</p>
							{{resultSolutionData.txt}}
							<div class="icons">
								<ul>
									<li v-for="feature in resultSolutionData.feature">
										<img :src="feature.pcimg" class="pc" />
										<img :src="feature.moimg" class="mo" />
										<p v-html="feature.txt"></p>
									</li>
								</ul>
							</div>
							<div class="btn">
								<a :href="resultSolutionData.link" target="_blank" class="g-btn-l-arrow4" onclick="ga_behavior_event('Support','Support_huddle_room_configurator_Click','support-huddle_room_configurator-['+ huddleConfiguratorApp.resultSolutionData.name +']-[DISCOVER ALL OPTIONS]_btn');"><span>DISCOVER ALL OPTIONS</span></a>
								<a href="javascript:;" @click="init()" class="g-btn-l-reset" onclick="ga_behavior_event('Support','Support_huddle_room_configurator_Click','support-huddle_room_configurator-['+ huddleConfiguratorApp.resultSolutionData.name +']-[BACK]_btn');"><span>BACK</span></a>
							</div>
							
						</div>			
					</div>								
					<!-- // content -->					
				</div>
			</div>
			<!-- layer -->
			<div class="ly-mask"></div>
		</div>
				
	</div>

</main><hr><!-- // #content -->

<script src="/static/js${minifyPath}/ssds.common${minifyExtension}.js?${cacheQueryString}"></script>
<script src="/static/js/configurator/huddle_configuratorApp.js"></script>