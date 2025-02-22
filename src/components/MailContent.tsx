import React, { useState, useEffect } from "react";
import { FiMail } from "react-icons/fi";
import { useSession } from "next-auth/react";

interface Email {
  id: string;
  subject: string;
  sender: string;
  time: string;
  snippet: string;
}

const MailItem: React.FC<Email> = ({ subject, sender, time, snippet }) => (
  <div className="flex items-start space-x-2 py-2 border-b border-gray-200">
    <FiMail size={20} className="text-gray-500" />
    <div className="flex-grow">
      <div className="flex justify-between">
        <p className="font-medium">{subject}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      <p className="text-sm text-gray-500">{sender}</p>
      <p className="text-sm text-gray-400">{snippet}</p>
    </div>
  </div>
);

const MailContent: React.FC = () => {
  const { data: session, status } = useSession();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      if (status !== "authenticated") return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/gmail");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setEmails(data.emails);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [status]);

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium">Inbox</span>
        <span className="text-sm text-blue-500">
          {emails.length} unread messages
        </span>
      </div>
      {loading && <p>Loading emails...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && emails.length === 0 && <p>No emails found.</p>}
      {!loading && !error && emails.length > 0 && (
        <div>
          {emails.map((email) => (
            <MailItem key={email.id} {...email} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MailContent;
