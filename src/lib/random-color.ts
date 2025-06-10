const colors = [
  {
    background: '#4A5568', // Slate gray
    text: '#E2E8F0',
    border: '#718096',
  },
  {
    background: '#553C9A', // Muted purple
    text: '#E9D8FD',
    border: '#6B46C1',
  },
  {
    background: '#2C7A7B', // Teal
    text: '#E6FFFA',
    border: '#38B2AC',
  },
  {
    background: '#744210', // Muted yellow
    text: '#FFFFF0',
    border: '#975A16',
  },
  {
    background: '#702459', // Muted pink
    text: '#FFF5F7',
    border: '#97266D',
  },
  {
    background: '#2B6CB0', // Blue
    text: '#EBF8FF',
    border: '#4299E1',
  },
  {
    background: '#276749', // Green
    text: '#F0FFF4',
    border: '#38A169',
  },
  {
    background: '#9B2C2C', // Red
    text: '#FFF5F5',
    border: '#E53E3E',
  },
]

export const getRandomColor = (alphabet?: string) => {
  const alphabets = 'abcdefghijklmnopqrstuvwxyz'
  if (!alphabet || alphabet.length === 0) {
    return colors[0]
  }

  const index = alphabets.indexOf(alphabet.toLowerCase())
  if (index === -1) {
    return colors[0]
  }
  const colorIndex = index % colors.length
  return colors[colorIndex]
}
