// dummy data
import { blackList, whiteList, contras } from "~/lib/words";

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
  checkDrugToDrugInteractions(_, drugIds) {
    return this.$axios.post(
      '/check-interactions',
      drugIds 
    );
  },
  searchMeds(_, term) {
    return new Promise((resolve) => {
      setTimeout(() =>
        resolve([
          {
            id: '580680',
            name: 'Farxiga',
            description: 'An oral diabetes medicine that helps control blood sugar levels.',
            imgUrl: 'https://www.drugs.com/images/pills/mtm/003106210_PB.jpg'
          },
          {
            id: '151400',
            name: 'Amlodipine',
            description: 'Used with or without other medications to treat high blood pressure.',
            imgUrl: 'https://img.medscapestatic.com/pi/features/drugdirectory/octupdate/ROX01000.jpg'
          },
          {
            id: '282572',
            name: 'Oxybutynin Chloride',
            description: 'Used to treat overactive bladder and urinary conditions.',
            imgUrl: 'https://www.drugs.com/images/pills/nlm/433530367.jpg'
          },
          {
            id: '1248',
            name: 'Potassium Chloride',
            description: 'Used to prevent or to treat low blood levels of potassium (hypokalemia).',
            imgUrl: 'https://www.drugs.com/images/pills/mtm/Potassium%20Chloride%20ER%208%20mEq-COP.jpg'
          },
          {
            id: '0',
            name: 'Calquence',
            description: 'Blocks the action of certain enzymes in the body, which can interfere with the growth and spread of cancer cells',
            imgUrl: 'https://www.drugs.com/images/pills/fio/ASZ05120/calquence.JPG'
          },
          {
            id: '451293',
            name: 'Crestor',
            description: 'How about that web app? pretty cool!',
            imgUrl: 'https://www.drugs.com/images/pills/nlm/548685341.jpg'
          },
          {
            id: '0',
            name: 'Bevespi',
            description: 'an inhalation aerosol used to...',
            imgUrl: 'https://qtxasset.com/styles/breakpoint_sm_default_480px_w/s3/2016-04/Bevespi.jpg?LOgW3SVM6VuATrorjb2QvFCMvrYMpN3x&itok=U13FB9i-'
          },
          {
            id: '6559',
            name: 'Warfarin',
            description: 'Something with blood pressure.',
            imgUrl: 'https://www.drugs.com/images/pills/nlm/516724027.jpg'
          },
          {
            id: '0',
            name: 'Advil',
            description: 'Pass a couple this way.',
            imgUrl: 'https://www.drugs.com/images/pills/nlm/005730150.jpg'
          },
          {
            id: '0',
            name: 'Simvastatin',
            description: 'A statin to treat cholesterol.',
            imgUrl: 'https://www.drugs.com/images/pills/nlm/633040793.jpg'
          },
          {
            id: '0',
            name: 'Cyclosporine',
            description: 'A medicine for your immune system.',
            imgUrl: 'https://www.drugs.com/images/pills/nlm/200000630.jpg'
          },
          {
            id: '0',
            name: 'Tacrolimus',
            description: 'A medicine for your immune system.',
            imgUrl: 'https://www.drugs.com/images/pills/custom/pill15153-1/tacrolimus.jpg'
          },
          {
            id: '0',
            name: 'Sildenafil',
            description: 'A medicine to treat erectile disfunction.',
            imgUrl: 'https://www.drugs.com/images/pills/fio/GSO00330/sildenafil-citrate.JPG'
          },
        ]
        .filter(item => item.name.toLowerCase().includes(term.toLowerCase()))
        .sort((a, b) => a.indexOf(term[0]) - b.indexOf(term[0]))
        ),
        3000
      )
    })
  },
  filterSearch(_, term) {
    if(!term) return;

    return new Promise((resolve) => {
      let contraNames = [];
      contras.forEach(({ name }) => {
        contraNames.push(name.toLowerCase());
      });

      // filter contra array
      let contraFilter = contraNames
        .sort((a, b) => a.indexOf(term[0]) - b.indexOf(term[0]))
        .filter(str => str.includes(term.toLowerCase()))

      // filter whitelist arrat
      let whiteFilter = whiteList
        .sort((a, b) => a.indexOf(term[0]) - b.indexOf(term[0]))
        .filter(str => str.includes(term.toLowerCase()))

      // combine arrays remove duplicates and only return the first 5 results
      let uniqueSorted = [...new Set([...contraFilter, ...whiteFilter])]
        .filter((_, index) => index < 5);

      setTimeout(() => resolve(uniqueSorted), 150)
    })
  }
}