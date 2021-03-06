// Используется для создания новых объектов в базе. Все значения >= INITIAL_NUBER
// будут опознаны как идентификаторы для новых объектов.
const INITIAL_NUMBER = 1438093963439;
let magicNumber = INITIAL_NUMBER;

export const isMagical = (number) => (
  number >= INITIAL_NUMBER
);

export const setIfBigger = (number) => (
  number > magicNumber ? magicNumber = number : magicNumber
);

export const next = () => (
  ++magicNumber
);