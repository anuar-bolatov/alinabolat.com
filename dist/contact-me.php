<?php
$header = "From: Dmitriy <hello@alinabolat.com>";
$header .= "Reply-To: hello@alinabolat.com";
$header .= "MIME-Version: 1.0\r\n";
  $body = 'Name: ' .$_POST['name'] ."\n"
        .'Email: ' .$_POST['email'] ."\n"
        .'Phone: ' .$_POST['phone'] ."\n"
        .'Message: ' .$_POST['message'];

$message .= $body;
  
    $mail=mail('hello@alinabolat.com', 'New Form submission', $message, $header);
    if($mail)header('location: thank-you.php');
  

?>