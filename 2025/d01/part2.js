const efekt = require('fs');
class Szereg extends Array {}
efekt.czytajPlikSynchronicznie = efekt.readFileSync;
String.prototype.podziel = String.prototype.split;
Array.prototype.mapuj = Array.prototype.map;
Array.prototype.połącz = Array.prototype.join;
Matematyka = Math
Matematyka.zaokrąglijWDół = Math.floor
Matematyka.modułZ = Math.abs


const konsola = {
  wypisz(v) {
    console.log(v);
  },
};

const obroty = efekt
  .czytajPlikSynchronicznie('./input.txt', { encoding: 'utf8' })
  .podziel('\n')
  .mapuj((el) => {
    const [d, ...v] = el;
    return +v.połącz('') * (d === 'L' ? -1 : 1);
  });

const cyferblat = Szereg.from({ length: 100 }, (_, i) => i);
let wartośćCyferblatu = 50;
let licznik = 0;

for (const obrót of obroty) {
  const pełneObroty = Matematyka.zaokrąglijWDół(Math.modułZ(obrót / 100));
  licznik += pełneObroty;

  const tymczasowa = wartośćCyferblatu;
  const zmiana = obrót % 100;
  wartośćCyferblatu = cyferblat[(100 + wartośćCyferblatu + zmiana) % 100];

  if (zmiana === 0) continue;

  if (
    wartośćCyferblatu === 0 ||
    (zmiana > 0 && wartośćCyferblatu < tymczasowa && tymczasowa) ||
    (zmiana < 0 && wartośćCyferblatu > tymczasowa && tymczasowa)
  )
    licznik += 1;
}

konsola.wypisz(licznik);

