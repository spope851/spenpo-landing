import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Radio,
  Stack,
  SvgIcon,
  TextField,
  Tooltip,
} from '@mui/material'
import React, { forwardRef, useContext, useEffect, useRef } from 'react'
// import { useRouter } from "next/router"
import { EditableText } from './editableText'
import { ICON_BTN_TOOLTIP_PROPS } from '../constants'
import { LandingPageContext } from '../context/landingPage'
import {
  PlusCircle,
  PencilSimple,
  Trash,
  CheckCircle,
  Info,
  CursorClick,
} from '@phosphor-icons/react'

const Btn: React.FC = forwardRef<HTMLButtonElement | null>(({ ...props }, ref) => {
  const {
    LINK_NEW_TAB,
    ACTION_DESTINATION,
    ACTION_STATEMENT,
    ACCENT_COLOR,
    SECONDARY_ACCENT_COLOR,
    editable,
    editActionStatement,
    confirmActionStatement,
    cms,
  } = useContext(LandingPageContext)
  // const router = useRouter()
  const onClick = useRef(() => {
    if (LINK_NEW_TAB) {
      console.log('somethings supposed to happen')
    } else if (ACTION_DESTINATION) console.log('somethings supposed to happen') //router.push(ACTION_DESTINATION)
  })

  useEffect(() => {
    onClick.current = () => {
      if (LINK_NEW_TAB) {
        window.open(ACTION_DESTINATION, '_blank', 'noopener,noreferrer')
      } else if (ACTION_DESTINATION) alert('somethings supposed to happen') //router.push(ACTION_DESTINATION)
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
      <EditableText
        editActionStatement={editActionStatement}
        confirmEvent={confirmActionStatement}
        text={ACTION_STATEMENT}
        getSet={cms?.actionStatement}
        label="Action Statement"
        hideBtn
      />
    </Button>
  )
})

export const ActionBtn: React.FC = () => {
  const {
    ACTION_STATEMENT,
    ACTION_DESTINATION,
    editable,
    cms,
    editDestination: [editDestination, setEditDestination],
    editActionStatement,
    confirmActionStatement,
    LINK_NEW_TAB,
  } = useContext(LandingPageContext)

  return (
    <>
      {ACTION_STATEMENT &&
        (editable?.[0] ? (
          <Stack rowGap={1}>
            <Tooltip
              componentsProps={ICON_BTN_TOOLTIP_PROPS}
              title={
                <IconButton onClick={() => setEditDestination(!editDestination)}>
                  <PencilSimple />
                </IconButton>
              }
              placement="left"
              sx={{ mx: 'auto' }}
            >
              <Box>
                <Tooltip
                  componentsProps={ICON_BTN_TOOLTIP_PROPS}
                  title={
                    <IconButton
                      onClick={() => {
                        if (editActionStatement[0]) confirmActionStatement[1](true)
                        else cms?.actionStatement.setter(undefined)
                      }}
                    >
                      {editActionStatement[0] ? <CheckCircle /> : <Trash />}
                    </IconButton>
                  }
                  placement="right"
                >
                  <Btn />
                </Tooltip>
              </Box>
            </Tooltip>
            <Stack
              direction="row"
              columnGap={2}
              display={editDestination ? 'flex' : 'none'}
              mt={2}
              alignItems="center"
            >
              <TextField
                fullWidth
                size="small"
                label="Action Destination"
                value={ACTION_DESTINATION || ''}
                onChange={(e) => cms?.actionDestination.setter(e.target.value)}
                placeholder="ex. https://google.com"
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Add the URL you want to navigate to from your landing page, or leave this field blank if you'd like to integrate an alternative flow. We'll reach out about that separately.">
                      <SvgIcon sx={{ fill: '#555' }}>
                        <Info />
                      </SvgIcon>
                    </Tooltip>
                  ),
                }}
              />
              <Stack
                alignItems="flex-start"
                sx={{
                  '& .MuiFormLabel-root, .MuiFormControlLabel-label': {
                    fontSize: 12,
                    whiteSpace: 'nowrap',
                  },
                }}
              >
                <FormLabel>Link to:</FormLabel>
                <Stack direction="row" alignItems="center">
                  <FormLabel>New tab</FormLabel>
                  <Radio
                    checked={!!LINK_NEW_TAB}
                    onClick={() => cms?.linkNewTab.setter(true)}
                    size="small"
                    color="default"
                  />
                  <FormLabel>Same tab</FormLabel>
                  <Radio
                    checked={!LINK_NEW_TAB}
                    onClick={() => {
                      cms?.linkNewTab.setter(false)
                    }}
                    size="small"
                    color="default"
                  />
                </Stack>
              </Stack>
              <IconButton
                sx={{ my: 'auto' }}
                onClick={() => {
                  setEditDestination(false)
                }}
              >
                {ACTION_DESTINATION ? <CheckCircle /> : <Trash />}
              </IconButton>
            </Stack>
          </Stack>
        ) : (
          <Btn />
        ))}
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
    </>
  )
}
