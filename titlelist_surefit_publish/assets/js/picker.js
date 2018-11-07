

var receiveData = {
		fiter : [], // 담당피터 (온라인/오프라인) :: 서버/네이티브
		club : { // 클럽정보 (온라인/오프라인) :: 서버/네이티브
			common : {}, // 클럽 공통
			division : {} // 각각 클럽
		},
		fiting : {}, // 피팅구분 - 피팅장소 (온라인/오프라인)
		
		bookList : {}, // 예약내역 (온라인) :: 서버
		booker : {}, // 예약자 상세 (온라인) :: 서버
		member : {}, // 회원 (온라인) :: 서버
		
		constant : {}, // 상수값 :: 골퍼기본정보(평균타수, 령균연습회수, 타석), 결과(메일주소, 휴대폰번호, 매장지역, 매장지점)
		
		update : {}, // 서버에 업데이트 내역 여부 :: 네이티브
		network : {} // 온라인/오프라인 상태 :: 네이티브
		
}; // 서버 및 네이티브에서 받는 데이터

var storeData = {
		fiter : {
			name : 'fiter',
			email : 'fiter@naver.com'
		}, // 로그인 한 피터
		fiting : {
			type : '타이틀리스트 피팅데이',
			date : '2017-04-20',
			place : '(성남)남서울제2연습장',
			fiter : 'fiter'
		}, // 선택된 피팅구분 - 선택된 피팅일자 - 선택된(또는 입력한) 피팅장소 - 선택된(미지정) 피터
		
		golfer : {
			isBooker : true, // 예약자인지 확인
			isMember : true, // 회원인지 확인
			
			name : '김순삼',
			email : 'kim@naver.com',
			phone : '010-000-0000',
			
			mybag : [],
			lastFitingHistory : '',
			
			isAgree : true, // 직접입력&회원 아닐때(온라인) // (오프라인) // (온라인)비회원-약관동의팝업 // 다시 확인(개인정보 마케팅 목적 수집 이용 동의, 광고성 정보 수신, 회원가입 동의)
		},  // 직접 입력할 경우 (온라인/오프라인) :: 입력한 회원 or 비회원 정보
				
		trackman : {
			list : [
			        {
			        	category : '',
			        	number : '',
			        	result  : {clubSpeed : '', ballSpeed : '', launchAngle : '', spinRate : '', smashFactor : '', clubPath : '', faceAngle : '', faceToPath : '', attackAngle : '', swingPlane : '', landingAngle : '', carry : '', total : '', unit : 'meter'}			        	
			        }
			], // 트랙맨 저장된 데이터
			select : {
				category : '',
				number : '',
				result  : {clubSpeed : '', ballSpeed : '', launchAngle : '', spinRate : '', smashFactor : '', clubPath : '', faceAngle : '', faceToPath : '', attackAngle : '', swingPlane : '', landingAngle : '', carry : '', total : '', unit : 'meter'}
			} // 트랙맨 저장된 데이터 중 선택
		},
		club : [
		        {
		        	model : '', loft : '', length : '', shaft : '', shaftFlex : '', surefitSetting : '', surefitCG : '', grip : '', gripSize : ''
		        }
		], // 트랙맨 선택된 데이터를 기준으로 피팅클럽 선택 (최대 4개까지)
		result : {
			golfer : {
				email : '',
				phone : '',
				send : '',
				comment : ''
			},
			store : {
				area : '',
				branch : '',
				manager : '',
				email : '',
				send : '',
				comment : ''
			}
		}
		
}; // 앱 내에 저장할 데이터


var sendData = {}; // 서버 및 네이티브로 보낼 데이터



var constant = {
		
}; // 변하지 않는 데이터



var testApp = angular.module('testApp', []);
testApp.controller('testController', function($scope){
	var s = $scope;
	
	
	// 받는 데이터
	s.clubInfo = [
	              {
	            	  category : 'driver',
	            	  driver : {
	            		  
	            		  club : {
	            			  model : ['driverClubModel1', 'driverClubModel2', 'driverClubModel3']
	              		  },
	              		  shaft : {
	              			  brand : ['driverShaftBrand1', 'driverShaftBrand2'],
	              			  model : {
	              				  driverShaftBrand1 : ['driverShaftModel1-1', 'driverShaftModel1-2', 'driverShaftModel1-3'],
	              				  driverShaftBrand2 : ['driverShaftModel2-1', 'driverShaftModel2-2', 'driverShaftModel2-3']
	              			  },
	              			  flex : ['driverShaftFlex1', 'driverShaftFlex2', 'driverShaftFlex3']
	              		  }
	            	  }
				},
				{
					category : 'fairway',
					fairway : {
						club : {
							model : ['fairwayClubModel1', 'fairwayClubModel2', 'fairwayClubModel3']
						},
						shaft : {
							brand : ['fairwayShaftBrand1', 'fairwayShaftBrand2', 'fairwayShaftBrand3'],
							model : {
								fairwayShaftBrand1 : ['fairwayShaftModel1-1', 'fairwayShaftModel1-2', 'fairwayShaftModel1-3'],
								fairwayShaftBrand2 : ['fairwayShaftModel2-1', 'fairwayShaftModel2-2', 'fairwayShaftModel2-3'],
								fairwayShaftBrand3 : ['fairwayShaftModel3-1', 'fairwayShaftModel3-2', 'fairwayShaftModel3-3']
							},
							flex : ['fairwayShaftFlex1', 'fairwayShaftFlex2', 'fairwayShaftFlex3']
						}
					}
				},
				{
					category : 'hybrid',
					hybrid : {
						club : {
							model : ['hybridClubModel1', 'hybridClubModel2', 'hybridClubModel3', 'hybridClubModel4'],
							comp : [['hybridClubComp1-1', 'hybridClubComp1-2', 'hybridClubComp1-3'], ['hybridClubComp2-1', 'hybridClubComp2-2', 'hybridClubComp2-3']]
	                    },
	                    shaft : {
	                    	brand : ['hybridShaftBrand1', 'hybridShaftBrand2', 'hybridShaftBrand3'],
	                    	model : {
	                    		hybridShaftBrand1 : ['hybridShaftModel1-1', 'hybridShaftModel1-2', 'hybridShaftModel1-3'],
	                    		hybridShaftBrand2 : ['hybridShaftModel2-1', 'hybridShaftModel2-2', 'hybridShaftModel2-3'],
	                    		hybridShaftBrand3 : ['hybridShaftModel3-1', 'hybridShaftModel3-2', 'hybridShaftModel3-3']
	                    	},
	                    	flex : ['hybridShaftFlex1', 'hybridShaftFlex2', 'hybridShaftFlex3']
	                    }
					}
				},
				{
					category : 'iron',
					iron : {
						club : {
							model : ['ironClubModel1', 'ironClubModel2', 'ironClubModel3', 'ironClubModel4'],
							comp : [['ironClubComp1-1', 'ironClubComp1-2', 'ironClubComp1-3'], ['ironClubComp2-1', 'ironClubComp2-2', 'ironClubComp2-3']]
	                    },
	                    shaft : {
	                    	brand : ['ironShaftBrand1', 'ironShaftBrand2', 'ironShaftBrand3'],
	                    	model : {
	                    		ironShaftBrand1 : ['ironShaftModel1-1', 'ironShaftModel1-2', 'ironShaftModel1-3'],
	                    		ironShaftBrand2 : ['ironShaftModel2-1', 'ironShaftModel2-2', 'ironShaftModel2-3'],
	                    		ironShaftBrand3 : ['ironShaftModel3-1', 'ironShaftModel3-2', 'ironShaftModel3-3']
	                    	},
	                    	flex : ['ironShaftFlex1', 'ironShaftFlex2', 'ironShaftFlex3']
	                    }
					}
				},
				{
					category : 'wedge',
					wedge : {
						club : {
							model : ['wedgeClubModel1', 'wedgeClubModel2', 'wedgeClubModel3', 'wedgeClubModel4'],
							loft : ['wedgeClubLoft1', 'wedgeClubLoft2', 'wedgeClubLoft3']
	                    },
	                    shaft : {
	                    	brand : ['wedgeShaftBrand1', 'wedgeShaftBrand2', 'wedgeShaftBrand3'],
	                    	model : {
	                    		wedgeShaftBrand1 : ['wedgeShaftModel1-1', 'wedgeShaftModel1-2', 'wedgeShaftModel1-3'],
	                    		wedgeShaftBrand2 : ['wedgeShaftModel2-1', 'wedgeShaftModel2-2', 'wedgeShaftModel2-3'],
	                    		wedgeShaftBrand3 : ['wedgeShaftModel3-1', 'wedgeShaftModel3-2', 'wedgeShaftModel3-3']
	                    	},
	                    	flex : ['wedgeShaftFlex1', 'wedgeShaftFlex2', 'wedgeShaftFlex3']
	                    }
					}
				}
	];
	
	
	// 받은 데이터 세팅
	s.clubs = [];
	$.each(s.clubInfo, function(_idx){
		var category = s.clubInfo[_idx].category;
		
		s.clubs.push(category);
		eval('s.' + s.clubs[_idx] + ' = s.clubInfo[_idx][category]');
	});	
	
	s.clubDatas = {};
	$.each(s.clubs, function(_idx){
		s.clubDatas[s.clubs[_idx]] = eval('s.' + s.clubs[_idx]);
	});
	console.log(s.clubDatas);
	
	
	
	
	
	
	s.category = s.clubs[0];
	s.shaftBrand = '';
	s.getDependentOption = function(_category, _prop){
		console.log('s.'+ _category + _prop);
		return eval('s.'+ _category + _prop);
	}
	
	s.member = {
			hand : 'LH'
	};
	
	
	s.CONST_DATA = {
		hand : ['RH', 'LH'],
		loft : ['loft _01', 'loft _02', 'loft _03'],
		length : ['length_01', 'length_02', 'length_03', 'length_04']
	};
	
	s.getActiveClass = function(_value){
		var hasClass = (_value == s.member.hand) ? true : false;
		return hasClass;
	}
	
	
});

testApp.directive('repeatComplete', function(){
	return {
		link : function(scope, element, attrs){
			var parentScope = scope.$parent,
				prop = {
				height : 29,
				startX : 26,
				isTouch : false,
				cNum : 0,
				top : 0, 
				subPicker : [],
						
				distCheck : function(startY, endY){
					var _dist = startY - endY;		
					return _dist;
				},
				getDirection : function(startY, endY){
					var saY = startY,
						edY = endY,
						direction = 'up',
						tmp;
				
					tmp = saY - edY;
				
					if(tmp < 0){
						direction = 'down';
					}else{
						direction = 'up'
					}	
					
					return direction;
				}
			};
				
			if (scope.$last){
				console.log(element, attrs)
				if(element.parent('ul').position().top != 0)	element.parent('ul').css({top : 0});
				element.parent('ul').unbind('touchstart touchmove touchend');
				element.parent('ul').bind({
					'touchstart' : function(e){
						prop.isTouch = true;
						prop.startTouchY = e.originalEvent.targetTouches[0].pageY;
						prop.startY = $(this).position().top;
					},
					'touchmove' : function(e){
						var tarY;
						
						prop.endTouchY = e.originalEvent.targetTouches[0].pageY;
						prop.direction = prop.getDirection(prop.startTouchY, prop.endTouchY);
						
						switch(prop.direction){
							case 'down' :
								tarY = ($(this).position().top >= 0) ? 0 : prop.startY - prop.distCheck(prop.startTouchY, prop.endTouchY);
								break;
								
							case 'up' :
								tarY = (-Math.abs($(this).position().top) <= -($(this).height() - prop.height)) ? -($(this).height() - prop.height) : prop.startY - prop.distCheck(prop.startTouchY, prop.endTouchY);
								break;
								
							default :
								break;
						}					
						$(this).css({'top': tarY});
					},
					'touchend' : function(e){
						var tarY,
							hold = Math.abs($(this).position().top) / prop.height,
							holdT, 
							tmpEndTouchY = e.originalEvent.changedTouches[0].pageY;
						
						if(prop.startTouchY - tmpEndTouchY != 0){
							if(prop.isTouch == true){							
								holdT = hold - parseInt(hold);
								tarY = (holdT < .5) ? -(parseInt(hold) * prop.height) : -((parseInt(hold) + 1) * prop.height);
									
								prop.cNum = Math.abs(tarY / prop.height);
								
								$(this).animate({'top': tarY}, 100, function(){
									$(this).find('li').each(function(idx){
										var $this = $(this);
										
										if(prop.cNum != idx){
											if($(this).hasClass('active'))	$(this).removeClass('active');
										}else{
											$(this).addClass('active');
											
											if($(this).data('category'))	parentScope.category = scope.category = $(this).data('category');
											if($(this).data('brand'))	parentScope.shaftBrand = scope.shaftBrand = $(this).data('brand');
											
											if(scope.$$phase == '$apply' || scope.$$phase == '$digest'){
												// $$phase로 현재 스코프가 어느 단계에 있는지 알 수 있는데 $$phase가 $apply나 $digest이면 그냥 스코프를 변경하고 그렇지 않으면 $apply함수를 사용하도록 한 것이다. 
											}else{
												scope.$apply();
											}
										}
									});
								});
								prop.isTouch = false;
							}
						}
					}
				});
		    }
		}
	}
});


