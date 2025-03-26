import { type SpreadData, type CardData } from '../interfaces/interfaces';

export function Card({cardData}: {cardData : CardData}) {
  let frontImg = `https://subtle-cards.s3.us-east-1.amazonaws.com/Rider-Waite-Smith/${cardData.filename}.png`
  let backImg = "https://subtle-cards.s3.us-east-1.amazonaws.com/card_bg.png"
  let titleString = cardData.title;
  let cardFrontStyle = {
    backgroundImage: `url(${frontImg})`,
    transform: 'rotate(0deg)'
  }
  if (cardData.reversed) {
    titleString += " (Reversed)";
    cardFrontStyle.transform = "rotate(180deg)"
  }

  return (
    <div className="card-place flex flex-col items-center gap-0 xs:gap-4 shrink w-full min-w-[0]">
      <div className="card-container relative w-50 max-w-full flex flex-col items-center justify-center shrink aspect-[290/475] sepia-30 dark:sepia-50" title={titleString as string}>
        <div className="card-back box-border p-1 absolute overflow-hidden w-full h-full bg-white rounded-md shadow-xl">
          <div className="card-back-img bg-contain bg-no-repeat bg-center w-full h-full" style={{ backgroundImage: `url(${backImg})` }}></div>
          </div>
        <div className="card-front box-border p-1 absolute overflow-hidden w-full h-full shrink bg-white rounded-md" >
          <div className="card-front-img bg-contain bg-no-repeat bg-center w-full h-full" style={cardFrontStyle} role="img" aria-label={cardData.description as string}></div>
        </div>
      </div>
      <div className="card-label text-stone-400">{cardData.label}</div>
    </div>
  )
}

export function CardInfo({cardData}: {cardData : CardData}) {
  let titleString = cardData.title;

  let primaryMeaning;
  let secondaryMeaning;
  let primaryMeaningLabel;
  let secondaryMeaningLabel;
  if (cardData.reversed) {
    titleString += " (Reversed)";
    primaryMeaning = cardData.reversedMeaning;
    secondaryMeaning = cardData.uprightMeaning;
    primaryMeaningLabel = "Reversed Meaning"
    secondaryMeaningLabel = "Upright Meaning"
  }
  else {
    primaryMeaning = cardData.uprightMeaning;
    secondaryMeaning = cardData.reversedMeaning;
    primaryMeaningLabel = "Upright Meaning"
    secondaryMeaningLabel = "Reversed Meaning"
  }

  let elementColor;
  switch (cardData.element) {
    case ("Fire"):
      elementColor = "text-red-400";
      break;
    case ("Earth"):
      elementColor = "text-green-400";
      break;
    case ("Air"):
        elementColor = "text-gray-400 dark:text-gray-300";
        break;
    case ("Water"):
      elementColor = "text-blue-400";
      break;
    default:
      elementColor = "";
  }

  let suitMeanings = {
    "Major Arcana": "Major life themes and lessons",
    "Cups": "Emotions, relationships, connections",
    "Pentacles": "Material aspects, career, financial matters",
    "Swords": "Thoughts, communication, conflicts",
    "Wands": "Inspiration, creativity, action",
  };

  return (
    <div className="card-info">
      <h3 className="flex gap-3 text-2xl"><span className="text-stone-400">{cardData.label}</span><span className="italic">{titleString}</span></h3>
      <ul className="pl-5 text-sm">
        <li><b>Suit:</b> {cardData.suit} <span className="text-stone-300 dark:text-stone-500">({suitMeanings[cardData.suit as keyof typeof suitMeanings]})</span></li>
        <li><b>Element:</b> <span className={elementColor}>{cardData.element}</span></li>
        <li><b>{primaryMeaningLabel}:</b> {primaryMeaning}</li>
        <li className="text-stone-300 dark:text-stone-500"><b>{secondaryMeaningLabel}:</b> {secondaryMeaning}</li>
      </ul>
    </div>
  )
}

export function Spread({spreadData}: {spreadData: SpreadData}) {

  let cards = spreadData.cards;

  for (var i = 0; i < cards.length; i++) {
    if (spreadData.pullDetails.cardLabels != undefined) {
      cards[i].label = spreadData.pullDetails.cardLabels[i];
    }
    else {
      cards[i].label = (i+1).toString();
    }
  }

  return (
    <>
      <div id="spread" className="flex flex-col md:flex-row rounded-lg bg-stone-100 dark:bg-stone-700 p-5 xs:p-10 pb-2 xs:pb-6 my-6 gap-5 xs:gap-10 max-w-[90vw]">
        {cards.map(function(card, index: number) {
          return (
            <Card cardData={card} key={index} />
          );
        })}
      </div>
      <div id="card-info" className="flex flex-col gap-5 w-content max-w-100 mx-auto">
        <p className="text-center text-stone-400 text-4xl">About these cards...</p>
        {cards.map(function(card, index: number) {
          return (
            <CardInfo cardData={card} key={index} />
          );
        })}
      </div>
    </>
  );

}