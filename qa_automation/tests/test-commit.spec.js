// git checkout -b initproject

// ...\playwright_practice_project\qa_automation>git add tests/test-commit.spec.js

// ...\playwright_practice_project\qa_automation>git status
// On branch initproject
// No commits yet
// Changes to be committed:
//   (use "git rm --cached <file>..." to unstage)
//         new file:   tests/test-commit.spec.js
// Untracked files:
//   (use "git add <file>..." to include in what will be committed)
//         .gitignore
//         package-lock.json
//         package.json
//         playwright.config.js
//         tests/example.spec.js
//         tests/module-1-tasks.spec.js

// ...\playwright_practice_project\qa_automation>git commit -m "feat: test commit for environment setup verification"
// [initproject (root-commit) 443163d] feat: test commit for environment setup verification
//  1 file changed, 2 insertions(+)
//  create mode 100644 tests/test-commit.spec.js

// ...\playwright_practice_project\qa_automation>git log --oneline
// 443163d (HEAD -> initproject) feat: test commit for environment setup verification