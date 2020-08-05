export const Button = () => {
  return document.createElement('button')

  // dead code
  console.log('dead-code')
}

// useless
export const Link = () => {
  return document.createElement('a')
}

// useless
export const Heading = level => {
  return document.createElement('h' + level)
}
