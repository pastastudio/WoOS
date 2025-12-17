# Git Commit Message Convention

> This is adapted from [Angular&#39;s commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

### TL;DR:

Messages must be matched by the following regex:

```js
/^(revert: )?(chore|build|ci|ui|api|docs|feat|fix|perf|refactor|revert|style|test|types)(\(.+\))?!?: .{1,72}/;
```

### Examples

**Feature hinzufügen (API-Modul):**

```
feat(api): add user authentication
```

**Bugfix im UI:**

```
fix(ui): correct button alignment
```

**Dokumentation aktualisieren:**

```
docs: update README with setup instructions
```

**Performance-Verbesserung im Core:**

```
perf(core): optimize database queries

BREAKING CHANGE: query format has changed
```

**Refactoring im TypeScript-Bereich:**

```
refactor(types): simplify user type definitions
```

**Test hinzufügen:**

```
test(api): add tests for login endpoint
```

**Build-Konfiguration ändern:**

```
build: update webpack config
```

**CI-Workflow anpassen:**

```
ci: add code coverage step
```

**Chore (Routine-Aufgabe):**

```
chore: update dependencies
```

**Style-Anpassung:**

```
style(ui): format header component
```

**Revert eines Commits:**

```
revert: feat(api): add user authentication

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

**Typen aktualisieren:**

```
types: update user interface
```

**API-Scope Beispiel:**

```
api(user): add endpoint for user profile
```

**UI-Scope Beispiel:**

```
ui(header): fix logo alignment
```

### Full Message Format

A commit message consists of a **header**, **body** and **footer**. The header has a **type**, **scope** and **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.
If the commit contains **Breaking Changes**, a `!` can be added before the `:` as an indicator.

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body, it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

If the prefix is `feat`, `fix` or `perf`, it will appear in the changelog. However, if there is any [BREAKING CHANGE](#footer), the commit will always appear in the changelog.

Other prefixes are up to your discretion. Suggested prefixes are `docs`, `chore`, `style`, `refactor`, and `test` for non-changelog related tasks.

### Scope

The scope could be anything specifying the place of the commit change. For example `GuildMember`, `Guild`, `Message`, `TextChannel` etc...

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.
