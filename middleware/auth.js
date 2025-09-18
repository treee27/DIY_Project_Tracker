// middleware/auth.js
function ensureAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next(); // user is logged in
  } else {
    return res.redirect('/login'); // redirect to login if not authenticated
  }
}

module.exports = ensureAuth;
