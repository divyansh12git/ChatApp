import {z} from "zod";

const uservalidate=z.object({   
    username:z.string(),
    password:z.string(),
    name:z.string(),
    profilePictureURL:z.string(),
    Bio:z.string(),
    followers:z.number(),
    following:z.number(),
    number_of_posts:z.number()
});

export default uservalidate;
