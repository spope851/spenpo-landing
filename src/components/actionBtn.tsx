import { Button, IconButton, Stack, TextField, Tooltip } from '@mui/material'
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { LandingPageContext } from '../context/landingPage'
import {
  PlusCircle,
  PencilSimple,
  CheckCircle,
  Info,
  CursorClick,
} from '@phosphor-icons/react'

const Btn: React.FC = forwardRef<HTMLButtonElement | null>(({ ...props }, ref) => {
  const {
    ACTION_DESTINATION,
    ACTION_STATEMENT,
    ACCENT_COLOR,
    SECONDARY_ACCENT_COLOR,
    editable,
  } = useContext(LandingPageContext)
  const onClick = useRef(() => {})

  useEffect(() => {
    onClick.current = () => {
      window.open(ACTION_DESTINATION, '_blank', 'noopener,noreferrer')
    }
  }, [])

  return (
    <Button
      {...props}
      ref={ref}
      startIcon={<CursorClick />}
      sx={{
        mx: 'auto',
        py: 2,
        backgroundColor: ACCENT_COLOR,
        ':hover': {
          transform: 'scale(1.03)',
          backgroundColor: SECONDARY_ACCENT_COLOR,
        },
      }}
      size="large"
      variant="contained"
      onClick={(e) => {
        if (!editable?.[0])
          ACTION_DESTINATION ? onClick.current() : alert('your action')
        else e.preventDefault()
      }}
    >
      {ACTION_STATEMENT}
    </Button>
  )
})

export const ActionBtn: React.FC = () => {
  const { editable, cms, ACTION_STATEMENT } = useContext(LandingPageContext)
  const [edit, setEdit] = useState(false)

  return (
    <>
      {ACTION_STATEMENT &&
        (editable?.[0] ? (
          <Stack gap={3}>
            <Stack direction="row">
              <Btn />
              <IconButton onClick={() => setEdit(!edit)} sx={{ my: 'auto' }}>
                {edit ? <CheckCircle /> : <PencilSimple />}
              </IconButton>
            </Stack>
            {edit && (
              <>
                <TextField
                  fullWidth
                  size="small"
                  label="Action Statement"
                  value={cms?.actionStatement.getter()}
                  onChange={(e) => cms?.actionStatement.setter(e.target.value)}
                  placeholder="Click Here!"
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Action Destination"
                  value={cms?.actionDestination.getter()}
                  onChange={(e) => cms?.actionDestination.setter(e.target.value)}
                  placeholder="ex. https://google.com"
                  InputProps={{
                    endAdornment: (
                      <Tooltip title="Add the URL you want to navigate to from your landing page, or leave this field blank if you'd like to integrate an alternative flow. We'll reach out about that separately.">
                        <Info size={24} fill="#555" />
                      </Tooltip>
                    ),
                  }}
                />
              </>
            )}
          </Stack>
        ) : (
          <Btn />
        ))}
      {!cms?.actionStatement.getter() && editable?.[0] && (
        <Tooltip title="add action button">
          <IconButton
            onClick={() => cms?.actionStatement.setter('your action statement')}
            sx={{ mx: 'auto', my: 1 }}
          >
            <PlusCircle />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}
