# Mastering GitKraken 🦑

![GitKraken](https://velog.velcdn.com/images/chaerin00/post/ac2c9fdf-d6b8-4552-b6a3-9de13b490ec8/gitkraken.png)

When I first started using Git, I often found myself losing entire work and accidentally deleting important code while resolving conflicts. As I began collaborating with more people on projects, I turned to GitKraken to better manage my Git workflows, and I've been using it religiously for over a year now.

Currently, I switch between the terminal and GitKraken, but using a Git GUI has significantly enhanced my overall understanding of Git. It has reduced the likelihood of mistakes when working in the terminal later on.

# Basic Usage

## Open Repo

![Open Repo](https://images.velog.io/images/chaerin00/post/02544dac-ebfe-45ba-81ce-2a24eaec36f3/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.46.24.png)

On the home screen, you can open repositories or even clone them using `git clone`.

![Open a Repository](https://images.velog.io/images/chaerin00/post/89d6ea81-2f1c-4e22-8bbd-2c04596699cb/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.48.25.png)

Using "Open a Repository" allows you to open a repository, leading you to the following screen:

![Repository View](https://images.velog.io/images/chaerin00/post/b156efc4-e9d7-49ff-9273-436cefd57768/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.49.58.png)

Here, let's explore the meaning of each section.

## Branch

Branches are categorized into `local` and `remote`. Double-clicking on a branch allows you to check it out. If you check out a branch from `remote`, it will also be added to the list of branches in `local`.

![Branches](https://images.velog.io/images/chaerin00/post/60f85c1c-4f59-4909-9ae4-836b3eaecd5a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.51.39.png)

## Git Graph

The central graph shows how branches diverge, merge, and their current status. The check mark indicates the branch you currently have checked out. Each branch has icons next to it:

- **Local icon**: Indicates the position of the current local branch.
- **Remote icons**: Other icons (like GitHub organization logos) indicate the position of the remote branch for that branch.

These icons help you quickly see if there are differences between your local branch and its remote counterpart.

![Git Graph](https://images.velog.io/images/chaerin00/post/7721cf68-8a2b-45d0-988f-81cbe324e690/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.00.28.png)

## Changes & Commit

On the far right, you can see changes from commits or current edits.

![Changes](https://images.velog.io/images/chaerin00/post/cce622bc-5ac2-4bfa-a09f-b21db6301e6e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.41.15.png)

Clicking on "view change" shows a screen where you can view file changes. You can stage/unstage changes and enter commit messages here. Staging is equivalent to using `git add`. You can stage individual files or use the "stage all changes" button for `git add .`.

The red trash bin icon discards all changes. I often use this after reviewing changes to commit what's needed and discard unnecessary changes. However, be cautious as this action cannot be undone once confirmed. 👍🏻

## Push, Pull, Stash, Pop

![Push Pull](https://images.velog.io/images/chaerin00/post/4af482ae-643a-4e0b-8bcc-bafbfa3eab93/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.52.59.png)

At the top, you can push, pull from the current branch, stash changes that are not yet committed, and pop them back.

If your local branch is behind the remote branch, indicated by the icons discussed earlier, you can use the push or pull buttons or right-click on the branch and select "pull (fast-forward if possible)".

![Pull Example](https://images.velog.io/images/chaerin00/post/263afbdc-3887-4891-98a7-302dbde290ad/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.14.29.png)

If you need to switch to another branch but can't due to changes in the current branch, you can use `stash`.

![Stash Example](https://images.velog.io/images/chaerin00/post/f8630e9b-f35c-42f0-bb86-7db3ad31170b/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.00.22.png)

Clicking the "stash" button creates a stash where you can safely store changes. Clicking "pop" restores these changes. You can delete a stash by right-clicking on the stash icon.

# Advanced Usage

## Rebase

Before creating a pull request, I often use `rebase` to resolve conflicts with the `develop` branch beforehand.

Rebase is a command that changes the starting point (base) of the current branch. When you perform a rebase, GitKraken applies the commits of your branch one by one onto the chosen starting point.

![Rebase](https://images.velog.io/images/chaerin00/post/c3bf50e8-ae90-4afa-a7ef-34e3e821886c/rebase.png)

If updates occur on `develop` causing your current branch to be out of sync with the latest changes on remote develop, there is a possibility of conflicts. In such cases, I use `rebase` to align my current branch with the starting point from remote develop.

![Rebase Example](https://images.velog.io/images/chaerin00/post/e276ceb3-ca00-462d-93f9-3d5c16e64a86/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.35.57.png)

When the `rebase-test` branch is checked out and has the remote icon attached to `develop`, right-click on `develop` and select `Rebase current branch name onto origin/develop`.

![Rebase Context Menu](https://images.velog.io/images/chaerin00/post/cdeda57d-0e61-4e6a-899e-76cb3a1fdde4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.40.11.png)

If conflicts arise during this process, you will see a screen like the one below.

![Rebase Conflict](https://images.velog.io/images/chaerin00/post/d2039377-96d2-41f7-bd97-8527fc95172f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.48.40.png)

Select the conflicting file, choose the desired changes, and click "Save" in the upper right corner.

![Resolve Conflict](https://images.velog.io/images/chaerin00/post/a57007e1-d5e8-4528-9c2d-49765aa0d301/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.49.27.png)

After completing the rebase, you can see that the `rebase-test` branch now starts from remote develop.

![Rebased Branch](https://images.velog.io/images/chaerin00/post/31b65447-5dff-477e-9d78-be56b59aa6c1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.53.34.png)

+) If `rebase-test` has been pushed to remote before, you need to force-push after rebase.

## Cherry Pick

If you want to apply commits from another branch to your current branch, you can use the `cherry pick` feature.

![Cherry Pick](https://images.velog.io/images/chaerin00/post/a454b73f-9533-4cd7-9397-7bd5578e0f9e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.00.04.png)

For example, if I'm on the `mine` branch and want to apply a commit from `cherry-pick-test` to `mine`, I right-click on the commit "cherry-pick-test commit" and select `Cherry pick commit`.

![Cherry Pick Context Menu](https://images.velog.io/images/chaerin00/post/b64984fc-fb4a-4514-9f45-bde1578d4669/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.03.13.png)

You'll see the same commit applied to `mine` branch as well.

![Cherry Pick Applied](https://images.velog.io/images/chaerin00/post/4f504549-c36c-42c2-ab5c-89b51f0eae2d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.04.08.png)

<hr/>

I've summarized the usage I've discovered over a year of using GitKraken. If there are any corrections or additional information you'd like to know, please feel free to let me know in the comments 😊
