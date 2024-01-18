## A mobile-responsive hero landing page React component

- [component demo](https://www.spenpo.com/projects/spenpo-landing)
- [full stack implementation](https://github.com/spenpo-landing/landing-template)
- [full stack demo](https://landing-template-five.vercel.app/) (auth is not enabled. CMS is not accessible)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fspenpo-landing%2Flanding-template&env=AWS_SECRET_ACCESS_KEY,AWS_ACCESS_KEY_ID,AWS_LANDING_S3,VERCEL_TEAM,VERCEL_TOKEN,GH_TOKEN,NEXT_AUTH_USERNAME,NEXT_AUTH_PASSWORD,NEXT_PUBLIC_PROJECT_NAME,NEXT_PUBLIC_NAME&envDescription=Content%20and%20API%20Keys&envLink=https%3A%2F%2Fgithub.com%2Fspenpo-landing%2Flanding-template&redirect-url=https%3A%2F%2Fspenpo.com%2Fprojects%2Fspenpo-landing&demo-title=Spenpo%20Landing&demo-description=A%20full%20stack%20implementation%20of%20the%20spenpo-landing%20React%20component&demo-url=https%3A%2F%2Flanding-template-five.vercel.app%2F&demo-image=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F618-6183618_transparent-unknown-person-png-transparent-background-female-user.png)

### static implementation (renders landing page only):

```javascript
import { SpenpoLanding } from 'spenpo-landing'

const App = () => (
  <SpenpoLanding
    title="engineer"
    name="spenpo"
    subtitle="building!"
    socialUrls={[
      'https://twitter.com/your_twitter',
      'https://github.com/your_github',
    ]}
    headshotSrc="/images/headshot.jpeg"
    actionDestination="https://..."
    actionStatement="click here!"
  />
)
```

### dynamic editable implementation (allows user to toggle edit mode on and change the page content with the CMS):

```javascript
import React, { useState } from 'react'
import { SpenpoLanding, SpenpoLandingCms } from 'spenpo-landing'

const App: React.FC = () => {
  const editable = useState(false)
  const [title, setTitle] = useState<string>()
  const [name, setName] = useState<string>()
  const [subtitle, setSubtitle] = useState<string>()
  const [actionStatement, setActionStatement] = useState<string>()
  const [actionDestination, setActionDestination] = useState<string>()
  const [accentColor, setAccentColor] = useState<string>()
  const [secondaryAccentColor, setSecondaryAccentColor] = useState<string>()
  const [backgroundColor, setBackgroundColor] = useState<string>()
  const [backgroundImage, setBackgroundImage] = useState<string>()
  const [headshotSrc, setHeadshotSrc] = useState<string>()
  const [socialUrls, setSocialUrls] = useState<string[]>()
  const [headshotFile, setHeadshotFile] = useState<File>()

  const cms: SpenpoLandingCms = {
    title: {
      getter: () => title,
      setter: (prop) => setTitle(prop),
    },
    name: {
      getter: () => name,
      setter: (prop) => setName(prop),
    },
    subtitle: {
      getter: () => subtitle,
      setter: (prop) => setSubtitle(prop),
    },
    actionStatement: {
      getter: () => actionStatement,
      setter: (prop) => setActionStatement(prop),
    },
    actionDestination: {
      getter: () => actionDestination,
      setter: (prop) => setActionDestination(prop),
    },
    accentColor: {
      getter: () => accentColor,
      setter: (prop) => setAccentColor(prop),
    },
    secondaryAccentColor: {
      getter: () => secondaryAccentColor,
      setter: (prop) => setSecondaryAccentColor(prop),
    },
    backgroundColor: {
      getter: () => backgroundColor,
      setter: (prop) => setBackgroundColor(prop),
    },
    backgroundImage: {
      getter: () => backgroundImage,
      setter: (prop) => setBackgroundImage(prop),
    },
    headshotSrc: {
      getter: () => headshotSrc,
      setter: (prop) => setHeadshotSrc(prop),
    },
    socialUrls: {
      getter: () => socialUrls,
      setter: (prop) => setSocialUrls(prop),
    },
    headshotFile: {
      getter: () => headshotFile,
      setter: (prop) => setHeadshotFile(prop),
    },
  }

    return (
        <SpenpoLanding
            editable={editable}
            cms={cms}
        />
    )
}
```

### cached data fed in through props takes priority. data can be persisted outside of the component with the `cacheCallback` prop:

```javascript
import React, { useState, useContext } from 'react'
import { SpenpoLanding, SpenpoLandingCms } from 'spenpo-landing'
import redis from '../../../utils/redis'
import { GetServerSidePropsContext } from 'next'

const App: React.FC<{ cache: SpenpoLandingCache }> = ({ cache }) => {
  const { landingCms } = useContext(ShoppingCartContext)
  const editable = useState(true)

  return (
    <SpenpoLanding
      cms={landingCms}
      cacheCallback={async (callbackCache) => {
        await fetch('/api/cache/landing', {
          body: JSON.stringify({ cache: callbackCache }),
          method: 'post',
        })
      }}
      editable={editable}
      cache={cache}
    />
  )
}

export default App

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const cache = await redis.hgetall(String(query.cache))
  return { props: { cache } }
}
```

### props:

| prop                 | type                                                        | description                                                                                           |
| -------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| title                | string \| undefined                                         | title that appears at the top of the landing page                                                     |
| name                 | string \| undefined                                         | name that appears below title                                                                         |
| subtitle             | string \| undefined                                         | subtitle that appears below name                                                                      |
| actionStatement      | string \| undefined                                         | call to action that appears on the button below the subtitle. if not included, button will not appear |
| actionDestination    | string \| undefined                                         | relative or absolute url to be brought up in a new tab when call to action is clicked                 |
| socialUrls           | string[] \| undefined                                       | json array of urls to social media profiles displayed at the bottom of the landing page               |
| backgroundColor      | string \| undefined                                         | hex value of the background color of the landing                                                      |
| backgroundImage      | string \| undefined                                         | absolute url of the background image of the landing                                                   |
| accentColor          | string \| undefined                                         | hex value of the main color of the landing page. accents the call to action and social media buttons  |
| secondaryAccentColor | string \| undefined                                         | hex value of the secondary color on hover effect of call to action and social media buttons           |
| headshotSrc          | string \| undefined                                         | relative or absolute url of the image displayed on the landing page                                   |
| topComponents        | ReactNode \| undefined                                      | add custom functinoality at the top of the landing page                                               |
| editable             | [boolean, Dispatch<SetStateAction<boolean>>] \| undefined   | useState pair for toggling edit mode                                                                  |
| cms                  | SpenpoLandingCms \| undefined                               | object of getters and setters for all landing page content                                            |
| cache                | SpenpoLandingCache \| undefined                             | cached prop values. prioritized over direct props and CMS defaults                                    |
| cacheCallback        | ((cache: SpenpoLandingCache) => Promise<void>) \| undefined | async function run with each update of the CMS                                                        |
