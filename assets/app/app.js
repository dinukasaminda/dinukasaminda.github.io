var exams_app = angular.module('exams_app', []);

exams_app.controller('search_controller', function add_to_gdrive_controller($scope) {
 
});

exams_app.controller('add_to_db_controller', function add_to_gdrive_controller($scope) {
 
});

exams_app.controller('add_to_gdrive_controller', function add_to_gdrive_controller($scope,$http) {
	$scope.to_gdrive_books=[];
	$scope.books_hasgdrive_ids=[];
	
 	$http({
	  method: 'GET',
	  url: base_url_+'/Admin/get_books_not_gdv_upld_chkd',
	}).then(function successCallback(response) {
	    if(response.data.code=='SUCC'){
	    	$scope.to_gdrive_books=response.data.books;

	    	$scope.to_gdrive_books.forEach(function (book, index){
	    		    		
	    	}
	    	);
	    }
	  }, function errorCallback(response) {
	    
	  });

	$http({
	  method: 'GET',
	  url: base_url_+'/Admin/get_books_with_drive_id',
	}).then(function successCallback(response) {
	    if(response.data.code=='SUCC'){
	    	$scope.books_hasgdrive_ids=response.data.books;

	    	$scope.books_hasgdrive_ids.forEach(function (book, index){
	    		    		
	    	}
	    	);
	    }
	  }, function errorCallback(response) {
	    
	  });


	$scope.mark_checked_file = function(index){
		console.log(index);
		
		if($scope.to_gdrive_books[index].bk_admin_checked !=1){
			$scope.to_gdrive_books[index].bk_admin_checked=1;
			show_skbr_notify('File Check ','Successfully');

		}else{
			$scope.to_gdrive_books[index].bk_admin_checked=0;

		}
		
	}
	$scope.cloud_upload_file = function(index){
		console.log(index);
		if($scope.to_gdrive_books[index].bk_admin_checked==1){
			
			if($scope.to_gdrive_books[index].bk_status !=2){
				$scope.to_gdrive_books[index].bk_status=2;
				show_skbr_notify('File Uploaded to Drive ','Successfully');

			}else{
				$scope.to_gdrive_books[index].bk_status=1;
				$scope.to_gdrive_books[index].gfile_visibilty=0;
			}
		}else{
			show_skbr_notify('You must check file first.','Check');
		}
		
	}
	$scope.cloud_publish_file = function(index){
		console.log(index);
		
		if($scope.to_gdrive_books[index].bk_status >1){
			
			if($scope.to_gdrive_books[index].gfile_visibilty ==0){
				$scope.to_gdrive_books[index].gfile_visibilty=1;
				show_skbr_notify('Drive File Shared ','Link');

			}else{
				$scope.to_gdrive_books[index].gfile_visibilty=0;
			}
		}else{
			show_skbr_notify('You must upload to drive for share.','Upload');
		}
		
	}
	

	$scope.drive_files=[];
 	
 	/*$http({
	  method: 'GET',
	  url: base_url_+"/Gapi_client/get_all_files",
	}).then(function successCallback(response) {
	    if(response.data.msg=='success'){
	    	$scope.drive_files=response.data.data;

	    	
	    }
	  }, function errorCallback(response) {
	    
	  });*/
});