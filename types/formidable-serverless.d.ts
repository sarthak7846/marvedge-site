// declarations.d.ts

declare module 'formidable-serverless' {
  // Defines the shape of the File object
  export interface File {
    size: number;
    path: string;
    name: string | null;
    type: string | null;
    lastModifiedDate?: Date;
  }

  // Defines the class and its parse method
  export class IncomingForm {
    parse(
      req: any,
      callback?: (
        err: any,
        fields: { [key: string]: string | string[] },
        files: { [key: string]: File | File[] }
      ) => void
    ): void;
  }
}