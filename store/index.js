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
            description: 'I forget what farxiga does.',
            imgUrl: 'https://www.drugs.com/images/pills/mtm/003106210_PB.jpg'
          },
          {
            name: 'Crestor 5',
            description: 'How about that web app? pretty cool!',
            imgUrl: 'https://www.drugs.com/images/pills/nlm/548685341.jpg'
          },
          {
            name: 'Crestor 10',
            description: 'How about that web app? pretty cool!',
            imgUrl: 'https://www.drugs.com/images/pills/mtm/003100751_PB.jpg'
          },
          {
            name: 'Bevespi',
            description: 'an inhalation aerosol used to...',
            imgUrl: 'https://qtxasset.com/styles/breakpoint_sm_default_480px_w/s3/2016-04/Bevespi.jpg?LOgW3SVM6VuATrorjb2QvFCMvrYMpN3x&itok=U13FB9i-'
          },
          {
            name: 'Warfarin',
            description: 'Something with blood pressure.',
            imgUrl: 'https://www.drugs.com/images/pills/nlm/516724027.jpg'
          },
          {
            name: 'Advil',
            description: 'Pass a couple this way.',
            imgUrl: ''
          },
          {
            name: 'Simvastatin',
            description: 'A statin to treat cholesterol.',
            imgUrl: ''
          },
          {
            name: 'Cyclosporine',
            description: 'A medicine for your immune system.',
            imgUrl: ''
          },
          {
            name: 'Tacrolimus',
            description: 'A medicine for your immune system.',
            imgUrl: ''
          },
          {
            name: 'Sildenafil',
            description: 'A medicine to treat erectile disfunction.',
            imgUrl: ''
          },
        ].filter(item => item.name.includes(term))
        ),
        1500
      )
    })
  }
}