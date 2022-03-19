import { Notification } from '../../data/notification';

export const NotificationBanner = ({ title, message }: Notification) => {
  return (
    <div style={{ border: 0 }} className='govuk-notification-banner' role="alert" >
      <div className='govuk-notification-banner__header govuk-!-padding-top-4'>
        <h2 style={{ color: 'white', marginBottom: '15px' }} className='govuk-heading-l'>{title}</h2>
        <p style={{ color: 'white', marginTop: 0 }} >{message}</p>
      </div>
    </div>
  );
};