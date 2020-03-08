export const axiosConfigHeader = ({token}) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': token })
    }
  }
}
