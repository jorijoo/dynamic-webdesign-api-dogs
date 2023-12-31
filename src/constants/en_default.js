//  LOCALIZATION: LANGUAGE
//
//  Copyright Jori Hiltunen 2023
//

const LOCALIZATION = {
    APP: {
        IMAGE_HEADING: dogBreed => `Click the image for a new ${dogBreed} picture from dog.ceo...`,
        WORD_RANDOM: 'random'
    },
    BREED_SEARCH: {
        FETCH_ERROR: 'Breed list fetch error:'
    },
    DOG_IMAGE: {
        ALT_TEXT: 'A dog image loaded from the dog.ceo API.'
    }
}

Object.freeze(LOCALIZATION)

export default LOCALIZATION