import React, { useState } from 'react'
import { Box, Chip, Stack, SxProps } from '@mui/material'
import { ChromePicker } from 'react-color'
import { Circle } from '@phosphor-icons/react'

const popover = {
  position: 'absolute',
  zIndex: '2',
  transform: 'translate(0%, 15%)',
}
const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
}

export const ColorPicker: React.FC<{
  label: string
  color: [string | undefined, (color?: string) => void]
  defaultColor: string
  sx?: SxProps
}> = ({ label, color: [color, setColor], defaultColor, sx }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  return (
    <Stack rowGap={2}>
      <Chip
        sx={sx}
        label={label}
        deleteIcon={
          <Circle
            style={{
              backgroundColor: color,
              borderRadius: '50%',
            }}
            fill={color || defaultColor}
            stroke={color || defaultColor}
            strokeWidth={2}
          />
        }
        onDelete={() => 0}
        clickable
        onClick={() => setShowColorPicker(!showColorPicker)}
      />
      {showColorPicker && (
        <Box sx={popover}>
          <Box sx={cover} onClick={() => setShowColorPicker(false)} />
          <ChromePicker
            color={color || defaultColor}
            onChangeComplete={(e) => {
              setColor(e.hex)
            }}
          />
        </Box>
      )}
    </Stack>
  )
}
