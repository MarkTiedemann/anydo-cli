#!/usr/bin/env node

const anydo = require('anydo')
const parseBody = require('anydo/lib/parse-body')
const meow = require('meow')
const config = new (require('conf'))()
const updateNotifier = require('update-notifier')
const pkg = require('./package.json')

updateNotifier({ pkg }).notify()

const cli = meow(`
  - Login
    $ anydo login
      --email you@example.org  (required!)
      --password super-secret  (required!)

  - List your tasks
    $ anydo [tasks]
      --done     include done tasks
      --deleted  include deleted tasks
      --undated  include tasks without due date

  - Logout
    $ anydo logout

`, {
  alias: {
    h: 'help',
    v: 'version',
    e: 'email',
    p: 'password'
  }
})

const flags = cli.flags

const fail = message => {
  console.error('Error: ' + message)
  process.exit(1)
}

const login = () => {
  if (!flags.email) return fail('Please specify an email via the `--email` flag')
  if (!flags.password) return fail('Please specify a password via the `--password` flag')
  anydo.login(flags, (err, res) => {
    if (err) return fail(err.message)
    config.set('anydo.auth', res.headers['x-anydo-auth'])
  })
}

const logout = () => {
  config.delete('anydo.auth')
}

const tasks = () => {
  const auth = config.get('anydo.auth')
  if (!auth) return fail('Please login first via the `login` command')
  anydo.sync({
    auth,
    includeDone: flags.done || false,
    includeDeleted: flags.deleted || false
  }, (err, res) => {
    if (err) return fail(err.message)
    parseBody(res, (err, body) => {
      if (err) return fail(err.message)
      body.models.task.items
        .filter(t => flags.undated ? true : t.dueDate)
        .map(t => '- ' + t.title)
        .forEach(t => console.log(t))
    })
  })
}

switch (cli.input[0]) {
  case 'login': login(); break
  case 'logout': logout(); break
  case 'tasks': tasks(); break
  default: tasks(); break
}
