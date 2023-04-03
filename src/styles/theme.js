import { extendTheme, withDefaultVariant } from '@chakra-ui/react';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const colors = {
  white: '#EBEDEF',
  black: '#15171A',
  purple: {
    50: '#B081F4',
    100: '#A874F3',
    200: '#9F66F2',
    300: '#9557F1',
    400: '#8A46F0',
    500: '#7E34EE',
    600: '#732FD8',
    700: '#692BC4',
    800: '#5F27B2',
    900: '#5623A2',
  }
}

const variantFocus = () => ({
  field: {
    _focus: {
      borderColor: "var(--chakra-ui-focus-ring-color)",
      boxShadow: "0 0 0 2px var(--chakra-ui-focus-ring-color)"
    }
  }
});

const shadows = {
  outline: "0 0 0 3px var(--chakra-ui-focus-ring-color)"
}

const fonts = {
  heading: 'Lexend',
  body: 'Lexend'
}

const components = {
  Input: {
    variants: {
      outline: variantFocus,
      filled: variantFocus,
      flushed: variantFocus
    }
  },
  Select: {
    variants: {
      outline: variantFocus,
      filled: variantFocus,
      flushed: variantFocus
    }
  },
  Textarea: {
    variants: {
      outline: variantFocus,
      filled: variantFocus,
      flushed: variantFocus
    }
  }
}

export const theme = extendTheme({
  config,
  colors,
  shadows,
  fonts,
  components
},
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'NumberInput', 'PinInput', 'TextArea', 'Select'],
  })
  )


  export const primary = 'purple';
  export const primaryHex = '#7E34EE';
  export const bgHover = '#42444C';
  export const headerBg = '#131921'