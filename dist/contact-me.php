<?php
if(isset($_POST['submit'])) {
	$msg = 'Name: ' .$_POST['name'] ."\n"
		.'Email: ' .$_POST['email'] ."\n"
		.'Phone: ' .$_POST['phone'] ."\n"
		.'Message: ' .$_POST['message'];
	mail('hello@alinabolat.com', 'New Form submission', $msg);
	header('location: thank-you.html');
} else {
	header('location: contact.html');
	exit(0);
}
?>