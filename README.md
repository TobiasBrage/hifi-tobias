# HIFI praktik

## Forberedelse
* Design
* Wireframe
* ER diagram
* Sider
  * Forside
  * Produkt side
  * Admin side
    * Log ind
    * Profil indstillinger
      * Ændre adgangskode
      * Ændre profil oplysninger
    * Redigere produkter
    * Tilføj produkter
    * Beskeder
    * Brugere

## Routes
* redigere
  * `/edit/user` 

    Opdaterer en brugers oplysninger med POST.

  * `/edit/password` 

    Opdaterer en brugers adgangskode med POST.

  * `/edit/product`

    Opdaterer et produkt med POST.

* opret
  * `/add/category/:id`

    Opretter en ny kategori med GET.

  * `/add/product`

    Opretter et produkt med POST.

  * `/add/user`

    Opretter en bruger med POST.

  * `add/message`

    Opretter en besked med POST.

* slet
  * `/delete/product/:id`

    Sletter et produkt med GET.

  * `/delete/user/:id`

    Sletter en bruger med GET.

  * `/delete/category/:id`

    SLetter en kategori med GET.

* `/delete/message/:id`

    Sletter en besked med GET.

* hent et element
  * `/category/:id`

    Henter alle elementer fra en specifik kategori med GET.

  * `/product/:id`

    Henter et specifikt produkt med GET.

  * `/user/:id`

    Henter en specifik bruger med GET.

* hent alle elementer
  * `/category`

    Henter alle produkter fra alle kategorier.

  * `/user`

    Henter alle brugere.

  * `/messages`

    Henter alle beskeder.

* hent en værdi
  * `/product/lastid`

    Henter det sidste id fra produkter.

* øvrige
  * `/login`

    Returnerer brugerens id med POST.

  * `/search/:src`

    Returnerer specifikke produkter med GET.

  * `/product/images`

    Returnerer alle produkt billeder med GET.

  * `/user/permissions`

    Returnerer alle tilladelser med GET.

  * `/product/categories`

  Returnerer alle kategorier med GET.

## Status
### Praktiske oplysninger
* `API` kører på `port: 1337` - `http://localhost:1337/`
* Der ligger to brugere i `bruger tabellen`
  * `brugernavn`: admin og `adgangskode`: admin
  * `brugernavn`: superadmin og `adgangskode`: superadmin

### Design
Siden bruger `bootstrap` og kan til en vis grad tilpasse sig alle skærmstørelser, men da jeg aldrig før har brugt `javascript` i så stor en grad som dette projekt krævede, mistede jeg overblikket over `mobile first` og havde mere fokus på de mange funktioner siden skulle have.

### Forsiden
På forsiden er et simpelt `slideshow`, lidt mumletekst og tre `tilfældige` produkter ved at bruge `/product/:id routet`, `id` er dog `=rand` da der i `API'et` er en `funktion` der kan generere et `tilfældigt` tal hvis `id=rand`.

### Kontakt siden
Jeg valgte at fjerne `kontakt siden` da jeg følte det var spild af en hel side kun at indenholde få tekst felter, derfor inkluderede jeg `kontakt formularen`i `footeren`.

![wireframe mobil](https://github.com/TobiasBrage/hifi-tobias/blob/master/forberedelse/footer.jpg?raw=true)

### Produkter
På produkt siden kan der enten vises alle produkter eller vælge at `sortere` dem efter `kategorier` fra `menuen` af, bemærk at `kategori dropdown menuen` er `dynamisk` og automatisk `tilføjer eller fjerner` nye `kategorier`.

### Søge funktion
Søge funktionen virker ved at tage værdien fra et `text input` for så at lave en forspørgsel i `API'et` udfra følgnde `route: http://localhost:1337/search/:src`, `src` er værdien der bliver søgt efter. Der bliver søgt i databasen med værdien ved brug af `LIKE` funktionen i `SQL` hvor den i dette eksempel kun søger efter titel på et givende produkt. På `forsiden` har `søge inputtet` en ekstra `funktion`, her viser den resultater under `søge formularen` i takt med at man indtaster.

### Log ind funktion
`Log ind` siden kan findes ved at klikke på "Admin panel" i bunden af `footeren`, her vil man blive ført til `log ind formularen`.

* Cookie

  Log ind gør brug af `cookies` da ved et succesfuldt log ind gemmer siden en `cookie` i browseren med navnet `loggedIn` og hvor værdien er brugerens `id` fra `databasen`. Hvis brugeren ikke selv logger ud vil `loggedIn Cookien` automatisk blive slettet efter 2 døgn.

* API

  Når brugeren logger ind bliver `brugernavn` og `adgangskode` værdierne givet videre til `API'et` som sørger for eventuelle fejlmeddelser eller ved et succesfuldt log ind returnerer brugerens `id`. `API'et` tjekker `brugernavnets` og `adgangskodens` længde og om `brugernavnet` eksisterer og hvis det gør om `adgangskoden` matcher, derfor kan `API'et` give adskillige fejlmeddelser.
    * shortUsername
    * wrongUsername
    * shortPassword
    * wrongPassword

* Sikkerhed

  `Adgangskoden` bliver `krypteret` til en simpel `MD5 kryptering`, det giver et tyndt lag af sikkerhed, men det er trods alt bedre end ingenting.

* Admin panel (CMS)

  `adminUser.js` er en fil som tjekker browseren for `loggedIn Cookien`, hvis den eksisterer bliver der foretaget en forspørgsel på `API'et` om brugerens oplysninger som `navn, brugernavn, mail og tilladelse`, hvis den ikke eksisterer bliver brugeren smidt på forsiden.
  Man kan derfor ikke befinde sig på admin delen af hjemmesiden uden at være `logget ind` da alle filer i `admin mappen` inkluderer `adminUser.js` filen.
  Indtil videre er der to slags tilladelser på siden:
    * admin

      Giver kun tilladelse til at se og slette beskeder da denne type bruger er ment som en `support bruger` der kan svare på henvendelser.

    * superadmin

      Denne type bruger har fuld adgang.

## Admin siden (CMS)
`Admin` siden indenholder følgende sider:
* Produkter

  Her kan man vælge at få vist alle produkter på en gang eller at vise produkter ud fra kategorier.
  På `admin` siden har hvert produkt en `Slet` og en `Rediger` knap.
  * `Slet` sletter produktet.
  * `Rediger` gør det muligt at ændre billede på produktet, ændre titel eller ændre på beskrivelsen. Når man er færdig med at redigere trykkes på `Gem` knappen som opdaterer siden og gemmer de nye oplysninger ved at `POST` værdierne til `API'et`.

![wireframe mobil](https://github.com/TobiasBrage/hifi-tobias/blob/master/forberedelse/editproduct.jpg?raw=true)

* Tilføj produkt

  Her kan man først og fremmeste oprette et nyt pordukt. Først skal der `uploades` et billede, dette gøres ved at trykke på `Vælg billede` knappen som lader dig vælge en fil fra computeren. Derefter trykkes på `Upload billede`, hvis alt gik som det skulle vil siden vise billedet, ellers vil en passende `fejlmeddelse` vise sig.
  Nu skal der indtastes nogle oplysninger som er krævet før at produktet kan blive oprettet, alle `text input`skal overskride en passende længde ellers skal siden nok fortælle brugeren hvis der er noget galt.
  Når der skal vælges en `kategori` til produktet kan der vælges en fra listen ellers kan der trykkes på `Rediger kategorier`, hvor der vil vise sig tre `elementer`. Hvis der blot skal `slettes` en `kategori` vælges `kategorien` på listen og derefter trykkes på `Slet kategori` knappen.
  Hvis der derimod skal oprettes en ny `kategori` skrives `kategoriens` navn og der trykkes på `Tilføj kategori`. Uanset om der slettes eller oprettes en `kategori` vil listen blive opdateret.

* Brugere

  Her kan man se en liste med alle eksisterende `brugere` bortset fra sin egen. Hvis en `bruger` skal `slettes` trykkes der blot på `slet` til højre fra `brugernavnet`.
  Hvis der skal oprettes en `bruger` skal der indtastes en del oplysninger som skal bruges, siden melder med passende `fejlmeddelser` hvis er grund til det.

* Beskeder

  Her vises blot en liste med alle `beskeder`. Hver besked har tre `vigtige elementer`.
    * Navn
    * E-mail
    * Besked
  Der er ikke indbygget nogen `svar` muligheder på siden, det kunne dog godt implementeres, men virkede ikke relevant i dette tilfælde.
  Nederst for hver `besked` er en `slet` knap som sletter den ønskede `besked`.

* Bruger

Oppe i højre hjørne findes en `dropdown menu` med følgende muligheder.
  * Ændre profil

    Her kan der ændres i `brugerens` oplysniger som `navn`, `e-mail` og `brugernavn`.

  * Ændre adgangskode

    Her kan `adgangskoden` ændres, det sker ved først at indtaste den eksisterende `adgangskode` og dernæst den nye `adgangskode` to gange for at minimere risikoen for stavefejl.

  * Log ud

    Dette `logger brugeren` ud ved at slette `loggedIn cookien` og brugeren bliver derfor navigeret tilbage på `log ind` siden. Hvis man ikke ønsker at `logge ind` igen trykkes på `Annuller`, dette vil føre brugeren til den oprindelige side.

## hifi database
* bruger database

  |id     |navn   |mail   |brugernavn|kodeord |fk_tilladelse|
  |:------|:------|:------|:---------|:-------|:------------|
  |int(11)|var(55)|var(60)|var(55)   |var(255)|int(2)       |

* tilladelse database

  |id     |navn   |
  |:------|:------|
  |int(11)|var(55)|

* kontakt database

  |id     |navn   |mail   |besked   | 
  |:------|:------|:------|:--------|
  |int(11)|var(55)|var(55)|char(255)|

* produkter database

  |id     |varenr |navn   |billede|beskrivelse|fk_kategori|pris    |beholdning|
  |:------|:------|:------|:------|:----------|:----------|:-------|:---------|
  |int(11)|int(11)|var(55)|var(55)|char(255)  |int(11)    |dec(6,2)|int(11)   |

* kategori database

  |id     |navn   |
  |:------|:------|
  |int(11)|var(55)|