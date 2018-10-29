var selectData = [],
	huddleConfiguratorApp = new Vue({
	el: '#huddle-configurator-app',
	data: {
		sequenceFrame : huddleConfiguratorSequenceFrame,
		sizeFrame : huddleConfiguratorSizeFrame,
		
		sequenceStep : 0,
		sequenceActiveStep : 0,
		sequenceStepTotal : huddleConfiguratorSequenceFrame.length,
						
		selectSequenceOption : [{'seat' : ''}, {'premium_audio' : false}, {'conferencing_collaboration' : false}, {'touch_screen' : false}, {'room_schedule' : false}],
		selectSizeOption : {'size' : 55, 'size55' : true, 'size49' : true},
		selectSerenoOption : {'arr' : [], 'sereno' : false},
		sequenceInactive : [[true, false, false, false, false], [], [], [], []],
		isSequenceEnd : false,
		
		exceptProp : {'seat' : false, 'seatLink' : ''},
		
		resultSolutionKey : '',
		resultSolutionSequence : {},
		resultSolutionData : {
			'name' : '',
			'img' : '',
			'title' : '',
			'txt' : '',
			'link' : '',
			'feature' : [],
			'product_samsung' : {
				'name' : '',
				'fullname' : '',
				'link' : '',
				'img' : '',
				'size' : ''
			},
			'product_harman' : []
		},		
		resultSolutionProp : {
			isShow : false,
			baseImg : huddleConfiguratorImgBase,
			baseSolutionLink : huddleConfiguratorSolutionLinkBase,
			baseDetailLink : huddleConfiguratorDetailLinkBase,
			format : {
				jpg : '.jpg',
				png : '.png'
			},
			prefix : {
				img : 'result_img-',
				ico : 'ico_result-'
			},
			detailLinkTabName : '#audio-bundle-introduce'
		}
	},
	mounted: function(){
	},
	methods: {
		init : function(){
			if($('body').hasClass('no-scroll'))	$('body').removeClass('no-scroll');
			
			this.sequenceStep = 0;
			this.sequenceActiveStep = 0;
			
			this.selectSequenceOption = [{'seat' : ''}, {'premium_audio' : false}, {'conferencing_collaboration' : false}, {'touch_screen' : false}, {'room_schedule' : false}];
			
			this.selectSizeOption = {'size' : 55, 'size55' : true, 'size49' : true};
			this.selectSerenoOption = {'arr' : [], 'sereno' : false};
			this.sequenceInactive = [[true, false, false, false, false], [], [], [], []];
			this.isSequenceEnd = false;
			
			this.exceptProp = {'seat' : false, 'seatLink' : ''};
			
			this.resultSolutionKey = '';
			this.resultSolutionSequence = {};	
			this.resultSolutionKey = '';
						
			this.resultSolutionData = {
				'name' : '',
				'img' : '',
				'title' : '',
				'txt' : '',
				'link' : '',
				'feature' : [],
				'product_samsung' : {
					'name' : '',
					'fullname' : '',
					'link' : '',
					'img' : '',
					'size' : ''
				},
				'product_harman' : []
			}
			this.resultSolutionProp.isShow = false;
		},
		nextStep : function(_code, _option){
			var THIS = this,
				code = _code, 
				data, 
				i = 0, 
				mtotal, 
				total = this.sequenceStepTotal,
				isSequenceInactiveArr = [], 
				isSequenceInactive = true, 
				sequenceInactiveArr = [];		
			
			this.isSequenceEnd = false;
			this.resultSolutionProp.isShow = false;
			$.each(this.sequenceFrame, function(key, value){
				if(code == value.code){
					THIS.sequenceStep = key;					
					data = (THIS.sequenceStep == 0) ? huddleConfiguratorData : selectData[THIS.sequenceStep - 1];
					// selectSequenceOption[this.sequenceStep] = {};
					// this.selectSequenceOption[this.sequenceStep][code] = _option;
					selectData[THIS.sequenceStep] = {};
				}
			});	
				
//			if(console)	console.log('selectSequenceOption :: ', this.selectSequenceOption);
			if(this.sequenceStep < this.sequenceStepTotal - 1){
				$.each(data, function(key, value){
					if(THIS.sequenceStep == 0){
						if(key == _option){
							selectData[THIS.sequenceStep] = value;
						}
					}else{
						if(value.sequence[THIS.sequenceStep][code] == _option){
							selectData[THIS.sequenceStep][key] = value;
						}					
					}									
				});
				
				if(selectData[0]['contact'] != undefined){
					this.exceptProp['seatLink'] = selectData[0]['contact']['link'];
					this.exceptProp['seat'] = !this.exceptProp['seat'];
					if(this.exceptProp['seat'] == true){
						this.selectSequenceOption[0]['seat'] = '9+';
					}else{
						this.selectSequenceOption[0]['seat'] = false;
					}
					
				}else{
					this.exceptProp['seat'] = false;
				}
			}
				
//			if(console)	console.log('selectData :: ', selectData);						
			$.each(selectData[this.sequenceStep], function(key, value){				
				$.each(value.sequence, function(k, v){
					if(k == THIS.sequenceStep + 1){
						$.each(v, function(k_, v_){	
							var v__ = (v_ == false) ? false : true;						
							isSequenceInactiveArr.push(v__);
						});
					}						
				});												
			});				
			$.each(isSequenceInactiveArr, function(key, value){
				if(value == false){
					isSequenceInactive = false;
				}
			});
				
			// this.sequenceInactive[this.sequenceStep + 1] = [];
			mtotal = (isSequenceInactive == false) ? this.sequenceStep + 1 : this.sequenceStep + 2 ; 				
			if(this.sequenceStep != THIS.sequenceStepTotal - 1){
				for(i = 0; i < mtotal; ++i){
					this.sequenceInactive[this.sequenceStep + 1][i] = true;
					this.$set(this.sequenceInactive[this.sequenceStep + 1], i, this.sequenceInactive[this.sequenceStep + 1][i]);
					if(this.sequenceStep == 0)	THIS.selectSequenceOption[1]['premium_audio'] = null;
				}
				for(i = mtotal; i < total; ++i){
					this.sequenceInactive[this.sequenceStep + 1][i] = false;
					this.$set(this.sequenceInactive[this.sequenceStep + 1], i, this.sequenceInactive[this.sequenceStep + 1][i]);
					$.each(this.selectSequenceOption[i], function(key, value){
						if(key != code){
							THIS.selectSequenceOption[i][key] = null;
						}
					});
				}
				this.sequenceActiveStep = this.sequenceStep + 1;			
				this.resultSolutionSequence = selectData[this.sequenceStep];
				
				
				if(Object.keys(this.resultSolutionSequence).length == 1){
					$.each(this.resultSolutionSequence, function(key, value){
						THIS.resultSolutionKey = key;
					});
					if(this.resultSolutionSequence['huddle_premium'] != undefined){
						this.sequenceInactive[this.sequenceActiveStep][this.sequenceStepTotal-1] = true;
						this.$set(this.sequenceInactive[this.sequenceActiveStep], this.sequenceStepTotal, this.sequenceInactive[this.sequenceActiveStep][this.sequenceStepTotal-1]);
					}
				}
				if(this.sequenceStep == this.sequenceStepTotal - 2){
					if(this.selectSequenceOption[this.sequenceStepTotal - 1] != null){
						$.each(this.selectSequenceOption[this.sequenceStepTotal - 1], function(key, value){
							if(key == 'room_schedule'){
								THIS.selectSequenceOption[THIS.sequenceStepTotal - 1][key] = null;
							}
						});
					}					
				}
			}
			if(console)	console.log('resultSolutionSequence :: ', this.resultSolutionSequence);
						
			// size, sereno
			if(this.sequenceStep != 0){
				THIS.selectSizeOption['size49'] = false;
				THIS.selectSerenoOption['sereno'] = false;
				THIS.selectSerenoOption['arr'] = [];
				$.each(this.resultSolutionSequence, function(key, value){
					if(value.product != undefined){
						$.each(value.product.samsung, function(k, v){
							if(v.size == '49')	THIS.selectSizeOption['size49'] = true;
						});
						$.each(value.product.harman, function(k, v){
							if(v.sereno == true)	THIS.selectSerenoOption['arr'].push(v.sereno);
						});
					}
				});
				this.changeSizeOption();
				if(this.selectSerenoOption['arr'].length > 1){
					this.selectSerenoOption['sereno'] = true;
				}
//				if(console)	console.log('selectSizeOption :: ', this.selectSizeOption);
//				if(console)	console.log('selectSerenoOption nextStep :: ', this.selectSerenoOption);
			}else{
				this.selectSizeOption['size49'] = true;
			}
			
			if(Object.keys(this.resultSolutionSequence).length == 1){
				if(this.resultSolutionSequence[this.resultSolutionKey]['sequence'][this.sequenceStepTotal - 1]['room_schedule'] == true){
					if(this.sequenceStep == this.sequenceStepTotal - 1){
						if(this.selectSequenceOption[this.sequenceStepTotal - 1]['room_schedule'] != {room_schedule:null}){
							this.isSequenceEnd = true;
						}
					}					
				}else{
					if(selectData[0]['contact'] != undefined){
						this.isSequenceEnd = false;
					}else{
						this.isSequenceEnd = true;
					}
				}
			}else{
				this.isSequenceEnd = false;
			}
		},
		selectSize : function(_size){
			this.selectSizeOption.size = _size;
		},
		changeSizeOption : function(){
			if(this.selectSizeOption['size49'] == false){
				this.selectSizeOption.size = '55';
				this.selectSizeOption['size55'] = true;
			}
		},
		showResult : function(){
			this.setResult();
			this.resultSolutionProp.isShow = true;
			$('body').addClass('no-scroll');
		},
		setResult : function(){
			var THIS = this,
				key = this.resultSolutionKey, 
				//size = this.selectSizeOption.size,
				originData = huddleConfiguratorSolution[key],
				harmanData = huddleConfiguratorHarmanFrame,
				sequenceData = this.resultSolutionSequence[key],
				sequenceProductData = sequenceData.product,
				idx, hasSchedule = (this.selectSequenceOption[this.sequenceStepTotal - 1]['room_schedule'] == 'yes') ? '_schedule' : '';
			
			this.resultSolutionData.name = originData.name;
			this.resultSolutionData.img = this.resultSolutionProp.baseImg + this.resultSolutionProp.prefix.img + key + '(' + this.selectSequenceOption[0]['seat'] + ')' + hasSchedule + this.resultSolutionProp.format.jpg;
			this.resultSolutionData.title = originData.title;
			this.resultSolutionData.txt = originData.txt;
			this.resultSolutionData.feature = originData.feature;
			$.each(this.resultSolutionData.feature, function(k, v){
				THIS.resultSolutionData.feature[k].pcimg = THIS.resultSolutionProp.baseImg + THIS.resultSolutionProp.prefix.ico + key + '-' + (k + 1) + THIS.resultSolutionProp.format.png;
				THIS.resultSolutionData.feature[k].moimg = THIS.resultSolutionProp.baseImg + THIS.resultSolutionProp.prefix.ico + key + '-' + (k + 1) + '-mo' + THIS.resultSolutionProp.format.png;
			});
			this.resultSolutionData.link = this.resultSolutionProp.baseSolutionLink + this.resultSolutionProp.detailLinkTabName + '?outsideTab=' + originData.idx;//this.resultSolutionProp.baseSolutionLink + '#' + this.changeUnderbarTxt(originData.name);
			
			this.resultSolutionData.product_samsung.size = this.selectSizeOption.size;
			$.each(sequenceProductData.samsung, function(key, value){
				if(value.size == THIS.selectSizeOption.size){
					THIS.resultSolutionData.product_samsung.name = value.name;
					THIS.resultSolutionData.product_samsung.fullname = value.fullname;
					idx = key;
				}
			});
						
			if(this.resultSolutionData.product_samsung.fullname == 'DC55J'){ /* 페이지 없어서 페이지 나올 때 까지 다른 페이지로 잠시 예외처리 */
				this.resultSolutionData.product_samsung.link = this.resultSolutionProp.baseDetailLink + originData['link-id'][this.selectSizeOption.size] + '/DC49J';
			}else{
				this.resultSolutionData.product_samsung.link = this.resultSolutionProp.baseDetailLink + originData['link-id'][this.selectSizeOption.size] + '/' + this.resultSolutionData.product_samsung.fullname;
			}			
			this.resultSolutionData.product_samsung.img = this.resultSolutionProp.baseImg + this.resultSolutionProp.prefix.img + this.resultSolutionData.product_samsung.name + '_' + this.selectSizeOption.size + this.resultSolutionProp.format.jpg;
			
			this.resultSolutionData.product_harman = [];
			$.each(sequenceProductData.harman[idx], function(k, v){
				var data = {};
					
				if(v == true){
					if(k == "acendo_book"){
						if(THIS.selectSequenceOption[THIS.sequenceStepTotal - 1]['room_schedule'] == 'yes'){
							data.key = k;
							data.fullname = harmanData[k].fullname;
							data.link = harmanData[k].link;
							data.txt = harmanData[k].txt;
							data.img = THIS.resultSolutionProp.baseImg + THIS.resultSolutionProp.prefix.img + k + THIS.resultSolutionProp.format.jpg;
								
							THIS.resultSolutionData.product_harman.push(data);
						}
					}else{
						data.key = k;
						data.fullname = harmanData[k].fullname;
						data.link = harmanData[k].link;
						data.txt = harmanData[k].txt;
						data.img = THIS.resultSolutionProp.baseImg + THIS.resultSolutionProp.prefix.img + k + THIS.resultSolutionProp.format.jpg;
						
						THIS.resultSolutionData.product_harman.push(data);
					}
				}
			});
		}
	}
});
