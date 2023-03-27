var stuFormApp = angular.module("stuFormApp", []);
stuFormApp.controller("stuAppCntrllr", function ($scope) {
	var isFrmValid = false; 				//For checking whether all data is Valid
	var editIndex;							//for storing index when edit button is clicked
	$scope.formVw = false;					//initially hiding form
	$scope.aStuData = []; 					// Array for storing all student data as object	
  	$scope.oStuData = {}; 					//object for storing each student data
	$scope.shwSmbtBtn = true;				//showing submit button initially
	//Showing Form once Add new record button gets clicked in popup
	$scope.addNwBtn = function(){
		$scope.formVw =true;
	}
	//Hiding form once view records button gets clicked
	$scope.vwStuRcds = function(){
		$scope.formVw = false;
	}
	//Gender Selection and gender value selecting
	$scope.genders = ["Male", "Female"];
	//Function gets call once submit button gets clicked no *args no return
  	$scope.smbtStuRcd = function () {
    	isFrmValid = true;
    	vldtName();
    	vldtRegNo();
    	vldtAge();
    	vldtPhn();
    	vldtDplct();
		// pushing data into an array if its valid no *args no return
    	if (isFrmValid == true) {
        	$scope.aStuData.push(angular.copy($scope.oStuData));
        	$scope.oStuData = {};
        	$scope.formVw = false;
      	}
		console.log($scope.aStuData);	
	}
  	//Function for validating userName no *args no return
  	function vldtName() {
		if (!$scope.oStuData.name ) {
      		$scope.stuNameVld = true;
      		isFrmValid = false;
    	}else {
      		$scope.stuNameVld = false;
    	}
	}
	//Adding data from model side no *args no return
	$scope.updtNewRcrd  = function(){
		$scope.formVw = true;
	}
  	//function for validating regNo no *args no return
  	function vldtRegNo() {
    	var stuRgNo = $scope.oStuData.stuRegNo + ""; //converts number to string to find length
    	if (!$scope.oStuData.stuRegNo || stuRgNo.length<8 ) { 
      		$scope.regNoVld = true;
      		isFrmValid = false;
			console.log($scope.oStuData.stuRegNo)
    	}else {
     		$scope.regNoVld = false;
			console.log($scope.oStuData.stuRegNo)
    	}
	}
  	//function for validating Age no *args no return
	function vldtAge() {
    	if (!$scope.oStuData.stuDob ) {
    		$scope.dobVld = true;
      		isFrmValid = false;
    	}else {
			// var years = moment().diff('$scope.oStuData.stuDob', 'years',false);
			// alert(years);
			var stuBrthYr = $scope.oStuData.stuDob.getFullYear();
			var stuBrthMnth = $scope.oStuData.stuDob.getMonth();
			var stuBrthDate = $scope.oStuData.stuDob.getDate();

			var curYear = new Date().getFullYear();
			var curMnth = new Date().getMonth();
			var curDate = new Date().getDate();
			stuAge = curYear - stuBrthYr;

      		if (stuAge >= 18 && curMnth < stuBrthMnth || curDate < stuBrthDate){
	      		stuAge--;
    		}
      		if (stuAge < 18) {
        		$scope.dobVld = true;
        		isFrmValid = false;
      		}else {
        		$scope.dobVld = false;
      		}
    	}
	}
  	//Phone Number Validation no *args no return
  	function vldtPhn() {
    	var strstuPhone = $scope.oStuData.stuPhone + "";
    	if (!strstuPhone || strstuPhone.length != 10) {
    		$scope.phnVld = true;
      		isFrmValid = false;
    	}else {
      		$scope.phnVld = false;
    	}
	}
  	//Duplicate Validation no *args no return
  	function vldtDplct() {
    	if ($scope.aStuData.length != 0) {
      		for (var i = $scope.aStuData.length -1; i >=0 ; i--) {
        		if ($scope.aStuData[i].stuRegNo == $scope.oStuData.stuRegNo){
        			alert("user Already Exist");
          			isFrmValid = false;
          			break;
        		}
      		}
    	}
	}
	//update button duplicate validtion no *args no return
	function updtDplctVldtn(){
		for (var i = $scope.aStuData.length -1; i >=0 ; i--) {
			if (editIndex != i){
				if($scope.aStuData[i].stuRegNo == $scope.oStuData.stuRegNo){
					alert("user Already Exist");
					isFrmValid = false;
					break;
				}
			}
		}
	}
	//Crud side Edit button index of edtbtn is *args no return
	$scope.edtStuRcrd = function(index){
		editIndex = index;
		$scope.oStuData = angular.copy($scope.aStuData[index]);
		$scope.shwSmbtBtn = false;
		$scope.formVw =true;
	}
	//Update button function no *args no return
	$scope.updStuRcd = function(){
		isFrmValid = true;
		vldtName();
    	vldtRegNo();
    	vldtAge();	
    	vldtPhn();
		updtDplctVldtn();	
		if (isFrmValid) {
			$scope.aStuData[editIndex] = $scope.oStuData;
			$scope.oStuData ={};
			$scope.shwSmbtBtn = true;
			$scope.formVw =false;
		}
	}
	//Delete button function index of delBtn is *args no return
	$scope.dltStuRcrd = function(delindex){
		$scope.aStuData.splice(delindex,1);
	}
});	
