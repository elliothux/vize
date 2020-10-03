import { noop } from '../../../../../utils/common';

export enum MarginPaddingField {
  PaddingLeft = 'paddingLeft',
  PaddingTop = 'paddingTop',
  PaddingRight = 'paddingRight',
  PaddingBottom = 'paddingBottom',
  MarginLeft = 'marginLeft',
  MarginTop = 'marginTop',
  MarginRight = 'marginRight',
  MarginBottom = 'marginBottom',
  _ = '',
}

export class Props {
  public size = 200;

  public paddingLeft = 0;

  public paddingTop = 0;

  public paddingRight = 0;

  public paddingBottom = 0;

  public marginLeft: number | 'auto' = 0;

  public marginTop = 0;

  public marginRight: number | 'auto' = 0;

  public marginBottom = 0;

  public onStart: () => void = noop;

  public onChange: (type: MarginPaddingField, value: number | 'auto') => void = noop;

  public onFinalChange: (type: MarginPaddingField, value: number) => void = noop;
}

export interface State {
  paddingLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  marginLeft: number | 'auto';
  marginTop: number;
  marginRight: number | 'auto';
  marginBottom: number;
  [x: string]: any;
}
