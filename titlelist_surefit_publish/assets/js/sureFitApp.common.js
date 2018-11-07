

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
		
		constant : {}, // 상수값 :: 골퍼기본정보(평균타수, 령균연습회수, 타석), 결과지(메일호스트주소, 휴대폰 통신사 번호, 매장지역, 매장지점)
		
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
			isMember : true, // 회원인지 확인(예약자이면 회원임)
			
			name : '김순삼',
			email : 'kim@naver.com',
			phone : '010-000-0000',
			
			mybag : [],
			lastFitingHistory : '',
			
			// 약관동의 :: (온라인) email입력 후 멤버가 아닐 때 자동 체크 :: (오프라인) 수동체크  --- 텍스트 선택시 약관동의 팝업 노출
			// 약관동의 팝업 :: 동의 후 Next버튼 클릭시 임시회원 // 비동의 체크시 시스템팝업 띄우고 회원가입 보류 & 피팅정보 db 저장 보류 // 최종  팝업 시 비동의 체크시 회원가입 안함 & 피팅정보 db 저장 안함
			isAgree : true 
		},  // 직접 입력할 경우 (온라인/오프라인) :: 입력한 회원 or 비회원 정보
				
		trackman : {
			list : [
			        {
			        	category : '',
			        	idx : '',
			        	result  : {clubSpeed : '', ballSpeed : '', launchAngle : '', spinRate : '', smashFactor : '', clubPath : '', faceAngle : '', faceToPath : '', attackAngle : '', swingPlane : '', landingAngle : '', carry : '', total : '', unit : 'meter'}			        	
			        }
			], // 트랙맨 저장된 데이터
			select : {
				category : '',
				idx : '',
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
var constant = {}; // 변하지 않는 데이터 // 상수값 :: 골퍼기본정보(평균타수, 령균연습회수, 타석), 결과지(메일호스트주소, 휴대폰 통신사 번호, 매장지역, 매장지점)

var sureFitApp = angular.module('sureFitApp', ['ngRoute']);
sureFitApp.config(function($routeProvider){
	$routeProvider.when('/sureFit-intro', {
	    templateUrl : 'template/intro.html'
	  }).when('/sureFit-booker', {
	    templateUrl : 'template/booker.html'
	  }).when('/sureFit-trm', {
	    templateUrl : 'template/trm.html'
	  }).when('/sureFit-club', {
	    templateUrl : 'template/club.html'
	  }).when('/sureFit-result', {
	    templateUrl : 'template/result.html'
	  }).otherwise({redirectTo : '/sureFit-intro'});
});

sureFitApp.constant('constant', {
	dataUrl : {
		base : 'http://210.116.75.74',
		fiter : '/titleist-surefit/fiter'
	}
});

sureFitApp.controller('sureFitAppController', function($scope){
	var s = $scope;
	
	s.isUpdate = false;
	s.isOnline = true;
	s.isLogin = false;
	s.isSubPage = false; // when sub page // prev btn // top logo
	
});


// common 메서드
// 데이터 받기, 로그인 확인, 네트워크 모드 확인

