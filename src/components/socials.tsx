import { Box, IconButton, Stack, TextField, Tooltip } from '@mui/material'
import React, { Fragment, useContext } from 'react'
import { ICON_BTN_TOOLTIP_PROPS } from '../constants'
import { LandingPageContext } from '../context/landingPage'
import { SOCIAL_ICON_SX } from '../functions'
import { SocialBtn } from './socialBtn'
import { PlusCircle, Trash, CheckCircle } from '@phosphor-icons/react'

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
          if (cms && editable && editable[0])
            return (
              <Tooltip key={url} title={url} placement="top">
                <Box>
                  <Tooltip
                    componentsProps={ICON_BTN_TOOLTIP_PROPS}
                    title={
                      <IconButton
                        sx={{ mt: -1.5 }}
                        onClick={() => {
                          cms.socialUrls.setter(
                            SOCIAL_URLS.filter((social) => social !== url)
                          )
                        }}
                      >
                        <Trash />
                      </IconButton>
                    }
                  >
                    {icon}
                  </Tooltip>
                </Box>
              </Tooltip>
            )
          return <Fragment key={url}>{icon}</Fragment>
        })}
        {newSocial && <SocialBtn url={newSocial} color={SECONDARY_ACCENT_COLOR} />}
        {cms && editable && editable[0] && (
          <IconButton onClick={() => setHideNewSocial(false)}>
            <PlusCircle />
          </IconButton>
        )}
      </Stack>
      {!hideNewSocial && (
        <Stack direction="row" columnGap={1}>
          <TextField
            label="New Social Link"
            placeholder="URL"
            value={newSocial}
            onChange={(e) => setNewSocial(e.target.value)}
            fullWidth
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
          </IconButton>
        </Stack>
      )}
    </>
  )
}
