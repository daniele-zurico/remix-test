export interface IMainAppProps {
  locale: 'en' | 'cy',
  journey: 'catch-certificate' | 'processing-statement' | 'storage-document'
}
export interface INotification {
  title: string;
  message: string;
};