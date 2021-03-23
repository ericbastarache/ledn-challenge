import React from 'react';
export interface ChildInterface {
  children: React.ReactNode;
}


export interface AccountProps {
  "First Name": string;
  "Last Name": string;
  "Country": string;
  "ReferredBy": string;
  "amt": number;
  "createdDate": Date;
  "dob": Date;
  "email": string;
  "mfa": string | null;
}
