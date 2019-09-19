namespace Validation {
  export class StringValidator {
    constructor(public name: string) {}
  }
}

console.log(new Validation.StringValidator('hello'));

export interface Hello {
  name: string;
  bar: Array<string>;
}
export function hello(name: string) {
  return 1;
}
