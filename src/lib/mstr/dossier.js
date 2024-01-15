let url =
  'http://192.168.80.57:8080/MicroStrategyLibrary/app/D2B5EF4E44B789AC642D92B150D171BB/46DEC30D4FB2AECE836DB591717E8D3C' // https://{env-url}/{libraryName}/app/{projectId}/{dossierId}
// let url =
//   'https://mstr-dsc.qiwa.sa/MicroStrategyLibrary/app/F9166118434E3DD70DD8FD99D7197A5F/EADF687A4CE32D2F3E9B3EB5DC35BE51' // https://{env-url}/{libraryName}/app/{projectId}/{dossierId}
// eslint-disable-next-line no-unused-vars
let dossier // Variable to store the dossier created. Used by Event Handler do not remove!
let config // Variable to store the configuration settings for dossier.
export async function runCodeDossier() {
  // TODO: remove!
  // eslint-disable-next-line no-console
  console.log(
    '%c runCodeDossier start ',
    'color: black; background-color: yellow',
    {}
  )

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
    // enableCustomAuthentication: false,
    enableCustomAuthentication: true,
    enableResponsive: true,
    filterFeature: {
      enabled: true,
      edit: true,
      summary: true,
    },
    filters: [],
    getLoginToken: function login() {
      console.log(
        '%c getLoginToken ',
        'color: black; background-color: yellow',
        {}
      )

      return getXHRRequestPromise(
        'http://192.168.80.57:8080/MicroStrategyLibrary/api/auth/login',
        postData,
        'POST',
        'application/json',
        'X-Mstr-AuthToken'
      )
        .then(function (authToken) {
          // TODO: remove!
          // eslint-disable-next-line no-console
          console.log('%c  ', 'color: black; background-color: yellow', {
            authToken,
          })

          return authToken
        })
        .catch(function (error) {
          console.log(error)
        })
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

  // INSERT PROPERTIES ABOVE HERE

  // TODO: remove!
  // eslint-disable-next-line no-console
  console.log('%c config: ', 'color: black; background-color: yellow', {
    config,
  })

  // Embed the dossier with the configuration settings
  try {
    // TODO: remove!
    // eslint-disable-next-line no-console
    console.log(
      '%c try to get dossier ',
      'color: black; background-color: yellow',
      {}
    )

    dossier = await window.microstrategy.dossier.create(config)
  } catch (error) {
    console.log(error)
  }

  // INSERT METHODS BELOW HERE

  // INSERT METHODS ABOVE HERE
}

/*
 * Minimal information necessary to authenticate with Guest(Anonymous) authentication
 */

var postData = {
  loginMode: 1,
  // loginMode: 8,
  // username: 'Administrator',
  // password: '',
  username: 'ADE',
  password: 'A12345678#',
  // username: process.env.MSTR_USERNAME,
  // password: process.env.MSTR_PASSWORD,
}

function getXHRRequestPromise(url, body, method, contentType, desiredHeader) {
  console.log(
    '%c getXHRRequestPromise: ',
    'color: black; background-color: yellow',
    { url, body, method, contentType, desiredHeader }
  )

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()

    // TODO: remove!
    // eslint-disable-next-line no-console
    console.log(
      '%c getXHRRequestPromise: ',
      'color: black; background-color: yellow',
      { xhr }
    )

    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.send(JSON.stringify(body))
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 2) {
        resolve(xhr.getResponseHeader(desiredHeader))
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        })
      }
    }
  })
}
