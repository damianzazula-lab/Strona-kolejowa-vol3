# ELTRON - Landing Page dla Przemysłu Kolejowego

## Opis projektu

Kompleksowa strona internetowa dedykowana konstruktorom taboru kolejowego i infrastruktury kolejowej.
Projekt zawiera interaktywną grafikę pociągu z klikanymi obszarami, hierarchiczną strukturę produktów,
bazę wiedzy technicznej oraz formularze kontaktowe do ekspertów.

## Struktura projektu

```
railway-landing-page/
│
├── index.html                      # Strona główna z interaktywną grafiką
├── styles.css                      # Style CSS (pomarańcz #FF8C00 i granat #003366)
├── scripts.js                      # JavaScript dla interakcji
│
├── contact.html                    # Strona kontaktowa z ekspertami
├── knowledge-base.html             # Baza wiedzy technicznej
│
├── driver-cabin.html               # Podstrona: Kabina maszynisty
├── pantograph.html                 # Podstrona: Odbieraki prądu
├── roof-systems.html               # Podstrona: Systemy dachowe
├── control-cabinet.html            # Podstrona: Szafa sterownicza
├── passenger-area.html             # Podstrona: Przestrzeń pasażerska
├── underfloor-systems.html         # Podstrona: Systemy podwozia
├── traction-motors.html            # Podstrona: Silniki trakcyjne
│
├── substations.html                # Podstrona: Podstacje trakcyjne
├── srk-systems.html                # Podstrona: Sterowanie Ruchem Kolejowym
├── control-centers.html            # Podstrona: Centra kontroli
├── trackside.html                  # Podstrona: Systemy przytorowe
├── switches.html                   # Podstrona: Rozjazdy
│
├── train-cutaway.jpg               # Grafika przekroju pociągu
├── sensata-vertical-full-color-medium-resolution-logo.jpg  # Logo
│
├── railway_products_structure.json # Dane produktowe (z Excel)
├── hotspots_config.json            # Konfiguracja hotspotów
└── experts_contacts.json           # Dane ekspertów
```

## Główne funkcjonalności

### 1. Strona główna (index.html)
- **Hero section** z nagłówkiem i opisem oferty
- **Interaktywna grafika pociągu** z 7 klikanymi obszarami:
  - Odbieraki prądu (Pantograf)
  - Systemy dachowe
  - Kabina maszynisty
  - Szafa sterownicza
  - Przestrzeń pasażerska
  - Systemy podwozia
  - Silniki trakcyjne i wózki

- **Sekcja infrastruktury** z 5 kartami:
  - Podstacje trakcyjne
  - Sterowanie Ruchem Kolejowym (SRK)
  - Centra kontroli
  - Systemy przytorowe
  - Rozjazdy

- **Sekcja partnerów** z logami producentów
- **CTA (Call-to-Action)** zachęcające do kontaktu

### 2. Podstrony produktowe
Każda podstrona zawiera:
- Breadcrumb navigation (nawigacja okruszkowa)
- Przycisk powrotu do mapy
- Karty produktowe z informacjami:
  - Producent
  - Kategoria produktu
  - Opis techniczny
  - Rodzina produktów
  - Parametry techniczne
  - Normy i certyfikaty
- **3 przyciski dokumentów** (PDF):
  - 📄 Karta katalogowa
  - 📋 Nota aplikacyjna
  - 📊 Prezentacja

### 3. Strona kontaktowa (contact.html)
- **8 ekspertów produktowych** z kartami zawierającymi:
  - Imię i nazwisko
  - Specjalizacja
  - Produkty/marki
  - Bezpośredni link email z pre-wypełnionym tematem

- **Formularz kontaktowy** z polami:
  - Imię i nazwisko (wymagane)
  - Firma
  - Email (wymagane)
  - Telefon
  - Obszar zainteresowania (dropdown)
  - Wiadomość (wymagane)

**Lista ekspertów:**
1. Damian Zazuła - Mersen
2. Damian Zazuła - Sensata (Airpax, Crydom, Gigavac, Kavlico, Cynergy3)
3. Krzysztof Sobesto - Schroff & Hengstler
4. Anna Podulka - EAO
5. Tomasz Machowski - Carlo Gavazzi
6. Grzegorz Wujczyk - BEI Sensors (Enkodery)
7. Marcin Zalewski - Phoenix Contact
8. Grzegorz Mikołajczyk - Knick

### 4. Baza wiedzy (knowledge-base.html)
12 kategorii tematycznych:
- 📋 Normy i standardy (EN 50155, EN 45545, IEC 61508, TSI PRM, itp.)
- ⚡ Ochrona przed zwarciami
- 🔌 Przekaźniki i wyłączniki
- 🎯 Enkodery i czujniki
- 🖥️ Interfejsy HMI
- 📊 Pomiary wysokiego napięcia
- 🌐 Komunikacja i sieci
- 🛡️ Ochrona przepięciowa
- 📘 White Papers
- 💼 Case Studies
- 🎓 Webinary i szkolenia
- 🧮 Narzędzia i kalkulatory

## Kolorystyka

### Kolory główne:
- **Pomarańczowy:** #FF8C00 (akcenty, CTA, linki)
- **Granat:** #003366 (header, nagłówki, przyciski)
- **Tło:** #F5F5F5 (jasne sekcje)
- **Biały:** #FFFFFF (karty, czyste tło)

### Kolory pomocnicze:
- Ciemny granat: #004080 (gradienty)
- Jaśniejszy pomarańcz: #FF7000 (hover)
- Szary tekst: #333, #666

## Technologie

- **HTML5** - semantyczny markup
- **CSS3** - Grid, Flexbox, animacje
- **JavaScript (Vanilla)** - interakcje bez frameworków
- **Responsive Design** - dostosowane do urządzeń mobilnych

## Wdrożenie na eltron.pl

### Krok 1: Przygotowanie plików
1. Skopiuj wszystkie pliki HTML, CSS, JS do katalogu na serwerze
2. Umieść grafikę `train-cutaway.jpg` i logo w tym samym katalogu
3. Upewnij się, że struktura katalogów jest zachowana

### Krok 2: Integracja z istniejącą stroną
```html
<!-- W istniejącym menu eltron.pl dodaj link: -->
<li><a href="/railway-solutions/index.html">Rozwiązania Kolejowe</a></li>
```

### Krok 3: Dodanie plików PDF
Gdy będziesz mieć dokumenty PDF:
1. Utwórz folder `/railway-solutions/docs/`
2. Nazwij pliki według wzoru: `{producent}_{produkt}_katalog.pdf`
3. Zaktualizuj linki w HTML:
```html
<a href="docs/mersen_protistor_katalog.pdf" class="doc-btn">📄 Karta katalogowa</a>
```

### Krok 4: Konfiguracja formularza
Formularz wymaga backend'u do wysyłania emaili. Opcje:
1. **PHP mail()** - prosty skrypt PHP
2. **FormSpree.io** - darmowe API dla formularzy
3. **Integracja z CRM** - bezpośrednie połączenie z systemem

Przykład PHP (contact_handler.php):
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "info@eltron.pl";
    $subject = "Zapytanie ze strony Railway Solutions";
    $body = "Imię: $name\nEmail: $email\n\nWiadomość:\n$message";

    mail($to, $subject, $body);
    header("Location: contact.html?success=1");
}
?>
```

## Dalszy rozwój

### Faza 2 - do wdrożenia:
1. **Generowanie pozostałych podstron** z danych Excel (automatyzacja)
2. **System wyszukiwania** w bazie wiedzy
3. **Filtry produktów** według producenta/kategorii
4. **Wersja mobilna** - optymalizacja menu hamburger
5. **Google Analytics** - tracking konwersji
6. **Chat online** - LiveChat lub Tawk.to

### Faza 3 - opcjonalne:
1. **CMS** - WordPress + ACF dla łatwej edycji treści
2. **Multi-language** - wersja EN
3. **Integracja z ERP** - dostępność produktów
4. **Konfigurator produktów** - narzędzie doboru

## Wsparcie techniczne

W razie pytań technicznych:
- **Frontend:** HTML/CSS/JS - standardowe technologie webowe
- **Backend:** PHP 7.4+ lub wyższy dla formularzy
- **Hosting:** Standardowy hosting WWW z PHP

## Licencja

© 2026 ELTRON Sp. z o.o. Wszelkie prawa zastrzeżone.
Projekt dedykowany dla ELTRON - nie do użytku komercyjnego przez osoby trzecie.

---

**Autor:** AI Assistant dla ELTRON
**Data:** Luty 2026
**Wersja:** 1.0
