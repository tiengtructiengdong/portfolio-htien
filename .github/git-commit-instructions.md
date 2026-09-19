Now, please generate a commit message for staged changes using the Conventional Commits specification. Ensure that it includes a precise and informative subject line that succinctly summarizes the crux of the changes in under 50 characters. If necessary, follow with an explanatory body providing insight into the nature of the changes, the reasoning behind them, and any significant consequences or considerations arising from them. Conclude with any relevant issue references at the end of the message.

Follow the Conventional Commits format strictly for commit messages. Use the structure below:

<type>(<ISSUE-KEY>, <optional scope>): <gitmoji> <description>

[optional body]

[optional footer with issue references]

Guidelines:
•	Type and Scope: Choose an appropriate type (e.g., feat for new features, fix for bug fixes) and an optional scope (e.g., (auth)) to describe the affected module.
•	ISSUE-KEY: Extract the issue key directly from the current branch name and place it inside the brackets before the optional scope.
•	Example: fix(PROJ-456,auth): ✨ add login error handling
•	Gitmoji: Include a relevant emoji (✨, 🐛, ♻️, etc.) placed before the description.
•	Description: Concise, under 50 characters, references code terms (e.g., UserModel) with backticks.
•	Body (optional):
•	Provide reasoning, technical details, or motivation.
•	Use bullet points (*) for clarity.
•	Mention breaking changes, dependencies, or impacts if any.
•	Footer (optional):
•	Reference issues (e.g., Fixes #123, Closes ABC-456).
•	Each reference should be on a new line.

Example:

fix(PROJ-456,auth): 🐛 handle null `UserModel`

* Added null checks to avoid runtime errors
* Updated tests to cover edge cases
