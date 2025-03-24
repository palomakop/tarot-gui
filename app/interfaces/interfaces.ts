export interface PullDetails {
  allowReversed: Boolean,
  deck: String,
  intention: String,
  numberOfCards: Number,
  spreadType: String,
  cardLabels?: Array<String>,
}

export interface CardData {
  description: String,
  element: String,
  filename: String,
  reversed: Boolean,
  reversedMeaning: String,
  suit: String,
  suitIndex: String,
  title: String,
  uprightMeaning: String,
  label?: String,
}

export interface SpreadData {
  cards: Array<CardData>,
  id: String,
  pullDetails: PullDetails,
  timestamp: String,
}