var sureFitApp = angular.module('sureFitApp', ['ngRoute']);
sureFitApp.config(function($routeProvider){
	$routeProvider.when('/sureFit-intro', {
	    templateUrl : 'template/intro.html'
	  }).when('/sureFit-reserve', {
	    templateUrl : 'template/reserve.html'
	  }).when('/sureFit-trm', {
	    templateUrl : 'template/trm.html'
	  }).when('/sureFit-club', {
	    templateUrl : 'template/club.html'
	  }).when('/sureFit-result', {
	    templateUrl : 'template/result.html'
	  }).otherwise({redirectTo : '/sureFit-intro'});
});

sureFitApp.controller('sureFitAppController', function($scope){
	
});

sureFitApp.controller('introController', function($scope, flickPicker){
	angular.element('#inner-content-div').slimScroll({ 
		height: '250px', 
		railVisible: true, 
		alwaysVisible: true
	});
	/*
	width: '300px',
    height: '500px',
    size: '10px',
    position: 'left',
    color: '#ffcc00',
    alwaysVisible: true,
    distance: '20px',
    start: $('#child_image_element'),
    railVisible: true,
    railColor: '#222',
    railOpacity: 0.3,
    wheelStep: 10,
    allowPageScroll: false,
    disableFadeOut: false
	*/
	
	$scope.club = {
			category : []
	};
	$scope.shaft = {};	
	
	var fitingClubData = {
		category : {
			driver : {
				club : {
					model : ['driver club model 1', 'driver club model 2', 'driver club model 3']
				},
				shaft : {
					brand : ['driver shaft brand 1', 'driver shaft brand 2', 'driver shaft brand 3'],
					model : ['driver shaft model 1', 'driver shaft model 2', 'driver shaft model 3'],
					flex : ['driver shaft flex 1', 'driver shaft flex 2', 'driver shaft flex 3']
				}
			},
			fairway : {
				club : {
					model : ['fairway club model 1', 'fairway club model 2', 'fairway club model 3']
				},
				shaft : {
					brand : ['fairway shaft brand 1', 'fairway shaft brand 2', 'fairway shaft brand 3'],
					model : ['fairway shaft model 1', 'fairway shaft model 2', 'fairway shaft model 3'],
					flex : ['fairway shaft flex 1', 'fairway shaft flex 2', 'fairway shaft flex 3']
				}
			},
			hybrid : {
				club : {
					model : ['hybrid club model 1', 'hybrid club model 2', 'hybrid club model 3']
				},
				shaft : {
					brand : ['hybrid shaft brand 1', 'hybrid shaft brand 2', 'hybrid shaft brand 3'],
					model : ['hybrid shaft model 1', 'hybrid shaft model 2', 'hybrid shaft model 3'],
					flex : ['hybrid shaft flex 1', 'hybrid shaft flex 2', 'hybrid shaft flex 3']
				}
			},
			iron : {
				club : {
					model : ['iron club model 1', 'iron club model 2', 'iron club model 3'],
					comp : [['iron comp 1-1', 'iron comp 1-2', 'iron comp 1-3'], ['iron comp 2-1', 'iron comp 2-2', 'iron comp 2-3']]
				},
				shaft : {
					brand : ['iron shaft brand 1', 'iron shaft brand 2', 'iron shaft brand 3'],
					model : ['iron shaft model 1', 'iron shaft model 2', 'iron shaft model 3'],
					flex : ['iron shaft flex 1', 'iron shaft flex 2', 'iron shaft flex 3']
				}
			},
			wedge : {
				club : {
					model : ['wedge club model 1', 'wedge club model 2', 'wedge club model 3'],
					loftbounce : ['wedge club loftbounce 1', 'wedge club loftbounce 2', 'wedge club loftbounce 3']
				},
				shaft : {
					brand : ['wedge shaft brand 1', 'wedge shaft brand 2', 'wedge shaft brand 3'],
					model : ['wedge shaft model 1', 'wedge shaft model 2', 'wedgen shaft model 3'],
					flex : ['wedge shaft flex 1', 'wedge shaft flex 2', 'wedge shaft flex 3']
				}
			}
		}
	};

	flickPicker.init(fitingClubData);
//	$scope.club.category = flickPicker.setScope('category');
});

sureFitApp.factory('flickPicker', function(){
	var FlickPicker = function(_data){
		this.data = _data;
		this.$selector = {
				main : angular.element('.mainPicker'),
				sub : (angular.element('.subPicker').length) ? angular.element('.subPicker') : null
		};
		this.prop = {
			height : 34,
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
		
		this.init();
	};
	
	FlickPicker.prototype = {
		init : function(){
			var THIS = this,
				SubFlickPicker; 
			
			SubFlickPicker = function(_category){
				this.category = _category;
				this.init();
			};
			
			SubFlickPicker.prototype = {
				init : function(){
					console.log(this.category);
				}	
			}
			
			this.prop.top = this.$selector.main.find('ul').position().top;
			
			this.prop.category = [];
			for(var key in this.data['category']){
				this.prop.category.push(key);
			}
			
			this.$selector.main.find('ul').empty();
			$.each(this.prop.category, function(idx){
				THIS.$selector.main.find('ul').append('<li data-value="'+ THIS.prop.category[idx] +'">'+ THIS.prop.category[idx] +'</li>');
			});
			this.$selector.main.find('ul').prepend('<li data-value="none">none</li>');
			this.$selector.main.find('ul').find('li').first().addClass('active');
			this.category = this.$selector.main.find('ul').find('li').first().text(); 
			
			if(this.$selector.sub != null){
				this.prop.length = this.$selector.sub.length;
				this.$selector.sub.each(function(_idx){
					THIS.prop.subPicker[_idx] = new SubFlickPicker(THIS.category);
				});
			}	
		},
		
		addEvent : function(){
			
		}
	};
	
	
	return {
//		setScope : function(_root){
//			var category = [];
//			for(var key in data[_root]){
//				category.push(key);
//			}
//			return category;
//		},
		
		init : function(_data){
			new FlickPicker(_data);
						
			
			
			
			
//			$selector.each(function(_idx){
//				var id;
//				id = String($(this).attr('id')).split('-');
//				prop.title[_idx] = id[1];
//			});
//			
//			$selector.eq(0).find('ul').empty();
//			for(var key in data[prop.title[0]]){
//				$selector.eq(0).find('ul').append('<li data-value="'+ key +'">'+ key +'</li>');
//			}
//			$selector.eq(0).find('ul').find('li').first().addClass('active');
//			$selector.eq(0).find('ul').bind({
//				'touchstart' : function(e){
//					prop.isTouch = true;
//					prop.startTouchY = e.originalEvent.targetTouches[0].pageY;
//					prop.startY = $(this).position().top;
//				},
//				'touchmove' : function(e){
//					var tarY;
//					
//					prop.endTouchY = e.originalEvent.targetTouches[0].pageY;
//					prop.direction = prop.getDirection(prop.startTouchY, prop.endTouchY);
//					
//					switch(prop.direction){
//						case 'down' :
//							tarY = ($(this).position().top >= 0) ? 0 : prop.startY - prop.distCheck(prop.startTouchY, prop.endTouchY);
//							break;
//							
//						case 'up' :
//							tarY = (-Math.abs($(this).position().top) <= -($(this).height() - prop.height)) ? -($(this).height() - prop.height) : prop.startY - prop.distCheck(prop.startTouchY, prop.endTouchY);
//							break;
//							
//						default :
//							break;
//					}					
//					$(this).css({'top': tarY});
//				},
//				'touchend' : function(e){
//					var tarY,
//						hold = Math.abs($(this).position().top) / prop.height,
//						holdT;
//
//					if(prop.isTouch == true){							
//						holdT = hold - parseInt(hold);
//						tarY = (holdT < .5) ? -(parseInt(hold) * prop.height) : -((parseInt(hold) + 1) * prop.height);
//						
//						prop.cNum = Math.abs(tarY / prop.height);
//						
//						$(this).animate({'top': tarY}, 100, function(){
//							$(this).find('li').each(function(idx){
//								if(prop.cNum != idx){
//									if($(this).hasClass('active'))	$(this).removeClass('active');
//								}else{
//									$(this).addClass('active');
//								}
//							});
//						});
//						prop.isTouch = false;
//					}
//				}
//			});
			
			
			
			
			
			
		}
	}
});
