---
pubDate: 11 Nov 2020
title: Przypowieść o cieknącym kranie
description: Dlaczego małe niedogodności psują nam humor.
---
Na samym początku *Zen i sztuki obsługi motocykla* pojawia się historia o małżeństwie Sutherlandów, którzy reprezentują "[romantyczne](/pl/blog/romantic-programming)" i zupełnie nietechniczne, wręcz technofobiczne podejście do życia. Pirsig zaczyna od rozważań nad ich podejściem do motocykli, by ostatecznie przełożyć je na inne rodzaje technologii, takie jak kran w kuchni.

> Na przykład czekając kiedyś u nich rano na wyjazd, zauważyłem, że kran nad zlewem cieknie i wówczas przypomniałem sobie, że kapało z niego również wówczas, gdy byłem tam ostatnim razem, a właściwie odkąd tylko pamiętam, to zawsze kapało. Gdy powiedziałem coś na ten temat, John odrzekł, że próbował to naprawić przy pomocy nowej uszczelki do kranu, ale nic z tego nie wyszło. I to było wszystko, co powiedział, i należało po tym sądzić, że sprawa jest zakończona. Jeśli próbujesz naprawić kran, a nic z tego nie wychodzi, życie z kapiącym kranem staje się twoim udziałem.[+q1]

[+q1]: Pirsig, R. "Zen i sztuka oporządzania motocykla". Rebis 1994; str. 19, tłum. A. Sitkowski.

Niestety dość powszechne jest, że ci, którzy nie opanowali jakiejś konkretnej "umiejętności pośredniej"—czyli takiej, która sama w sobie nie osiąga żadnego celu, ale wspomaga inne umiejętności, jak pisanie bezwzrokowe, edycja tekstu czy język angielski—ignorują je lub, co gorsza, twierdzą, że nie są „potrzebne". Rzeczywiście, pisanie bezwzrokowe nie jest konieczne, gdy jesteś programistą czy specjalistą od wprowadzania danych, tak samo jak nie jest konieczne naprawianie cieknącego kranu. To nie jest rodzaj problemu, który krzyczy do ciebie "napraw mnie, bo pożałujesz!".

Wtedy jednak nieuchronnie zaczynasz przekonywać sam siebie, że po prostu taka jest twoja dola i że całe to pisanie bezwzrokowe „nie jest dla ciebie". Przekonujesz sam siebie, że ciągłe kapanie kranu wcale ci nie przeszkadza. Jednak negatywne skutki są niewidoczne i podstępne, dosięgając cię w najmniej spodziewanych momentach. Pirsig kontynuuje swoją historię tak:

> Nie pamiętam już, co wpłynęło na zmianę mego przekonania... nieco intuicji, jakieś nowe spojrzenie pewnego dnia, a może subtlena zmiana w nastroju Sylwii, spowodowana szczególnie głośnym kapaniem w czasie gdy próbowała coś mówić. Sylwia ma bardzo miękki głos i gdy pewnego dnia próbowała tym swoim głosem zagłuszyć kapanie, a weszły właśnie dzieci i udaremniły jej wysiłki, straciła panowanie nad sobą. Wydawało się, że gniew na dzieci nie byłby nawet w przybliżeniu tak wielki, gdyby kran wtedy nie przeciekał. [+q2]

[+q2]: "Zen..."; str. 19-20.

Drobne irytacje kumulują się i w końcu eksplodują. Czasem też brak opanowania umiejętności pośredniej może sprawić, że twoja główna umiejętność staje się bezużyteczna w danym zadaniu. Dwie najważniejsze umiejętności pośrednie, jakie programista może dziś posiadać, to dobra komunikacja (angielski) i sprawna edycja tekstu.

Jeśli jesteś programistą, a zwłaszcza takim, który pracuje dla kogoś innego, dobra komunikacja jest absolutnie kluczowa, ponieważ zdarzają się przypadki, gdy acceptance criteria, które wydaje się niezbędne w zadaniu na Jirze i zajęłoby 90% całego czasu kodowania funkcjonalności, w rzeczywistości nie jest aż tak istotne. Warto sprawdzić, czy pewne funkcje są naprawdę wymagane, czy też manager, który je wymyślił, naprawdę przemyślał je tak głęboko, jak ci się wydaje.

Co do edycji tekstu, historia, którą dość żywo pamiętam z mojej pracy, dotyczyła sytuacji, gdy musieliśmy zrefaktorować nasz sposób obsługi zapytań <abbr>SQL</abbr>. Wcześniej uruchamialiśmy je bezpośrednio z kodu i przechowywaliśmy zapytania jako string literale w <abbr>JS</abbr>-owych modułach modeli. Było to dość nieskomplikowane, ponieważ modele nie zawierały prawie żadnego kodu poza typ <abbr>SQL</abbr>-em, więc się tego trzymaliśmy.

Jednak z czasem modele zaczęły się komplikować, a także część naszego zespołu zajmująca się bazą danych, która niezbyt dobrze znała <abbr>JS</abbr>-a, uznała, że najlepiej byłoby przechowywać zapytania w osobnych plikach i tylko odwoływać się do ścieżek tych plików w modelach. Gdy dołączyłem do zespołu, refactor był wykonany tylko częściowo—połowa modeli wciąż miała zapytania w kodzie JS, a generalnie większość osób się poddała, bo trwało to długo i było dość żmudne w emacsopodobnych <abbr>IDE</abbr>. Vimowe makra załatwiły sprawę w jeden dzień, bez frustracji, nawet była to całkiem przyjemna robota. Jest coś magicznego patrzeniu kiedy lecące makro zmienia ci automatycznie kilkadziesiąt plików.

Będąc programistami i rzemieślnikami naszym obowiązkiem zawodowym jest eliminowanie drobnych niedogodności, abyśmy mogli skupić się na zadaniu. Im więcej drobnych bolączek, tym większy dystans między człowiekiem a wykonywanym zadaniem. Zauważanie tych niedogodności wymaga ćwiczenia, ale gdy zaczniesz je naprawiać, jakość twojej pracy i czerpana z niej satysfakcja gwałtownie wzrosną.