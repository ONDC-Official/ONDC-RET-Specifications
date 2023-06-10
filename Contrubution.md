# Project Name Contributor Guide

## Table of Contents

1. [Getting Started](#getting-started)
   - [Setting up the Development Environment](#setting-up-the-development-environment)
   - [Forking the Repository](#forking-the-repository)
   - [Cloning the Repository](#cloning-the-repository)
2. [Contributing](#contributing)
   - [Creating a New Feature](#creating-a-new-feature)
   - [Fixing Bugs](#fixing-bugs)
3. [Code Review](#code-review)
4. [Testing](#testing)
5. [Submitting Pull Requests](#submitting-pull-requests)
6. [Community Guidelines](#community-guidelines)
7. [Getting Help](#getting-help)

## Getting Started

To contribute to Project Name, follow the steps below to set up your development environment, fork the repository, and clone it locally.

### Setting up the Development Environment

1. Install `swagger-cli` by running the following command:

```
npm install -g swagger-cli
```

This command will install the Swagger CLI globally on your machine.

## Generate the resolved OpenAPI definition file on-demand

- Run the following command

```
./build_module {module_name}
```

- If the command runs successfully, you should see an output like this,

```
Created api/{module_name}/build/{module_name}.yaml from api/{module_name}/build/{module_name}.yaml
```

### Forking the Repository

1. Navigate to the [Project Name repository](https://github.com/your-username/project-name) on GitHub.
2. Click the "Fork" button in the top-right corner of the repository page.
3. After forking, you will have your own copy of the repository under your GitHub account.

### Cloning the Repository

1. On your GitHub account, navigate to the forked repository (e.g., `https://github.com/your-username/project-name`).
2. Click the "Code" button and copy the repository's URL.
3. Open your terminal or command prompt.
4. Change the current working directory to the location where you want to clone the repository.
5. Run the following command, replacing `<repository-url>` with the URL you copied in step 2:

```
git clone <repository-url>
```

The repository will be cloned to your local machine.

Now that you have set up your development environment and cloned the repository, you are ready to start contributing to Project Name!

## Contributing

We welcome contributions from the community to improve and enhance the project. If you have an idea for a new feature that could benefit the project, we encourage you to contribute by implementing it. Here's how you can get started:

### Creating a New Feature

1. **Identify the Need**: Discuss your proposed feature with the community to ensure it aligns with the project's goals and adds value to the users.
2. **Design and Implementation**: Create a design proposal or outline the implementation plan for the feature. Collaborate with the community to gather feedback and refine your ideas. Fork the repository, create a new branch, and start implementing the feature based on the agreed-upon design. Follow the project's coding conventions and guidelines.
3. **Submit a Pull Request**: Once your feature is complete and implemented, submit a pull request to merge your changes into the main branch. Provide a clear description of the feature and its benefits. The project maintainers and community will review your pull request.
4. **Review and Iteration**: Be open to feedback and be prepared to make further improvements based on the suggestions received. Collaborate with the reviewers to address any concerns or issues that arise during the review process.
5. **Merge and Deployment**: Once your pull request is approved, it will be merged into the main branch. The feature will be deployed in future releases of the project.

By contributing a new feature, you not only enhance the project but also contribute to its growth and success. We appreciate your effort and value your contributions.

If you need any assistance or have any questions during the process, feel free to reach out to the project maintainers or the community. Together, we can make a positive impact on the project!

### Fixing Bugs

If you encounter a bug or issue in the project, we appreciate your help in fixing it for the upcoming bugfix release. Follow the steps below to contribute towards bug fixing:

1. **Identify the Bug**: Start by identifying and reproducing the bug. Use the project's issue tracker to check if the bug has already been reported. If not, consider opening a new issue to track the bug.
2. **Propose a Fix**: Once you have a good understanding of the bug, propose a fix for it. This fix should address the root cause and ensure that it doesn't introduce any new issues.
3. **Submit a Pull Request**: Once you are confident in your bug fix, submit a pull request to merge your changes into the main branch. Provide a clear description of the bug and how your fix addresses it. The project maintainers and community will review your pull request.
4. **Review and Iteration**: Be open to feedback and be prepared to make further improvements based on the suggestions received. Collaborate with the reviewers to address any concerns or issues that arise during the review process.
5. **Merge and Deployment**: Once your pull request is approved, it will be merged into the main branch. The bug fix will be included in the upcoming bugfix release of the project.

Your contributions in fixing bugs for the bugfix release help improve the project's stability and reliability. We appreciate your effort and value your contributions.

If you need any assistance or have any questions during the bug fixing process, feel free to reach out to the project maintainers or the community. Together, we can make the project even better!

## Code Review

1. **Provide constructive feedback**: Offer suggestions and improvements rather than focusing solely on pointing out mistakes.
2. **Focus on code quality**: Evaluate the code for readability, maintainability, and adherence to best practices.
3. **Identify potential issues**: Look for bugs, logic errors, performance concerns, and security vulnerabilities.
4. **Offer explanations**: Provide clear explanations for your suggestions and highlight the impact of proposed changes.

By following these guidelines, we can foster a productive code review process that promotes continuous improvement.

## Submitting Pull Requests

We welcome and encourage pull requests from the community. To submit a pull request, please follow these steps:

1. Ensure that you have forked the repository and cloned it to your local machine. (Refer to the "Cloning the Repository" section for instructions.)
2. Create a new branch on your local repository to work on your changes. Use a descriptive branch name that summarizes the purpose of your changes.
3. Make the necessary changes and commits on your local branch.
4. Before submitting a pull request, ensure that your changes adhere to the project's coding conventions and guidelines.
5. Pull the latest changes from the upstream repository to avoid conflicts:

```
git pull upstream main
```

6. Resolve any conflicts that arise from the above step.
7. Push your branch to your forked repository:

```
git push origin your-branch-name
```

8. Visit the original repository on GitHub and switch to your newly pushed branch.
9. Click on the "New Pull Request" button.
10. Fill out the pull request template with the following information:

---

 **Description**

 Briefly describe the purpose of your pull request.

 **Changes Made**

 Provide a concise summary of the changes you have made.

 **Associated Discussions/Issues**

- [Discussion/Issue 1](link-to-discussion/issue-1) - Status: Open/Closed
- [Discussion/Issue 2](link-to-discussion/issue-2) - Status: Open/Closed
- ...

 **Backward Compatibility**

 Describe any backward compatibility considerations or any impact on existing functionality. Provide proof or evidence to support backward compatibility claims, if applicable.

 **User Contributions**

 If multiple users have contributed to this pull request, mention their usernames or handles and their specific contributions.

 **Checklist**

- [ ] I have followed the project's coding conventions and guidelines.

---

Make sure to fill out the pull request template with the required information before submitting your pull request.

We appreciate your contributions and will review your pull request as soon as possible. Thank you for your contribution!

## Community Guidelines

- **Respect and Inclusivity**: Treat all community members with respect and foster an inclusive environment that welcomes diverse perspectives.
- **Positive Communication**: Engage in constructive and positive communication, focusing on the issues at hand and avoiding personal attacks.
- **Embrace Diversity**: Celebrate the diversity of our community and create opportunities for all voices to be heard and valued.
- **Collaboration and Support**: Encourage collaboration, support one another, and promote a culture of mentoring and knowledge sharing.
- **Professional Conduct**: Maintain professional behavior, refrain from harassment or discrimination, and follow project-specific guidelines.
- **Ask and Offer Help**: Be open to asking for help when needed and provide assistance to fellow community members.
- **Constructive Feedback**: Provide constructive feedback and suggestions, helping others improve their contributions.
- **Report Violations**: Promptly report any violations of the community guidelines to the appropriate project maintainers or moderators.
- **Continual Learning**: Embrace a growth mindset, challenge assumptions, and actively participate in discussions that contribute to the project's improvement.

By following these guide principles, we create a welcoming and collaborative community that values respect, inclusivity, and continuous learning.

## Getting Help

If you need assistance, have questions, or encounter issues while contributing to the project, there are several resources available to help you:

1. **Community Support**: Join our developer portal community forum to connect with fellow contributors, ask questions, and seek guidance. The forum provides a platform for interactive discussions and knowledge sharing among the community.
2. **GitHub Discussions**: Utilize the GitHub Discussions feature of the project repository to participate in project-related discussions, ask questions, and get support. You can find existing discussions or start a new thread to engage with the community.
3. **Issue Tracker**: Check the project's issue tracker, such as GitHub Issues, to see if your question or issue has been addressed before. You can search for similar topics or create a new issue if you can't find a relevant discussion. Please provide detailed information about your problem or question to receive prompt and accurate assistance.

The community and project maintainers are here to support you throughout your contribution journey. Don't hesitate to seek help, ask questions, and actively participate in discussions!
