# Word Game

To run this: `npm install` and `npm run dev`

### Frontend
The `src/components` folder has all the display components used in the game.
`App.tsx` holds all the main display logic.

### Backend
The dictionary of words has been implemented using a trie data structure via a third party package https://www.npmjs.com/package/@kamilmielnik/trie

The list of words were first pre-processed, serialized and saved in a text format. (`src/data/serialized.txt`) When the game loads, the text file is deserialized and loaded into the trie structure and all operations such as looking for the validity of a word, finding the optimal words etc is done in the frontend to ensure the user has a smooth experience. 

The main code for this is in `src/utils/WordUtil.ts`

