import { type SpreadData, type CardData } from '../interfaces/interfaces';

export function Card({cardData}: {cardData : CardData}) {
  return <p>{cardData.title}</p>
}

export function Spread({spreadData}: {spreadData: SpreadData}) {

  console.log(JSON.stringify(spreadData));

  let cards = spreadData.message.cards;

  console.log(cards);

  return (
    <>
      
    </>
  );

}