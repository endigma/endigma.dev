---
layout: $layouts/Markdown.astro
title: Arma 3 on Linux with Steam Flatpak and TFAR
---

This is gonna be a good one.

_This guide assumes a working Flatpak Steam install and ownership of Arma 3._

---

### Prior art:

-   https://www.ninelore.org/project/armaonlinux/
-   some thread on the ArmaOnUnix discord

This guide directly includes some information from ninelore's guide, not with the goal of stealing or reappropriating but for consolidation of information. If you read this and dislike this let me know.

## Arma 3

### Downloading

We're gonna start with downloading Arma 3. Before you download, set this option in the game's properties to avoid downloading the native version.

![Force the use of a specific Steam Play compatability tool: Proton 7.0-6](/arma3-tfar-flatpak-assets/proton.png)

### Launching the game

You can optionally download [Arma 3 Unix Launcher](https://github.com/muttleyxd/arma3-unix-launcher) and use it instead of the official launcher, however due to recent(ish) updates this isn't required anymore.

You are now able to play the game on Linux without ACRE or TFAR.

## ACRE2/TFAR

### Prep

1. Download Teamspeak 3 for Windows 64-bit installer
2. Put the installer in `~/.var/app/com.valvesoftware.Steam/Teamspeak3.exe`
3. Run `flatpak install com.github.Matoking.protontricks` (if not already installed)
4. Run `flatpak run com.github.Matoking.protontricks 107410 d3dcompiler_43 d3dx10_43 d3dx11_43 mfc140 xact_x`
5. Obtain the helper script from [ninelore's github](https://github.com/ninelore/armaonlinux).
6. Put the helper script in `~/.var/app/com.valvesoftware.Steam/Arma3Helper.sh`

### Configuration

If you have Arma 3 installed in a custom library, like on another disk, you must create a configuration file for the Arma3Helper script.

Create the file `~/.var/app/com.valvesoftware.Steam/.config/arma3helper/config` with the following contents:

```bash
#!/usr/bin/env bash

#####################################################################################
## Arma3helper.sh CONFIG FILE (This will override settings made in Arma3Helper.sh)
#####################################################################################

## MAKE SURE YOU CHOOSE THE SAME PROTON VERSION AS FOR ARMA IN STEAM!!!
# Set this to the Proton Version you are using with Arma!
# Available versions: "7.0", "6.3", "5.13", "5.0", "4.11", "4.2", "3.16", "3.7", "Proton Experimental", "Experimental"
# Defaults to: 7.0
PROTON_OFFICIAL_VERSION=""

## Path to Arma's compatdata (wineprefix)
# Leave empty if Arma is installed in Steams default library
COMPAT_DATA_PATH="[...path to steam library]/steamapps/compatdata/107410"

# If you have proton in a different steam library, then put the path to its steamapps folder here
# Leave empty if Proton is installed in Steams default library
STEAM_LIBRARY_PATH="[...path to steam library]/steamapps"

# If you are using a custom proton build, then put its folder name (from inside compatibilitytools.d) here
PROTON_CUSTOM_VERSION=""

## Esync/Fsync
# IMPORTANT: Make sure that Esync and Fsync settings MATCH for both Arma and TeamSpeak(here)
# If you havent explicitly turned it off for Arma, leave it on here!
ESYNC=true
FSYNC=true
```

And replace `[...path to steam library]` with the path to the folder containing "steamapps".

Update ESYNC/FSYNC to match the settings you use with Arma 3. They should both be true if you don't explicitly disable ESYNC/FSYNC for some reason.

### Setting up Teamspeak

You need to run `flatpak run --command=./Arma3Helper.sh com.valvesoftware.Steam install Teamspeak.exe`

This will start the Teamspeak3 installer, you should leave the paths default. Teamspeak will crash on or near startup until you delete the following files from the following path.

`[...path to steam library]/steamapps/compatdata/107410/pfx/drive_c/users/steamuser/AppData/Roaming/TS3Client/plugins/`

-   `gamepad_joystick`
-   `gamepad_joystick_win64.dll`

### Running Teamspeak

You need to add a non-steam game to Steam for the script we put in `~/.var/app/com.valvesoftware.Steam/` earlier. It should look something like this:

![A non-steam game added that runs the script we added earlier](/arma3-tfar-flatpak-assets/non-steam-game-script.png)

## Troubleshooting

### Sound/Thermals

Do the proton tricks command from Teamspeak Prep

### Sound (not fixed by above)

I've not experienced this issue but it is apparently fixed by either:

#### Using environment variable

Add `WINEDLLOVERRIDES="xaudio2_7=n"` to your Steam Arma 3 launch options (or via Arma 3 Unix Launcher)

#### Using winecfg

1. Run `flatpak run com.github.Matoking.protontricks 107410 winecfg`
2. Add an override for `xaudio2_7` ![Add an override for `xaudio2_7`](/arma3-tfar-flatpak-assets/winetricks-audio-1.png)
3. Click "Edit" then set the load order to "Native (Windows)"![Click "Edit" then set the load order to "Native (Windows)`](/arma3-tfar-flatpak-assets/winetricks-audio-2.png)

### Other

You can join the [ArmaOnUnix Discord](https://discord.gg/HBfDYB7ReT).

## Performance

You can add a few launch options to improve performance in some cases. These are the ones I use.

-   `-noSplash`
-   `-skipIntro`
-   `-world=empty`
-   `-exThreads=7`
-   `-enableHT`
-   `-noLogs`
