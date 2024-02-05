import { Divider, IconButton, Stack, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import { LandingPageContext } from '../context/landingPage'
import { ActionBtn } from './actionBtn'
import { EditableText } from './editableText'
import { Socials } from './socials'
import { PlusCircle } from '@phosphor-icons/react'

export const Info: React.FC = () => {
  const { ACCENT_COLOR, cms, NAME, SUBTITLE, TITLE, ACTION_STATEMENT, editable } =
    useContext(LandingPageContext)

  return (
    <Stack
      justifyContent="space-evenly"
      textAlign="center"
      alignSelf="stretch"
      rowGap={{ sm: 3, xs: 3 }}
    >
      <EditableText
        getSet={cms?.title}
        sx={{
          textTransform: 'uppercase',
          color: ACCENT_COLOR,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.3rem',
          fontSize: '0.875em',
          lineHeight: '40px',
          fontWeight: 300,
        }}
        label="Title"
        text={TITLE}
      />
      {TITLE && (
        <Divider sx={{ width: 50, borderBottomWidth: 'medium', mx: 'auto' }} />
      )}
      <EditableText
        getSet={cms?.name}
        sx={{
          color: 'rgba(0,0,0,0.702)',
          fontFamily: "'Fraunces', serif",
          letterSpacing: '-0.025rem',
          fontSize: '3em',
          lineHeight: '72px',
          fontWeight: 700,
        }}
        label="Name"
        text={NAME}
        editHeight={72}
      />
      <EditableText
        getSet={cms?.subtitle}
        sx={{
          color: 'rgba(0,0,0,0.49)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '1em',
          lineHeight: '32px',
          fontWeight: 300,
        }}
        label="Subtitle"
        text={SUBTITLE}
      />
      {ACTION_STATEMENT && <ActionBtn />}
      {!ACTION_STATEMENT && editable?.[0] && (
        <Tooltip title="add action button">
          <IconButton
            onClick={() => cms?.actionStatement.setter('your action statement')}
            sx={{ mx: 'auto', my: 1 }}
          >
            <PlusCircle />
          </IconButton>
        </Tooltip>
      )}
      <Socials />
    </Stack>
  )
}
