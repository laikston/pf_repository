var $pdfSection,
    $modeltag = $('#model-tag'),
    $modelname = $modeltag.children('.model-name'),

    scope, unit, shortUnit, num = {},
    pdfdoc = {y : 40, x : 15, w : 180, h : 0, padding : 0},
    areaWidth = 1020,
    infoHeight = 40,//146,
    wallWidth = 692,
    wallBottomPadding = 50,
    ratio = pdfdoc.w / areaWidth,

	modelTagH, modelNameH,
	
	$h_space_top = $('.measure_height_space_top'),
	$h_space_bottom = $('.measure_height_space_bottom'),
	$h = $('#measure_height'),
	
	$w_space_left = $('.measure_width_space_left'),
	$w_space_right = $('.measure_width_space_right'),
	$w = $('#measure_width'); // w = pdf 캡쳐 가로, h = pdf 캡쳐 세로, ratio = pixel과 pdf 단위의 가로비율
	
	
	$('#export_overlay').css({height:100+'%'});

function exportToPDF(){
    var modelCode, activeMode, inactiveMode, pdfTitle;

    //pdfdoc.padding = (parseInt($('#blueprint2').css('padding-top')) > 0) ? parseInt($('#blueprint2').css('padding-top')) * ratio : 0;

    scope = angular.element(document.querySelector('[ng-app=led-configurator]')).scope();

    modelCode = scope.display.name;
    unit = scope.unit;
    shortUnit = (unit == 'meter') ? 'm' : 'ft';
    $pdfSection = $('#blueprint2');

    setNum();

    if($('#scenario').hasClass('ng-hide')){
        activeMode = "blueprint";
        inactiveMode = "scenario";
    }else{
        activeMode = "scenario";
        inactiveMode = "blueprint";
    }

    $('#export_overlay').show();
    
    pdfdoc.h = ($pdfSection.height() + parseInt($pdfSection.css('padding-top'))) * ratio;//($pdfSection.height() - infoHeight / 2) * ratio + (wallBottomPadding * ratio);

    //export_loader();

    setTimeout(function(){
        var isFinish=0;
        var doc = new jsPDF();

        var renderImage = "",
            bluePrintImage = "",
            exceedImage = "",
            model,
            backImg = 'url("/static/images/videowall_configurator/background2.png")',
            url;
        
        setHeader(doc, modelCode);
        switch(scope.upload.current){
            case 'image' :
                url = $('#videoContainer_blueprint').css('background-image');
                if(url != backImg){
                    $('#videoContainer_blueprint').css({'background-image' : backImg});
                    setTimeout(function(){
                        $('#videoContainer_blueprint').css({'background-image' : url});
                    }, 1000);
                }

                break;

            case 'video' :
                $('#videoContainer_blueprint video').css({display : 'none'});
                $('#videoContainer_blueprint').css({'background-image' : backImg});
                break;

            default :
                break;

        }

        setTimeout(function(){
            var resetProp = {};

            switch(activeMode){
				/* active mode :: blueprint */
                case "blueprint":
                    $('#' + activeMode).find('.choose-size-w').css({display:'none'});
                    $('#' + activeMode).find('.choose-size-h').css({display:'none'});
                    $('#' + activeMode).find('.choose-opts').css({display:'none'});

                    $('#led-title').css({visibility:'hidden'});
                    $('.model-name').css({color:'#6a6a6a'});
                    $('.measure-number').css({display:'none'});

                    if(scope.wall.size.width <= num.maxE){
                        resetProp = changeGuyPos(activeMode, scope.wall.size.width);
                    }

                    html2canvas(document.getElementById('blueprint2'), {
                        onrendered: function(canvas) {
                            bluePrintImage = canvas.toDataURL('image/jpeg');
                            doc.addImage(bluePrintImage, 'JPEG', pdfdoc.x, pdfdoc.y, pdfdoc.w, pdfdoc.h);
                            //getCommonTxt(doc, modelCode); // 171025 수정
                            //getNumberTxt(doc); // 171025 수정                            

                            setTimeout(function(){
                                if(scope.wall.size.width <= num.maxE){
                                    $('#' + activeMode).find('.prop').css({left : resetProp.guyL});
                                    if(parseInt($pdfSection.css('width')) != areaWidth)	$pdfSection.css({width : resetProp.pdfW});
                                }
                                setExceedTable(modelCode, doc, pdfdoc.x, activeMode, pdfdoc.h);
                            }, 1200);
                        }
                    });
                    break;

				/* active mode :: scenario */
                case "scenario":
                    $('#' + activeMode).addClass('ng-hide');
                    $('#' + inactiveMode).removeClass('ng-hide');

                    $('#' + inactiveMode).find('.choose-size-w').css({display:'none'});
                    $('#' + inactiveMode).find('.choose-size-h').css({display:'none'});
                    $('#' + inactiveMode).find('.choose-opts').css({display:'none'});

                    $('#led-title').css({visibility:'hidden'});
                    $('.model-name').css({color:'#6a6a6a'});
                    $('.measure-number').css({display:'none'});

                    if(scope.wall.size.width <= num.maxE){
                        resetProp = changeGuyPos(inactiveMode, scope.wall.size.width);
                    }

                    html2canvas(document.getElementById('pdf-section'), {
                        onrendered: function(canvas) {
                            bluePrintImage = canvas.toDataURL('image/jpeg');
                            doc.addImage(bluePrintImage, 'JPEG', pdfdoc.x, pdfdoc.y, pdfdoc.w, pdfdoc.h);
                            getCommonTxt(doc, modelCode); // 171025 수정
                            setHeader(doc, modelCode);
                            
                            setTimeout(function(){
                                if(scope.wall.size.width <= num.maxE){
                                    $('#' + inactiveMode).find('.prop').css({left : resetProp.guyL});
                                    if(parseInt($pdfSection.css('width')) != areaWidth)	$pdfSection.css({width : resetProp.pdfW});
                                }
                                setExceedTable(modelCode, doc, pdfdoc.x, activeMode, pdfdoc.h);
                            }, 1200);
                        }
                    });
                    break;

                default:
                    break;
            }
        }, 400);


    }, 200);
}

function changeGuyPos (_mode, _wallW){
    var $guy = $('#' + _mode).find('.prop'),
        guyProp = {};

    guyProp.width = $guy.width();
    guyProp.left = parseInt($guy.css('left'));
    guyProp.newLeft = guyProp.left + parseInt(guyProp.width / 3);

    $('#' + _mode).find('.prop').css({left : guyProp.newLeft});

    if(_wallW < num.maxS)	$pdfSection.css({'width' : 1030 + 'px'});

    return {
        guyL : guyProp.left,
        pdfW : 1020
    }
}

function setExceedTable(_modelCode, _doc, _x, _aMode, _h){
    var modelCode = _modelCode,
        doc = _doc,
        x = _x,
        aMode = _aMode,
        h = _h;

    doc.addPage();
    getSpecifications(doc, modelCode);
    getSpecificationsData(doc, modelCode);
    
    //doc.save("Samsung_LED_"+modelCode+".pdf");
    //base64 encode
    var binary = btoa(doc.output());
    var apiUrl = "/api/pdf/pdfUpload";
    $.ajax({
    	cache : false,
    	url:apiUrl,
    	data: { pdf: binary, configType: $('#configType').val(), modelName:modelCode, device: $('#device').val() },
    	dataType: "json",
		async : false,
		type: "POST",
		success:function(data){
			if (data!=null) {
				if (data.code=='200') {
					pdfExportApp('https://vd-dsg.s3.amazonaws.com/logs/upload/'+data.filePath+data.fileName);
				}
			}
		},
		error : function(xhr, status, e){
          
		}
    });
    
    $('#export_overlay').fadeOut(); //hide loader
    setTimeout(reMode, 200);

    function reMode(){
        $('#blueprint2').find('.choose-size-w').css({display:'block'});
        $('#blueprint2').find('.choose-size-h').css({display:'block'});
        $('#blueprint2').find('.choose-opts').css({display:'block'});

        $('#led-title').css({visibility:'visible'});
        $('.model-name').css({color:'#ffffff'});
        if($('.measure-number').eq(0).css('display') != 'block')	$('.measure-number').css({display:'block'});

        if(aMode == "scenario"){
            $('#blueprint_btn').trigger('click');
        }

        if($('#videoContainer_blueprint video').css('display') == 'none')	$('#videoContainer_blueprint video').css({display : 'block'});
    }
}

function setNum(){
    switch(unit){
        case 'meter' :
            num.minS = 2;
            num.minE = 2.1;
            num.maxS = 2.2;
            num.maxE = 3;
            break;

        case 'feet' :
            num.minS = 6.56;
            num.minE = 6.88;
            num.maxS = 6.89;
            num.maxE = 9.85;
            break;

        default :
            break;
    }
}

function getCommonTxt(doc, modelCode){
    var s = scope,
        font = 'helvetica',

        modelTagH = $modeltag.height(),
        modelNameH = $modelname.height(),

        title = {startX : 85, startY : 48, colorR : 34, colorG : 34, colorB : 34, weight : 'bold', size : 10},
        stitle = {startX : [20, 86, 145, 20, 86], startY : [54, 59], colorR : 129, colorG : 129, colorB : 129, weight : 'normal', size : 8},
        svalue = {startX : [60, 116, 160, 55, 104], startY : [54, 59], colorR : 71, colorG : 116, colorB : 207},
        model = {startX : 156.5, startY : pdfdoc.y + pdfdoc.padding + (infoHeight * ratio) + ((modelTagH - modelNameH) / 2 * ratio) + (modelNameH * ratio), colorR : 255, colorG : 255, colorB : 255, weight : 'normal', size : 6.5};


    doc.setTextColor(model.colorR, model.colorG, model.colorB);
    doc.setFontSize(model.size);
    doc.text(model.startX, model.startY, modelCode);
}

function getNumberTxt(doc){
    var s = scope,
        font = 'helvetica',
        weight = 'normal',
        size = 6,
        color = {r : 255, g : 255, b : 255},        
        tmpTop, tmpLeft,
        modelTagH, modelNameH, modelY,
        h_space_margin, h_space_top, h, h_space_bottom,
        tmp_space_left, tmp_space_right, w_space_left, w, w_space_right,
        wall_h,        
        width,
        height;
    
    doc.setFont(font);
    doc.setFontType(weight);
    doc.setTextColor(color.r, color.g, color.b);
    doc.setFontSize(size);
    
    tmp_space_left = ($w_space_left.children('div').css('margin-left') == 'auto') ? -1000 : parseInt($w_space_left.children('div').css('margin-left'));    
    tmp_space_right = ($w_space_right.children('div').css('margin-left') == 'auto') ? -1000 : parseInt($w_space_right.children('div').css('margin-left')); 
    
    tmpTop = pdfdoc.y + pdfdoc.padding + (infoHeight * ratio);
    tmpLeft = pdfdoc.x + (((areaWidth - wallWidth) / 2) * ratio);

    modelTagH = $modeltag.height();
    modelNameH = $modelname.height();
    modelY = ((modelTagH - modelNameH) / 2 * ratio) + (modelNameH * ratio);    

    h_space_margin = (parseInt($h_space_top.children('div').css('margin-top')) * ratio);

    $h_space_top = $('.measure_height_space_top'),
    $h_space_bottom = $('.measure_height_space_bottom'),
    $h = $('#measure_height'),
    h = tmpTop + ($h_space_top.height() * ratio),
    
    
    //h_space_top = tmpTop + h_space_margin + modelY;
    //h = tmpTop + ($h_space_top.height() * ratio) + ($h.children('div').position().top * ratio) + modelY 
    //h_space_bottom = tmpTop + ($h_space_top.height() * ratio) + ($h.height() * ratio) + h_space_margin + modelY;
    
    $w_space_left = $('.measure_width_space_left'),
    $w_space_right = $('.measure_width_space_right'),
    $w = $('#measure_width'),

    w_space_left = tmpLeft + parseInt($w_space_left.children('div').css('margin-left')) * ratio + 1.5,
    w = tmpLeft + ($w_space_left.width() + parseInt($w.find('.width_tag').css('margin-left'))) * ratio + 1.5,
    w_space_right = tmpLeft + ($w_space_left.width() + $w.width() + parseInt($w_space_right.children('div').css('margin-left'))) * ratio + 1.5,    

    //w_space_left = ($('#space-dotted').width() < $('#videoContainer_blueprint').width()) ? tmpLeft + tmp_space_left * ratio + 0.5 : tmpLeft + tmp_space_left * ratio + 1.5;
    //w = ($('#space-dotted').width() < $('#videoContainer_blueprint').width()) ? tmpLeft + ($w_space_left.width() + parseInt($w.find('.width_tag').css('margin-left'))) * ratio + (($('#space-dotted').width() - $('#videoContainer_blueprint').width())/2 * ratio) + 1.5 : tmpLeft + ($w_space_left.width() + parseInt($w.find('.width_tag').css('margin-left'))) * ratio + 1.5;
    //w_space_right = ($('#space-dotted').width() < $('#videoContainer_blueprint').width()) ? tmpLeft + ($w.width() - ($('#videoContainer_blueprint').width() - $('#space-dotted').width()) + tmp_space_right) * ratio + 1.5 : tmpLeft + ($w_space_left.width() + $w.width() + tmp_space_right) * ratio + 1.5;

    wall_h = (pdfdoc.h - (wallBottomPadding * ratio)) + 1.5 + modelY;
    
    width = {startX : [w_space_left, w, w_space_right], startY : (pdfdoc.y + wall_h)};
    height = {startX : 182, startY : [h_space_top, h, h_space_bottom]};    
      
    
    doc.text(height.startX, height.startY[0], $h_space_top.find('.measure-number').text());
    doc.text(height.startX, height.startY[1], $h.find('.measure-number').text());
    doc.text(height.startX, height.startY[2], $h_space_bottom.find('.measure-number').text());
    
    doc.text(width.startX[0], width.startY, $w_space_left.find('.measure-number').text());
    doc.text(width.startX[1], width.startY, $w.find('.measure-number').text());
    doc.text(width.startX[2], width.startY, $w_space_right.find('.measure-number').text());

}

function getExceed(doc, modelCode, y){
    var startX = 15,
        startY = 15,
        w = 36,
        h = 12,
        startTY = 15,
        titleH = (2 * h / 3);

    doc.addPage();

	/* colored rect */
    doc.setDrawColor(0);
    doc.setFillColor(224, 224, 224);
    doc.rect(startX, startY, w, h + titleH, 'F');

    doc.setDrawColor(0);
    doc.setFillColor(224, 224, 224);
    doc.rect(startX + w, startY, w * 4, titleH, 'F');

    doc.setDrawColor(0);
    doc.setFillColor(248, 248, 248);
    doc.rect(startX + w, startY + titleH, w * 4, h, 'F');

    doc.setDrawColor(0);
    doc.setFillColor(248, 248, 248);
    doc.rect(startX, startY + h + titleH, w, h * 5, 'F');

	/* line */
    doc.setDrawColor(234, 234, 234);
    doc.setLineWidth(0.1);

    doc.line(startX, startY, startX + w * 5, startY);
    doc.line(startX + w, startY + titleH, startX + w * 5, startY + titleH);
    doc.line(startX, startY + h + titleH, startX + w * 5, startY + h + titleH);

    doc.line(startX, startY + titleH + h * 2, startX + w * 5, startY + titleH + h * 2);
    doc.line(startX, startY + titleH + h * 3, startX + w * 5, startY + titleH + h * 3);
    doc.line(startX, startY + titleH + h * 4, startX + w * 5, startY + titleH + h * 4);
    doc.line(startX, startY + titleH + h * 5, startX + w * 5, startY + titleH + h * 5);
    doc.line(startX, startY + titleH + h * 6, startX + w * 5, startY + titleH + h * 6);

    doc.line(startX + w, startY, startX + w * 1, startY + h * 6 + titleH);
    doc.line(startX + w * 2, startY, startX + w * 2, startY + h * 6 + titleH);
    doc.line(startX + w * 3, startY, startX + w * 3, startY + h * 6 + titleH);
    doc.line(startX + w * 4, startY, startX + w * 4, startY + h * 6 + titleH);

	/* title */
    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setTextColor(102, 102, 102);
    doc.setFontSize(10);

    doc.text(startX + 5, startTY + 11, 'Installed display');

    doc.text(startX + 11, startTY + h + titleH + 7, 'Width (' + shortUnit + ')');
    doc.text(startX + 10, startTY + (h * 2) + titleH + 7, 'Height (' + shortUnit + ')');
    doc.setFontSize(9);
    doc.text(startX + 2, startTY + (h * 3) + titleH + 7, 'No. of Cabinets (WxH)');
    doc.setFontSize(10);
    doc.text(startX + 8, startTY + (h * 4) + titleH + 7, 'Resolution');
    doc.setFontSize(8.5);
    doc.text(startX + 1, startTY + (h * 5) + titleH + 7, 'Required No. of S-Boxes');

    doc.setFontSize(10);
    doc.text(startX + 5 + w + 8, startTY + 5, 'Option 1');
    doc.text(startX + 5 + w + 6, startTY + 13, 'Optimized');
    doc.text(startX + 5 + w + 5, startTY + 18, 'to wall size');

    doc.text(startX + 5 + (w * 2) + 8, startTY + 5, 'Option 2');
    doc.text(startX + 5 + (w * 2) + 3, startTY + 13, 'Height greater');
    doc.text(startX + 5 + (w * 2) + 7, startTY + 18, 'than wall');

    doc.text(startX + 5 + (w * 3) + 8, startTY + 5, 'Option 3');
    doc.text(startX + 5 + (w * 3) + 3, startTY + 13, 'Width greater');
    doc.text(startX + 5 + (w * 3) + 7, startTY + 18, 'than wall');

    doc.text(startX + 5 + (w * 4) + 8, startTY + 5, 'Option 4');
    doc.text(startX + 5 + (w * 4) + 2, startTY + 13, 'Width & Height');
    doc.text(startX + 5 + (w * 4) + 7, startTY + 18, 'than wall');

	/* data */
    doc.text(startX + 3 + w, startTY + h + titleH + 7, $('#optimized-w').text());
    doc.text(startX + 3 + w, startTY + (h * 2) + titleH + 7, $('#optimized-h').text());
    doc.text(startX + 3 + w, startTY + (h * 3) + titleH + 7, $('#optimized-cabinet').text());
    doc.text(startX + 3 + w, startTY + (h * 4) + titleH + 7, $('#optimized-resolution').text());
    doc.text(startX + 3 + w, startTY + (h * 5) + titleH + 7, $('#optimized-sbox').text());

    doc.text(startX + 3 + (w * 2), startTY + h + titleH + 7, $('#height-w').text());
    doc.text(startX + 3 + (w * 2), startTY + (h * 2) + titleH + 7, $('#height-h').text());
    doc.text(startX + 3 + (w * 2), startTY + (h * 3) + titleH + 7, $('#height-cabinet').text());
    doc.text(startX + 3 + (w * 2), startTY + (h * 4) + titleH + 7, $('#height-resolution').text());
    doc.text(startX + 3 + (w * 2), startTY + (h * 5) + titleH + 7, $('#height-sbox').text());

    doc.text(startX + 3 + (w * 3), startTY + h + titleH + 7, $('#width-w').text());
    doc.text(startX + 3 + (w * 3), startTY + (h * 2) + titleH + 7, $('#width-h').text());
    doc.text(startX + 3 + (w * 3), startTY + (h * 3) + titleH + 7, $('#width-cabinet').text());
    doc.text(startX + 3 + (w * 3), startTY + (h * 4) + titleH + 7, $('#width-resolution').text());
    doc.text(startX + 3 + (w * 3), startTY + (h * 5) + titleH + 7, $('#width-sbox').text());

    doc.text(startX + 3 + (w * 4), startTY + h + titleH + 7, $('#over-w').text());
    doc.text(startX + 3 + (w * 4), startTY + (h * 2) + titleH + 7, $('#over-h').text());
    doc.text(startX + 3 + (w * 4), startTY + (h * 3) + titleH + 7, $('#over-cabinet').text());
    doc.text(startX + 3 + (w * 4), startTY + (h * 4) + titleH + 7, $('#over-resolution').text());
    doc.text(startX + 3 + (w * 4), startTY + (h * 5) + titleH + 7, $('#over-sbox').text());
}

function getSpecifications(doc, modelCode){
    var tmp = [],
        x, imgx, tmpTitle, tmpTitleX;

    doc.setDrawColor(0);
    doc.setFillColor(232,240,255);
    doc.rect(15, 30, 80, 100, 'F'); // filled square

    doc.setDrawColor(0);
    doc.setFillColor(243,247,255);
    doc.rect(75, 30, 60, 100, 'F');

    doc.setDrawColor(199,210,238);
    doc.setLineWidth(0.4);

    doc.line(15, 15, 195, 15);
    doc.line(15, 30, 195, 30);
    
    doc.line(75, 40, 195, 40);
    doc.line(15, 50, 195, 50);
    
    doc.line(75, 60, 195, 60);
    doc.line(75, 70, 195, 70);
    doc.line(75, 80, 195, 80);
    doc.line(15, 90, 195, 90);
    
    doc.line(75, 100, 195, 100);
    doc.line(15, 110, 195, 110);
    
    doc.line(75, 120, 195, 120);
    doc.line(15, 130, 195, 130);

    doc.setDrawColor(0);
    doc.setFillColor(67,70,85);
    doc.rect(15, 15, 180, 15, 'F');

    doc.setFont("helvetica");
    doc.setFontType("bold");

	/* Specifications */
    var modelPng = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAAEAlgCWAAD//gAfTEVBRCBUZWNobm9sb2dpZXMgSW5jLiBWMS4wMQD/2wCEAAUFBQgGCA4ICA4OCgoKDg8NDQ0NDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8BBggICwgLDQgIDQ8NCw0PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PD//EAaIAAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKCwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+foRAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/AABEIABkAIgMBEQACEQEDEQH/2gAMAwEAAhEDEQA/APc/+Ep0f/n8tf8AwIi/+Lq7PsI4vRNf02LXtUme5t1jl+x+W5mjCvtgYNsYthtp4bBODweapp2XzEHxC1/TbvQbiG3ubeWRvK2pHNGzHE8ZOFViTgAk4HABPSiKdwZ2n/CU6P8A8/lr/wCBEX/xdTZ9hh/wlOj/APP5a/8AgRF/8XRZ9gD/AIRbR/8Anztf/AeL/wCIou+4HF6JoGmya9qkL21u0cP2Py0MMZVN0DFtilcLuPLYAyeTzVNuy+Yg+IWgabaaDcTW9tbwyL5W144Y0YZnjBwyqCMgkHB5BI6GiLdwZ2n/AAi2j/8APna/+A8X/wARU3fcYf8ACLaP/wA+dr/4Dxf/ABFF33Awf+FZ+Hf+fb/yNcf/AB2nzMVjk9H8DaLca1qNpJBuhtfsnkr5kw2+bCzPyJAzbmGfmJx0GBVNuyCweOfA2i6Vos93aQeXNH5e1vMmbG6aNTw0jKcqxHIPXI5oi3ewWOs/4Vn4d/59v/I1x/8AHanmYWD/AIVn4d/59v8AyNcf/HaOZhY7upGcJoH/ACMWr/8Abj/6TtVPZfMQfEv/AJF25/7Y/wDpRFRHcGd3UjCgD//Z';


    //doc.setTextColor(255,255,255);
    doc.setFontSize(15);
    doc.setTextColor(255,255,255);
    doc.text(25, 25, 'Specifications');

    tmp = modelCode.split('-');
    if(tmp.length > 1){
        x = 120;
    }else{
        x = 170;
    }

    imgx = x - 10;
    doc.text(x, 25, modelCode);
    doc.addImage(modelPng, 'JPEG', imgx, 21, 7, 4);

    doc.setFontType("normal");
    doc.setTextColor(71,116,207);
    doc.setFontSize(10);

    doc.text(22, 42, 'DISPLAY REQUIREMENTS');
    doc.text(89, 36, 'Total No. of Cabinets');
    doc.text(84, 46, 'Screen Configuration (WxH)');
    
    doc.text(21, 71, 'DISPLAY WALL DIMENSIONS');
    doc.text(96, 56, 'Dimensions');
    doc.text(95, 66, 'Display Area');
    doc.text(98, 76, 'Diagonal');
    doc.text(100, 86, 'Weight');

    doc.text(26, 101, 'OPTICAL PARAMETER');
    doc.text(98, 96, 'Resolution');    
    tmpTitle = (angular.element(document.getElementById('spec_container')).scope().display.spec.SERIES_NAME == 'XAF Series') ? 'Minimum No. of Sending Boxes' : 'Minimum No. of S-Boxes';
    tmpTitleX = (angular.element(document.getElementById('spec_container')).scope().display.spec.SERIES_NAME == 'XAF Series') ? 80 : 85;
    doc.text(tmpTitleX, 106, tmpTitle);

    doc.text(24, 121, 'POWER REQUIREMENTS');
    doc.text(102, 116, 'Max');
    doc.text(100, 126, 'Typical');
}

function getSpecificationsData(doc, modelCode){
	var //max = isEmpty($('#spec_max').text()).replace(/²/gi, "2"),
	//typical = isEmpty($('#spec_typical').text()).replace(/²/gi, "2"),
	darea = isEmpty($('#spec_darea').text()).replace(/²/gi, "2"); /* 171025 추가 */	
	
//    var modelInfo = angular.element(document.getElementById('spec_container')).scope().display.spec,
//        refreshRate = isEmpty(modelInfo.REFRESH_RATE).replace('≧', '>='),
//        pixelPitch = isEmpty(modelInfo.PIXEL_PITCH).replace('”', '"');

    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setTextColor(119,119,119);
    doc.setFontSize(10);

    doc.text(141, 36, $('#spec_cabinet').text());
    doc.text(141, 46, $('#spec_config').text());

    doc.text(141, 56, $('#spec_dimension').text());
    doc.text(141, 66, darea);
    doc.text(141, 76, $('#spec_diagonal').text());
    doc.text(141, 86, $('#spec_weight').text());

    doc.text(141, 96, $('#spec_resolution').text());
    doc.text(141, 106, $('#spec_sbox').text());

    doc.text(141, 116, $('#spec_max').text());
    doc.text(141, 126, $('#spec_typical').text());
    
    doc.setFont("helvetica", "italic");
    doc.setTextColor(71,116,207);
	doc.text(112, 135, '* Specifications are subject to change without notice.');
}

function isEmpty(str) {
    return (!str.trim() || typeof str == 'undefined' || str === null) ? '' : str;
}

function setHeader(doc, modelCode){
	
	var pdfTitle, logo = "data:image/jpeg;base64,/9j/4RmERXhpZgAASUkqAAgAAAAMAAABAwABAAAA/gAAAAEBAwABAAAAawAAAAIBAwADAAAAngAAAAYBAwABAAAAAgAAABIBAwABAAAAAQAAABUBAwABAAAAAwAAABoBBQABAAAApAAAABsBBQABAAAArAAAACgBAwABAAAAAgAAADEBAgAeAAAAtAAAADIBAgAUAAAA0gAAAGmHBAABAAAA6AAAACABAAAIAAgACACA/AoAECcAAID8CgAQJwAAQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAxNzowMjoyMSAxNjoyNzoyNQAAAAQAAJAHAAQAAAAwMjIxAaADAAEAAAD//wAAAqAEAAEAAAD+AAAAA6AEAAEAAAAqAAAAAAAAAAAABgADAQMAAQAAAAYAAAAaAQUAAQAAAG4BAAAbAQUAAQAAAHYBAAAoAQMAAQAAAAIAAAABAgQAAQAAAH4BAAACAgQAAQAAAP4XAAAAAAAASAAAAAEAAABIAAAAAQAAAP/Y/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///+0ADEFkb2JlX0NNAAL/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAaAKADASIAAhEBAxEB/90ABAAK/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9ic3R1dnd4eXp7fH/9oADAMBAAIRAxEAPwDo/q19WOmO6Y3qnU2+sbGmxrHT6bKxw4sb/OPc0b/crmD0/wCqf1hxLH4eIKQx2wvYz0XtJG5r27Pa72n89UPqr9bMXHxmdM6k4VCv20ZB+htJ/m7v9Hs/Ns/m/T/6d7qX1SrtrdkdDyXYT7P0no1vcKHzqHN9M/oufbs/Rf8ABrQymYyzGWc8ZMv1Ux/NcLnYRjOGBw44ZYiP63Hp7vF/hPD5uM7Dy78V53HHsdWXRE7TG+P5S7bE+rH1fq6Ri5OdjF91jKRa7fYPfcWM+ix7W/zlq4v7Lk29QGHeHDJsuFNgeZdvc703bna7l3v11yzh9FaWaF19IEf8G77T/wCiFY5qUzLBjjMgzPqlA8LV5KGMDmMs4Axh8sZjj4f8Zwfrl0LA6WzEtwKTUyxz2W+5zpMNdX/OOf4WKt9T+lYPU86+rNq9WuuoOa3c5sOLg2f0bmfmrpvrxQL+gOubr6FldoPkT6P/AFNyxv8AF6P17Md4VMH3ud/co4Zpnkpy4jxxuPFfq+b97/CX5MEB8QhHhjwTHFw0OD5f3f8ABb3Wfqz0SvpOddg4/p5OI0ndvsdBaGXP9r3ub/MuVD6rdE6Tl9Kyc/qVXqiqxzWnc9sNY1jnfzbmfnPXQY5GV1Hr/TXH2u9I/K7HZU7/AM9LIxf1T6iUAnbZlWMHx9S8f+iFHHJk9vg45cUp4vVxHiEcsOP5maWHF7vuDHDhjDL6eGPDKWKfB8qL64dA6T0zptV+FR6Vrr21udve72lljtsWPf8AnMVb6ofVvF6o23MzZfRU/wBNlIJbucAHudY5vu2t3s+itr/GAP8AI1J8Mln/AFFqwvqn9ZaekGzEzAfstzvUFjRJY+Axxewe59bmtb9BSY5Zp8mTCUpZLOt3Ph/qsOWOCHPATjGOPhGlVDi/rO7i4X1O6nlZPTaMRvrYsh5DXMnafTe6u5pDnbLPauP6/wBMHSepXYbHl9bQH1PdG4tcJG6Pzm/QXa5v1e6d1Vruo9JyTi5F4JOTjOOyzXX1mVubu+j+Zsfv/nFwnVsbPxMy3H6g5z8isAF7nF+5v+Deyx/udXt+incnIGZrJI6erFk1nGX7yPiEaxxvFH5vTmx/JwfuSet+sf1b6Lg9Dvy8XH9O9np7X73ujc+tjva97m/Rcm+q/wBXOjdQ6NTlZeP6lz3WBz972yGvc1vtY9rfohan1w/8TOV8Kv8Az7Um+pP/AInaP69v/nx6r+9k+6GXHLi93h4uI8XDwbW2vYxffOH24cPs8XDwx4eL3Pmp4foGJj5nWsbFyWb6LXuD2SRIDXuHuYWu+k1dpk/U7oD6bqsbH9PJ9Mmt3qWHa4hwrftdZt+m1cj9Vf8AxR4X/GP/AOosXbZuWMX6zdPY76OZRdSfDc013V/9/Z/1xTc5PIM0RCco1j46B09HFJr8hjxHBIzhGV5OC5AX6+GO/wDhPNfUzovTeqVZZz6PVfS5gb7ntiQ7c39G5n5zVjdRw2t61kYOI3aPtBpoYSTEu2Mbudud3Xc9BxPsfW+t0gQx9lN7Owi0WPMf1bN7FyV//iz/APaiz/z6xPxZpSzZTZMeCM4xJ9IuMZbLM+CEcGGPCBL3DjlICpSqco/M9JZ0P6r9AwW3dRr+0EkMNtjS8ueQXQylssZ9FyB1n6sdHyuku6n0kCktqN7NkhljAPU2mt382/Z9D6Hv/nFa+vFTLsLBpe8VMtza2OtPDA5tjXWGdv0PpKnZ9XM6npVlmP1223ErpeWVsb+jcxrXfo2ltrm7HfRVfHM8MMks0ozlI6S4pQlH92otnLCNzxRwRljjAVw8MZxl+96n/9DsPq5h9E6l0OnbjY7shlfo3vNTHPbYBt3v03e/+cR/qp0TqPRse+nNvZZW5wNNbC4tbG71H+9rNvq/uLiOg/8AKH/az6B/5P8A53n/AAn/AAK2Ov8A/J9n/LPA/pP8xz/2o/kq9lBrN6pe1xDi44ji+b/J8U2hhIvD6Ye9wGuCR4fl/wApwwY4hp6p9ezdT76G2mwPbqCKa9jbP6rrmMV7/GLcfRwcfs91lh/shrG/+flx+P8AT/wn0T/MfS/84Usjlv8APcH+f55/MViofeOX1Ne2OAV/Vl80uL5mqTk+7czpHi9w+4Qdfmj8seH5X0RrD1L6oNYBvfdhAAczYGaf+CtWH/i6E35z+2yoT8Tb/cubp/m2/wBL4P8ANfQ/sIeN+d/PcD+j/wDf/wDvqiiIexzFSlwcQ/R29XT1+pmkZ/eeWuMePgP6R/d/S9Hpe2wsj0/r71CknS+lgA8XMrpe3/oeoh/XM14uL0vp9LdrDkB7R5VQ3/qr1xv/AGq/w/8A6O+j/r/1tLI5Z/P/APXuef8ABpRGP3sOsvkh+j6eL2/RxepUjl9jN6Y/zk/0vVw+56+H0Pd/X0T0Np/dvrP4Pb/FUPqPV0jLw78bJoouy67C+LGNc41uDA1zS9v0W2bv6n9tctkfzZ/pXI/nvof+doeH/TKP576Y/o38/wD+g/8AwiMBH7maM/m0MY+q/wC7xf8AdIyGX34cUYfJ6hKXo4f73B83+C9/0X6vZvTOtZmWLq24OQXmvHrkfSdvr317W1s9Fm6tuxcz9ecqjK60W0OD/s9LabCNRvDrLHMn+R6nu/lq/n/0Kz/xQfRP859Dj/Df8H++uRb9EcfLhO5cf0n9YScnBppECv63q+ZZzR/ov6sAY+PX1SJu/wBH0/K+nZtTPrD9XXV4VrR9pYxzHO1Ac1zbPTs2/R9zPTf+4n6Vjt+r3QQzOtZGOH2Wvb9H3Oc/YzdDnfS2M/0i4f6vfz13/KPA/wCTP/dj/vqf6xfTp/5S5P8Aylx/6D/ylWqPtn1S+7+5+7Hj4+H+/wDutu5e78sfvPtfvS4ODi/ufvsfqpJ+sWCY1L3mP+t2Lf8Ar7dZjZnSsqv+cpdZYz4sdQ9cWOe/y5SPb6X9r+CvZRD73jsm+A6V6eH17y4v+4c/Ccn3LIIgfzg14vVxcWPaHD/3b67jii4jPpM/aaq4Piwb7av/AD+9eb9SvGL9ab8lwJbRmi0gckMe15/6lZQ4H0/lx8kjz3+fPzUHJDHx5KlI+jXijw+j/Gkz8+cvBiuMAfc04ZcXr/xIPpXX+mj6xdKpGDeyN7bq7DJY4Q+stlvub9NRzvs/Qvqs7EvtDnNx3UV9i+xzS2GM/rO/7bXFdC+nb/yjz/3m/wDo1Vuqf0539K4/7Xfz/wA/5KiiBw47lL2Pc9PphxcXj62eZlxZKjD3/b9fqnw8Hh6H/9n/7SEOUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAA8cAVoAAxslRxwCAAACORgAOEJJTQQlAAAAAAAQN3rDBhYcganr9GOCvUyExThCSU0EOgAAAAAA5QAAABAAAAABAAAAAAALcHJpbnRPdXRwdXQAAAAFAAAAAFBzdFNib29sAQAAAABJbnRlZW51bQAAAABJbnRlAAAAAENscm0AAAAPcHJpbnRTaXh0ZWVuQml0Ym9vbAAAAAALcHJpbnRlck5hbWVURVhUAAAAAQAAAAAAD3ByaW50UHJvb2ZTZXR1cE9iamMAAAAMAFAAcgBvAG8AZgAgAFMAZQB0AHUAcAAAAAAACnByb29mU2V0dXAAAAABAAAAAEJsdG5lbnVtAAAADGJ1aWx0aW5Qcm9vZgAAAAlwcm9vZkNNWUsAOEJJTQQ7AAAAAAItAAAAEAAAAAEAAAAAABJwcmludE91dHB1dE9wdGlvbnMAAAAXAAAAAENwdG5ib29sAAAAAABDbGJyYm9vbAAAAAAAUmdzTWJvb2wAAAAAAENybkNib29sAAAAAABDbnRDYm9vbAAAAAAATGJsc2Jvb2wAAAAAAE5ndHZib29sAAAAAABFbWxEYm9vbAAAAAAASW50cmJvb2wAAAAAAEJja2dPYmpjAAAAAQAAAAAAAFJHQkMAAAADAAAAAFJkICBkb3ViQG/gAAAAAAAAAAAAR3JuIGRvdWJAb+AAAAAAAAAAAABCbCAgZG91YkBv4AAAAAAAAAAAAEJyZFRVbnRGI1JsdAAAAAAAAAAAAAAAAEJsZCBVbnRGI1JsdAAAAAAAAAAAAAAAAFJzbHRVbnRGI1B4bEBSAAAAAAAAAAAACnZlY3RvckRhdGFib29sAQAAAABQZ1BzZW51bQAAAABQZ1BzAAAAAFBnUEMAAAAATGVmdFVudEYjUmx0AAAAAAAAAAAAAAAAVG9wIFVudEYjUmx0AAAAAAAAAAAAAAAAU2NsIFVudEYjUHJjQFkAAAAAAAAAAAAQY3JvcFdoZW5QcmludGluZ2Jvb2wAAAAADmNyb3BSZWN0Qm90dG9tbG9uZwAAAAAAAAAMY3JvcFJlY3RMZWZ0bG9uZwAAAAAAAAANY3JvcFJlY3RSaWdodGxvbmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAEgAAAABAAIASAAAAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADPQAAAAYAAAAAAAAAAAAAACoAAAD+AAAABABsAG8AZwBvAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAD+AAAAKgAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAKgAAAABSZ2h0bG9uZwAAAP4AAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAAABm9yaWdpbmVudW0AAAAMRVNsaWNlT3JpZ2luAAAADWF1dG9HZW5lcmF0ZWQAAAAAVHlwZWVudW0AAAAKRVNsaWNlVHlwZQAAAABJbWcgAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAACoAAAAAUmdodGxvbmcAAAD+AAAAA3VybFRFWFQAAAABAAAAAAAAbnVsbFRFWFQAAAABAAAAAAAATXNnZVRFWFQAAAABAAAAAAAGYWx0VGFnVEVYVAAAAAEAAAAAAA5jZWxsVGV4dElzSFRNTGJvb2wBAAAACGNlbGxUZXh0VEVYVAAAAAEAAAAAAAlob3J6QWxpZ25lbnVtAAAAD0VTbGljZUhvcnpBbGlnbgAAAAdkZWZhdWx0AAAACXZlcnRBbGlnbmVudW0AAAAPRVNsaWNlVmVydEFsaWduAAAAB2RlZmF1bHQAAAALYmdDb2xvclR5cGVlbnVtAAAAEUVTbGljZUJHQ29sb3JUeXBlAAAAAE5vbmUAAAAJdG9wT3V0c2V0bG9uZwAAAAAAAAAKbGVmdE91dHNldGxvbmcAAAAAAAAADGJvdHRvbU91dHNldGxvbmcAAAAAAAAAC3JpZ2h0T3V0c2V0bG9uZwAAAAAAOEJJTQQoAAAAAAAMAAAAAj/wAAAAAAAAOEJJTQQRAAAAAAABAQA4QklNBBQAAAAAAAQAAAACOEJJTQQMAAAAABgaAAAAAQAAAKAAAAAaAAAB4AAAMMAAABf+ABgAAf/Y/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///+0ADEFkb2JlX0NNAAL/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAaAKADASIAAhEBAxEB/90ABAAK/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9ic3R1dnd4eXp7fH/9oADAMBAAIRAxEAPwDo/q19WOmO6Y3qnU2+sbGmxrHT6bKxw4sb/OPc0b/crmD0/wCqf1hxLH4eIKQx2wvYz0XtJG5r27Pa72n89UPqr9bMXHxmdM6k4VCv20ZB+htJ/m7v9Hs/Ns/m/T/6d7qX1SrtrdkdDyXYT7P0no1vcKHzqHN9M/oufbs/Rf8ABrQymYyzGWc8ZMv1Ux/NcLnYRjOGBw44ZYiP63Hp7vF/hPD5uM7Dy78V53HHsdWXRE7TG+P5S7bE+rH1fq6Ri5OdjF91jKRa7fYPfcWM+ix7W/zlq4v7Lk29QGHeHDJsuFNgeZdvc703bna7l3v11yzh9FaWaF19IEf8G77T/wCiFY5qUzLBjjMgzPqlA8LV5KGMDmMs4Axh8sZjj4f8Zwfrl0LA6WzEtwKTUyxz2W+5zpMNdX/OOf4WKt9T+lYPU86+rNq9WuuoOa3c5sOLg2f0bmfmrpvrxQL+gOubr6FldoPkT6P/AFNyxv8AF6P17Md4VMH3ud/co4Zpnkpy4jxxuPFfq+b97/CX5MEB8QhHhjwTHFw0OD5f3f8ABb3Wfqz0SvpOddg4/p5OI0ndvsdBaGXP9r3ub/MuVD6rdE6Tl9Kyc/qVXqiqxzWnc9sNY1jnfzbmfnPXQY5GV1Hr/TXH2u9I/K7HZU7/AM9LIxf1T6iUAnbZlWMHx9S8f+iFHHJk9vg45cUp4vVxHiEcsOP5maWHF7vuDHDhjDL6eGPDKWKfB8qL64dA6T0zptV+FR6Vrr21udve72lljtsWPf8AnMVb6ofVvF6o23MzZfRU/wBNlIJbucAHudY5vu2t3s+itr/GAP8AI1J8Mln/AFFqwvqn9ZaekGzEzAfstzvUFjRJY+Axxewe59bmtb9BSY5Zp8mTCUpZLOt3Ph/qsOWOCHPATjGOPhGlVDi/rO7i4X1O6nlZPTaMRvrYsh5DXMnafTe6u5pDnbLPauP6/wBMHSepXYbHl9bQH1PdG4tcJG6Pzm/QXa5v1e6d1Vruo9JyTi5F4JOTjOOyzXX1mVubu+j+Zsfv/nFwnVsbPxMy3H6g5z8isAF7nF+5v+Deyx/udXt+incnIGZrJI6erFk1nGX7yPiEaxxvFH5vTmx/JwfuSet+sf1b6Lg9Dvy8XH9O9np7X73ujc+tjva97m/Rcm+q/wBXOjdQ6NTlZeP6lz3WBz972yGvc1vtY9rfohan1w/8TOV8Kv8Az7Um+pP/AInaP69v/nx6r+9k+6GXHLi93h4uI8XDwbW2vYxffOH24cPs8XDwx4eL3Pmp4foGJj5nWsbFyWb6LXuD2SRIDXuHuYWu+k1dpk/U7oD6bqsbH9PJ9Mmt3qWHa4hwrftdZt+m1cj9Vf8AxR4X/GP/AOosXbZuWMX6zdPY76OZRdSfDc013V/9/Z/1xTc5PIM0RCco1j46B09HFJr8hjxHBIzhGV5OC5AX6+GO/wDhPNfUzovTeqVZZz6PVfS5gb7ntiQ7c39G5n5zVjdRw2t61kYOI3aPtBpoYSTEu2Mbudud3Xc9BxPsfW+t0gQx9lN7Owi0WPMf1bN7FyV//iz/APaiz/z6xPxZpSzZTZMeCM4xJ9IuMZbLM+CEcGGPCBL3DjlICpSqco/M9JZ0P6r9AwW3dRr+0EkMNtjS8ueQXQylssZ9FyB1n6sdHyuku6n0kCktqN7NkhljAPU2mt382/Z9D6Hv/nFa+vFTLsLBpe8VMtza2OtPDA5tjXWGdv0PpKnZ9XM6npVlmP1223ErpeWVsb+jcxrXfo2ltrm7HfRVfHM8MMks0ozlI6S4pQlH92otnLCNzxRwRljjAVw8MZxl+96n/9DsPq5h9E6l0OnbjY7shlfo3vNTHPbYBt3v03e/+cR/qp0TqPRse+nNvZZW5wNNbC4tbG71H+9rNvq/uLiOg/8AKH/az6B/5P8A53n/AAn/AAK2Ov8A/J9n/LPA/pP8xz/2o/kq9lBrN6pe1xDi44ji+b/J8U2hhIvD6Ye9wGuCR4fl/wApwwY4hp6p9ezdT76G2mwPbqCKa9jbP6rrmMV7/GLcfRwcfs91lh/shrG/+flx+P8AT/wn0T/MfS/84Usjlv8APcH+f55/MViofeOX1Ne2OAV/Vl80uL5mqTk+7czpHi9w+4Qdfmj8seH5X0RrD1L6oNYBvfdhAAczYGaf+CtWH/i6E35z+2yoT8Tb/cubp/m2/wBL4P8ANfQ/sIeN+d/PcD+j/wDf/wDvqiiIexzFSlwcQ/R29XT1+pmkZ/eeWuMePgP6R/d/S9Hpe2wsj0/r71CknS+lgA8XMrpe3/oeoh/XM14uL0vp9LdrDkB7R5VQ3/qr1xv/AGq/w/8A6O+j/r/1tLI5Z/P/APXuef8ABpRGP3sOsvkh+j6eL2/RxepUjl9jN6Y/zk/0vVw+56+H0Pd/X0T0Np/dvrP4Pb/FUPqPV0jLw78bJoouy67C+LGNc41uDA1zS9v0W2bv6n9tctkfzZ/pXI/nvof+doeH/TKP576Y/o38/wD+g/8AwiMBH7maM/m0MY+q/wC7xf8AdIyGX34cUYfJ6hKXo4f73B83+C9/0X6vZvTOtZmWLq24OQXmvHrkfSdvr317W1s9Fm6tuxcz9ecqjK60W0OD/s9LabCNRvDrLHMn+R6nu/lq/n/0Kz/xQfRP859Dj/Df8H++uRb9EcfLhO5cf0n9YScnBppECv63q+ZZzR/ov6sAY+PX1SJu/wBH0/K+nZtTPrD9XXV4VrR9pYxzHO1Ac1zbPTs2/R9zPTf+4n6Vjt+r3QQzOtZGOH2Wvb9H3Oc/YzdDnfS2M/0i4f6vfz13/KPA/wCTP/dj/vqf6xfTp/5S5P8Aylx/6D/ylWqPtn1S+7+5+7Hj4+H+/wDutu5e78sfvPtfvS4ODi/ufvsfqpJ+sWCY1L3mP+t2Lf8Ar7dZjZnSsqv+cpdZYz4sdQ9cWOe/y5SPb6X9r+CvZRD73jsm+A6V6eH17y4v+4c/Ccn3LIIgfzg14vVxcWPaHD/3b67jii4jPpM/aaq4Piwb7av/AD+9eb9SvGL9ab8lwJbRmi0gckMe15/6lZQ4H0/lx8kjz3+fPzUHJDHx5KlI+jXijw+j/Gkz8+cvBiuMAfc04ZcXr/xIPpXX+mj6xdKpGDeyN7bq7DJY4Q+stlvub9NRzvs/Qvqs7EvtDnNx3UV9i+xzS2GM/rO/7bXFdC+nb/yjz/3m/wDo1Vuqf0539K4/7Xfz/wA/5KiiBw47lL2Pc9PphxcXj62eZlxZKjD3/b9fqnw8Hh6H/9k4QklNBCEAAAAAAFUAAAABAQAAAA8AQQBkAG8AYgBlACAAUABoAG8AdABvAHMAaABvAHAAAAATAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwACAAQwBTADYAAAABADhCSU0EBgAAAAAABwAIAAAAAQEA/+ENw2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgTWFjaW50b3NoIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0wMi0yMVQxNjoyNjo1MiswOTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTctMDItMjFUMTY6Mjc6MjUrMDk6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTctMDItMjFUMTY6Mjc6MjUrMDk6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODVEQzZFMzEwN0Y4RTYxMUE4RERFM0NGQzY1NjQzODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REVERjdFN0VFNDM0MTFFNjk0MDQ4OEU0NTYzRTdCNTgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpERURGN0U3RUU0MzQxMUU2OTQwNDg4RTQ1NjNFN0I1OCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REVERjdFN0JFNDM0MTFFNjk0MDQ4OEU0NTYzRTdCNTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REVERjdFN0NFNDM0MTFFNjk0MDQ4OEU0NTYzRTdCNTgiLz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODVEQzZFMzEwN0Y4RTYxMUE4RERFM0NGQzY1NjQzODEiIHN0RXZ0OndoZW49IjIwMTctMDItMjFUMTY6Mjc6MjUrMDk6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAKgD+AwERAAIRAQMRAf/dAAQAIP/EAaIAAAAGAgMBAAAAAAAAAAAAAAcIBgUECQMKAgEACwEAAAYDAQEBAAAAAAAAAAAABgUEAwcCCAEJAAoLEAACAQMEAQMDAgMDAwIGCXUBAgMEEQUSBiEHEyIACDEUQTIjFQlRQhZhJDMXUnGBGGKRJUOhsfAmNHIKGcHRNSfhUzaC8ZKiRFRzRUY3R2MoVVZXGrLC0uLyZIN0k4Rlo7PD0+MpOGbzdSo5OkhJSlhZWmdoaWp2d3h5eoWGh4iJipSVlpeYmZqk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";

    doc.setDrawColor(0);
    doc.setFillColor(0, 136, 208);
    doc.rect(0, 0, 210, 30, 'F');

    setTimeout(function(){
        $('#insert_title').css({display:'block'});
        html2canvas(document.getElementById('insert_title'), {
            onrendered: function(canvas) {
                var ratio = 180 / 1200;

                pdfTitle = canvas.toDataURL('image/jpeg');
                doc.addImage(pdfTitle, 'JPEG', -1.7, -2, 212, ($("#insert_title").outerHeight(true)) * ratio);
                $('#insert_title').text('');
                $('#insert_title').css({display:'none'});
            }
        });

        setTimeout(function(){
            doc.rect(0, 15, 210, 10, 'F');

            doc.addImage(logo, 'JPEG', 160, 17, 45, 7);

            doc.setFont("helvetica");
            doc.setFontType("bold");
            doc.setTextColor(255);
            doc.setFontSize(23);

            doc.setFontType("normal");
            doc.setFontSize(18);
            doc.text(15, 22, angular.element(document.getElementById('spec_container')).scope().display.spec.CATEGORY + " Model " + modelCode);
        }, 100);
    }, 100);
}