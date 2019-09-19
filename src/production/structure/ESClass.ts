import { ESLink } from './ESLink';
import { ClassDeclaration, ts, MethodDeclaration } from 'ts-morph';
import { ExportReference } from './ExportReference';

export interface IESClassProps {
  link: ESLink;
  ref: ExportReference;
  node: ClassDeclaration;
}
export class ESClass {
  constructor(public props: IESClassProps) {}

  public parse() {
    const node = this.props.node;
    const methods = node.getDescendantsOfKind(ts.SyntaxKind.MethodDeclaration);

    methods.forEach((method: MethodDeclaration) => {
      if (method.isStatic()) {
        //console.log(method.getName(), '-->', method.getText());
      }
    });
  }
}
