---
pubDate: 4 Apr 2020
title: Pułapki dzielności
updatedDate: 10 Nov 2025
description: Pułapki dzielności to wewnętrzne i zewnętrzne przeszkody gaszące twój zapał. Zrozumienie ich daje narzędzia do zabezpieczenia jakości twojej pracy.
---

"Pułapki dzielności" to termin wprowadzony przez Roberta M. Pirsiga w rozdziale 26. _Zen i sztuki oporządzania motocykla_ jako szczegół jego _metafizyki jakości_. Są prawodpodobnie jednym z najłatwiej zrozumiałych koncepcji w tej książce, a także czymś, co można szybko wdrożyć, nawet (a może nawet zwłaszcza) przez nowicjuszy. Początkujący programista, mechanik motocyklowy, czy inny rzemieślnik bez trudu znajdzie tam coś, z czym się zetknął, z czym sobie nie radzi, i nad czym może pracować.

"Dzielność[+gumption]" to szkockie słowo podobne do słowa "odwaga", ale jego znaczenie jest nieco szersze. Słownik Cambridge definiuje je jako:

[+gumption]: W oryginale ang. _gumption_, słowo "dzielność" zapożyczyłem z wydania _Etyki nikomachejskiej_ <abbr>PWN</abbr> tłum. D. Gromskiej, jako tłumaczenie greckiego słowa _àreté_, które pasuje tutaj jak ulał: "'Dzielność' pozostaje w związku etymologicznym z 'dziełem', dzielny (...) jest, kto dobrze spełnia swe dzieło." Problem w tym, że Pirsig traktuje swoją koncepcję jakości jako _àreté_, wyprowadzając _gumption_ z arystotelesowskiego _ènthousiasmós_. W moim egzemplarzu polskiej edycji _Zen..._ (A. Sitkowski, wyd. Rebis, 1994) _gumption_ bywa tłumaczone niekonsekwentnie jako "męstwo" lub "odwaga".

> Zdolność do zdecydowania, co jest najlepszą rzeczą do zrobienia w konkretnej sytuacji, oraz do zrobienia jej z energią i determinacją.

To słowo ma też tą specjalną właściwość, że wystarczy powiedzieć je kilka razy na głos, aby lepiej zrozumieć jego znaczenie.

Dzielność w filozofii nie jest specjalnie nową ideą, Arystoteles wspominał o czymś podobnym w _Etyce nikomachejskiej_ jako o różnicy między potencjałem a rezultatem. Dzielność jest tą różnicą. Na przykład lekarz może posiadać umiejętności niezbędne do uratowania życia wykrwawiającego się pacjenta, ale bez dzielności—bez motywacji do wykorzystania tych umiejętności—pacjent umrze.

Pirsig mówi: "dzielność jest psychicznym paliwem, które napędza całą pracę".

Dzielność jest niezbędna w każdym rodzaju rzemiosła—stolarce, mechanice motocyklowej czy programowaniu. W kontekście programowania postrzegamy dzielność inaczej, w zależności od tego czy pracujemy nad własnym projektem, czy nad komercyjnym projektem dla klienta. Pułapki dzielności są takie same, ale sposoby na radzenie sobie z nimi mogą być nieco inne i nasze podejście może wymagać innego rodzaju narzędzi lub innego dostrojenia.

Czym zatem jest pułapka dzielności? Jest to czynnik, zewnętrzny bądź wewnętrzny, który powoduje "wyciek" dzielności. To moment, kiedy <mark>relacja między rzemieślnikiem a materiałem, nad którym pracuje, się przerywa</mark>. Rezultatem wpadnięcia w pułapkę dzielności jest utrata entuzjazmu do pracy nad materiałem i nieodparta chęć rzucenia wszystkiego w diabły. Z racji tego, że mówimy tutaj głównie o programowaniu, będziemy rozważać je głównie w tym kontekście.

Istnieją, z grubsza, dwie grupy pułapek dzielności. Zewnętrzne, to jest pochodzące od samego materiału (w naszym przypadku: kodu), od systemu nad którym pracujemy, od zewnętrznych części (np. bibliotek) lub czegoś jeszcze innego. Pirsig nazywa je "<mark>krokami wstecz</mark>". Drugi typ—wewnętrzny—jest spowodowany naszym własnym, kiepskim podejściem lub niezdolnością do właściwego wykonywania rzemiosła. Te Pirsig nazywa "<mark>zawieszeniami</mark>". Zawieszenia są dalej podzielone na trzy grupy: pułapki wartości, pułapki prawdy i pułapki mięśniowe.

## Kroki wstecz

Kroki wstecz to zewnętrzne pułapki dzielności, które głównie pochodzą z materiału, nad którym pracuje rzemieślnik, lub innych, zewnętrznych czynników. Mogą też powstać jako skutek czegoś, co zrobiliśmy wcześniej.

### Niewłaściwa kolejność

Czy zdarza ci się pracować nad skomplikowaną funkcjonalnością, ale pod koniec, kiedy masz już wszystko poskładać—na przykład połączyć <abbr>UI</abbr> z backendem—odkrywasz, że interfejsy nie pasują do siebie i musisz całkowicie przepisać część tego, co zrobiłeś? Albo okazuje się, że funkcjonalność nie jest do końca zgodna ze specyfikacją, ponieważ coś przeoczyłeś i teraz musisz zacząć od nowa?

To pułapka wynikająca z robienia rzeczy w niewłaściwej kolejności. Mówiąc bardziej ogólnie, dzieje się tak, gdy zdajemy sobie sprawę, że wykonaliśmy zadanie w oparciu o nieprawidłowe fakty. Czasami fakty te zmieniają się w trakcie pracy, co jest jeszcze bardziej przygnębiające. Istnieją jednak sposoby, aby sobie z tym poradzić.

Pierwsza z nich to _drobiazgowość_ w zakresie własnych założeń. Innymi słowy—planujmy naprzód. Nie przesadzajmy—niektóre fakty odkryjemy dopiero po rozpoczęciu pracy—ale miejmy w głowie wszystkie ogólne, wysokopoziomowe wymagania, z którymi będziemy pracować. Przeczytajmy specyfikację funkcjonalności kilka razy, zanotujmy (fizycznie lub w pamięci) wszystko, co wydaje się nieprawidłowe, niedopowiedziane, lub co może okazać się trudniejsze później. Wiedza jak to robić przychodzi z doświadczeniem, ale im więcej uwagi poświęcimy tej kwestii, tym prędzej zdobędziemy to doświadczenie.

Po drugie, _często commitujmy_. Jeśli nie używamy jakiegoś systemu kontroli wersji, dobrze byłoby zacząć. A kiedy zakończymy jakąś logicznie wyodrębnioną część pracy, commitujmy. Zostawia to ścieżkę, po której możemy łatwo i szybko wrócić, jeśli okaże się, że nasze założenia były błędne.

I wreszcie, kiedy znajdziemy się w tej konkretnej pułapce, i będziemy musieli zacząć od nowa, pamiętajmy, że za drugim razem przepisywanie błędnych modułów najprawdopodobniej zajmie znacznie krócej niż za pierwszym. Mamy w końcu już niezbędną wiedzę, aby nie popełnić tych samych błędów.

### Znikająca usterka

...czyli coś, co częściej nazywane jest w naszej branży [heisenbugiem](https://pl.wikipedia.org/wiki/Heisenbug). To błędy, które pozornie znikają, kiedy próbujemy je zbadać. Istnieją zwykle tylko na produkcji, ale kiedy weźmiemy je pod lupę naszych narzędzi debugowania, nie ma po nich śladu.

Niestety, gdyby heisenbugi nie były tak podstępne, jak są, nie byłyby tak bardzo irytujące. Rada, którą Pirsig daje, aby sobie z nimi poradzić w kontekście motocykli—"po prostu przejechać" kilkaset kilometrów—jest również trudna do zastosowania w kontekście oprogramowania.

Na szczęście języki programowania dają nam dziś wiele narzędzi do wyłapywania tego typu błędów—problemy zaczynają się jednak wtedy, kiedy nie wiemy dokładnie, jak działają nasze narzędzia diagnostyczne.

Przychodzi mi do głowy jedna historia z mojego zawodowego doświadczenia. Mój kolega próbował zdebugować obiekt, który pozornie miał nieprawidłowe wartości kluczy—ale za każdym razem, kiedy wstawiał `console.log` do funkcji, która budowała ten obiekt i przeglądał jego zagnieżdżone właściwości, wszystko wydawało się w porządku, mimo że wynik pliku Excela, który był później generowany na podstawie tego obiektu, był ewidentnie błędny.

Problem, jak się okazało, wynikał z pewnej osobliwości w sposobie działania `console.log`a w narzędziach deweloperskich przeglądarki (o której mój szanowny kolega z pewnością wiedział, ale po prostu zapomniał w momencie, kiedy była potrzebna—zdarza się najlepszym). Mianowicie, zagnieżdżone właściwości obiektu są ponownie wartościowane[+eval], kiedy otwieramy je w narzędziach deweloperskich przeglądarki. Tak więc, kiedy logujemy obiekt w danym stanie, jeśli został on zmutowany do momentu, w którym otwieramy jedną z jego zagnieżdżonych właściwości, te zagnieżdżone właściwości mogą nie być takie same, jak były w momencie logowania obiektu. (Musieliśmy mutować obiekt z powodów wydajnościowych.)

[+eval]: ang. _evaluated_

Rozwiązaniem w tym przypadku było użycie `console.log(JSON.stringify(object))`, jednak spędziliśmy cały dzień pracy, próbując to rozgryźć. Morał—_pamiętajmy, jak działają nasze narzędzia diagnostyczne_.

### Problemy z częściami

Nie myślimy często o konieczności wymiany części w programie—w końcu to nie jest coś fizycznego, a kod, który piszemy, nie zużywa się, prawda?

Nieprawda. Nasz kod używa (szczególnie w ekosystemie <abbr>JS</abbr>) różnego rodzaju bibliotek i modułów. Niektóre z tych modułów napisaliśmy sami, niektóre są zewnętrzne. Te zewnętrzne moduły są często źródłem naszych nieszczęść. Czasami aktualizacja coś zepsuje. Czasami znajdziemy błąd w kodzie zewnętrznym, którego nie możemy naprawić. Czasami po prostu przerośniemy potrzeby biblioteki. Innym razem pojawi się lepsze rozwiązanie i będziemy musieli wymienić jeden komponent na inny, który nie ma tego samego interfejsu.

Najprostszym sposobem radzenia sobie z tymi problemami jest opakowywanie kodu zewnętrznego we własne interfejsy. Kiedy importujemy komponent Reactowy, nie używajmy po prostu dostarczonego interfejsu na kilkunastu stronach. Zamiast tego stwórzmy pojedynczy punkt kontaktu między biblioteką a twoim kodem. Często może to być po prostu przepisanie interfejsu modułu do naszego własnego kodu—ale ten krok jest bardzo ważny. Ponieważ kiedy nadejdzie czas, aby wymienić ten komponent, będzie tylko jedno miejsce, w którym trzeba zmienić interfejsy, a nie kilkanaście.

Oczywiście wszystko to musi być robione w granicach rozsądku—jeśli importujemy samego Reacta, dość bezsensowne jest pisanie całego interfejsu wokół tak dużego frameworka. Jeśli nadejdzie czas na wymianę Reacta, będziemy mieć większe problemy niż ten.

Dodatkowo, pamiętajmy, aby czasami zadawać sobie pytanie "czy nie mogę tego zrobić sam?". Komponenty stworzone we własnym zakresie nie są w żaden sposób gorsze od zaimportowanych, a czas spędzony na zbudowaniu własnego rozwiązania może zaoszczędzić wiele bólu głowy w utrzymaniu. Jest to również znacznie bardziej elastyczne i daje więcej doświadczenia w podejściu do podobnych problemów w przyszłości. Wreszcie, ponieważ pracujemy w cyfrowym świecie, gdzie każdy kawałek kodu może być po prostu skopiowany lub zaimportowany w nieskończoność, może się okazać, że użyjemy tego modułu w przyszłości.

## Zawieszenia

Kroki wstecz często wydają się niesprawiedliwe—wynikają z rzeczy, nad którymi nie mamy zbyt dużej kontroli. Ale mamy kontrolę nad tym, jak do nich podchodzimy. Zawieszenia to problemy wewnętrzne. Albo innymi słowy, rzeczy, które są całkowicie naszą winą.

Zanim zaczniemy wymieniać zawieszenia, rada która pozwoli uniknąć większości lub wszystkich z nich. Otóż, kiedy siadamy do pracy nad kawałkiem kodu, kawałkiem gliny czy motocyklem, miejmy świadomość, że napotkamy rzeczy, których nie wiemy. W rzeczywistości sam powód dla którego w ogóle usiedliśmy, jest taki, że nie wiemy, co jest nie tak i jak to naprawić. Istnieje bardzo mało błędów i zadań, które od razu wiemy jak rozwiązać—są to rzeczy trywialne, łatwe do oddelegowania do <abbr>LLM</abbr>-a i, jeśli robimy swoją robotę dobrze, bardzo rzadkie.

Ważne jest, aby nie zniechęcać się brakiem wiedzy, ale raczej zaakceptować go i zacząć wyszukiwać fakty, które poszerzą nasze zrozumienie problemu. Kiedy nauczymy się jednej rzeczy, inne nieśmiało podniosą głowy i rozejrzą się dookoła, jakby czekając na odkrycie.

Mając to na uwadze, zacznijmy badać zawieszenia, a dokładniej ich podzbiór zwany "pułapkami wartości".

### Skostnienie wartości

Historia indyjskiej pułapki na małpy jest prawdopodobnie jedną z moich ulubionych inżynieryjnych przypowieści.

Czy wiesz, jak złapać małpę? Wszystko, czego potrzebujemy, to wydrążony kokos przymocowany do słupka. Napełniamy kokos odrobiną ryżu i zostawiamy prostokątną szczelinę wystarczająco dużą, aby małpa mogła włożyć do środka rękę, ale nie na tyle dużą, aby mogła wyciągnąć zaciśniętą pięść. Pułapka działa mniej więcej tak, jak można się spodziewać—małpa podchodzi i wkłada rękę, chwytając ryż w zaciśniętej pięści. I zdaje sobie sprawę, że jest w pułapce właśnie wtedy, kiedy próbuje wyciągnąć zaciśniętą pięść z ryżem.

Pułapka działa, ponieważ małpa jest złapana w innej, niewidzialnej pułapce skostnienia wartości. Innymi słowy, nie jest w stanie przemyśleć wartości faktów, kiedy pojawiają się nowe. W tym przypadku, nawet po zrozumieniu, że nie jest w stanie wyjąć ryżu, nadal ceni go bardziej niż własne życie.

Jako programiści, szczególnie ci pracujący z zewnętrznymi klientami, musimy zrozumieć, że wartość nie jest skostniała. Znaczenie różnych funkcjonalności czy poprawek błędów zmienia się w zależności od okoliczności. Znaczenie posiadania 90%+ pokrycia testami jest pomniejszone, kiedy w produkcji odkryty zostaje krytyczny błąd.

Pamiętajmy, że kod nie jest najważniejszą rzeczą w programowaniu. Tak naprawdę kod jest prawdopodobnie jedną z najmniej ważnych rzeczy w programowaniu i, co do zasady, chcemy pisać go tak niewiele jak się da. Rozważajmy nasze otoczenie i perspektywę ludzi wokół nas, klienta, naszych współpracowników i podejmujmy właściwe decyzje dotyczące tego, nad czym pracować dalej.

Na marginesie, uważam, że model agile już w dużym stopniu pomaga w tej kwestii, ponieważ zachęca do dekompozycji i redukcji zadań na jak najmniejsze komponenty. Kiedy paraca jest podzielona na małe kawałki, łatwo je oszacować. A nawet jeśli skupiamy się na czymś, co nie jest ważne w danym momencie, mały rozmiar zadań oznacza, że koszt błędnej oceny jest niewielki i będziemy mieli okazję dostroić nasze myślenie.

### Ego

Pułapka dzielności ego jest niebezpieczna i dość często prowadzi do skostnienia wartości. Różnica polega na tym, że podczas gdy konwencjonalne skostnienie wartości często dotyczy materiału (kodu, gliny, motocykla), ego jest jak skostnienie wartości samego siebie.

> Wysokie wyobrażenie o sobie osłabia możliwości rozpoznania nowych faktów. Twoje ego izoluje cię od rzeczywistej jakości. Kiedy na podstawie faktów widać jasno, że popełniłeś zwykłe głupstwo, jest mało prawdopodobne, abyś to przyznał. Za to kiedy fałszywe informacje przemawiają na twoją korzyść, wierzysz im chętnie.[+q1]

[+q1]: _Zen..._, s. 298

Programowanie ma to do siebie, że ma ono sposób na ujawnianie naszej prawdziwej natury. Większość programistów, których znam, jest zazwyczaj raczej skromna i cicha, szczególnie przy pracy. Czasami są zirytowani i mają tendencję do mamrotania czy wykrzykiwania przekleństw, ale uważam, że są one mniej skierowane na kod czy maszynę, a bardziej na nich samych. Maszyna jest odbiciem naszej własnej natury.

Nie ma innego sposobu podejścia do programowania niż ze skromnością i jeśli nie jesteśmy do tego naturalnie skłonni, dobrze jest i tak udawać skromność. Łatwo jest odgrywać programistę-geniusza, ale to działa tylko na ludzi, którzy nie wiedzą, co robimy. Klienci najczęściej będą takimi ludźmi—konieczne jest, abyśmy zrobili wszystko, żeby unikać takiego wizerunku.

### Obawa

Pułapka obawy jest trochę jak przeciwieństwo ego. Wpadamy w nią, kiedy jesteśmy pewni naszej własnej nieadekwatności i myślimy, że cokolwiek zrobimy, to pójdzie nie tak. Bardzo często to właśnie to, a nie "lenistwo", powoduje, że nie wiemy, od czego zacząć ze szczególnie trudnym zadaniem.

Dobrą rzeczą jest to, że programiści rzadko pracują samotnie, a agile już ma narzędzia, które pozwalają radzić sobie z obawą. Programowanie w parach jest jednym z najlepszych sposobów, aby to zrobić.

Dobrze jest jednak przygotować się, zanim zaczniemy kodować. Pozaglądajmy do modułu, który najprawdopodobniej będziemy musieli modyfikować, przeczytajmy jego testy i dokumentację, jeśli istnieją. Zacznijmy od naprawienia czegoś małego, może najpierw tylko <abbr>UI</abbr>—ponieważ wtedy zaczniemy odkrywać fakty, które pomogą nam w reszcie zadania.

Pamiętajmy też, że każdy ma takie momenty. Każdemu zdarzyło się nawalić i każdy ma tendencję do znalezienia się w sytuacji, w której nie wie, co zrobić.

Ważne jest, aby nie pozwolić, żeby to nas sparaliżowało.

### Nuda

Nuda jest podstępna, ponieważ często idzie w parze z ego. Jak często nudzimy się, pracując nad kodem? Czasami moduł, który nie jest zbytnio reużywalny, lub niezamierzona konwencja kopiowania i wklejania kodu może prowadzić do zadania, które teoretycznie powinno zająć dwadzieścia minut, ale w rzeczywistości w nieuporządkowanym projekcie zajmie raczej dwadzieścia godzin.

Robert C. Martin w _Mistrzu czystego kodu_ wskazał na podobną koncepcję i nazwał ją "maną skupienia".[+focusmana] Mana skupienia to substancja, która wpływa na czujność i uwagę. Kodowanie ją konsumuje, podobnie jak zmartwienia i rozproszenia. Często sytuacje, które w ogóle nie są związane z naszą pracą, mogą wyczerpać naszą manę.

[+focusmana]: Martin, R. C. _The Clean Coder: A Code of Conduct for Professional Programmers_. Pearson 2011; s. 127

Wystarczy kilka minut na zregenerowanie sił. Spojrzenie przez okno. Piętnastominutowy spacer. Pójście do kuchni, zrobienie sobie herbaty, rozmowa ze współpracownikami. Porządny odpoczynek po pracy.

Kiedy mana się skończy, nie możemy wymusić skupienia. Kodowanie jest ćwiczeniem kreatywnym i chociaż nadal możemy to robić kiedy mana się skończy, najprawdopodobniej będziemy musieli wyrzucić do śmieci wszystko, co zrobiliśmy bez skupienia. Nudząc się, schodzimy ze ścieżki jakości, i wtedy właśnie zdarzają się naprawdę duże błędy.

Warto również zauważyć, że kiedy się nudzimy, jesteśmy bardziej podatni na [*oświecenia*](https://intercaetera.com/posts/three-ways-of-gaining-knowledge/)—niepowiązane fakty spontanicznie łączące się razem w głowie—a kiedy stymulujemy to grzebiąc w kodzie bez konkretnego celu, możemy znaleźć rozwiązania, których wcześniej nie rozważaliśmy.

### Zniecierpliwienie

Ostatnia z pułapek wartości to zniecierpliwienie. Dzieje się tak, kiedy bardzo niedoszacowujemy ilość czasu, którą coś zajmie i zaczynamy poganiać proces, aby go przyspieszyć.

Zniecierpliwienie jest niezwykle niebezpieczne w programowaniu, a biorąc pod uwagę powszechność terminów w tej pracy i klientów, którzy często pragną stuprocentowo pewnych estymat, często wpadamy w tę pułapkę

Najlepsza zasada, której możemy użyć pytani o estymaty lub jakiekolwiek oczekiwania dotyczące tego, jak długo coś zajmie, to odmówienie podania konkretnej liczby, kiedy pracujemy z nieznaną technologią. Kiedy robimy coś, z czym nie mamy wcześniejszego doświadczenia, unikajmy podawania konkretnych estymat, ponieważ najczęściej będą błędne. Kiedy podajemy estymatę, nawet z wyraźnym wskazaniem niepewności, będziemy czuć się zobowiązani do wykonania pracy na czas. Lepiej jest dać sobie nieokreśloną ilość czasu, kiedy pracujemy z nieznanymi technologiami.

Warto ustalić ważność terminów. Czasami terminy mogą być niezwykle istotne—wdrożenie ważnej funkcjonalności dla strony e-commerce przed świętami—ale często są całkowicie arbitralne. Upewnijmy się, że terminy są elastyczne, kiedy muszą być, i nie spieszmy się.

Innym dobrym sposobem radzenia sobie ze zniecierpliwieniem jest przestrzeganie najlepszych praktyk co do joty. Jeśli nasz zespół ustalił, że robimy <abbr>TDD</abbr>, to właśnie wtedy <abbr>TDD</abbr> lśni. Zmniejszmy zakres i bądźmy drobiazgowi, w ten sposób unikniemy jakichkolwiek dużych błędów, które spowodują, że nasza dzielność wycieknie jeszcze bardziej.

_Pragmatyczny programista_ wymienia wiele sposobów pracy z niepełnymi informacjami, szczególnie kiedy klient prosi o estymaty. Ale jest tylko jedna poprawna, kuloodporna odpowiedź na wszystkie te pytania.

"Dam ci znać później".

## Pułapki prawdy i pułapki mięśniowe

Na koniec pozostają ostatnie dwa typy pułapek dzielności: pułapki prawdy i pułapki mięśniowe. Zakończymy również opisem najbardziej destrukcyjnej pułapki ze wszystkich, i takiej, z której bardzo trudno się wydostać, kiedy już w niej jesteśmy.

### Pułapki prawdy

Trudno jest wymyślić zorganizowane grupy przykładów pułapek prawdy, ponieważ wszystkie są dość indywidualne w sposobie, w jaki się pojawiają. Jednak ogólnie rzecz biorąc, pułapki prawdy pojawiają się, kiedy znajdziemy się w "nieprawidłowym stanie". Wpadamy w pułapkę prawdy, kiedy nasze warunki wstępne są takie, że znalezienie prawdy w bieżącej sytuacji jest niemożliwe.

To brzmi dość zagadkowo, jednak gdzie indziej omawialiśmy [grę w pomidora](https://intercaetera.com/posts/tomato-game/). Opisuje ona jeden scenariusz pułapki prawdy: kiedy zostaje ci zadane pytanie binarne, na które ani "tak", ani "nie" nie są odpowiednimi odpowiedziami.

_Zen i sztuka oporządzania motocykla_ podchodzi do tej koncepcji w inny, charakterystycznie orientalny sposób japońskiego "mu" (które w istocie jest tym samym, co środkowoeuropejski pomidor, z wyjątkiem tego, że w bardziej wyrafinowanym, wschodnim filozoficznym płaszczu. My Polacy mamy tendencję do bycia bardziej przyziemnymi). "Mu" oznacza "nic".

Zrozumienie, kiedy jesteśmy w stanie "mu", jest trudne do ustalenia, jednak jest jeden pewny sposób, aby zarówno rozpoznać, że możemy w nim być, jak i potencjalnie uniknąć (nieumyślnie, zawsze nieumyślnie!) postawienia naszych rozmówców w tej samej niewygodnej sytuacji. Jest to też sposób bardzo prosty: unikanie pytań "dlaczego".

"Dlaczego", jak każde względnie surowo wychowywane ośmioletnie dziecko wie, sugeruje oskarżenie, a oskarżenia są niebezpieczne. Miejsce "dlaczego" jest na sali sądowej, przeciwko komuś, kto jest wyraźnie wrogi wobec nas. W sytuacjach partnerskich, kiedy obie strony próbują współpracować i pracować nad wspólnym celem, najlepiej jest go unikać.

Miłą rzeczą w pułapkach prawdy jest jednak to, że kiedy rozpoznasz, że w niej jesteśmy, możemy stosunkowo łatwo się z niej wydostać, pod warunkiem że wypracowaliśmy sobie nawyk posiadania podkładki.

Podstawowa definicja "podkładki" tutaj to "dowód, który cię wspiera w przypadku potencjalnego oskarżenia". Zwróć uwagę: "potencjalnego". Posiadanie podkładki da ci dzielność i odwagę do podążania ścieżką jakości, nawet jeśli oskarżenie nigdy nie nadejdzie.

Przykład, który od razu przychodzi mi do głowy, to kiedy klientka pytała o funkcjonalność, o którą wcześniej nie prosiła, lub prosiła o nią w inny sposób. Może być zdenerwowana, że nie zaimplementowaliśmy jej tak, jak chciała, ale dopóki mamy podkładkę w postaci początkowego opisu wymagań, możemy zdusić oskarżenie w zarodku, często zanim jeszcze się pojawi.

Nie trzeba dodawać, że musimy być ostrożni i uprzejmi, kiedy zwracamy komuś uwagę, że postawił cię w stanie "mu". To nie jest okazja do pokazywania swojej wyższości—to grzeczne wskazanie na załamanie się komunikacji, coś, nad czym obie strony muszą popracować, ponieważ obie nie potrafiły się porozumieć. Żadne z nas nie chce znaleźć się w stanie "mu". My nie zapytaliśmy o właściwe rzeczy, ona nie powiedziała nam rzeczy, które były dla niej ważne.

Kiedy odkryjemy, że jesteśmy w stanie "mu", przeformułujmy pytanie, szukajmy wyjścia. Prawdopodobnie nie jest daleko.

### Pułapki mięśniowe

Pułapki mięśniowe (w analogii do "pamięci mięśniowej") w programowaniu nie są dokładnie takie same jak te w mechanice motocyklowej, jednak ogólnie dotyczą naszych narzędzi i naszego środowiska. Można pomyśleć o pułapce mięśniowej, kiedy zdamy sobie sprawę, że nasz proces programowania nie jest wygodny ani przyjemny, lub, mówiąc szerzej, kiedy stwierdzimy, że spędzamy więcej czasu na powtarzalnych zadaniach niż na rozwiązywaniu problemów.

Kiedy mówię tutaj o "narzędziach" i "środowiskach", nie mam na myśli bibliotek. Nie mam nawet na myśli kodu—ale raczej chodzi mi o takie rzeczy jak system operacyjny, edytor tekstu, środowisko testowe, system kontroli wersji, konfigurację <abbr>CI/CD</abbr>, krzesło, oświetlenie w biurze. Wszystko, co nie jest kodem, ale wpływa na to, co piszemy.

Mówiłem to wcześniej, ale powtórzę, ponieważ jest to bardzo ważne: _znajmy nasze narzędzia_. Co więcej, używajmy najlepszych możliwych narzędzi.

Myślę, że najlepsi programiści nie doceniają wpływu dobrego środowiska, głównie dlatego, że instynktownie pracują nad usuwaniem nieprzyjemności. Ale kiedy dopiero zaczynamy, lub jesteśmy już dość doświadczeni, ale nadal czujemy, że coś jest nie tak, możemy być ofiarą pułapki mięśniowej.

Niestety, w przeciwieństwie do pułapek wartości, pułapki mięśniowe wcale nie są łatwe do opuszczenia, ponieważ oznaczają, że nie włożyliśmy wystarczająco pracy w naukę "umiejętności motorycznych" programowania. Pisanie bezwzrokowe wydaje się czymś oczywistym, dopóki nie programujemy w parze z kimś, kto nie potrafi pisać bez patrzenia na klawiaturę. Szybka manipulacja tekstu jest naturalna, jeśli używaliśmy Vima przez dekadę, dopóki nie patrzymy na kogoś używającego <abbr>VS</abbr> Code i wciskającego strzałkę w dół trzydzieści razy, żeby zjechać trzydzieści linii w dół. Oczywiście nieco koloryzuję, ale nie aż tak bardzo, jak mogłoby się wydawać.

Istnieją też ograniczenia techniczne. Kiedyś słyszałem o zespole, który miał swoje środowisko skonfigurowane na maszynach wirtualnych na komputerach po drugiej stronie świata. Logowali się do maszyny wirtualnej rano, kodowali przez mniej więcej osiem godzin z przerwami na kawę, spotkania i obfite narzekania na jakość kodu, a następnie się wylogowywali, prawdopodobnie kwestionując swoje życiowe wybory. Udało im się przetrwać w ten sposób tylko kilka miesięcy. Odeszli, powołując się na "kiepską jakość kodu" i "trudną atmosferę", ale gwarantuję, że niezgrabność środowiska była przynajmniej tym, co naukowiec nazwałby "istotnym czynnikiem".

Stanąłem przed podobną sytuacją, kiedy po raz pierwszy przeszedłem na MacOS. Domyślnym wyborem emulatora terminala na MacOS jest aplikacja zwana [iTerm2](https://iterm2.com). Bardzo bogata w funkcje aplikacja, była używana przez prawie wszystkich w moim zespole. Jednak pracując głównie w Vimie z całkiem sporą ilością wtyczek, zauważyłem, że terminal jest wolny. Dla mnie był bardzo wolny: kilka milisekund opóźnienia za dużo przy każdym naciśnięciu klawisza nie sprawia wrażenia ogromnego problemu, ale to się dodaje, kiedy normalna prędkość pisania wynosi około 110 słów na minutę. Przejście na Alacritty rozwiązało problem, jednak skłoniło mnie do rozmyślań, ile osób ma te niemal niewidoczne problemy, które utrudniają ich pracę, ale nie są wystarczająco irytujące, aby cokolwiek z nimi zrobić.

Pułapki mięśniowe są powodem, dla którego zachęcam każdego programistę, aby przynajmniej spróbował używać Vima przez dłuższy czas. Początkowo jest wolno, strasznie wolno, ale modalny styl edycji pozwala na skakanie po plikach tekstowych znacznie szybciej niż w ociężałym <abbr>IDE</abbr>. A kiedy już potrafimy szybko edytować tekst, usuwamy pułapkę mięśniową, która przyrostowo będzie przynosiła korzyści. Co prawda, nie zauważymy ich, dopóki nie usiądziemy do kodowania w parze z kimś, kto nie usunął tej pułapki.

Czasem profesjonaliści mówią, że prędkość pisania nie jest ważna w programowaniu, ponieważ kodowanie jest tylko niewielką częścią programowania. Chociaż ogólnie się zgadzam (ponieważ również jestem tego zdania), powodem, dla którego nie jest to ważne *dla nich* (lub *nas*) jest to, że piszą wystarczająco szybko lub poruszają się po swoim <abbr>IDE</abbr> wystarczająco szybko, aby nie było to problemem.

Dla dobrego pianisty automatyczne znajdowanie klawiszy na klawiaturze pozwala skupić się na szerszym postrzeganiu utworu, który gra, a nie na zastanawianiu się, gdzie jest środkowe C. Dla pianisty znalezienie środkowego C jest pamięcią mięśniową.

Jeśli dla nas nie jest, jesteśmy w pułapce mięśniowej. Możemy nauczyć się pisać bezwzrokowo. *Szybko* pisać bezwzrokowo. Możemy nauczyć się Vima (lub poruszać się po swoim <abbr>IDE</abbr>, jeśli Vim nie pasuje do naszego języka, chociaż takich jest niewiele).

## Najgorsza pułapka

Ostatnia pułapka, o której chciałbym wspomnieć, to coś, co Pirsig nazywa "orszakiem pogrzebowym".

> Przez chwilę przyglądam się przejeżdżającym samochodom. Jest w nich coś z osamotnienia. (...) Coś nie jest w porządku także z kierowcami tych samochodów. (...) Wszyscy wyglądają, jak na pogrzebie. (...) A i nasza jazda też wygląda jakoś inaczej. Samochodzy poruszają się ze stałą prędkością, równą górnej granicy szybkości obowiązującej w mieście i kierowcy nie widzą nic poza jezdnią. *Kierowcy zdają się myśleć bardziej o tym, gdzie chcą być, niż o tym gdzie są.* (...) Ludzie, prawie zapomniałem o pułapce największej ze wszystkich. To orszak pogrzebowy! Wszyscy biorą w nim udział, w tym naszym pomylonym, pieprzonym, ultranowoczesnym i egoistycznym stylu życia, który zdaje się, ogarnął cały nasz kraj.[+q2]

[+q2]: _Zen..._, s. 309

Pochylone zdanie jest kluczowe. Istnieje wiele nazw dla tego uczucia. Poetyckie nazwy w pismach katolickich uczonych to "acedia" lub "tædium". Jednak w nowoczesnym środowisku korporacyjnym jest niewiele miejsca na poezję, więc analogia orszaku pogrzebowego wydaje się pasować znacznie lepiej.

Być w orszaku pogrzebowym, to stracić poczucie celu w tym, co się robi. Kiedy czujemy, że kod, nad którym pracujemy, nie rozwiąże niczego, lub, co gorsza, wyrządzi szkodę. Kiedy tęsknimy za jakąś poprawą w przyszłości, ale bez nadziei na dotarcie tam. Kiedy proces tworzenia wydaje się monotonią. Orszak pogrzebowy zatruje wszystko inne, co robimy.

A najgorsze jest to, że rzadko możemy cokolwiek z tym zrobić. Orszak pogrzebowy ma miejsce, kiedy stosunek sprawczości do odpowiedzialności przechyla się mocno w kierunku tej drugiej i z dala od tej pierwszej. To naturalny stan frustracji dla rzemieślników programistów—i coś, czego udało nam się uniknąć dzięki strukturze organizacyjnej software house. Ponieważ software house, naprawdę, to po prostu nowoczesne wyobrażenie średniowiecznego cechu rzemieślniczego.

Struktura cechu—luźnego stowarzyszenia rzemieślników w konkretnym fachu—stoi w bardzo wyraźnym kontraście do nowoczesnej korporacji, która skupia się na innych celach. Jednak ze względu na bardzo powszechne partnerstwa biznesowe między software house'ami a korporacjami, sztywna hierarchia tych drugich ma tendencję do przenikania do luźnego, dość nieformalnego stowarzyszenia tych pierwszych.

To kończy nasz spacer przez pułapki dzielności w _Zen i sztuce oporządzania motocykla_. Mam nadzieję, że ten artykuł przybliżył trochę zrozumienie, jak wytrwać w środowisku programistycznym i wyróżnić się w swoim rzemiośle.
