interface User {
    id: number;
    name: string;
    newMessageCount:number;
    lastmessage:string;
    profilePictureURL: string;
  }
  
const userlist: User[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      newMessageCount: 2,
      lastmessage: 'Let’s meet tomorrow!',
      profilePictureURL: 'https://example.com/profile/alice.jpg',
    },
    {
      id: 2,
      name: 'Bob Smith',
      newMessageCount: 5,
      lastmessage: 'Got your email.',
      profilePictureURL: 'https://example.com/profile/bob.jpg',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      newMessageCount: 0,
      lastmessage: 'Thanks for the update.',
      profilePictureURL: 'https://example.com/profile/charlie.jpg',
    },
    {
      id: 4,
      name: 'Diana Prince',
      newMessageCount: 1,
      lastmessage: 'Let me know when you’re free.',
      profilePictureURL: 'https://example.com/profile/diana.jpg',
    },
    {
      id: 5,
      name: 'Eve Adams',
      newMessageCount: 3,
      lastmessage: 'I’ll send the documents shortly.',
      profilePictureURL: 'https://example.com/profile/eve.jpg',
    },
    {
      id: 6,
      name: 'Frank White',
      newMessageCount: 0,
      lastmessage: 'See you at the event.',
      profilePictureURL: 'https://example.com/profile/frank.jpg',
    },
    {
      id: 7,
      name: 'Grace Lee',
      newMessageCount: 4,
      lastmessage: 'Any updates on the project?',
      profilePictureURL: 'https://example.com/profile/grace.jpg',
    },
    {
      id: 8,
      name: 'Hank Green',
      newMessageCount: 2,
      lastmessage: 'Let’s catch up this weekend.',
      profilePictureURL: 'https://example.com/profile/hank.jpg',
    },
    {
      id: 9,
      name: 'Ivy Bell',
      newMessageCount: 0,
      lastmessage: 'I’ll be out of town next week.',
      profilePictureURL: 'https://example.com/profile/ivy.jpg',
    },
    {
      id: 10,
      name: 'Jack Davis',
      newMessageCount: 6,
      lastmessage: 'The report is ready.',
      profilePictureURL: 'https://example.com/profile/jack.jpg',
    },
    {
      id: 11,
      name: 'Karen Thompson',
      newMessageCount: 1,
      lastmessage: 'Can we reschedule our meeting?',
      profilePictureURL: 'https://example.com/profile/karen.jpg',
    },
    {
      id: 12,
      name: 'Leo Carter',
      newMessageCount: 3,
      lastmessage: 'Great job on the presentation!',
      profilePictureURL: 'https://example.com/profile/leo.jpg',
    },
    {
      id: 13,
      name: 'Mia Nelson',
      newMessageCount: 0,
      lastmessage: 'Talk to you later!',
      profilePictureURL: 'https://example.com/profile/mia.jpg',
    },
    {
      id: 14,
      name: 'Nathan Scott',
      newMessageCount: 4,
      lastmessage: 'I’ll review the document today.',
      profilePictureURL: 'https://example.com/profile/nathan.jpg',
    },
    {
      id: 15,
      name: 'Olivia King',
      newMessageCount: 7,
      lastmessage: 'Thanks for the quick response.',
      profilePictureURL: 'https://example.com/profile/olivia.jpg',
    },
  ];
  
  export {userlist};