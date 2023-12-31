import { Stack, IconButton, SxProps, TextField, Typography } from '@mui/material'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { CmsGetSet } from './SpenpoLanding'
import { LandingPageContext } from '../context/landingPage'

export const EditableText: React.FC<{
  confirmEvent?: [boolean, Dispatch<SetStateAction<boolean>>]
  editActionStatement?: [boolean, Dispatch<SetStateAction<boolean>>]
  hideBtn?: boolean
  getSet?: CmsGetSet | CmsGetSet<string | undefined>
  label: string
  text?: string
  sx?: SxProps & { lineHeight: string }
}> = ({ label, getSet, sx, text, hideBtn, confirmEvent, editActionStatement }) => {
  const { SECONDARY_ACCENT_COLOR, editable } = useContext(LandingPageContext)
  const [edit, setEdit] = useState(false)
  const [editableText, setEditableText] = useState<string | undefined>(text)

  const confirm = useCallback(() => {
    if (editableText) getSet?.setter(editableText)
    else setEditableText(text)
    setEdit(false)
  }, [editableText])

  useEffect(() => {
    if (hideBtn && confirmEvent && confirmEvent[0]) {
      confirm()
      confirmEvent[1](false)
    }
  }, [confirmEvent])

  useEffect(() => {
    if (editActionStatement) editActionStatement[1](edit)
  }, [edit])

  return edit ? (
    <Stack direction="row" columnGap={1}>
      <TextField
        size="small"
        fullWidth
        label={label}
        value={editableText}
        onChange={(e) => setEditableText(e.target.value)}
      />
      {!hideBtn && (
        <IconButton sx={{ my: 'auto' }} onClick={confirm}>
          {editableText ? <CheckCircleOutlinedIcon /> : <DeleteIcon />}
        </IconButton>
      )}
    </Stack>
  ) : (
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
  )
}
