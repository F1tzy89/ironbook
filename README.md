# Ironbook: self-hosted version

Ironbook is a personal workout and nutrition tracker that installs on your iPhone like a normal app. This folder is the whole app: there's no server to run.

```
index.html              the app
manifest.webmanifest    name and icon for the home screen
sw.js                   lets the app open offline
icon-*.png              app icons
```

## 1. Put it online (pick one)

### Option A: GitHub Pages (recommended; you'll use GitHub for sync anyway)

1. Sign up or log in at https://github.com (free).
2. Create a new repository: click **+** › **New repository**, name it `ironbook`, set it to **Public**, and click **Create repository**. The app's code is public. Your data never goes in this repository.
3. On the new repository page, click **uploading an existing file**. From a computer, drag in all the files (`index.html`, `manifest.webmanifest`, `sw.js`, `README.md` and the four `icon-…png` files). Click **Commit changes**.
4. Go to **Settings** › **Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**, then click **Save**.
5. After a minute or two the page shows your address, e.g. `https://YOUR-USERNAME.github.io/ironbook/`.

### Option B: Netlify Drop

1. Go to https://app.netlify.com/drop on a computer.
2. Drag this whole folder onto the page.
3. Create a free account when asked, so the site isn't deleted after an hour. You'll get an address like `https://something.netlify.app`.

The app must be served over **https** (both options do this) for the camera, offline mode and installing to work.

## 2. Install it on your iPhone

1. Open your address in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**, then **Add**.
3. Open Ironbook from the new icon. It runs full screen and works offline.

## 3. Bring over your data from the Claude version (optional)

1. In the old version (inside Claude): **Profile › Your data › Backup file**, and save it.
2. In the new app: **Profile › Backup and export › Restore from backup**, then pick that file.

## 4. Turn on sync (optional, recommended)

Sync keeps your phone, iPad or computer in step and doubles as a backup.

1. Create a GitHub token: https://github.com/settings/tokens/new?scopes=gist&description=Ironbook%20sync
   - Only the **gist** box should be ticked.
   - Set an expiration you're happy with (you'll need a new token when it expires).
2. In Ironbook: **Profile › Sync between devices**. Paste the token, choose a passphrase, and tap **Turn on sync**.
3. On each other device, enter the **same token and passphrase**.

How it works: your data is encrypted on your device (AES-256, with a key made from your passphrase) and saved as one file in a *secret* Gist on your GitHub account. GitHub only ever sees scrambled data. The token and passphrase are stored only on your devices.

**If you forget the passphrase, the synced copy can't be decrypted.** The data on each device is unaffected; turn sync off and on again with a new passphrase to start a fresh sync file.

Progress photos stay on the device where you took them; they aren't synced.

## 5. Food scanning

- **Scan barcode** uses your camera live and looks the product up in **Open Food Facts**, a free database of over 3 million products. The first time, iPhone asks for camera permission.
- **Not found?** Take a photo of the nutrition label. By default the text is read on your phone (free, no account). The first use downloads about 10 MB, and it can misread digits, so always check the numbers before saving. Once saved, scanning that barcode again logs it instantly.
- **Search foods** shows matching common foods as you type (about 140 built in, work offline), then tap **Search** to also look in Open Food Facts and USDA FoodData Central.
- Barcodes are checked against **Open Food Facts** first (best for UK, Irish and European products), then **USDA FoodData Central** (US products).

### Optional: free USDA key

USDA's shared demo key allows only about 30 lookups an hour. For 1,000 an hour, get a free key at https://fdc.nal.usda.gov/api-key-signup (it arrives by email) and paste it into **Profile › Food databases**. It's stored only on that device; don't put it in the repository.

### Optional: Claude for label reading

For more accurate label reading, and to log meals by describing them ("2 eggs and a slice of toast"), add an Anthropic API key in **Profile › Label reading**.

- Get a key at https://console.anthropic.com/settings/keys (needs a small amount of prepaid credit).
- Each label photo costs roughly a cent or less.
- The key is stored only on that device and never synced. Anyone using your phone's Ironbook could use it, so set a monthly spend limit in the Anthropic console.

## Updating the app

Replace `index.html` (and any other changed files) in your GitHub repository or Netlify site. Open the app twice and the new version loads. Your data is kept on the device and in sync.

## Troubleshooting

- **Camera doesn't start:** iPhone Settings › Safari › Camera › Allow. Then reopen the app. Or use "Use a photo".
- **Sync says the token was rejected:** the token expired or doesn't have the gist permission. Create a new one and turn sync on again with the same passphrase.
- **"Wrong passphrase":** it must match the one used on your first device exactly.
