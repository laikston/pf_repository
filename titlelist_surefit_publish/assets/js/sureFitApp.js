var sureFit = sureFit || {}; 

sureFit.common = {
	app : null,
	receiveData : {
		clubInfo : [{category : 'driver'}, {category : 'fairway'}, {category : 'hybrid'}, {category : 'iron'},{category : 'wedge'}]
	},
	storeData : {},
	constant : {},
	
	executeModule : function(){
		sureFit.intro();
		sureFit.booker();
		sureFit.trackman();
		sureFit.club();
		sureFit.result();
	},
	
	createApp : function(){
		sureFit.common.app = angular.module('sureFitApp', ['ngRoute']);
		sureFit.common.app.config(function($routeProvider, $httpProvider){
			$httpProvider.defaults.useXDomain = true;
		    delete $httpProvider.defaults.headers.common['X-Requested-With'];
		    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		    
			$routeProvider.when('/sureFit-intro', {
				controller : 'introController',
			    templateUrl : 'template/intro.html'
			  }).when('/sureFit-booker', {
				  controller : 'bookerController',
				  templateUrl : 'template/booker.html'
			  }).when('/sureFit-trm', {
				  controller : 'trmController',
				  templateUrl : 'template/trm.html'
			  }).when('/sureFit-club', {
				  controller : 'clubController',
				  templateUrl : 'template/club.html'
			  }).when('/sureFit-result', {
				  controller : 'resultController',
				  templateUrl : 'template/result.html'
			  }).otherwise({redirectTo : '/sureFit-intro'});
		});
		sureFit.common.app.controller('sureFitAppController', function($scope, fitterData, bookListData, regionData, clubCommonData){
			var s = $scope;
			
			function setVar(){
				s.common = {
					isLogin : false,
					isOnline : true,
					isUpdate : true,
					isSubPage : false,
					routeStep : 'intro'
				};
				
				s.fitter = {
					name : null,
					email : null
				};
				
				s.trackman = {
					webSocket : null,
					isConnect : false,
					current : {
						category : '',
			        	number : 15,
			        	unit : 'yard',
			        	result  : {clubSpeed : 40.921, ballSpeed : 58.5427, launchAngle : 14.295, spinRate : 3433.0, smashFactor : 1.4306, clubPath : -1.153, faceAngle : -0.763, faceToPath : 0.39, attackAngle : 2.766, swingPlane : 40.717, landingAngle : 40.407, carry : 188.572, total : 203.801}
					},
					list : [
					    {
					    	category : 'wedge',
				        	number : '10',
				        	unit : 'meter',
				        	result  : {clubSpeed : '10', ballSpeed : '-', launchAngle : '-', spinRate : '-', smashFactor : '-', clubPath : '-', faceAngle : '-', faceToPath : '-', attackAngle : '-', swingPlane : '-', landingAngle : '-', carry : '-', total : '-'}
					    },
					    {
					    	category : 'driver',
				        	number : '5',
				        	unit : 'yard',
				        	result  : {clubSpeed : 'clubS', ballSpeed : 'ballS', launchAngle : 'launchA', spinRate : 'spinR', smashFactor : 'smashF', clubPath : 'clubP', faceAngle : 'faceA', faceToPath : 'faceTP', attackAngle : 'attackA', swingPlane : 'swingP', landingAngle : 'landingA', carry : 'carry', total : 'total'}
					    },
					    {
					    	category : 'hybrid',
				        	number : '1',
				        	unit : 'meter',
				        	result  : {clubSpeed : '1', ballSpeed : '-', launchAngle : '-', spinRate : '-', smashFactor : '-', clubPath : '-', faceAngle : '-', faceToPath : '-', attackAngle : '-', swingPlane : '-', landingAngle : '-', carry : '-', total : '-'}
					    }
					],
					selectIdx : null,
					nextData : {}
				};
				
				
				s.clubDatas = {}; // 
				
				s.club = {
					current : {
						category : 'driver',
						hand : 'RH'
					},
					category : [],
					trackmanData : {},
					common : {}
				};
				
				s.picker = {
					isOn : false,
					select : [],
					title : [],
					option : []
				};
			}
			
			function setModule(){
				s.openPicker = function(_titleArray, _newData, _activeData){
					s.picker.isOn = true;
					s.picker.title = _titleArray;
					s.picker.option = [];
					
					angular.forEach(s.picker.title, function(title, titleIdx){
						s.picker.option[titleIdx] = [];
						angular.forEach(_newData, function(option, optionIdx){
							s.picker.option[titleIdx][optionIdx] = option;
						});
					});
					
					console.log(_activeData);
				};
				
				s.closePicker = function(){
					s.picker.isOn = false;
					s[s.common.routeStep].current.category = s.picker.select;
					// 다른 스텝에서 적용 가능하도록 공통 이름 스토리지
				};
			}
			
			function getData(){
				fitterData.get(setFitterData);
				//bookListData.get({}, setBookListData);
				regionData.get(setRegionData);
				//clubData.get(setClubData);
				clubCommonData.get(setClubCommonData);
				setClubData();
			}
			
			function setFitterData(){ // 피터 이메일
				//console.log(sureFit.common.receiveData.fitter);
			}
			
			function setBookListData(){ // 예약리스트 받기
				//console.log(sureFit.common.receiveData.bookList);
			}
			
			function setRegionData(){ // 피팅지역 받기
				//console.log(sureFit.common.receiveData.fittingRegion);
			}
			
			function setClubCommonData(){ // 클럽 공통 받기
				s.club.common = sureFit.common.receiveData.clubCommon;
				s.club.common.hand = ['RH', 'LH'];
				console.log(s.club.common);
			}
			
			function setClubData(){ // 클럽 개별 받기
				angular.forEach(sureFit.common.receiveData.clubInfo, function(value, key){
					var category = sureFit.common.receiveData.clubInfo[key].category;					
					s.club.category.push(category);
					//eval('s.' + s.club.category[key] + ' = sureFit.common.receiveData.clubInfo[key][category]');
					if(key == 0)	s.trackman.current.category = sureFit.common.receiveData.clubInfo[key].category;
				});
				
//				s.clubDatas = {};
//				$.each(s.clubs, function(_idx){
//					s.clubDatas[s.clubs[_idx]] = eval('s.' + s.clubs[_idx]);
//				});
			}
			
			function init(){
				setVar();
				//getData();
				//setModule(); // 공통 api // keyboardTypePicker
			}
			init();
		});
		sureFit.common.executeModule();
		
		sureFit.common.app.constant('constant', {
			dataUrl : {
				base : '/titleist-surefit/surefit/',
				fitter : 'fiter',
				bookList : 'booklist',
				region : 'fitlace',
				clubCommon : 'clubinfo_common'
			},
			
			trackman : {
				testUrl : 'ws://echo.websocket.org/',
				url : 'ws://172.30.20.1/ws'
			}
		});
		
		/* 피팅 장소 받기 */
		sureFit.common.app.factory('regionData', function($http, constant){
			return {
//        		get : function(_func){
//        			var url = constant.dataUrl.base + constant.dataUrl.region,
//    	        		req;
//        			
//        			req = $http({
//        	    		method : 'POST',
//        	    		url : url
//        	    	});
//        			req.success(function(data, status, headers, config){
//        				sureFit.common.receiveData.fittingRegion = data;
//        	    		if(_func)	_func();
//        	    	});
//        			req.then(function(response){}, function(response){
//        				if(console)	console.log('get fitter data error!')
//        			});
//        		}
        	}
		});
		
		/* 피터 이메일 받기 */
		sureFit.common.app.factory('fitterData', function($http, constant){
			return {
//        		get : function(_func){
//        			var url = constant.dataUrl.base + constant.dataUrl.fitter,
//    	        		req;
//        			
//        			req = $http({
//        	    		method : 'POST',
//        	    		url : url
//        	    	});
//        			req.success(function(data, status, headers, config){
//        				sureFit.common.receiveData.fitter = data;
//        	    		if(_func)	_func();
//        	    	});
//        			req.then(function(response){}, function(response){
//        				if(console)	console.log('get fitter data error!')
//        			});
//        		}
        	}
		});
		
		/* 예약리스트 받기 */
		sureFit.common.app.factory('bookListData', function($http, constant){
			return {
//        		get : function(_prop, _func){
//        			var url = constant.dataUrl.base + constant.dataUrl.bookList,
//        				prop = _prop,
//    	        		req;
//        			
//        			req = $http({
//        	    		method : 'POST',
//        	    		url : url,
//        	    		params: {fitter_name : user.id}
//        	    	});
//        			req.success(function(data, status, headers, config){
//        				sureFit.common.receiveData.bookList = data;
//        	    		if(_func)	_func();
//        	    	});
//        			req.then(function(response){}, function(response){
//        				if(console)	console.log('get book list data error!')
//        			});
//        		}
        	}
		});
		
		/* 클럽 공통 받기 */
		sureFit.common.app.factory('clubCommonData', function($http, constant){
			return {
//        		get : function(_func){
//        			var url = constant.dataUrl.base + constant.dataUrl.clubCommon,
//    	        		req;
//        			
//        			req = $http({
//        	    		method : 'POST',
//        	    		url : url
//        	    	});
//        			req.success(function(data, status, headers, config){
//        				sureFit.common.receiveData.clubCommon = data;
//        	    		if(_func)	_func();
//        	    	});
//        			req.then(function(response){}, function(response){
//        				if(console)	console.log('get club common data error!')
//        			});
//        		}
        	}
		});
		
		/* 다음단계로 가기 */
		sureFit.common.app.factory('nextStep', function(){
			return {
				go : function(_url){
					window.location.href = _url;
				}
			}
		});
		
		sureFit.common.app.directive('keyboardPicker', function(){
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
													
													parentScope.picker.select = $(this).data('value');
													
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
	}
};

sureFit.intro = function(){
	sureFit.common.app.controller('introController', function($scope, nextStep){
		var s = $scope;
		
		s.common.routeStep = 'intro';
		s.loginFitter = function(){ // test email : jung-woo_kim@acushnetgolf.com
			var fitter = searchFitter();
			
			if(fitter.length){
				if(s.common.isLogin){
					s.common.isLogin = false;
					s.fitter.name = s.fitter.email = null;
				}else{
					s.common.isLogin = true;
					s.fitter.name = fitter[0].name; 
					s.fitter.email = fitter[0].email;
					
					/* 다음페이지로 이동 */
					nextStep.go('#/sureFit-booker');
				}				
			}else{
				s.common.isLogin = false;
				s.fitter.name = s.fitter.email = null;
			}
		};
		
		function searchFitter(){
			var validFitter = [];
			
			angular.forEach(sureFit.common.receiveData.fitter, function(value, key){
				if(value.email == s.fitter.email)	validFitter.push({name : value.name, email : value.email});
			});
			return validFitter;
		}
	});
};

sureFit.booker = function(){
	sureFit.common.app.controller('bookerController', function($scope, nextStep){
		var s = $scope;
		
		s.common.isSubPage = true;
		s.common.routeStep = 'booker';
		function getDate(){
			sureFit.common.receiveData.fittingDate = [];
		}
	});
};

sureFit.trackman = function(){
	sureFit.common.app.controller('trmController', function($scope, constant, nextStep){
		var s = $scope;
		
		s.common.routeStep = 'trackman';
		s.common.isSubPage = true;
		
		s.changeTrackmanUnit = function(_unit){
			var data = {
					carry : s.trackman.current.result.carry,
					total : s.trackman.current.result.total
			}, 
			result = {};
			
			switch(_unit){
				case 'meter' :
					s.trackman.current.unit = 'yard';
					result = meterToYard(data);
					break;
					
				case 'yard' :
					s.trackman.current.unit = 'meter';
					result = yardToMeter(data);
					break;
					
				default :
					break;
			}
			
			function meterToYard(_data){
				var yData = {};
				
				angular.forEach(_data, function(value, key){
					yData[key] = (Number(_data[key]) * 1.09361).toFixed(1);
				});
				
				return yData;
			}
			
			function yardToMeter(_data){
				var mData = {};
				
				angular.forEach(_data, function(value, key){
					mData[key] = (Number(_data[key]) * 0.9144).toFixed(1);
				});
				
				return mData;
			}
			
			s.trackman.current.result.carry = result.carry;
			s.trackman.current.result.total = result.total;
		};
		
		s.saveTrackmanData = function(){
			var validNum = -1; // number로 체크
			
			angular.forEach(s.trackman.list, function(saveData, dataIdx){
				if(saveData.number == s.trackman.current.number){
					validNum = dataIdx;
					console.log('같은 데이터가 있다');
				}
			});
			
			if(validNum != -1){
				console.log('같은 데이터가 있다고');
			}else{
				s.trackman.list.unshift(s.trackman.current);
			}
		}
		
		s.selectTrackmanData = function(_listNum){
			s.trackman.selectIdx = _listNum;
			
			angular.forEach(angular.element('.dataSelectWrap li'), function(value, idx){
				if(idx == _listNum){
					if(!angular.element('.dataSelectWrap li').eq(idx).hasClass('checked'))	angular.element('.dataSelectWrap li').eq(idx).addClass('checked');
				}else{
					angular.element('.dataSelectWrap li').eq(idx).removeClass('checked');
				}
			});
		};
		
		s.nextTrackmanData = function(){
			if(s.trackman.selectIdx == null){
				console.log('데이터를 선택해라');
			}else{
				s.trackman.nextData = s.trackman.list[s.trackman.selectIdx];
				s.trackman.isConnect = false;
				s.trackman.webSocket.close(); // 웹소켓 통신 끝내기
				s.trackman.webSocket = null;
				nextStep.go('#/sureFit-club');
				
				s.club.trackmanData = s.trackman.nextData;
			}
		}
		
		function receiveTrackmanData(){
			var trackman,
				pongSender;
			
			trackman = s.trackman.webSocket = new WebSocket(constant.trackman.testUrl);
			
			trackman.onopen = function(e) { // 서버(트랙맨) 연결
				var msg = {"Type": "Subscribe", "Payload": {"MessageList": ["Measurement"]}};
				
				trackman.send(JSON.stringify(msg));
				pongSender = setTimeout(sendPong, 15000); // 10초마다 Pong 보내기
			};
			trackman.onmessage = function(e) { // 서버(트랙맨)에서 메세지 받기 {"Type": "Acknowledge", "SubType": "Subscribe"}
				var data = JSON.parse(e.data);
				
				if(data.Type == 'Acknowledge' && data.SubType == 'Subscribe'){
					s.trackman.isConnect = true;
				}
				
				if(s.trackman.isConnect == true){ // 데이터 받기
					if(data.Type == 'Measurement' && data.Payload.Kind == 'Measurement'){
						s.trackman.current.result = {
							clubSpeed : Number(data.Payload.ClubSpeed).toFixed(1), 
							ballSpeed : Number(data.Payload.BallSpeed).toFixed(1), 
							launchAngle : Number(data.Payload.LaunchAngle).toFixed(1), 
							spinRate : Number(data.Payload.SpinRate).toFixed(1), 
							smashFactor : Number(data.Payload.SmashFactor).toFixed(1), 
							clubPath : Number(data.Payload.ClubPath).toFixed(1), 
							faceAngle : Number(data.Payload.FaceAngle).toFixed(1), 
							faceToPath : Number(data.Payload.FaceToPath).toFixed(1), 
							attackAngle : Number(data.Payload.AttackAngle).toFixed(1), 
							swingPlane : Number(data.Payload.SwingPlane).toFixed(1), 
							landingAngle : Number(data.Payload.LandingAngle).toFixed(1), 
							carry : Number(data.Payload.Carry).toFixed(1),
							total : Number(data.Payload.Total).toFixed(1)		
						};
						if(s.trackman.current.unit != 'meter')	s.trackman.current.unit = 'meter';
						s.trackman.current.number += 1;
					}
				}
			};
			
			function sendPong(){ 
				var msg = {"Type": "Pong"};
				
				if(s.trackman.isConnect == true){
					trackman.send(JSON.stringify(msg)); 
					pongSender = setTimeout(sendPong, 15000);
				}
			}
		}
		receiveTrackmanData();
	});
};

sureFit.club = function(){
	sureFit.common.app.controller('clubController', function($scope){
		var s = $scope;
		
		s.common.isSubPage = true;
		s.common.routeStep = 'club';
		
		console.log(s.club.trackmanData)
	});
};

sureFit.result = function(){
	sureFit.common.app.controller('resultController', function($scope){
		var s = $scope;
		
		s.common.isSubPage = true;
		s.common.routeStep = 'result';
	});
};

sureFit.common.createApp();