This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Step-by-step guide to create a 4096-bit RSA SSH key, use ssh-agent, and push to GitHub

This guide outlines how to generate a 4096-bit RSA key, add it to `ssh-agent`, and then use it to authenticate with GitHub for pushing code.

**1. Generate the SSH Key Pair:**

Open your terminal and run the following command:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

*   `-t rsa`: Specifies the RSA algorithm.
*   `-b 4096`: Sets the key length to 4096 bits.  This is a strong key size.
*   `-C "your_email@example.com"`: Adds a comment with your email address (recommended).  This helps you identify the key later.

You'll be prompted to choose a file to save the key.  The default location (`~/.ssh/id_rsa`) is fine.  If you accept the default, just press Enter.

```
Enter file in which to save the key (/home/youruser/.ssh/id_rsa): 
```

You'll then be asked to enter a passphrase (recommended for security).  If you don't want to use a passphrase, just press Enter twice.  However, **using a passphrase is strongly recommended**.

```
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
```

This will generate two files: `id_rsa` (the private key) and `id_rsa.pub` (the public key).

**2. Add the Public Key to GitHub:**

*   Copy the contents of the public key file (`id_rsa.pub`). You can do this with the following command:

```bash
cat ~/.ssh/id_rsa.pub
```

*   Go to your GitHub account settings:  Click on your profile picture in the top right corner, then select "Settings".
*   Navigate to "SSH and GPG keys": In the left sidebar, click on "SSH and GPG keys".
*   Click "New SSH key" or "Add SSH key":  Give your key a descriptive title (e.g., "My Laptop").
*   Paste the contents of `id_rsa.pub` into the "Key" field.
*   Click "Add SSH key".  You might be asked to confirm your GitHub password.

**3. Start the SSH Agent:**

The `ssh-agent` is a program that holds your private keys in memory so you don't have to enter your passphrase every time you connect to a remote server.  Start it with:

```bash
eval "$(ssh-agent -s)"
```

This command will output a process ID.  Keep your terminal open after running this command.

**4. Add your Private Key to the SSH Agent:**

Now, add your private key to the agent:

```bash
ssh-add ~/.ssh/id_rsa
```

If you set a passphrase, you'll be prompted to enter it.

**5. Clone the Repository (if you haven't already):**

If you haven't cloned the repository yet, use this command:

```bash
git clone git@github.com:nordeim/icloud-dashboard.git
```

**6. Add the Remote (if you haven't already):**

If you are working in an existing local repository and haven't added the remote, run:

```bash
git remote add origin git@github.com:nordeim/icloud-dashboard.git
```

**7. Push to GitHub:**

Now you can push your code to GitHub:

```bash
git push -u origin main
```

Because you've added your key to `ssh-agent`, you shouldn't be prompted for a password (unless you restart your terminal or the `ssh-agent` is stopped).

**Important Security Considerations:**

*   **Passphrases:**  Always use a strong passphrase for your private key.  This adds an extra layer of security.
*   **SSH Agent Forwarding (Use with Caution):**  Be careful when using SSH agent forwarding.  It can potentially expose your private keys if the remote server is compromised.  Only use it when you trust the remote server.
*   **Key Management:**  Keep your private keys secure.  Don't share them with anyone.
*   **Regularly Review SSH Keys:** Periodically review the SSH keys you've added to your GitHub account and remove any that are no longer needed.

By following these steps, you can securely connect to GitHub using SSH keys and manage your repositories effectively. Remember to keep your private key secure and use a strong passphrase.
