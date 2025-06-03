# NetMD Auto Visits Bot

This project simulates traffic to https://netmd.org from Latin America using Puppeteer with proxies.

## Setup

1. Clone this repo or upload the files to GitHub.
2. On Render.com, deploy as a Web Service.
3. Use an external cron service (e.g., cron-job.org) to trigger the Render URL 3 times a day.

## Start command
```
npm install
npm start
```

## Note
Ensure the proxies are valid. Logs will show which country/proxy succeeded or failed.