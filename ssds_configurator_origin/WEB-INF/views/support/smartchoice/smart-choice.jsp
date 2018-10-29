  <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ include file="/WEB-INF/views/layout/taglibs.jsp" %>


  <link rel="stylesheet" href="/static/css${minifyPath}/smartChoice${minifyExtension}.css">
    <%--<script src="/static/js/smartChoice/smartChoiceData.js"></script>--%>
	
<main id="content" role="main">

  <!-- .g-sortby-category -->
  <div class="g-scrollspy-sort sort-category scrollspy-tab-link newSticky scrollspy-typeB" data-sticky="true" data-type="select">
    <div class="in-scrollspy">
      <div class="inbox">
        <span class="btn-menu"><button type="button">support details open/close</button></span>
        <span class="stitle" id="_stitle" data-pathmap="${file}">
					<c:choose>
                      <c:when test="${menuId eq '071101'}">Configurator</c:when>
                      <c:when test="${file eq 'smart-choice' or file eq 'start-tool' or file eq 'advanced-tool'}">SMART Choice</c:when>
                    </c:choose>
				</span>
        <div class="menu _menu">
          <ul>
            <li <c:if test="${menuId eq '071101'}">class="is-active"</c:if>><a href="/support/tools/configurator" onclick="ga_behavior_event('Support-SMART_Choice','Support-SMART_Choice_Click','support-smart_choice-tab[Configurator]_tab');">Configurator</a></li>
            <li <c:if test="${file eq 'smart-choice' or file eq 'start-tool' or file eq 'advanced-tool'}">class="is-active"</c:if>><a href="/support/tools/smart-choice" onclick="ga_behavior_event('Support-SMART_Choice','Support-SMART_Choice_Click','support-smart_choice-tab[SMART Choice]_tab');">SMART Choice</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div><!-- // .g-sortby-category -->
	
      <article id="lfd-smart-choice" class="webapp-lfd-smart-choice">
        <h1 class="blind">smartChoice-index</h1>
        <!-- // quistion-box :: start -->
        <section id="question-box" class="smart-box smart-box choice-question">
          <div class="inbox">
            <div class="question-img"><img class="question-img-source" alt="" src="/static/images/tools/img_intro.gif" /></div>
            <h2 class="question-title">Welcome to the Smart Choice</h2>
            <ul class="question-btn">
              <li>
                <a href="/support/tools/smart-choice/start-tool" onclick="ga_behavior_event('Support-SMART_Choice','Support-SMART_Choice_Click','support-smart_choice-[Welcome to the Smart Choice][START TOOL]_btn');">
                  <img class="icon" alt="" src="/static/images/tools/intro_START TOOL.gif">
                  <i>START TOOL</i>
                  <span class="check">check this item</span>
                </a>
              </li>
              <li>
                <a href="/support/tools/smart-choice/advanced-tool" onclick="ga_behavior_event('Support-SMART_Choice','Support-SMART_Choice_Click','support-smart_choice-[Welcome to the Smart Choice][ADVANCED TOOL]_btn');">
                  <img class="icon" alt="" src="/static/images/tools/intro_ADVANCED TOOL.gif">
                  <i>ADVANCED TOOL</i>
                  <span class="check">check this item</span>
                </a>
              </li>
            </ul>
            <p class="question-txt"></p>
          </div>
        </section>
        <!-- // quistion-box :: end -->
      </article>
    </main><hr><!-- // #content -->

    <!-- ui js -->
  <script src="/static/js${minifyPath}/ssds.common${minifyExtension}.js?${cacheQueryString}"></script>
    <%--<script src="/static/js/ssds.support.js"></script>--%>
    <!-- //ui js -->
