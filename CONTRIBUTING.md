# Contributing to *browser-tools*

## **Instructions**

### Issues
- Add new requirement/issue/questions in issue tracker of repository.
- Issue(s) raised on repository should preferably have minimum reproducible code whereever relevant for others to reproduce and work on issue.

### Pull Requests
- Each PR should have a corresponding issue available in issue tracker of repository.
- To raise a PR, fork **browser-tools** 
- Clone the project in your local machine
```
git clone https://github.com/AbdealiJK/browser-tools.git
cd browser-tools
```
- Create a python virtual environment
- Install requirements of project into virtual environment.
- Checkout branch with name relevant to issue issue you are working
```
git checkout -b short-issue-desc 
# OR
git checkout -b fix-issue-num
# OR 
git checkout -b add-issue-num
```
- Make changes as per the issue you are working on and add/modify testfile(s) if you are adding new feature or fixing bugs in existing code
- Before commiting, verify if the changes are working in your local system
- Add commit for your changes with message title and message description brifly explaining the approach
    - Add a title to your commit message (upto 72 characters)
    - Write a clear description explaining why you are making this change
    - Add a "Fixes #ID" or "Resolves #ID" at the end to note that this commit closes an issue
    - Follow guidelines described in https://cbea.ms/git-commit/
```
<location of change - folder/file/func>: A short title goes here

A long description of what you are trying to change in this commit.
Here explain why this change is required. What other approaches you have thought about

Fixes #ID
```
- Push the changes in your fork 
```
git push origin <branch-name>
```
- Got to github, and raise a PR `AbdealiJK/browser-tools:master` and wait for a review.
- Maintainer(s) of the project will review and approve the CI flow to validate changes across different environments.
- If changes are valid and passes all the tests, maintainer(s) will accept the PR(s)
