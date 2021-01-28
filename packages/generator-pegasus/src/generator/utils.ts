export function handleImportPath(path: string): string {
  if (/\.ts$/.test(path) || /\.js$/.test(path)) {
    return path.slice(0, path.length - 3);
  }

  if (/\.tsx$/.test(path) || /\.jsx$/.test(path)) {
    return path.slice(0, path.length - 4);
  }

  return path;
}
