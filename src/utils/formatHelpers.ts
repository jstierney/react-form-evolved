export const sentenceCase = (s: string): string =>
  s && s[0].toUpperCase() + s.slice(1)

export const labelize = (input: string): string => {
	input = input.toLowerCase().replace(/[_-]+/g, ' ')
	return sentenceCase(input)
}
