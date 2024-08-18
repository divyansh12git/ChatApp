type subscription =Map<string,string[] >;

type reverseSubscription=Map<string, { [userId: string]: { userId: string; ws: any; } }>

export{
    subscription, 
    reverseSubscription
}