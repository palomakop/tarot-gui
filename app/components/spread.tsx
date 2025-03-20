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
    <div className="card-container relative flex flex-col items-center justify-center w-50 shrink aspect-[290/475] sepia-50" title={titleString as string}>
      <div className="card-back box-border p-1 absolute overflow-hidden w-full h-full bg-white rounded-md shadow-xl">
        <div className="card-back-img bg-contain bg-no-repeat bg-center w-full h-full" style={{ backgroundImage: `url(${backImg})` }}></div>
        </div>
      <div className="card-front box-border p-1 absolute overflow-hidden w-full h-full shrink bg-white rounded-md" >
        <div className="card-front-img bg-contain bg-no-repeat bg-center w-full h-full" style={cardFrontStyle} role="img" aria-label={cardData.description as string}></div>
      </div>
    </div>
  )
}

export function Spread({spreadData}: {spreadData: SpreadData}) {

  let cards = spreadData.cards;

  return (
    <div id="spread" className="flex rounded-lg bg-stone-100 dark:bg-stone-700 p-10 my-6 gap-9 max-w-[90vw]">
      {cards.map(function(card, index: number) {
        return (
          <Card cardData={card} key={index} />
        );
      })}
    </div>
  );

}