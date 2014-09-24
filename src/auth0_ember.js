var Auth0LockMixin = Ember.Mixin.create({

  init: function() {
    cid = this.get('cid');
    domain = this.get('domain');

    this.set('lock', function() {
      lock = new Auth0Lock(cid, domain);
      return lock;
    });
  },
  
  currentUser: null,

  options: {
    focusInput: true,
    popup: true
  },

  // Handle appear
  show: function() {
    instance = this;
    this.lock().show(this.get('options'), function(err, profile, token){
      instance._afterSignIn({err: err, profile: profile, token: token});
    });
  },
  showSignin: function() {
    instance = this;
    this.lock().showSignin(this.get('options'), function(err, profile, token){
      instance._afterSignIn({err: err, profile: profile, token: token});
    });
  },
  showSignup: function() {
    instance = this;
    this.lock().showSignup(this.get('options'), function(err, profile, token){
      instance._afterSignIn({err: err, profile: profile, token: token});
    });
  },
  showReset: function() {
    this.lock().showReset(this.get('options'), function(err, profile, token){
      instance._afterReset(err);
    });
  },

  // Some helpers
  userLoggedIn: function() {
    var user = this.get('currentUser');
    var logged_in = false
    if (user != null){
      logged_in = true;
    }
    return logged_in ;
  }.property('currentUser'),

  // Handle events
  _afterSignIn: function(data){
    if(data.err == null) {
      this.set("currentUser", data.profile);
      this.set("currentToken", data.token);
    }
  },
  _afterReset: function(err){
  }

});

var requiresAuthenticationRoute = Ember.Route.extend({
  willTransition: function(transition){
    if (!this.get("controller").get("userLoggedIn")){
      transition.abort(); // TODO: Throw an error?
    } else {
      return true;
    }
  }
});