function parseTime(timeStr) {
  // Remove any extra spaces and convert to lowercase
  timeStr = timeStr.trim().toLowerCase();
  
  // Handle 12-hour format (2:00 PM, 2:00PM, 2:00 pm, 2:00pm)
  const twelveHourRegex = /^(\d{1,2}):(\d{2})\s*(am|pm)$/;
  const match12 = timeStr.match(twelveHourRegex);
  
  if (match12) {
    let [_, hours, minutes, period] = match12;
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    
    // Convert to 24-hour format
    if (period === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period === 'am' && hours === 12) {
      hours = 0;
    }
    
    return {
      hours,
      minutes
    };
  }
  
  // Handle 24-hour format (14:00, 09:20)
  const twentyFourHourRegex = /^(\d{1,2}):(\d{2})$/;
  const match24 = timeStr.match(twentyFourHourRegex);
  
  if (match24) {
    const [_, hours, minutes] = match24;
    return {
      hours: parseInt(hours),
      minutes: parseInt(minutes)
    };
  }
  
  throw new Error(`Invalid time format: ${timeStr}`);
}

export function hhmmToMinutes(timeStr) {
  try {
    const { hours, minutes } = parseTime(timeStr);
    return hours * 60 + minutes;
  } catch (error) {
    console.error('Error parsing time:', error);
    return 0;
  }
}

export function estaNoIntervaloPorHHMM(inicioHHMM, fimHHMM, now = new Date()) {
  try {
    const minutosAgora = now.getHours() * 60 + now.getMinutes();
    const minutosInicio = hhmmToMinutes(inicioHHMM);
    const minutosFim = hhmmToMinutes(fimHHMM);
    
    return minutosAgora >= minutosInicio && minutosAgora < minutosFim;
  } catch (error) {
    console.error('Error checking interval:', error);
    return false;
  }
}

export function calcularDuracao(inicioHHMM, fimHHMM) {
  try {
    const minutosInicio = hhmmToMinutes(inicioHHMM);
    const minutosFim = hhmmToMinutes(fimHHMM);
    return (minutosFim - minutosInicio) * 60;
  } catch (error) {
    console.error('Error calculating duration:', error);
    return 0;
  }
}

export function formatTimeForDisplay(timeStr) {
  try {
    const { hours, minutes } = parseTime(timeStr);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeStr;
  }
}