<?php
	$name = $_POST['f_Name'];
	$email = $_POST['f_Email'];
	$phone = $_POST['f_Phone'];

	$name = htmlspecialchars($name);
	$email = htmlspecialchars($email);
	$phone = htmlspecialchars($phone);
	$name = urldecode($name);
	$email = urldecode($email);
	$phone = urldecode($phone);
	$name = trim($name);
	$email = trim($email);
	$phone = trim($phone);

	$order_email_message = '<strong>Имя:</strong> '.$name;
	$order_email_message .= '<br><strong>Телефон:</strong> '.$phone;
	$order_email_message .= '<br><strong>E-mail:</strong> '.$email;

	$to= "StarMedia.by <".$email.">";
	$subject = 'Новая заявка StarMedia.by!';
	$message = '
		<html>
		<head>
		 <title>'.$subject.'</title>
		</head>
		<body>'.$order_email_message.'</body>
		</html>';
	$headers= "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8\r\n";
	$headers .= "From: StarMedia.by <".$email.">\r\n";
	$headers = "Content-type: text/html; charset=utf-8\r\n";
	if( mail($email, $subject, $message, $headers)){
		echo '<p class="success">Письмо успешно отправлено!</p>';
	}else{
		echo '<p class="error">Что-то пошло не так...</p>';
	}

?>