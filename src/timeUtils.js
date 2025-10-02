export function hhmmToMinutes(hhmm) {
  const [hh, mm] = hhmm.split(':').map(Number);
  return hh * 60 + mm;
}

export function estaNoIntervaloPorHHMM(inicioHHMM, fimHHMM, now = new Date()) {
  const minutos = now.getHours() * 60 + now.getMinutes();
  const inicio = hhmmToMinutes(inicioHHMM);
  const fim = hhmmToMinutes(fimHHMM);
  return minutos >= inicio && minutos < fim;
}

export function calcularDuracao(inicioHHMM, fimHHMM) {
  return (hhmmToMinutes(fimHHMM) - hhmmToMinutes(inicioHHMM)) * 60; // segundos
}