const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const {db, pgp} = require('../src/db');
const bcrypt = require('bcryptjs');
const {randomUUID} = require('node:crypto');

chai.use(chaiHttp);
const {expect} = chai;

// Root hook: close the shared database pool after all tests in this process.
// Keep other suites in this file or reuse these imports in separate files.
after(() => {
  pgp.end();
});

describe('Welcome route', () => {
  it('returns the default welcome message', async () => {
    const res = await chai.request(app).get('/welcome');
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({
      status: 'success',
      message: 'Welcome!',
    });
  });
});

describe('POST /register', () => {
  const testUser = {
    username: `lab10_${randomUUID()}`,
    password: 'TestPassword123!',
  };

  async function removeTestUser() {
    await db.none('DELETE FROM users WHERE username = $1', [testUser.username]);
  }

  beforeEach(removeTestUser);
  afterEach(removeTestUser);

  it('creates exactly one user for valid input', async () => {
    const res = await chai.request(app).post('/register').send(testUser);

    expect(res).to.have.status(201);
    expect(res.body.message).to.equal('Registration successful');

    const rows = await db.any(
      'SELECT username, password FROM users WHERE username = $1',
      [testUser.username]
    );
    expect(rows).to.have.lengthOf(1);
    expect(rows[0].username).to.equal(testUser.username);
    expect(rows[0].password).not.to.equal(testUser.password);
    expect(await bcrypt.compare(testUser.password, rows[0].password)).to.equal(
      true
    );
  });

  it('rejects a missing password and inserts no user', async () => {
    const res = await chai
      .request(app)
      .post('/register')
      .send({username: testUser.username});

    expect(res).to.have.status(400);
    expect(res.body.message).to.equal('Invalid input');

    const rows = await db.any('SELECT user_id FROM users WHERE username = $1', [
      testUser.username,
    ]);
    expect(rows).to.have.lengthOf(0);
  });
});

describe('GET /profile', () => {
  const profileUser = {
    username: `lab10_profile_${randomUUID()}`,
    password: 'TestPassword123!',
  };
  let agent;

  before(async () => {
    const hashedPassword = await bcrypt.hash(profileUser.password, 10);
    await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [
      profileUser.username,
      hashedPassword,
    ]);
  });

  beforeEach(() => {
    agent = chai.request.agent(app);
  });

  afterEach(async () => {
    if (agent) await agent.close();
  });

  after(async () => {
    await db.none('DELETE FROM users WHERE username = $1', [
      profileUser.username,
    ]);
  });

  it('rejects an unauthenticated request', async () => {
    const res = await agent.get('/profile').redirects(0);
    expect(res).to.have.status(401);
    expect(res.body.message).to.equal('Not authenticated');
  });

  it('returns the profile after successful login', async () => {
    const login = await agent.post('/login').send(profileUser).redirects(0);
    expect(login).to.have.status(200);
    expect(login.body.message).to.equal('Login successful');
    expect(login).to.have.header('set-cookie');

    const res = await agent.get('/profile').redirects(0);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({username: profileUser.username});
  });
});