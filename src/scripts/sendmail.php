<?php
$data = json_decode(file_get_contents('https://project2-hw1.firebaseio.com/Users.json'), true);
print_r($data);
echo $data[1];

    /*
	$to      = 'nobody@example.com';
	$subject = 'the subject';
	$message = 'hello';
	$headers = 'From: webmaster@example.com' . "\r\n" .
	    'Reply-To: webmaster@example.com' . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
	*/


?>
