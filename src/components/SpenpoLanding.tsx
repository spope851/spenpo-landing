import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  LandingPageContextProps,
  LandingPageContextProvider,
} from '../context/landingPage'
import { Info } from './info'
import { EditControlPanel } from './editControlPanel'
import { Headshot } from './headshot'
import { LandingWrapper } from './landingWrapper'

export type CmsGetSet<T = string | undefined> = {
  getter: () => T
  setter: (prop: T) => void
}

export type LandingCms = {
  title: CmsGetSet
  name: CmsGetSet
  subtitle: CmsGetSet
  socialUrls: CmsGetSet<string[] | undefined>
  backgroundImage: CmsGetSet
  backgroundColor: CmsGetSet
  accentColor: CmsGetSet
  secondaryAccentColor: CmsGetSet
  actionDestination: CmsGetSet
  actionStatement: CmsGetSet
  headshotSrc: CmsGetSet
  headshotFile: CmsGetSet<File | undefined>
}

export interface LandingPage {
  title?: string
  name?: string
  subtitle?: string
  socialUrls?: string[]
  backgroundImage?: string
  backgroundColor?: string
  accentColor?: string
  secondaryAccentColor?: string
  headshotSrc?: string
  actionDestination?: string
  actionStatement?: string
}

export type LandingCache = Partial<Record<keyof LandingPageContextProps, string>> & {
  headshotFile?: File
}

export interface LandingProps extends LandingPage {
  topComponents?: ReactNode
  editable?: [boolean, Dispatch<SetStateAction<boolean>>]
  cms?: LandingCms
  cache?: LandingCache
  cacheCallback?: (cache: LandingCache) => Promise<void>
}

export const SpenpoLanding: React.FC<LandingProps> = (props) => {
  return (
    <LandingPageContextProvider landingProps={props}>
      <EditControlPanel />
      <LandingWrapper>
        <Headshot />
        <Info />
      </LandingWrapper>
    </LandingPageContextProvider>
  )
}
