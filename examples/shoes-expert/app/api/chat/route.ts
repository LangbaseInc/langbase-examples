import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

/**
 * Stream AI Chat Messages from Langbase
 *
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  try {
    if (!process.env.NEXT_LB_PIPE_API_KEY) {
      throw new Error(
        'Please set NEXT_LB_PIPE_API_KEY in your environment variables.'
      )
    }

    if (!process.env.LANGBASE_USER_API_KEY) {
      throw new Error(
        'Please set LANGBASE_USER_API_KEY in your environment variables.'
      )
    }
    const { searchParams } = new URL(req.url)
    const action = searchParams.get('action')

    if (action === 'createMemory') {
      return handleCreateMemory(req)
    } else if (action === 'uploadFile') {
      return handleFileUpload(req)
    } else if (action === 'getMemorySets') {
      return handleGetMemorySets()
    } else if (action === 'updatePipe') {
      const { memoryName } = await req.json()
      const ownerLogin = process.env.LANGBASE_OWNER_LOGIN
      return updatePipe(ownerLogin, memoryName)
    } else {
      const endpointUrl = 'https://api.langbase.com/beta/chat'
  
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_LB_PIPE_API_KEY}`
      }
  
      // Get chat prompt messages and threadId from the client.
      const body = await req.json()
      const { messages, threadId } = body
  
      const requestBody = {
        messages,
        ...(threadId && { threadId }) // Only include threadId if it exists
      }
  
      // Send the request to Langbase API.
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      })
  
      if (!response.ok) {
        const res = await response.json()
        throw new Error(`Error ${res.error.status}: ${res.error.message}`)
      }
  
      // Handle Langbase response, which is a stream in OpenAI format.
      const stream = OpenAIStream(response)
      // Respond with a text stream.
      return new StreamingTextResponse(stream, {
        headers: response.headers
      })
    }


  } catch (error: any) {
    console.error('Uncaught API Error:', error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

async function handleCreateMemory(req: Request) {
  const { name, description } = await req.json()
  const response = await fetch('https://api.langbase.com/beta/user/memorysets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LANGBASE_USER_API_KEY}`
    },
    body: JSON.stringify({ name, description })
  })

  const data = await response.json()
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { 'Content-Type': 'application/json' }
  })
}

async function handleFileUpload(req: Request) {
  const formData = await req.formData();
  const file = formData.get('fileName') as File;
  const memoryName = formData.get('memoryName') as string;
  const ownerLogin = process.env.LANGBASE_OWNER_LOGIN;

  if (!file || !memoryName) {
    return new Response(JSON.stringify({ error: 'Invalid file or memory name' }), { status: 400 });
  }

  const signedUrlResponse = await fetch('https://api.langbase.com/beta/user/memorysets/documents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LANGBASE_USER_API_KEY}`
    },
    body: JSON.stringify({
      memoryName: memoryName,
      ownerLogin: ownerLogin?.toString(), 
      fileName: file.name,
    })
  });
  
  const { signedUrl } = await signedUrlResponse.json();
  const uploadResponse = await fetch(signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (uploadResponse.ok) {
    const pipeUpdateResponse = await updatePipe(ownerLogin, memoryName);
    
    return new Response(JSON.stringify({ 
      success: true, 
      fileUpload: uploadResponse.ok,
      pipeUpdate: pipeUpdateResponse 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: false }), {
    status: uploadResponse.status,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function updatePipe(ownerLogin: string | undefined, memoryName: string) {
  const url = `https://api.langbase.com/beta/pipes/${ownerLogin}/shoes-expert`;
  const apiKey = process.env.LANGBASE_USER_API_KEY;

  const pipe = {
    name: "shoes-expert",
    description: "An AI-powered shoe expert that recommends Nike and Adidas footwear based on customer preferences and provides personalized shopping assistance.",
    status: "private",
    config: {
      memorysets: [memoryName]
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(pipe),
    });

    const updatedPipe = await response.json();
    return new Response(JSON.stringify(updatedPipe), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating pipe:', error);
    return new Response(JSON.stringify({ error: 'Failed to update pipe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

async function handleGetMemorySets() {
  const url = 'https://api.langbase.com/beta/user/memorysets';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LANGBASE_USER_API_KEY}`
    }
  });

  const memorySetsList = await response.json();
  return new Response(JSON.stringify(memorySetsList), {
    headers: { 'Content-Type': 'application/json' }
  });
}