export const state = () => ({
  user: null,
  medications: [{title: "Crestor OTC"}]
})

export const mutations = {
  SET_USER(state, user) {
    state.user = JSON.parse(JSON.stringify(user))
  },
  REMOVE_USER(state) {
    state.user = null
  },
  ADD_MEDICATION(state, medication) {
    state.medications = [...state.medications, medication];
  },
  REMOVE_MEDICATION(state, medicationIndex) {
    state.medications.splice(medicationIndex, 1);
  }
}