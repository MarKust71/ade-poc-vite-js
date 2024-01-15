let baseServerUrl = 'https://demo.microstrategy.com'
// let baseServerUrl = 'http://192.168.80.57:8080'
let libraryName = 'MicroStrategyLibrary'
// https://{env-url}/{libraryName}/app/{projectId}/{dossierId}
let embeddingContext
let config // Variable to store the configuration settings for dossier.

function setNavBarEnabled(val) {
  embeddingContext.libraryPage
    .setNavigationBarEnabled(val)
    .then(() => console.log('Set NavBar to ' + val))
    .catch((error) => console.error(error))
}

export async function runCodeLibraryDemo() {
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

  /* Library Page Layout Start */
  // Specify the custom UI settings on the embedded page.
  config.customUi = {
    ...config.customUi,
    library: {
      navigationBar: {
        enabled: true, // Show or hide the navigation bar.
        sortAndFilter: true, // Show or hide the library filter icon and the search bar.
        title: true, // Show or hide the title.
        searchBar: true, // Show or hide the search bar.
        createNew: {
          enabled: true, // Show or hide the "Create New" button.
        },
        notifications: true, // Show or hide the notification button.
        multiSelect: {
          enabled: true, // Show or hide the multi-select button.
        },
        account: {
          enabled: true, // Show or hide the account button.
        },
      },
      sidebar: {
        enabled: true, // Show or hide the "show sidebar" icon.
        show: false, // Show or hide the sidebar. sidebar.enabled must be "true" and custom application must have this enabled to show.
      },
    },
  }

  // Specify the page on the sidebar entries that you want to embed.
  config.currentPage = {
    key: 'defaultGroups', // Can be ['all', 'myContent', 'favorites', 'recents', 'insights', 'subscriptions', 'defaultGroups', 'myGroups'].
    // The targetGroup property is needed only when the key is 'defaultGroups' or 'myGroups'. Either id or name is required in this case.
    targetGroup: {
      id: 'B5AEDC730A4D67F01AEAA19E87BB27E5',
      name: 'Solutions',
    },
  }
  /* Library Page Layout End */

  // INSERT PROPERTIES ABOVE HERE

  // Embed the dossier with the configuration settings
  try {
    if (window.microstrategy) {
      await window.microstrategy.embeddingContexts.embedLibraryPage(config)
    }
    // await window.microstrategy.embeddingContexts.embedLibraryPage(config)
  } catch (error) {
    console.log(error)
  }

  // INSERT METHODS BELOW HERE

  // INSERT METHODS ABOVE HERE
}
