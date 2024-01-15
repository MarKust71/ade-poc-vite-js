import { Mstr } from './components/Mstr.jsx'

export const App = () => {
  const onClick = async () => {
    try {
      const response = await fetch(
        'http://192.168.80.57:8080/MicroStrategyLibrary/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-MSTR-AuthToken': '*',
          },
          withCredentials: true,
          body: JSON.stringify({
            username: 'ADE',
            password: 'A12345678#',
            loginMode: 1,
            applicationId: 'C2B2023642F6753A2EF159A75E0CFF29',
          }),
        }
      )

      console.log({ response })

      const authToken = response.headers.get('X-MSTR-AuthToken')
      console.log({ authToken })

      const identityToken = await fetch(
        'http://192.168.80.57:8080/MicroStrategyLibrary/api/auth/identityToken',
        {
          method: 'POST',
          headers: {
            'X-MSTR-AuthToken': authToken,
          },
          withCredentials: true,
        }
      )

      console.log({ identityToken })

      const session = await fetch(
        'http://192.168.80.57:8080/MicroStrategyLibrary/api/sessions',
        {
          method: 'GET',
          headers: {
            'X-MSTR-AuthToken': authToken,
            withCredentials: true,
          },
        }
      )

      console.log({ session })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <h1>Custom Web App</h1>

        <h2>with some MicroStrategy components embedded</h2>

        <button
          onClick={onClick}
          style={{
            marginBottom: '24px',
          }}
        >
          Login
        </button>
      </div>

      <div
        style={{ marginBottom: '24px', width: '100%' }}
        id={'embedding-container'}
      ></div>

      <div
        style={{ marginBottom: '24px', width: '100%' }}
        id={'embedding-dossier-container'}
      ></div>

      <Mstr />
    </>
  )
}
