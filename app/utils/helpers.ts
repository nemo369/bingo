export function throttle(fn: Function, wait: number) {
  let isCalled = false;
  return function (...args: any) {
    if (!isCalled) {
      fn(...args);
      isCalled = true;
      setTimeout(() => {
        isCalled = false;
      }, wait);
    }
  };
}

export function shuffleArray<T>([...array]: T[]): T[] {
  let counter = array.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

export const convertErr = (err: any) => {
  const objAsString = JSON.stringify(err, Object.getOwnPropertyNames(err));
  const obj = JSON.parse(objAsString);
  if (typeof obj.message === 'object') {
    obj.data = JSON.parse(obj.message);
  } else {
    obj.data = obj.message;
  }
  return obj;
};
