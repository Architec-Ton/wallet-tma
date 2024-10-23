# Wallet TMA

Wallet TMA is a non-custodial wallet based on the TON blockchain, focused on combining all Telegram gaming Mini Apps in one place.

A large team of developers and marketers is working on the development of a large ecosystem tied around the TON and P2E sectors. We are working on developing a user-friendly, understandable and secure system for all gamers.

---

# Dev mode

Install pnpm:

```bash
npm install -g pnpm
```

Enter the command:

```bash
pnpm dev
```

---

### Installation

Clone this repository to set up the project locally. Be sure to install `docker`, then proceed to the next instructions:

```bash
docker build . -t <container_name>
docker run <container_name>
```

---

### Project Structure

```bash
	    └── src/
        ├── assets       # all the static files like images, json-files for lottie, etc.
        ├── components   # reusable UI components
        ├── features     # states and actions for business features
        ├── hooks        # reusable state hooks
        ├── i18n         # translation provider and files
        ├── pages        # project pages
        ├── store        # project store configuration
        └── utils        # utility modules
```

---

### Project Resources

[Russian Telegram channel](https://t.me/architecton_tech)

[English Telegram channel](https://t.me/architecton_eu)

[Chat for dicsussions](https://t.me/architec_ton)


# Install certbot

```bash
apt install git nginx certbot python3-certbot-nginx -y
```

# Install certs

```bash
certbot --nginx --register-unsafely-without-email -d DOMAIN_NAME
```
