export interface ShwUploadFile {
  id: string;
  name: string;
  url: string;
  size?: number;
  type?: string;
}
export interface ShwUploadContext {
  signal: AbortSignal;
  /** 0–100; optional when the transport cannot report progress. */
  onProgress: (percent: number) => void;
}
export type ShwUpload = (file: File, context: ShwUploadContext) => Promise<ShwUploadFile>;
