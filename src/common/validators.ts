export function validateBrackets(expression: (string | number)[], brackets: string[]): boolean {
  const validation: string[] = [];
  let validate = true;

  expression.every((exp, index) => {
    const previousValue = expression[index - 1];

    if ((exp === ")" && previousValue === "(") || (exp === "(" && previousValue === ")")) {
      validate = false;
      return false;
    }

    return true;
  });

  const findBrackets = expression.filter((e) => brackets.includes(e as string));

  if (findBrackets.length === 0) return true;
  if (findBrackets[0] === ")") return false;

  findBrackets.forEach((bracket) => {
    if (bracket === "(") validation.push(bracket as string);
    else {
      if (validation[validation.length - 1] === "(") validation.pop();
      else validation.push(bracket as string);
    }
  });

  return validation.length === 0 && validate;
}

export function validateVariables(expression: (string | number)[], variables: string[]): boolean {
  let validate = true;

  expression.every((exp, index) => {
    const previousValue = expression[index - 1];
    const nextValue = expression[index + 1];

    if (typeof exp === "number" || variables.includes(exp)) {
      if (
        previousValue === ")" ||
        nextValue === "(" ||
        typeof previousValue === "number" ||
        variables.includes(previousValue)
      ) {
        validate = false;
        return false;
      }
    }

    return true;
  });

  return validate;
}

export function validateOperators(expression: (string | number)[], operators: string[]): boolean {
  const length = expression.length;
  let validate = true;

  if (operators.includes(expression[0] as string)) return false;
  if (operators.includes(expression[length - 1] as string)) return false;

  expression.every((exp, index) => {
    const previousValue = expression[index - 1];
    const nextValue = expression[index + 1];

    if (operators.includes(exp as string)) {
      if (previousValue === "(" || nextValue === ")" || operators.includes(previousValue as string)) {
        validate = false;
        return false;
      }
    }

    return true;
  });

  return validate;
}
