import { Button, IconButton, Stack, TextField, Tooltip } from '@mui/material'
import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { LandingPageContext } from '../context/landingPage'
import {
  PencilSimple,
  CheckCircle,
  Info,
  CursorClick,
  Trash,
} from '@phosphor-icons/react'
import TouchRipple, {
  TouchRippleActions,
} from '@mui/material/ButtonBase/TouchRipple'

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
  }, [ACTION_DESTINATION])

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
  const { editable, cms, ACTION_STATEMENT, ACTION_DESTINATION } =
    useContext(LandingPageContext)
  const [edit, setEdit] = useState(false)
  const [actionStatement, setActionStatement] = useState(ACTION_STATEMENT)
  const [actionDestination, setActionDestination] = useState(ACTION_DESTINATION)
  const rippleRef = React.useRef<TouchRippleActions | null>(null)
  const [rippleEnabled, setRippleEnabled] = useState(false)

  const Toggle = useMemo(() => {
    if (edit) {
      if (actionStatement)
        return (
          <>
            <CheckCircle />
            <TouchRipple ref={rippleRef} />
          </>
        )
      else return <Trash />
    } else return <PencilSimple />
  }, [edit, actionStatement])

  if (editable?.[0])
    return (
      <Stack gap={3}>
        <Stack direction="row" gap={1}>
          <Btn />
          <IconButton
            onClick={() => {
              if (edit) {
                cms?.actionStatement.setter(actionStatement)
                cms?.actionDestination.setter(actionDestination)
                setEdit(false)
              } else setEdit(true)
            }}
            sx={{ my: 'auto' }}
          >
            {Toggle}
          </IconButton>
        </Stack>
        {edit && (
          <>
            <TextField
              fullWidth
              size="small"
              label="Action Statement"
              value={actionStatement}
              onChange={(e) => setActionStatement(e.target.value)}
              placeholder="Click Here!"
            />
            <TextField
              fullWidth
              size="small"
              label="Action Destination"
              value={actionDestination}
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
                setActionDestination(e.target.value)
              }}
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
    )

  return <Btn />
}
