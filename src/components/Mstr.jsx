import { useEffect, useState } from 'react'
import { runCodeLibraryDemo } from '../lib/mstr/library-demo.js'
import { runCodeLibrary } from '../lib/mstr/library.js'
import { runCodeDossier } from '../lib/mstr/dossier.js'
import { runCodeDossierNew } from '../lib/mstr/dossier-new.js'
import { runCodeLibraryNew } from '../lib/mstr/library-new.js'

// eslint-disable-next-line react/prop-types
export const Mstr = () => {
  const [demo, setDemo] = useState(false)
  const [dossier, setDossier] = useState(false)
  const [newDossier, setNewDossier] = useState(true)
  const [newLibrary, setNewLibrary] = useState(false)

  useEffect(() => {
    const run = async () => {
      if (dossier) {
        try {
          // TODO: remove!
          // eslint-disable-next-line no-console
          console.log(
            '%c call runCodeDossier ',
            'color: black; background-color: yellow',
            { demo, dossier }
          )

          if (newDossier) {
            await runCodeDossierNew()
          } else {
            await runCodeDossier()
          }
        } catch (error) {
          console.log(
            `%c runCodeDossier${newDossier ? 'New' : ''} error: `,
            'color: black; background-color: yellow',
            {
              error,
            }
          )
        }
      } else {
        try {
          if (demo) {
            // TODO: remove!
            // eslint-disable-next-line no-console
            console.log(
              '%c call runCodeLibraryDemo ',
              'color: black; background-color: yellow',
              { demo, dossier }
            )

            await runCodeLibraryDemo()
          } else {
            // TODO: remove!
            // eslint-disable-next-line no-console
            console.log(
              `%c call runCodeLibrary${newLibrary ? 'New' : ''} `,
              'color: black; background-color: yellow',
              { demo, dossier, newDossier, newLibrary }
            )

            if (newLibrary) {
              await runCodeLibraryNew()
            } else {
              await runCodeLibrary()
            }
          }
        } catch (error) {
          console.log(
            `%c runCodeLibrary${newLibrary ? 'New' : ''} error: `,
            'color: black; background-color: yellow',
            {
              error,
            }
          )
        }
      }
    }

    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo, dossier])

  return null
}
