import React from 'react';
import mFace from '../images/face99.jpg';
export default [
  {
    id: '1',
    message: "Hi I'm Jill your assistant. What is your name?",
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'Hi {previousValue}, nice to meet you!',
    trigger: '4',
  },
  {
    id: '4',
    message: 'Your guest MARK has tried to reach you 3 times today. It seems URGENT regarding PROPERTY ENTRY.',
    trigger: '5',
  },
  {
    id: '5',
    component: (
      <div>
        <img alt="face" src={mFace}/>
        <p>MARK is Online now</p>
        <p>Property: 123 9th #345</p>
        <p>From: Munich, Germany</p>
        <p>Speaks: german, english</p>
        Current timezone: PST
      </div>
    ),
    trigger: '6',
  },
  {
    id: '6',
    message: 'Now seems like a good time to call. Did you want to call him now?',
    trigger: '7',
  },
  {
    id: '7',
    user: true,
    trigger: '8',
  },
  {
    id: '8',
    message: 'got it. ENGLISH is not his native language and he seems ANGRY, so best to take a deep breath and speak calmly and slowly. Connecting you now...',
    end: true,
  },
];
