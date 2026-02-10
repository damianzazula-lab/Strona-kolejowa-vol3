# INSTRUKCJA WDROŻENIA
# Landing Page dla Przemysłu Kolejowego - ELTRON

## SZYBKI START

### 1. Przygotowanie plików

Wszystkie pliki zostały wygenerowane i są gotowe do wdrożenia.
Wymagane pliki graficzne (załączone):
- train-cutaway.jpg
- sensata-vertical-full-color-medium-resolution-logo.jpg

### 2. Upload na serwer

A) **Wariant 1: Nowy katalog (ZALECANE)**
```
/public_html/railway/
├── wszystkie pliki HTML
├── styles.css
├── scripts.js
├── train-cutaway.jpg
└── sensata-vertical-full-color-medium-resolution-logo.jpg
```

Dostęp: www.eltron.pl/railway/

B) **Wariant 2: Subdomena**
```
railway.eltron.pl
```
Wymaga utworzenia subdomeny w panelu hostingu.

### 3. Integracja z istniejącą stroną

Dodaj link w menu głównym eltron.pl:
```html
<li><a href="/railway/">Rozwiązania Kolejowe</a></li>
```

### 4. Konfiguracja formularza kontaktowego

Utworzony został plik contact_handler.php (poniżej).
Upload i konfiguracja:

**Plik: contact_handler.php**
```php
<?php
// Konfiguracja
$to_email = "info@eltron.pl";
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
    $email_body .= "Obszar: $product_area\n\n";
    $email_body .= "Wiadomość:\n$message\n";

    // Nagłówki
    $headers = "From: $from_email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Wyślij
    if (mail($to_email, $email_subject, $email_body, $headers)) {
        header("Location: contact.html?success=1");
    } else {
        http_response_code(500);
        echo "Wystąpił błąd podczas wysyłania. Spróbuj ponownie.";
    }

} else {
    http_response_code(403);
    echo "Nieprawidłowe żądanie.";
}
?>
```

Zaktualizuj action w contact.html:
```html
<form action="contact_handler.php" method="post">
```

### 5. Dodawanie dokumentów PDF

Gdy będziesz mieć pliki PDF:

1. Utwórz folder: `/railway/docs/`
2. Upload plików PDF
3. Zaktualizuj linki w plikach HTML:

**Przed:**
```html
<a href="#" class="doc-btn">📄 Karta katalogowa</a>
```

**Po:**
```html
<a href="docs/mersen_protistor_katalog.pdf" class="doc-btn" target="_blank">📄 Karta katalogowa</a>
```

**Przykładowa struktura nazw:**
- docs/mersen_protistor_katalog.pdf
- docs/mersen_protistor_nota_aplikacyjna.pdf
- docs/mersen_protistor_prezentacja.pdf
- docs/eao_seria04_katalog.pdf
- docs/sensata_airpax_snapak_katalog.pdf
...itd.

### 6. Testowanie

Po wdrożeniu przetestuj:

✓ Nawigacja między stronami
✓ Klikalne obszary na grafice pociągu
✓ Linki w menu i breadcrumb
✓ Formularz kontaktowy
✓ Linki email do ekspertów
✓ Responsywność na mobile

### 7. SEO - Opcjonalne

Dodaj do head każdej strony:
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<link rel="canonical" href="https://www.eltron.pl/railway/">
<meta property="og:title" content="...">
<meta property="og:image" content="https://www.eltron.pl/railway/train-cutaway.jpg">
```

### 8. Analytics

Dodaj kod Google Analytics przed </head>:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXX-X');
</script>
```

## TROUBLESHOOTING

**Problem:** Obrazki się nie wyświetlają
**Rozwiązanie:** Sprawdź ścieżki w HTML - muszą być relatywne lub absolutne

**Problem:** Formularz nie działa
**Rozwiązanie:** 
1. Sprawdź czy PHP mail() jest włączone na hostingu
2. Sprawdź logi błędów PHP
3. Użyj alternatywnego rozwiązania (FormSpree, EmailJS)

**Problem:** Strona źle wygląda na mobile
**Rozwiązanie:** Sprawdź czy tag viewport jest obecny w <head>

## KONTAKT TECHNICZNY

W razie problemów:
- Hosting: Skontaktuj się z supportem hostingu
- Frontend: Standardowe technologie HTML/CSS/JS
- Backend: PHP 7.4+

## BACKUP

ZAWSZE rób backup przed wdrożeniem:
```bash
cp -r /public_html /public_html_backup_$(date +%Y%m%d)
```

## FINALNE SPRAWDZENIE

Przed publikacją:
□ Wszystkie obrazki są na miejscu
□ Linki działają
□ Formularz wysyła maile
□ Strona jest responsywna
□ Loga producentów są dodane
□ Dokumenty PDF są dodane (jeśli dostępne)
□ Analytics są włączone

---

**Data utworzenia:** Luty 2026
**Wersja:** 1.0
**Status:** Gotowe do wdrożenia
