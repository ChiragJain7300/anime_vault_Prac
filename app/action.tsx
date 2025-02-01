"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
export const fetchApi = async (page: number) => {
  const fetchData = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );

  const animeData = await fetchData.json();

  return animeData.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ));
};
