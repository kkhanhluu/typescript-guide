import { NextFunction, Request, Response } from 'express';
import { bodyValidator, controller, get, post, use } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response) {
    res.send(`
          <form method="POST">
            <div>
                <label>Email</label>
                <input name="email" />
            </div>
            <div>
                <label>Password</label>
                <input name="password" />
            </div>
            <button type="submit">Submit</button>
          </form>
      `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (
      email &&
      password &&
      email === 'test@test.com' &&
      password === 'test123'
    ) {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect('/');
  }
}
