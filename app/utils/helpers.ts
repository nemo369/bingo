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

export const objToArray = (obj: any, isShownPictue = false): any[] => {
  let objOfObjs: MetadataObj;
  if (!obj || !obj.length) {
    return [];
  }
  if (Array.isArray(obj) && obj.length === 1) {
    objOfObjs = obj[0];
  } else {
    objOfObjs = obj;
  }

  return Object.entries(objOfObjs).map(
    ([key, value]: [string, MetadataObj]) => {
      if (isShownPictue) {
        let res = {};
        Object.entries(value).forEach(([subKey, subValue]) => {
          res = {
            ...res,
            ...subValue,
            ballNumber: subKey,
          };
        });
        return res;
      }
      return { ...value, ballNumber: key };
    }
  );
};

export const imageExists = (imageUrl: string): boolean => {
  const http = new XMLHttpRequest();

  http.open('HEAD', imageUrl, false);
  http.send();

  return http.status !== 404;
};

export const uniqById = (arr: any, id: string | number): any[] => {
  return Object.values(
    arr.reduce((acc: any[], cur: any) => Object.assign(acc, { [id]: cur }), {})
  );
};
interface MetadataObj {
  [key: string]: any;
}
