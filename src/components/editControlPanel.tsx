import { ColorPicker } from './colorPicker'
import { LandingPageContext } from '../context/landingPage'
import { Box, Drawer, IconButton, Stack, TextField, Tooltip } from '@mui/material'
import React, { useContext, useState } from 'react'
import {
  CaretDoubleDown,
  Eye,
  EyeSlash,
  PencilSimple,
  ImageSquare,
  Trash,
  CheckCircle,
} from '@phosphor-icons/react'

const VisibilityControl: React.FC = () => {
  const {
    editable,
    hideButtons: [hideButtons, setHideButtons],
  } = useContext(LandingPageContext)

  if (!editable) return <></>

  return (
    <Tooltip title={`${hideButtons ? 'show' : 'hide'} extra buttons`}>
      <IconButton
        id="spenpo-landing-visibilityControl"
        sx={{ position: 'absolute', right: 0 }}
        onClick={() => setHideButtons(!hideButtons)}
      >
        {hideButtons ? <Eye /> : <EyeSlash />}
      </IconButton>
    </Tooltip>
  )
}

const EditControl: React.FC = () => {
  const { editable } = useContext(LandingPageContext)

  if (!editable) return <></>

  return (
    <Tooltip title={editable?.[0] ? 'preview' : 'edit'}>
      <IconButton
        id="spenpo-landing-editControl"
        sx={{
          position: 'absolute',
          right: 40,
          ml: { xs: 'auto' },
        }}
        onClick={() => {
          if (editable) editable[1]((prev) => !prev)
        }}
      >
        {editable?.[0] ? <CheckCircle /> : <PencilSimple />}
      </IconButton>
    </Tooltip>
  )
}

const ContentControl: React.FC = () => {
  const {
    cms,
    editable,
    BACKGROUND_COLOR,
    ACCENT_COLOR,
    SECONDARY_ACCENT_COLOR,
    hideNewBackground: [hideNewBackground, setHideNewBackground],
    newBackground: [newBackground, setNewBackground],
  } = useContext(LandingPageContext)
  if (!cms || !editable) return <></>
  return (
    <Stack
      direction={{ xl: 'row', lg: 'row', md: 'row' }}
      sx={{
        position: {
          xl: 'absolute',
          lg: 'absolute',
          md: 'absolute',
          sm: 'absolute',
          xs: 'block',
        },
        display: editable[0] ? 'flex' : 'none',
      }}
      mt={1}
      ml={1}
      mb={{ xs: 1 }}
      rowGap={2}
      alignItems={{ md: 'center', sm: 'flex-start' }}
    >
      <Stack
        direction={{ xl: 'row', lg: 'row', md: 'row', sm: 'row' }}
        columnGap={2}
        rowGap={2}
      >
        <ColorPicker
          label="Background Color"
          color={[BACKGROUND_COLOR, cms.backgroundColor.setter]}
          defaultColor="#E6E1DF"
          sx={{ mr: 'auto' }}
        />
        <ColorPicker
          label="Accent Color"
          color={[ACCENT_COLOR, cms.accentColor.setter]}
          defaultColor="#325D80"
          sx={{ mr: 'auto' }}
        />
        <ColorPicker
          label="Secondary Color"
          color={[SECONDARY_ACCENT_COLOR, cms.secondaryAccentColor.setter]}
          defaultColor="#5FA052"
          sx={{ mr: 'auto' }}
        />
      </Stack>
      <Stack direction="row" columnGap={2}>
        <Tooltip title="change background image">
          <IconButton onClick={() => setHideNewBackground(!hideNewBackground)}>
            <ImageSquare />
          </IconButton>
        </Tooltip>
        <TextField
          sx={{ display: hideNewBackground ? 'none' : 'flex' }}
          fullWidth
          size="small"
          label="Background Image Url"
          value={newBackground}
          onChange={(e) => setNewBackground(e.target.value)}
        />
        <IconButton
          sx={{ my: 'auto', display: hideNewBackground ? 'none' : 'flex' }}
          onClick={() => {
            cms.backgroundImage.setter(newBackground)
            setHideNewBackground(true)
            setNewBackground('')
          }}
        >
          {newBackground ? <CheckCircle /> : <Trash />}
        </IconButton>
      </Stack>
    </Stack>
  )
}

export const EditControlPanel: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { editable } = useContext(LandingPageContext)
  return (
    <Box position="absolute" id="spenpo-landing-editControlPanel" width="100%">
      <Box
        id="spenpo-landing-contentControl-desktop"
        display={{ xl: 'block', lg: 'block', md: 'block', sm: 'block', xs: 'none' }}
      >
        <ContentControl />
      </Box>
      <IconButton
        id="spenpo-landing-contentControl-open-btn"
        onClick={() => setOpen(true)}
        sx={{
          position: 'absolute',
          display: editable?.[0]
            ? { xl: 'none', lg: 'none', md: 'none', sm: 'none' }
            : 'none',
        }}
      >
        <CaretDoubleDown />
      </IconButton>
      <Drawer
        id="spenpo-landing-contentControl-mobile"
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
      >
        <ContentControl />
      </Drawer>
      <VisibilityControl />
      <EditControl />
    </Box>
  )
}
