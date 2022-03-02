import { screen } from '@testing-library/react';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import NewsCard from './newsCard'
import '@testing-library/jest-dom';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('render news card', async () => {
  const fakeNews =
    {
      "id": 1,
      "title": "Sergipe recebe mais de 69 mil doses de vacinas contra a Covid-19",
      "msg": "Há previsão de outra remessa para a próxima segunda-feira (06/12/2021)",
      "img": "https://s2.glbimg.com/mxC2x6fp500RF1Pio0lZ7ZE-Ccc=/0x0:640x360/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/A/F/XR0E3FSnOvsNodTTj0XQ/thumbnail-image003-30-.jpg",
      "like": 4,
      "dislike": 2,
      "createdAt": "2022-02-07T23:14:30.572Z",
      "updatedAt": "2022-02-20T20:06:48.684Z",
      "authorId": 2,
      "author": {
        "id": 2,
        "name": "José Davi de Araujo Souza",
        "email": "email2@gmail.com",
        "reporter": true,
        "passwordHash": "$2b$05$Std6mcbc2ZURdtcQxpZPxeTVcSLgbqd7NoiCOToj1Wb/zqzzN1aPa",
        "createdAt": "2022-02-07T23:11:18.857Z",
        "updatedAt": "2022-02-07T23:11:18.857Z"
      }
    };

  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(fakeNews),
  }));

  await act(async () => {
    render( <NewsCard news={fakeNews} index={1}/>, container);
  });

  expect(container.querySelectorAll('.news').length).toBe(1);

  let element = screen.getByText(/Sergipe recebe/);
  expect(element).toBeInTheDocument();

  element = screen.getByText(/Há previsão de outra/);
  expect(element).toBeInTheDocument();

  element = screen.getByText(/Davi/);
  expect(element).toBeInTheDocument();

  global.fetch.mockRestore();
});