export default function ({ store, redirect, route }) {
  store.state.user != null && route.name == '/' ? redirect('/home') : ''
  store.state.user == null && isAdminRoute(route) ? redirect('/') : ''
}

function isAdminRoute(route) {
  if (
    route.matched.some((record) => record.path == '/home') ||
    route.matched.some((record) => record.path == '/game') ||
    route.matched.some((record) => record.path == '/labels') ||
    route.matched.some((record) => record.path == '/medications') ||
    route.matched.some((record) => record.path == '/add')
    ) {
    return true
  }
}