# User Acceptance Test (UAT) Plan: Geography Game

## 1. Scope

| Feature | Linked user story / requirement |
| ------- | ------------------------------- |
| F1: Account registration and sign-in | As a new player, I can create an account and sign in so my scores are tied to me. [link to team user story / use case diagram] |
| F2: Answering a country question | As a player, I am shown a question and select a country, and I am told whether my answer was right. [link to team user story] |
| F3: Leaderboard | As a player, I can see player scores ranked on a leaderboard. [link to team user story] |

## 2. Acceptance Criteria

**F1: Account registration and sign-in**
- AC1.1: Submitting registration with a unique username and a password of at least 8 characters completes registration, and the user can then sign in with those credentials.
- AC1.2: Submitting registration without a password does not complete registration, and the feedback identifies the missing password.
- AC1.3: Signing in with a wrong password does not grant access to signed-in pages, and an error message is shown.

**F2: Answering a country question**
- AC2.1: Selecting the correct country shows feedback that the answer is correct, and the score increases by [points per correct answer].
- AC2.2: Selecting an incorrect country shows feedback that the answer is incorrect, and the score does not increase.

**F3: Leaderboard**
- AC3.1: After a player earns a score, the player's username appears on the leaderboard with that score.
- AC3.2: A newly registered player who has not played a game loads the leaderboard without an error and is not shown with a score.

## 3. Environment

- **Where:** Localhost. From `ProjectSourceCode/`, start the app with `docker compose up` and open `http://localhost:3000`.
- **Browser / device:** [browser and version], desktop.
- **Version tested:** Commit [hash]. Record the actual commit when the tests are executed.
- **Test data rule:** Use usernames that do not already exist in the database.

## 4. Testers

- **Intended users:** Students comfortable with web apps who have not seen the implementation.
- **Planned tester IDs:** T1, T2, T3.
- **Recruited and coordinated by:** [team member].
- **Limitations:** If classmates or teammates must act as proxies for outside users, this will be documented in the final report.
- Testers receive only the user steps in the table, with no coaching.

## 5. Test Cases

| Test ID | Feature / requirement | Acceptance criterion | Preconditions | Test data | User steps | Expected result | Tester ID | Actual result | Status | Issue / follow-up |
| ------- | --------------------- | -------------------- | ------------- | --------- | ---------- | --------------- | --------- | ------------- | ------ | ----------------- |
| UAT-01 | F1: Registration and sign-in | AC1.1 | Registration page is open; user is signed out; username is not already taken | Username `uat_t1_player`; password `GamePass123!` | 1. Enter the username. 2. Enter the password. 3. Submit. 4. Go to the sign-in page. 5. Sign in with the same username and password. | Registration completes with a confirmation or moves to the next page. Sign-in succeeds and the user reaches a signed-in page. | Planned: T1 | Not run | Not run | None yet |
| UAT-02 | F1: Registration and sign-in | AC1.2 | Registration page is open; user is signed out | Username `uat_t2_player`; password left blank | 1. Enter the username. 2. Leave the password blank. 3. Submit. | Registration does not complete. Feedback identifies the missing password. | Planned: T2 | Not run | Not run | None yet |
| UAT-03 | F1: Registration and sign-in | AC1.3 | Account from UAT-01 exists; user is signed out | Username `uat_t1_player`; password `WrongPass999` | 1. Open the sign-in page. 2. Enter the username. 3. Enter the wrong password. 4. Submit. | Sign-in does not complete. An error message is shown. The user cannot open signed-in pages. | Planned: T1 | Not run | Not run | None yet |
| UAT-04 | F2: Answering a country question | AC2.1 | User is signed in; a new game is started; a question is displayed; starting score is noted | The country that correctly answers the displayed question | 1. Read the question. 2. Select the country that answers it. 3. Observe the feedback and the score. | Feedback says the answer is correct. Score increases by [points per correct answer]. | Planned: T1 | Not run | Not run | None yet |
| UAT-05 | F2: Answering a country question | AC2.2 | User is signed in; a new game is started; a question is displayed; starting score is noted | A country that does not answer the displayed question | 1. Read the question. 2. Select a wrong country. 3. Observe the feedback and the score. | Feedback says the answer is incorrect. Score does not increase. | Planned: T2 | Not run | Not run | None yet |
| UAT-06 | F3: Leaderboard | AC3.1 | User is signed in; user has earned a score above 0 in a game | Score shown to the user at the end of the game | 1. Finish a game or answer a question correctly. 2. Open the leaderboard. 3. Find your username. | Username is listed with the score the user earned. | Planned: T3 | Not run | Not run | None yet |
| UAT-07 | F3: Leaderboard | AC3.2 | Newly registered user; no games played | Username `uat_t3_player`; password `GamePass123!` | 1. Register and sign in. 2. Without playing, open the leaderboard. | Leaderboard loads without an error. Username is not shown with a score. | Planned: T3 | Not run | Not run | None yet |

## 6. Recording Results

All results fields are **Not run** in this lab. After execution during the project testing milestone:
- Record what actually happened in **Actual result**.
- Mark each case **Pass**, **Fail**, or **Blocked**.
- Describe issues in **Issue / follow-up**, and record the outcome of retesting fixes.
- Include the completed plan and observations in the final project report.