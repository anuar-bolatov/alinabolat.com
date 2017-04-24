<?php

$recepient = "hello@alinabolat.com";
$sitename = "alinabolat.com";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$phone = trim($_POST["phone"]);
$text = trim($_POST["message"]);
$message = "Name: $name \nEmail: $email \nPhone: $phone \nMessage: $text";

$pagetitle = "New message from \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>