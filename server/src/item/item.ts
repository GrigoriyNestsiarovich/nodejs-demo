export interface Card {
  word: string;
  translation: string;
  categoryId: number;
  category: string;
  audioSrc: string;
  image: string;
  clicks?: number;
  correct?: number;
  wrong?: number;
  error?: number;
  id: number;
}
