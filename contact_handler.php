<?php
// ELTRON Railway Solutions - Contact Form Handler
// Konfiguracja
$to_email = "elektrotechnika@eltron.pl";  // ZMIEŃ NA WŁAŚCIWY EMAIL
$from_email = "noreply@eltron.pl";

// Sprawdź metodę
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Pobierz i oczyść dane
    $name = strip_tags(trim($_POST["name"]));
    $company = strip_tags(trim($_POST["company"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $product_area = strip_tags(trim($_POST["product-area"]));
    $message = trim($_POST["message"]);

    // Walidacja
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Proszę wypełnić wszystkie wymagane pola poprawnie.";
        exit;
    }

    // Przygotuj treść emaila
    $email_subject = "Zapytanie Railway Solutions: $product_area";
    $email_body = "Nowe zapytanie ze strony Railway Solutions\n\n";
    $email_body .= "Imię i nazwisko: $name\n";
    $email_body .= "Firma: $company\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Telefon: $phone\n";
    $email_body .= "Obszar zainteresowania: $product_area\n\n";
    $email_body .= "Wiadomość:\n$message\n";

    // Nagłówki
    $headers = "From: $from_email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Wyślij
    if (mail($to_email, $email_subject, $email_body, $headers)) {
        header("Location: contact.html?success=1");
        exit;
    } else {
        http_response_code(500);
        echo "Wystąpił błąd podczas wysyłania. Spróbuj ponownie.";
        exit;
    }

} else {
    http_response_code(403);
    echo "Nieprawidłowe żądanie.";
    exit;
}
?>