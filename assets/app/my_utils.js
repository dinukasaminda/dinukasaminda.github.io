
function to_db_upload(token_){
  var myFormData = new FormData();
  var datafile=$('#to_db_file1').prop('files')[0];


  var to_db_oocat_by= ($("input:radio[name=to_db_oocat_by]:checked").val()); 
  var to_db_exam_title=$("#to_db_exam_title").val();
  var to_db_exam_year= $("#to_db_exam_year").val();
  var to_db_exam_date=$("#to_db_exam_date").val();
  var to_db_mlang=($("input:radio[name=to_db_mlang]:checked").val());
   console.log(to_db_mlang);
  myFormData.append('token_data', token_);
  myFormData.append('to_db_file1', datafile);

  myFormData.append('to_db_oocat_by', to_db_oocat_by);
  myFormData.append('to_db_exam_year', to_db_exam_year);
  myFormData.append('to_db_exam_date', to_db_exam_date);
  myFormData.append('to_db_mlang', to_db_mlang);
  myFormData.append('to_db_exam_title', to_db_exam_title);


  console.log('aaa'+token_);
  show_skbr_notify('uploading started.','show');
  $.ajax({
    url: base_url_+'/Welcome/to_db_',
    type: 'POST',
    processData: false, // important
    contentType: false, // important
    dataType : 'json',
    data: myFormData,
    success:function(res){
      console.log(res.code);
      show_skbr_notify('Successfully uploaded.');
      

    },
    error:function(res){
      console.log(JSON.parse(res));
    }
    });
}
function show_cont(cont_id){
  $('#'+cont_id).addClass('my_show_cls');
  $('#'+cont_id).removeClass('my_hidden_cls');
}
function hide_cont(cont_id){  
  $('#'+cont_id).addClass('my_hidden_cls');
  $('#'+cont_id).removeClass('my_show_cls');
}

function show_skbr_notify(text,action){
  var notification = document.querySelector('.mdl-js-snackbar');
      var data = {
        message: text,
        actionHandler: function(event) {},
        actionText:action,
        timeout: 1500
      };
      notification.MaterialSnackbar.showSnackbar(data);
}

$('#my_handler_cntent').on("mouseenter mouseleave", ".my_chk_btn", function(evt) {
  if(evt.type == 'mouseenter' ){
    console.log('aaa');
    var icon_success=$(this).attr('data-succss');
    $(this).children('i').html(icon_success);
  }else if($(this).attr('data-toggle')!= 1){
    var icon_failure=$(this).attr('data-failure');
    $(this).children('i').html(icon_failure);
  }


});
