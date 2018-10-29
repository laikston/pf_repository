/**
 * SamSung Display Solutions
 * @author rui13th@pulipinc.com
 */
var drawLayout,
	drawContents,
	util,
	initDoc,
	
	$body = $('body'),
	
	ARR_MODEL = ['IF015H', 'IF020H', 'IF025H', 'IF025H-D', 'IF040H-D', 'IF060H-D', 'IF012J'],	
	ARR_MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	ARR_MODEL_LINE = {
		'IF015H': 'IFH',
		'IF020H': 'IFH',
		'IF025H': 'IFH',
		'IF025H-D': 'IFD',
		'IF040H-D': 'IFD',
		'IF060H-D': 'IFD',
		'IF012J': 'IFJ'	
	},
	ARR_FRAME_TYPE = {
		'IFH': {width: [10, 8, 6], height: [5, 4, 3]},
		'IFD': {width: [8, 8, 8], height: [3, 2, 1]},
		'IFJ': {width: [3, 3], height: [3, 2]}
	},
	ARR_POWER_FLOW_MAXIMUM_SETS = {
		'IF015H': {'110v': 3, '220v': 4},
		'IF020H': {'110v': 3, '220v': 4},
		'IF025H': {'110v': 4, '220v': 8},
		'IF025H-D': {'110v': 3, '220v': 3},
		'IF040H-D': {'110v': 3, '220v': 3},
		'IF060H-D': {'110v': 3, '220v': 3},
		'IF012J': {'110v': 2, '220v': 4}
	},
	ARR_DATA_CABLE_FHD = {
		'IF015H': {'col': 6, 'row': 3},
		'IF020H': {'col': 8, 'row': 4},
		'IF025H': {'col': 10, 'row': 5},
		'IF025H-D': {'col': 10, 'row': 3},
		'IF040H-D': {'col': 16, 'row': 6},
		'IF060H-D': {'col': 24, 'row': 9},
		'IF012J': {'col': 3, 'row': 3}
	},
	ARR_VENTILATION_DATA = {
		'IF015H': {'v_inclination': 1.70, 'v_intercept': 52.9, 'h_inclination': 0.166666667, 'tcon_inclination': 1.054122651, 'tcon_intercept': 11.35599191, 'tcon_spec': 68.5, 'power_consumption': 120},
		'IF020H': {'v_inclination': 1.10, 'v_intercept': 49.1, 'h_inclination': 0.166666667, 'tcon_inclination': 1.054122651, 'tcon_intercept': 11.35599191, 'tcon_spec': 68.5, 'power_consumption': 120},
		'IF025H': {'v_inclination': 1.10, 'v_intercept': 49.1, 'h_inclination': 0.166666667, 'tcon_inclination': 1.054122651, 'tcon_intercept': 11.35599191, 'tcon_spec': 68.5, 'power_consumption': 130},
		'IF025H-D': {'v_inclination': 1.30, 'v_intercept': 49.1, 'h_inclination': 0.166666667, 'tcon_inclination': 0.479129319, 'tcon_intercept': 36.3468695, 'tcon_spec': 61.5, 'power_consumption': 130},
		'IF040H-D': {'v_inclination': 1.30, 'v_intercept': 49.1, 'h_inclination': 0.166666667, 'tcon_inclination': 0.479129319, 'tcon_intercept': 36.3468695, 'tcon_spec': 61.5, 'power_consumption': 130},
		'IF060H-D': {'v_inclination': 1.50, 'v_intercept': 51.5, 'h_inclination': 0.166666667, 'tcon_inclination': 0.479129319, 'tcon_intercept': 36.3468695, 'tcon_spec': 61.5, 'power_consumption': 140},
		'IF012J': {'v_inclination': 1.80, 'v_intercept': 55.9666666666667, 'h_inclination': 0.2, 'tcon_inclination': 0.718327856882074, 'tcon_intercept': 30.0772544724352, 'tcon_spec': 61.5, 'power_consumption': 195}
	},
	ARR_VENTILATION = {
		'temperature': ['15', '20', '25', '30'],
		'led_spec': 68,
		'outlet_temperature': 40,
		'overall_emissivity': 0.4,
		'margin': 0.1
	},
	scope,
	doc = {
		option: {orientation: 'p', unit: 'mm', format: 'a4'},
		size: {width: 210, height: 294},
		content: {width: 0, height: 0},
		space:{x: 15.2, y: 14},
		title: '',
		page: {
			title: [],
			drawContent: [],
			hasProductInfo: true,
			total: 0,
			load: 0, 
			mechanicalCount: 0
		}
	},
	model = {
		useFrameKit: []
	},
	modelLineFrame,
	header = {
		startX: doc.space.x,
		startY: doc.space.y,
		height: 15.5,
		logo: {
			imgUrl: '/static/images/support/pdf_logo.jpg',
			width: 90.3,
			image: ''
		}
	}, 
	title = {
		fontColor: {r: 0, g: 0, b: 0},
		fontSize: 10,
		fontPosY: 5.2 + 2.7, // font 기준점은 left bottom
		topLineColor: {r: 0, g: 0, b: 0},
		topLineWidth: 0.5,
		bottomLineColor: {r: 0, g: 0, b: 0},
		bottomLineWidth: 0.1,
		startX: header.startX,
		startY: header.startY + header.height,
		width: doc.content.width,
		height: 12.5,
		exceptSpace: 15
	},
	footer = {
		fontColor: {r: 0, g: 0, b: 0},
		fontSize: 9,
		startX: doc.space.x, 
		startY: doc.size.height, // doc.size.height - 15.2
		height: 15.2,
		lineColor: {r: 0, g: 0, b: 0},
		numPosY: doc.size.height + 5, // doc.size.height - 15.2 + 5
		sitename: 'www.samsung.com/displaysolutions',
		sitenamePosX: doc.space.x + 128
	},
	content = {
		verticalMargin: 8.3,
		startX: doc.space.x,
		startY: title.startY + title.height, // title.startY + title.height + 8.3, 
		width: doc.content.width,
		height: doc.size.height - (header.height + title.height) - (footer.height) // doc.size.height - (header.height + title.height + 8.3) - (footer.height + 8.3)
	},
	imageCanvasProp = {
		id: '#pdf-image-section',
		txtId : '#pdf-image-section-txt'
	};
drawLayout = (function(){
	function drawHeader(_pageNum, _isMultiplePage){
		var tmp = {width: header.logo.width},
			pos = {x: header.startX, y: header.startY};
		
		if(header.logo.image == ''){
			util.getBase64Image(header.logo.imgUrl, drawLogo);
		}else{			
			doc.pdf.addImage(header.logo.image, 'JPEG', header.startX, header.startY, header.logo.width, header.logo.height);			
			if(!_isMultiplePage)	drawTitle(_pageNum);
		}
		
		function drawLogo(_dataUrl, _ratio){
			header.logo.image = tmp.image = _dataUrl;
			tmp.ratio = _ratio;
			header.logo.height = tmp.height = tmp.width * tmp.ratio;
			doc.pdf.text(footer.sitename, pos.x, pos.y + 5);
			doc.pdf.addImage(tmp.image, 'JPEG', pos.x, pos.y, tmp.width, tmp.height);	
			
			
			if(!_isMultiplePage)	drawTitle(_pageNum);
		}		
	}
	function drawTitle(_pageNum, _isMultiplePage){
		var tColor = title.topLineColor, bColor = title.bottomLineColor, fColor = title.fontColor, pdf = doc.pdf, txt = doc.page.title[_pageNum];
		
		pdf.setLineWidth(title.topLineWidth);
		pdf.setDrawColor(tColor.r, tColor.g, tColor.b);
		pdf.line(title.startX, title.startY, title.startX + title.width, title.startY);
		
		pdf.setFontType('normal');
		pdf.setFontSize(title.fontSize);
		pdf.setTextColor(fColor.r, fColor.g, fColor.b);
		if(_pageNum === 0){
			if(model.hasDiagram == true){
				pdf.text(title.startX, title.startY + title.fontPosY, txt[1]);
//				if(txt[0] == ''){
//					pdf.text(title.startX, title.startY + title.fontPosY, txt[1]);
//				}else{
//					$.each(txt, function(_idx){
//						pdf.text(title.startX + (doc.size.width / 2 * _idx) - ((_idx == 0) ? 0 : title.exceptSpace), title.startY + title.fontPosY, txt[_idx]);
//					});
//				}
			}			
		}else{			
			pdf.text(title.startX, title.startY + title.fontPosY, txt);
		}
		
		pdf.setLineWidth(title.bottomLineWidth);
		pdf.setDrawColor(bColor.r, bColor.g, bColor.b);
		pdf.line(title.startX, title.startY + title.height, title.startX + title.width, title.startY + title.height);	
		
		if(!_isMultiplePage)	drawFooter(_pageNum);
	}
	function drawFooter(_pageNum, _isMultiplePage){
		var lColor = footer.lineColor, pdf = doc.pdf, pageNum = _pageNum + 1, docLength = doc.page.title.length;
		
		if(model.hasDiagram == false)	pageNum = _pageNum;
		
		pdf.setLineWidth(0.5);
		pdf.setDrawColor(lColor.r, lColor.g, lColor.b);
		pdf.line(footer.startX, footer.startY, footer.startX + title.width, footer.startY);
		
		pdf.setFontSize(footer.fontSize);
		pdf.setTextColor(footer.fontColor.r, footer.fontColor.g, footer.fontColor.b);
		
		if(model.hasDiagram == true){
			docLength += model.useFrameKit.page;	
			if(pageNum == 6)	doc.page.mechanicalCount += 1;
			if(pageNum >= 6){
				pageNum += (doc.page.mechanicalCount - 1);
				pdf.text(pageNum + '/' + docLength, footer.startX, footer.numPosY);
			}else{
				pdf.text(pageNum + '/' + docLength, footer.startX, footer.numPosY);
			}
		}else{
			if(_pageNum != 0){
				pdf.text(pageNum + '/' + 2, footer.startX, footer.numPosY);
			}
		}
		pdf.text(footer.sitename, footer.sitenamePosX, footer.numPosY);
		
		if(!_isMultiplePage)	drawContents.init(_pageNum);
	}
	function init(_pageNum){
		var pNum = _pageNum;
		if(model.hasDiagram == true){
			if(pNum != 0)	doc.pdf.addPage();
		}else{
			if(pNum != 1 & pNum != 0)	doc.pdf.addPage();
		}		
		drawHeader(pNum);	
		$('#loading-layer').find('.newLoadingIn #loading-text span').text(parseInt(_pageNum * doc.page.load));
	};
	return {
		init: init,
		drawHeader: drawHeader,
		drawTitle: drawTitle,
		drawFooter: drawFooter
	};
})();

drawContents = (function(){
	var diagram = (function(){
		var color = {r: 160, g: 160, b: 160};
		function drawCabinet(_doc, _count, _startPos, _size){
			var pdf = _doc, 
				cabinet = {
					startPos: _startPos,
					size: _size,
					count: _count
				},
				port = {
					size: {
						width: Number((cabinet.size.width * .3).toFixed(1)), 
						height: Number((cabinet.size.height * .3).toFixed(1))
					}
				},
				line = 0.1, lineColor = color, row = 0, rowTotal = cabinet.count.row, col = 0, colTotal = cabinet.count.col, startPos = cabinet.startPos, size = cabinet.size;	
			port.startPos = {x: cabinet.startPos.x + (cabinet.size.width - port.size.width) / 2, y: cabinet.startPos.y + (cabinet.size.height - port.size.height) / 2};
			
			pdf.setDrawColor(lineColor.r, lineColor.g, lineColor.b);
		    pdf.setLineWidth(line);
		    for(row = 0; row <= rowTotal; ++row){
		    	pdf.line(startPos.x, startPos.y + (size.height * row), startPos.x + (size.width * colTotal), startPos.y + (size.height * row));
		    }
		    
		    pdf.setDrawColor(lineColor.r, lineColor.g, lineColor.b);
		    pdf.setLineWidth(line);	
			for(col = 0; col <= colTotal; ++col){
		    	pdf.line(startPos.x + (size.width * col), startPos.y, startPos.x + (size.width * col), startPos.y + (size.height * rowTotal));
		    }
		}
		function drawPort(_doc, _count, _startPos, _size){
			var pdf = _doc,		 
				cabinet = {
					startPos: _startPos,
					size: _size,
					count: _count
				},
				port = {
					size: {
						width: Number((cabinet.size.width * .3).toFixed(1)), 
						height: Number((cabinet.size.height * .3).toFixed(1))
					}
				},
				squareColor = color, row = 0, rowTotal = cabinet.count.row, col = 0, colTotal = cabinet.count.col, startPos, size = port.size;	
				port.startPos = {x: cabinet.startPos.x + (cabinet.size.width - port.size.width) / 2, y: cabinet.startPos.y + (cabinet.size.height - port.size.height) / 2};
				startPos = port.startPos, size = port.size;
			
			pdf.setDrawColor(0);
			pdf.setFillColor(squareColor.r, squareColor.g, squareColor.b);
			for(col = 0; col < colTotal; ++col){	    	
				for(row = 0; row < rowTotal; ++row){
					pdf.rect(startPos.x + cabinet.size.width * col, startPos.y + cabinet.size.height * row, size.width, size.height, 'F');	
				}
			}
			return	size;
		}
		function drawPowerFlow(_doc, _count, _startPos, _size, _voltage){
			var pdf = _doc,
				voltage = _voltage,		 
				sets = ARR_POWER_FLOW_MAXIMUM_SETS[model.code][voltage],
				cabinet = {
					startPos: _startPos,
					size: _size,
					count: _count
				},
				port = {
					size: {
						width: Number((cabinet.size.width * .3).toFixed(1)), 
						height: Number((cabinet.size.height * .3).toFixed(1))
					}
				},
				color = [{r: 41, g: 56, b: 149}, {r: 160, g: 160, b: 160}],
				matrix = new Matrix(_count.col, _count.row, sets), cables, startX, startY, endX, endY;	
			
			port.startPos = {x: cabinet.startPos.x + (cabinet.size.width - port.size.width) / 2, y: cabinet.startPos.y + (cabinet.size.height - port.size.height) / 2};		
			matrix.calculate();
	        cables = matrix.getCables();
			drawCable(cables);
			drawLegend({x: cabinet.startPos.x, y: cabinet.startPos.y + cabinet.size.height * cabinet.count.row + 5});
			
			function drawCable(_arrCablePos){ // 케이블 그리기
				var line = port.size.width * 0.2, row = 0, rowTotal = cabinet.count.row, tmpRow, col = 0, colTotal = cabinet.count.col, tmpCol, tmpTotal,
					startPos = {
						x: cabinet.startPos.x + cabinet.size.width / 2,
						y: cabinet.startPos.y + cabinet.size.height / 2
					}, 
					cablePos = _arrCablePos, cRow = 0, cRowTotal = cablePos.length, cCol = 0, cColTotal, endPoint = {size: port.size.width * 0.8},
					img = {
						toTop: {
							url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAoCAYAAAC8cqlMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RThFMTc5RUY5MzhDMTFFOEE3NTBFQzQwOEM4OEI2MjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RThFMTc5RUU5MzhDMTFFOEE3NTBFQzQwOEM4OEI2MjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTk1MmRkODItODU0MS00YjRlLThkZDctYTFhNWQ3MjEwZTNhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2YzkyMmQzLWI4M2ItZTY0YS1iN2JlLTY4OTNmNjgxMDYwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsPn894AAAIRSURBVHja1JlBTsMwEEWTgSXcAA6QLsumW05QVlwAwSq9QbsiN2i6AXEBVvQAiBPQDSI9AL0B2VYwRlMpCrjx2DPFtTRKYjtxfiaZN3bSbDBLlMuQtvPQCz0+nFvbDpVFHKFNaf8ZrdYaCJSF3KKdkhWaA2kK6aONGsc51e2VkAO0O9o26+5bddELMU//zOKlfF+EnNC3YSsF9YleiIlSxx2RrIxdiGHGhWO/YaxCmsxwKSWdE52QDTM431IRm5A2MzjRrR+LkL+YwTlXhC0SQmzM4HgzmC3p23vlffLl1Yt5z6uOcOtSTDKZYXa7+i+PTAVEiLAFArzhygxnBtE1dycEB+Qyw5ktdO2deYTLDHW2gIc3fJnhHAVpDD0hOEAIM1hsobHUPBLKDDW2AMMbXfMM6VLQmOIekWKGClvA0RshzJgn/mtazmzpTFEorlee4dakHj20L7Sl5/xjRelLHeqREGZM8AY+KIcaa7IFFJmxaNG/pDoVtoASM9ZoN+iJ9aaC9q+pTZwtoMSMEm/8tV2JdYuALHcrW0CBGeZ7mGxpH1MfUbaAAjNG+OQ/bY0UfXxnhFa2gDQz8EafujphH3G2gOA8o2ZGuDzx/1/ya94C0sxw7SzNFlBihvOTlWILaDCD4RUxtoAWMxhiRNiSZoNZyNqUec9728ItYzFjmfj9N/lZEwNNZjC8EsyWbwEGADiCubKGNWySAAAAAElFTkSuQmCC',
							size: {
								width: port.size.width * 0.8,
								height: port.size.width * 0.8 * (40 / 50)
							}
						},
						toBottom: {
							url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAoCAYAAAC8cqlMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RThFQkIzNDM5MzhDMTFFOEE3NTBFQzQwOEM4OEI2MjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RThFQkIzNDI5MzhDMTFFOEE3NTBFQzQwOEM4OEI2MjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTk1MmRkODItODU0MS00YjRlLThkZDctYTFhNWQ3MjEwZTNhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2YzkyMmQzLWI4M2ItZTY0YS1iN2JlLTY4OTNmNjgxMDYwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pq3oPH8AAAHfSURBVHjavJdBTsMwEEUd0yXcAA5QlmXDLcolYJXeAFZwg5YNXKI9SLuEA5AblC2CsWRLUeSG+M8fjzSNmsqOX+zxq5v57evWObd0WNxJ7hwnwhi2YNudl4+V5DfYwUbynAAR+liDbcPYVwHkS/IR7ORS8oUA8ix5BbZ9Cgy+92YPYEet5EIBsYirAolDmskE8iN5H6+lcSb5Hq9I2zewbRjrQxqzH9BtFG+1BWfzRlGf+/SlkV1rWHSfce0jRTeX7Arq60PyAnhWeMa15DHd8JnBtIqdp2RG1yCEizV17N/wuT1Z4YblRCcto4MgZ+R840fWrpVb1M7I/eBH1qCVW9TOKAGxcgvFGaUgbLfQnFEKwnYLzRm5GHrkVHFq3eKYzsjFbOJgWvAvdnLLL9MZKEjfLci5BT3rnHQGUiMst1CdoQXRuIXqDC2I1i00ZzBANG6hOYMBonULxRksEBdrpTOA6GJtuFogmnOL2hlMEO25ReUMNgjTLUXOsABhuaXIGRYgDLcUO8MKROMWyBlWIBq3QM6wBEHcAjvDGqTULbAzrEFK3KJyRg2QKW5RO6MWyH9uUTujFsiYWyjOqAmScwvNGTVBcm6hOaM2SN8tVGfkYmYMktzSMJ2Riz8BBgCzcZNSsE726wAAAABJRU5ErkJggg==',
							size: {
								width: port.size.width * 0.8,
								height: port.size.width * 0.8 * (40 / 50)
							}
						},
						toLeft: {
							url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAyCAYAAAAus5mQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RThFQkIzM0Y5MzhDMTFFOEE3NTBFQzQwOEM4OEI2MjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RThFQkIzM0U5MzhDMTFFOEE3NTBFQzQwOEM4OEI2MjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTk1MmRkODItODU0MS00YjRlLThkZDctYTFhNWQ3MjEwZTNhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2YzkyMmQzLWI4M2ItZTY0YS1iN2JlLTY4OTNmNjgxMDYwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkaJDRkAAAHDSURBVHjazJlLTgJBEIZl7OV4AzkAbjWRWzDcgg0BT6LEmHgLmFtgIls5AN5AlhqtTopk1Hl099Srkn/DzKKo+b/u6urBaPx0ZjQuQY+ZwcTOQQvQG6hwxpK7Bj2Dbk4/WKlgDroHbavJ+bBQwYn3GmhY99BpQ+B91vZSpg1B18tOG4KuyLQhsFDBVgg0EwyCQOMTR0EgXcFoCKQq6CF4SIFAooK9IOCsoIdgDdowJfcOmmbaENTEF2gFuvJ/3mlD8Cd2oBnoNfYTs0GAcQTdgcbV5EIhYYUAogTNQYdYikl2gg4I5ghZFMWiEMSug+IQhK6DEhAs6yAIqaAqBCEVHKC44huVvNVt0LArNDB1FAjcAgFM2os/0CO3aGTquECPvyCIyc3CDo28RGNzHJq2mGye2s18VtapkiFJV1lnJ33arQP6Z4qrPnUM0f9r3LWS+0EJiPZNEIV2M9wQ5U0QxTas4hCldNSiEPU5k4hARHHs9BCNuCCiOhcfuSCiHn2QQ8QxmyGFiHM+SAKRxACzF0RSE9ZkiKSH6NEQaUz5oyDSvGk6QVS0QWThKqxsg8jKXV0jRNauY/9BZPG++BdEPwIMAKd1gFzAeJN+AAAAAElFTkSuQmCC',
							size: {							
								height: port.size.width * 0.8,
								width: port.size.width * 0.8 * (40 / 50)
							}
						},
						toRight: {
							url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAyCAYAAAAus5mQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RThFMTc5RUI5MzhDMTFFOEE3NTBFQzQwOEM4OEI2MjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RThFMTc5RUE5MzhDMTFFOEE3NTBFQzQwOEM4OEI2MjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTk1MmRkODItODU0MS00YjRlLThkZDctYTFhNWQ3MjEwZTNhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2YzkyMmQzLWI4M2ItZTY0YS1iN2JlLTY4OTNmNjgxMDYwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpVBA/4AAAH4SURBVHjazJdBTgIxFIZLmSXeAA6gW12w9QTgxgu40AQMHkBWeACMkOjCC7gBT+BWE1kZ8QBwA1li8H/JI5mQkGln3mvnJf+uNB+v/dpO5bA5nhhjrl+eT5emhGWRNjI/v3jrIdUyAlIdIEPkA5DHZQTcFsG9A3KI1MoISJUgPV72VmzACiTZZIyZxpTIOoyJKpF1HBdNIus5PrhENsdvgkrkIomJKZEVmIMk+tGSyArNU9OSyAr/YXGJrMK2EZWIAM8QjQ3eIIEAOUHquS3++p4bTEAH8QDpIhq3xQq5RUaw/c8bcFu8wZ94L2nUDLkE5CwXIEPSHuogd2yndK2RMXUUoCtvwBQo7aEHROu2WPAB/5oLMAXaZtC6EigBdvfdRJmADFnjJQ8ukRNgTIm8AGNI5A0YWqIiV92Go/YUpCQ5OldlWQb8KSBdJMkI6WOJfxNPOJLjETlRlOQKYJ/pl4frMbO9qxOlY6bPx8x692mUBddiGRqKBzXdKIt9b7d9YHUGayuBLRlsmvW4jCqBy+s3qgROgKm7thNaApfv4qgSuHRwGlOCGF91JME9clQUzijsN28JQnWQJLhBmpJwUh0sJIEmoIgEGkssKoF0B8UlkOqgmgQSHVSVoAhgEAnyLHFQCXw7GFwC1w5Gk8Clg1ElyKp/AQYACP0FJAXjiIkAAAAASUVORK5CYII=',
							size: {							
								height: port.size.width * 0.8,
								width: port.size.width * 0.8 * (40 / 50)
							}
						}
					};
				
				pdf.setDrawColor(color[0].r, color[0].g, color[0].b);
				pdf.setLineCap("round");
			    pdf.setLineWidth(line);
			    for(cRow = 0; cRow < cRowTotal; ++cRow){		    	
			    	for(cCol = 0; cCol < cablePos[cRow].length; ++cCol){
			    		if(cCol < cablePos[cRow].length - 1){
			    			startX = startPos.x + cablePos[cRow][cCol][0] * cabinet.size.width;
			    			startY = startPos.y + cablePos[cRow][cCol][1] * cabinet.size.height;
			    			endX = startPos.x + cablePos[cRow][cCol + 1][0] * cabinet.size.width;
			    			endY = startPos.y + cablePos[cRow][cCol + 1][1] * cabinet.size.height;
			    			if(cCol == 0){
			    				if(startPos.x + cablePos[cRow][cCol][0] < startPos.x + cablePos[cRow][cCol + 1][0] && startPos.x + cablePos[cRow][cCol][1] == startPos.x + cablePos[cRow][cCol + 1][1]){
			    					pdf.addImage(img.toRight.url, 'JPEG', startX - img.toRight.size.width / 2 , startY- img.toRight.size.height / 2, img.toRight.size.width, img.toRight.size.height);
			    				}else if(startPos.x + cablePos[cRow][cCol][0] > startPos.x + cablePos[cRow][cCol + 1][0] && startPos.x + cablePos[cRow][cCol][1] == startPos.x + cablePos[cRow][cCol + 1][1]){
			    					pdf.addImage(img.toLeft.url, 'JPEG', startX - img.toLeft.size.width / 2 , startY- img.toLeft.size.height / 2, img.toLeft.size.width, img.toLeft.size.height);
			    				}else if(startPos.x + cablePos[cRow][cCol][0] == startPos.x + cablePos[cRow][cCol + 1][0] && startPos.x + cablePos[cRow][cCol][1] < startPos.x + cablePos[cRow][cCol + 1][1]){
			    					pdf.addImage(img.toBottom.url, 'JPEG', startX - img.toBottom.size.width / 2 , startY- img.toBottom.size.height / 2, img.toBottom.size.width, img.toBottom.size.height);
			    				}else if(startPos.x + cablePos[cRow][cCol][0] == startPos.x + cablePos[cRow][cCol + 1][0] && startPos.x + cablePos[cRow][cCol][1] > startPos.x + cablePos[cRow][cCol + 1][1]){
			    					pdf.addImage(img.toTop.url, 'JPEG', startX - img.toTop.size.width / 2 , startY- img.toTop.size.height / 2, img.toTop.size.width, img.toTop.size.height);
			    				}			    				
			    			}
			    			pdf.setDrawColor(color[0].r, color[0].g, color[0].b);
			    			pdf.line(startX, startY, endX, endY);
			    		}
			    		if(cCol == cablePos[cRow].length - 1){
			    			pdf.setDrawColor(0);
			    		    pdf.setFillColor(color[0].r, color[0].g, color[0].b);
		    				pdf.rect(startPos.x + cablePos[cRow][cCol][0] * cabinet.size.width - port.size.width / 2, startPos.y + cablePos[cRow][cCol][1] * cabinet.size.height - port.size.height / 2, port.size.width, port.size.height, 'F')
		    			}
			    	}
			    }		
			} 
			
			function drawLegend(_pos){
				var pos = _pos, 
					img = {
						url: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZFQkIyRTIxOTEzRjExRTg4NUI2RjlERDMzMUIyMkM1IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZFQkIyRTIwOTEzRjExRTg4NUI2RjlERDMzMUIyMkM1IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE5NTJkZDgyLTg1NDEtNGI0ZS04ZGQ3LWExYTVkNzIxMGUzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+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',
						size: {
							width: 4.2,
							height: 3.4
						}
				};
		    	
		    	pdf.setFontSize(8);
		    	
		    	pdf.setFontType("italic");
		    	pdf.text(content.startX + 14, pos.y, "* The number of primary power cables doesn't pertain to the number of external circuits. The number of external circuits depends on");
		    	pdf.text(content.startX + 56.5, pos.y + 3, "power consumption. For more detail, please contact your sales partner from Samsung Electronics.");
		    	pdf.setFontType("normal");
		    	
		    	pdf.setDrawColor(color[0].r, color[0].g, color[0].b);
		    	pdf.setLineCap('square');
		        pdf.setLineWidth(1);
		    	pdf.line(pos.x + 0.5, pos.y + 2, pos.x + 5.4, pos.y + 2);
		    	pdf.text(pos.x + 9, pos.y + 3, 'Power Interconnect Cable');
		    	
		    	pdf.setFillColor(color[1].r, color[1].g, color[1].b);
		    	pdf.rect(pos.x, pos.y + 2 + 4.5, 5.9, 3.6, 'F');
		    	pdf.text(pos.x + 9, pos.y + 3 + 6.5, 'Power Cable Input/Output');
		    		    	
		    	pdf.setFillColor(color[0].r, color[0].g, color[0].b);
		    	pdf.rect(pos.x, pos.y + 2 + 5 + 6, 5.9, 3.6, 'F');
		    	pdf.text(pos.x + 9, pos.y + 3 + 13, 'Primary Cable Routing End Point');
		    	
		    	pdf.addImage(img.url, 'JPEG', pos.x + 1 , pos.y + 2 + 5 + 6 + 7, img.size.width, img.size.height);
		    	pdf.text(pos.x + 9, pos.y + 3 + 19.5, 'Primary Power Cable Input');
			}
		};
		return {
			drawCabinet: drawCabinet,
			drawPort: drawPort,
			drawPowerFlow: drawPowerFlow
		}
	})();
	
	function preview(_pageNum, _completeFunc){
		var pdf = doc.pdf, startPos = {x : content.startX , y : content.startY}, 
			img = {
				url: '/static/images/support/pdf_preview.jpg',
				size: {
					width: doc.content.width
				}
			};
		
		if(model.hasDiagram == true){			
			util.getBase64Image(img.url, drawPreview);
			function drawPreview(_dataUrl, _ratio){
				img.image = _dataUrl;
				img.size.ratio = _ratio;
				img.size.height = img.size.width * img.size.ratio;				
				pdf.addImage(img.image , 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
				
				pdf.setFontType('normal');
			    pdf.setFontSize(10);
			    pdf.setTextColor(2, 2, 2);
			    pdf.text(startPos.x, startPos.y + img.size.height + 10, 'Samsung’s IF Series displays are the comprehensive solution for an improved LED experience. By streamlining');
			    pdf.text(startPos.x, startPos.y + img.size.height + 16, 'installation, presentation and management, businesses can create and share powerful content with minimal hassle.');
			    				
				if(_completeFunc)	_completeFunc(_pageNum + 1);
			}
		}else{
			if(_completeFunc)	_completeFunc(_pageNum + 1);
		}
	}
	function ledRendering(_pageNum, _completeFunc){
		var pdf = doc.pdf,			
			backImg = 'url("/static/images/videowall_configurator/background2.png")',
			fontProp = {
				size : {
					header : {
						stitle : 50
					},
					render : {
						model : 6.5,
						measure : 6
					}
				},
				weight : {
					normal : 'normal',
					bold : 'bold'
				}	
			},
			renderProp = {
				ratio: {
					font: 1,
					width: 1,
					height: 1
				},
				width: 0,
				height: 0,
				startX: 0
			},
			num, infoHeight, ratio, activeMode, inactiveMode, unitProp, docProp, modelProp, headerProp, titleProp;
		
		docProp = {startX : content.startX , startY : content.startY, width : content.width, padding : 0};
		infoHeight = 40;
		ratio = docProp.width / $('#pdf-section').width();
		modelProp = {
			code : model.code
		};
		headerProp = {x: docProp.startX , y: docProp.startY, width: docProp.width, height: title.height}
		titleProp = {
			customPosY: docProp.startY - 2.4, // 2.4는 고정
			customHeight: 9.1,
			modelPosY: 0,
			modelColor: {r: 106, g: 106, b: 106},
			modelFontSize: 21,
			height: 22.6
		};
		titleProp.modelPosY = docProp.startY + titleProp.customHeight + 6.4 - 1; // 마지막은 text height : 6.4
		specProp = {
			width: docProp.width / 3,
			height: 100,
			startX: docProp.startX,
			startY: docProp.startY
		},
		renderProp = {
			ratio: {
				font: 1,
				width: 1,
				height: 1
			},
			width: 0,
			height: 0,
			startX: 0
		};
    	setTitle(pdf, modelProp.code);  
    	
		function setTitle(_doc, _modelCode){ // title 
			var doc = _doc, modelCode = _modelCode;	    

		    setTimeout(function(){
		        $(imageCanvasProp.txtId).css({display:'block'});
		        html2canvas(document.querySelector(imageCanvasProp.txtId), {
		            onrendered: function(canvas) {
		                docProp.title = canvas.toDataURL('image/jpeg');
		                doc.addImage(docProp.title, 'JPEG', docProp.startX - 1, titleProp.customPosY, docProp.width, ($(imageCanvasProp.txtId).height() - 8) * ratio);
		                doc.setFillColor(255, 255, 255);
		                doc.rect(docProp.startX - 1, titleProp.customPosY, 1, docProp.startY, 'F');
		                doc.rect(docProp.startX + docProp.width - 5, titleProp.customPosY, 6, docProp.startY, 'F');
		                $(imageCanvasProp.txtId).text('');
		                $(imageCanvasProp.txtId).css({display:'none'});
		                
		                doc.setFontType('bold');
			            doc.setFontSize(titleProp.modelFontSize);
			            doc.setTextColor(titleProp.modelColor.r, titleProp.modelColor.g, titleProp.modelColor.b);
			            doc.text(docProp.startX, titleProp.modelPosY, '[ ' + angular.element(document.getElementById('spec_container')).scope().display.spec.CATEGORY + " Model " + modelCode + ' ]');
			            doc.setFontType('normal');
			            
			            drawRenderedBlueprint();
		            }
		        });
		    }, 100);
		}
		function drawRenderedBlueprint(){
			var resetProp = {}, tmpObj = {},
				img = {
					url: '/' + scope.pdf.imgFile,
					size: {
						width: doc.content.width
					}
			};
			
			util.getBase64Image(img.url, drawBlueprintImage);
			function drawBlueprintImage(_dataUrl, _ratio){			
				img.image = _dataUrl;
				img.ratio = _ratio;
				img.size.height = img.size.width * img.ratio;	
				
				renderProp.width = tmpObj.width = img.size.width;
	            renderProp.height = tmpObj.height = img.size.height;
	            tmpObj.ratio = tmpObj.width / tmpObj.height;
	            tmpObj.startX = renderProp.startX = docProp.startX;
	            
	            if(tmpObj.height >= doc.content.height - titleProp.modelPosY){
	            	renderProp.width = tmpObj.width *= tmpObj.ratio;
	            	renderProp.ratio.height = (doc.content.height - titleProp.modelPosY) / tmpObj.height; 
	            	renderProp.height = tmpObj.height = doc.content.height - titleProp.modelPosY;
	            	tmpObj.startX = (docProp.width - tmpObj.width) / 2;
	            	renderProp.startX = docProp.startX + tmpObj.startX;
	            }
	            
	            pdf.addImage(img.image, 'JPEG', renderProp.startX, docProp.startY + titleProp.height, tmpObj.width, tmpObj.height);
				
				if(_completeFunc)	_completeFunc(_pageNum + 1)
			}
		}
	}
	function screenSpec(_pageNum, _completeFunc){
		var pdf = doc.pdf, 
			docProp = {startX : content.startX , startY : content.startY, width : content.width},
			specProp = {
				width: docProp.width / 3,
				height: 10,
				startX: docProp.startX,
				startY: docProp.startY,
				headerH: 15
			},
			fontProp = {
				size : {
					header : {
						stitle : 50
					},
					render : {
						model : 6.5,
						measure : 6
					}
				},
				weight : {
					normal : 'normal',
					bold : 'bold'
				}	
			};
		
		getSpecifications(pdf, model.code);
		getSpecificationsData(pdf, model.code);
		if(_completeFunc)	_completeFunc(_pageNum + 1);
		
		function getSpecifications(_doc, _modelCode){
		    var doc = _doc, modelCode = _modelCode, tmp = [], x, imgx, tmpTitle, tmpTitleX, iRow = 1, totalRow = (model.hasDiagram == true) ? 12 : 10, space = {x : 5, y : 4, groupY : 2}, startY = specProp.startY + specProp.headerH,
		    	modelPng = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAAEAlgCWAAD//gAfTEVBRCBUZWNobm9sb2dpZXMgSW5jLiBWMS4wMQD/2wCEAAUFBQgGCA4ICA4OCgoKDg8NDQ0NDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8BBggICwgLDQgIDQ8NCw0PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PD//EAaIAAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKCwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+foRAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/AABEIABkAIgMBEQACEQEDEQH/2gAMAwEAAhEDEQA/APc/+Ep0f/n8tf8AwIi/+Lq7PsI4vRNf02LXtUme5t1jl+x+W5mjCvtgYNsYthtp4bBODweapp2XzEHxC1/TbvQbiG3ubeWRvK2pHNGzHE8ZOFViTgAk4HABPSiKdwZ2n/CU6P8A8/lr/wCBEX/xdTZ9hh/wlOj/APP5a/8AgRF/8XRZ9gD/AIRbR/8Anztf/AeL/wCIou+4HF6JoGmya9qkL21u0cP2Py0MMZVN0DFtilcLuPLYAyeTzVNuy+Yg+IWgabaaDcTW9tbwyL5W144Y0YZnjBwyqCMgkHB5BI6GiLdwZ2n/AAi2j/8APna/+A8X/wARU3fcYf8ACLaP/wA+dr/4Dxf/ABFF33Awf+FZ+Hf+fb/yNcf/AB2nzMVjk9H8DaLca1qNpJBuhtfsnkr5kw2+bCzPyJAzbmGfmJx0GBVNuyCweOfA2i6Vos93aQeXNH5e1vMmbG6aNTw0jKcqxHIPXI5oi3ewWOs/4Vn4d/59v/I1x/8AHanmYWD/AIVn4d/59v8AyNcf/HaOZhY7upGcJoH/ACMWr/8Abj/6TtVPZfMQfEv/AJF25/7Y/wDpRFRHcGd3UjCgD//Z';
		    
		    doc.setDrawColor(0);
		    doc.setFillColor(232, 240, 255);
		    doc.rect(specProp.startX, startY, specProp.width, specProp.height * totalRow, 'F');
		    doc.setDrawColor(0);
		    doc.setFillColor(243, 247, 255);
		    doc.rect(specProp.startX + specProp.width, startY, specProp.width, specProp.height * totalRow, 'F');

		    doc.setDrawColor(199, 210, 238);
		    doc.setLineWidth(0.1);
		    doc.line(specProp.startX + specProp.width, startY, specProp.startX + specProp.width, startY + specProp.height * totalRow);
		    doc.line(specProp.startX + specProp.width * 2, startY, specProp.startX + specProp.width * 2, startY + specProp.height * totalRow);
		    
		    if(model.hasDiagram == true){
		    	for(; iRow <= totalRow; ++iRow){
			    	if(iRow % 2 == 0 && iRow != 2 && iRow != 6){
			    		doc.line(specProp.startX, startY + specProp.height * iRow, specProp.startX + docProp.width, startY + specProp.height * iRow);
			    	}else{
			    		doc.line(specProp.startX + specProp.width, startY + specProp.height * iRow, specProp.startX + docProp.width, startY + specProp.height * iRow);
			    	}    	
			    }
		    }else{
		    	for(; iRow <= totalRow; ++iRow){
			    	if(iRow % 2 == 0 && Math.floor(iRow / 2) != 2){
			    		doc.line(specProp.startX, startY + specProp.height * iRow, specProp.startX + docProp.width, startY + specProp.height * iRow);
			    	}else{
			    		doc.line(specProp.startX + specProp.width, startY + specProp.height * iRow, specProp.startX + docProp.width, startY + specProp.height * iRow);
			    	}    	
			    }
		    }
		    
		    doc.setDrawColor(0);
		    doc.setFillColor(67, 70, 85);
		    doc.rect(specProp.startX, specProp.startY, docProp.width, 15, 'F');

		    doc.setFontType('bold');
		    doc.setFontSize(20);
		    doc.setTextColor(255, 255, 255);
		    doc.text(specProp.startX + 5, specProp.startY + 10, 'Specifications');

		    x = docProp.width - 17 - modelCode.length * .25;
		    imgx = x - 10;
		    doc.text(x, specProp.startY + 10.5, modelCode);
		    doc.addImage(modelPng, 'JPEG', imgx, specProp.startY + 6, 7, 4);

		    doc.setFontType(fontProp.weight.normal);
		    doc.setTextColor(71, 116, 207);
		    doc.setFontSize(10);
		    
		    if(model.hasDiagram == true){
		    	doc.text(specProp.startX + space.x, startY + specProp.height * 2 + space.groupY, 'DISPLAY REQUIREMENTS');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 1 - space.y, 'Screen Configuration (WxH)');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 2 - space.y, 'No. of Cabinets');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 3 - space.y, 'No. of Spare Cabinets');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 4 - space.y, $('#spec_total_title').text());

			    doc.text(specProp.startX + space.x, startY + specProp.height * 6 + space.groupY, 'DISPLAY WALL DIMENSIONS');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 5 - space.y, 'Dimensions');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 6 - space.y, 'Display Area');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 7 - space.y, 'Diagonal');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 8 - space.y, 'Weight');

			    doc.text(specProp.startX + space.x, startY + specProp.height * 9 + space.groupY, 'OPTICAL PARAMETER');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 9 - space.y, 'Resolution');    
			    tmpTitle = $('#spec_sbox_title').text();
			    tmpTitleX = (angular.element(document.getElementById('spec_container')).scope().display.spec.SERIES_NAME == 'XAF Series') ? specProp.startX + specProp.width + space.x - space.groupY : specProp.startX + specProp.width + space.x;
			    doc.text(tmpTitleX, startY + specProp.height * 10 - space.y, tmpTitle);

			    doc.text(specProp.startX + space.x, startY + specProp.height * 11 + space.groupY, 'POWER REQUIREMENTS');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 11 - space.y, 'Max');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 12 - space.y, 'Typical');
		    }else{
		    	doc.text(specProp.startX + space.x, startY + specProp.height + space.groupY, 'DISPLAY REQUIREMENTS');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 1 - space.y, 'Screen Configuration (WxH)');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 2 - space.y, $('#spec_total_title').text());

			    doc.text(specProp.startX + space.x, startY + specProp.height * 4 + space.groupY, 'DISPLAY WALL DIMENSIONS');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 3 - space.y, 'Dimensions');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 4 - space.y, 'Display Area');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 5 - space.y, 'Diagonal');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 6 - space.y, 'Weight');

			    doc.text(specProp.startX + space.x, startY + specProp.height * 7 + space.groupY, 'OPTICAL PARAMETER');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 7 - space.y, 'Resolution');    
			    tmpTitle = $('#spec_sbox_title').text();
			    tmpTitleX = (angular.element(document.getElementById('spec_container')).scope().display.spec.SERIES_NAME == 'XAF Series') ? specProp.startX + specProp.width + space.x - space.groupY : specProp.startX + specProp.width + space.x;
			    doc.text(tmpTitleX, startY + specProp.height * 8 - space.y, tmpTitle);

			    doc.text(specProp.startX + space.x, startY + specProp.height * 9 + space.groupY, 'POWER REQUIREMENTS');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 9 - space.y, 'Max');
			    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 10 - space.y, 'Typical');
		    }		    
		}

		function getSpecificationsData(_doc, _modelCode){
			var doc = _doc, modelCode = _modelCode, darea = util.isEmpty($('#spec_darea').text()).replace(/²/gi, "2"), space = {x : 5, y : 4, groupY : 2}, startX = specProp.startX + (specProp.width * 2) + space.x, startY = specProp.startY + specProp.headerH,
				tmpInfoX = ($('.specifications-info').attr('data-type') == 'except-series') ? 42 : 112; 

		    doc.setFontType(fontProp.weight.normal);
		    doc.setTextColor(119, 119, 119);
		    doc.setFontSize(10);
		    
		    if(model.hasDiagram == true){
		    	doc.text(startX, startY + specProp.height - space.y, $('#spec_config').text());
		    	doc.text(startX, startY + specProp.height * 2 - space.y, $('#spec_cabinet').text());
		    	doc.text(startX, startY + specProp.height * 3 - space.y, $('#spec_bufferstock').text());
			    doc.text(startX, startY + specProp.height * 4 - space.y, $('#spec_total').text());

			    doc.text(startX, startY + specProp.height * 5 - space.y, $('#spec_dimension').text());			    
			    doc.text(startX, startY + specProp.height * 6 - space.y, darea);
			    doc.text(startX, startY + specProp.height * 7 - space.y, $('#spec_diagonal').text());
			    doc.text(startX, startY + specProp.height * 8 - space.y, $('#spec_weight').text());

			    doc.text(startX, startY + specProp.height * 9 - space.y, $('#spec_resolution').text());
			    doc.text(startX, startY + specProp.height * 10 - space.y, $('#spec_sbox').text());
			    
			    doc.text(startX, startY + specProp.height * 11 - space.y, $('#spec_max').text());
			    doc.text(startX, startY + specProp.height * 12 - space.y, $('#spec_typical').text());
			    
			    doc.setFontType("italic");
			    doc.setTextColor(71, 116, 207);
				doc.text(tmpInfoX, startY + specProp.height * 13 - space.y, $('.specifications-info i').text());
				doc.setFontType("normal");
		    }else{
		    	doc.text(startX, startY + specProp.height - space.y, $('#spec_config').text());
			    doc.text(startX, startY + specProp.height * 2 - space.y, $('#spec_total').text());

			    doc.text(startX, startY + specProp.height * 3 - space.y, $('#spec_dimension').text());			    
			    doc.text(startX, startY + specProp.height * 4 - space.y, darea);
			    doc.text(startX, startY + specProp.height * 5 - space.y, $('#spec_diagonal').text());
			    doc.text(startX, startY + specProp.height * 6 - space.y, $('#spec_weight').text());

			    doc.text(startX, startY + specProp.height * 7 - space.y, $('#spec_resolution').text());
			    doc.text(startX, startY + specProp.height * 8 - space.y, $('#spec_sbox').text());
			    
			    doc.text(startX, startY + specProp.height * 9 - space.y, $('#spec_max').text());
			    doc.text(startX, startY + specProp.height * 10 - space.y, $('#spec_typical').text());
			    
			    doc.setFontType("italic");
			    doc.setTextColor(71, 116, 207);
				doc.text(tmpInfoX, startY + specProp.height * 11 - space.y, $('.specifications-info i').text());
				doc.setFontType("normal");
		    }
		}
	}
	function productSpec(_pageNum, _completeFunc){
		var pdf = doc.pdf,
			docProp = {startX : content.startX , startY : content.startY, width : content.width},
			specProp = {
				width: docProp.width / 3,
				height: 7.5,
				startX: docProp.startX,
				startY: docProp.startY,
				headerH: 15,
					
				widthLineIdx: [0, 5, 11, 17, 21, 22, 23, 26]
			},
			fontProp = {
				size : {
					header : {
						stitle : 50
					},
					render : {
						model : 6.5,
						measure : 6
					}
				},
				weight : {
					normal : 'normal',
					bold : 'bold'
				}	
			}, specData;
		
		$.ajax({
			type : 'GET',
			url: '/support/led-configurator?method=specforpdf&seq=' + model.display.seq,
			success: function(_data){
				specData = _data.spec;
				getSpecifications(pdf, model.code);
				getSpecificationsData(pdf, specData);
				if(_completeFunc)	_completeFunc(_pageNum + 1);
			},
			error: function(_error){
				console.log(_error)
			},
			dataType: 'json'
		});
		
		function getSpecifications(_doc, _modelCode){
		    var doc = _doc, modelCode = _modelCode, tmp = [], iRow = 0, totalRow = 26, space = {x : 5, y : 2.5, groupY : 2}, startY = specProp.startY + specProp.headerH + 1.5, j = 0, jTotal = specProp.widthLineIdx.length;
		    
		    doc.setDrawColor(0);
		    doc.setFillColor(232, 240, 255);
		    doc.rect(specProp.startX, startY, specProp.width, specProp.height * totalRow, 'F');
		    doc.setDrawColor(0);
		    doc.setFillColor(243, 247, 255);
		    doc.rect(specProp.startX + specProp.width, startY, specProp.width, specProp.height * totalRow, 'F');

		    doc.setDrawColor(199, 210, 238);
		    doc.setLineWidth(0.1);
		    doc.line(specProp.startX + specProp.width, startY, specProp.startX + specProp.width, startY + specProp.height * totalRow);
		    doc.line(specProp.startX + specProp.width * 2, startY, specProp.startX + specProp.width * 2, startY + specProp.height * totalRow);
		    
		    for(; iRow <= totalRow; ++iRow){
		    	for(j = 0; j <= jTotal; ++j){
		    		if(iRow === specProp.widthLineIdx[j-1]){
		    			doc.line(specProp.startX, startY + specProp.height * iRow, specProp.startX + docProp.width, startY + specProp.height * iRow);
		    		}else{
		    			doc.line(specProp.startX + specProp.width, startY + specProp.height * iRow, specProp.startX + docProp.width, startY + specProp.height * iRow);
		    		}
		    	}
		    }
		    
		    doc.setDrawColor(0);
		    doc.setFillColor(67, 70, 85);
		    doc.rect(specProp.startX, specProp.startY, docProp.width, 13.5, 'F');

		    doc.setFontType(fontProp.weight.normal);
		    doc.setFontSize(10);
		    doc.setTextColor(255, 255, 255);
		    doc.text(specProp.startX + 5, specProp.startY + 8, 'Model Name  ');
		    doc.setFontType(fontProp.weight.bold);
		    doc.setFontSize(15);
		    doc.text(specProp.startX + 30, specProp.startY + 9, model.code);

		    doc.setFontType(fontProp.weight.normal);
		    doc.setTextColor(71, 116, 207);
		    doc.setFontSize(8);

		    doc.text(specProp.startX + space.x, startY + specProp.height * 2 + space.groupY, 'Physical Parameter');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 1 - space.y, 'Pixel Pitch');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 2 - space.y, 'Diode Type');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 3 - space.y, 'Dimensions (mm, LxHxD, per cabinet)');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 4 - space.y, 'Dimensions (inch, inchxD, per cabinet)');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 5 - space.y, 'Weight (per cabinet))');

		    doc.text(specProp.startX + space.x, startY + specProp.height * 8 + space.groupY, 'Optical Parameter');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 6 - space.y, 'Brightness (Peak/Max)');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 7 - space.y, 'Contrast Ratio (Peak/Max)');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 8 - space.y, 'Viewing angle - Horizontal');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 9 - space.y, 'Viewing angle - Vertical');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 10 - space.y, 'Bit Depth');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 11 - space.y, 'Color temperature - Adjustable');
		    
		    doc.text(specProp.startX + space.x, startY + specProp.height * 14 + space.groupY, 'Electrical Parameter');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 12 - space.y, 'Video Rate');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 13 - space.y, 'Input Power Range');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 14 - space.y, 'Power consumption - Max');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 15 - space.y, 'Power consumption - Typ');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 16 - space.y, 'Heat generation - Max(BTU/SF)');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 17 - space.y, 'Refresh rate');
		    
		    doc.text(specProp.startX + space.x, startY + specProp.height * 19 + space.groupY, 'Operation Conditions');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 18 - space.y, 'Working Temperature / Huminity');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 19 - space.y, 'Storage Temperature / Huminity');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 20 - space.y, 'IP Rating');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 21 - space.y, 'LED Lifetime');
		    
		    doc.text(specProp.startX + space.x, startY + specProp.height * 22 - space.y, 'Certification');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 22 - space.y, 'Certification');
		    
		    doc.text(specProp.startX + space.x, startY + specProp.height * 23 - space.y, 'Service');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 23 - space.y, 'Service');
		    
		    doc.text(specProp.startX + space.x, startY + specProp.height * 24 + space.groupY, 'Package');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 24 - space.y, 'Box Dimension (mm, LxHxD)');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 25 - space.y, 'Box Volume (m2)');
		    doc.text(specProp.startX + specProp.width + space.x, startY + specProp.height * 26 - space.y, 'Package Weight (kg, per cabinet)');		    
		}

		function getSpecificationsData(_doc, _specData){
			var doc = _doc, data = _specData, 
				space = {x : 5, y : 2.5}, startY = specProp.startY + specProp.headerH + 1.5;
		    
		    doc.setFontType(fontProp.weight.normal);
		    doc.setTextColor(120, 119, 119);
		    doc.setFontSize(8);

		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 1 - space.y, parseFloat(data.physical.PHY_PITCH) + 'mm');
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 2 - space.y, data.physical.PHY_TYPE);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 3 - space.y, data.physical.PHY_DIMENSIONS);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 4 - space.y, data.physical.PHY_DIMENSIONS_INCH);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 5 - space.y, data.physical.PHY_WEIGHT);

		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 6 - space.y, data.optical.OPT_BRIGHTNESS);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 7 - space.y, data.optical.OPT_CONTRAST);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 8 - space.y, data.optical.OPT_HORIZONTAL);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 9 - space.y, data.optical.OPT_VERTICAL);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 10 - space.y, data.optical.OPT_BIT_DEPTH);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 11 - space.y, data.optical.OPT_ADJUSTABLE);
		    
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 12 - space.y, data.electrical.ELE_RATE);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 13 - space.y, data.electrical.ELE_INPUT);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 14 - space.y, (data.electrical.ELE_MAX).replace(/&#13217;/gi, "m2"));
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 15 - space.y, (data.electrical.ELE_TYPICAL).replace(/&#13217;/gi, "m2"));
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 16 - space.y, data.electrical.ELE_HG_MAX);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 17 - space.y, data.electrical.ELE_REFRESH);
		    
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 18 - space.y, data.operation.OPE_WORKING);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 19 - space.y, data.operation.OPE_STORAGE);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 20 - space.y, data.operation.OPE_IP);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 21 - space.y, data.operation.OPE_LED);
		    
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 22 - space.y, data.certification.CER_CERTIFICATION);
		    
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 23 - space.y, data.service.SER_SERVICE);
		    
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 24 - space.y, data['package'].PAC_DIMENSION);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 25 - space.y, data['package'].PAC_VOLUME);
		    doc.text(specProp.startX + specProp.width * 2 + space.x, startY + specProp.height * 26 - space.y, data['package'].PAC_PACKAGE);	
		}
	}
	function cabinetDrawing(_pageNum, _completeFunc){
		var pdf = doc.pdf, startPos = {x : content.startX , y : content.startY - 1},
			ARR_CABINET_SERIES = {
				'IFJ': '/static/images/support/pdf_cabinet_ifj.jpg',
				'IFH': '/static/images/support/pdf_cabinet_ifh.jpg',
				'IFD': '/static/images/support/pdf_cabinet_ifd.jpg'
			},
			img = {
				url: {
					'IF012J': ARR_CABINET_SERIES['IFJ'],
					'IF015H': ARR_CABINET_SERIES['IFH'],
					'IF020H': ARR_CABINET_SERIES['IFH'],
					'IF025H': ARR_CABINET_SERIES['IFH'],
					'IF025H-D': ARR_CABINET_SERIES['IFD'],
					'IF040H-D': ARR_CABINET_SERIES['IFD'],
					'IF060H-D': ARR_CABINET_SERIES['IFD'],
				},
				size: {
					width: doc.content.width
				}
			}, i = 0, total = img.url.length;
		
		util.getBase64Image(img.url[model.code], drawProductInfo);
		function drawProductInfo(_dataUrl, _ratio){			
			img.image = _dataUrl;
			img.size.ratio = _ratio;
			img.size.height = img.size.width * img.size.ratio;				
			pdf.addImage(img.image , 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
			if(_completeFunc)	_completeFunc(_pageNum + 1)
		}
	}
	function mechanicalCalculate(){
		var count = {col: model.display.col, row: model.display.row},
			rowS = modelLineFrame.height, 
			rowTotal = rowS.length, 
			rowLine = [],
			colS = modelLineFrame.width,
			colTotal = colS.length, 
			colLine = [],
			colIdx,
			typeCount = 0,
			useFrameKitType = [],
			pageTotal,
			useFrameKitCount = 0;	
		
		//ifj
		if(model.code == 'IF012J'){
			var tmpR_0 = count.row % rowS[0];					
			if(tmpR_0 != 0){ // 나머지가 있으면
				rowLine[0] = Math.floor(count.row / rowS[0]);					
				if(tmpR_0 < rowS[1]){ // 나머지가 다음  프레임 세로값보다 작으면				
					rowLine[0] -= 1; // 전 프레임에서 1개를 빼고
					var tmpT_1 = (count.row < rowS[0]) ? tmpR_0 : rowS[0] + tmpR_0;
					var tmpR_1 = tmpT_1 % rowS[1]; // 나머지에 전 프레임 세로 갯수를 더함, 2번째 프레임 킷 세로값의 나머지
					if(tmpR_1 != 0){ // 2번째 프레임킷 세로값의 나머지가 있으면 
						rowLine[1] = Math.floor(tmpT_1 / rowS[1]);
					}else{
						rowLine[1] = tmpT_1 / rowS[1];
					}
				}else{
					rowLine[1] = tmpR_0 / rowS[1];
				}						
			}else{
				rowLine[0] = count.row / rowS[0];
			} 			
		}else if(model.code == 'IF025H-D' || model.code == 'IF040H-D' || model.code == 'IF060H-D'){
			var tmpR_0 = count.row % rowS[0];					
			if(tmpR_0 != 0){ // 나머지가 있으면
				rowLine[0] = Math.floor(count.row / rowS[0]);					
				if(tmpR_0 < rowS[1]){ // 나머지가 다음  프레임 세로값보다 작으면				
					rowLine[0] -= 1; // 전 프레임에서 1개를 빼고
					var tmpT_1 = (count.row < rowS[0]) ? tmpR_0 : rowS[0] + tmpR_0;
					var tmpR_1 = tmpT_1 % rowS[1]; // 나머지에 전 프레임 세로 갯수를 더함, 2번째 프레임 킷 세로값의 나머지
					rowLine[1] = Math.floor(tmpT_1 / rowS[1]);
					if(tmpR_1 != 0){ // 2번째 프레임킷 세로값의 나머지가 있으면 
						rowLine[1] -= 1;
						var tmpT_2 = (count.row < rowS[1]) ? tmpR_1 : rowS[1] + tmpR_1;
						var tmpR_2 = tmpT_2 % rowS[2]; // 나머지에 전 프레임 세로 갯수를 더함, 3번째 프레임 킷 세로값의 나머지
						if(tmpR_2 != 0){
							rowLine[2] = Math.floor(tmpT_2 / rowS[2]);
						}else{
							rowLine[2] = tmpT_2 / rowS[2];
						}
					}else{
						rowLine[1] = tmpT_1 / rowS[1];
					}
				}else{
					rowLine[1] = tmpR_0 / rowS[1];
				}						
			}else{
				rowLine[0] = count.row / rowS[0];
			} 
		}else{
			var tmpR_0 = count.row % rowS[0];					
			if(tmpR_0 != 0){ // 나머지가 있으면
				rowLine[0] = Math.floor(count.row / rowS[0]);
				if(tmpR_0 < rowS[1]){ // 나머지가 다음  프레임 세로값보다 작으면				
					rowLine[0] -= 1; // 전 프레임에서 1개를 빼고
					var tmpT_1 = (count.row < rowS[0]) ? tmpR_0 : rowS[0] + tmpR_0;
					var tmpR_1 = tmpT_1 % rowS[1]; // 나머지에 전 프레임 세로 갯수를 더함, 2번째 프레임 킷 세로값의 나머지
					
					if(tmpR_1 != 0){ // 2번째 프레임킷 세로값의 나머지가 있으면 
						rowLine[1] = Math.floor(tmpT_1 / rowS[1]);
						if(tmpR_1 < rowS[2]){ // 나머지가 다음  프레임 세로값보다 작으면									
							rowLine[1] -= 1;
							var tmpT_2 = (count.row < rowS[1]) ? tmpR_1 : rowS[1] + tmpR_1;
							var tmpR_2 = tmpT_2 % rowS[2]; // 나머지에 전 프레임 세로 갯수를 더함, 3번째 프레임 킷 세로값의 나머지
							if(tmpR_2 != 0){ // 1
								rowLine[2] = Math.floor(tmpT_2 / rowS[2]);
							}else{
								rowLine[2] = tmpT_2 / rowS[2];
							}
						}else{
							rowLine[2] = tmpR_1 / rowS[2];
						}
					}else{
						rowLine[1] = tmpT_1 / rowS[1];
					}
				}else{
					rowLine[1] = tmpR_0 / rowS[1];
				}						
			}else{
				rowLine[0] = count.row / rowS[0];
			}
		}
		
		for(var i = 0; i < rowTotal; ++i){
			if(rowLine[i]){
				typeCount = Math.ceil(count.col / modelLineFrame.width[i]) * rowLine[i];
				if(typeCount > 0){
					useFrameKitType.push({
						type: {
							width: modelLineFrame.width[i],
							height: modelLineFrame.height[i]
						},
						count: Math.ceil(count.col / modelLineFrame.width[i]) * rowLine[i]
					});
				}else{
					useFrameKitType.push({
						type: {
							width: modelLineFrame.width[i],
							height: modelLineFrame.height[i]
						},
						count: 0
					});
				}
			}else{
				useFrameKitType.push({
					type: {
						width: modelLineFrame.width[i],
						height: modelLineFrame.height[i]
					},
					count: 0
				});
			}
		}
		
		pageTotal = useFrameKitType.length;
		for(var i = 0; i < pageTotal; ++i){
			useFrameKitCount += useFrameKitType[i].count;
		}
		if(useFrameKitCount == 0){
			isMin = true;
			if(model.code == 'IF015H' || model.code == 'IF020H' || model.code == 'IF025H'){
				if(count.col <= colS[0]){
					for(var i = colTotal - 1; i >= 0; --i){
						if(i == colTotal - 1){
							if(count.col <= colS[i]){
								useFrameKitType[i].count += Math.ceil(count.col / colS[i]);
							}
						}else{
							if(count.col <= colS[i] && count.col > colS[i + 1]){
								useFrameKitType[i].count += Math.ceil(count.col / colS[i]);
							}
						}
					}
				}else{		
					var tmpQ_0 = Math.floor(count.col / colS[0]);
					var tmpR_0 = count.col % colS[0];
					useFrameKitType[0].count = tmpQ_0;
					if(tmpR_0 != 0){
						for(var i = colTotal - 1; i >= 0; --i){
							if(i == colTotal - 1){
								if(tmpR_0 <= colS[i]){
									useFrameKitType[i].count += Math.ceil(tmpR_0 / colS[i]);
								}
							}else{
								if(tmpR_0 <= colS[i] && tmpR_0 > colS[i + 1]){
									useFrameKitType[i].count += Math.ceil(tmpR_0 / colS[i]);
								}
							}
						}
					}
				}
			}else{
				colIdx = colTotal - 1;
				useFrameKitType[colIdx].count = Math.ceil(count.col / colS[colIdx] );				
			}
		}
		model.useFrameKit = {
				type: useFrameKitType,
				count: useFrameKitCount,
				total: pageTotal,
				page: (function(){
					var page = 0;
					$.each(useFrameKitType, function(_idx){
						if(this.count != 0)	page += 1;
					});
					return page - 1;
				})()
		};
	}
	function mechanicalType(_pageNum, _completeFunc){
		var pdf = doc.pdf, 
			startPos = {x: doc.space.x, y: content.startY + 10}, // 모델 추가		
			img = {
				typeUrl: {
					'3*2': '/static/images/support/pdf_framekit_3x2.jpg',
					'3*3': '/static/images/support/pdf_framekit_3x3.jpg',
					'6*3': '/static/images/support/pdf_framekit_6x3.jpg',
					'8*4': '/static/images/support/pdf_framekit_8x4.jpg',
					'10*5': '/static/images/support/pdf_framekit_10x5.jpg',
					'8*1': '/static/images/support/pdf_framekit_8x1.jpg',
					'8*2': '/static/images/support/pdf_framekit_8x2.jpg',
					'8*3': '/static/images/support/pdf_framekit_8x3.jpg'
				},
				size: {
					width: doc.content.width
				}
			},
			colS = modelLineFrame.width,
			colTotal = colS.length, 
			colLine = [],
			colIdx,
			useFrameKitType = model.useFrameKit.type, 
			pageNum = 0, 
			pageTotal = model.useFrameKit.total, 
			useFrameKitCount = model.useFrameKit.count,
			isMin = false;		
		
		if(useFrameKitCount == 0){
			isMin = true;
			if(model.code == 'IF015H' || model.code == 'IF020H' || model.code == 'IF025H'){
				util.getBase64Image(img.typeUrl[useFrameKitType[0].type.width + '*' + useFrameKitType[0].type.height], drawFrameKitType0);
			}else{
				colIdx = colTotal - 1;
				util.getBase64Image(img.typeUrl[useFrameKitType[colIdx].type.width + '*' + useFrameKitType[colIdx].type.height], drawFrameKitType);				
			}
		}else{
			util.getBase64Image(img.typeUrl[useFrameKitType[0].type.width + '*' + useFrameKitType[0].type.height], drawFrameKitType0);
		}
		
		function drawFrameKitType(_dataUrl, _ratio){
			img.image = _dataUrl;
			img.size.ratio = _ratio;
			img.size.height = img.size.width * img.size.ratio;
			pdf.addImage(img.image, 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);	
			pdf.setFontSize(10);
			pdf.text(startPos.x, startPos.y - 5, 'LED DISPLAY ' + ARR_MODEL_LINE[model.code] + ' series FRAME KIT ' + useFrameKitType[colIdx].type.width + 'X' + useFrameKitType[colIdx].type.height);
			
			drawFrameKitTypeTable({x: startPos.x, y: footer.startY - doc.space.y});
			if(_completeFunc)	_completeFunc(_pageNum + 1);
		}
		function drawFrameKitType0(_dataUrl, _ratio){
			if(useFrameKitType[0].count > 0){
				img.image = _dataUrl;
				img.size.ratio = _ratio;
				img.size.height = img.size.width * img.size.ratio;
				pdf.addImage(img.image, 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
				pdf.setFontSize(10);
				pdf.text(startPos.x, startPos.y - 5, 'LED DISPLAY ' + ARR_MODEL_LINE[model.code] + ' series FRAME KIT ' + useFrameKitType[0].type.width + 'X' + useFrameKitType[0].type.height);
			}
			if(pageNum < pageTotal - 1){
				util.getBase64Image(img.typeUrl[useFrameKitType[1].type.width + '*' + useFrameKitType[1].type.height], drawFrameKitType1);				
				pageNum += 1;
			}else{
				drawFrameKitTypeTable({x: startPos.x, y: footer.startY - doc.space.y});
				if(_completeFunc)	_completeFunc(_pageNum + 1);
			}
		}
		function drawFrameKitType1(_dataUrl, _ratio){
			if(useFrameKitType[1].count > 0){
				if(useFrameKitType[0].count > 0){
					pdf.addPage();
					drawLayout.drawHeader(_pageNum, true);
					drawLayout.drawTitle(_pageNum, true);
					drawLayout.drawFooter(_pageNum, true);
				}
				img.image = _dataUrl;
				if(!img.size.ratio)	img.size.ratio = _ratio;
				if(!img.size.height)	img.size.height = img.size.width * img.size.ratio;
				pdf.addImage(img.image, 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
				pdf.setFontSize(10);
				pdf.text(startPos.x, startPos.y - 5, 'LED DISPLAY ' + ARR_MODEL_LINE[model.code] + ' series FRAME KIT ' + useFrameKitType[1].type.width + 'X' + useFrameKitType[1].type.height);
			}
			if(pageNum < pageTotal - 1){
				if(useFrameKitType[2]){
					util.getBase64Image(img.typeUrl[useFrameKitType[2].type.width + '*' + useFrameKitType[2].type.height], drawFrameKitType2);
					pageNum += 1;
				}
			}else{
				drawFrameKitTypeTable({x: startPos.x, y: footer.startY - doc.space.y});
				if(_completeFunc)	_completeFunc(_pageNum + 1);
			}
		}
		function drawFrameKitType2(_dataUrl, _ratio){
			if(useFrameKitType[2].count > 0){
				if(useFrameKitType[0].count <= 0 && useFrameKitType[1].count <= 0){
				}else{
					pdf.addPage();
					drawLayout.drawHeader(_pageNum, true);
					drawLayout.drawTitle(_pageNum, true);
					drawLayout.drawFooter(_pageNum, true);
				}
				img.image = _dataUrl;
				if(!img.size.ratio)	img.size.ratio = _ratio;
				if(!img.size.height)	img.size.height = img.size.width * img.size.ratio;
				pdf.addImage(img.image, 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
				pdf.setFontSize(10);
				pdf.text(startPos.x, startPos.y - 5, 'LED DISPLAY ' + ARR_MODEL_LINE[model.code] + ' series FRAME KIT ' + useFrameKitType[2].type.width + 'X' + useFrameKitType[2].type.height);
			}
			
			drawFrameKitTypeTable({x: startPos.x, y: footer.startY - doc.space.y});
			if(_completeFunc)	_completeFunc(_pageNum + 1);
		}
				
		function drawFrameKitTypeTable(_pos){
			var pos = _pos, color = [{r: 223, g: 234, b: 247}, {r: 0, g: 0, b: 0}], 
				row = 0, rowTotal = modelLineFrame.width.length, col = 0, colTotal = 4, 
				typeTotal = modelLineFrame.width.length, height = 12, width = doc.content.width / 4;
			
			pdf.setFillColor(color[0].r, color[0].g, color[0].b);
			pdf.rect(pos.x, pos.y - height * typeTotal, width, height * typeTotal, 'F');
			pdf.setFontSize(10);
			pdf.text(pos.x + 13, pos.y - height * typeTotal + typeTotal / 2 * height + 1.5, 'Frame Kits');			
			
			pdf.setDrawColor(color[1].r, color[1].g, color[1].b);
		    pdf.setLineWidth(0.1);
		    for(col = 0; col < colTotal; ++col){
		    	if(col >= 2){
		    		pdf.line(pos.x + width * col + width, pos.y, pos.x + width * col + width, pos.y - height * rowTotal)
		    	}else{
		    		pdf.line(pos.x + width * col, pos.y, pos.x + width * col, pos.y - height * rowTotal)
		    	}
		    }
		    for(row = 0; row <= rowTotal; ++row){
		    	(row == 0 || row == rowTotal) ? pdf.line(pos.x, pos.y - height * row, pos.x + width * colTotal, pos.y - height * row) : pdf.line(pos.x + width, pos.y - height * row, pos.x + width * colTotal, pos.y - height * row);
		    	if(row != rowTotal){
		    		pdf.text(pos.x + width + 5, (pos.y - height * typeTotal) + height * row + 7.5, 'Mount Framekit for ' + ARR_MODEL_LINE[model.code] + ' ' + modelLineFrame.width[row] + 'x' + modelLineFrame.height[row]);	
		    		if(useFrameKitType[row] == undefined){
		    			pdf.text(pos.x + width * 3 + 23, (pos.y - height * typeTotal) + height * row + 7.5, String(0));
		    		}else{
		    			pdf.text(pos.x + width * 3 + 23, (pos.y - height * typeTotal) + height * row + 7.5, String(useFrameKitType[row].count));
		    		}
		    	}
		    }		
		    if(isMin == true){
		    	pdf.setFontSize(8);
		    	pdf.setFontType("italic");
		    	pdf.text(pos.x + 16, (pos.y - height * typeTotal) + height * rowTotal + 3.5, '* Above framkit config does not match input screen size. Pls contact local representatives to further review optimal frame kit options.');
		    }
		}
	}
	function mechanicalDrawing(_pageNum, _completeFunc){
		var pdf = doc.pdf, space = {x: 12, y: 12},
			startPos = {x: doc.space.x + space.x, y: content.startY + space.y},
			size = {width: (doc.content.width - space.x) / model.display.col, height: (doc.content.width - space.x) / model.display.col * model.display.ratio},			 
			count = {col: model.display.col, row: model.display.row},			
			img = {
				'IFJ': {
					left: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCQTFCRUIzOTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCQTFCRUIyOTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE5NTJkZDgyLTg1NDEtNGI0ZS04ZGQ3LWExYTVkNzIxMGUzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+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',
					middle: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCQTFCRUI3OTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCQTFCRUI2OTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE5NTJkZDgyLTg1NDEtNGI0ZS04ZGQ3LWExYTVkNzIxMGUzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+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',
					right: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCQThFMkQxOTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCQThFMkQwOTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE5NTJkZDgyLTg1NDEtNGI0ZS04ZGQ3LWExYTVkNzIxMGUzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'
				},
				'IFD': {
					left: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/4QN7aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc1Qzk4QTI3OTE3QzExRTg4NjVFREJENEE4MUY2MDZBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc1Qzk4QTI2OTE3QzExRTg4NjVFREJENEE4MUY2MDZBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg4ODkyNzY1NzQ5MUU4MTE5NTI0OTQyODNFNEY0NjdEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2YzkyMmQzLWI4M2ItZTY0YS1iN2JlLTY4OTNmNjgxMDYwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9y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',
					middle: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/4QN7aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc1Qzk4QTJCOTE3QzExRTg4NjVFREJENEE4MUY2MDZBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc1Qzk4QTJBOTE3QzExRTg4NjVFREJENEE4MUY2MDZBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg4ODkyNzY1NzQ5MUU4MTE5NTI0OTQyODNFNEY0NjdEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2YzkyMmQzLWI4M2ItZTY0YS1iN2JlLTY4OTNmNjgxMDYwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9y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',
					right: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN7aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc1RDM0RTQ4OTE3QzExRTg4NjVFREJENEE4MUY2MDZBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc1RDM0RTQ3OTE3QzExRTg4NjVFREJENEE4MUY2MDZBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg4ODkyNzY1NzQ5MUU4MTE5NTI0OTQyODNFNEY0NjdEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2YzkyMmQzLWI4M2ItZTY0YS1iN2JlLTY4OTNmNjgxMDYwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9y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'
				},
				'IFH': {
					left: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCQTFCRUIzOTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCQTFCRUIyOTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE5NTJkZDgyLTg1NDEtNGI0ZS04ZGQ3LWExYTVkNzIxMGUzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+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',
					middle: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCQTFCRUI3OTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCQTFCRUI2OTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE5NTJkZDgyLTg1NDEtNGI0ZS04ZGQ3LWExYTVkNzIxMGUzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+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',
					right: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCQThFMkQxOTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCQThFMkQwOTE3ODExRThBQUUyRTMyRjJBQzM3OTVCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE5NTJkZDgyLTg1NDEtNGI0ZS04ZGQ3LWExYTVkNzIxMGUzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'
				},
				url: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN3aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM2OUQ1REU3OEMzMTExRTg4NjY4RkU2MUNCOTNDRUJCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM2OUQ1REU2OEMzMTExRTg4NjY4RkU2MUNCOTNDRUJCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEZFMEMzQTNCQjg4RTgxMUE1MThGMzREN0U0OTY3NzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpS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',
				size: {
					width: (content.width - space.x) / count.col
				}
			},
			arr = {
				left: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAOCAYAAAASVl2WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Njc3RjE5NzVBNkFDMTFFODk4MkVBOEFGMTUzOUU0REMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Njc3RjE5NzRBNkFDMTFFODk4MkVBOEFGMTUzOUU0REMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RkUwQzNBM0JCODhFODExQTUxOEYzNEQ3RTQ5Njc3NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6v7LOJAAAAYklEQVR42mJgwA2YgLgXlyQHEK8B4v/YJIWB+ChUEkOBMhDfQpJEUWAOxC/RJOEKAoD4KxZJsIJcIP6DQ/I/yCuMDEQAkBXfcFmB7MhX+BQQ9CZRAYUR1Mw4FPyBKuAFCDAAsccxbsKTM9cAAAAASUVORK5CYII=',
				right: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAOCAYAAAASVl2WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Njc3RjE5NzlBNkFDMTFFODk4MkVBOEFGMTUzOUU0REMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Njc3RjE5NzhBNkFDMTFFODk4MkVBOEFGMTUzOUU0REMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RkUwQzNBM0JCODhFODExQTUxOEYzNEQ3RTQ5Njc3NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7NGv86AAAAXElEQVR42mJgYGDoA2ImBjzgPxCvAWIOfApA+CgQC+NTAMK3gFgZnwIQfgnE5vgUgPBXIA4ASTJCBbCBv0BchNd7+Kz4BsSBuBS8wudIvN4EBZQIWUGNN7IAAgwAFLErVPtOoCMAAAAASUVORK5CYII=',
				top: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAICAYAAADJEc7MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjdBMDg0OUZBNkFDMTFFODk4MkVBOEFGMTUzOUU0REMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjdBMDg0OUVBNkFDMTFFODk4MkVBOEFGMTUzOUU0REMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RkUwQzNBM0JCODhFODExQTUxOEYzNEQ3RTQ5Njc3NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5rrrbjAAAAXklEQVR42mJgwA0yoZgk4AfEf6DYj1hN5kD8FYj/Q/FXqBheoALEr5A0wfArqBxWIArEt7FoguHbUDUogAuIT+DRBMMnoGrBgBGI1xOhCYY3AjEzSGM7CZpguB0gwADpDjenJtCv8QAAAABJRU5ErkJggg==',
				bottom: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAICAYAAADJEc7MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjdBMDg0QTNBNkFDMTFFODk4MkVBOEFGMTUzOUU0REMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjdBMDg0QTJBNkFDMTFFODk4MkVBOEFGMTUzOUU0REMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RkUwQzNBM0JCODhFODExQTUxOEYzNEQ3RTQ5Njc3NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ZoGn1AAAAWklEQVR42mJgYGDoAuL/JOI+IGZgBuKNJGjaCNUDBlxAfIIITSegalGAKBDfxqPpNlQNVqACxK+waHoFlcMLzIH4K5Kmr1AxooAfEP+BYj8GEkEmFGMFAAEGAK6PN7WWP4M7AAAAAElFTkSuQmCC',
				size: {
					width: 8,
					height: 14
				}
			},
			col = 0, row = 0, colTotal = count.col, rowTotal = count.row, legendH = 30, copyH = 5, tmpImgUrl;
			
		img.size.height = img.size.width * model.display.ratio;
		
		if(img.size.height * count.row > content.height - legendH){
			img.size.height = (content.height - legendH) / count.row;
			img.size.width = img.size.height / model.display.ratio;
			startPos.x = doc.space.x + (content.width + space.x - img.size.width * count.col) / 2;
		}
		
		pdf.setDrawColor(25, 25, 25);
	    pdf.setLineWidth(0.1);
	    
	    if(count.col == 1){
	    	for(row = 0; row < rowTotal; ++row){
	    		pdf.addImage(img.url, 'JPEG', startPos.x, startPos.y + img.size.height * row, img.size.width, img.size.height);
			}
	    }else{
	    	for(col = 0; col < colTotal; ++col){
				for(row = 0; row < rowTotal; ++row){
					if(col == 0){
						tmpImgUrl = img[ARR_MODEL_LINE[model.code]].left;
					}else{
						if(col == colTotal - 1){
							tmpImgUrl = img[ARR_MODEL_LINE[model.code]].right;
						}else{
							tmpImgUrl = img[ARR_MODEL_LINE[model.code]].middle;
						}
					}
					pdf.addImage(tmpImgUrl, 'JPEG', startPos.x + img.size.width * col, startPos.y + img.size.height * row, img.size.width, img.size.height);
				}
			}
	    }
	    
	    pdf.setFontType('italic');
	    pdf.setFontSize(8);
	    pdf.text('* This figures below is the cabinet length on mounted position.', doc.space.x + doc.content.width - 78, startPos.y + img.size.height * rowTotal + copyH);
	    pdf.setFontType('normal');
	    
		pdf.line(doc.space.x, startPos.y, startPos.x, startPos.y);
	    pdf.line(doc.space.x, startPos.y + img.size.height * rowTotal, startPos.x, startPos.y + img.size.height * rowTotal);
	    pdf.line(doc.space.x + 3, startPos.y, doc.space.x + 3, startPos.y + img.size.height * rowTotal);
	    
	    pdf.line(doc.space.x + space.x / 2, startPos.y + img.size.height, startPos.x, startPos.y + img.size.height);
	    pdf.line(doc.space.x + space.x / 2 + 3, startPos.y,  doc.space.x + space.x / 2 + 3, startPos.y + img.size.height);
	    
	    pdf.setFontSize(7);
	    pdf.setTextColor(25, 25, 25);
	    pdf.text(doc.space.x + doc.content.width - 6, content.startY - space.y/2 + 1, '(mm)');
	    
	    pdf.text(doc.space.x + 2, startPos.y + img.size.height * rowTotal / 2, String((model.display.height * rowTotal).toFixed(1)), null, 90);
	    pdf.text(doc.space.x + space.x / 2 + 2, startPos.y + img.size.height / 2 + 2, String((model.display.height).toFixed(1)), null, 90);
	    
	    pdf.line(startPos.x, startPos.y - space.y, startPos.x, startPos.y);
	    pdf.line(startPos.x + img.size.width * colTotal, startPos.y - space.y, startPos.x + img.size.width * colTotal, startPos.y);
	    pdf.line(startPos.x + img.size.width, startPos.y - space.y / 2, startPos.x + img.size.width, startPos.y);
	    
	    pdf.line(startPos.x, startPos.y - space.y + 3, startPos.x + img.size.width * colTotal, startPos.y - space.y + 3);
	    pdf.line(startPos.x, startPos.y - 3, startPos.x + img.size.width, startPos.y - 3);
	    
	    pdf.text(startPos.x + img.size.width * colTotal / 2 - 3, startPos.y - space.y + 2, String((model.display.width * colTotal).toFixed(1)));
	    pdf.text(startPos.x + img.size.width / 2 - 3, startPos.y - space.y / 2 + 2, String((model.display.width).toFixed(1)));
	    
	    arr.ratio = arr.size.height / arr.size.width;
	    arr.size.width = 1;
	    arr.size.height = arr.size.width * arr.ratio;
	    pdf.addImage(arr.top, 'JPEG', doc.space.x + 3 - arr.size.height / 2, startPos.y, arr.size.height, arr.size.width);
	    pdf.addImage(arr.bottom, 'JPEG', doc.space.x + 3 - arr.size.height / 2,startPos.y + img.size.height * rowTotal - arr.size.width, arr.size.height, arr.size.width);
	    pdf.addImage(arr.top, 'JPEG', doc.space.x + space.x / 2 + 3 - arr.size.height / 2, startPos.y, arr.size.height, arr.size.width);
	    pdf.addImage(arr.bottom, 'JPEG', doc.space.x + space.x / 2 + 3 - arr.size.height / 2,startPos.y + img.size.height - arr.size.width, arr.size.height, arr.size.width);
	    
	    pdf.addImage(arr.left, 'JPEG', startPos.x, startPos.y - space.y + 3 - arr.size.height / 2, arr.size.width, arr.size.height);
	    pdf.addImage(arr.right, 'JPEG', startPos.x + img.size.width * colTotal - arr.size.width, startPos.y - space.y + 3 - arr.size.height / 2, arr.size.width, arr.size.height);	    
	    pdf.addImage(arr.left, 'JPEG', startPos.x, startPos.y - 3 - arr.size.height / 2, arr.size.width, arr.size.height);	    
	    pdf.addImage(arr.right, 'JPEG', startPos.x + img.size.width - arr.size.width, startPos.y - 3 - arr.size.height / 2, arr.size.width, arr.size.height);
	    
	    
		
		if(_completeFunc)	_completeFunc(_pageNum + 1);
	}
	function powerFlow110(_pageNum, _completeFunc){
		var pdf = doc.pdf,
			startPos = {x: doc.space.x, y: content.startY}, 
			size = {width: content.width / model.display.col, height: content.width / model.display.col * model.display.ratio},
			count = {col: model.display.col, row: model.display.row}, legendH = 44;
		
		if(size.height * count.row > content.height - legendH){
			size.height = (content.height - legendH) / count.row;
			size.width = size.height / model.display.ratio;
			startPos.x = doc.space.x + (content.width - size.width * count.col) / 2;
		}
		
		diagram.drawCabinet(pdf, count, startPos, size);
		diagram.drawPort(pdf, count, startPos, size);
		diagram.drawPowerFlow(pdf, count, startPos, size, '110v');		
		if(_completeFunc)	_completeFunc(_pageNum + 1);
	}
	function powerFlow220(_pageNum, _completeFunc){
		var pdf = doc.pdf, 
			startPos = {x: doc.space.x, y: content.startY}, 
			size = {width: doc.content.width / model.display.col, height: doc.content.width / model.display.col * model.display.ratio},
			count = {col: model.display.col, row: model.display.row}, legendH = 44;
		
		if(size.height * count.row > content.height - legendH){
			size.height = (content.height - legendH) / count.row;
			size.width = size.height / model.display.ratio;
			startPos.x = doc.space.x + (content.width - size.width * count.col) / 2;
		}
		
		diagram.drawCabinet(pdf, count, startPos, size);
		diagram.drawPort(pdf, count, startPos, size);
		diagram.drawPowerFlow(pdf, count, startPos, size, '220v');
		if(_completeFunc)	_completeFunc(_pageNum + 1);
	}
	function dataFlow(_pageNum, _completeFunc){
		var pdf = doc.pdf, port, line, space = {x: 0, y: 0},
			startPos = {x: doc.space.x + space.x, y: content.startY + space.y},
			size = {width: (doc.content.width - space.x) / model.display.col, height: (doc.content.width - space.x) / model.display.col * model.display.ratio},			 
			count = {col: model.display.col, row: model.display.row},
			color = {r: 41, g: 56, b: 149},			 
			fhd = {col: ARR_DATA_CABLE_FHD[model.code].col, row: ARR_DATA_CABLE_FHD[model.code].row},
			col, colTotal, row, rowTotal, pos = {}, 
			font = {size: 10, color: {r: 0, g: 0, b: 0}}, 
			legendH = 35,
			maze, rabbits;
		
		if(size.height * count.row > content.height - legendH){
			size.height = (content.height - legendH) / count.row;
			size.width = size.height / model.display.ratio;
			startPos.x = doc.space.x + (content.width - size.width * count.col) / 2;
		}
		
		diagram.drawCabinet(pdf, count, startPos, size);
		port = diagram.drawPort(pdf, count, startPos, size);	
		drawLegend({x: startPos.x + 3, y: startPos.y + size.height * count.row + 5});
		
		line = port.width * 0.2;
		fhd.width = size.width * fhd.col;
		fhd.height = size.height * fhd.row;
		startPos.x += size.width / 2;
		startPos.y += size.height / 2;
						
		pdf.setDrawColor(color.r, color.g, color.b);
	    pdf.setLineWidth(line);
	    pdf.setLineCap("round");
	    
	    pdf.setFontSize(font.size);
	    pdf.setTextColor(font.color.r, font.color.g, font.color.b);
	    
	    maze = new Maze(count.col, count.row, fhd.col, fhd.row);
	    rabbits = maze.run();
	    
	    rowTotal = rabbits.length;
	    for(row = 0; row < rowTotal; ++row){
	    	for(col = 0; col < rabbits[row].length; ++col){
    			if(col < rabbits[row].length - 1){
    				pos.x = startPos.x + rabbits[row][col][0] * size.width;
    				pos.y = startPos.y + rabbits[row][col][1] * size.height;
    				if(col == 0)	drawIG(pos, port, line);
	    			pdf.line(pos.x, pos.y, startPos.x + rabbits[row][col + 1][0] * size.width, startPos.y + rabbits[row][col + 1][1] * size.height);
    			}
    		}
	    }
	    function drawIG(_pos, _size, _line){
	    	var pos = _pos, line = _line, color = {r: 41, g: 56, b: 149};	    	
	    	pdf.setFillColor(color.r, color.g, color.b);
	    	pdf.circle(pos.x, pos.y, _size.height / 2, 'FD');
	    }
	    function drawLegend(_pos){
	    	var pos = _pos, color = [{r: 41, g: 56, b: 149}, {r: 160, g: 160, b: 160}];
	    	
	    	pdf.setFontSize(8);
	    	
	    	pdf.setDrawColor(color[0].r, color[0].g, color[0].b);
	    	pdf.setLineWidth(1);
	    	pdf.setFillColor(color[0].r, color[0].g, color[0].b);
	    	pdf.circle(pos.x + 1, pos.y + 2, 4.2 / 2, 'FD');
	    	pdf.text(pos.x + 7, pos.y + 3, 'Primary Video Cable Input');
	    	
	    	pdf.setDrawColor(0);
	    	pdf.setFillColor(color[1].r, color[1].g, color[1].b);
	    	pdf.rect(pos.x - 2, pos.y + 2 + 5, 5.9, 3.6, 'F');
	    	pdf.text(pos.x + 7, pos.y + 3 + 6.5, 'Video & Communication Input');
	    	
	    	pdf.setDrawColor(color[0].r, color[0].g, color[0].b);
	    	pdf.setLineCap('square');
	        pdf.setLineWidth(1);
	    	pdf.line(pos.x - 1.8, pos.y + 2 + 5 + 8, pos.x - 1.8 + 5.5, pos.y + 2 + 5 + 8);
	    	pdf.text(pos.x + 7, pos.y + 3 + 13, 'Video & Communication Cables');
	    }
		
		if(_completeFunc)	_completeFunc(_pageNum + 1);
	}
	function ventilationGuide(_pageNum, _completeFunc){
		var pdf = doc.pdf,
			docProp = {startX : content.startX , startY : content.startY, width : content.width},
			specProp = {
				width: docProp.width / 3,
				height: 7.5,
				startX: docProp.startX,
				startY: docProp.startY,
				headerH: 15
			},
			fontProp = {
				size : {
					header : {
						stitle : 50
					},
					render : {
						model : 6.5,
						measure : 6
					}
				},
				weight : {
					normal : 'normal',
					bold : 'bold',
					italic: 'italic'
				}	
			},
			constData = ARR_VENTILATION_DATA[model.code],
			temperData = ARR_VENTILATION['temperature'],
			ledspecData = ARR_VENTILATION['led_spec'],
			outlettempData = ARR_VENTILATION['outlet_temperature'],
			overallemisData = ARR_VENTILATION['overall_emissivity'],
			marginData = ARR_VENTILATION['margin'],
			ventilationData = {};
		
		ventilationData = setVentilationData();
		drawTable(pdf, ventilationData);
		if(_completeFunc)	_completeFunc(_pageNum + 1);
		function setVentilationData(){
			var data = {}, iTemp = 0, tempTotal = temperData.length, temp;
			for(; iTemp < tempTotal; ++iTemp){
				temp = String(temperData[iTemp]);
				data[temp] = {};
				data[temp]['temp'] = Number(temperData[iTemp]);
				data[temp]['tcon_spec'] = constData['tcon_spec'] + 40 - data[temp]['temp'];
				data[temp]['led_surface'] = constData['v_intercept'] + constData['v_inclination'] * (model.display.row - 1) + constData['h_inclination'] * (model.display.col - 1) / 2 + data[temp]['temp'] - 25;
				data[temp]['tcon_ic'] = data[temp]['led_surface'] * constData['tcon_inclination'] + constData['tcon_intercept'];
				data[temp]['has_fan'] = ((data[temp]['led_surface'] > ledspecData) || (data[temp]['tcon_ic'] > data[temp]['tcon_spec'])) ? 1 : 0;
				data[temp]['density'] = {};
				data[temp]['density']['entrance'] = 1.2902 - 0.00473 * data[temp]['temp'] + 1.97407 * Math.pow(10, -5) * Math.pow(data[temp]['temp'], 2) - 7.65276 * Math.pow(10, -8) * Math.pow(data[temp]['temp'], 3);
				data[temp]['density']['exit'] = 1.2902 - 0.00473 * outlettempData + 1.97407 * Math.pow(10, -5) * Math.pow(outlettempData, 2) - 7.65276 * Math.pow(10, -8) * Math.pow(outlettempData, 3);
				data[temp]['specificheat'] = {};
				data[temp]['specificheat']['entrance'] = 1006.32461 + 0.03491 * data[temp]['temp'] - 0.00109 * Math.pow(data[temp]['temp'], 2) + 1.75726 * Math.pow(10, -5) * Math.pow(data[temp]['temp'], 3) - 8.37239 * Math.pow(10, -8) * Math.pow(data[temp]['temp'], 4);
				data[temp]['specificheat']['exit'] = 1006.32461 + 0.03491 * outlettempData - 0.00109 * Math.pow(outlettempData, 2) + 1.75726 * Math.pow(10, -5) * Math.pow(outlettempData, 3) - 8.37239 * Math.pow(10, -8) * Math.pow(outlettempData, 4);
				data[temp]['fanmeter'] = parseInt(model.display.row * constData['power_consumption'] * (1 - overallemisData) / (data[temp]['specificheat']['exit'] * data[temp]['density']['exit'] * outlettempData - data[temp]['specificheat']['entrance'] * data[temp]['density']['entrance'] * data[temp]['temp']) * (1 + marginData) * 60 * Math.pow(3.28084, 3));
				if(data[temp]['fanmeter'] % 5 != 0){
					data[temp]['fanmeter'] = Math.round(data[temp]['fanmeter'] / 5) * 5;
				}
				data[temp]['column'] = Math.round(data[temp]['fanmeter'] * data[temp]['has_fan']);
				data[temp]['total'] = (model.display.col * data[temp]['column']) ? model.display.col * data[temp]['column'] : "No fan required" ;
			}
			return data;
		}
		function drawTable(_doc, _data){
			var data = _data, iRow = 0, totalRow = 4, space = {x : 5, y : 2.5, groupY : 2}, startY = specProp.startY + specProp.headerH + 5;
		    
			_doc.setDrawColor(0);
		    _doc.setFillColor(67, 70, 85);
		    _doc.rect(specProp.startX, specProp.startY, docProp.width, 10, 'F');
		    
		    _doc.setFontSize(9);	
		    _doc.setFontType(fontProp.weight.normal);
		    _doc.setTextColor(0, 0, 0);
		    _doc.text(specProp.startX + doc.content.width - 10, specProp.startY - space.y, '(CFM)');	
		    
		    _doc.setFontSize(10);
		    _doc.setFontType(fontProp.weight.bold);
		    _doc.setTextColor(255, 255, 255);
		    _doc.text(specProp.startX + space.x + 15, specProp.startY + specProp.height / 2 + space.y, 'Temperature');		    
		    _doc.text(specProp.startX + specProp.width + space.x + 2, specProp.startY + specProp.height / 2 + space.y, 'FAN flow per a column');
		    _doc.text(specProp.startX + specProp.width * 2 + space.x + 2, specProp.startY + specProp.height / 2 + space.y, 'Total FAN flow');
		    		    
			specProp.startY += 10;
			
		    _doc.setDrawColor(0);
		    _doc.setFillColor(232, 240, 255);
		    _doc.rect(specProp.startX, specProp.startY, specProp.width, specProp.height * totalRow, 'F');
	
		    _doc.setDrawColor(199, 210, 238);
		    _doc.setLineWidth(0.1);
		    _doc.line(specProp.startX + specProp.width, specProp.startY, specProp.startX + specProp.width, specProp.startY + specProp.height * totalRow);
		    _doc.line(specProp.startX + specProp.width * 2, specProp.startY, specProp.startX + specProp.width * 2, specProp.startY + specProp.height * totalRow);
		    
		    for(; iRow <= totalRow; ++iRow){
		    	_doc.line(specProp.startX, specProp.startY + specProp.height * iRow, specProp.startX + docProp.width, specProp.startY + specProp.height * iRow);
		    }
		    
		    _doc.setFontType(fontProp.weight.normal);
		    _doc.setTextColor(71, 116, 207);	
		    _doc.text(specProp.startX + space.x + 22, specProp.startY + specProp.height * 1 - space.y, '15°');
		    _doc.text(specProp.startX + space.x + 22, specProp.startY + specProp.height * 2 - space.y, '20°');
		    _doc.text(specProp.startX + space.x + 22, specProp.startY + specProp.height * 3 - space.y, '25°');
		    _doc.text(specProp.startX + space.x + 22, specProp.startY + specProp.height * 4 - space.y, '30°');
		    
		    _doc.setTextColor(63, 63, 63);		    
		    _doc.text(specProp.startX + specProp.width + space.x + 2, specProp.startY + specProp.height * 1 - space.y, String(data['15']['column']));
		    _doc.text(specProp.startX + specProp.width + space.x + 2, specProp.startY + specProp.height * 2 - space.y, String(data['20']['column']));
		    _doc.text(specProp.startX + specProp.width + space.x + 2, specProp.startY + specProp.height * 3 - space.y, String(data['25']['column']));
		    _doc.text(specProp.startX + specProp.width + space.x + 2, specProp.startY + specProp.height * 4 - space.y, String(data['30']['column']));
		    
		    _doc.text(specProp.startX + specProp.width * 2 + space.x + 2, specProp.startY + specProp.height * 1 - space.y, String(data['15']['total']));
		    _doc.text(specProp.startX + specProp.width * 2 + space.x + 2, specProp.startY + specProp.height * 2 - space.y, String(data['20']['total']));
		    _doc.text(specProp.startX + specProp.width * 2 + space.x + 2, specProp.startY + specProp.height * 3 - space.y, String(data['25']['total']));
		    _doc.text(specProp.startX + specProp.width * 2 + space.x + 2, specProp.startY + specProp.height * 4 - space.y, String(data['30']['total']));
		    
		    
		    
		    
//		    doc.setFontType(fontProp.weight.italic);
//		    doc.text(specProp.startX, startY + specProp.height * 8 - space.y, 'If you have interests in custom size larger than either row or column, check to local tech');
//		    doc.text(specProp.startX, startY + specProp.height * 8 + space.y, 'representatives for additional guidance.');
		}		
	}
	function productInfo_0(_pageNum, _completeFunc){
		var pdf = doc.pdf, startPos = {x : content.startX , y : content.startY - 1},
			img = {
				url: '/static/images/support/pdf_productinfo_0.jpg',
				size: {
					width: doc.content.width
				}
			}, i = 0, total = img.url.length;
		
		util.getBase64Image(img.url, drawProductInfo);
		function drawProductInfo(_dataUrl, _ratio){			
			img.image = _dataUrl;
			img.size.ratio = _ratio;
			img.size.height = img.size.width * img.size.ratio;				
			pdf.addImage(img.image , 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
			if(_completeFunc)	_completeFunc(_pageNum + 1)
		}
	}
	function productInfo_1(_pageNum, _completeFunc){
		var pdf = doc.pdf, startPos = {x : content.startX , y : content.startY - 1},
			img = {
				url: '/static/images/support/pdf_productinfo_1.jpg',
				size: {
					width: doc.content.width
				}
			}, i = 0, total = img.url.length;
		
		util.getBase64Image(img.url, drawProductInfo);
		function drawProductInfo(_dataUrl, _ratio){			
			img.image = _dataUrl;
			img.size.ratio = _ratio;
			img.size.height = img.size.width * img.size.ratio;				
			pdf.addImage(img.image , 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
			if(_completeFunc)	_completeFunc(_pageNum + 1)
		}
	}
	function productInfo_2(_pageNum, _completeFunc){
		var pdf = doc.pdf, startPos = {x : content.startX , y : content.startY - 1},
			img = {
				url: '/static/images/support/pdf_productinfo_2.jpg',
				size: {
					width: doc.content.width
				}
			}, i = 0, total = img.url.length;
		
		util.getBase64Image(img.url, drawProductInfo);
		function drawProductInfo(_dataUrl, _ratio){			
			img.image = _dataUrl;
			img.size.ratio = _ratio;
			img.size.height = img.size.width * img.size.ratio;				
			pdf.addImage(img.image , 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
			if(_completeFunc)	_completeFunc(_pageNum + 1)
		}
	}
	function productInfo_3(_pageNum, _completeFunc){
		var pdf = doc.pdf, startPos = {x : content.startX , y : content.startY - 1},
			img = {
				url: '/static/images/support/pdf_productinfo_3.jpg',
				size: {
					width: doc.content.width
				}
			}, i = 0, total = img.url.length;
		
		util.getBase64Image(img.url, drawProductInfo);
		function drawProductInfo(_dataUrl, _ratio){			
			img.image = _dataUrl;
			img.size.ratio = _ratio;
			img.size.height = img.size.width * img.size.ratio;				
			pdf.addImage(img.image , 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
			if(_completeFunc)	_completeFunc(_pageNum + 1)
		}
	}
	function productInfo_4(_pageNum, _completeFunc){
		var pdf = doc.pdf, startPos = {x : content.startX , y : content.startY - 1},
			img = {
				url: '/static/images/support/pdf_productinfo_4.jpg',
				size: {
					width: doc.content.width
				}
			}, i = 0, total = img.url.length;
		
		util.getBase64Image(img.url, drawProductInfo);
		function drawProductInfo(_dataUrl, _ratio){			
			img.image = _dataUrl;
			img.size.ratio = _ratio;
			img.size.height = img.size.width * img.size.ratio;				
			pdf.addImage(img.image , 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
			if(_completeFunc)	_completeFunc(_pageNum + 1)
		}
	}
	function productInfo_5(_pageNum, _completeFunc){
		var pdf = doc.pdf, startPos = {x : content.startX , y : content.startY - 1},
			img = {
				url: '/static/images/support/pdf_productinfo_5.jpg',
				size: {
					width: doc.content.width
				}
			}, i = 0, total = img.url.length;
		
		util.getBase64Image(img.url, drawProductInfo);
		function drawProductInfo(_dataUrl, _ratio){			
			img.image = _dataUrl;
			img.size.ratio = _ratio;
			img.size.height = img.size.width * img.size.ratio;				
			pdf.addImage(img.image , 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
			if(_completeFunc)	_completeFunc(_pageNum + 1)
		}
	}
	function productInfo_6(_pageNum, _completeFunc){
		var pdf = doc.pdf, startPos = {x : content.startX , y : content.startY - 1},
			img = {
				url: '/static/images/support/pdf_productinfo_6.jpg',
				size: {
					width: doc.content.width
				}
			}, i = 0, total = img.url.length;
		
		util.getBase64Image(img.url, drawProductInfo);
		function drawProductInfo(_dataUrl, _ratio){			
			img.image = _dataUrl;
			img.size.ratio = _ratio;
			img.size.height = img.size.width * img.size.ratio;				
			pdf.addImage(img.image , 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
			if(_completeFunc)	_completeFunc(_pageNum + 1)
		}
	}
	function productInfo_detailLink(_pageNum, _completeFunc){
		var pdf = doc.pdf, startPos = {x : content.startX , y : content.startY - 1},
			img = {
				url: {
					IFJ: '/static/images/support/pdf_productinfo_detailLink_IFJ.jpg',
					IFH: '/static/images/support/pdf_productinfo_detailLink_IFH.jpg',
					IFD: '/static/images/support/pdf_productinfo_detailLink_IFD.jpg',
					SBB: '/static/images/support/pdf_productinfo_detailLink_SBB.jpg'
				},
				size: {
					width: doc.content.width / 2 - 10
				}
			},
			btn = {
				img: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZjOTIyZDMtYjgzYi1lNjRhLWI3YmUtNjg5M2Y2ODEwNjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM2M0U0RUUxQTc2NjExRTg4QzNEODQxNUVDQkIyNDU3IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM2M0U0RUUwQTc2NjExRTg4QzNEODQxNUVDQkIyNDU3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmNhNjlkMDYyLWQ5ODUtMjU0Yy04MzRmLWNiMzc1N2IwMGRjZCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NmM5MjJkMy1iODNiLWU2NGEtYjdiZS02ODkzZjY4MTA2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQIBAQICAgECAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/wAARCACWAkQDAREAAhEBAxEB/8QA6gABAAIDAQEBAQEAAAAAAAAAAAkKBggLBwUEAwIBAQACAgMBAQAAAAAAAAAAAAAGBwQIAgUJAwEQAAAFAwEBDQUEBQgGCwEAAAACAwQFAQYHCAkREhMUFWeX11ioChoqtRY2dhchIhg4I7a3eBk11SY3p2joOjFBJDRVd1FCUyWWV0iImMg5eREAAQIDAgQQCQQLDwIEBwAAAAECEQMEEgUhMRMGQWEy4pOjFFRklFUWJgcIGFFxIrJz0zWlKIHCIxWRobFS0jN0tHUXN9FCYoKSolOz4zSk1ORlNiQ4wXKDRPDDhMQlRXb/2gAMAwEAAhEDEQA/ANQdmBsvrg2mE5mGDgMwQ2JFMRxNmSrlxMWe9u0k4S8HlxtE0UCMp+CqxMwrb1TGqaqtFKK03N7vft9M+tHrRpurKRRz6mjfVpWPmNRGzEl2cmjFisWujG3pQgVHctyrfCzESZk8nZ/e2o2o6aQhAl98qnkbtmWV0NTvWCKf7112cjT+MM9Ud9zJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148qnkbtmWV0NTvWCHeuuzkafxhnqhzJfvlNj148q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',
				url:{
					'IF012J': 'https://displaysolutions.samsung.com/led-signage/detail/1279/IF012J',
					'IF015H': 'https://displaysolutions.samsung.com/led-signage/detail/1092/IF015H',
					'IF020H': 'https://displaysolutions.samsung.com/led-signage/detail/1093/IF020H',
					'IF025H': 'https://displaysolutions.samsung.com/led-signage/detail/1094/IF025H',
					'IF025H-D': 'https://displaysolutions.samsung.com/led-signage/detail/1249/IF025H-D',
					'IF040H-D': 'https://displaysolutions.samsung.com/led-signage/detail/1250/IF040H-D',
					'IF060H-D': 'https://displaysolutions.samsung.com/led-signage/detail/1251/IF060H-D',
					'SBB': 'https://displaysolutions.samsung.com/led-signage/accessories/detail/1341/SBB-SNOWJ3U'
				},
				size: {
					width: 49,
					height: 12
				},
				ratio: 49 / 12.7
			},
			font = {
				size: {
					'IFJ': 4.3,
					'IFH': 4.3,
					'IFD': 4.3,
					'SBB': 4.3
				},
				gap: {
					'IFJ': 2,
					'IFH': 2,
					'IFD': 2,
					'SBB': 2
				},
				total: {
					'IFJ': 8,
					'IFH': 8,
					'IFD': 8,
					'SBB': 8
				},
				i: 0
				
			},
			i = 0, total = img.url.length;
		
		pdf.setFontType('bold');
		pdf.setTextColor(0, 0, 0);
		pdf.setFontSize(15);		
		util.getBase64Image(img.url[model.line], drawModel);
		function drawModel(_dataUrl, _ratio){			
			img.image = _dataUrl;
			img.size.ratio = _ratio;
			img.size.height = img.size.width * img.size.ratio;				
			pdf.addImage(img.image , 'JPEG', startPos.x, startPos.y, img.size.width, img.size.height);
			pdf.text(model.code, startPos.x + img.size.width / 2 - 8, startPos.y + img.size.height + 10);
			pdf.setTextColor(255, 255, 255);
			pdf.setFontSize(font.size[model.line]);
			for(font.i = 0; font.i < font.total[model.line]; font.i++){
				pdf.text(btn.url[model.code], startPos.x + 17, startPos.y + img.size.height + 16 + 1.5 * font.i);
			}
			pdf.addImage(btn.img , 'JPEG', startPos.x + 17, startPos.y + img.size.height + 15, btn.size.width, btn.size.height);
			
			
			pdf.setFontType('bold');
			pdf.setTextColor(0, 0, 0);
			pdf.setFontSize(15);	
			util.getBase64Image(img.url['SBB'], drawSbb);
			function drawSbb(_dataUrl, _ratio){			
				img.image = _dataUrl;
				img.size.ratio = _ratio;
				img.size.height = img.size.width * img.size.ratio;				
				pdf.addImage(img.image , 'JPEG', startPos.x + img.size.width + 20, startPos.y, img.size.width, img.size.height);
				pdf.text('SBB-SNOWJ3U', startPos.x + img.size.width + 20 + img.size.width / 2 - 18, startPos.y + img.size.height + 10);
				pdf.setTextColor(255, 255, 255);
				pdf.setFontSize(font.size['SBB']);
				for(font.i = 0; font.i < font.total['SBB']; font.i++){
					pdf.text(btn.url['SBB'], startPos.x + img.size.width + 20 + 17, startPos.y + img.size.height + 16 + 1.5 * font.i);
				}
				pdf.addImage(btn.img , 'JPEG', startPos.x + img.size.width + 20 + 17, startPos.y + img.size.height + 15, btn.size.width, btn.size.height);
				
				if(_completeFunc)	_completeFunc(_pageNum + 1)
			}
		}
	}
	function init(_pageNum){
		var pdf = doc.pdf, tmp = {};
		if(_pageNum <= doc.page.title.length - 1){
			if(model.hasDiagram == true){
				if(_pageNum === doc.page.title.length - 1){
					doc.page.drawContent[_pageNum](_pageNum, function(){
						$('#loading-layer').find('.newLoadingIn #loading-text span').text(100);
						//pdf.save("Samsung_LED_"+ model.code + doc.title + ".pdf");
					    //base64 encode
					    var binary = btoa(pdf.output());
					    var apiUrl = "/api/pdf/pdfUpload";
					    if(doc.os === 'I'){ /* 181005 :: os 판별 */
					    	$.ajax({
						    	cache : false,
						    	url:apiUrl,
						    	data: { configType: $('#configType').val(), modelName:model.code, device: $('#device').val(), pdf: binary },
						    	dataType: "json",
						    	timeout: 60000,
								async : true,
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
					    }else{
					    	$.ajax({
						    	cache : false,
						    	url:apiUrl,
						    	data: { configType: $('#configType').val(), modelName:model.code, device: $('#device').val(), pdf: binary },
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
					    }
					    
					    
						//Cookies.remove('LEDConfigValue', { path: '/' });
						util.setLoadingBar(false);
						
						
					});
				}else{
					doc.page.drawContent[_pageNum](_pageNum, drawLayout.init);
				}	
			}else{
				if(_pageNum === 2){
					doc.page.drawContent[_pageNum](_pageNum, function(){
						$('#loading-layer').find('.newLoadingIn #loading-text span').text(100);
						//pdf.save("Samsung_LED_"+ model.code + doc.title + ".pdf");
					    //base64 encode
					    var binary = btoa(pdf.output());
					    var apiUrl = "/api/pdf/pdfUpload";
					    $.ajax({
					    	cache : false,
					    	url:apiUrl,
					    	data: { pdf: binary, configType: $('#configType').val(), modelName:model.code, device: $('#device').val() },
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
						//Cookies.remove('LEDConfigValue', { path: '/' });
						util.setLoadingBar(false);
					});
				}else{
					doc.page.drawContent[_pageNum](_pageNum, drawLayout.init);
				}
			}
		}
	}
	return {
		init: init,
		preview: preview,
		ledRendering: ledRendering,
		screenSpec: screenSpec,
		productSpec: productSpec,
		cabinetDrawing: cabinetDrawing,
		mechanicalCalculate: mechanicalCalculate,
		mechanicalType: mechanicalType,
		mechanicalDrawing: mechanicalDrawing,
		powerFlow110: powerFlow110,
		powerFlow220: powerFlow220,
		dataFlow: dataFlow,
		ventilationGuide: ventilationGuide,
		productInfo_0: productInfo_0,
		productInfo_1: productInfo_1,
		productInfo_2: productInfo_2,
		productInfo_3: productInfo_3,
		productInfo_4: productInfo_4,
		productInfo_5: productInfo_5,
		productInfo_6: productInfo_6,
		productInfo_detailLink: productInfo_detailLink
	}
})();

util = (function(){
	function setCreateDate(){
		var today = new Date(), year = today.getFullYear(), month = ARR_MONTH[today.getMonth()], tmpDate = today.getDate(), date;
		
		if(tmpDate < 11){
			switch(tmpDate){
				case 1:
					date = tmpDate + 'st';
					break;				
				case 2:
					date = tmpDate + 'nd';
					break;				
				case 3:
					date = tmpDate + 'rd';
					break;			
				default:
					date = tmpDate + 'th';
					break;
			}
		}else if(tmpDate > 20 && tmpDate < 30){
			switch(tmpDate){
				case 21:
					date = tmpDate + 'st';
					break;				
				case 22:
					date = tmpDate + 'nd';
					break;				
				case 23:
					date = tmpDate + 'rd';
					break;			
				default:
					date = tmpDate + 'th';
					break;
			}
		}else{
			date = tmpDate + 'th';
		}	
		return (date + ' ' + month + ', ' + year);
	}
	function setCreator(){
		var name = $('#memberNm').val();
		return name;
	}
	function getBase64Image(_src, _callback, _idx) {
		var img = new Image(), canvas, context, dataURL, ratio;
		img.onload = function() {
			canvas = document.createElement('canvas');
			ctx = canvas.getContext('2d');
			canvas.height = this.naturalHeight;
			canvas.width = this.naturalWidth;
			ratio = canvas.height / canvas.width;
			ctx.drawImage(this, -0.3, 0);
			dataURL = canvas.toDataURL('image/jpeg');
			_callback(dataURL, ratio, _idx);
		};
		img.src = _src;
	}
	function isEmpty(_str) {
		var str = _str;
	    return (!str.trim() || typeof str == 'undefined' || str === null) ? '' : str;
	}
	function setLoadingBar(_view){
		var view = _view, $loadingLayer = $('#loading-layer'), $loading = $loadingLayer.find('.layer .loading'), btn_class = 'is-active';
		if(view){
			$loadingLayer.addClass(btn_class);
			ssds.common.newLoading($loading);
			$body.addClass('no-scroll');
			$loadingLayer.find('.newLoadingIn').append('<p id="loading-text"><span>0</span> %</p>');
		}else{
			$loadingLayer.removeClass(btn_class);
			ssds.common.newLoadingDone($loading.find('.newLoading'));
			$body.removeClass('no-scroll');
		}
	}
	
	return {
		setCreateDate: setCreateDate,
		setCreator: setCreator,
		getBase64Image: getBase64Image,
		isEmpty: isEmpty,
		setLoadingBar: setLoadingBar
	}
})();

initDoc = (function (){
	doc.content.width = title.width = content.width = doc.size.width - doc.space.x * 2;
	doc.content.height = doc.size.height - title.startY + title.height + 1 - footer.height;
	content.startY += content.verticalMargin;
	content.height -= content.verticalMargin * 2;
	footer.startY -= footer.height;
	footer.numPosY -= footer.height;
})();

function exportToPDF(){
	util.setLoadingBar(true);
	scope = angular.element(document.querySelector('[ng-app=led-configurator]')).scope();
	doc.page.title = [['Created by ', 'Date of configuration : '], 'LED Configuration Rendering', 'Screen Specification', 'Product Specification', 'Cabinet Drawing', 'Mechanical Drawing(Frame Kit)', 'Mechanical Drawing(Frame Kit)', 'Power flow Diagram(110V)', 'Power flow Diagram(220V)', 'Data Flow Diagram', 'Ventilation Guide', 'Production Information', 'Production Information', 'Production Information', 'Production Information', 'Production Information', 'Production Information', 'Production Information', 'Production Information'];
	doc.page.title[0][0] += util.setCreator();
	doc.page.title[0][1] += util.setCreateDate();
	doc.page.drawContent = [
		drawContents.preview, 
		drawContents.ledRendering, 
		drawContents.screenSpec, 
		drawContents.productSpec, 
		drawContents.cabinetDrawing, 
		drawContents.mechanicalType,
		drawContents.mechanicalDrawing, 
		drawContents.powerFlow110, 
		drawContents.powerFlow220, 
		drawContents.dataFlow, 
		drawContents.ventilationGuide, 
		drawContents.productInfo_0,
		drawContents.productInfo_1,
		drawContents.productInfo_2,
		drawContents.productInfo_3,
		drawContents.productInfo_4,
		drawContents.productInfo_5,
		drawContents.productInfo_6,
		drawContents.productInfo_detailLink
	];
	doc.page.hasProductInfo = scope.pdf.hasProductInfo;
	if(doc.page.hasProductInfo == false){
		doc.page.title.splice(11, 7);
		doc.page.drawContent.splice(11, 7);
	}	
	model.code = scope.display.name;
	model.display = {
		ratio: scope.display.ratio,
		col: scope.videowall.col,
		row: scope.videowall.row,
		total: scope.videowall.col * scope.videowall.row,
		width: scope.display.real_size.width,
		height: scope.display.real_size.height,
		seq: scope.display.seq
	};
	model.hasDiagram = false;
	$.each(ARR_MODEL, function(_idx){
		if(ARR_MODEL[_idx] == model.code)	model.hasDiagram = true;
	});	
	if(model.hasDiagram == true){
		model.line = ARR_MODEL_LINE[model.code];
		modelLineFrame = ARR_FRAME_TYPE[ARR_MODEL_LINE[model.code]];
		drawContents.mechanicalCalculate();
		doc.page.mechanicalCount = 0; 
		doc.page.load = parseInt(100 / (doc.page.title.length + model.useFrameKit.page));
	}else{
		doc.page.load = parseInt(100 / doc.page.title.length);
	}
	doc.title = (scope.pdf.title == '') ? '' : '_' + scope.pdf.title ;
	doc.os = scope.pdf.os; /* 181005 :: os 저장 */
	doc.pdf = new jsPDF(doc.option.orientation, doc.option.unit, doc.option.format);	
	drawLayout.init(0);
}
