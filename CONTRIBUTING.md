# Contributing to react-swift-reveal

First off, thank you for considering contributing to react-swift-reveal. It's people like you that make react-swift-reveal such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [issues](./issues) if there's already an open issue addressing your concerns. If not, feel free to [open a new issue](./issues/new).

## Fork & create a branch

If this is something you think you can fix, then [fork the repository](./fork) and create a branch with a descriptive name.

A good branch name would be (where issue #123 is the ticket you're working on):

```sh
git checkout -b fix-123
```

## Make your changes

**Here's the most likely process you'll follow in order to contribute:**

1. Fork the project & clone locally. Follow the initial setup [here](#).
2. Create a branch, e.g. `git checkout -b my-feature-branch`.
3. Work on the changes. Make sure you adhere to the code style guide.
4. Push the branch to the GitHub project.
5. Open a Pull Request to the master branch.

## Create a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with the latest changes from the main project's master branch:

```sh
git remote add upstream git@github.com:original-owner-username/react-swift-reveal.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master and push it!

```sh
git checkout fix-123
git rebase master
git push --set-upstream origin fix-123
```

Finally, go to GitHub and [make a Pull Request](./compare).

Fill in the form for the Pull Request including as much information as possible about your changes.

## Wait for Review

Now the request is created, wait for the maintainers to review your changes. If they suggest changes,:

1. Make the required updates.
2. Re-run the test suite to ensure tests are still passing.
3.Commint your changes to your branch.
```sh
git commit -am "Address review feedback"
```
4. Push your changes to your branch.
```sh
git push origin fix-123
```


## Deploy

If everything goes well, your Pull Request will be merged to the master branch.

## Celebrate

You did it! You contributed to react-swift-reveal. Now, you can celebrate. 🎉

