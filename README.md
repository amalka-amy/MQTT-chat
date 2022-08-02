# Cvičení: MQTT chat

## Zadání

Vytvoř webovou stránku s textovým vstupem a tlačítkem pro odeslání, která bude posílá zprávy do společného chatu.

1. Založ si na počítači novou projektovou složku s `index.html` a podle potřeby i se souborem na JavaScript.

1. Do HTML přidej textové políčko a odesílací tlačítko.

1. Po kliknutí na tlačítko odešli MQTT brockerovi textovou zprávu do tvého topicu `/row/{číslo}/message`.

## Bonusy

- Po odeslání zprávy vymaž text z textového políčka, aby uživatel mohl snadno napsat nový.

- Stránku nastyluj tak, aby se ti líbila.

## Extra Bonusy

- Přihlas se u brockera k odběru všech zpráv a zprávy vypiš na stránku pod formulář.

- Přidej zvukové upozornění, které se přehraje při přijetí každé nové zprávy. Zvuk zdarma si můžeš vybrat třeba na [freesound.org](https://freesound.org/). Přidej ho do projektové složky. V JavaScriptu ho přehraješ pomocí `new Audio('muj-zvuk.mp3').play()`.
