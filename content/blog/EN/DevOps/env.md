---
title: 'Creating .env File in Github Actions'
date: 2022-02-18 17:05:00
category: DevOps
thumbnail: { thumbnailSrc }
draft: false
---

If the `.env` file is included in `.gitignore`, its contents won't be added during builds and deployments in Github Actions. For instance, without including the `env` file, `process.env.REACT_APP_GOOGLE_CLIENTID` would be missing, causing runtime errors.

To resolve this, you need to create a step in your YAML file to generate the `.env` file using environment variables stored in Github Secrets.

## 1. Register Environment Variables in Github Secrets

Github Secrets allows you to encrypt sensitive information such as access tokens or social login client IDs. To register secrets, navigate to your Github repository **Settings** → **Secrets** → **Actions**.

![Github Secrets](https://images.velog.io/images/chaerin00/post/4e7d4deb-a309-4afd-8b60-2856dffe826d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-18%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.05.01.png)

Ensure that environment variables used within your React app are prefixed with **REACT_APP**.

## 2. Add .env Setting Step in YAML File

```yaml
name: CI for pr dev
on:
  pull_request:
    branches:
      - dev
jobs:
  build:
    runs-on: ubuntu-latest
    steps:

      ...

      - name: Setting .env
        run: |
          echo "REACT_APP_GOOGLE_CLIENTID=${{ secrets.REACT_APP_GOOGLE_CLIENTID }}" >> .env
          echo "REACT_APP_API_DOMAIN=${{ secrets.REACT_APP_API_DOMAIN }}" >> .env
          echo "REACT_APP_KAKAO_REDIRECT=${{ secrets.REACT_APP_KAKAO_REDIRECT }}" >> .env
          echo "REACT_APP_KAKAO_CLIENTID=${{ secrets.REACT_APP_KAKAO_CLIENTID }}" >> .env
          echo "REACT_APP_NAVER_REDIRECT=${{ secrets.REACT_APP_NAVER_REDIRECT }}" >> .env
          echo "REACT_APP_NAVER_CLIENTID=${{ secrets.REACT_APP_NAVER_CLIENTID }}" >> .env
          echo "REACT_APP_NAVER_STATE_STRING=${{ secrets.REACT_APP_NAVER_STATE_STRING }}" >> .env
          cat .env

      ...

```

Use `echo "[Environment variable]=${{ secrets.[secret name]}}" >> .env` to populate the `.env` file with necessary environment variables. The `cat .env` command at the end is optional and is used here to verify the contents of the generated `.env` file.

When Github Actions runs, you'll see that the secrets are encrypted, as shown in the example below:

![Github Actions Output](https://images.velog.io/images/chaerin00/post/d836987e-871f-4097-a423-4a377893c3fb/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-18%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.16.50.png)

By following these steps, you ensure that your Github Actions workflows can access the necessary environment variables securely without exposing sensitive information.
