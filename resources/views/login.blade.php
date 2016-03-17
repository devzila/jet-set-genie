<meta id="token" name="token" content="{{csrf_token()}}">
<div class="secure">Secure Login form</div>
<form id="myform" method="POST">
<div class="control-group">
  <div class="controls">
<input type="text" class="form-control span6" name="email" />
  
  </div>
</div>
<div class="control-group">
  <div class="controls">
  <input type="text" class="form-control span6" name="password" />

  </div>
</div>
<input type="hidden" name="_token" value="{{ csrf_token() }}">
<input type="button" class="send-btn" />
</form>

<script src="{{ asset('js/jquery.min.js') }}"></script> 
<script type="text/javascript">
jQuery(document).ready(function(){
  jQuery('.send-btn').click(function(){     
jQuery.ajaxSetup({
   headers: { 'X-CSRF-Token' :jQuery("#token").attr('content')}
});  
    jQuery.ajax({
      url: 'login',
      type: "post",
      data: {'email':jQuery('input[name=email]').val(), '_token': jQuery('input[name=_token]').val()},
      success: function(data){
        alert(data);
      }
    });      
  }); 
});
</script>