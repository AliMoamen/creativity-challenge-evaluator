# Creativity Evaluator Extension

The **Creativity Evaluator** extension is designed to assist admission processors in evaluating word submissions for the Creativity Word Challenge. By automatically analyzing submitted words, this extension streamlines the assessment process, providing insights into the creativity and correctness of each response.

## Key Features

- **Word Analysis**: Fetches definitions and parts of speech for each word submitted, ensuring they meet the challenge's requirements of being common nouns and not pluralized terms.
  
- **Dynamic Evaluation**: Based on the analysis, each word is visually categorized:
  - **Green Border**: Nouns that are correctly singular. ✅
  - **Yellow Border**: Plural nouns. ⚠️
  - **Red Border**: Non-nouns or invalid words. ❌

- **Plurals & Irregular Words**: Handles common pluralization rules and irregular nouns (e.g., "children" vs. "child") to ensure accurate assessment. 🔄

- **Streamlined Feedback**: Provides immediate feedback with color-coded borders and checkboxes, allowing admission processors to quickly identify which submissions meet the challenge criteria.

## How It Works

The extension analyzes the words submitted by applicants by checking them against an external dictionary API for definitions and parts of speech. Based on the fetched data, each word is categorized as a noun, plural noun, or invalid word. The extension then provides immediate feedback through color-coded borders and checkboxes.

This tool enhances the efficiency and accuracy of evaluating creativity challenge submissions, saving time and providing clear visual cues to help make informed decisions.

## How to Install


1. **Set Up Locally**:
   - Download the ZIP file of the code from the green **Code** button in the GitHub repository.

2. **Load the Extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer Mode** by toggling the switch in the top-right corner.
   - Click **Load Unpacked** and select the folder where you downloaded.

3. **Use the Extension**:
   - Once installed, the extension will automatically work when visiting the evaluation page of the creativity challenge.
   - The extension will analyze and provide visual feedback on word submissions.

## Cautions

- **Not a Replacement for AP Role**: The extension is designed to assist admission processors, but it is not meant to replace the role of an admission processor. Human judgment and critical thinking are still essential to evaluate submissions effectively.
  
- **Accuracy**: While the extension provides valuable insights, it is not 100% accurate. Processors should cross-check flagged words when in doubt.

## Limitations

- **Proper Nouns**: The extension does not recognize proper nouns and may miscategorize them as regular nouns.
  
- **Pluralization Issues**: The extension may miscategorize highly uncommon words as plural, even if they are singular.

- **Compound Nouns**: Popular compound nouns such as "Sodium Chloride" or "Frying Pan" may be incorrectly categorized as green (singular nouns), even though they are compound terms.

## Further Contributions

I welcome further contributions to enhance the **Creativity Evaluator** extension. If you have suggestions for improvements or additional features, or if you would like to contribute code, feel free to submit an issue or pull request. Your contributions will be highly valued and appreciated.

---
Created by [Ali Osman](https://ali-osman.com/)
