/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	createUserInput:{

	},
	updateUser:{

	},
	SignInInput:{

	},
	SignUpInput:{

	},
	Query:{
		getAllUsers:{

		},
		getUser:{

		},
		getFriendsData:{

		},
		getUserToRoomData:{

		}
	},
	Mutation:{
		updateUser:{
			input:"updateUser"
		},
		deleteUser:{

		},
		signIn:{
			input:"SignInInput"
		},
		signUp:{
			input:"SignUpInput"
		}
	}
}

export const ReturnTypes: Record<string,any> = {
	User:{
		id:"ID",
		name:"String",
		username:"String",
		friends:"Int",
		requested:"Int",
		number_of_posts:"Int",
		profilePictureURL:"String",
		Bio:"String"
	},
	UserToRoom:{
		roomID:"String",
		friendID:"Int"
	},
	getAllUsersResponse:{
		id:"Int",
		name:"String",
		username:"String",
		profilePictureURL:"String",
		Bio:"String"
	},
	Query:{
		getAllUsers:"getAllUsersResponse",
		getUser:"User",
		getCurrentUser:"User",
		getFriendsData:"User",
		getUserToRoomData:"UserToRoom"
	},
	Mutation:{
		updateUser:"Boolean",
		deleteUser:"Boolean",
		signIn:"String",
		signUp:"String"
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}