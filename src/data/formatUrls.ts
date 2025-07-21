export const compressUrls = (text: string) => text//.replace(/\s+/g, " ")
    // .replaceAll("/fileadmin/user_upload/", "/@/")
    // .replaceAll("/fileadmin/_processed_/", "/$/")
export const decompressUrls = (text: string) => text
    // .replace("/@/", "/fileadmin/user_upload/")
    // .replace("/$/", "/fileadmin/_processed_/");