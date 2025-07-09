import { NextRequest, NextResponse } from "next/server";
import { Chain } from "../../../../zeus";

const chain = Chain(`${process.env.NEXT_PUBLIC_MAIN_SERVER_URL}/graphql`);

interface Body {
  username: string;
  value: string;
  updateId: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: Body = await request.json();
    const { username, value, updateId } = body;
    // console.log(username,value,updateId);
    if (!username || !value || !updateId)
      return NextResponse.json({ success: false, message: "Some parameters not provided" });

    const response = await chain("mutation")({
      updateUser: [{
        input: {
          username: username.toString(),
          value: value,
          updateId: updateId,
        },
      }, true],
    });

    if (response.updateUser) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Request not sent" });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "Error occurred" });
  }
}
