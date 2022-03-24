export const getJouneyName = (url: string): 'catch-certificate' | 'processing-statement' | 'storage-document' => {
  if (url.includes('catch-certificate')) {
    return 'catch-certificate';
  }

  if (url.includes('processing-statement')) {
    return 'processing-statement';
  }

  if (url.includes('storage-document')) {
    return 'storage-document';
  }

  return 'catch-certificate';
}