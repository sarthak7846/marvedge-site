declare module 'formidable' {
  export interface File {
    filepath: string;
    originalFilename?: string;
    mimetype?: string;
    size?: number;
    [key: string]: any;
  }

  export interface Fields {
    [key: string]: any;
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export class IncomingForm {
    parse(
      req: any,
      callback: (err: any, fields: Fields, files: Files) => void
    ): void;
  }
}
