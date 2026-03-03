/**
 * Name validation utility based on NameValidator3000_V1.js
 * Validates names to detect spam/fake entries
 */

export type ValidationStep = {
  step: number;
  name: string;
  passed: boolean;
  value?: string | number;
  limit?: number;
  invalidChars?: string[];
  normalized?: string;
  found?: string;
  percentage?: string;
  count?: number;
  char?: string;
  note?: string;
};

export type ValidationResult = {
  isValid: boolean;
  steps: ValidationStep[];
};

/**
 * Validates a name with detailed step-by-step checks
 */
export function isValidNameWithSteps(name: string): ValidationResult {
  const steps: ValidationStep[] = [];

  // Remove allowed prefixes, suffixes, and titles (SYNCHRONIZED)
  let cleanedName = name.trim();
  let prevCleanedName = '';

  // Repeat cleaning until nothing changes
  while (prevCleanedName !== cleanedName) {
    prevCleanedName = cleanedName;

    // Remove prefixes (Dr., Mr., Mrs., Ms., Jr., Sr. at the beginning)
    cleanedName = cleanedName.replace(/^(Dr|Mr|Mrs|Ms|Jr|Sr)\.?\s+/gi, '');

    // Remove titles in the middle of the name (Dr., Mr. between words)
    cleanedName = cleanedName.replace(/\s+(Dr|Mr|Mrs|Ms)\.?\s+/gi, ' ');

    // Remove suffixes at the end
    cleanedName = cleanedName.replace(/\s+(Jr|Sr|III|IV|II|I|V|VI|VII|VIII|IX|X)\.?\s*$/gi, '');

    // Remove dots after initials (J. K. Rowling -> J K Rowling)
    cleanedName = cleanedName.replace(/\b([A-ZА-ЯЁ])\.(\s|$)/g, '$1$2');

    // Remove multiple spaces
    cleanedName = cleanedName.replace(/\s+/g, ' ').trim();
  }

  const normalized = cleanedName.toLowerCase();

  // Step 1: Minimum length
  if (normalized.length < 2) {
    steps.push({ step: 1, name: 'Min length', passed: false });
    return { isValid: false, steps };
  }
  steps.push({ step: 1, name: 'Min length', passed: true });

  // Step 2: Only letters and spaces
  const onlyLettersTest = /^[a-zа-яёії\s]+$/i.test(normalized);
  if (!onlyLettersTest) {
    // Find problematic characters for debugging
    const invalidChars = [...normalized].filter((c) => !/[a-zа-яёії\s]/i.test(c));
    steps.push({
      step: 2,
      name: 'Only letters',
      passed: false,
      invalidChars,
      normalized,
    });
    return { isValid: false, steps };
  }
  steps.push({ step: 2, name: 'Only letters', passed: true });

  const vowels = 'aeiouаеёиоуыэюяіїœæøåäöü';
  const letters = normalized.replace(/\s/g, '');

  // Step 3: Vowel percentage
  let vowelCount = 0;
  for (const char of letters) {
    if (vowels.includes(char)) vowelCount++;
  }
  const vowelPercentage = (vowelCount / letters.length) * 100;

  if (vowelPercentage < 20 || vowelPercentage > 65) {
    steps.push({
      step: 3,
      name: 'Vowel %',
      passed: false,
      value: vowelPercentage.toFixed(1),
    });
    return { isValid: false, steps };
  }
  steps.push({
    step: 3,
    name: 'Vowel %',
    passed: true,
    value: vowelPercentage.toFixed(1),
  });

  // Step 4: Repeating characters
  const maxRepeats = Math.max(
    ...[...letters].reduce((acc, char, i, arr) => {
      let count = 1;
      while (arr[i + count] === char) count++;
      return [...acc, count];
    }, [] as number[])
  );

  if (letters.length > 4 && maxRepeats > 2) {
    steps.push({
      step: 4,
      name: 'Max repeats',
      passed: false,
      value: maxRepeats,
    });
    return { isValid: false, steps };
  }
  if (maxRepeats > 3) {
    steps.push({
      step: 4,
      name: 'Max repeats',
      passed: false,
      value: maxRepeats,
    });
    return { isValid: false, steps };
  }
  steps.push({ step: 4, name: 'Max repeats', passed: true, value: maxRepeats });

  // Step 5: Consonants in a row
  let maxConsonants = 0;
  let currentConsonants = 0;

  for (const char of letters) {
    if (!vowels.includes(char)) {
      currentConsonants++;
      maxConsonants = Math.max(maxConsonants, currentConsonants);
    } else {
      currentConsonants = 0;
    }
  }

  const consonantLimit = letters.length <= 3 ? 3 : 5;
  if (maxConsonants > consonantLimit) {
    steps.push({
      step: 5,
      name: 'Max consonants',
      passed: false,
      value: maxConsonants,
      limit: consonantLimit,
    });
    return { isValid: false, steps };
  }
  steps.push({
    step: 5,
    name: 'Max consonants',
    passed: true,
    value: maxConsonants,
    limit: consonantLimit,
  });

  // Step 6: Case alternation
  const originalLetters = cleanedName.replace(/\s/g, '');
  if (originalLetters.length >= 5) {
    let caseChanges = 0;
    for (let i = 1; i < originalLetters.length; i++) {
      const prevIsUpper = originalLetters[i - 1] === originalLetters[i - 1].toUpperCase();
      const currIsUpper = originalLetters[i] === originalLetters[i].toUpperCase();
      if (prevIsUpper !== currIsUpper) {
        caseChanges++;
      }
    }

    if (caseChanges > 3) {
      steps.push({
        step: 6,
        name: 'Case changes',
        passed: false,
        value: caseChanges,
      });
      return { isValid: false, steps };
    }
    steps.push({
      step: 6,
      name: 'Case changes',
      passed: true,
      value: caseChanges,
    });
  } else {
    steps.push({
      step: 6,
      name: 'Case changes',
      passed: true,
      note: 'skipped (too short)',
    });
  }

  // Step 7: Keyboard sequences
  const keyboardSequences = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
    'йцукенгшщзх',
    'фывапролджэ',
    'ячсмитьбю',
  ];

  for (const seq of keyboardSequences) {
    const reverseSeq = seq.split('').reverse().join('');

    for (let i = 0; i <= seq.length - 3; i++) {
      const substring = seq.substring(i, i + 3);
      if (letters.includes(substring)) {
        steps.push({
          step: 7,
          name: 'Keyboard seq',
          passed: false,
          found: substring,
        });
        return { isValid: false, steps };
      }
    }

    for (let i = 0; i <= reverseSeq.length - 3; i++) {
      const substring = reverseSeq.substring(i, i + 3);
      if (letters.includes(substring)) {
        steps.push({
          step: 7,
          name: 'Keyboard seq (rev)',
          passed: false,
          found: substring,
        });
        return { isValid: false, steps };
      }
    }
  }

  const keyboardRows = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
    'йцукенгшщзхъ',
    'фывапролджэ',
    'ячсмитьбю',
  ];

  for (const row of keyboardRows) {
    let matchCount = 0;
    for (const char of letters) {
      if (row.includes(char)) {
        matchCount++;
      }
    }
    if (matchCount / letters.length > 0.75 && letters.length > 4) {
      steps.push({
        step: 7,
        name: 'Keyboard row concentration',
        passed: false,
        percentage: ((matchCount / letters.length) * 100).toFixed(1),
      });
      return { isValid: false, steps };
    }
  }
  steps.push({ step: 7, name: 'Keyboard patterns', passed: true });

  // Step 8: Mirror patterns
  if (letters.length >= 6) {
    let mirrorPatterns = 0;
    for (let i = 0; i < letters.length - 3; i++) {
      if (letters[i] === letters[i + 3] && letters[i + 1] === letters[i + 2]) {
        mirrorPatterns++;
      }
    }
    if (mirrorPatterns > 0) {
      steps.push({
        step: 8,
        name: 'Mirror patterns',
        passed: false,
        count: mirrorPatterns,
      });
      return { isValid: false, steps };
    }
  }
  steps.push({ step: 8, name: 'Mirror patterns', passed: true });

  // Step 9: Character frequency
  const charFrequency: Record<string, number> = {};
  for (const char of letters) {
    charFrequency[char] = (charFrequency[char] || 0) + 1;
  }

  if (letters.length >= 5) {
    for (const char in charFrequency) {
      if (charFrequency[char] / letters.length > 0.4) {
        steps.push({
          step: 9,
          name: 'Char frequency',
          passed: false,
          char,
          percentage: ((charFrequency[char] / letters.length) * 100).toFixed(1),
        });
        return { isValid: false, steps };
      }
    }
  }
  steps.push({ step: 9, name: 'Char frequency', passed: true });

  // Step 10: High uniqueness (only for very long single-word names)
  if (letters.length >= 10) {
    const uniqueChars = new Set(letters).size;
    const uniqueRatio = uniqueChars / letters.length;

    // For compound names (with spaces) this check does not apply
    const hasSpaces = normalized.includes(' ');

    // If >95% of letters are unique AND it's a single word - suspicious
    if (uniqueRatio > 0.95 && !hasSpaces) {
      steps.push({
        step: 10,
        name: 'High uniqueness',
        passed: false,
        percentage: (uniqueRatio * 100).toFixed(1),
      });
      return { isValid: false, steps };
    }
  }
  steps.push({ step: 10, name: 'High uniqueness', passed: true });

  return { isValid: true, steps };
}

/**
 * Main function for backward compatibility
 */
export function isValidName(name: string): boolean {
  return isValidNameWithSteps(name).isValid;
}
