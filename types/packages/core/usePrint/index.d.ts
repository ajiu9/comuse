export declare function usePrint(): {
    getElementSrt: (element: {
        querySelector: (arg0: any) => any;
    }, selector: any) => any;
    addHtmlContent: ({ content }: {
        content: string;
    }) => void;
    getTableContent: (thead: string, tbody: string) => string;
    getSubTitStr: (tit: string) => string;
    print: () => void;
};
