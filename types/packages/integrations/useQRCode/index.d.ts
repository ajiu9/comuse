import type { MaybeRefOrGetter } from 'vue';
import QRCode from 'qrcode';
/**
 * Wrapper for qrcode.
 *
 * @param text
 * @param options
 */
export declare function useQRCode(text: MaybeRefOrGetter<string>, options?: QRCode.QRCodeToDataURLOptions): import("vue").ShallowRef<string, string>;
