export function isFileImage(file): boolean {
  return file && file["mimetype"].split("/")[0] === "image";
}
