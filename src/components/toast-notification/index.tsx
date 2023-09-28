import React from 'react';
import './style.sass'

interface ToastNotificationProps {
  type: 'ok' | 'error' | 'attention' | 'reminder';
  text: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ type, text }) => {
  if (type === 'ok') {
    return (
      <div className="container ok">
        <p className="text ok">{text}</p>
        <svg className="icon ok" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12C22 17.5229 17.5229 22 12 22C6.47714 22 2 17.5229 2 12C2 6.47714 6.47714 2 12 2C17.5229 2 22 6.47714 22 12ZM10.8433 17.2949L18.2627 9.87556C18.5146 9.62363 18.5146 9.21512 18.2627 8.96319L17.3503 8.05081C17.0983 7.79883 16.6898 7.79883 16.4379 8.05081L10.3871 14.1015L7.56214 11.2766C7.3102 11.0246 6.90169 11.0246 6.64972 11.2766L5.73734 12.189C5.4854 12.4409 5.4854 12.8494 5.73734 13.1013L9.93089 17.2949C10.1829 17.5469 10.5913 17.5469 10.8433 17.2949Z" fill="#00B0A6"/>
        </svg>
        <div className="line ok"></div>
      </div>
    )
  } else if (type === 'error') {
    return (
      <div className="container error">
        <p className="text error">{text}</p>
        <svg className="icon error" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 10.59L15.59 7L17 8.41L13.41 12L17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59Z" fill="#B60000"/>
        </svg>
        <div className="line error"></div>
      </div>
    )
  } else if (type === 'attention') {
    return (
      <div className="container attention">
        <p className="text attention">{text}</p>
        <svg className="icon attention" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V15H13V17H11ZM11 7V13H13V7H11Z" fill="#FF9200"/>
        </svg>
        <div className="line attention"></div>
      </div>
    )
  } else if (type === 'reminder') {
    return (
      <div className="container reminder">
        <p className="text reminder">{text}</p>
        <svg className="icon reminder" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V15H13V17H11ZM11 7V13H13V7H11Z" fill="#5574E3"/>
        </svg>
        <div className="line reminder"></div>
      </div>
    )
  }
  
}