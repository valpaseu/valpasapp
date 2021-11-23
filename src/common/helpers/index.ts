export const formatName = (name: string) => {
  const firstName = name.substring(0, name.indexOf('.'))
  const capitalize = firstName.charAt(0).toUpperCase() + firstName.slice(1)
  return capitalize
}
