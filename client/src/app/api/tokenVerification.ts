import jwt from 'jsonwebtoken';
import { redirect } from 'next/dist/server/api-utils';

const SECRET_KEY = process.env.JWT_TOKEN_KEY || "icecream";

export async function getServerSideProps(context:any) {
    const { req } = context;
    const token = localStorage.getItem('token'); // Assuming the token is stored in cookies
    console.log("YOYOYOYO");
    if (!token) {
      return {
        redirect: {
          destination: '/auth/login', // Redirect to login if token is missing
          permanent: false,
        },
      };
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, SECRET_KEY);
  
      return {
        props: {
          user: decoded, // Pass user data to the page
        },
        redirect:{
            destination:'/chat'
        },
      };
    } catch (err) {
      return {
        redirect: {
          destination: '/auth/login', // Redirect to login if token is invalid
          permanent: false,
        },
      };
    }
  }
  
 