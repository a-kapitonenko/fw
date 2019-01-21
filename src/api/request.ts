// const apiUrl = '/api';

// export default function (url, methodб data) {
//   return fetch(`${apiUrl}/${url}`)
//   .then(res => res.text().then(text => ({ status: res.status, text })))
//   .then(({ text, status }) => {
//     let json;
//     try {
//       json = JSON.parse(text);
//     } catch (e) {
//       throw { message: 'не удалось распарсить JSON' };
//     }
//     const firstNumber = Math.floor(status / 100);

//     if ([4, 5].includes(firstNumber)) {
//       throw json;
//     }

//     return json;
//   });
// }

export function fakeFetch(func: any, data?: any) {
  return new Promise((resolver) => {
    const response = func(data);

    setTimeout(() => {
      resolver(response);
    }, 2000);
  })
  .then(json => json)
};

export default fakeFetch;