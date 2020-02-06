const url = NODE_ENV === "development" ? "http://praktikum.tk/cohort6" : "https://praktikum.tk/cohort6";

const apiData = {
  baseUrl: url,
  headers: {
    authorization: '539f9124-63cf-4162-a4d6-8525d0ac67b9',
    'Content-Type': 'application/json'
  }
}

export default apiData;