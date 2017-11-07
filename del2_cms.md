# HIFI CMS

## Arbejdsproces
* Skitser / design
* CMS funktioner
* CMS opsætning
* Det statiske design sættes op - HTML, CSS
* Programmering af CMS med Javascript

## Skitser / design

Log ind siden er meget simpel i sin opsætning, centereret på siden er en `container` med en `log ind form`.

![wireframe mobil](https://github.com/TobiasBrage/hifi-tobias/raw/master/forberedelse/login.jpg?raw=true)

Produkt siden hvor `admin` kan `redigere produkterne` har alle produkter sorteret efter kategorier, i menuen kan en enkelt kategori dog vælges og kun disse produkter vil blive vist.

For hver `produkt` kan der `ændres billede, titel, beskrivelse, pris` og produktet kan naturligvis også `slettes`.

![wireframe mobil](https://github.com/TobiasBrage/hifi-tobias/raw/master/forberedelse/editproducts.jpg?raw=true)

## CMS funktioner

* Bruger

    Når der `logges ind` gemmes en `cookie` i browseren med en id bestående af `tilfældige tegn`, tegnene matcher en `bestemt bruger i tabellen userSession` og derved ved browseren hvilken bruger den skal hente oplysninger fra. `Cookiens levetid` er blot en time, men cookien vil jævnligt opdatere sin levetid i takt med at siden bruges og `derfor logges brugeren ikke ud` selvom cookien overstiger en time fra log ind tidspunktet.

    Når der `logges ind` skal der først tjekkes for om `brugernavnet eksisterer` og derved om `kodeordet matcher brugernavnet`.

    I højre side af menuen vil `brugerens brugernavn` stå, hvis musen føres over vil en `dropdown` vise flere muligheder som: `Ændre profil, ændre adgangskode og log ud`.

    Under menu punktet `Brugere` kan alle brugere ses, slettes og oprettes.

* Produkter

    På `produkt siden` vises alle `produkterne`, hver produkt har sin egen `rediger og slet knap`. Trykkes der på rediger vises i stedet en `annuller og en gem knap` og billede, titel, beskrivelse og pris kan nu redigeres.

    `Produkterne` er delt op i `kategorier`, i menuen kan der sorteres efter kategorier så kun den enkelte kategori vises hvilket gør det nemmere at overskue hvis man leder efter et specifik produkt.

    Der kan naturligvis også `oprettes produkter`, det kan gøres ved at klikke på menupunktet `Tilføj produkt`, her er der mulighed for at `uploade billede, oprette titel, beskrivelse og vælge kategori eller oprette en ny`.

* Menu

    `Menuen` skal være `dynamisk`, derfor vil der være et menu punkt til redigering af menu punkter hvor der kan slettes, oprettes og redigeres i menuen.

## CMS opsætning

Der kommer til at være adskillige routes for at det hele kan fungere.

* `/edit/user`

    Opdaterer en brugers oplysninger med POST.

* `/edit/password`

    Opdaterer en brugers adgangskode med POST.

* `/edit/product`

    Opdaterer et produkt med POST.

* `/add/category/:id`

    Opretter en ny kategori med GET.

* `/add/product`

    Opretter et produkt med POST.

* `/add/user`

    Opretter en bruger med POST.

* `/delete/product/:id`

    Sletter et produkt med GET.

* `/delete/user/:id`

    Sletter en bruger med GET.

* `/delete/category/:id`

    Sletter en kategori med GET.

* `/category/:id`

    Henter alle elementer fra en specifik kategori med GET.

* `/category`

    Henter alle produkter fra alle kategorier.

* `/user`

    Henter alle brugere.

* `/login`

    Returnerer brugerens id med POST.

* `/product/images`

    Returnerer alle produkt billeder med GET.

* `/product/categories`

    Returnerer alle kategorier med GET.

