// Используется для создания новых объектов в базе. Все значения >= INITIAL_NUBER
// будут опознаны как идентификаторы для новых объектов.
const INITIAL_NUMBER = 1438093963439;
let magicNumber = INITIAL_NUMBER;

export default {
  setIfBigger(number) {
    return number > magicNumber ? magicNumber = number : magicNumber;    
  },
  next() {
    return magicNumber++;
  }
}