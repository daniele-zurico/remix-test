export const getJouneyName = (url: string): 'create-catch-certificate' | 'create-processing-statement' | 'create-storage-document' => {
  if (url.includes('create-catch-certificate')) {
    return 'create-catch-certificate';
  }

  if (url.includes('create-processing-statement')) {
    return 'processing-statement';
  }

  if (url.includes('create-storage-document')) {
    return 'storage-document';
  }

  return null;
}
