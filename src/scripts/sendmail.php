<?php
$data = json_decode(file_get_contents('https://project2-hw1.firebaseio.com/Users.json'), true);
print_r($data);
echo $data[1];

	foreach ($data as $email => $value) {
		$to      = value;
		$subject = 'You Should Go That Restaurant';
		$message = 'Hello, please visit the project2-hw1.firebaseapp.com website to see the today \'s new restaurant';
		$headers = 'From: ulak@itu.edu.tr' . "\r\n" .
		    'Reply-To: ulak@itu.edu.tr' . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();

		mail($to, $subject, $message, $headers);
	}


?>
