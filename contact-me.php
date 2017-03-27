<?php
$header = "From: Dmitriy <dmitriykauts@gmail.com>";
$header .= "Reply-To: dmitriykauts@gmail.com";
$header .= "MIME-Version: 1.0\r\n";
  $body = 'Name: ' .$_POST['name'] ."\n"
        .'Email: ' .$_POST['email'] ."\n"
        .'Phone: ' .$_POST['phone'] ."\n"
        .'Message: ' .$_POST['message'];

$message .= $body;
  
    $mail=mail('dmitriykauts@gmail.com', 'New Form submission', $message,$header);
    if($mail)header('location: thank-you.php');
  

?>