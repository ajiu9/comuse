export declare const isWechat: () => boolean;
export declare const isAlipay: () => boolean;
export declare const isClient: boolean;
export interface OsVersion {
    name: 'Windows' | 'MacOS' | 'Android' | 'iOS' | 'WindowsPhone' | 'Debian' | 'WebOS' | 'Harmony';
    version: string;
}
/**
 * Get the system name and version
 * @see  https://github.com/saqqdy/js-cool.git
 *
 * @example
 * ```
 * // ipad => 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1'
 * osVersion() // \{ name: 'iOS', version: '13.3' \}
 *
 * // iphone => 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
 * osVersion() // \{ name: 'iOS', version: '13.2.3' \}
 *
 * //  mac os => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
 * osVersion() // \{ name: 'MacOS', version: '10.15.7' \}
 *
 * // windows => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
 * osVersion() // \{ name: 'Windows', version: '10.0' \}
 *
 * // windows xp => 'Mozilla/5.0 (Windows NT 5.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
 * osVersion() // \{ name: 'Windows', version: 'XP' \}
 *
 * // windows phone => 'Mozilla/5.0 (Windows Phone OS 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36'
 * osVersion() // \{ name: 'WindowsPhone', version: '10.0' \}
 *
 * ```
 * @param ua - ua or any ua like string, allowed to be undefined, default is navigator.userAgent
 * @return OsVersion|null
 */
export declare function osVersion(ua?: string): OsVersion | null;
