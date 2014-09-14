App = Ember.Application.create();

auth0Ember = Ember.Object.extend(Auth0LockMixin, {
  cid: 'VzuKNL8tnVmuFlblflAVNZi5GOi3ve2g',
  domain: 'wywy.auth0.com'
});

auth = auth0Ember.create();

test_profile = {
  "email": "marios@demo.com",
  "email_verified": false,
  "clientID": "VzuKNL8tnVmuFlblflAVNZi5GOi3ve2g",
  "picture": "https://secure.gravatar.com/avatar/87470a18309979150ca3d801c4df06c2?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png",
  "user_id": "auth0|5414526d4649eee9d9000ea5",
  "name": "marios@demo.com",
  "nickname": "marios",
  "identities": [{
    "user_id": "5414526d4649eee9d9000ea5",
    "provider": "auth0",
    "connection": "Username-Password-Authentication",
    "isSocial": false
  }],
  "created_at": "2014-09-13T14:22:26.098Z",
  "global_client_id": "0csc0bC3itmCX9tpjMfuPwAIfp4wYoy1"
};

test_token = "sdfkjhgkdsfdfshksdhklfsd"; // :)

auth = auth0Ember.create();

QUnit.test( "Make sure shit works", function( assert ) {
  assert.ok( 1 == "1");
});

QUnit.test( "auth setups properly ", function( assert ) {
  assert.ok( auth != undefined);
  assert.ok( auth.lock != undefined);  
});

QUnit.test("Auth triggers handle profile correctly", function(assert) {
  auth._afterSignIn({profile: test_profile, token: test_token});
  assert.equal(auth.get("currentUser"), test_profile);
  assert.equal(auth.get("currentToken"), test_token);
});

