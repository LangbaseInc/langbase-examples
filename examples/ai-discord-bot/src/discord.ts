import { InteractionType } from 'discord-interactions';

export namespace Discord {
  export interface Interaction {
    id: string;
    token: string;
    type: InteractionType;
    data: Data;
    channel_id?: string;
    member?: Member;
    user?: User;
  }
  export interface Member {
    user: User;
  }
  export interface User {
    id: string;
  }
  export interface Data {
    name: string;
    options?: Option[];
  }
  export interface Option {
    name: string;
    value: string;
  }

  export function generateResponse(
    body: { [key: string]: any },
    extra: { [key: string]: any } = [],
  ): Response {
    return new Response(JSON.stringify(body), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      ...extra,
    });
  }
}
