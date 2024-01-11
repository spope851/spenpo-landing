import { Stack, IconButton, SxProps, TextField, Typography } from '@mui/material'
import React, { useCallback, useContext, useState } from 'react'
import { Trash, CheckCircle, PencilSimple } from '@phosphor-icons/react'
import { CmsGetSet } from './SpenpoLanding'
import { LandingPageContext } from '../context/landingPage'

export const EditableText: React.FC<{
  hideBtn?: boolean
  getSet?: CmsGetSet | CmsGetSet<string | undefined>
  label: string
  text?: string
  sx?: SxProps & { lineHeight: string }
  editHeight?: number
}> = ({ label, getSet, sx, text, hideBtn, editHeight }) => {
  const { SECONDARY_ACCENT_COLOR, editable } = useContext(LandingPageContext)
  const [edit, setEdit] = useState(false)
  const [editableText, setEditableText] = useState<string | undefined>(text)

  const confirm = useCallback(() => {
    if (editableText) getSet?.setter(editableText)
    else setEditableText(text)
    setEdit(false)
  }, [editableText])

  return edit ? (
    <Stack direction="row" columnGap={1} height={editHeight} alignItems="center">
      <TextField
        size="small"
        fullWidth
        label={label}
        value={editableText}
        onChange={(e) => setEditableText(e.target.value)}
      />
      {!hideBtn && (
        <IconButton sx={{ my: 'auto' }} onClick={confirm}>
          {editableText ? <CheckCircle /> : <Trash />}
        </IconButton>
      )}
    </Stack>
  ) : (
    <Stack direction="row" columnGap={1}>
      <Typography
        sx={{
          ':hover':
            editable && editable[0]
              ? {
                  outline: `dashed ${SECONDARY_ACCENT_COLOR} 2px`,
                  borderRadius: 2,
                  cursor: 'pointer',
                }
              : {},
          mx: 'auto',
          px: 1,
          ...sx,
        }}
        onClick={() => editable?.[0] && setEdit(true)}
      >
        {text}
      </Typography>
      {editable?.[0] && (
        <IconButton sx={{ my: 'auto' }} onClick={() => setEdit(true)}>
          <PencilSimple />
        </IconButton>
      )}
    </Stack>
  )
}
