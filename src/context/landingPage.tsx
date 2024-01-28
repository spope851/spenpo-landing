import { LandingCms, LandingProps } from '../components/SpenpoLanding'
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

  const cacheOrDefault = (key: 'SOCIAL_URLS') => {
    if (!!cache?.[key]) {
      try {
        return JSON.parse(String(cache[key]))
      } catch (err) {
        console.log(err)
      }
    }
    return DEFAULT_PROPS[key]
  }

  const ACCENT_COLOR =
    cms?.accentColor.getter() ||
    accentColor ||
    cache?.ACCENT_COLOR ||
    DEFAULT_PROPS.ACCENT_COLOR
  const SECONDARY_ACCENT_COLOR =
    cms?.secondaryAccentColor.getter() ||
    secondaryAccentColor ||
    cache?.SECONDARY_ACCENT_COLOR ||
    DEFAULT_PROPS.SECONDARY_ACCENT_COLOR
  const ACTION_STATEMENT =
    cms?.actionStatement.getter() ||
    actionStatement ||
    cache?.ACTION_STATEMENT ||
    DEFAULT_PROPS.ACTION_STATEMENT
  const ACTION_DESTINATION =
    cms?.actionDestination.getter() || actionDestination || cache?.ACTION_DESTINATION
  const BACKGROUND_IMAGE =
    cms?.backgroundImage.getter() ||
    backgroundImage ||
    cache?.BACKGROUND_IMAGE ||
    DEFAULT_PROPS.BACKGROUND_IMAGE
  const BACKGROUND_COLOR =
    cms?.backgroundColor.getter() ||
    backgroundColor ||
    cache?.BACKGROUND_COLOR ||
    DEFAULT_PROPS.BACKGROUND_COLOR
  const HEADSHOT_SRC =
    cms?.headshotSrc.getter() ||
    headshotSrc ||
    cache?.HEADSHOT_SRC ||
    DEFAULT_PROPS.HEADSHOT_SRC
  const TITLE = cms?.title.getter() || title || cache?.TITLE || DEFAULT_PROPS.TITLE
  const NAME = cms?.name.getter() || name || cache?.NAME || DEFAULT_PROPS.NAME
  const SUBTITLE =
    cms?.subtitle.getter() || subtitle || cache?.SUBTITLE || DEFAULT_PROPS.SUBTITLE
  const SOCIAL_URLS =
    cms?.socialUrls.getter() || socialUrls || cacheOrDefault('SOCIAL_URLS')
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
