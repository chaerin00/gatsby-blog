---
title: 'Setting Up CI/CD with Firebase and GitHub Actions'
date: 2021-11-22 16:05:75
category: DevOps
thumbnail: { thumbnailSrc }
draft: false
---

# What is CI/CD?

![https://www.redhat.com/cms/managed-files/ci-cd-flow-desktop_edited.png](https://www.redhat.com/cms/managed-files/ci-cd-flow-desktop_edited.png)

CI: Continuous Integration, involves regularly integrating new code changes into a shared repository after building and testing them. This helps in resolving conflicts when multiple developers work simultaneously on the same codebase.

For instance, a developer working on their branch can create a pull request (PR) before merging it. The CI process, as depicted in the following image, ensures that the changes undergo testing and build checks to verify their correctness.
![](https://images.velog.io/images/chaerin00/post/36e70a43-ff58-4716-a498-41cde3ceb573/image.png)

CD: Continuous Delivery & Continuous Deployment, encompasses continuous service delivery and deployment. These terms are used interchangeably and automate additional stages in the pipeline. Continuous delivery means automatically uploading the developer's changes after passing bug tests to the repository. Continuous deployment involves automatically releasing these changes from the repository to a production environment accessible to customers.

Such automation enhances visibility and facilitates effective communication between development and business teams.

# Setting Up Firebase Hosting with GitHub Actions for CI/CD

Implementing CI/CD for side projects facilitated quick comprehension of development team changes by other members, aiding QA and progress sharing processes. Here’s a simple guide to setting up CI/CD using Firebase Hosting and GitHub Actions.

## Using Firebase Hosting

Begin by installing firebase-tools and logging in to Firebase for hosting:

```bash
npm install -g firebase-tools
firebase login
```

## Project Setup

### 1. Create a Project and Connect it to a GitHub Repository

Assuming you already have a project and it’s connected to a repository:

```bash
npx create-react-app 'project-name'
git remote add 'repository'
```

Let's move on to configuring GitHub Actions for automating deployment.

[https://github.com/chaerin00/kakaofriends-shop](https://github.com/chaerin00/kakaofriends-shop)

![](https://images.velog.io/images/chaerin00/post/2ab511dc-c486-40a7-a875-35cfd062d9f1/image.png)

### 2. Create a project on [Firebase](https://console.firebase.google.com/?hl=ko).

![](https://images.velog.io/images/chaerin00/post/48dbfe6f-0214-413d-9745-e8a931abd0b3/image.png)

### 3. Set up Firebase for the project.

Run the `firebase init` command in the VS Code terminal.
![](https://images.velog.io/images/chaerin00/post/2bdaf477-343d-44b4-ac40-bb5f858fff53/image.png)
Refer to the comments and select the options that suit your project.

```jsx
$ firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  C:\Users\achrv\Desktop\3-1\kakao-shop

? Are you ready to proceed? Yes
/** We are going to use Firebase Hosting, so we will select the following option. */
? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

/** Since we created the project earlier, we will select the 'Use an existing project' option. */
? Please select an option: Use an existing project
/** Select the project created earlier. */
? Select a default Firebase project for this directory: kakaoshopclone (kakaoshopclone)
i  Using project kakaoshopclone (kakaoshopclone)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

/** Here, change the name of the public directory to 'build'. (This is to point to build/index.html after running yarn build.) */
? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? Yes
? File build/index.html already exists. Overwrite? No
i  Skipping write of build/index.html

i  Detected a .git folder at C:\Users\achrv\Desktop\3-1\kakao-shop
i  Authorizing with GitHub to upload your service account to a GitHub repository's secrets store.

Visit this URL on this device to log in:
https://github.com/login/oauth/authorize?client_id=89cf50f02ac6aaed3484&state=27656089&redirect_uri=http%3A%2F%2Flocalhost%3A9005&scope=read%3Auser%20repo%20public_repo

Waiting for authentication...

+  Success! Logged into GitHub as chaerin00

/** Enter your GitHub ID/repository name here. */
? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository) chaerin00/kakaofriends-shop

+  Created service account github-action-378041119 with Firebase Hosting admin permissions.
+  Uploaded service account JSON to GitHub as secret FIREBASE_SERVICE_ACCOUNT_KAKAOSHOPCLONE.
i  You can manage your secrets at https://github.com/chaerin00/kakaofriends-shop/settings/secrets.

? Set up the workflow to run a build script before every deploy? Yes
? What script should be run before every deploy? (npm ci && npm run build) y
/** I entered yarn && yarn build to use Yarn. */
? What script should be run before every deploy? yarn && yarn build

+  Created workflow file C:\Users\achrv\Desktop\3-1\kakao-shop\.github/workflows/firebase-hosting-pull-request.yml
? Set up automatic deployment to your site's live channel when a PR is merged? Yes
/** Set it to the default branch name of your repository. */
? What is the name of the GitHub branch associated with your site's live channel? develop

+  Created workflow file C:\Users\achrv\Desktop\3-1\kakao-shop\.github/workflows/firebase-hosting-merge.yml

i  Action required: Visit this URL to revoke authorization for the Firebase CLI GitHub OAuth App:
https://github.com/settings/connections/applications/89cf50f02ac6aaed3484
i  Action required: Push any new workflow file(s) to your repo

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

+  Firebase initialization complete!
```

It's all set up! Now, push your changes with `git push`.

Then, go to the actions tab of your GitHub repository, where you'll see the added workflow.

![](https://images.velog.io/images/chaerin00/post/66235ec6-5688-463d-bbac-a0b6159f1411/image.png)

## Verifying CI/CD Operations

Now, let's add some changes and create a pull request.

![](https://images.velog.io/images/chaerin00/post/1fae9849-eaee-4fb3-8d0d-50ed22097e3c/image.png)

In my case, it shows a failure during the `yarn build` process. Let's fix the errors and try pushing again.

![](https://images.velog.io/images/chaerin00/post/d494f769-1f52-458f-8238-38257652174f/image.png)

This time, all checks have passed. You can click on the link at the top to view the application with the changes from this pull request applied.

![](https://images.velog.io/images/chaerin00/post/3ed4dd5c-00ae-41f9-8274-50ad2766a0c9/image.png)

Now, merge the pull request. If you go back to GitHub Actions, you'll see that deployment is in progress.

![](https://images.velog.io/images/chaerin00/post/d8b27420-3f4d-42e2-a289-cc003df41555/image.png)

Finally, go to the Firebase Hosting tab that you set up earlier and visit the URL ending with `.web.app`. You'll see that your project has been successfully deployed!

![](https://images.velog.io/images/chaerin00/post/857bdb08-ef6b-4939-b909-e18d612f3f28/image.png)

# Exploring Files

### firebase-hosting-merge.yml

```jsx
name: Deploy to Firebase Hosting on merge
"on":
  push:
    branches:
      - develop
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: yarn && yarn build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT_KAKAOSHOPCLONE }}"
          channelId: live
          projectId: kakaoshopclone
```

### firebase-hosting-pull-request.yml

```jsx
name: Deploy to Firebase Hosting on PR
'on': pull_request
jobs:
  build_and_preview:
    if: '${{ github.event.pull_request.head.repo.full_name == github.repository }}'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: yarn && yarn build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_KAKAOSHOPCLONE }}'
          projectId: kakaoshopclone
```

In the `.github` directory of the project, we can observe the creation of the following files. Let's examine what each piece of code represents:

- **name**: Specifies the name of the workflow that runs in GitHub Actions.

  ![name](https://images.velog.io/images/chaerin00/post/5d23a2f0-903c-43c7-b0dd-85703338e81e/image.png)

  This defines the name of the GitHub Actions workflow to be executed.

- **on**: Defines under what circumstances the workflow should be triggered based on specific events.

```yml
'on':
  push:
    branches:
      - develop
```

- jobs

```yml
jobs:
  build_and_preview:
    if: '${{ github.event.pull_request.head.repo.full_name == github.repository }}'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: yarn && yarn build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_KAKAOSHOPCLONE }}'
          projectId: kakaoshopclone
```

1. **Workflows are composed of various jobs. In this case, there is one job named build_and_preview.**

2. Under each job, there are multiple steps.
   ![steps](https://images.velog.io/images/chaerin00/post/bf12c6dc-df48-4f6d-ac87-6908546d3457/image.png)

3. **runs-on** specifies the operating system where the job will execute. (In this case, it's Ubuntu.)

4. **uses** specifies actions that have already been created and are used within the workflow.

   > The first step uses an action called **actions/checkout@v2**. This action, provided by GitHub, checks out your code repository onto the runner to enable building and testing.

5. **with** provides arguments to the action being used.

---

References:

[https://resources.github.com/whitepapers/GitHub-Actions-Cheat-sheet/](https://resources.github.com/whitepapers/GitHub-Actions-Cheat-sheet/)
