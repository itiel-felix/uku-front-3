export interface ListElement {
    id: string | undefined,
    title: string | undefined,
    subtitle: string | undefined,
    imageUrl: string | undefined,
    button_text: string | undefined,
    url: string | undefined,
    [key: string]: unknown;
}