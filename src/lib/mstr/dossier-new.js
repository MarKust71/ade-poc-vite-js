let url =
  'http://192.168.80.57:8080/MicroStrategyLibrary/app/D2B5EF4E44B789AC642D92B150D171BB/46DEC30D4FB2AECE836DB591717E8D3C' // https://{env-url}/{libraryName}/app/{projectId}/{dossierId}
// eslint-disable-next-line no-unused-vars
let dossier // Variable to store the dossier created. Used by Event Handler do not remove!
let config // Variable to store the configuration settings for dossier.
export async function runCodeDossierNew() {
  // For more details on configuration properties, see https://microstrategy.github.io/embedding-sdk-docs/add-functionality/methods-and-properties
  config = {
    url: url,
    placeholder: document.getElementById('embedding-dossier-container'),
    containerHeight: '600px',
    containerWidth: '800px',
    customAuthenticationType:
      window.microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
    customUi: {},
    disableNotification: true,
    dockedComment: {
      dockedPosition: 'left',
      canClose: true,
      dockChangeable: false,
      isDocked: false,
    },
    dockedFilter: {
      dockedPosition: 'left',
      canClose: true,
      dockChangeable: false,
      isDocked: false,
    },
    dockedTOC: {
      dockedPosition: 'left',
      theme: 'light',
      canClose: true,
      dockChangeable: false,
      isDocked: false,
    },
    dossierFeature: {
      readonly: false,
    },
    enableCollaboration: true,
    enableCustomAuthentication: false,
    enableResponsive: true,
    filterFeature: {
      enabled: true,
      edit: true,
      summary: true,
    },
    filters: [],
    getLoginToken: function login() {
      console.log('Implement log in to return promise of auth token')
    },
    navigationBar: {
      enabled: true,
      gotoLibrary: true,
      title: true,
      toc: true,
      reset: true,
      reprompt: true,
      share: true,
      comment: true,
      notification: true,
      filter: true,
      options: true,
      search: true,
      bookmark: true,
      edit: false,
    },
    optionsFeature: {
      enabled: true,
      help: false,
      logout: true,
      manage: false,
      showTutorials: false,
    },
    shareFeature: {
      enabled: true,
      invite: false,
      link: true,
      email: false,
      export: true,
      download: false,
      shareDossier: false,
      subscribe: false,
    },
    smartBanner: false,
    tocFeature: {
      enabled: true,
    },
    uiMessage: {
      enabled: true,
      addToLibrary: false,
    },
    visibleTutorials: {
      library: true,
      welcome: false,
      dossier: true,
      notification: false,
    },
    visualizationAppearances: [],
  }
  // INSERT PROPERTIES BELOW HERE

  /* Standard Authentication Start */
  config.customAuthenticationType =
    window.microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN
  // config.enableCustomAuthentication = true
  config.enableCustomAuthentication = false

  config.getLoginToken = async function login() {}
  /*
  config.getLoginToken = async function login() {
    // Check if the user has an existing login session through getting the authToken
    async function getAuthToken(options, baseServerUrl, libraryName) {
      return await fetch(
        baseServerUrl + '/' + libraryName + '/api/auth/token',
        options
      )
        .then((response) => {
          console.log('/api/auth/token response:', { response })
          if (response.ok) {
            console.log('authToken retrieved successfully')

            return response.headers.get('x-mstr-authtoken')
          } else {
            response.json().then((json) => {
              console.log('Failed to retrieve authToken:', { json })
            })
          }
        })
        .catch((error) =>
          console.log('Failed to retrieve authToken with error:', error)
        )
    }
    let options = {
      method: 'GET',
      credentials: 'include', // Including cookie
      mode: 'cors', // Setting as cors mode for cross origin
      headers: { 'content-type': 'application/json' },
    }
    // Need to parse the libraryName and baseServerUrl from the url to make api calls
    const urlRegExp = new RegExp(
      '(https?://[-a-zA-Z0-9@:%_.~#=+/]+)/([-a-zA-Z0-9@:%_.~#=+]+)/app/([A-Z0-9]+)/([A-Z0-9]+)'
      // '(http?://[-a-zA-Z0-9@:%_.~#=+/]+)/([-a-zA-Z0-9@:%_.~#=+]+)/app/([A-Z0-9]+)/([A-Z0-9]+)'
    )
    const urlMatched = url.match(urlRegExp)
    const baseServerUrl = urlMatched?.[1] || ''
    const libraryName = urlMatched?.[2] || ''

    // TODO: remove!
    // eslint-disable-next-line no-console
    console.log('%c  ', 'color: black; background-color: yellow', {
      urlMatched,
      options,
      baseServerUrl,
      libraryName,
    })

    let authToken = await getAuthToken(options, baseServerUrl, libraryName)
      .then((result) => {
        console.log({ result })
      })
      .catch((error) => {
        console.log({ error })
      })
    // If the authToken is available, return it
    if (authToken) {
      console.log('An existing login session has been found, logging in', {
        authToken,
      })
      return authToken
    }

    // Make a call to REST API to log the user in, if there is not a valid authToken
    options = {
      method: 'POST',
      credentials: 'include', // Including cookie
      mode: 'cors', // Setting as cors mode for cross origin
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        loginMode: 1, // 1 means Standard login
        // username: prompt('Please enter your username'),
        // password: prompt('Please enter your password'),
        username: 'ADE',
        password: 'A12345678#',
      }),
    }
    return fetch(baseServerUrl + '/' + libraryName + '/api/auth/login', options)
      .then((response) => {
        console.log('/api/auth/login response:', { response })

        if (response.ok) {
          console.log(
            'A new standard login session has been created successfully, logging in'
          )
          return response.headers.get('x-mstr-authtoken')
        } else response.json().then((json) => console.log(json))
      })
      .catch((error) => console.log('Failed Standard Login with error:', error))
  }
*/
  /* Standard Authentication End */

  /* Guest Authentication Start */
  /*
  config.customAuthenticationType =
    window.microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN
  config.enableCustomAuthentication = true
  config.getLoginToken = async function login() {
    // Check if the user has an existing login session through getting the authToken
    async function getAuthToken(options, baseServerUrl, libraryName) {
      return await fetch(
        baseServerUrl + '/' + libraryName + '/api/auth/token',
        options
      )
        .then((response) => {
          if (response.ok) return response.headers.get('x-mstr-authtoken')
          else response.json().then((json) => console.log(json))
        })
        .catch((error) =>
          console.error('Failed to retrieve authToken with error:', error)
        )
    }
    let options = {
      method: 'GET',
      credentials: 'include', // Including cookie
      mode: 'cors', // Setting as cors mode for cross origin
      headers: { 'content-type': 'application/json' },
    }
    // Need to parse the libraryName and baseServerUrl from the url to make api calls
    const urlRegExp = new RegExp(
      '(https?://[-a-zA-Z0-9@:%_.~#=+/]+)/([-a-zA-Z0-9@:%_.~#=+]+)/app/([A-Z0-9]+)/([A-Z0-9]+)'
    )
    const urlMatched = url.match(urlRegExp)
    const baseServerUrl = urlMatched?.[1] || ''
    const libraryName = urlMatched?.[2] || ''
    let authToken = await getAuthToken(
      options,
      baseServerUrl,
      libraryName
    ).catch((error) => console.error(error))

    // If the authToken is available, return it
    if (authToken) {
      console.log('An existing login session has been found, logging in')
      return authToken
    }

    // Make a call to REST API to log the user in, if there is not a valid authToken
    options = {
      method: 'POST',
      credentials: 'include', // Including cookie
      mode: 'cors', // Setting as cors mode for cross origin
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        loginMode: 8, // 8 means guest login
      }),
    }
    return fetch(baseServerUrl + '/' + libraryName + '/api/auth/login', options)
      .then((response) => {
        if (response.ok) {
          console.log(
            'A new guest login session has been created successfully, logging in'
          )
          return response.headers.get('x-mstr-authtoken')
        } else response.json().then((json) => console.log(json))
      })
      .catch((error) => console.error('Failed Guest Login with error:', error))
  }
*/
  /* Guest Authentication End */

  // INSERT PROPERTIES ABOVE HERE

  // Embed the dossier with the configuration settings
  try {
    dossier = await window.microstrategy.dossier.create(config)
  } catch (error) {
    console.log(error)
  }

  // INSERT METHODS BELOW HERE

  // INSERT METHODS ABOVE HERE
}
