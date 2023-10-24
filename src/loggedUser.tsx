interface User {
  userId: number
  nome: string
  email: string
  senha: string
}

let userData: User | null = null

// Recupere os dados do localStorage se estiverem disponíveis
const storedUserData = localStorage.getItem('userData')
if (storedUserData) {
  userData = JSON.parse(storedUserData)
}

export function setUserData(data: User | null) {
  userData = data

  // Salve os dados no localStorage
  localStorage.setItem('userData', JSON.stringify(data))
}

export function getUserData(): User | null {
  return userData
}
