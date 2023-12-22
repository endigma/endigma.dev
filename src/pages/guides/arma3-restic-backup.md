---
layout: $layouts/Markdown.astro
title: Backup your Arma 3 data with Restic
---

Gonna keep this quick and easy, just commands and paths. If you aren't using modern powershell swap `$env:USERPROFILE` for `%USERPROFILE%` or whatever else your software uses to get at environment variables.

This guide uses [Scoop](https://scoop.sh/) for installs, [Restic](https://restic.net/) for the backup internals and [Resticprofile](https://creativeprojects.github.io/resticprofile/) as an interface to Restic.

# Installation

```powershell
# Scoop
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression

# Restic / Resticprofile
scoop install restic resticprofile
```

You should follow the instructions from scoop here if it wants you to reboot/logout

# Setup

```powershell
resticprofile generate --random-key > $env:USERPROFILE\AppData\Local\resticprofile\key
```

Put the following in `$env:USERPROFILE\AppData\Local\resticprofile\profiles.toml`

```toml
version = "1"

[default]
  repository = "local:Backups"
  password-file = "key"
  initialize = true

  [default.backup]
    source = [ "~/Documents/Arma 3", "~/Documents/Arma 3 - Other Profiles" ]
    check-after = true

	# If you want this to run even when you're not logged in,
	# change this to `user`, but it will prompt for admin perms.
	schedule-permission = "user_logged_on"
	schedule = "hourly"
```

Then,

```powershell
resticprofile schedule
```

All done!
