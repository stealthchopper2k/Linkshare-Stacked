import { Container,KeyedBox, File } from '@/ts/interfaces/dashboard';

export const newObj = (length: number): KeyedBox => {
  const letters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const usable_letters = letters.slice(0, length);

  let obj: { [key: string]: {} } = {}

  for (const letter of usable_letters) {
    obj[letter] = {}
  }

  return obj;
}

export const addValuesToObj = (property: string, objectArray: {}[]) => {
  const KeyedBox = newObj(objectArray.length);

  Object.keys(KeyedBox).forEach((key: string, i) => {
    if (objectArray[i]) {
      KeyedBox[key] = objectArray[i];
      const files = KeyedBox[key][property];

      for (let j = 0; j < files.length; j++) {
        const file = files[j];
        file['client_id'] = `${key + j}`
      }
    };
  });

  return KeyedBox as Container;
}