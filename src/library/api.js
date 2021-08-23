import library from './'

const makeStandardQuery = async (query) => {
  try {
    const response = await library.query.post(`/`, query)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.errors)
  }
}

const getAllDecks = async () => {
  return await makeStandardQuery({
    "action": "deckNames",
    "version": 6
  })
}

const findCardsForDeck = async (deckName) => {
  return await makeStandardQuery({
    "action": "findCards",
    "version": 6,
    "params": {
      "query": '"deck:' + deckName + '"'
    }
  })
}

const findCardInfo = async (cards) => {
  return await makeStandardQuery({
    "action": "cardsInfo",
    "version": 6,
    "params": {
      cards
    }
  })
}

const checkIfSuspended = async cards => {
  return await makeStandardQuery({
    "action": "areSuspended",
    "version": 6,
    "params": {
      cards
    }
  })
}

const cardsToNotes = async cards => {
  return await makeStandardQuery({
    "action": "cardsToNotes",
    "version": 6,
    "params": {
      cards
    }
  })
}

const addTagToNote = async (note, tag) => {
  await makeStandardQuery({
    "action": "addTags",
    "version": 6,
    "params": {
      "notes": [note],
      "tags": `${tag}`
    }
  })
}

const notesInfo = async notes => {
  return await makeStandardQuery({
    "action": "notesInfo",
    "version": 6,
    "params": {
      notes
    }
  })
}

const suspend = async card => {
  return await makeStandardQuery({
    "action": "suspend",
    "version": 6,
    "params": {
        "cards": [card]
    }
})
}

const api = {
  getAllDecks,
  findCardsForDeck,
  findCardInfo,
  checkIfSuspended,
  cardsToNotes,
  addTagToNote,
  notesInfo,
  suspend
}

export default api