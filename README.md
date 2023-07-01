# Ako to spustim ?
## npm install (!! podstatne !!)
```
npm install
```
Tento prikaz instaluje dependencies v Node.js projektoch. Tento git ma dva Node.js projekty v priecinkoch be a fe, takze tento prikaz treba spustat v oboch tychto priecinkoch.

Treba ho spustit ked si naklonujes tento repozitar.

Taktiez ho treba spustit ak niekto iny zmeni polozku `dependencies` alebo `devDependencies` v subore `package.json`. Najjednoduchsie je asi ho spustit vzdy po `git pull` (ak sa dependencies nezmenili tak prikaz nic neurobi), alebo pustat ho az ked dojde k nejakemu erroru so spravu ze mu chyba nejaky package.

## frontend
```
npm run dev
```
Tento prikaz sputi frontend.

Pri spusteni vypise do terminalu ip adresu na ktorej sa da stranka otvorit (napriklad: `http://localhost:5173/`).
Adresa sa da do prehliadaca a stranka by sa mala otvorit.

Ked pri progamovani zmenis nejake subory, tak netreba tento prikaz spustat znova, stranka by sa mala automaticky updatnut.

## backend
todo ...

# Co treba nainstalovat
## Node.js / nvm / nvm-windows / fnm
(O co ide je popisane v sekcii [Technologie](#Technologie))

Treba nainstalovat jedno z
 - Node.js
 - nvm - nejde na windows
 - nvm-windows - alternativa k nvm, iba na windows
 - fnm - alternativa k nvm, odporucane

### Node.js
1. https://nodejs.org/en
2. overit ze funguje - `node --version`

### nvm
(https://github.com/nvm-sh/nvm)
1. https://github.com/nvm-sh/nvm#installing-and-updating
2. `nvm install latest` - nainstaluje najnovsiu verziu Node.js
3. overit ze funguje - `node --version`

### nvm-windows
(https://github.com/coreybutler/nvm-windows)
1. https://github.com/coreybutler/nvm-windows/releases - pouzit .exe subor
2. `nvm install latest` - nainstaluje najnovsiu verziu Node.js, treba admin prava (to znamena pouzit admin powershell/terminal)
3. overit ze funguje - `node --version`

### fnm (odporucane)
(https://github.com/Schniz/fnm)
1. https://github.com/Schniz/fnm#installation - na windowse by malo fungovat `winget install Schniz.fnm`, treba ale potom urobit [toto](https://github.com/Schniz/fnm#shell-setup)
2. `fnm install --latest` - nainstaluje najnovsiu verziu Node.js
3. overit ze funguje - `node --version`

## VS Code setup (optional)
### Typescript
Podpora pre typescript je priamo zabudovana vo vs code takze netreba nic instalovat.

### ESLint
(https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Extnesion vdaka ktoremu sa budu ESLint errory zobrazovat priamo vo vs code.

Aby ESLint vo vs code fungoval spravne treba nastavit nasledovne veci:
 - `"eslint.experimental.useFlatConfig": true`
 - `"eslint.workingDirectories": ["<relativna cesta k fe>", "<relativna cesta k be>"]` (relativna z pohladu priecinku ktory mas aktualne otvoreny vo vs code, ak mas be alebo fe folder otvoreny samostatne tak toto ani netreba nastavovat)

Na gite je vsak nahrany subor .vscode/settings.json kde su tieto nastavenia nastavene.
To znamena ze ak otvorite vo vs code cely priecinok (teda nie samostatne podpriecinky ako be alebo fe), tak vscode tieto nastavenia automaticky nacita.

### Chujoviny navyse
 - [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) - zobrazovanie error priamo v kode.
 - [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) - zobrazuje git historiu ako graf. Moze sa hodit ak robis daco s gitom a pracujes s viacerymi vetvami naraz.
 - [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) - drble ikonky do file exploreru (ten panel nalavo).

# Konfiguracia
todo ...

# Struktura
## frontend (fe)
Webowe stranky sa primarne programuju v jazyku **html**.
V html sa vsak neda implementovat nejaka pokrocilejsia funkcionalita.
Napriklad mozme mat nejake tlacitko na stranke a chceme aby vyskocilo nejake pop-up okno ked na neho pouzivatel klikne.
Toto by sme cisto pomocou html spravili iba tazko.

Okrem html mozu stranky obsahovat aj kod pisany v javascripte/typescripte (ine jazyky sa nedaju pouzivat).
Takyto kod umoznuje programovanie roznych komplikovanejsich funkcionalit.
Tento kod bezi u pouzivatela v prehliadaci.

Tato cast programovania stranok (html, js) sa nazyva **frontend**.

## backend (be)
Frontend samostatne pre vacsinu stranok nestaci.
Napriklad mozme chciet aby sa pouzivatel vedel zaregistrovat a nasladne aby sa vedel prihlasit, s tym ze prihlasit by sa mal vediet aj z inych pocitacov ako z toho na ktorom sa zaregistroval.
Je teda potrebne si pamatat na nejakom mieste udaje o pouzivatelovi (meno, heslo, ...).
Tieto udaje sa typicky ukladaju do databazy, ktora bezi na nejakom serveri.

Je potrebne aby frontend vedel komunikovat s touto databazou.
Komunikuje s nou prostrednictvom takzvaneho **backend**u.
Tento backend je program ktory vie prijmat poziadavky zvonka (typicky od frontendu) a spracovava tieto poziadavky (sucastou spracovania poziadavku je casto komunikacia s databazou).

### Priklad: registracia pouzivatela
Pouzivatel sa chce zaregistrovat a tak na stranke vyplni meno a heslo a klikne tlacitko sign up.
Frontend posle poziadavok na registraciu na backend a v tomto poziadavku posle aj udaje o pouzivatelovi.
Backend dostane tento poziadavok a v ramci jeho spracovania ulozi udaje o pouzivatelovi do databazy a zapamata si ze na pocitaci z ktoreho prisiel poziadavok je odteraz prihlaseny tento pouzivatel.

## databaza (db)
todo ...

## shared
todo ...

# Technologie
## Typescript (ts)
Na fe aj be budeme pozuivat programovaci jazyk **typescript**, ak sa teda nedohodneme inac (na fe nie je moc na vyber, na be sa da pouzit hocijaky programovaci jazyk, typescript je jeden z casto pouzivanych, ale mozme kludne vybrat nejaky iny).
Typescript je **javascript** (js) s pridanou kontrolou typov, javascript sam o sebe nema ziadnu typovu kontrolu.

## Node.js
Na spustanie js/ts treba mat nainstalovany **Node.js**.
Pri instalacii Node.js sa naistaluje viacero programov:
 - `node` je program ktory vie spustat js subory (pre nas nebude podstatny).
 - `npm` je program pouzivany na instalacie kniznic (pre kniznice sa v Node.js pouziva pojem **package**).

Aplikacie v js/ts sa programuju ako takzvane Node.js projekty.
V tomto gite su dva projeky: jeden je v be foldery, druhy je vo fe foldery.

Node.js projekt vacsinou obsahuje nasledovne subory:
 - `package.json` - v nom su zakladne udeje o projeke ako nazov, verzie atd., dalej je v nom aj zoznam kniznic ktore dany projekt pouziva (takzvane **dependencies**).
 - `node_modules` - folder do ktore sa instaluju dependencies pre dany projekt (teda kazdy projekt ma zvlast naistalovanie kniznice ktore pouziva). Tento folder urcite nenahravajte do gitu (je v .gitignore takze by sa to nemalo stat).
 - `package-lock.json` (pre nas neni podstatny)

## nvm (optional, odporucane)
**nvm** je program ktory na tvojom pocitaci spravuje rozne verzie Node.js.
Node.js je aktivne vyvijany a teda ma vela verzii a vznikaju dalsie.
**nvm** je nastroj ktory umzonuje mat nainstalovanych viacej verzii Node.js naraz a prepinat medzi nimi (takze napriklad ak vyde nova verzie tak pomocou **nvm** sa da na nu prejst).
Tieto funkcionality Node.js sam neposkytuje.

Existuje viacej programov typu nvm:
 - nvm (https://github.com/nvm-sh/nvm) - orginalny nvm, nepodporuje windows
 - nvm-windows (https://github.com/coreybutler/nvm-windows) - verzia nvm urcena pre windows, na jeho pouzivanie treba admin prava (spustat ho v admin powershelli/terminali.
 - fnm (https://github.com/Schniz/fnm) - tiez sa da pouzit na windows

## ESLint (optional, odporucane)
**ESLint** je program na dodatocnu kontrolu kodu. Ak ESLint najde v kode nejake chyby, neznamena to ze kod nepojde spustit, chyby najdene ESLint-om skorej poukazuju na to, ze daco je v kode napisane divne a dalo by sa to napisat krajsie (vacsinou sa tieto chyby daju opravit dost lahko).

ESLint sa da spustat z terminalu ale da sa tiez nainstalovat ako extension do vs code-u a nasladne sa budu zobrazovat errory priamo v editore.

## Rest api (be)
todo ...

## Vite (fe)
todo ...

## React (fe)
**React** je kniznica ktora ulahcuje programovanie frontendu.

V ramci reactu sa nepise zvlast html a javascript ale pisu sa dokopy v .jsx alebo .tsx suboroch.
Taketo subory obsahuju primarne javascript alebo typescript kod ale da sa do nich pisat html.

https://react.dev/learn - toto vyzera ako celkom fajn react tutorial.

## Databaza (db)
todo ...

# Konvencie
## Commity
Podstatne je snazit sa pisat zmysluplne ale strucne messege ku commitom.
Commit messege by urcite nemali byt nejake dlhe, napriklad vs code dava varovanie pri commite ktory ma viacej ako 50 znakov ale nie je to nejake silne pravidlo.

### Conventional Commits
**Conventional Commits** je nieco ako specifikacia ako pisat este prehladnejsie commit messege.

Specifikacia: https://www.conventionalcommits.org/en/v1.0.0/

## Kod
(niektero veci z tohto asi zatial nedavaju zmysel, tak tie su do buducna)
 - ?? odsadenie = dve medzery
 - nazvy funkcii, premennych = camelCase
 - nazvy typov = UpperCamelCase
 - nazvy komponent v reacte = UpperCamelCase
 - nazvy .ts/.tsx suborov = camelCase
 - nazvy suborov exportujucich react komponentu = UpperCamelCase
 - ak subor exportuje react komponentu tak maximalne jednu a ako default export
 - ?? pisat funckie na styl arrow funkcii

Odrazky oznacene ?? sa daju kludne zmenit, ostatne odrazky mozme tiez menit ale je silno zvycajne robit ich tak ako je napisane.

# GitHub mirror (optional)
Pomocou mirrorovania mozes mat kopiu tohto repozitara na svojom githube.

Na internete existuju rozne tutorialy ako sprevadzkovat mirrorovanie repozitaru, mne vsak ziadny nejak moc nefungoval.

## Tutorial
Cast setup je inicialne nastavenie mirrorovania, teda spusta sa iba jedenkrat. Cast update je urcena na aktualizovanie mirroru a spusta sa vzdy ked chces aktualizovat svoj mirrror.

### Setup
Na svojom githube si vytvor novy repozitar do ktoreho sa bude projekt mirrorovat. Kludne sa moze volat tak isto, teda moj-dobry-sused.

U seba na pocitaci pustis nasledovne prikazy:
```
git clone --mirror git@github.com:qahSgiB/moj-dobry-sused.git moj-dobry-sused-mirror
cd moj-dobry-sused-mirror
git remote set-url --push origin <url tvojho mirror repozitaru>
git push
```
Tieto prikazy vytvoria priecinok `moj-dobry-sused-mirror` ktory sluzi ako medzikrok medzi originalnym repozitarom a tvojim mirrorom (kedze obsah repozitaru sa neda priamo posielat do druheho repozitaru (asi)).

### Update
V adresari `moj-dobry-sused-mirror` spusti nasledovne prikazy:
```
git remote update --prune
git push
```