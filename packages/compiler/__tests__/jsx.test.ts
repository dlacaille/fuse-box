import { compileModule } from '../program/compileModule';

describe('JSX', () => {
  it('should parse simple jsx', () => {
    const result = compileModule({
      code: `
        function test(){
            return <div></div>
        }
          `,
    });
    expect(result.code).toMatchSnapshot();
  });

  it('should add text', () => {
    const result = compileModule({
      code: `
        function test(){
            return <div>1</div>
        }
          `,
    });
    expect(result.code).toMatchSnapshot();
  });

  it('should add just attributes', () => {
    const result = compileModule({
      code: `
        import oi from "./oi";
        function test(){
          return (<i id="1" f={oi} ></i>)
        }
          `,
    });
    expect(result.code).toMatchSnapshot();
  });

  it('should add just attributes and spread', () => {
    const result = compileModule({
      code: `
        import oi from "./oi";
        function test(){
          return (<i id="1" f={oi} {...props} ></i>)
        }
          `,
    });

    expect(result.code).toMatchSnapshot();
  });

  it('should have only one spread props', () => {
    const result = compileModule({
      code: `
        import oi from "./oi";
        function test(){
          return (<i {...props} ></i>)
        }
          `,
    });
    expect(result.code).toMatchSnapshot();
  });

  it('should keep the order', () => {
    const result = compileModule({
      code: `
        import oi from "./oi";
        function test(){
          return (<i id={1} f={oi} {...props} s={2} {...rest}></i>)
        }
          `,
    });

    expect(result.code).toMatchSnapshot();
  });

  it('should remove empty expressions', () => {
    const result = compileModule({
      code: `
        import oi from "./oi";
        function test(){
          return (<i> {/* <i></i> */} </i>)
        }
          `,
    });

    expect(result.code).toMatchSnapshot();
  });

  it('should handle JSX fragment', () => {
    const result = compileModule({
      code: `
        import React from "react";
        function test(){
          return (
            <div>
              <>
                <div>1</div>
              </>
            </div>
          )
        }
          `,
    });

    expect(result.code).toMatchSnapshot();
  });

  it('should work with JSXSpreadChild', () => {
    const result = compileModule({
      code: `

        function test(){
          return (<i>{...children}</i>)
        }
          `,
    });
    expect(result.code).toMatchSnapshot();
  });
});
