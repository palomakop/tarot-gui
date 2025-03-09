import SunCalc from 'suncalc'

export function Moon() {
  const phase = SunCalc.getMoonIllumination(new Date()).phase;
  let string;
  let icon;
  if (phase >= 0 && phase <= 0.0625) {
    string = "New Moon";
    icon = "🌑";
  }
  else if (phase > 0.0625 && phase <= 0.1875) {
    string = "Waxing Crescent";
    icon = "🌒";
  }
  else if (phase > 0.1875 && phase <= 0.3125) {
    string = "First Quarter";
    icon = "🌓";
  }
  else if (phase > 0.3125 && phase <= 0.4375) {
    string = "Waxing Gibbous";
    icon = "🌔";
  }
  else if (phase > 0.4375 && phase <= 0.5625) {
    string = "Full Moon";
    icon = "🌕";
  }
  else if (phase > 0.5625 && phase <= 0.6875) {
    string = "Waning Gibbous";
    icon = "🌖";
  }
  else if (phase > 0.6875 && phase <= 0.8125) {
    string = "Last Quarter";
    icon = "🌗";
  }
  else if (phase > 0.8125 && phase <= 0.9375) {
    string = "Waning Crescent";
    icon = "🌘";
  }
  else if (phase > 0.9375 && phase <= 1.0) {
    string = "New Moon";
    icon = "🌑";
  }
  string = "Current moon phase: " + string;
  return (
    <span className="moon-icon" title={string}>{icon}</span>
  )
}