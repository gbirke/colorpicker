# Dokuwiki Color Picker plugin

The color picker plugin puts a button in the DokuWiki edit toolbar for inserting a `<color>` tag.

The available colors can be edited in the wiki settings.

This plugin needs the [color plugin][1] to work!

## Installation

Put this folder in the lib/plugins folder in your DokuWiki directory. 

Go to the configuration page and define your color scheme in the form of

    Combination1=foreground/background
    Combination2=foreground/background
    Combination3=foreground/background

The button will only appaear, if there is a color scheme configured!

[1]: https://www.dokuwiki.org/plugin:color