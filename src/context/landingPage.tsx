import { CmsGetSet, LandingCms, LandingProps } from '../components/SpenpoLanding'
import { DEFAULT_PROPS } from '../constants'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react'

export type LandingPageContextProps = {
  hideButtons: [boolean, Dispatch<SetStateAction<boolean>>]
  newSocial: [string, Dispatch<SetStateAction<string>>]
  hideNewSocial: [boolean, Dispatch<SetStateAction<boolean>>]
  newBackground: [string, Dispatch<SetStateAction<string>>]
  hideNewBackground: [boolean, Dispatch<SetStateAction<boolean>>]
  ACCENT_COLOR: string
  SECONDARY_ACCENT_COLOR: string
  ACTION_STATEMENT?: string
  ACTION_DESTINATION?: string
  BACKGROUND_IMAGE: string
  BACKGROUND_COLOR: string
  HEADSHOT_SRC?: string
  HEADSHOT_FILE?: File
  TITLE?: string
  NAME?: string
  SUBTITLE?: string
  SOCIAL_URLS?: string[]
  TopComponents?: ReactNode
  cms?: LandingCms
  editable: LandingProps['editable']
}

export const LandingPageContext = createContext({} as LandingPageContextProps)

export const LandingPageContextProvider: React.FC<{
  children: ReactNode
  landingProps: LandingProps
}> = ({
  children,
  landingProps: {
    accentColor,
    secondaryAccentColor,
    actionStatement,
    actionDestination,
    backgroundImage,
    backgroundColor,
    headshotSrc,
    title,
    name,
    subtitle,
    socialUrls,
    topComponents,
    editable,
    cms,
    cache,
    cacheCallback,
  },
}) => {
  const hideButtons = useState(false)
  const newSocial = useState('')
  const hideNewSocial = useState(true)
  const newBackground = useState('')
  const hideNewBackground = useState(true)

  const cachedJSON = (key: 'SOCIAL_URLS') => {
    if (!!cache?.[key]) {
      try {
        const attempt = JSON.parse(String(cache[key]))
        return attempt
      } catch (err) {
        console.log(err)
        return undefined
      }
    }
  }

  const returnString = (
    getSet: CmsGetSet | undefined,
    second: string | undefined,
    third: string | undefined
  ) => {
    const first = getSet?.getter()
    if (first || first === '') return first
    else if (second || second === '') {
      getSet?.setter(second)
      return second
    } else return third
  }

  const ACCENT_COLOR =
    returnString(cms?.accentColor, cache?.ACCENT_COLOR, accentColor) ||
    DEFAULT_PROPS.ACCENT_COLOR

  const SECONDARY_ACCENT_COLOR =
    returnString(
      cms?.secondaryAccentColor,
      cache?.SECONDARY_ACCENT_COLOR,
      secondaryAccentColor
    ) || DEFAULT_PROPS.SECONDARY_ACCENT_COLOR

  const ACTION_STATEMENT = returnString(
    cms?.actionStatement,
    cache?.ACTION_STATEMENT,
    actionStatement
  )

  const ACTION_DESTINATION = returnString(
    cms?.actionDestination,
    cache?.ACTION_DESTINATION,
    actionDestination
  )

  const BACKGROUND_IMAGE =
    returnString(cms?.backgroundImage, cache?.BACKGROUND_IMAGE, backgroundImage) ||
    DEFAULT_PROPS.BACKGROUND_IMAGE

  const BACKGROUND_COLOR =
    returnString(cms?.backgroundColor, cache?.BACKGROUND_COLOR, backgroundColor) ||
    DEFAULT_PROPS.BACKGROUND_COLOR

  const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })
    return blob
  }

  const HEADSHOT_SRC = (() => {
    const first = cms?.headshotSrc.getter()
    const second = cache?.HEADSHOT_FILE
    if (first) return first
    else if (second) {
      const blob = b64toBlob(second)
      const url = URL.createObjectURL(blob)
      cms?.headshotSrc.setter(url)
      return url
    } else return headshotSrc
  })()

  const TITLE = returnString(cms?.title, cache?.TITLE, title)

  const NAME = returnString(cms?.name, cache?.NAME, name)

  const SUBTITLE = returnString(cms?.subtitle, cache?.SUBTITLE, subtitle)

  const SOCIAL_URLS = (() => {
    const first = cms?.socialUrls.getter()
    const second = cachedJSON('SOCIAL_URLS')
    if (first) return first
    else if (second) {
      cms?.socialUrls.setter(second)
      return second
    } else return socialUrls
  })()

  const TopComponents = useMemo(() => {
    if (!hideButtons[0]) return topComponents
  }, [hideButtons])

  const contextValue: LandingPageContextProps = useMemo(() => {
    const cachable = {
      ACCENT_COLOR,
      SECONDARY_ACCENT_COLOR,
      ACTION_STATEMENT,
      ACTION_DESTINATION,
      BACKGROUND_IMAGE,
      BACKGROUND_COLOR,
      HEADSHOT_SRC,
      TITLE,
      NAME,
      SUBTITLE,
      headshotFile: cms?.headshotFile.getter(),
    }

    const cache = {
      ...cachable,
      SOCIAL_URLS: JSON.stringify(SOCIAL_URLS),
      hideButtons: JSON.stringify(hideButtons[0]),
      newSocial: newSocial[0],
      hideNewSocial: JSON.stringify(hideNewSocial[0]),
      newBackground: newBackground[0],
      hideNewBackground: JSON.stringify(hideNewBackground[0]),
    }

    if (cacheCallback) {
      ;(async () => await cacheCallback(cache))()
    }

    return {
      ...cachable,
      SOCIAL_URLS,
      hideButtons,
      newSocial,
      hideNewSocial,
      newBackground,
      hideNewBackground,
      TopComponents,
      cms,
      editable,
    }
  }, [
    hideButtons,
    newSocial,
    hideNewSocial,
    newBackground,
    hideNewBackground,
    ACCENT_COLOR,
    SECONDARY_ACCENT_COLOR,
    ACTION_STATEMENT,
    ACTION_DESTINATION,
    BACKGROUND_IMAGE,
    BACKGROUND_COLOR,
    HEADSHOT_SRC,
    TITLE,
    NAME,
    SUBTITLE,
    SOCIAL_URLS,
    TopComponents,
    cms,
    editable,
  ])

  return (
    <LandingPageContext.Provider value={contextValue}>
      {children}
    </LandingPageContext.Provider>
  )
}
