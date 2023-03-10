export const state = {
  words: [],
};

export const loadWords = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    state.words = data;
    state.wordsJoined = data.join(' ');

    if (!res.ok) throw new Error(`error fetching data !!! `);
  } catch (err) {
    console.error(err);
  }
};
