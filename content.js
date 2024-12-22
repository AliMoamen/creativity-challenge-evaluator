console.log("Creativity Evaluator Loaded!");

// API Default Config
const baseURL = "https://wordsapiv1.p.rapidapi.com/words/";
const apiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "6771ca7274msh08548fc81139e73p12b34djsn71e25d88d233",
    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
  },
};

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
console.log(submittedWords);

// Get Word Text Of Speech
async function getWordSpeech(word) {
  try {
    const response = await fetch(baseURL + `${word}/definitions`, apiOptions);
    if (response.status === 404) {
      console.error(`Word "${word}" not found.`);
      return [];
    }
    if (response.status !== 200) {
      console.error(`Error: Received status code ${response.status}`);
      return [];
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(`Error Fetching Data: ${err}`);
    return [];
  }
}

// Get Submitted Words Text of Speech
async function getSubmittedWordsSpeech(submittedWords) {
  const promises = submittedWords.map(async ({ word, id }) => {
    const { definitions, word: matchedWord } = await getWordSpeech(word);
    if (!definitions || !matchedWord) {
      return { word, id, matchedWord: "", partOfSpeech: [] };
    }
    const speech = new Set();
    for (const { partOfSpeech } of definitions) {
      speech.add(partOfSpeech);
    }
    return { word, id, matchedWord, partOfSpeech: [...speech] };
  });

  const res = await Promise.all(promises);
  console.log(res);

  return res;
}

console.log(getSubmittedWordsSpeech(submittedWords));
