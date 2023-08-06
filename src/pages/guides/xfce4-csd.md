---
layout: $layouts/Markdown.astro
title: Obliterate CSD on Xfce4
---

`~/.config/gtk-3.0/gtk.css`

```css
headerbar {
	margin-top: -100px;
	border-bottom-width: 0;
}

headerbar button,
headerbar spinbutton,
headerbar entry,
headerbar separator {
	margin-top: 103px;
	margin-bottom: 3px;
}
```

`~/.config/gtk-3.0/settings.ini`

```ini
gtk-decoration-layout=""
```
