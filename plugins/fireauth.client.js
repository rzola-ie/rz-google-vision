import { auth } from '@/services/fireinit.js'

export default ( { store } ) => {
  addScript()

  function addScript() {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js';
    script.async = true;
    document.head.appendChild(script)
  }

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        return resolve(store.commit('SET_USER', user))
      }

      return resolve()
    })
  })
}