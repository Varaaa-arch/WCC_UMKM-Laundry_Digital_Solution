/** Default app home after login — admin panel vs user dashboard */
export function getAppHomePath(isAdmin: boolean) {
  return isAdmin ? "/admin" : "/dashboard"
}
