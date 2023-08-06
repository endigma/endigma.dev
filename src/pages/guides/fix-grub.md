---
layout: $layouts/Markdown.astro
title: Fix Windows Destroying Grub2
---

**efi only**

> cortana: ohh i saw your grub2 install, i thought it was bad so i deleted it oops

## ubuntu livecd:

other rescue disk probably works too

replace `/dev/nvme0n1pX` with your actual device names

```bash
sudo apt install grub-efi
sudo mkdir /mnt/root /mnt/efi
sudo mount /dev/nvme0n1p1 /media/efi
sudo mount /dev/nvme0n1p3 /media/root
sudo grub-install --target=x86_64-efi /dev/nvme0n1 --efi-directory=/mnt/efi --boot-directory=/mnt/root/boot
```
