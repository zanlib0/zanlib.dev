---
title: Nadawanie nazw
pubDate: 11 May 2022
updatedDate: 10 Nov 2025
description: Podobno jedna z dwóch najtrudniejszych rzeczy w informatyce.
---

Mówi się, że w informatyce są dwie trudne rzeczy—unieważnianie pamięci podręcznej i nadawanie nazw. Prawidłowe nazywanie rzeczy (zmiennych, funkcji, klas, obiektów) jest ważnym elementem pisania przejrzystego kodu. Aby kod był przejrzysty i zrozumiały dla przyszłych czytelników, musi w odpowiednim stopniu odpowiadać rzeczywistości, którą modeluje. W przypadku nadawania nazw oznacza to, że nazwy powinny wskazywać, czym są te rzeczy.

Arystoteles obszernie opisał właściwości rzeczy, a jedną z bardziej użytecznych kategoryzacji właściwości jest podział na *przypadłości* i *atrybuty* bytów we wszechświecie. Atrybuty to właściwości, które coś musi posiadać, aby zostać sklasyfikowane jako to coś. Z kolei przypadłości nie są charakterystyczne dla badanej rzeczy i bez nich nadal zachowałaby ona swoją tożsamość. Arystoteles zidentyfikował kilka kategorii przypadłości, ale te najbardziej przydatne dla nas, programistów, to te związane z wyglądem.

Dobra nazwa to taka, która pomaga zrozumieć naturę rzeczy, do której się odnosi. Z tego powodu powinniśmy starać się nazywać rzeczy zgodnie z tym, czym są, a nie jak wyglądają.

Na przykład Sokrates mógłby być nazwany Ateńczykiem. Atrybutem klasy Ateńczyków jest to, że urodzili się, mieszkają lub są obywatelami Aten. Gdyby natomiast Sokrates urodził się w Koryncie i mieszkał tam przez całe życie, nie byłoby właściwe klasyfikowanie go jako Ateńczyka. Wszelkie inne cechy Sokratesa, na przykład jego zadarty nos lub gęsta broda, są przypadłościami w kontekście jego bycia Ateńczykiem.

W rzeczywistości znalezienie atrybutów otaczających nas bytów jest dość trudne. Na przykład, jakie są atrybuty żyrafy? Można by powiedzieć: plamki i długa szyja. Żyrafa mogłaby się urodzić, być może w wyniku rzadkiej mutacji genetycznej, z wyjątkowo krótką szyją i nadal byłaby żyrafą. Podobnie, mógłbym narysować ołówkiem zarys zwierzęcia bez plam i z długą szyją, a Ty mógłbyś zgadnąć, że jest to rysunek żyrafy. Dzięki wiedzy współczesnej genetyki możemy, że tak powiem, zajrzeć do wnętrza wszechświata, sekwencjonując geny komórki żyrafy i stwierdzić, że atrybutem bycia żyrafą jest bycie zbiorem komórek o określonym materiale genetycznym. Wygląd—plamki i długa szyja—nie ma tu większego znaczenia.

Być może jest to wystarczające do identyfikacji gatunku, ale możemy zadać sobie kolejne pytanie: jaki jest atrybut bycia Sokratesem? Trudno to zdefiniować i zdekonstruować, więc w większości przypadków traktujemy tego typu kwestie jako czarną skrzynkę. Istnieją filozoficzne próby odpowiedzi na to pytanie, ale z punktu widzenia programowania możemy po prostu powiedzieć, że w kodzie źródłowym wszechświata istnieje klasa `Sokrates`, która ma pewną liczbę nieznanych, zamkniętych właściwości, interfejs (choć nieco irytujący, zwłaszcza jeśli jesteś Ateńczykiem zajętym swoimi sprawami na rynku) który jest intuicyjne zrozumiały, oraz pojedynczy obiekt.

## Lekcje w programowaniu

Jako, że programowanie jest wgruncie rzeczy [filozofią stosowaną](https://www.intercaetera.com/posts/faith-before-reason), możemy wyciągnąć lekcje z tego ciągu rozumowania w naszym własnym kodzie. W przeciwieństwie do świata rzeczywistego, pracując nad aplikacją, możemy spojrzeć na kod źródłowy będący podstawą jakiejś abstrakcji—być może dlatego, że sami go napisaliśmy, lub dlatego, że jest częścią otwartoźródłowej biblioteki. Jako, że pojemność podręcznej pamięci krótkoterminowej każdego ludzkiego mózgu jest ograniczona, chcemy używać nazw aby indeksować skomplikowane rzeczy.

Jednakże, zapamiętywanie bez kontekstu jest trudne. Czasem jest to konieczne dla najbardziej podstawowych klocków budujących nasze zrozumienie, lub w trakcie pracy w abstrakcyjnych lub kompletnie nieznanych nam domenach. Ogólnie, jednak, prawie zawsze chcemy strukturyzować abstrakcje w sposób odzwierciedlający świat rzeczywisty, z tego powodu, że większość jest z nim zaznajomiona, zwiększając tym samym szanse na zrozumienie naszych abstrakcji.

W praktyce oznacza to używanie nazw odpowiadających domenie biznesowej produktu, który budujemy. Częścią pracy programisty jest nazywanie i strukturyzowanie części biznesu, które dotychczas były rozumiane na podstawie domysłów lub pomijane. Aby to robić skutecznie, musimy identyfikować atrybuty części systemu w celu nadania im odpowiedniej nazwy.

## Przykład

Powiedzmy, że mamy aplikację do automatyzacji procesów marketingowych. Mamy dane wejściowe w postaci grup użytkowników; działań, które są podejmowane wobec tych użytkowników; oraz raportów, które zbierają nasze dane. Spotykamy się z designerką UX, która wymyśla następujący szkic:

![Marketing mockup upright](/assets/marketing-mockup-upright.svg)

Jak nazwałbyś komponenty i akcje w tym interfejsie? Z tylko pobieżnym zrozumieniem domey biznesowej mógłbyś nadać im nazwy na podstawie tego, co widzisz. Więc prostokąty mogłyby być _kartami_, które są pogrupowane w _wiersze_, i może _podwiersze_, połączone _strzałkami_. Klikając prawym przyciskiem myszy, użytkownik może dodawać karty _poziomo_ do istniejącego wiersza lub _pionowo_, tworząc nowy wiersz.

To brzmi jak dobry pierwszy krok, więc zaczynasz komunikować się z zespołem używając tych abstrakcji: kart, wierszy, dodawnia kart pionowo czy poziomo, łączenia ich strzałkami, i tak dalej.

Twój zespół spędza dwa tygodnie na rozwijaniu strony, a po tym czasie designerka UX wraca, uzbrojona w informacje zwrotne od użytkowników i nieco zmienia szkic:

![Marketing mockup sideways](/assets/marketing-mockup-sideways.svg)

Patrzysz na to z przestrachem. Zdajesz sobie właśnie sprawę, że pomimo tego, że wizualnie zmiana jest trywialna do zaimplementowania, a logika biznesowa nie zmieniła się ani trochę, praktycznie każda nazwa ktorej dotychczas używał twój zespół przestaje mieć sens. Gdzie został popełniony błąd?

Błędem było nazywanie rzeczy na podstawie tego jak wyglądają, a nie czym są. Być może _karty_ nie są złą nazwą na protokąty na szkicu, ale nie ma już strzałek ani wierszy. Dowiadujesz się od eksperta domenowego, że strzałki odzwierciedlają _splity_ (jak w _split testach_), które po równo rozdzielają przebieg kampanii marketingowej. Na nowym szkicu kampania przechodzi z lewej strony do prawej w _fazach_. Zamiast dodawania kart poziomo lub pionowo, użytkownik po prostu _dodaje kartę_ lub _dodaje fazę_.

Fakt, że częsci naszej kampanii są w kartach, że są rozłożone w wierszach lub kolumnach, i są połączone liniami lub strzałkami jest _przypadłością_ tego, co te elementy interfejsu odzwierciedlają. Nazywając nasze komponenty i akcje po atrybudach, sprawiamy że kod jest bardziej przejrzysty i bardziej odporny na zmiany, gwarantując, że nazwy zmienią się tylko, kiedy nastąpi radykalny zwrot w istocie naszych abstrakcji, a nie tylko ich przypadłości.
