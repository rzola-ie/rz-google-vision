export const state = () => ({
  user: null,
  numOfMeds: null,
  medications: [],
  medSearchResults: []
})

export const mutations = {
  SET_USER(state, user) {
    state.user = JSON.parse(JSON.stringify(user))
  },
  REMOVE_USER(state) {
    state.user = null
    localStorage.removeItem('email');
  },
  ADD_MEDICATION_NUMBER(state, numOfMeds) {
    state.numOfMeds = numOfMeds;
  },
  ADD_MEDICATION(state, medication) {
    state.medications = [...state.medications, medication];
  },
  REMOVE_MEDICATION(state, medicationIndex) {
    state.medications.splice(medicationIndex, 1);
  },
  SET_MED_SEARCH_RESULTS() {}
}

export const actions = {
  searchMeds(_, term) {
    return new Promise((resolve) => {
      setTimeout(() =>
        resolve([
          {
            name: 'Farxiga',
            description: 'i forget what farxiga does'
          },
          {
            name: 'Fauxiga',
            description: 'knock off farxiga'
          },
          {
            name: 'SeeFarga',
            description: 'eye sight medication'
          },
          {
            name: 'Crestor',
            description: 'how about that web app? pretty cool!'
          },
          {
            name: 'Bevespi',
            description: 'not a clue...'
          }
        ].filter(item => item.name.includes(term))
        ),
        1500
      )
    })
  }
}