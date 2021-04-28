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
    console.log('the term is ', term)
    return new Promise((resolve) => {
      setTimeout(() =>
        resolve([
          {
            id: '',
            name: 'Farxiga',
            description: 'An oral diabetes medicine that helps control blood sugar levels.',
            imgUrl: 'https://www.drugs.com/images/pills/mtm/003106210_PB.jpg'
          },
          {
            id: '',
            name: 'Calquence',
            description: 'Blocks the action of certain enzymes in the body, which can interfere with the growth and spread of cancer cells',
            imgUrl: 'https://www.drugs.com/images/pills/fio/ASZ05120/calquence.JPG'
          },
          {
            id: '',
            name: 'Crestor',
            description: 'How about that web app? pretty cool!',
            imgUrl: 'https://www.drugs.com/images/pills/nlm/548685341.jpg'
          },
          {
            id: '',
            name: 'Bevespi',
            description: 'an inhalation aerosol used to...',
            imgUrl: 'https://qtxasset.com/styles/breakpoint_sm_default_480px_w/s3/2016-04/Bevespi.jpg?LOgW3SVM6VuATrorjb2QvFCMvrYMpN3x&itok=U13FB9i-'
          },
          {
            id: '',
            name: 'Warfarin',
            description: 'Something with blood pressure.',
            imgUrl: 'https://www.drugs.com/images/pills/nlm/516724027.jpg'
          },
          {
            id: '',
            name: 'Advil',
            description: 'Pass a couple this way.',
            imgUrl: ''
          },
          {
            id: '',
            name: 'Simvastatin',
            description: 'A statin to treat cholesterol.',
            imgUrl: ''
          },
          {
            id: '',
            name: 'Cyclosporine',
            description: 'A medicine for your immune system.',
            imgUrl: ''
          },
          {
            id: '',
            name: 'Tacrolimus',
            description: 'A medicine for your immune system.',
            imgUrl: ''
          },
          {
            id: '',
            name: 'Sildenafil',
            description: 'A medicine to treat erectile disfunction.',
            imgUrl: ''
          },
        ].filter(item => item.name.toLowerCase().includes(term.toLowerCase()))
        ),
        1500
      )
    })
  }
}