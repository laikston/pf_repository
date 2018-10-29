var pdfdoc = {y : 30, spaceY : 10, x : 15, w : 180, h : 0, nextY : 20},
	$wall = $("#blueprint_scenario_background"),
	wall = {width : $('.videowall-viewport').width(), height : $wall.height(), sideWidth : parseInt($wall.find('#scenario_middle').css('margin-left')), sideHeight : $wall.find('#scenario_top').height()},
	
	ratio = pdfdoc.w / wall.width,
	$modeltag = $('#model-tag'),
	modeltagProp = {width : $modeltag.width(), height : $modeltag.outerHeight()}, 
	currentMode = '',
	
	/* 171117 */
	$container = document.getElementById('blueprint_container'),
	containerProp = {},
	displayProp = {};
	/* 171117 */

pdfdoc.wallT = 140 * ratio; // top : 천장높이, bottom : 바닥높이 // 171031 수정
pdfdoc.wallL = 164 * ratio; // left : 왼쪽 벽 넓이, right : 오른쪽 벽 높이 // 171031 추가 

function exportToPDF(){
	var modelCode = angular.element(document.querySelector('[ng-app=configurator]')).scope().display.name,
		pdfTitle = 'VIDEOWALL CONFIGURATOR';
	
	/* 171117 */
	containerProp = {
			startX : parseFloat($container.style.left) + 164,
			startY : parseFloat($container.style.top) + 140,
			width : parseFloat($container.style.width),
			height : parseFloat($container.style.height)
	};
	displayProp = {
			col : angular.element(document.querySelector('[ng-app=configurator]')).scope().display.videowall.col,
			row : angular.element(document.querySelector('[ng-app=configurator]')).scope().display.videowall.row,
			width : angular.element(document.querySelector('[ng-app=configurator]')).scope().display.size.width,
			height : angular.element(document.querySelector('[ng-app=configurator]')).scope().display.size.height
	};
	/* 171117 */
	
	if(null ==  modelCode || '' == modelCode) {
		alert('please choose model.');
		return;
	}
	
	//20170203 PDF title 추가
	if ($('#pdfTitle').val()!="") {
		pdfTitle = $('#pdfTitle').val();
	}

	/* show loader */
//	$('#export_overlay').show();
//	export_loader();
	$('#loading-layer').addClass('is-active');
	ssds.common.newLoading(angular.element('#loading-layer .layer .loading'));
	$('body').addClass('no-scroll');
	/* //show loader */
	
	setTimeout(function(){
		var isFinish=0;
		var doc = new jsPDF();
		var renderImage = "",
			bluePrintImage = "",
			url, backImg = 'url("/static/images/videowall_configurator/background.gif")',
			model;
				
		x = pdfdoc.x;
		w = wall.width;//$("#scenario_background").width();
		h = wall.height;			
			
		logo = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERURGN0U3REU0MzQxMUU2OTQwNDg4RTQ1NjNFN0I1OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERURGN0U3RUU0MzQxMUU2OTQwNDg4RTQ1NjNFN0I1OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRFREY3RTdCRTQzNDExRTY5NDA0ODhFNDU2M0U3QjU4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRFREY3RTdDRTQzNDExRTY5NDA0ODhFNDU2M0U3QjU4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAawD+AwERAAIRAQMRAf/EAN4AAQADAAMAAwEBAAAAAAAAAAAICQoGBwsDBAUBAgEBAAMAAgMBAQAAAAAAAAAAAAcICQUGAwQKAgEQAAAGAgIABAIHAgkHBg8AAAECAwQFBgAHEQghEhMJMUEiFBUWtjgKUTJhcUJSI3SUF3czJHW1NnYZgaFE1SdYcoJDY5M0JdY3V6cYSHi4EQACAQMCAwQDCgcLCgUFAQABAgMABAURBiESBzFREwhBYbNxgZEiMnIUFTY3ocFSYpIjdbFCorLSdLRVFhgJ0YIzc5OjNGQ1ZWOD06S18OHCRJR2/9oADAMBAAIRAxEAPwCHmbuV819MUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUpilMUrlFMpNw2LZYqm0Oszlwtc45K0iK9XIx3Ly8g4N/IbMmSSq5wIX6RzceUhQExhAAEc4/KZbGYOwkymYuIbXHRLq8krBEUetmIHuDtJ4DjXL4PA5rc2Tiwu37We8y07aJFCjO7H1BQeA9JOgA4kgVa7S/Y77w22KbSki21TQjuUiLBF3S7SBZVEDgBgI5QqtYtSCCoAPiUyvmKPgPAgIZXbKebLpPjrhreA5G8CnTnggXkPuGWWIkevSrWYnyPdbMnarc3BxFkzAHknuZOca+giG3mAPeOauGbc9m3u/qaBeWMlQq+zY+PSO4eI6qsDyxS6bdIPMosjAysLX5p/wCUvj5GyCynAD9HOT235n+lG47xLE3NxYTOdFN3Gsaa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";
		
		doc.setDrawColor(0);
		doc.setFillColor(0,136,208);
		doc.rect(0, 0, 210, 30, 'F'); 
		
		setTimeout(function(){
			$('#insert_title').css({display:'block'});
	        html2canvas(document.getElementById('insert_title'), {
	            onrendered: function(canvas) {
	                var ratio = 180 / 1200;
	
	                pdfTitle = canvas.toDataURL('image/jpeg');
	                doc.addImage(pdfTitle, 'JPEG', -1, -1, 212, ($("#insert_title").outerHeight(true)) * ratio);
	                $('#insert_title').text('');
	                $('#insert_title').css({display:'none'});
	            }
	        });
		
        }, 100);
		
		 setTimeout(function(){
	        	doc.addImage(logo, 'JPEG', 160, 12, 45, 17);
	        	
				doc.setFont("helvetica");
				doc.setFontType("bold");
				doc.setTextColor(255);
				doc.setFontSize(23);
				
				doc.setFontType("normal");
				doc.setFontSize(18);
				doc.text(15, 22, "Model " + modelCode);
		}, 200);
		
		w = pdfdoc.w;
		if($('#scenario_person_section').hasClass('ng-hide')){ // 171101 scenario 마크업 삭제후 각 모드에 따른 요소 선택적으로 보여주기 수정 :: blueprint
	        currentMode = 'blueprint';
		}else{ // render
			$('#scenario_person_section').removeClass('ng-hide')
			currentMode = 'render';
		}
		
		$('.model_tag').css({color:'#6a6a6a'});
		
		$('#blueprint .opt-btn-plus').hide();
		$('#blueprint .opt-btn-minus').hide();
		$('#blueprint .choose-opts').hide();
		
		switch(angular.element(document.querySelector('[ng-app=configurator]')).scope().upload.current){
			case 'image' :
				url = $('#videowall').css('background-image');
				if(url != backImg){
					$('#videoContainer_blueprint').css({'background-image' : backImg});
					$('#videowall').css({'background-image' : backImg});
				}
				break;
				
			case 'video' :
				$('#videoContainer_blueprint video').css({visibility : 'hidden'});
				$('#videoContainer video').css({visibility : 'hidden'});
				
				$('#videoContainer_blueprint').css({'background-image' : backImg});
				$('#videowall').css({'background-image' : backImg});
				break;
				
			default : 
				break;
		}
		
		
		$('#scenario_person_section').removeClass('ng-hide');
		$('#blueprint_measure_width_section').addClass('ng-hide');
		$('#blueprint_measure_height_section').addClass('ng-hide');
		$('#blueprint .measure-number').css({color:'#9ea0a6'});
		$('#blueprint #measure_width .measure-number').css({color:'#222'});
		$('#blueprint #measure_height .measure-number').css({color:'#222'}); 
		setTimeout(function(){
			html2canvas(document.getElementById('blueprint_scenario_background'), { // render
		            onrendered: function(canvas) {
		            	/* 171117 */
		            	var tmpCanvas, idName = 'render-canvas';
		            	document.body.appendChild(canvas);
		            	canvas.setAttribute('id', idName);
		            	tmpCanvas = setBlueprintPattern(idName);
		            	document.body.removeChild(canvas);
		            	/* 171117 */
		            	
						renderImage = tmpCanvas.toDataURL('image/jpeg');
						doc.addImage(renderImage, 'JPEG', x, 40, w, h);
						
			    		(url == backImg) ? $('#videoContainer_blueprint').css({'background-image' : backImg}) : $('#videoContainer_blueprint').css({'background-image' : url});
						if($('#videoContainer_blueprint video').css('visibility') == 'hidden' || angular.element(document.querySelector('[ng-app=configurator]')).scope().upload.current == "video"){
							$('#videoContainer_blueprint').css({'background-image' : 'none'});
							$('#videoContainer_blueprint video').css({visibility : 'visible'});
						}
						getModelTxt(doc, modelCode);
		            }
			});
			
			setTimeout(function(){
				$('#scenario_person_section').addClass('ng-hide');
				$('#blueprint_measure_width_section').removeClass('ng-hide');
		        $('#blueprint_measure_height_section').removeClass('ng-hide');		 

				html2canvas(document.getElementById('blueprint_scenario_background'), { // blueprint
						onrendered: function(canvas) {
								/* 171117 */
				            	var tmpCanvas, idName = 'blueprint-canvas';
				            	document.body.appendChild(canvas);
				            	canvas.setAttribute('id', idName);
				            	tmpCanvas = setBlueprintPattern(idName);
				            	document.body.removeChild(canvas);
				            	/* 171117 */
				            	
								doc.addPage();								
								bluePrintImage = tmpCanvas.toDataURL('image/jpeg');
								doc.addImage(bluePrintImage, 'JPEG', x, pdfdoc.nextY, w, h);
								
								$('#blueprint .opt-btn-plus').show();
				        		$('#blueprint .opt-btn-minus').show();
				        		$('#blueprint .choose-opts').show();
				        		
				        		(url == backImg) ? $('#videoContainer_blueprint').css({'background-image' : backImg}) : $('#videoContainer_blueprint').css({'background-image' : url});
								if($('#videoContainer_blueprint video').css('visibility') == 'hidden' || angular.element(document.querySelector('[ng-app=configurator]')).scope().upload.current == "video"){
									$('#videoContainer_blueprint').css({'background-image' : 'none'});
									$('#videoContainer_blueprint video').css({visibility : 'visible'});
								}
								getModelTxt(doc, modelCode, true);
								getNumberTxt(doc);
								
								if(currentMode == 'render'){
									$('#blueprint_measure_width_section').addClass('ng-hide');
							        $('#blueprint_measure_height_section').addClass('ng-hide');
							        $('#scenario_person_section').removeClass('ng-hide');
								}else{
									$('#blueprint_measure_width_section').removeClass('ng-hide');
							        $('#blueprint_measure_height_section').removeClass('ng-hide');
							        $('#scenario_person_section').addClass('ng-hide');
								}
				                   
				                doc.addPage();
				                getSpecifications(doc, modelCode);
				                getSpecificationsData(doc, modelCode);
				                 
				                $('.model_tag').css({color:'#fff'});
				                $('#blueprint .measure-number').css({color:'#fff'});
				                $('#blueprint #measure_width .measure-number').css({color:'#fff'});
				                $('#blueprint #measure_height .measure-number').css({color:'#fff'});
									
				                doc.save("Samsung_Videowall_"+modelCode+".pdf");
				                
				                //$('#export_overlay').fadeOut(); //hide loader
				                /* hide loader */
				                $('#loading-layer').removeClass('is-active');
				                ssds.common.newLoadingDone(angular.element('#loading-layer .layer .loading .newLoading'));
				            	$('body').removeClass('no-scroll');
				            	/* //hide loader */
								
				                if(currentMode == 'render'){
				                	$('#render_btn').trigger('click');
								}else{
									$('#blueprint_btn').trigger('click');
								}
						}
				});
				},1300);
			}, 5000);
		}, 700);
}

/* 171117 */
function setBlueprintPattern(_idName){
	var canvas = document.getElementById(_idName).getContext("2d"),
		width = displayProp.width,
		height = displayProp.height,
		startX = containerProp.startX + 0.5,
		startY = containerProp.startY + 0.5,
		col = { // vertical
			startY : startY,
			endY : startY + containerProp.height - 1,
			i : 1,
			total : displayProp.col
		},
		row = { // horizon
				startX : startX,
				endX : startX + containerProp.width - 1,
				i : 1,
				total : displayProp.row
		};
	
	canvas.lineWidth = 1; 
	canvas.strokeStyle = 'rgba(0, 0, 0)';
	canvas.beginPath();
	
	drawColLine();
	drawRowLine();
	drawModelTag();
	
	function drawColLine(){
		for(; col.i < col.total; ++col.i){
			canvas.moveTo(startX + width * col.i, col.startY);
			canvas.lineTo(startX + width * col.i, col.endY);
			canvas.stroke();
		}
	}
	
	function drawRowLine(){
		for(; row.i < row.total; ++row.i){
			canvas.moveTo(row.startX, startY + height * row.i);
			canvas.lineTo(row.endX, startY + height * row.i);
			canvas.stroke();
		}
	}
	
	function drawModelTag(){
		canvas.fillStyle = "#6a6a6a";
		canvas.fillRect(wall.width - wall.sideWidth - modeltagProp.width, wall.sideHeight, modeltagProp.width, modeltagProp.height);
	}
	
	return document.getElementById(_idName);
}
/* 171117 */

function getModelTxt(doc, modelCode, blueprint){
	var font = 'helvetica', 
		weight = 'normal',
		model = {x : 0, y : (blueprint == true) ? 48 : 68, colorR : 255, colorG : 255, colorB : 255, size : 7},// 171030 수정
		$blueprint = $('#blueprint_scenario_background'), // 171030 추가
		$blueprint_middle = $blueprint.find('#scenario_middle'), // 171030 추가
		$blueprint_tag = $blueprint.find('.model_tag');
		//x = 0, y = 0; // 171030 삭제

//  171030 삭제	
//	if(blueprint == true){
//		y = ($('#blueprint_scenario_background #blueprint_container').position().top * ratio) + ($('#blueprint_scenario_background #model-tag').height() * ratio);
//		x = $('#blueprint_scenario_background #blueprint_container').position().left * ratio + ($('#blueprint_scenario_background #blueprint_container').width() * ratio) - ($('#blueprint_scenario_background #model-tag').width() * ratio) + 1;
//	}else{
//		y = ($('#scenario_background #videowall').position().top * ratio) + ($('#scenario_background #model-tag').height() * ratio);
//		x = ($('#scenario_background #videowall').position().left * ratio) + ($('#scenario_background #videowall').width() * ratio) - ($('#scenario_background #model-tag').width() * ratio) + 1;
//	}
	
	model.x = ($blueprint.width() - parseInt($blueprint_middle.css('margin-right'))) * ratio + pdfdoc.x - ($blueprint_tag.width() * ratio) + .5; // 171030 추가
	
		
	doc.setFont(font);
	doc.setFontType(weight);
	doc.setTextColor(model.colorR, model.colorG, model.colorB);
	doc.setFontSize(model.size);
	doc.text(model.x, model.y, modelCode);
}


function getNumberTxt(doc){
	var font = 'helvetica', 
		weight = 'normal',
		size = 6.5,
		tmpTop = pdfdoc.nextY + pdfdoc.wallT, // 171031 수정
		tmpLeft = pdfdoc.x + pdfdoc.wallL, // 171031 수정
		
		$h_space_top = $('.measure_height_space_top'),
		$h_space_bottom = $('.measure_height_space_bottom'),
		$h = $('#measure_height'),
		$h_dotted = $('.measure_height_dotted_line'), // 171031 추가
		$h_number_tag_wrap = $('.measure_height_space_top'), // 171031 추가
		
		h_tag_padding = parseInt($h_space_top.find('.measure_height_space_top_number').css('padding-top')), // 171031 추가
		
		h_space_top = tmpTop + (($h_space_top.height() / 2 + h_tag_padding) * ratio),
		h = tmpTop + (($h_space_top.height() + $h.height() / 2 + h_tag_padding) * ratio),
		h_space_bottom = tmpTop + (($h_space_top.height() + $h.height() + $h_space_bottom.height() / 2 + h_tag_padding) * ratio),
		
		$w_space_left = $('.measure_width_space_left'),
		$w_space_right = $('.measure_width_space_right'),
		$w = $('#measure_width'),
		$w_dotted = $('.measure_width_dotted_line'), // 171031 추가
		$w_number_tag = $('.measure_width_space_left_number'), // 171031 추가
		
		w_tag_padding = parseInt($w.find('.width_tag').css('padding-left')), //  171031 추가
		
		w_space_left = tmpLeft + ($w_space_left.width() - $w_space_left.children('div').width()) / 2 * ratio,
		w = tmpLeft + (($w_space_left.width() + $w.width() / 2 - $w.find('.width_tag').width() / 2 + w_tag_padding) * ratio),
		w_space_right = tmpLeft + (($w_space_left.width() + $w.width() + ($w_space_right.width() / 2)) - ($w_space_right.children('div').width() / 2)) * ratio,
		
		color = {r : 255, g : 255, b : 255},
		width = {startX : [w_space_left, w, w_space_right], startY : tmpTop - (($w_dotted.height() + Math.abs(parseInt($w_number_tag.css('margin-top'))) + $w_number_tag.height() / 2 - parseInt($w_number_tag.css('padding-top'))) * ratio)}, // 171031 수정
		height = {startX : pdfdoc.x + pdfdoc.w - pdfdoc.wallL + (($h_dotted.width() + $h_number_tag_wrap.position().left / 2) * ratio), startY : [h_space_top, h, h_space_bottom]};
	
	doc.setFont(font);
	doc.setFontType(weight);
	
	doc.setTextColor(color.r, color.g, color.b);
	doc.setFontSize(size);
	doc.text(width.startX[0], width.startY, $w_space_left.find('.measure-number').text());
	doc.text(width.startX[1], width.startY, $w.find('.measure-number').text());
	doc.text(width.startX[2], width.startY, $w_space_right.find('.measure-number').text());
	
	doc.text(height.startX, height.startY[0], $h_space_top.find('.measure-number').text());
	doc.text(height.startX, height.startY[1], $h.find('.measure-number').text());
	doc.text(height.startX, height.startY[2], $h_space_bottom.find('.measure-number').text());
}

function getSpecifications(doc, modelCode){
		
	doc.setDrawColor(0);
	doc.setFillColor(232,240,255);
	doc.rect(15, 30, 60, 70, 'F'); 

	doc.setDrawColor(0);
	doc.setFillColor(243,247,255);
	doc.rect(75, 30, 60, 70, 'F'); 
	
	doc.setDrawColor(199,210,238);
	doc.setLineWidth(0.4);
	
	doc.line(15, 15, 194, 15); 
	doc.line(15, 30, 194, 30); 
	
	doc.line(75, 40, 194, 40); 
	doc.line(15, 50, 194, 50);
	
	doc.line(75, 60, 194, 60); 
	doc.line(75, 70, 194, 70); 
	doc.line(15, 80, 194, 80); 
	
	doc.line(75, 90, 194, 90); 
	doc.line(15, 100, 194, 100); 
	//doc.line(15, 110, 194, 110); 
	
//	
//	doc.line(15, 90, 195, 90); 
//	doc.line(79, 100, 195, 100); 
//	doc.line(79, 110, 195, 110); 
//	doc.line(79, 120, 195, 120); 
//	
//	doc.line(55, 130, 195, 130); 
//	doc.line(79, 140, 195, 140); 
//	doc.line(79, 150, 195, 150); 
//	doc.line(79, 160, 195, 160); 
//
//	doc.line(15, 170, 195, 170); 
//	doc.line(79, 180, 195, 180); 
//	doc.line(79, 190, 195, 190); 
//	
//	doc.line(15, 200, 195, 200); 
	
//	
//	doc.line(75, 30, 75, 110);//full vertical line 
//	doc.line(135, 30, 135, 110);//full vertical line
	
	doc.setDrawColor(0);
	doc.setFillColor(67,70,85);
	doc.rect(15, 15, 180, 15, 'F'); 

	doc.setFont("helvetica");
	doc.setFontType("bold");
	
	var modelPng = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAAEAlgCWAAD//gAfTEVBRCBUZWNobm9sb2dpZXMgSW5jLiBWMS4wMQD/2wCEAAUFBQgGCA4ICA4OCgoKDg8NDQ0NDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8BBggICwgLDQgIDQ8NCw0PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PD//EAaIAAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKCwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+foRAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/AABEIABkAIgMBEQACEQEDEQH/2gAMAwEAAhEDEQA/APc/+Ep0f/n8tf8AwIi/+Lq7PsI4vRNf02LXtUme5t1jl+x+W5mjCvtgYNsYthtp4bBODweapp2XzEHxC1/TbvQbiG3ubeWRvK2pHNGzHE8ZOFViTgAk4HABPSiKdwZ2n/CU6P8A8/lr/wCBEX/xdTZ9hh/wlOj/APP5a/8AgRF/8XRZ9gD/AIRbR/8Anztf/AeL/wCIou+4HF6JoGmya9qkL21u0cP2Py0MMZVN0DFtilcLuPLYAyeTzVNuy+Yg+IWgabaaDcTW9tbwyL5W144Y0YZnjBwyqCMgkHB5BI6GiLdwZ2n/AAi2j/8APna/+A8X/wARU3fcYf8ACLaP/wA+dr/4Dxf/ABFF33Awf+FZ+Hf+fb/yNcf/AB2nzMVjk9H8DaLca1qNpJBuhtfsnkr5kw2+bCzPyJAzbmGfmJx0GBVNuyCweOfA2i6Vos93aQeXNH5e1vMmbG6aNTw0jKcqxHIPXI5oi3ewWOs/4Vn4d/59v/I1x/8AHanmYWD/AIVn4d/59v8AyNcf/HaOZhY7upGcJoH/ACMWr/8Abj/6TtVPZfMQfEv/AJF25/7Y/wDpRFRHcGd3UjCgD//Z';
	doc.addImage(modelPng, 'JPEG', 155, 21, 7, 4);
	
	//doc.setTextColor(255,255,255);
	doc.setFontSize(15);
	doc.text(17, 25, 'Specifications');
	doc.text(165, 25, modelCode);
	
	doc.setFontType("normal");
	doc.setTextColor(71,116,207);
	doc.setFontSize(10);
	doc.text(23, 41, 'DISPLAY REQUIREMENTS');
	doc.text(88, 36, 'Total No. of Displays');
	doc.text(83, 46, 'Screen Configuration (WxH)');
	
	doc.text(21, 67, 'DISPLAY WALL DIMENSIONS');
	doc.text(95, 56, 'Dimensions (WxHxD)');
	doc.text(97, 66, 'Diagonal');
	doc.text(99, 76, 'Weight');	

	doc.text(23, 91, 'POWER REQUIREMENTS');
	doc.text(101, 86, 'Max');
	doc.text(99, 96, 'Typical');
	//doc.text(98, 106, 'BTU (W/h)');
	
}

function getSpecificationsData(doc, modelCode){
//	var modelInfo = angular.element(document.getElementById('spec_container')).scope().data[modelCode];
	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setTextColor(119,119,119);
	doc.setFontSize(10);
	
	doc.text(140, 36, $('#spec_displayNum').text());
	doc.text(140, 46, $('#spec_screenConfig').text());
	doc.text(140, 56, $('#spec_dimension').text());
	doc.text(140, 66, $('#spec_diagonal').text());
	doc.text(140, 76, $('#spec_weight').text());
	doc.text(140, 86, $('#spec_max').text());
	doc.text(140, 96, $('#spec_typical').text());
	
	doc.setFont("helvetica", "italic");
    doc.setTextColor(71,116,207);
	doc.text(112, 106, $('.specifications-info i').text());
	//doc.text(140, 106, $('#spec_btu').text());
	
	
//	doc.text(118, 36, isEmpty(modelInfo.panel.type));
//	doc.text(118, 46, isEmpty(modelInfo.choose.resolution));
//	doc.text(118, 56, isEmpty(modelInfo.panel.brightness + ' cd/m2'));
//	doc.text(118, 66, isEmpty(modelInfo.panel.contrastRatio));
//	doc.text(118, 76, isEmpty(modelInfo.panel.responseTime + ' ms'));
//	doc.text(118, 86, isEmpty(modelInfo.panel.operationHour));
//	doc.text(118, 96, isEmpty(modelInfo.connectivity.input.rgb));
//	doc.text(118, 106, isEmpty(modelInfo.connectivity.input.video));
//	doc.text(118, 116, isEmpty(modelInfo.connectivity.input.audio));
//	doc.text(118, 126, isEmpty(modelInfo.connectivity.input.usb));
//	doc.text(118, 136, isEmpty(modelInfo.connectivity.output.rgb));
//	doc.text(118, 146, isEmpty(modelInfo.connectivity.output.video));
//	doc.text(118, 156, isEmpty(modelInfo.connectivity.output.audio));
//	doc.text(118, 166, isEmpty(modelInfo.connectivity.output.powerOut));
//	doc.text(118, 176, isEmpty(modelInfo.mechanicalSpec.weight.set + ' kg'));
//	doc.text(118, 186, isEmpty(modelInfo.mechanicalSpec.weight.package + ' kg'));
//	doc.text(118, 196, isEmpty(modelInfo.mechanicalSpec.bezelWidth));
}

function isEmpty(str) {
	  return (!str.trim() || typeof str == 'undefined' || str === null) ? '' : str;
}