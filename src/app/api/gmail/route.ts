import { google } from "googleapis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken as string });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });
  try {
    const listResponse = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
      labelIds: ["INBOX"],
    });

    const messages = listResponse.data.messages;
    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ emails: [] }), { status: 200 });
    }

    // Retrieve detailed information for each message.
    const emails = await Promise.all(
      messages.map(async (msg) => {
        if (!msg.id) return null;
        const messageDetail = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
          format: "full",
        });

        const headers = messageDetail.data.payload?.headers || [];
        const subject = headers.find((h) => h.name === "Subject")?.value || "";
        const sender = headers.find((h) => h.name === "From")?.value || "";
        const date = headers.find((h) => h.name === "Date")?.value || "";
        const snippet = messageDetail.data.snippet || "";

        return {
          id: msg.id,
          subject,
          sender,
          time: date,
          snippet,
        };
      })
    );

    const filteredEmails = emails.filter((email): email is NonNullable<typeof email> => email !== null);
    return new Response(JSON.stringify({ emails: filteredEmails }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error fetching emails:", error);
    return new Response(
      JSON.stringify({ error: `Failed to fetch emails: ${error.message}` }),
      { status: 500 }
    );
  }
}
