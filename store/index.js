export const state = () => ({
  medications: [{title: "Crestor OTC"}]
})

export const mutations = {
  ADD_MEDICATION(state, medication) {
    state.medications = [...state.medications, medication];
  },
  REMOVE_MEDICATION(state, medicationIndex) {
    state.medications.splice(medicationIndex, 1);
  }
}