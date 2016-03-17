<?php 
	
	$name = $_POST['name'];
	$email = $_POST['email'];

    $to = 'ashriti.gupta@ideapps.in';
    $from = $email;
    $first_name = $_POST['name'];
    $subject = "New request from $name";
	$headers .= "MIME-Version: 1.0\r\n";
 	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	$headers .= "From: ". $name ."<".$from.">";
    $message .= '
    <div style="padding:20px; background:#D3D3D3">
    
  <table style="width:600px" bgcolor="#FFFFFF" align="center" cellpadding="20">
  <tr> 
  	<td style="text-align:center;" colspan="2">
  		<a class="sydneysilverservice" href="http://sydneysilverservice.com.au/"><img src="http://sydneysilverservice.com.au/images/logo.jpg"  alt="sydney silver service" /></a>
  	</td>
  </tr>
  <tr>
      <td> <strong><h3> Quote Details: </h3> </strong></td>
 
  </tr>
  <tr>
    <td>Name:</td>
    <td>' . $name. ' </td> 
  </tr>
 
  <tr>
    <td>Email Id:</td>
    <td>' .$email. '</td> 
  </tr>

</table>
</div>';

 // $process_email = mail($to,$subject,$message,$headers);
 
echo $process_email;


?>