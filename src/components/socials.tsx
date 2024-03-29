import { IconButton, Stack, TextField } from '@mui/material'
import React, { Fragment, useContext, useState } from 'react'
import { LandingPageContext } from '../context/landingPage'
import { SOCIAL_ICON_SX } from '../functions'
import { SocialBtn } from './socialBtn'
import { PlusCircle, Trash, CheckCircle, PencilSimple } from '@phosphor-icons/react'
import TouchRipple, {
  TouchRippleActions,
} from '@mui/material/ButtonBase/TouchRipple'

export const Socials: React.FC = () => {
  const {
    SOCIAL_URLS,
    ACCENT_COLOR,
    SECONDARY_ACCENT_COLOR,
    editable,
    cms,
    newSocial: [newSocial, setNewSocial],
    hideNewSocial: [hideNewSocial, setHideNewSocial],
  } = useContext(LandingPageContext)
  const rippleRef = React.useRef<TouchRippleActions | null>(null)
  const [rippleEnabled, setRippleEnabled] = useState(false)

  return (
    <>
      <Stack
        useFlexGap
        flexWrap="wrap"
        flexDirection="row"
        sx={SOCIAL_ICON_SX(ACCENT_COLOR)}
        justifyContent="center"
        alignItems="center"
        columnGap={1}
        rowGap={1}
      >
        {SOCIAL_URLS?.map((url) => {
          const icon = <SocialBtn url={url} color={SECONDARY_ACCENT_COLOR} />
          if (cms && editable && editable[0]) {
            const remove = () =>
              cms.socialUrls.setter(SOCIAL_URLS.filter((social) => social !== url))
            return (
              <Stack>
                <IconButton
                  sx={{ mx: 'auto' }}
                  onClick={() => {
                    remove()
                    setNewSocial(url)
                    setHideNewSocial(false)
                  }}
                >
                  <PencilSimple />
                </IconButton>
                {icon}
                <IconButton sx={{ mx: 'auto' }} onClick={remove}>
                  <Trash />
                </IconButton>
              </Stack>
            )
          }
          return <Fragment key={url}>{icon}</Fragment>
        })}
        {newSocial && <SocialBtn url={newSocial} color={SECONDARY_ACCENT_COLOR} />}
        {cms && editable && editable[0] && (
          <IconButton onClick={() => setHideNewSocial(false)}>
            <PlusCircle />
          </IconButton>
        )}
      </Stack>
      {editable?.[0] && !hideNewSocial && (
        <Stack direction="row" columnGap={1}>
          <TextField
            label="New Social Link"
            placeholder="URL"
            value={newSocial}
            onChange={(e) => {
              if (e.target.value) {
                if (!rippleEnabled) {
                  rippleRef.current?.start(e, { center: true, pulsate: true })
                  setRippleEnabled(true)
                }
              } else {
                rippleRef.current?.stop()
                setRippleEnabled(false)
              }
              setNewSocial(e.target.value)
            }}
            fullWidth
            size="small"
          />
          <IconButton
            sx={{ my: 'auto' }}
            onClick={() => {
              if (newSocial) {
                const newUrls = SOCIAL_URLS ? SOCIAL_URLS : []
                cms?.socialUrls.setter([...newUrls, newSocial])
                setNewSocial('')
              }
              setHideNewSocial(true)
            }}
          >
            {newSocial ? <CheckCircle /> : <Trash />}
            <TouchRipple ref={rippleRef} />
          </IconButton>
        </Stack>
      )}
    </>
  )
}
