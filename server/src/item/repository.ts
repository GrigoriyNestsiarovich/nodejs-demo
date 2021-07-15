import { Card } from './item';
import { cards } from './rep';

const items: Card[] = cards;

export function getCards(): Promise<Card[]> {
  return Promise.resolve<Card[]>(items);
}

export function getCardByName(name: string): Promise<Card | undefined> {
  return Promise.resolve(items.find((it) => it.word.toLowerCase() === name.toLowerCase()));
}

export function getCardByCategoryId(catId: number): Promise<Card | undefined> {
  return Promise.resolve(items.find((it) => it.categoryId === catId));
}

export function createCard(item: Card): Promise<Card> {
  const isExist = typeof items.find((it) => it.word.toLowerCase() === item.word.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Item with name ${item.word} is already exists.`));
  }
  items.push(item);
  return Promise.resolve(item);
}

export function updateCard(item: Card): Promise<Card> {
  const itemIndex = items.findIndex((it) => it.word.toLowerCase() === item.word.toLowerCase());
  if (itemIndex < 0) {
    return Promise.reject(new Error('Item not found'));
  }
  const existsItem = items.splice(itemIndex, 1)[0];
  const newItem: Card = {
    ...existsItem,
    ...item,
  };
  items.push(newItem);
  return Promise.resolve(newItem);
}

export function deleteCard(name: string): Promise<void> {
  const index = items.findIndex((it) => it.word.toLowerCase() === name.toLowerCase());
  if (index < 0) {
    Promise.reject(new Error('Item not found.'));
  }
  items.splice(index, 1);
  return Promise.resolve();
}
