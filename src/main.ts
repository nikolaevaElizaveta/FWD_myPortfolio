"use strict";

import { ComicData } from './types';
import moment from 'moment';

const email: string = 'e.nikolaeva@innopolis.university';

const params: URLSearchParams = new URLSearchParams();
params.append('email', email);

const identifierUrl: string = `https://fwd.innopolis.university/api/hw2?${params.toString()}`;

fetch(identifierUrl)
  .then((response: Response) => response.json())
  .then((data: string) => {
    const comicDetailsUrl: string = `https://fwd.innopolis.university/api/comic?id=${data}`;

    fetch(comicDetailsUrl)
      .then((response: Response) => response.json())
      .then((comicData: ComicData) => {
        const imageUrl: string = comicData.img;
        const alt: string = comicData.alt;
        const title: string = comicData.safe_title;
        const publicationDate: Date = new Date(
          parseInt(comicData.year),
          parseInt(comicData.month) - 1, // Month is zero-based in JavaScript Date object
          parseInt(comicData.day)
        );

        const comicImg: HTMLImageElement = document.createElement('img');
        comicImg.src = imageUrl;
        comicImg.alt = alt;

        const comicTitle: HTMLHeadingElement = document.createElement('h2');
        comicTitle.textContent = title;

        const comicDate: HTMLParagraphElement = document.createElement('p');
        comicDate.textContent = `Published on ${publicationDate.toLocaleDateString()}`;
        
        const timeAgo = moment(publicationDate).fromNow();
        console.log(`Released ${timeAgo}`);

        const container: HTMLElement | null = document.getElementById('comic-container');

        if (container !== null) {
          container.appendChild(comicImg);
          container.appendChild(comicTitle);
          container.appendChild(comicDate);
        } else {
          console.error('Error');
        }
      });
  })
  .catch((error: Error) => console.log('Error fetching comic identifier:', error));
