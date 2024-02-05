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

// const DEFAULT_PROPS: LandingProps = {
//   name: 'your name',
//   title: 'your title',
//   subtitle: 'something interesting about you',
//   socialUrls: [
//     'https://twitter.com',
//     'https://www.instagram.com',
//     'https://www.facebook.com',
//     'https://www.youtube.com',
//     'mailto:e@mail.com',
//     'https://whatsapp.com',
//   ],
//   actionStatement: 'your action statement',
//   actionDestination: 'https://www.spenpo.com',
//   headshotSrc: 'https://spenpo-landing.vercel.app/default.svg',
// }

// const Demo: React.FC = () => {
//   const editable = useState(false)
//   const [title, setTitle] = useState<string>()
//   const [name, setName] = useState<string>()
//   const [subtitle, setSubtitle] = useState<string>()
//   const [actionStatement, setActionStatement] = useState<string>()
//   const [actionDestination, setActionDestination] = useState<string>()
//   const [accentColor, setAccentColor] = useState<string>()
//   const [secondaryAccentColor, setSecondaryAccentColor] = useState<string>()
//   const [backgroundColor, setBackgroundColor] = useState<string>()
//   const [backgroundImage, setBackgroundImage] = useState<string>()
//   const [headshotSrc, setHeadshotSrc] = useState<string>()
//   const [socialUrls, setSocialUrls] = useState<string[]>()
//   const [headshotFile, setHeadshotFile] = useState<File>()

//   const cms: LandingCms = {
//     title: {
//       getter: () => title,
//       setter: (prop) => setTitle(prop),
//     },
//     name: {
//       getter: () => name,
//       setter: (prop) => setName(prop),
//     },
//     subtitle: {
//       getter: () => subtitle,
//       setter: (prop) => setSubtitle(prop),
//     },
//     actionStatement: {
//       getter: () => actionStatement,
//       setter: (prop) => setActionStatement(prop),
//     },
//     actionDestination: {
//       getter: () => actionDestination,
//       setter: (prop) => setActionDestination(prop),
//     },
//     accentColor: {
//       getter: () => accentColor,
//       setter: (prop) => setAccentColor(prop),
//     },
//     secondaryAccentColor: {
//       getter: () => secondaryAccentColor,
//       setter: (prop) => setSecondaryAccentColor(prop),
//     },
//     backgroundColor: {
//       getter: () => backgroundColor,
//       setter: (prop) => setBackgroundColor(prop),
//     },
//     backgroundImage: {
//       getter: () => backgroundImage,
//       setter: (prop) => setBackgroundImage(prop),
//     },
//     headshotSrc: {
//       getter: () => headshotSrc,
//       setter: (prop) => setHeadshotSrc(prop),
//     },
//     socialUrls: {
//       getter: () => socialUrls,
//       setter: (prop) => setSocialUrls(prop),
//     },
//     headshotFile: {
//       getter: () => headshotFile,
//       setter: (prop) => setHeadshotFile(prop),
//     },
//   }
//   return (
//     <SpenpoLanding
//       cache={{}}
//       cacheCallback={async (cache) => {
//         console.log(cache)
//       }}
//       cms={cms}
//       editable={editable}
//       {...DEFAULT_PROPS}
//     />
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('spenpo-landing')!)
// root.render(
//   <React.StrictMode>
//     <Demo />
//   </React.StrictMode>
// )
