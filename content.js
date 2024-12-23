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
async function getWordData(word) {
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

function checkPluralization(word) {
  // Handle edge cases
  if (!word || typeof word !== "string") return false;

  // Convert to lowercase for uniform checks
  word = word.toLowerCase();

  // List of known irregular plurals
  const irregularPlurals = new Set([
    "children",
    "teeth",
    "mice",
    "geese",
    "people",
    "feet",
    "men",
    "women",
    "data",
    "dice",
    "sheep", // Same singular and plural
    "deer",
    "fish",
    "species",
    "series",
    "cattle",
  ]);

  const irregularSingulars = new Set([
    "child",
    "tooth",
    "mouse",
    "goose",
    "person",
    "foot",
    "man",
    "woman",
    "datum",
    "die",
  ]);

  // If the word is in the irregular plurals set
  if (irregularPlurals.has(word)) return true;

  // If the word is in the irregular singulars set
  if (irregularSingulars.has(word)) return false;

  // Handle common plural endings
  if (
    word.endsWith("s") &&
    !word.endsWith("ss") && // Not words like "glass" or "class"
    !word.endsWith("us") && // Not Latin-origin singulars like "focus"
    !word.endsWith("is") // Not words like "analysis" or "basis"
  ) {
    return true; // Likely plural
  }

  // Handle plurals with -ies (babies, stories)
  if (word.endsWith("ies") && word.length > 3 && !word.endsWith("iesus")) {
    return true;
  }

  // Handle plurals with -ves (wolves, knives)
  if (word.endsWith("ves")) {
    return true;
  }

  // Handle Latin/Greek plural endings (phenomena, criteria)
  if (word.endsWith("a") && !word.endsWith("ia") && word.length > 3) {
    return true;
  }

  // Singular forms by default if none of the above match
  return false;
}

// Get Submitted Words Text of Speech
async function getSubmittedWordsSpeech(submittedWords) {
  const promises = submittedWords.map(async ({ word, id }) => {
    const { meaningsOutput: meanings, sources } = await getWordData(word);

    if (!meanings.length || !sources.length) {
      return {
        word,
        id,
        partOfSpeech: [],
        sources: [],
        isNoun: false,
        isPlural: false,
      };
    }

    let isNoun = false;
    let isPlural = checkPluralization(word);

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
  return res;
}

// Render Submitted Words Based on Speech
async function renderSubmittedWords() {
  const submittedWordsSpeech = await getSubmittedWordsSpeech(submittedWords);
  const wordCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  let currWord = 0;
  for (const { id, isNoun, isPlural } of submittedWordsSpeech) {
    const wordInput = document.querySelector(
      `input[type="text"][data-reactid="${id}"]`
    );
    const wordCheckbox = wordCheckboxes[currWord];
    wordInput.style =
      isNoun && !isPlural
        ? "border-color: #28a745"
        : isNoun && isPlural
        ? "border-color: #ffc107"
        : "border-color: #dc3545";

    wordCheckbox.checked = !isNoun && !isPlural;
    currWord += 1;
  }
}

renderSubmittedWords();
