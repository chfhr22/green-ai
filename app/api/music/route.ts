import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from 'replicate'

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
})

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if(!freeTrial){
      return new NextResponse('Free Trial has expired.', {status: 403})
    }


    const response = await replicate.run(
      "suno-ai/bark:b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787",
      {
        input: {
          prompt: "prompt"
        }
      }
    );

    await increaseApiLimit()


    return NextResponse.json(response);
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};