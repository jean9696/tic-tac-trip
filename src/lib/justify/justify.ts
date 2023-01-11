const SPACE = ' '

export const justify = (text: string, lineLength: number): string => {
  const lines: string[] = []
  const words = text.split(/ /g)

  let newLineIndex = 0
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > lineLength) {
      throw new Error(
        'Cannot justify text with a word longer than the line length'
      )
    }

    const currentLine = lines[newLineIndex] ?? ''

    const initialBreaksCount = words[i]
      .split('')
      .filter((c) => c === '\n').length
    if (
      currentLine.length + words[i].length + SPACE.length > lineLength ||
      initialBreaksCount > 1
    ) {
      // Add missing spaces except for the last line or breaking line
      if (!initialBreaksCount && words[i] !== words[i][words.length - 1]) {
        let lineWords = lines[newLineIndex].split(SPACE)
        let missingSpacesCount = lineLength - lines[newLineIndex].length
        let currentWordIndex = 0
        while (missingSpacesCount > 0) {
          lineWords[currentWordIndex] += SPACE
          currentWordIndex =
            currentWordIndex + 2 < lineWords.length ? currentWordIndex + 1 : 0
          missingSpacesCount--
        }
        lines[newLineIndex] = lineWords.join(SPACE)
      }

      // Add breaks
      newLineIndex =
        newLineIndex + (initialBreaksCount > 1 ? initialBreaksCount - 1 : 1)
    }

    lines[newLineIndex] = `${
      lines[newLineIndex] ? `${lines[newLineIndex]}${SPACE}` : ''
    }${words[i].replace(/\s/g, '')}`
  }
  return lines.join('\n')
}
