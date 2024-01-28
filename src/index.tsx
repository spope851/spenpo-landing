import { SpenpoLanding } from './components/SpenpoLanding'
import type {
  LandingCache,
  LandingCms,
  LandingProps,
  LandingPage,
  CmsGetSet,
} from './components/SpenpoLanding'

export { SpenpoLanding }

export type {
  LandingCache as SpenpoLandingCache,
  LandingCms as SpenpoLandingCms,
  LandingProps as SpenpoLandingProps,
  LandingPage as SpenpoLandingPageProps,
  CmsGetSet as SpenpoLandingCmsGetSet,
}

// add a /public/index.html to test locally
// import React, { useState } from 'react'
// import ReactDOM from 'react-dom/client'
// import { DEFAULT_PROPS } from './constants'

// const Demo: React.FC = () => {
//   const editable = useState(false)
//   return (
//     <SpenpoLanding
//       cache={{}}
//       cacheCallback={async (cache) => {
//         console.log(cache)
//       }}
//       cms={
//         {
//           title: {
//             setter: (_prop?: string) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.TITLE,
//           },
//           name: {
//             setter: (_prop?: string) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.NAME,
//           },
//           subtitle: {
//             setter: (_prop?: string) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.SUBTITLE,
//           },
//           socialUrls: {
//             setter: (_prop?: string[]) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.SOCIAL_URLS,
//           },
//           backgroundImage: {
//             setter: (_prop?: string) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.BACKGROUND_IMAGE,
//           },
//           backgroundColor: {
//             setter: (_prop?: string) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.BACKGROUND_COLOR,
//           },
//           accentColor: {
//             setter: (_prop?: string) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.ACCENT_COLOR,
//           },
//           secondaryAccentColor: {
//             setter: (_prop?: string) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.SECONDARY_ACCENT_COLOR,
//           },
//           actionStatement: {
//             setter: (_prop?: string) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.ACTION_STATEMENT,
//           },
//           actionDestination: {
//             setter: (_prop?: string) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.ACTION_DESTINATION,
//           },
//           headshotSrc: {
//             setter: (_prop?: string) => {
//               console.log(_prop)
//             },
//             getter: () => DEFAULT_PROPS.HEADSHOT_FILENAME,
//           },
//         } as LandingCms
//       }
//       editable={editable}
//     />
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('spenpo-landing')!)
// root.render(
//   <React.StrictMode>
//     <Demo />
//   </React.StrictMode>
// )
