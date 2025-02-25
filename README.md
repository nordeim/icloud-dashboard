![image](https://github.com/user-attachments/assets/f56b8c18-c38a-4ea5-8d3f-83081484f2b1)

---

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

---

It looks like you're encountering an issue with pushing to your GitHub repository because the deploy key you're using doesn't have the necessary permissions. Here are a few steps you can follow to resolve this issue:

1. **Check Repository Existence**: Ensure that the repository `nordeim/icloud-dashboard` exists on GitHub.

2. **Check Deploy Key Permissions**: Make sure that the deploy key you are using has write access to the repository. Deploy keys can be read-only or read/write. To check the deploy key permissions:
   - Go to your repository on GitHub.
   - Navigate to `Settings` > `Deploy keys`.
   - Verify that the key you are using is listed and has the correct permissions.

3. **Use an SSH Key with Write Access**: If the deploy key does not have write access, you can add an SSH key with the necessary permissions:
   - Generate a new SSH key (if you don't have one) using `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`.
   - Add the new SSH key to your GitHub account under `Settings` > `SSH and GPG keys`.
   - Update your repository's remote URL to use the new SSH key.

4. **Check SSH Configuration**: Ensure that your SSH configuration is correct. You can test the SSH connection with:
   ```sh
   ssh -T git@github.com
   ```

5. **Update Remote URL**: Ensure that the remote URL for your repository is correct. You can update it using:
   ```sh
   git remote set-url origin git@github.com:nordeim/icloud-dashboard.git
   ```

6. **Verify Access Rights**: If the issue persists, make sure that your user has the necessary permissions on the repository by checking the repository's collaborators or team settings.

If you've verified all the above and the issue still persists, you may need to verify or update your SSH key configuration or regenerate the deploy key with the correct permissions.

---

Your authentication to GitHub via SSH seems to be working fine. However, the error message you initially encountered indicates that the deploy key specifically does not have the required permissions to push to the repository.

Here are the steps you can follow to ensure that the deploy key has the correct permissions and/or use an SSH key with the required access:

### Step 1: Verify Deploy Key Permissions
1. Go to your repository on GitHub (`nordeim/icloud-dashboard`).
2. Navigate to `Settings` > `Deploy keys`.
3. Check if the deploy key is listed and ensure it has write access. If the key is listed but does not have write access, you need to update its permissions or add a new key with write access.

### Step 2: Add a New SSH Key
If the deploy key does not have the necessary permissions, you can add a new SSH key to your GitHub account:

1. **Generate a New SSH Key**:
   ```sh
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```
   Follow the prompts to save the key (e.g., `~/.ssh/id_rsa`).

2. **Add the SSH Key to Your GitHub Account**:
   - Copy the contents of the public key file (e.g., `~/.ssh/id_rsa.pub`).
   - Go to GitHub and navigate to `Settings` > `SSH and GPG keys`.
   - Click `New SSH key`, give it a title, and paste the key.

3. **Update Your Repository's Remote URL**:
   ```sh
   git remote set-url origin git@github.com:nordeim/icloud-dashboard.git
   ```

### Step 3: Push to the Repository
Try pushing your changes again:
```sh
git push -u origin main
```

### Example SSH Key Configuration
Here is an example of how your SSH key configuration might look:

```plaintext name=~/.ssh/config
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa
```

### Example Markdown File for Documentation
````markdown name=docs/ssh-key-setup.md
# Setting Up SSH Keys for GitHub

## Generating a New SSH Key
To generate a new SSH key, run the following command:
```sh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
Follow the prompts to save the key (e.g., `~/.ssh/id_rsa`).

## Adding the SSH Key to GitHub
1. Copy the contents of the public key file (e.g., `~/.ssh/id_rsa.pub`).
2. Go to GitHub and navigate to `Settings` > `SSH and GPG keys`.
3. Click `New SSH key`, give it a title, and paste the key.

## Updating the Remote URL
Update your repository's remote URL to use the new SSH key:
```sh
git remote set-url origin git@github.com:nordeim/icloud-dashboard.git
```

## Pushing to the Repository
Try pushing your changes again:
```sh
git push -u origin main
```
````

---

It looks like your SSH configuration is using the wrong identity file, which is causing Git to authenticate with the wrong GitHub account. You can specify which SSH key to use for a particular host in your SSH configuration file.

Here are the steps to rectify this:

### Step 1: Verify Existing SSH Keys
First, check which SSH keys are currently available:
```sh
ls -al ~/.ssh
```

### Step 2: Update SSH Configuration
Create or update your SSH configuration file (`~/.ssh/config`) to specify the correct identity file for GitHub. This file tells SSH which key to use for different hosts.

```plaintext name=~/.ssh/config
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_nordeim
```

### Step 3: Generate a New SSH Key (If Needed)
If you don't already have an SSH key for the `nordeim` account, you can generate one:
```sh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
Save the key with a distinct name, such as `~/.ssh/id_rsa_nordeim`.

### Step 4: Add the SSH Key to GitHub
Copy the contents of the public key file (e.g., `~/.ssh/id_rsa_nordeim.pub`) and add it to your GitHub account under `Settings` > `SSH and GPG keys`.

### Step 5: Test the SSH Connection
Test the SSH connection to ensure it's using the correct identity:
```sh
ssh -T git@github.com
```
It should now authenticate as `nordeim`.

### Example `.git/config` File
Your `.git/config` file appears to be correctly configured for the remote URL. Here it is for reference:
```plaintext name=.git/config
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
[remote "origin"]
    url = git@github.com:nordeim/icloud-dashboard.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
    remote = origin
    merge = refs/heads/main
```

### Example Markdown File for Documentation
````markdown name=docs/ssh-configuration.md
# Configuring SSH for GitHub

## Step 1: Verify Existing SSH Keys
List existing SSH keys:
```sh
ls -al ~/.ssh
```

## Step 2: Update SSH Configuration
Create or update the SSH configuration file (`~/.ssh/config`):
```plaintext name=~/.ssh/config
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_nordeim
```

## Step 3: Generate a New SSH Key (If Needed)
Generate a new SSH key:
```sh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
Save the key with a distinct name, such as `~/.ssh/id_rsa_nordeim`.

## Step 4: Add the SSH Key to GitHub
Copy the contents of the public key file (e.g., `~/.ssh/id_rsa_nordeim.pub`) and add it to your GitHub account under `Settings` > `SSH and GPG keys`.

## Step 5: Test the SSH Connection
Test the SSH connection:
```sh
ssh -T git@github.com
```
It should authenticate as `nordeim`.
````

---

The error message you're seeing indicates that the remote branch has changes that you do not have locally. To resolve this, you need to pull the remote changes and then push your local changes. Here are the steps to follow:

### Step 1: Commit Local Changes
First, commit any local changes you have:
```sh
git add .gitignore
git commit -m "Update .gitignore"
```

### Step 2: Pull Remote Changes
Pull the remote changes to integrate them with your local repository:
```sh
git pull origin main --rebase
```

### Step 3: Push Local Changes
After successfully pulling the changes, push your local changes to the remote repository:
```sh
git push -u origin main
```

### Example Markdown File for Documentation
````markdown name=docs/git-push-rejected.md
# Resolving Git Push Rejection

## Step 1: Commit Local Changes
Before pulling remote changes, commit any local changes:
```sh
git add .gitignore
git commit -m "Update .gitignore"
```

## Step 2: Pull Remote Changes
Pull the remote changes to integrate them with your local repository:
```sh
git pull origin main --rebase
```

## Step 3: Push Local Changes
After successfully pulling the changes, push your local changes to the remote repository:
```sh
git push -u origin main
```

## Troubleshooting
If you encounter conflicts during the pull, resolve them manually and then continue the rebase:
```sh
# Resolve conflicts in files
git add <resolved-file>
git rebase --continue
```
````

---

Using `git pull origin main --rebase` will not overwrite your local changes, but it will integrate the remote changes with your local changes by replaying your local commits on top of the pulled commits. This means that if there are any conflicts, you'll need to resolve them manually. Here are the steps to safely integrate remote changes and push your local changes:

### Step-by-Step Instructions

1. **Commit Local Changes:** Ensure all your local changes are committed.
   ```sh
   git add .
   git commit -m "Your commit message"
   ```

2. **Pull Remote Changes with Rebase:** This will fetch the remote changes and rebase your local commits on top of the remote commits.
   ```sh
   git pull origin main --rebase
   ```

   - If there are conflicts, Git will pause and allow you to resolve them.
   - After resolving conflicts, continue the rebase process:
     ```sh
     git add <resolved-file>
     git rebase --continue
     ```

3. **Push Local Changes:** After successfully rebasing, push your changes to the remote repository.
   ```sh
   git push -u origin main
   ```

### Example Markdown File for Documentation
````markdown name=docs/git-pull-rebase.md
# Integrating Remote Changes and Pushing Local Changes

## Step 1: Commit Local Changes
Ensure all your local changes are committed:
```sh
git add .
git commit -m "Your commit message"
```

## Step 2: Pull Remote Changes with Rebase
Pull the remote changes and rebase your local commits on top of the remote commits:
```sh
git pull origin main --rebase
```

### Resolving Conflicts
If there are conflicts, Git will pause and allow you to resolve them manually:
```sh
# Resolve conflicts in files
git add <resolved-file>
git rebase --continue
```

## Step 3: Push Local Changes
After successfully rebasing, push your changes to the remote repository:
```sh
git push -u origin main
```

### Troubleshooting
If you encounter issues during the rebase, you can abort the rebase process and return to the previous state:
```sh
git rebase --abort
```
````

By following these steps, you will ensure that your local changes are integrated with the remote changes and avoid overwriting any local modifications. Let me know if you need further assistance!
