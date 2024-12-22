console.log("Creativity Evaluator Loaded!");

// API Default Config
const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Collect all input elements for words
const wordInputs = document.querySelectorAll(
  'input[type="text"]:not([disabled])'
);
const submittedWords = [];

for (const wordInput of wordInputs) {
  submittedWords.push({
    word: wordInput.defaultValue,
    id: wordInput.dataset.reactid,
  });
}

// Get Word Definitions and Part of Speech
async function getWordDefinitions(word) {
  try {
    const response = await fetch(baseURL + `${word}`);
    const result = await response.json();
    let meaningsOutput = [];
    const sources = new Set();

    // Ensure result contains meanings and sourceUrls
    for (const { meanings, sourceUrls } of result) {
      if (meanings && Array.isArray(meanings)) {
        meaningsOutput = [...meanings, ...meaningsOutput];
      }
      if (sourceUrls && Array.isArray(sourceUrls)) {
        for (const url of sourceUrls) {
          sources.add(url);
        }
      }
    }
    return { meaningsOutput, sources: [...sources] };
  } catch (err) {
    console.error(`Error Fetching Data: ${err}`);
    return { meaningsOutput: [], sources: [] };
  }
}

// Get Submitted Words Text of Speech
async function getSubmittedWordsSpeech(submittedWords) {
  const promises = submittedWords.map(async ({ word, id }) => {
    const { meaningsOutput: meanings, sources } = await getWordDefinitions(
      word
    );
    let isNoun = false;
    const isPlural = sources.length > 1;

    if (!meanings.length) {
      return {
        word,
        id,
        partOfSpeech: [],
        sources: [],
        isNoun: false,
        isPlural: false,
      };
    }

    const speech = new Set();
    for (const { partOfSpeech } of meanings) {
      if (partOfSpeech) {
        speech.add(partOfSpeech);
        if (partOfSpeech === "noun") {
          isNoun = true;
        }
      }
    }

    return { word, id, sources, partOfSpeech: [...speech], isNoun, isPlural };
  });

  const res = await Promise.all(promises);
  console.log(res);

  return res;
}
getSubmittedWordsSpeech(submittedWords);
