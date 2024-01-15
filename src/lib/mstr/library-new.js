let url =
  'http://192.168.80.57:8080/MicroStrategyLibrary/app/D2B5EF4E44B789AC642D92B150D171BB/46DEC30D4FB2AECE836DB591717E8D3C' // https://{env-url}/{libraryName}/app/{projectId}/{dossierId}
let baseServerUrl = 'http://192.168.80.57:8080'
let libraryName = 'MicroStrategyLibrary'
// https://{env-url}/{libraryName}/app/{projectId}/{dossierId}
let embeddingContext
let config // Variable to store the configuration settings for dossier.

function setNavBarEnabled(val) {
  embeddingContext.libraryPage
    .setNavigationBarEnabled(val)
    .then(() => console.log('Set NavBar to ' + val))
    .catch((error) => console.log(error))
}

export async function runCodeLibraryNew() {
  // For more details on configuration properties, see https://microstrategy.github.io/embedding-sdk-docs/embed-library-main-page/embed-library-properties
  config = {
    serverUrl: baseServerUrl + '/' + libraryName,
    placeholder: document.getElementById('embedding-container'),
    containerHeight: '700px',
    enableResponsive: true,
    customUi: {
      // Handle the UI in library home page
      library: {
        navigationBar: {
          enabled: false,
        },
        sidebar: {
          show: false, // Must be enabled by custom application
        },
      },
      // Handle the UI in dossier consumption mode
      dossierConsumption: {
        navigationBar: {
          enabled: true,
          edit: true,
        },
      },
      // Handle the UI in dossier authoring mode
      dossierAuthoring: {
        toolbar: {
          tableOfContents: {
            visible: true,
          },
        },
      },
    },
    currentPage: {
      key: 'all', // To show the all tab. Use one of these strings: all, myContent, favorites, recents, insights, subscriptions, defaultGroups, and myGroups.
    },
    errorHandler: function (error) {
      console.log('catching error', JSON.stringify(error))
    },

    sessionErrorHandler: (error) => {
      console.log('catching session error', JSON.stringify(error))
    },
  }
  // INSERT PROPERTIES BELOW HERE

  /* Identity Authentication Start */
  config.customAuthenticationType =
    window.microstrategy.dossier.CustomAuthenticationType.IDENTITY_TOKEN
  // config.enableCustomAuthentication = true
  config.enableCustomAuthentication = false

  config.getLoginToken = async function login() {}
  // config.getLoginToken = async function login() {
  //   // Check if the user has an existing login session through getting the authToken
  //
  //   let options = {
  //     method: 'GET',
  //     credentials: 'include', // Including cookie
  //     mode: 'cors', // Setting as cors mode for cross origin
  //     headers: { 'content-type': 'application/json' },
  //   }
  //   // Need to parse the libraryName and baseServerUrl from the url to make api calls
  //   const urlRegExp = new RegExp(
  //     '(https?://[-a-zA-Z0-9@:%_.~#=+/]+)/([-a-zA-Z0-9@:%_.~#=+]+)/app/([A-Z0-9]+)/([A-Z0-9]+)'
  //   )
  //   const urlMatched = url.match(urlRegExp)
  //   const baseServerUrl = urlMatched?.[1] || ''
  //   const libraryName = urlMatched?.[2] || ''
  //
  //   let authToken = await getAuthToken(
  //     options,
  //     baseServerUrl,
  //     libraryName
  //   ).catch((error) => console.log(error))
  //
  //   // TODO: remove!
  //   // eslint-disable-next-line no-console
  //   console.log('%c authToken: ', 'color: black; background-color: yellow', {
  //     authToken,
  //   })
  //
  //   // If the authToken is available, use it to get the identityToken
  //   if (authToken) {
  //     let identityToken = await getIdentityToken(authToken).catch((error) =>
  //       console.log(error)
  //     )
  //
  //     // TODO: remove!
  //     // eslint-disable-next-line no-console
  //     console.log(
  //       '%c identityToken: ',
  //       'color: black; background-color: yellow',
  //       { authToken, identityToken }
  //     )
  //
  //     // If the identityToken is valid, we can return it
  //     if (identityToken) {
  //       console.log(
  //         'An existing identityToken session has been found, logging in'
  //       )
  //       return identityToken
  //     }
  //   }
  //
  //   // Make a call to REST API to log the user in, if there is not a valid identityToken
  //   options = {
  //     method: 'POST',
  //     credentials: 'include', // Including cookie
  //     mode: 'cors', // Setting as cors mode for cross origin
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify({
  //       loginMode: 1, // 1 means Standard login
  //       // username: prompt('Please enter your username'),
  //       // password: prompt('Please enter your password'),
  //       username: 'ADE',
  //       password: 'A12345678#',
  //     }),
  //   }
  //
  //   // TODO: remove!
  //   // eslint-disable-next-line no-console
  //   console.log('%c options: ', 'color: black; background-color: yellow', {
  //     options,
  //   })
  //
  //   return fetch(baseServerUrl + '/' + libraryName + '/api/auth/login', options)
  //     .then((response) => {
  //       // TODO: remove!
  //       // eslint-disable-next-line no-console
  //       console.log('%c response: ', 'color: black; background-color: yellow', {
  //         response,
  //       })
  //
  //       if (response.ok) {
  //         let authToken = response.headers.get('x-mstr-authtoken')
  //         let identityOptions = {
  //           method: 'POST',
  //           credentials: 'include', // Including cookie
  //           mode: 'cors', // Setting as cors mode for cross origin
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'X-MSTR-AuthToken': authToken,
  //           },
  //         }
  //
  //         // TODO: remove!
  //         // eslint-disable-next-line no-console
  //         console.log('%c  ', 'color: black; background-color: yellow', {
  //           response,
  //           authToken,
  //           identityOptions,
  //         })
  //
  //         return fetch(
  //           baseServerUrl + '/' + libraryName + '/api/auth/identityToken',
  //           identityOptions
  //         ).then((response) => {
  //           if (response.ok) {
  //             console.log(
  //               'A new identityToken login session has been successfully created, logging in'
  //             )
  //             return response.headers.get('x-mstr-identitytoken')
  //           } else response.json().then((json) => console.log(json))
  //         })
  //       } else response.json().then((json) => console.log(json))
  //     })
  //     .catch((error) => console.log('Failed Identity Login with error:', error))
  // }
  /* Identity Authentication End */

  // INSERT PROPERTIES ABOVE HERE

  // Embed the dossier with the configuration settings
  try {
    embeddingContext =
      await window.microstrategy.embeddingContexts.embedLibraryPage(config)
  } catch (error) {
    console.log(error)
  }

  // INSERT METHODS BELOW HERE

  // INSERT METHODS ABOVE HERE
}

async function getIdentityToken(authToken) {
  let identityOptions = {
    method: 'GET',
    credentials: 'include', // Including cookie
    mode: 'cors', // Setting as cors mode for cross origin
    headers: {
      'Content-Type': 'application/json',
      'X-MSTR-AuthToken': authToken,
    },
  }

  // TODO: remove!
  // eslint-disable-next-line no-console
  console.log(
    '%c getIdentityToken: ',
    'color: black; background-color: yellow',
    { identityOptions }
  )

  return fetch(
    baseServerUrl + '/' + libraryName + '/api/auth/identityToken',
    identityOptions
  )
    .then((response) => {
      // TODO: remove!
      // eslint-disable-next-line no-console
      console.log(
        '%c identityOptions: ',
        'color: black; background-color: yellow',
        { response }
      )

      if (response.ok) {
        return response.headers.get('x-mstr-identitytoken')
      } else {
        response.json().then((json) => console.log(json))
      }
    })
    .catch((error) => console.log('Failed Identity Login with error:', error))
}

async function getAuthToken(options, baseServerUrl, libraryName) {
  return await fetch(
    baseServerUrl + '/' + libraryName + '/api/auth/token',
    options
  )
    .then((response) => {
      // TODO: remove!
      // eslint-disable-next-line no-console
      console.log(
        '%c getAuthToken: ',
        'color: black; background-color: yellow',
        { response }
      )

      if (response.ok) return response.headers.get('x-mstr-authtoken')
      else response.json().then((json) => console.log(json))
    })
    .catch((error) =>
      console.log('Failed to retrieve authToken with error:', error)
    )
}
