# anydo-cli

**Unofficial CLI app for [Any.do](https://www.any.do/).**

## Installation

```
npm install anydo-cli --global
```

## Quickstart

```
$ anydo --help

  Unofficial Any.do CLI app.

  - Login
    $ anydo login
      --email you@example.org  (required!)
      --password super-secret  (required!)

  - List your tasks
    $ anydo [tasks]
      --done     include done tasks
      --deleted  include deleted tasks
      --undated  include tasks without due date
      --checked  include checked tasks

  - Logout
    $ anydo logout

```

## Todos

- New features
  - Add lists command
  - Add task sort option (by title, by due date, by priority, etc.)
  - Add task format option (list, table, json, etc.)
- Add tests

## API

**See: [MarkTiedemann/anydo](https://github.com/MarkTiedemann/anydo).**

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).