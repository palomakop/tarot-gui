import SunCalc from 'suncalc';

function getMoonPhaseDetails(phase: number): { string: string; icon: string } {
  if (phase >= 0 && phase <= 0.0625) {
    return { string: "New Moon", icon: "🌑" };
  } else if (phase > 0.0625 && phase <= 0.1875) {
    return { string: "Waxing Crescent", icon: "🌒" };
  } else if (phase > 0.1875 && phase <= 0.3125) {
    return { string: "First Quarter", icon: "🌓" };
  } else if (phase > 0.3125 && phase <= 0.4375) {
    return { string: "Waxing Gibbous", icon: "🌔" };
  } else if (phase > 0.4375 && phase <= 0.5625) {
    return { string: "Full Moon", icon: "🌕" };
  } else if (phase > 0.5625 && phase <= 0.6875) {
    return { string: "Waning Gibbous", icon: "🌖" };
  } else if (phase > 0.6875 && phase <= 0.8125) {
    return { string: "Last Quarter", icon: "🌗" };
  } else if (phase > 0.8125 && phase <= 0.9375) {
    return { string: "Waning Crescent", icon: "🌘" };
  } else if (phase > 0.9375 && phase <= 1.0) {
    return { string: "New Moon", icon: "🌑" };
  }
  return { string: "Unknown Phase", icon: "" };
}

export function Moon() {
  const phase = SunCalc.getMoonIllumination(new Date()).phase;
  const { string, icon } = getMoonPhaseDetails(phase);
  const title = "Current moon phase: " + string;
  return (
    <span className="moon-icon" title={title}>{icon}</span>
  );
}

interface MyComponentProps {
  date: Date;
}

export function MoonPhase({ date }: MyComponentProps) {
  const phase = SunCalc.getMoonIllumination(date).phase;
  const { string, icon } = getMoonPhaseDetails(phase);
  return (
    <span><span className="moon-icon">{icon}</span> {string}</span>
  );
}